'use strict';

const fs = require('fs');
const path = require('path');
const https = require('https');
const http = require('http');
const xml2js = require('xml2js');
const TurndownService = require('turndown');

const WXR_FILE = path.join(__dirname, 'echoscribes.WordPress.2026-07-10.xml.xml');
const OUTPUT_DIR = path.join(__dirname, '..', 'content', 'posts');
const IMAGES_DIR = path.join(__dirname, '..', 'public', 'images', 'blog');

function mapCategory(raw) {
  if (!raw) return 'Blog';
  const cat = raw.toLowerCase();
  if (cat.includes('home') || cat.includes('garden') || cat.includes('gradan')) return 'Home & Garden';
  if (cat.includes('tool') || cat.includes('smart') || cat.includes('machine')) return 'Tools & Smart Machines';
  if (cat.includes('computer') || cat.includes('electron')) return 'Computer & Electronics';
  if (cat.includes('clothing') || cat.includes('accessor')) return 'Clothing & Accessories';
  return 'Blog';
}

function safeFilename(urlStr) {
  try {
    const u = new URL(urlStr);
    const base = path.basename(u.pathname);
    return base || null;
  } catch {
    const base = path.basename(urlStr.split('?')[0]);
    return base || null;
  }
}

function downloadFile(url, destPath, redirects = 0) {
  return new Promise((resolve, reject) => {
    if (redirects > 5) return reject(new Error('Too many redirects'));
    const proto = url.startsWith('https') ? https : http;
    const file = fs.createWriteStream(destPath);

    const req = proto.get(url, { timeout: 20000 }, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        file.close();
        fs.unlink(destPath, () => {});
        res.resume();
        const next = new URL(res.headers.location, url).href;
        return downloadFile(next, destPath, redirects + 1).then(resolve).catch(reject);
      }
      if (res.statusCode !== 200) {
        file.close();
        fs.unlink(destPath, () => {});
        res.resume();
        return reject(new Error(`HTTP ${res.statusCode}`));
      }
      res.pipe(file);
      file.on('finish', () => { file.close(); resolve(); });
      file.on('error', (e) => { fs.unlink(destPath, () => {}); reject(e); });
    });
    req.on('timeout', () => { req.destroy(); reject(new Error('Request timed out')); });
    req.on('error', (e) => { fs.unlink(destPath, () => {}); reject(e); });
  });
}

// Cache: original URL -> local /images/blog/filename  (avoids re-downloading)
const urlCache = new Map();

async function processImage(imgUrl, stats) {
  if (!imgUrl || !imgUrl.startsWith('http')) return null;
  if (urlCache.has(imgUrl)) return urlCache.get(imgUrl);

  const filename = safeFilename(imgUrl);
  if (!filename) return null;

  const destPath = path.join(IMAGES_DIR, filename);
  const localPath = `/images/blog/${filename}`;

  if (!fs.existsSync(destPath)) {
    await downloadFile(imgUrl, destPath);
    stats.imagesDownloaded++;
  }
  urlCache.set(imgUrl, localPath);
  return localPath;
}

function getText(node) {
  if (!node) return '';
  if (Array.isArray(node)) return getText(node[0]);
  if (typeof node === 'string') return node;
  if (typeof node === 'object' && node._) return node._;
  return String(node);
}

