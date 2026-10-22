const fs = require('fs');
const path = require('path');

const rootDir = path.join(__dirname, '..');
const articlesPath = path.join(rootDir, 'data', 'articles.json');
const articles = JSON.parse(fs.readFileSync(articlesPath, 'utf8'));

// Only generate pages for published articles
const publishedArticles = articles.filter(a => a.isPublished);

function generateArticleHtml(article, allPublished) {
  const currentIndex = allPublished.findIndex(a => a.id === article.id);
  const prevArticle = currentIndex > 0 ? allPublished[currentIndex - 1] : null;
  const nextArticle = currentIndex < allPublished.length - 1 ? allPublished[currentIndex + 1] : null;

  // Related articles (same category or closest)
  const related = allPublished
    .filter(a => a.id !== article.id && (a.categorySlug === article.categorySlug || a.category === article.category))
    .slice(0, 3);
  if (related.length < 2) {
    const others = allPublished.filter(a => a.id !== article.id && !related.includes(a)).slice(0, 3 - related.length);
    related.push(...others);
  }

  // Extract H2 headings for Table of Contents
  const h2Matches = [...article.content.matchAll(/<h2>(.*?)<\/h2>/g)];
  let tocHtml = '';
  if (h2Matches.length >= 2) {
    tocHtml = `
      <div class="toc-container">
        <div class="toc-header"><i class="fas fa-list-ul"></i> Table of Contents</div>
        <ul class="toc-list">
          ${h2Matches.map((m, idx) => {
            const rawTitle = m[1].replace(/<[^>]+>/g, '').trim();
            const anchorId = 'section-' + (idx + 1);
            return `<li><a href="#${anchorId}">${rawTitle}</a></li>`;
          }).join('')}
        </ul>
      </div>
    `;
  }

  // Add IDs to H2s in content
  let sectionIndex = 1;
  const contentWithAnchors = article.content.replace(/<h2>(.*?)<\/h2>/g, (match, p1) => {
    const id = 'section-' + (sectionIndex++);
    return `<h2 id="${id}">${p1}</h2>`;
  });

  const canonicalUrl = `https://petunionhub.com/${article.file}`;
  const fullImageUrl = `https://petunionhub.com/${article.image}`;

  // Structured Data
  const jsonLdArticle = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": canonicalUrl
    },
    "headline": article.title,
    "description": article.excerpt,
    "image": fullImageUrl,
    "author": {
      "@type": "Person",
      "name": article.author,
      "jobTitle": article.authorRole || "Pet Care Specialist"
    },
    "publisher": {
      "@type": "Organization",
      "name": "PetUnion Hub",
      "logo": {
        "@type": "ImageObject",
        "url": "https://petunionhub.com/logo.png"
      }
    },
    "datePublished": article.date,
    "dateModified": article.updatedDate || article.date
  };

  const jsonLdBreadcrumbs = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://petunionhub.com/"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Blog",
        "item": "https://petunionhub.com/blog.html"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": article.category,
        "item": `https://petunionhub.com/blog.html?category=${article.categorySlug}`
      },
      {
        "@type": "ListItem",
        "position": 4,
        "name": article.title,
        "item": canonicalUrl
      }
    ]
  };

  return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${article.seoTitle || article.title + ' | PetUnion Hub'}</title>
    <meta name="description" content="${article.seoDescription || article.excerpt}">
    <link rel="canonical" href="${canonicalUrl}">

    <!-- Open Graph / Facebook -->
    <meta property="og:type" content="article">
    <meta property="og:site_name" content="PetUnion Hub">
    <meta property="og:url" content="${canonicalUrl}">
    <meta property="og:title" content="${article.title}">
    <meta property="og:description" content="${article.excerpt}">
    <meta property="og:image" content="${fullImageUrl}">

    <!-- Twitter -->
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="${article.title}">
    <meta name="twitter:description" content="${article.excerpt}">
    <meta name="twitter:image" content="${fullImageUrl}">

    <!-- Google Fonts & Icons -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Outfit:wght@600;700;800;900&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="style.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">

    <!-- Schema.org Structured Data -->
    <script type="application/ld+json">
    ${JSON.stringify(jsonLdArticle, null, 2)}
    </script>
    <script type="application/ld+json">
    ${JSON.stringify(jsonLdBreadcrumbs, null, 2)}
    </script>
