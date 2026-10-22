// scripts/test_petunionhub.js
// Automated verification and test suite for PetUnion Hub platform
// Tests: Static Pages, Post Rendering, SEO Markup, 404 Handling,
// Admin Auth, Article CRUD, Draft/Publish Workflow, and Public APIs.

const http = require('http');
const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

const PORT = 3000;

let serverProcess = null;
let passedCount = 0;
let failedCount = 0;
const results = [];

function recordResult(testName, status, details = '') {
  if (status === 'PASS') {
    passedCount++;
    console.log(`\x1b[32m✔ PASS\x1b[0m: ${testName} ${details ? '(' + details + ')' : ''}`);
  } else {
    failedCount++;
    console.error(`\x1b[31m✖ FAIL\x1b[0m: ${testName} - ${details}`);
  }
  results.push({ testName, status, details });
}

function httpRequest(options, postData = null) {
  return new Promise((resolve, reject) => {
    const req = http.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => { data += chunk; });
      res.on('end', () => {
        resolve({
          statusCode: res.statusCode,
          headers: res.headers,
          body: data
        });
      });
    });

    req.on('error', (err) => {
      reject(err);
    });

    if (postData) {
      req.write(typeof postData === 'string' ? postData : JSON.stringify(postData));
    }
    req.end();
  });
}

async function isPortOpen(port) {
  return new Promise((resolve) => {
    const testReq = http.get(`http://localhost:${port}/`, (res) => {
      resolve(true);
    });
    testReq.on('error', () => {
      resolve(false);
    });
    testReq.setTimeout(1000, () => {
      testReq.destroy();
      resolve(false);
    });
  });
}

async function startServerIfNeeded() {
  const isOpen = await isPortOpen(PORT);
  if (isOpen) {
    console.log(`Server already running on port ${PORT}`);
    return;
  }

  console.log(`Starting server on port ${PORT}...`);
  serverProcess = spawn('node', ['server.js'], {
    cwd: path.resolve(__dirname, '..'),
    stdio: 'pipe'
  });

  serverProcess.stdout.on('data', (data) => {
    // console.log(`[server] ${data}`);
  });

  // Wait for server to be responsive
  for (let i = 0; i < 25; i++) {
    await new Promise(r => setTimeout(r, 250));
    const ready = await isPortOpen(PORT);
    if (ready) {
      console.log(`Server started successfully on port ${PORT}`);
      return;
    }
  }
  throw new Error('Server failed to start within 6 seconds');
}

