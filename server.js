// ==========================================================================
// PETUNION HUB — COMPLETE BLOG PLATFORM SERVER & CMS ENGINE
// Serves static pages, dynamic blog articles, admin CMS API & media uploads
// ==========================================================================

const http = require('http');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const { URL } = require('url');

const PORT = process.env.PORT || 3000;
const DATA_DIR = path.join(__dirname, 'data');
const ARTICLES_FILE = path.join(DATA_DIR, 'articles.json');
const CATEGORIES_FILE = path.join(DATA_DIR, 'categories.json');
const SUBSCRIBERS_FILE = path.join(DATA_DIR, 'subscribers.json');
const MESSAGES_FILE = path.join(DATA_DIR, 'messages.json');
const UPLOADS_DIR = path.join(__dirname, 'images', 'uploads');

// Ensure directories and files exist
if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });
if (!fs.existsSync(UPLOADS_DIR)) fs.mkdirSync(UPLOADS_DIR, { recursive: true });
if (!fs.existsSync(SUBSCRIBERS_FILE)) fs.writeFileSync(SUBSCRIBERS_FILE, '[]', 'utf8');
if (!fs.existsSync(MESSAGES_FILE)) fs.writeFileSync(MESSAGES_FILE, '[]', 'utf8');

// Admin credentials & in-memory active sessions
const ADMIN_USER = process.env.ADMIN_USER || 'admin';
const ADMIN_PASS = process.env.ADMIN_PASS || 'petunion2026!';
const activeSessions = new Set();

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.xml': 'application/xml; charset=utf-8',
  '.txt': 'text/plain; charset=utf-8'
};

// Helper: Read JSON file safely
function readJson(file, defaultValue = []) {
  try {
    if (!fs.existsSync(file)) return defaultValue;
    return JSON.parse(fs.readFileSync(file, 'utf8'));
  } catch (err) {
    console.error(`Error reading ${file}:`, err);
    return defaultValue;
  }
}

// Helper: Write JSON atomically
function writeJson(file, data) {
  const tmp = `${file}.tmp.${Date.now()}`;
  fs.writeFileSync(tmp, JSON.stringify(data, null, 2), 'utf8');
  fs.renameSync(tmp, file);
}

// Helper: Basic HTML sanitizer for articles (strips dangerous script/event tags)
function sanitizeArticleHtml(html) {
  if (!html) return '';
  return html
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/\son\w+="[^"]*"/gi, '')
    .replace(/\son\w+='[^']*'/gi, '')
    .replace(/javascript:[^"']*/gi, '');
}

// Helper: Extract session token from Cookie header or Authorization header
function getSessionToken(req) {
  const cookieHeader = req.headers.cookie;
  if (cookieHeader) {
    const match = cookieHeader.match(/petunion_token=([^;]+)/);
    if (match) return match[1];
  }
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith('Bearer ')) {
    return authHeader.substring(7);
  }
  return null;
}

function isAuthenticated(req) {
  const token = getSessionToken(req);
  return Boolean(token && activeSessions.has(token));
}

// Rebuild static HTML article file whenever modified via CMS
function syncArticleStaticFile(article) {
  try {
    const { execSync } = require('child_process');
    execSync('node scripts/build_static_pages.js', { cwd: __dirname, stdio: 'ignore' });
  } catch (err) {
    console.error('Failed to sync static article pages:', err);
  }
}

