const fs = require('fs');

const template = fs.readFileSync('post-max.html', 'utf8');

const post = {
    file: 'post-7.html',
    title: 'Understanding Cat Body Language',
    category: 'Cats',
    readTime: '4 min read',
    author: 'Dr. Emily White',
    date: 'March 8, 2026',
    image: 'images/cat-body-language.jpg',
    imageAlt: 'Curious cat',
    content: `
            <p>Unlike dogs, who often wear their hearts on their sleeves, cats are masters of subtle communication. To the untrained eye, a cat might seem aloof or unpredictable. However, once you learn to read their body language, you'll discover they are constantly talking to you.</p>
            
            <h2>The Tale of the Tail</h2>
            <p>A cat's tail is a barometer of their mood. A tail held high in the air like a flagpole indicates a confident, happy cat. A slight twitch at the tip means they are curious or excited. Conversely, a rapidly swishing or thumping tail is a clear warning sign of irritation or overstimulation. If the tail is puffed up, they are frightened and trying to look larger.</p>
            
            <blockquote>"A cat doesn't need words to tell you how they feel. You just have to know how to listen with your eyes."</blockquote>
            
            <h2>Ears and Eyes</h2>
            <p>Ears facing forward indicate a relaxed, attentive cat. If their ears are turned sideways or flattened against their head (often called 'airplane ears'), they are frightened, angry, or aggressive. Similarly, dilated pupils can mean fear or excitement, while slow blinking is a sign of affection and trust—often referred to as a 'kitty kiss'.</p>
            
            <h2>Vocalizations</h2>
            <p>While meows are usually reserved for communicating with humans, purring can mean a variety of things. Most often, it indicates contentment, but cats also purr to self-soothe when they are stressed or in pain. Pay attention to the context and other body language cues.</p>
    `,
    finalMessage: {
        icon: '🐈',
        title: 'Feline Communication',
        text: 'Respecting your cat\'s boundaries based on their body language is the quickest way to build a strong, trusting relationship.'
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

// Replace link
blogHtml = blogHtml.replace(/<a href="#">Understanding Cat Body Language<\/a>/, '<a href="post-7.html">Understanding Cat Body Language</a>');

// Replace the read-more button in the cat category
const articleRegex = /(<article class="blog-card" data-category="cats">.*?)(<div class="blog-card-footer">\s*)<a href="#" class="read-more">Read More/s;
blogHtml = blogHtml.replace(articleRegex, '$1$2<a href="post-7.html" class="read-more">Read More');

fs.writeFileSync('blog.html', blogHtml);
console.log('Updated blog.html');
