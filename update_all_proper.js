const fs = require('fs');

const indexHtml = fs.readFileSync('index.html', 'utf8');

const headerMatch = indexHtml.match(/<header class="header">([\s\S]*?)<\/header>/);
const footerMatch = indexHtml.match(/<footer class="footer">([\s\S]*?)<\/footer>/);

const headerContent = headerMatch[0];
const footerContent = footerMatch[0];

const files = fs.readdirSync('.').filter(f => f.endsWith('.html') && f !== 'index.html');
files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    
    // Replace header
    content = content.replace(/<header class="header">[\s\S]*?<\/header>/, headerContent);
    // Replace footer
    content = content.replace(/<footer class="footer">[\s\S]*?<\/footer>/, footerContent);
    
    // Fix active link in header based on filename
    content = content.replace(/class="active">Home<\/a>/, '>Home</a>'); // clear index active
    
    // Set active link properly
    if (file === 'about.html') {
        content = content.replace(/(<a href="about.html")>/, '$1 class="active">');
    } else if (file === 'blog.html') {
        content = content.replace(/(<a href="blog.html")>/, '$1 class="active">');
    } else if (file === 'contact.html') {
        content = content.replace(/(<a href="contact.html")>/, '$1 class="active">');
    } else if (file.startsWith('post-')) {
        content = content.replace(/(<a href="blog.html")>/, '$1 class="active">');
    }

    fs.writeFileSync(file, content);
    console.log('Updated ' + file);
});
