const fs = require('fs');
const path = require('path');

const files = fs.readdirSync(__dirname).filter(f => f.startsWith('post-') && f.endsWith('.html'));

files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    
    // Replace the background gradient
    content = content.replace(
        /background:\s*linear-gradient\(135deg,\s*var\(--primary-color\),\s*var\(--secondary-color\)\);/,
        'background: var(--primary-gradient);'
    );
    
    // Add color: var(--white); to h3
    content = content.replace(
        /\.final-message-box\s*h3\s*\{\s*font-size:\s*1\.8rem;\s*margin-bottom:\s*15px;\s*font-family:\s*'Outfit',\s*sans-serif;\s*\}/,
        ".final-message-box h3 { font-size: 1.8rem; margin-bottom: 15px; font-family: 'Outfit', sans-serif; color: var(--white); }"
    );
    
    // Add color: var(--white); to p
    content = content.replace(
        /\.final-message-box\s*p\s*\{\s*font-size:\s*1\.2rem;\s*line-height:\s*1\.6;\s*opacity:\s*0\.95;\s*margin-bottom:\s*0;\s*\}/,
        ".final-message-box p { font-size: 1.2rem; line-height: 1.6; opacity: 0.95; margin-bottom: 0; color: var(--white); }"
    );
    
    fs.writeFileSync(file, content);
    console.log('Fixed ' + file);
});