</head>
<body>
    <!-- Reading Progress Bar -->
    <div id="readingProgress" class="reading-progress-bar" aria-hidden="true"></div>

    <!-- Header Navigation -->
    <header class="header">
        <div class="container nav">
            <a href="index.html" class="logo">
                <img src="logo.png" alt="PetUnion Hub Logo">
            </a>
            <nav class="nav-links" id="navLinks">
                <a href="index.html">Home</a>
                <a href="blog.html" class="active">Blog</a>
                <a href="about.html">About Us</a>
                <a href="contact.html">Contact</a>
            </nav>
            <button class="mobile-menu-btn" id="mobileMenuBtn" aria-label="Toggle navigation menu">
                <i class="fas fa-bars"></i>
            </button>
        </div>
    </header>

    <main id="mainContent">
        <!-- Breadcrumbs -->
        <div class="container">
            <nav class="breadcrumb" aria-label="Breadcrumb">
                <a href="index.html"><i class="fas fa-home"></i> Home</a>
                <span class="breadcrumb-separator">/</span>
                <a href="blog.html">Blog</a>
                <span class="breadcrumb-separator">/</span>
                <a href="blog.html?category=${article.categorySlug}">${article.category}</a>
                <span class="breadcrumb-separator">/</span>
                <span class="breadcrumb-current" aria-current="page">${article.title}</span>
            </nav>
        </div>

        <!-- Article Container -->
        <article class="article-container">
            <header class="article-header-wrapper">
                <a href="blog.html?category=${article.categorySlug}" class="article-category-badge">${article.category}</a>
                <h1 class="article-main-title">${article.title}</h1>
                <p class="article-excerpt-lead">${article.excerpt}</p>
                
                <div class="article-author-strip">
                    <img src="${article.authorAvatar || 'images/avatar.jpg'}" alt="${article.author}" class="author-avatar-img">
                    <div class="author-text-meta">
                        <span class="author-name-tag">${article.author}</span>
                        <span class="author-role-tag">${article.authorRole || 'Pet Care Contributor'}</span>
                    </div>
                    <div class="article-time-meta">
                        <span><i class="far fa-calendar-alt"></i> ${article.date}</span>
                        ${article.updatedDate ? `<span class="updated-time">• Updated ${article.updatedDate}</span>` : ''}
                        <span><i class="far fa-clock"></i> ${article.readTime}</span>
                    </div>
                </div>
            </header>

            <!-- Featured Image -->
            <div class="article-featured-image-box">
                <img src="${article.image}" alt="${article.imageAlt || article.title}" class="article-main-image" loading="eager">
            </div>

            <!-- Table of Contents (if long article) -->
            ${tocHtml}

            <!-- Main Content Body -->
            <div class="article-body-content">
                ${contentWithAnchors}
            </div>

            <!-- Article Tags -->
            ${article.tags && article.tags.length ? `
            <div class="article-tags-wrap">
                <span class="tags-label"><i class="fas fa-tags"></i> Topics:</span>
                ${article.tags.map(t => `<a href="blog.html?search=${encodeURIComponent(t)}" class="tag-pill">${t}</a>`).join('')}
            </div>
            ` : ''}

            <!-- Social Sharing & Bookmark Bar -->
            <div class="article-share-strip">
                <span class="share-heading">Share this guide with fellow pet lovers:</span>
                <div class="share-buttons">
                    <button class="share-btn share-native" onclick="sharePost('${encodeURIComponent(article.title)}', '${canonicalUrl}')" title="Share Article" aria-label="Share">
                        <i class="fas fa-share-alt"></i> Share
                    </button>
                    <a href="https://twitter.com/intent/tweet?text=${encodeURIComponent(article.title)}&url=${encodeURIComponent(canonicalUrl)}" target="_blank" rel="noopener" class="share-btn share-tw" title="Share on X" aria-label="Share on X">
                        <i class="fab fa-twitter"></i>
                    </a>
                    <a href="https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(canonicalUrl)}" target="_blank" rel="noopener" class="share-btn share-fb" title="Share on Facebook" aria-label="Share on Facebook">
                        <i class="fab fa-facebook-f"></i>
                    </a>
                    <button class="share-btn share-copy" onclick="copyPostLink('${canonicalUrl}')" title="Copy Article Link" aria-label="Copy link">
                        <i class="fas fa-link"></i>
                    </button>
                </div>
            </div>

            <!-- Author Bio Card -->
            <div class="author-bio-card">
                <img src="${article.authorAvatar || 'images/avatar.jpg'}" alt="${article.author}" class="bio-avatar">
                <div class="bio-details">
                    <h3 class="bio-name">Written by ${article.author}</h3>
                    <p class="bio-role">${article.authorRole || 'Pet Care Specialist at PetUnion Hub'}</p>
                    <p class="bio-text">Dedicated to providing research-backed, practical advice to help pet owners give their companions the healthiest, happiest lives possible.</p>
                </div>
            </div>

            <!-- Previous / Next Navigation -->
            <nav class="post-navigation-grid" aria-label="Article navigation">
                ${prevArticle ? `
                <a href="${prevArticle.file}" class="post-nav-card post-nav-prev">
                    <span class="nav-direction"><i class="fas fa-arrow-left"></i> Previous Article</span>
                    <span class="nav-article-title">${prevArticle.title}</span>
                </a>
                ` : '<div class="post-nav-empty"></div>'}

                ${nextArticle ? `
                <a href="${nextArticle.file}" class="post-nav-card post-nav-next">
                    <span class="nav-direction">Next Article <i class="fas fa-arrow-right"></i></span>
                    <span class="nav-article-title">${nextArticle.title}</span>
                </a>
                ` : '<div class="post-nav-empty"></div>'}
            </nav>
        </article>

        <!-- Related Articles -->
        <section class="container section related-section">
            <div class="section-header">
                <h2 class="section-title">Related Articles</h2>
                <a href="blog.html?category=${article.categorySlug}" class="btn btn-outline">Explore More in ${article.category}</a>
            </div>
            <div class="grid-3">
                ${related.map(r => `
                <article class="blog-card" data-category="${r.categorySlug}">
                    <div class="blog-card-img-wrapper">
                        <img src="${r.image}" alt="${r.imageAlt || r.title}" class="blog-card-img" loading="lazy">
                    </div>
                    <div class="blog-card-content">
                        <div class="blog-meta">
                            <span class="blog-category">${r.category}</span>
                            <span>• ${r.readTime}</span>
                        </div>
                        <h3 class="blog-card-title"><a href="${r.file}">${r.title}</a></h3>
                        <p class="blog-card-excerpt">${r.excerpt}</p>
                        <div class="blog-card-footer">
                            <a href="${r.file}" class="read-more">Read Guide <i class="fas fa-arrow-right"></i></a>
                        </div>
                    </div>
                </article>
                `).join('')}
            </div>
        </section>

        <!-- Newsletter Subscription -->
        <section class="newsletter-section">
            <div class="container newsletter-content">
                <div class="newsletter-text">
                    <h2>Get Weekly Pet Care Advice & Guides</h2>
                    <p>Join thousands of loving pet owners who receive our vetted tips on pet nutrition, training, and wellness.</p>
                </div>
                <form class="newsletter-form" onsubmit="handleNewsletter(event)">
                    <input type="email" placeholder="Enter your email address" required aria-label="Email address">
                    <button type="submit" class="btn btn-primary">Subscribe Free</button>
                </form>
            </div>
        </section>
    </main>

    <!-- Footer -->
    <footer class="footer">
        <div class="container">
            <div class="footer-grid">
                <div class="footer-about">
                    <a href="index.html" class="logo"><img src="logo.png" alt="PetUnion Hub"></a>
                    <p>We believe every pet deserves a happy, healthy life. Our mission is to empower pet owners with expert advice, helpful guides, and a loving community.</p>
                    <div class="social-links">
                        <a href="https://facebook.com" target="_blank" rel="noopener" class="social-link" title="Facebook" aria-label="Facebook"><i class="fab fa-facebook-f"></i></a>
                        <a href="https://twitter.com" target="_blank" rel="noopener" class="social-link" title="Twitter" aria-label="Twitter"><i class="fab fa-twitter"></i></a>
                        <a href="https://instagram.com" target="_blank" rel="noopener" class="social-link" title="Instagram" aria-label="Instagram"><i class="fab fa-instagram"></i></a>
                        <a href="https://pinterest.com" target="_blank" rel="noopener" class="social-link" title="Pinterest" aria-label="Pinterest"><i class="fab fa-pinterest-p"></i></a>
                    </div>
                </div>
                <div>
                    <h4 class="footer-title">Quick Links</h4>
                    <div class="footer-links">
                        <a href="index.html">Home</a>
                        <a href="blog.html">Blog</a>
                        <a href="about.html">About Us</a>
                        <a href="contact.html">Contact Us</a>
                        <a href="sitemap.xml">XML Sitemap</a>
                    </div>
                </div>
                <div>
                    <h4 class="footer-title">Categories</h4>
                    <div class="footer-links">
                        <a href="blog.html?category=care">Pet Care Tips</a>
                        <a href="blog.html?category=training">Dog Training</a>
                        <a href="blog.html?category=nutrition">Pet Food & Nutrition</a>
                        <a href="blog.html?category=health">Pet Health</a>
                        <a href="blog.html?category=grooming">Grooming Guide</a>
                        <a href="blog.html?category=adoption">Pet Adoption</a>
                    </div>
                </div>
                <div>
                    <h4 class="footer-title">Legal & Contact</h4>
                    <div class="footer-links">
                        <a href="privacy-policy.html">Privacy Policy</a>
                        <a href="terms-conditions.html">Terms & Conditions</a>
                        <p style="color: var(--text-light); font-size: 0.95rem; margin-top: 10px;">
                            <i class="fas fa-envelope" style="margin-right: 8px; color: var(--primary-color);"></i> hello@petunionhub.com
                        </p>
                    </div>
                </div>
            </div>
            <div class="footer-bottom">
                <p>&copy; 2026 PetUnion Hub. All rights reserved. Made with love for pets worldwide.</p>
            </div>
        </div>
    </footer>

    <!-- Toast Notification Container -->
    <div id="toastContainer" class="toast-container" aria-live="polite"></div>

    <script src="script.js"></script>
    <script>
        function sharePost(title, url) {
            if (navigator.share) {
                navigator.share({ title: decodeURIComponent(title), url: url }).catch(() => {});
            } else {
                copyPostLink(url);
            }
        }
        function copyPostLink(url) {
            navigator.clipboard.writeText(url).then(() => {
                showToast('Article link copied to clipboard!');
            }).catch(() => {
                showToast('Link: ' + url);
            });
        }
    </script>
</body>
</html>`;
}

// Generate static post files
publishedArticles.forEach(article => {
  const html = generateArticleHtml(article, publishedArticles);
  const targetFile = path.join(rootDir, article.file);
  fs.writeFileSync(targetFile, html, 'utf8');
  console.log(`Generated ${article.file} (${html.length} bytes)`);
});

console.log('All published article static files successfully built!');