// Main HTTP Server
const server = http.createServer((req, res) => {
  const parsedUrl = new URL(req.url, `http://${req.headers.host || 'localhost'}`);
  let pathname = parsedUrl.pathname;

  // JSON API Helper
  const sendJson = (statusCode, data) => {
    res.writeHead(statusCode, {
      'Content-Type': 'application/json',
      'Cache-Control': 'no-store'
    });
    res.end(JSON.stringify(data));
  };

  // ------------------------------------------------------------------------
  // API ROUTES
  // ------------------------------------------------------------------------
  if (pathname.startsWith('/api/')) {
    // 1. Auth: Login
    if (pathname === '/api/auth/login' && req.method === 'POST') {
      let body = '';
      req.on('data', chunk => body += chunk);
      req.on('end', () => {
        try {
          const { username, password } = JSON.parse(body);
          if (username === ADMIN_USER && password === ADMIN_PASS) {
            const token = crypto.randomBytes(32).toString('hex');
            activeSessions.add(token);
            res.writeHead(200, {
              'Content-Type': 'application/json',
              'Set-Cookie': `petunion_token=${token}; Path=/; HttpOnly; SameSite=Strict; Max-Age=86400`
            });
            return res.end(JSON.stringify({ success: true, token, username: ADMIN_USER }));
          }
          return sendJson(401, { success: false, error: 'Invalid administrator credentials' });
        } catch (e) {
          return sendJson(400, { success: false, error: 'Malformed JSON payload' });
        }
      });
      return;
    }

    // 2. Auth: Verify
    if (pathname === '/api/auth/verify' && req.method === 'GET') {
      const auth = isAuthenticated(req);
      return sendJson(auth ? 200 : 401, { authenticated: auth });
    }

    // 3. Auth: Logout
    if (pathname === '/api/auth/logout' && req.method === 'POST') {
      const token = getSessionToken(req);
      if (token) activeSessions.delete(token);
      res.writeHead(200, {
        'Content-Type': 'application/json',
        'Set-Cookie': 'petunion_token=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT'
      });
      return res.end(JSON.stringify({ success: true }));
    }

    // 3b. Categories: List
    if (pathname === '/api/categories' && req.method === 'GET') {
      const categories = readJson(CATEGORIES_FILE, []);
      return sendJson(200, { success: true, count: categories.length, categories });
    }

    // 4. Articles: List
    if (pathname === '/api/articles' && req.method === 'GET') {
      const articles = readJson(ARTICLES_FILE, []);
      const auth = isAuthenticated(req);
      const category = parsedUrl.searchParams.get('category');
      const search = parsedUrl.searchParams.get('search');
      const status = parsedUrl.searchParams.get('status');

      let filtered = articles;
      // If not authenticated, only show published articles!
      if (!auth) {
        filtered = filtered.filter(a => a.isPublished);
      } else if (status === 'published') {
        filtered = filtered.filter(a => a.isPublished);
      } else if (status === 'draft') {
        filtered = filtered.filter(a => !a.isPublished);
      }

      if (category && category !== 'all') {
        filtered = filtered.filter(a => a.categorySlug === category || a.category.toLowerCase() === category.toLowerCase());
      }

      if (search) {
        const q = search.toLowerCase();
        filtered = filtered.filter(a => a.title.toLowerCase().includes(q) || a.excerpt.toLowerCase().includes(q));
      }

      return sendJson(200, { success: true, count: filtered.length, articles: filtered });
    }

    // 5. Articles: Single Get
    const singleArticleMatch = pathname.match(/^\/api\/articles\/([^/]+)$/);
    if (singleArticleMatch && req.method === 'GET') {
      const idOrSlug = singleArticleMatch[1];
      const articles = readJson(ARTICLES_FILE, []);
      const auth = isAuthenticated(req);
      const article = articles.find(a => a.id === idOrSlug || a.slug === idOrSlug);

      if (!article || (!article.isPublished && !auth)) {
        return sendJson(404, { success: false, error: 'Article not found' });
      }
      return sendJson(200, { success: true, article });
    }

    // 6. Articles: Create (Admin Only)
    if (pathname === '/api/articles' && req.method === 'POST') {
      if (!isAuthenticated(req)) {
        return sendJson(401, { success: false, error: 'Unauthorized: Admin authentication required' });
      }

      let body = '';
      req.on('data', chunk => body += chunk);
      req.on('end', () => {
        try {
          const payload = JSON.parse(body);
          if (!payload.title || !payload.excerpt || !payload.content) {
            return sendJson(400, { success: false, error: 'Title, excerpt, and content are required' });
          }

          const articles = readJson(ARTICLES_FILE, []);
          
          // Generate or validate slug
          let slug = (payload.slug || payload.title)
            .toLowerCase()
            .replace(/[^\w\s-]/g, '')
            .replace(/[\s_-]+/g, '-')
            .replace(/^-+|-+$/g, '');
          
          if (!slug) slug = `pet-article-${Date.now()}`;

          // Validate slug uniqueness
          if (articles.some(a => a.slug === slug)) {
            return sendJson(400, { success: false, error: `Article slug "${slug}" already exists. Please choose a unique slug.` });
          }

          const newId = String(Date.now());
          const newFile = `post-${slug}.html`;

          const newArticle = {
            id: newId,
            slug: slug,
            file: newFile,
            title: payload.title.trim(),
            excerpt: payload.excerpt.trim(),
            category: payload.category || 'Dog Care',
            categorySlug: payload.categorySlug || 'care',
            tags: Array.isArray(payload.tags) ? payload.tags : (payload.tags ? payload.tags.split(',').map(t => t.trim()) : []),
            author: payload.author || 'PetUnion Team',
            authorRole: payload.authorRole || 'Pet Care Contributor',
            authorAvatar: payload.authorAvatar || 'images/avatar.jpg',
            date: payload.date || new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
            updatedDate: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
            readTime: payload.readTime || `${Math.max(2, Math.round(payload.content.split(/\s+/).length / 200))} min read`,
            image: payload.image || 'images/hero-pets.jpg',
            imageAlt: payload.imageAlt || payload.title,
            isPublished: payload.status === 'published' ? true : (payload.status === 'draft' ? false : Boolean(payload.isPublished)),
            isFeatured: Boolean(payload.isFeatured),
            seoTitle: payload.seoTitle || `${payload.title} | PetUnion Hub`,
            seoDescription: payload.seoDescription || payload.excerpt,
            content: sanitizeArticleHtml(payload.content)
          };

          articles.unshift(newArticle);
          writeJson(ARTICLES_FILE, articles);
          syncArticleStaticFile(newArticle);

          return sendJson(201, { success: true, message: 'Article created successfully', article: newArticle });
        } catch (e) {
          return sendJson(400, { success: false, error: 'Malformed request JSON' });
        }
      });
      return;
    }

    // 7. Articles: Update (Admin Only)
    if (singleArticleMatch && req.method === 'PUT') {
      if (!isAuthenticated(req)) {
        return sendJson(401, { success: false, error: 'Unauthorized: Admin authentication required' });
      }

      const id = singleArticleMatch[1];
      let body = '';
      req.on('data', chunk => body += chunk);
      req.on('end', () => {
        try {
          const payload = JSON.parse(body);
          const articles = readJson(ARTICLES_FILE, []);
          const index = articles.findIndex(a => a.id === id);

          if (index === -1) {
            return sendJson(404, { success: false, error: 'Article not found' });
          }

          const existing = articles[index];

          // Check if slug changed and is unique
          if (payload.slug && payload.slug !== existing.slug) {
            const slugTaken = articles.some(a => a.id !== id && a.slug === payload.slug);
            if (slugTaken) {
              return sendJson(400, { success: false, error: `Slug "${payload.slug}" is already used by another article.` });
            }
          }

          const updated = {
            ...existing,
            ...payload,
            id: existing.id, // Immutable ID
            file: existing.file,
            isPublished: payload.status === 'published' ? true : (payload.status === 'draft' ? false : (payload.isPublished !== undefined ? Boolean(payload.isPublished) : existing.isPublished)),
            updatedDate: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
            content: payload.content ? sanitizeArticleHtml(payload.content) : existing.content
          };

          articles[index] = updated;
          writeJson(ARTICLES_FILE, articles);
          syncArticleStaticFile(updated);

          return sendJson(200, { success: true, message: 'Article updated successfully', article: updated });
        } catch (e) {
          return sendJson(400, { success: false, error: 'Malformed request JSON' });
        }
      });
      return;
    }

    // 8. Articles: Delete (Admin Only)
    if (singleArticleMatch && req.method === 'DELETE') {
      if (!isAuthenticated(req)) {
        return sendJson(401, { success: false, error: 'Unauthorized: Admin authentication required' });
      }

      const id = singleArticleMatch[1];
      const articles = readJson(ARTICLES_FILE, []);
      const index = articles.findIndex(a => a.id === id);

      if (index === -1) {
        return sendJson(404, { success: false, error: 'Article not found' });
      }

      const deleted = articles.splice(index, 1)[0];
      writeJson(ARTICLES_FILE, articles);
      syncArticleStaticFile(deleted);

      return sendJson(200, { success: true, message: 'Article deleted successfully', article: deleted });
    }

    // 9. Media: Image Upload (Admin Only)
    if (pathname === '/api/upload' && req.method === 'POST') {
      if (!isAuthenticated(req)) {
        return sendJson(401, { success: false, error: 'Unauthorized: Admin authentication required' });
      }

      const chunks = [];
      let totalLength = 0;
      const MAX_SIZE = 5 * 1024 * 1024; // 5 MB

      req.on('data', chunk => {
        totalLength += chunk.length;
        if (totalLength > MAX_SIZE) {
          res.writeHead(413, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ success: false, error: 'Image exceeds maximum 5MB size limit' }));
          req.destroy();
          return;
        }
        chunks.push(chunk);
      });

      req.on('end', () => {
        const buffer = Buffer.concat(chunks);
        const contentType = req.headers['content-type'] || '';

        // Simple Base64 or binary image handling
        let ext = '.jpg';
        if (contentType.includes('png')) ext = '.png';
        else if (contentType.includes('webp')) ext = '.webp';
        else if (contentType.includes('svg')) ext = '.svg';

        const filename = `pet-${Date.now()}-${crypto.randomBytes(4).toString('hex')}${ext}`;
        const targetPath = path.join(UPLOADS_DIR, filename);

        fs.writeFileSync(targetPath, buffer);
        const publicUrl = `images/uploads/${filename}`;

        return sendJson(201, { success: true, url: publicUrl, filename });
      });
      return;
    }

    // 10. Newsletter Subscription
    if (pathname === '/api/newsletter' && req.method === 'POST') {
      let body = '';
      req.on('data', chunk => body += chunk);
      req.on('end', () => {
        try {
          const { email } = JSON.parse(body);
          if (!email || !email.includes('@')) {
            return sendJson(400, { success: false, error: 'A valid email address is required' });
          }

          const subscribers = readJson(SUBSCRIBERS_FILE, []);
          const normalized = email.toLowerCase().trim();

          if (subscribers.some(s => s.email === normalized)) {
            return sendJson(200, { success: true, message: 'You are already subscribed!' });
          }

          subscribers.push({ email: normalized, subscribedAt: new Date().toISOString() });
          writeJson(SUBSCRIBERS_FILE, subscribers);
          return sendJson(201, { success: true, message: 'Subscribed successfully' });
        } catch (e) {
          return sendJson(400, { success: false, error: 'Malformed request JSON' });
        }
      });
      return;
    }

    // 11. Contact Form Submission
    if (pathname === '/api/contact' && req.method === 'POST') {
      let body = '';
      req.on('data', chunk => body += chunk);
      req.on('end', () => {
        try {
          const { name, email, subject, message } = JSON.parse(body);
          if (!name || !email || !message) {
            return sendJson(400, { success: false, error: 'Name, email, and message are required' });
          }

          const messages = readJson(MESSAGES_FILE, []);
          messages.push({
            id: String(Date.now()),
            name: name.trim(),
            email: email.trim(),
            subject: subject || 'General Pet Care',
            message: message.trim(),
            receivedAt: new Date().toISOString()
          });
          writeJson(MESSAGES_FILE, messages);
          return sendJson(201, { success: true, message: 'Message sent successfully' });
        } catch (e) {
          return sendJson(400, { success: false, error: 'Malformed request JSON' });
        }
      });
      return;
    }

    return sendJson(404, { success: false, error: 'API endpoint not found' });
  }

  // ------------------------------------------------------------------------
  // STATIC & PAGE ROUTING
  // ------------------------------------------------------------------------
  if (pathname === '/') pathname = '/index.html';
  if (pathname === '/admin' || pathname === '/admin/') pathname = '/admin.html';
  if (pathname === '/blog' || pathname === '/blog/') pathname = '/blog.html';
  if (pathname === '/about' || pathname === '/about/') pathname = '/about.html';
  if (pathname === '/contact' || pathname === '/contact/') pathname = '/contact.html';
  if (pathname === '/privacy-policy' || pathname === '/privacy-policy/') pathname = '/privacy-policy.html';
  if (pathname === '/terms' || pathname === '/terms-conditions' || pathname === '/terms/') pathname = '/terms-conditions.html';

  let filePath = path.join(__dirname, pathname);

  // Security: prevent directory traversal
  if (!filePath.startsWith(__dirname)) {
    res.writeHead(403, { 'Content-Type': 'text/plain' });
    return res.end('403 Forbidden');
  }

  fs.stat(filePath, (err, stats) => {
    if (err || !stats.isFile()) {
      // Check 404
      const notFoundPath = path.join(__dirname, '404.html');
      fs.readFile(notFoundPath, 'utf8', (readErr, content) => {
        res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
        if (!readErr && content) {
          res.end(content);
        } else {
          res.end('<h1>404 Not Found</h1><p>PetUnion Hub: The requested pet guide was not found.</p>');
        }
      });
      return;
    }

    const ext = path.extname(filePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';

    // Caching headers
    const cacheControl = (ext === '.html') ? 'no-cache' : 'public, max-age=86400';

    res.writeHead(200, {
      'Content-Type': contentType,
      'Cache-Control': cacheControl
    });

    fs.createReadStream(filePath).pipe(res);
  });
});

server.listen(PORT, () => {
  console.log(`\n======================================================`);
  console.log(`  🐾 PETUNION HUB — Pet Care & Blog Platform Running`);
  console.log(`  Live URL:   http://localhost:${PORT}`);
  console.log(`  Admin CMS:  http://localhost:${PORT}/admin`);
  console.log(`======================================================\n`);
});