async function main() {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  fs.mkdirSync(IMAGES_DIR, { recursive: true });

  console.log('Parsing WXR file...');
  const xml = fs.readFileSync(WXR_FILE, 'utf8');

  const parser = new xml2js.Parser({ explicitArray: true, trim: false });
  const parsed = await parser.parseStringPromise(xml);
  const channel = parsed.rss.channel[0];
  const items = channel.item || [];

  // Map attachment post_id -> URL
  const attachmentMap = {};
  for (const item of items) {
    if (getText(item['wp:post_type']) === 'attachment') {
      const id = getText(item['wp:post_id']);
      const url = getText(item['wp:attachment_url']);
      if (id && url) attachmentMap[id] = url;
    }
  }

  const td = new TurndownService({
    headingStyle: 'atx',
    bulletListMarker: '-',
    codeBlockStyle: 'fenced',
  });

  const stats = {
    totalFound: 0,
    totalMigrated: 0,
    imagesDownloaded: 0,
    failedPosts: [],
    failedImages: [],
  };

  const publishedPosts = items.filter(
    (item) =>
      getText(item['wp:post_type']) === 'post' &&
      getText(item['wp:status']) === 'publish'
  );

  stats.totalFound = publishedPosts.length;
  console.log(`Found ${publishedPosts.length} published posts.\n`);

  for (const post of publishedPosts) {
    const title = getText(post.title);
    const slug = getText(post['wp:post_name']);
    const dateRaw = getText(post['wp:post_date']);
    const dateFormatted = dateRaw ? dateRaw.replace(' ', 'T') + 'Z' : '';

    // Category
    const cats = post.category || [];
    const firstCat = cats[0];
    const rawCatName =
      typeof firstCat === 'string'
        ? firstCat
        : firstCat?._ || firstCat?.$?.nicename || '';
    const category = mapCategory(rawCatName);

    // Raw HTML content & excerpt
    let html = getText(post['content:encoded']);
    const rawExcerpt = getText(post['excerpt:encoded']);

    // Strip WordPress block comments
    html = html
      .replace(/<!--\s*wp:[^>]*-->/g, '')
      .replace(/<!--\s*\/wp:[^>]*-->/g, '')
      .trim();

    // Featured image via _thumbnail_id postmeta
    const metas = post['wp:postmeta'] || [];
    let thumbnailId = null;
    for (const meta of metas) {
      if (getText(meta['wp:meta_key']) === '_thumbnail_id') {
        thumbnailId = getText(meta['wp:meta_value']);
      }
    }

    let featuredImagePath = '';
    if (thumbnailId && attachmentMap[thumbnailId]) {
      try {
        const local = await processImage(attachmentMap[thumbnailId], stats);
        if (local) featuredImagePath = local;
      } catch (err) {
        stats.failedImages.push({ url: attachmentMap[thumbnailId], reason: err.message });
      }
    }

    // Inline images — download and rewrite src in HTML before Markdown conversion
    const imgRe = /src=["']([^"']+)["']/gi;
    const imgUrls = [];
    let m;
    while ((m = imgRe.exec(html)) !== null) {
      if (m[1].startsWith('http')) imgUrls.push(m[1]);
    }

    for (const imgUrl of [...new Set(imgUrls)]) {
      try {
        const local = await processImage(imgUrl, stats);
        if (local) html = html.split(imgUrl).join(local);
      } catch (err) {
        stats.failedImages.push({ url: imgUrl, reason: err.message });
      }
    }

    // Convert to Markdown
    let markdown;
    try {
      markdown = td.turndown(html || '');
    } catch (err) {
      stats.failedPosts.push({ title, reason: `Turndown error: ${err.message}` });
      continue;
    }

    // Excerpt: use WordPress excerpt or auto-generate from markdown
    let excerpt = rawExcerpt.replace(/<[^>]+>/g, '').trim();
    if (!excerpt) {
      excerpt = markdown
        .replace(/^#+\s.*/gm, '')
        .replace(/[#*`!\[\]()>]/g, '')
        .replace(/\n+/g, ' ')
        .trim()
        .slice(0, 200);
    }

    const esc = (s) => s.replace(/\\/g, '\\\\').replace(/"/g, '\\"').replace(/\n/g, ' ');

    const mdx = [
      '---',
      `title: "${esc(title)}"`,
      `slug: "${slug}"`,
      `date: "${dateFormatted}"`,
      `author: "Echos Scribes Team"`,
      `category: "${category}"`,
      `excerpt: "${esc(excerpt)}"`,
      `featuredImage: "${featuredImagePath}"`,
      `tags: []`,
      '---',
      '',
      markdown,
    ].join('\n');

    try {
      fs.writeFileSync(path.join(OUTPUT_DIR, `${slug}.mdx`), mdx, 'utf8');
      stats.totalMigrated++;
      console.log(`  ✓  ${title}`);
    } catch (err) {
      stats.failedPosts.push({ title, reason: err.message });
    }
  }

  console.log('\n========== MIGRATION SUMMARY ==========');
  console.log(`Total posts found:        ${stats.totalFound}`);
  console.log(`Total posts migrated:     ${stats.totalMigrated}`);
  console.log(`Total images downloaded:  ${stats.imagesDownloaded}`);

  if (stats.failedPosts.length > 0) {
    console.log(`\nFailed posts (${stats.failedPosts.length}):`);
    for (const p of stats.failedPosts) {
      console.log(`  ✗  "${p.title}" — ${p.reason}`);
    }
  }

  if (stats.failedImages.length > 0) {
    console.log(`\nFailed images (${stats.failedImages.length}):`);
    for (const i of stats.failedImages) {
      console.log(`  ✗  ${i.url}`);
      console.log(`     ${i.reason}`);
    }
  }

  if (stats.failedPosts.length === 0 && stats.failedImages.length === 0) {
    console.log('\nAll content migrated successfully!');
  }
  console.log('=======================================');
}

main().catch((err) => {
  console.error('\nFatal error:', err.message);
  process.exit(1);
});
