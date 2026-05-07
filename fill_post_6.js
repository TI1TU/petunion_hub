const fs = require('fs');

const template = fs.readFileSync('post-max.html', 'utf8');

const post = {
    file: 'post-6.html',
    title: 'Growing Old Together',
    category: 'Emotional',
    readTime: '7 min read',
    author: 'Jessica Smith',
    date: 'February 28, 2026',
    image: 'images/hero-pets.jpg',
    imageAlt: 'Senior dog and cat',
    content: `
            <p>There is a unique kind of quiet that settles over a house when a pet reaches their golden years. The frantic energy of youth is replaced by a gentle rhythm, a deep mutual understanding built over years of shared glances and quiet moments.</p>
            
            <p>Caring for a senior pet is often framed as a burden—the extra vet visits, the special diets, the accommodations for stiff joints. But those who have walked this path know it is one of the greatest privileges.</p>
            
            <h2>The Changing Pace</h2>
            <p>Our morning walks are no longer about exploring every new scent or chasing the neighborhood squirrels. They are slow, deliberate, and deeply present. We walk until he is tired, and then we sit in the grass and simply watch the world go by.</p>
            
            <blockquote>"To love a senior dog is to understand that the best parts of life aren't always the loudest. Sometimes, they are found in the quiet moments of simply being together."</blockquote>
            
            <h2>A Deeper Connection</h2>
            <p>He doesn't hear as well as he used to, and his eyes are cloudy. But our communication has never been clearer. He knows exactly what I'm thinking, and I know exactly what he needs. It's a language built entirely on trust and time.</p>
            
            <p>When you look into the eyes of an old dog, you don't just see a pet. You see your own history reflected back at you. Every late night, every tears shed, every moment of pure joy—they were there for all of it.</p>
    `,
    finalMessage: {
        icon: '🌅',
        title: 'Golden Years',
        text: 'Cherish the slow days. The grey muzzles and cloudy eyes are a testament to a life well-loved and a bond that only deepens with time.'
    }
};

let newHtml = template;

// Title
newHtml = newHtml.replace(/<title>.*?<\/title>/s, `<title>${post.title} | PetUnion Hub Stories</title>`);
newHtml = newHtml.replace(/<h1 class="post-title">.*?<\/h1>/s, `<h1 class="post-title">${post.title}</h1>`);

// Category & Read Time
newHtml = newHtml.replace(/<span class="post-category">.*?<\/span>/s, `<span class="post-category">${post.category}</span>`);
newHtml = newHtml.replace(/<span>\d+ min read<\/span>/s, `<span>${post.readTime}</span>`);

// Author
newHtml = newHtml.replace(/<div class="author-name">.*?<\/div>/s, `<div class="author-name">${post.author}</div>`);
newHtml = newHtml.replace(/<div class="author-date">.*?<\/div>/s, `<div class="author-date">${post.date}</div>`);

// Image
newHtml = newHtml.replace(/<div class="post-featured-image">.*?<\/div>/s, `<div class="post-featured-image">\n                <img src="${post.image}" alt="${post.imageAlt}">\n            </div>`);

// Main Content
const articleStartRegex = /(<article class="post-content">)(.*?)(<div class="final-message-box">)/s;
newHtml = newHtml.replace(articleStartRegex, `$1\n${post.content}\n\n                $3`);

// Final message box
const finalMsgBoxRegex = /(<div class="final-message-box">).*?(<\/div>\s*<div class="share-bar">)/s;
const newFinalMsg = `$1\n                    <span class="heart-icon">${post.finalMessage.icon}</span>\n                    <h3>${post.finalMessage.title}</h3>\n                    <p>${post.finalMessage.text}</p>\n                $2`;
newHtml = newHtml.replace(finalMsgBoxRegex, newFinalMsg);

// Share bar title
newHtml = newHtml.replace(/<span class="share-text">Share Max's story:<\/span>/, `<span class="share-text">Share this story:</span>`);

fs.writeFileSync(post.file, newHtml);
console.log(`Created ${post.file}`);

// Now update blog.html
let blogHtml = fs.readFileSync('blog.html', 'utf8');

// The block starts around line 186, let's find the specific links
// Replace <a href="#">Growing Old Together</a> with <a href="post-6.html">Growing Old Together</a>
blogHtml = blogHtml.replace(/<a href="#">Growing Old Together<\/a>/, '<a href="post-6.html">Growing Old Together</a>');

// Also need to replace the read-more button. Since it's right after "Jessica Smith", let's be more specific.
// It's in the article that has data-category="emotional"
const articleRegex = /(<article class="blog-card" data-category="emotional">.*?)(<div class="blog-card-footer">\s*)<a href="#" class="read-more">Read Story/s;
blogHtml = blogHtml.replace(articleRegex, '$1$2<a href="post-6.html" class="read-more">Read Story');

fs.writeFileSync('blog.html', blogHtml);
console.log('Updated blog.html');
