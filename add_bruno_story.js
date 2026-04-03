const fs = require('fs');

// Create post-5.html
const indexHtml = fs.readFileSync('index.html', 'utf8');
const headerMatch = indexHtml.match(/<header class="header">([\s\S]*?)<\/header>/);
const footerMatch = indexHtml.match(/<footer class="footer">([\s\S]*?)<\/footer>/);

const headerContent = headerMatch[0].replace(/class="active">Home<\/a>/, '>Home</a>').replace(/>Blog<\/a>/, ' class="active">Blog</a>');
const footerContent = footerMatch[0];

const postContent = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>The Day Bruno Saved Me | PetUnion Hub</title>
    <meta name="description" content="A heartwarming rescue story of how a dog named Bruno saved his owner's life.">
    <link rel="stylesheet" href="style.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <style>
        .post-header { max-width: 800px; margin: 0 auto; padding-bottom: 32px; text-align: center; }
        .post-meta { display: flex; justify-content: center; align-items: center; gap: 16px; margin-bottom: 24px; color: var(--text-light); }
        .post-category { background: rgba(212, 163, 115, 0.15); color: var(--accent-color); padding: 4px 12px; border-radius: 20px; font-weight: 600; font-size: 0.875rem; text-transform: uppercase; letter-spacing: 0.5px; }
        .post-title { font-size: 3rem; margin-bottom: 24px; }
        .post-author { display: flex; align-items: center; gap: 12px; }
        .author-img { width: 48px; height: 48px; border-radius: 50%; object-fit: cover; }
        .author-info { text-align: left; }
        .author-name { font-weight: 600; color: var(--text-color); }
        .author-date { font-size: 0.875rem; color: var(--text-light); }
        
        .post-featured-image { width: 100%; max-width: 1000px; margin: 0 auto 48px; border-radius: 30px; overflow: hidden; box-shadow: var(--shadow); }
        .post-featured-image img { width: 100%; height: auto; max-height: 500px; object-fit: cover; }
        
        .post-content { max-width: 800px; margin: 0 auto; font-size: 1.125rem; }
        .post-content h2 { font-size: 2rem; margin: 48px 0 24px; }
        .post-content h3 { font-size: 1.5rem; margin: 32px 0 16px; }
        .post-content p { margin-bottom: 24px; line-height: 1.8; }
        .post-content ul, .post-content ol { margin-bottom: 24px; padding-left: 24px; }
        .post-content li { margin-bottom: 12px; line-height: 1.8; }
        .post-content img { border-radius: 16px; margin: 32px 0; width: 100%; box-shadow: var(--shadow); }
        .post-content blockquote { border-left: 4px solid var(--primary-color); padding-left: 24px; font-style: italic; color: var(--text-light); margin: 32px 0; font-size: 1.25rem; font-family: 'Outfit', sans-serif; }
        
        .share-bar { display: flex; gap: 12px; align-items: center; margin-top: 60px; padding-top: 32px; border-top: 1px solid rgba(0,0,0,0.1); }
        .share-text { font-weight: 600; margin-right: 12px; font-family: 'Outfit', sans-serif;}
        .share-btn { width: 40px; height: 40px; border-radius: 50%; display: flex; align-items: center; justify-content: center; background: var(--bg-color); border: 1px solid rgba(0,0,0,0.05); transition: var(--transition); color: var(--primary-color); cursor: pointer; }
        .share-btn:hover { background: var(--primary-color); color: var(--white); border-color: var(--primary-color); }
    </style>
