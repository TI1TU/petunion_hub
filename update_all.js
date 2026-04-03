const fs = require('fs');
const path = require('path');

const dir = './';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.html') && f !== 'index.html');

const indexHtml = fs.readFileSync('index.html', 'utf8');

const headerMatch = indexHtml.match(/<header class="header">([\s\S]*?)<\/header>/);
const footerMatch = indexHtml.match(/<footer class="footer">([\s\S]*?)<\/footer>/);

if (!headerMatch || !footerMatch) {
    console.error('Could not find header or footer in index.html');
    process.exit(1);
}

const headerContent = headerMatch[0];
const footerContent = footerMatch[0];

for (const file of files) {
    let content = fs.readFileSync(file, 'utf8');
    
    // Replace header
    content = content.replace(/<header class="header">[\s\S]*?<\/header>/, headerContent);
    
    // Replace footer
    content = content.replace(/<footer class="footer">[\s\S]*?<\/footer>/, footerContent);
    
    // Additionally, remove cta-section if it has "Products" or replace text related to products
    content = content.replace(/Best Food for Pets/g, 'Rescue Stories');
    content = content.replace(/Dog Training Tips/g, 'Funny Moments');
    content = content.replace(/Pet Health Tips/g, 'Emotional Connections');
    
    fs.writeFileSync(file, content);
    console.log(`Updated ${file}`);
}
