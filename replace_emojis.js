const fs = require('fs');
const path = require('path');

const files = fs.readdirSync(__dirname).filter(f => f.startsWith('post-') && f.endsWith('.html'));

const emojiMap = {
    '🐶': '<i class="fas fa-dog heart-icon"></i>',
    '🥩': '<i class="fas fa-bone heart-icon"></i>',
    '🐕': '<i class="fas fa-paw heart-icon"></i>',
    '🛁': '<i class="fas fa-bath heart-icon"></i>',
    '❤️': '<i class="fas fa-heart heart-icon"></i>',
    '🌅': '<i class="fas fa-sun heart-icon"></i>',
    '🐈': '<i class="fas fa-cat heart-icon"></i>'
};

files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    
    // Replace <span class="heart-icon">EMOJI</span> with the corresponding fontawesome icon
    Object.keys(emojiMap).forEach(emoji => {
        const regex = new RegExp(`<span class="heart-icon">${emoji}</span>`, 'g');
        content = content.replace(regex, emojiMap[emoji]);
    });
    
    fs.writeFileSync(file, content);
    console.log('Replaced emoji in ' + file);
});