</head>
<body>
    ${headerContent}

    <main>
        <section class="container section">
            <div class="post-header">
                <div class="post-meta">
                    <span class="post-category">Rescue Stories</span>
                    <span>3 min read</span>
                </div>
                <h1 class="post-title">The Day Bruno Saved Me ❤️🐶</h1>
                <div class="post-author" style="justify-content: center;">
                    <div class="author-info" style="text-align: center;">
                        <div class="author-name">Rahul & Bruno</div>
                        <div class="author-date">April 3, 2026</div>
                    </div>
                </div>
            </div>

            <div class="post-featured-image">
                <img src="images/bruno.png" alt="A heartwarming portrait of a rescue dog named Bruno">
            </div>

            <article class="post-content">
                <p>Hi, my name is Rahul, and I want to share a story about my dog Bruno.</p>
                
                <p>Two years ago, I was going through a really difficult time in my life. I felt lost, stressed, and honestly very alone. One day, my friend suggested I adopt a pet. I wasn’t sure at first, but I visited a local shelter — and that’s where I met Bruno.</p>

                <p>He was sitting quietly in a corner, looking a little scared. The moment I looked into his eyes, I felt something special. I brought him home the same day.</p>

                <p>At first, Bruno was shy and nervous. But slowly, he started opening up. Every morning, he would come and sit next to me, wagging his tail like he was saying, "I'm here for you."</p>

                <p>One evening, I was feeling really low and just sitting silently. Bruno came and rested his head on my lap. That simple moment changed everything. I realized I wasn’t alone anymore.</p>

                <p>Today, Bruno is not just my pet — he is my best friend, my support system, and my happiness.</p>

                <blockquote>"If you’re thinking about getting a pet, don’t think twice. They don’t just enter your home — they change your life."</blockquote>

                <p>Thank you for reading my story ❤️🐾<br>- Rahul & Bruno</p>

                <div class="share-bar">
                    <span class="share-text">Share this story:</span>
                    <a href="#" class="share-btn"><i class="fab fa-facebook-f"></i></a>
                    <a href="#" class="share-btn"><i class="fab fa-twitter"></i></a>
                    <a href="#" class="share-btn"><i class="fab fa-pinterest-p"></i></a>
                    <a href="#" class="share-btn"><i class="fas fa-link"></i></a>
                </div>
            </article>
        </section>
    </main>

    ${footerContent}

    <script src="script.js"></script>
</body>
</html>`;

fs.writeFileSync('post-5.html', postContent);

// Add to blog.html
let blogHtml = fs.readFileSync('blog.html', 'utf8');
const newBlogCard = `
                        <!-- Blog Card 5 (User Submitted) -->
                        <article class="blog-card" data-category="rescue">
                            <div class="blog-card-img-wrapper">
                                <img src="images/bruno.png" alt="Bruno the rescue dog" class="blog-card-img">
                            </div>
                            <div class="blog-card-content">
                                <div class="blog-meta">
                                    <span class="blog-category">Rescue Stories</span>
                                    <span>• 3 min read</span>
                                </div>
                                <h3 class="blog-card-title"><a href="post-5.html">The Day Bruno Saved Me ❤️🐶</a></h3>
                                <p class="blog-card-excerpt">A heartwarming story from our community about adopting Bruno, and how a rescue dog became a lifeline during tough times.</p>
                                <div class="blog-card-author-info">
                                    <span class="author">Rahul & Bruno</span>
                                    <span class="date">April 3, 2026</span>
                                </div>
                                <div class="blog-card-footer">
                                    <a href="post-5.html" class="read-more">Read Story <i class="fas fa-arrow-right"></i></a>
                                </div>
                            </div>
                        </article>
`;
blogHtml = blogHtml.replace(/<div class="grid-2">/, '<div class="grid-2">' + newBlogCard);

// Also add a filter tag for "rescue" since it's a new category
if (!blogHtml.includes('data-category="rescue"')) {
    blogHtml = blogHtml.replace(/<div class="filter-tag" data-category="grooming">Grooming<\/div>/, '<div class="filter-tag" data-category="grooming">Grooming</div>\n                <div class="filter-tag" data-category="rescue">Rescue Stories</div>');
}

fs.writeFileSync('blog.html', blogHtml);

console.log('Story added!');