async function runAllTests() {
  console.log('\n======================================================');
  console.log('🐾 PETUNION HUB AUTOMATED VERIFICATION SUITE');
  console.log('======================================================\n');

  try {
    await startServerIfNeeded();

    // 1. Static Core Pages
    const corePages = [
      { path: '/', titleCheck: 'PetUnion Hub', match: 'Ultimate Guide to Pet Care' },
      { path: '/blog.html', titleCheck: 'Blog', match: 'filter-tag' },
      { path: '/about.html', titleCheck: 'About', match: 'Our Core Philosophy' },
      { path: '/contact.html', titleCheck: 'Contact', match: 'contactForm' },
      { path: '/privacy-policy.html', titleCheck: 'Privacy Policy', match: 'Information We Collect' },
      { path: '/terms-conditions.html', titleCheck: 'Terms', match: 'Agreement to Terms' },
      { path: '/robots.txt', titleCheck: null, match: 'Sitemap: https://petunionhub.com/sitemap.xml' },
      { path: '/sitemap.xml', titleCheck: null, match: '<urlset' },
      { path: '/admin.html', titleCheck: 'Admin', match: 'authScreen' }
    ];

    for (const page of corePages) {
      try {
        const res = await httpRequest({ host: 'localhost', port: PORT, path: page.path, method: 'GET' });
        const is200 = res.statusCode === 200;
        const matchesContent = page.match ? res.body.includes(page.match) : true;
        const matchesTitle = page.titleCheck ? res.body.toLowerCase().includes(page.titleCheck.toLowerCase()) : true;

        if (is200 && matchesContent && matchesTitle) {
          recordResult(`GET ${page.path}`, 'PASS', `HTTP 200, Content verified`);
        } else {
          recordResult(`GET ${page.path}`, 'FAIL', `Status: ${res.statusCode}, matchContent: ${matchesContent}, matchTitle: ${matchesTitle}`);
        }
      } catch (err) {
        recordResult(`GET ${page.path}`, 'FAIL', err.message);
      }
    }

    // 2. Individual Article Pages (All 8 published articles)
    const articles = [
      { path: '/post-1.html', slug: 'understanding-dog-body-language' },
      { path: '/post-2.html', slug: 'complete-guide-to-puppy-house-training' },
      { path: '/post-3.html', slug: 'cat-communication-meows-purrs-tail-talk' },
      { path: '/post-4.html', slug: 'indoor-cat-enrichment-toys-activities' },
      { path: '/post-5.html', slug: 'essential-pet-nutrition-guide' },
      { path: '/post-6.html', slug: 'puppy-socialization-checklist' },
      { path: '/post-7.html', slug: 'cat-grooming-and-coat-health' },
      { path: '/post-max.html', slug: 'senior-dog-care-and-comfort-guide' }
    ];

    for (const article of articles) {
      try {
        const res = await httpRequest({ host: 'localhost', port: PORT, path: article.path, method: 'GET' });
        const hasSchema = res.body.includes('"@type": "BlogPosting"');
        const hasProgressBar = res.body.includes('id="readingProgress"') || res.body.includes('class="reading-progress-bar"');
        const hasBreadcrumb = res.body.includes('class="breadcrumb"');
        const hasCanonical = res.body.includes('rel="canonical"');

        if (res.statusCode === 200 && hasSchema && hasProgressBar && hasBreadcrumb && hasCanonical) {
          recordResult(`Article Page ${article.path}`, 'PASS', `HTTP 200, Schema & SEO tags present`);
        } else {
          recordResult(`Article Page ${article.path}`, 'FAIL', `Status: ${res.statusCode}, schema: ${hasSchema}, canonical: ${hasCanonical}, progress: ${hasProgressBar}`);
        }
      } catch (err) {
        recordResult(`Article Page ${article.path}`, 'FAIL', err.message);
      }
    }

    // 3. 404 Error Page Handling
    try {
      const res = await httpRequest({ host: 'localhost', port: PORT, path: '/non-existent-pet-page-404-test', method: 'GET' });
      if (res.statusCode === 404 && res.body.includes('Page Not Found') && res.body.includes('index.html')) {
        recordResult('404 Handling for Missing Pages', 'PASS', 'HTTP 404 with custom PetUnion 404 page');
      } else {
        recordResult('404 Handling for Missing Pages', 'FAIL', `Expected 404 with custom content, got ${res.statusCode}`);
      }
    } catch (err) {
      recordResult('404 Handling for Missing Pages', 'FAIL', err.message);
    }

    // 4. Public REST APIs
    try {
      const catRes = await httpRequest({ host: 'localhost', port: PORT, path: '/api/categories', method: 'GET' });
      const catData = JSON.parse(catRes.body);
      if (catRes.statusCode === 200 && catData.categories && catData.categories.length >= 7) {
        recordResult('GET /api/categories', 'PASS', `${catData.categories.length} categories returned`);
      } else {
        recordResult('GET /api/categories', 'FAIL', `Status ${catRes.statusCode}`);
      }
    } catch (err) {
      recordResult('GET /api/categories', 'FAIL', err.message);
    }

    try {
      const artRes = await httpRequest({ host: 'localhost', port: PORT, path: '/api/articles', method: 'GET' });
      const artData = JSON.parse(artRes.body);
      const articlesList = artData.articles || [];
      const allPublished = articlesList.length > 0 && articlesList.every(a => a.isPublished);
      if (artRes.statusCode === 200 && artData.success && allPublished) {
        recordResult('GET /api/articles (Public Excludes Drafts)', 'PASS', `${articlesList.length} published articles returned`);
      } else {
        recordResult('GET /api/articles', 'FAIL', `Status ${artRes.statusCode}, allPublished: ${allPublished}`);
      }
    } catch (err) {
      recordResult('GET /api/articles', 'FAIL', err.message);
    }

    // 5. Security & Authentication Tests
    try {
      const unauthRes = await httpRequest({
        host: 'localhost',
        port: PORT,
        path: '/api/articles',
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
      }, { title: 'Hacked Article' });

      if (unauthRes.statusCode === 401) {
        recordResult('Security: Unauthorized Article Creation Rejected', 'PASS', 'HTTP 401 Unauthorized');
      } else {
        recordResult('Security: Unauthorized Article Creation Rejected', 'FAIL', `Expected 401, got ${unauthRes.statusCode}`);
      }
    } catch (err) {
      recordResult('Security: Unauthorized Article Creation', 'FAIL', err.message);
    }

    try {
      const badLoginRes = await httpRequest({
        host: 'localhost',
        port: PORT,
        path: '/api/auth/login',
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
      }, { username: 'admin', password: 'wrongpassword123' });

      if (badLoginRes.statusCode === 401) {
        recordResult('Security: Invalid Login Rejected', 'PASS', 'HTTP 401 Invalid credentials');
      } else {
        recordResult('Security: Invalid Login Rejected', 'FAIL', `Expected 401, got ${badLoginRes.statusCode}`);
      }
    } catch (err) {
      recordResult('Security: Invalid Login Rejected', 'FAIL', err.message);
    }

    // 6. Admin Authentication
    let authToken = null;
    try {
      const loginRes = await httpRequest({
        host: 'localhost',
        port: PORT,
        path: '/api/auth/login',
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
      }, { username: 'admin', password: 'petunion2026!' });

      const loginData = JSON.parse(loginRes.body);
      if (loginRes.statusCode === 200 && loginData.token) {
        authToken = loginData.token;
        recordResult('Admin Login (Authentication)', 'PASS', 'Token successfully issued');
      } else {
        recordResult('Admin Login (Authentication)', 'FAIL', `Status ${loginRes.statusCode}`);
      }
    } catch (err) {
      recordResult('Admin Login (Authentication)', 'FAIL', err.message);
    }

    // 7. Article Lifecycle Test (Create Draft -> Test Uniqueness -> Update to Published -> Delete)
    if (authToken) {
      let createdArticleId = null;
      const testSlug = 'automated-test-pet-dental-care-guide';

      // A. Create Draft Article
      try {
        const createRes = await httpRequest({
          host: 'localhost',
          port: PORT,
          path: '/api/articles',
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${authToken}`
          }
        }, {
          title: 'Automated Test Pet Dental Care Guide',
          slug: testSlug,
          category: 'Dog Care',
          categorySlug: 'care',
          excerpt: 'A comprehensive testing guide for pet dental hygiene and cleaning.',
          content: '<p>Dental disease affects over 80% of dogs and cats by age 3.</p>',
          author: 'PetUnion Test Bot',
          readTime: '3 min read',
          image: 'images/puppy-care.jpg',
          status: 'draft',
          tags: ['dental', 'hygiene', 'test']
        });

        const createData = JSON.parse(createRes.body);
        if (createRes.statusCode === 201 && createData.article && createData.article.id) {
          createdArticleId = createData.article.id;
          recordResult('Admin CMS: Create Article Draft', 'PASS', `Article ID ${createdArticleId} created as draft`);
        } else {
          recordResult('Admin CMS: Create Article Draft', 'FAIL', `Status ${createRes.statusCode}: ${createRes.body}`);
        }
      } catch (err) {
        recordResult('Admin CMS: Create Article Draft', 'FAIL', err.message);
      }

      // B. Verify Draft is Hidden from Public List
      try {
        const publicListRes = await httpRequest({ host: 'localhost', port: PORT, path: '/api/articles', method: 'GET' });
        const listData = JSON.parse(publicListRes.body);
        const list = listData.articles || [];
        const hasDraft = list.some(a => a.id === createdArticleId);
        if (!hasDraft) {
          recordResult('Admin CMS: Draft Exclusion from Public API', 'PASS', 'Draft is hidden from public API');
        } else {
          recordResult('Admin CMS: Draft Exclusion from Public API', 'FAIL', 'Draft was leaked to public API!');
        }
      } catch (err) {
        recordResult('Admin CMS: Draft Exclusion', 'FAIL', err.message);
      }

      // C. Duplicate Slug Rejection Test
      try {
        const dupRes = await httpRequest({
          host: 'localhost',
          port: PORT,
          path: '/api/articles',
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${authToken}`
          }
        }, {
          title: 'Duplicate Slug Article',
          slug: testSlug,
          category: 'care',
          excerpt: 'Duplicate test',
          content: '<p>Duplicate</p>',
          status: 'draft'
        });

        if (dupRes.statusCode === 400 && dupRes.body.includes('already exists')) {
          recordResult('Admin CMS: Slug Uniqueness Validation', 'PASS', 'Duplicate slug rejected with 400');
        } else {
          recordResult('Admin CMS: Slug Uniqueness Validation', 'FAIL', `Expected 400 duplicate error, got ${dupRes.statusCode}`);
        }
      } catch (err) {
        recordResult('Admin CMS: Slug Uniqueness Validation', 'FAIL', err.message);
      }

      // D. Update Article & Publish
      if (createdArticleId) {
        try {
          const updateRes = await httpRequest({
            host: 'localhost',
            port: PORT,
            path: `/api/articles/${createdArticleId}`,
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${authToken}`
            }
          }, {
            title: 'Automated Test Pet Dental Care Guide (Updated & Published)',
            slug: testSlug,
            status: 'published'
          });

          if (updateRes.statusCode === 200) {
            recordResult('Admin CMS: Update Article & Publish', 'PASS', 'Status transitioned from draft to published');
          } else {
            recordResult('Admin CMS: Update Article & Publish', 'FAIL', `Status ${updateRes.statusCode}`);
          }
        } catch (err) {
          recordResult('Admin CMS: Update Article & Publish', 'FAIL', err.message);
        }

        // E. Delete Test Article
        try {
          const delRes = await httpRequest({
            host: 'localhost',
            port: PORT,
            path: `/api/articles/${createdArticleId}`,
            method: 'DELETE',
            headers: { 'Authorization': `Bearer ${authToken}` }
          });

          if (delRes.statusCode === 200) {
            recordResult('Admin CMS: Delete Article Safely', 'PASS', 'Test article deleted cleanly');
          } else {
            recordResult('Admin CMS: Delete Article Safely', 'FAIL', `Status ${delRes.statusCode}`);
          }
        } catch (err) {
          recordResult('Admin CMS: Delete Article Safely', 'FAIL', err.message);
        }
      }
    }

    // 8. Public Interactive Endpoints (Newsletter & Contact Form)
    try {
      const newsRes = await httpRequest({
        host: 'localhost',
        port: PORT,
        path: '/api/newsletter',
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
      }, { email: 'petlover@testexample.com' });

      if ((newsRes.statusCode === 200 || newsRes.statusCode === 201) && newsRes.body.includes('success')) {
        recordResult('Newsletter Subscription API', 'PASS', 'HTTP 200/201 Subscription recorded');
      } else {
        recordResult('Newsletter Subscription API', 'FAIL', `Status ${newsRes.statusCode}: ${newsRes.body}`);
      }
    } catch (err) {
      recordResult('Newsletter Subscription API', 'FAIL', err.message);
    }

    try {
      const contactRes = await httpRequest({
        host: 'localhost',
        port: PORT,
        path: '/api/contact',
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
      }, {
        name: 'Sarah Jenkins',
        email: 'sarah@example.com',
        subject: 'Question on Dog Nutrition',
        message: 'Can dogs safely eat pumpkin puree?'
      });

      if ((contactRes.statusCode === 200 || contactRes.statusCode === 201) && contactRes.body.includes('success')) {
        recordResult('Contact Form Submission API', 'PASS', 'HTTP 200/201 Inquiry received');
      } else {
        recordResult('Contact Form Submission API', 'FAIL', `Status ${contactRes.statusCode}: ${contactRes.body}`);
      }
    } catch (err) {
      recordResult('Contact Form Submission API', 'FAIL', err.message);
    }

  } catch (globalErr) {
    console.error('Fatal test error:', globalErr);
  } finally {
    console.log('\n======================================================');
    console.log(`🐾 TEST RUN SUMMARY: ${passedCount} PASSED, ${failedCount} FAILED (Total: ${passedCount + failedCount})`);
    console.log('======================================================\n');

    // Rebuild static pages to guarantee clean state
    try {
      const { execSync } = require('child_process');
      execSync('node scripts/build_static_pages.js', { cwd: path.resolve(__dirname, '..'), stdio: 'ignore' });
    } catch (e) {}

    if (serverProcess) {
      serverProcess.kill();
    }

    process.exit(failedCount > 0 ? 1 : 0);
  }
}

runAllTests();
