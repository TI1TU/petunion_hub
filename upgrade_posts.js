const fs = require('fs');
const path = require('path');

const directory = __dirname;
const files = fs.readdirSync(directory).filter(file => file.startsWith('post-') && file.endsWith('.html'));

const template = (title, content, author, date, category, img, readTime) => `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>\${title} | PetUnion Hub</title>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Poppins:wght@500;600;700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="style.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <style>
        .article-hero { position: relative; height: 60vh; min-height: 400px; display: flex; align-items: flex-end; padding-bottom: 50px; }
        .article-hero-bg { position: absolute; top:0; left:0; width:100%; height:100%; object-fit: cover; z-index: -2; }
        .article-overlay { position: absolute; top:0; left:0; width:100%; height:100%; background: linear-gradient(to top, rgba(0,0,0,0.8), rgba(0,0,0,0.2)); z-index: -1; }
        .article-header { color: white; max-width: 800px; margin: 0 auto; width: 100%; padding: 0 24px; }
        .article-category { display: inline-block; background: var(--soft-orange); padding: 5px 15px; border-radius: 50px; font-weight: 600; margin-bottom: 15px; font-size: 0.9rem; }
        .article-title { font-size: 3rem; margin-bottom: 20px; line-height: 1.2; }
        .article-meta { display: flex; gap: 20px; font-size: 1rem; color: rgba(255,255,255,0.8); flex-wrap: wrap; }
        
        .article-body { max-width: 800px; margin: 60px auto; padding: 0 24px; font-size: 1.15rem; line-height: 1.8; color: #334155; }
        .article-body h2 { font-size: 2rem; color: var(--text-dark); margin: 40px 0 20px; }
        .article-body p { margin-bottom: 25px; }
        .article-body img { width: 100%; border-radius: var(--radius-md); margin: 30px 0; box-shadow: var(--shadow-sm); }
        
        .social-share { display: flex; gap: 15px; margin: 40px 0; padding-top: 20px; border-top: 1px solid rgba(0,0,0,0.1); }
        .social-share a { width: 40px; height: 40px; border-radius: 50%; background: var(--white); display: flex; align-items: center; justify-content: center; color: var(--text-dark); box-shadow: var(--shadow-sm); transition: 0.3s; }
        .social-share a:hover { transform: translateY(-3px); color: var(--soft-orange); }
    </style>
</head>
<body>
    <header class="header">
        <div class="nav">
            <a href="index.html" class="logo"><img src="logo.png" alt="PetUnion Hub"></a>
            <nav class="nav-links">
                <a href="index.html">Home</a>
                <a href="blog.html" class="active">Stories & Blogs</a>
                <a href="about.html">About Us</a>
                <a href="contact.html">Contact</a>
            </nav>
        </div>
    </header>

    <main>
        <section class="article-hero">
            <img src="\${img}" class="article-hero-bg" alt="\${title}">
            <div class="article-overlay"></div>
            <div class="article-header">
                <div class="article-category">\${category}</div>
                <h1 class="article-title">\${title}</h1>
                <div class="article-meta">
                    <span><i class="fas fa-user-circle"></i> By \${author}</span>
                    <span><i class="fas fa-calendar-alt"></i> \${date}</span>
                    <span><i class="fas fa-clock"></i> \${readTime} min read</span>
                </div>
            </div>
        </section>

        <section class="article-body">
            \${content}
            
            <div class="social-share">
                <span style="font-weight: 600; line-height: 40px;">Share this story:</span>
                <a href="#"><i class="fab fa-facebook-f"></i></a>
                <a href="#"><i class="fab fa-twitter"></i></a>
                <a href="#"><i class="fas fa-link"></i></a>
            </div>
        </section>
    </main>

    <footer class="footer" style="margin-top: 0;">
        <div class="container">
            <div class="footer-bottom">&copy; 2026 PetUnion Hub. All rights reserved.</div>
        </div>
    </footer>
</body>
</html>`;

files.forEach(file => {
    let content = fs.readFileSync(path.join(directory, file), 'utf8');
    
    // Very basic extraction using regex
    const titleMatch = content.match(/<h1[^>]*>(.*?)<\/h1>/);
    let title = titleMatch ? titleMatch[1].replace(/<[^>]+>/g, '') : "Pet Story";
    
    // Attempt to extract main content (everything inside <article> or <main> minus header)
    let bodyContent = "";
    const articleMatch = content.match(/<article[^>]*>([\s\S]*?)<\/article>/);
    if (articleMatch) {
        bodyContent = articleMatch[1];
        // Remove title from body
        bodyContent = bodyContent.replace(/<h1[^>]*>[\s\S]*?<\/h1>/, '');
        // Remove author/date blocks
        bodyContent = bodyContent.replace(/<div class="meta"[\s\S]*?<\/div>/, '');
        bodyContent = bodyContent.replace(/<div class="author-info"[\s\S]*?<\/div>/, '');
    } else {
        bodyContent = "<p>Welcome to this beautiful pet story.</p>"; // fallback
    }

    // Determine category based on filename
    let category = "Pet Story";
    let img = "images/hero-pets.jpg";
    if(file.includes('max')) { category = "Rescue Stories"; img = "images/max-story.png"; }
    else if(file.includes('1')) { category = "Training"; img = "images/dog-commands.jpg"; }
    else if(file.includes('2')) { category = "Nutrition"; img = "images/dog-treats.jpg"; }
    else if(file.includes('3')) { category = "Grooming"; img = "images/grooming-tools.jpg"; }
    else if(file.includes('4')) { category = "Training"; img = "images/about-original-style.jpg"; }
    else if(file.includes('5')) { category = "Cats"; img = "images/cat-body-language.jpg"; }
    
    let newHtml = template(title, bodyContent, "PetUnion Team", "Oct 4, 2026", category, img, "5");
    
    fs.writeFileSync(path.join(directory, file), newHtml);
    console.log("Upgraded:", file);
});
