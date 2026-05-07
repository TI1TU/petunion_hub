const fs = require('fs');

const template = fs.readFileSync('post-max.html', 'utf8');

const posts = [
    {
        file: 'post-1.html',
        title: 'The Ultimate Puppy Care Guide',
        category: 'Dogs',
        readTime: '5 min read',
        author: 'Emma Wilson',
        date: 'March 15, 2026',
        image: 'images/puppy-care.jpg',
        imageAlt: 'Puppies running',
        content: `
                <p>Bringing a new puppy home is one of the most exciting experiences, but it also comes with its fair share of challenges.</p>
                <p>For the first 30 days, your puppy is learning about their new world, their new family, and the rules of the house. Establishing a routine early on is crucial for their development.</p>
                
                <h2>1. Set Up a Safe Space</h2>
                <p>Before your puppy arrives, ensure you have a dedicated space for them. This should include a comfortable bed, water, and some safe chew toys. A crate can be an excellent tool for potty training and giving your puppy a secure place to rest.</p>
                
                <blockquote>"Consistency is the key to a well-behaved puppy. Set the rules from day one, but always enforce them with love."</blockquote>
                
                <h2>2. Establish a Routine</h2>
                <p>Puppies thrive on routine. Try to feed, walk, and put them to bed at the same times every day. This predictability helps them feel secure and accelerates potty training.</p>
                
                <h2>3. The First Vet Visit</h2>
                <p>Schedule a vet visit within the first week. Your vet will check for any underlying health issues and help you set up a vaccination schedule. It’s also a great time to ask questions about diet and behavior.</p>
        `,
        finalMessage: {
            icon: '🐶',
            title: 'Final Tip',
            text: 'Patience is everything. The sleepless nights and chewed shoes will pass, leaving you with an incredible bond and a lifelong best friend.'
        }
    },
    {
        file: 'post-2.html',
        title: 'Top 10 Nutritious Foods',
        category: 'Dogs',
        readTime: '4 min read',
        author: 'Chris Miller',
        date: 'March 2, 2026',
        image: 'images/dog-treats.jpg',
        imageAlt: 'Nutritious food',
        content: `
                <p>What you feed your dog directly impacts their health, energy levels, and lifespan.</p>
                <p>While commercial dog food provides the necessary baseline of nutrition, incorporating fresh, dog-safe whole foods can give your furry friend a significant health boost.</p>
                
                <h2>The Best Additions to Your Dog's Diet</h2>
                <p>Here are some highly nutritious foods you can add to your dog's meals:</p>
                
                <ul>
                    <li style="margin-bottom: 10px;"><strong>Carrots:</strong> Excellent for dental health and rich in Vitamin A.</li>
                    <li style="margin-bottom: 10px;"><strong>Blueberries:</strong> Packed with antioxidants that prevent cell damage.</li>
                    <li style="margin-bottom: 10px;"><strong>Sweet Potatoes:</strong> Great source of dietary fiber and vitamin B6.</li>
                    <li style="margin-bottom: 10px;"><strong>Salmon:</strong> Rich in omega-3 fatty acids, promoting a healthy coat and reducing inflammation.</li>
                </ul>
                
                <blockquote>"A balanced diet is the foundation of preventive medicine for your pet."</blockquote>
                
                <h2>Foods to Always Avoid</h2>
                <p>Never feed your dog chocolate, grapes, onions, garlic, or xylitol, as these are highly toxic and can cause severe health issues.</p>
        `,
        finalMessage: {
            icon: '🥩',
            title: 'Healthy Choices',
            text: 'Always introduce new foods slowly to avoid upsetting your dog\'s stomach. When in doubt, consult your veterinarian.'
        }
    },
    {
        file: 'post-3.html',
        title: '5 Basic Commands Every Dog Should Know',
        category: 'Dogs',
        readTime: '6 min read',
        author: 'Sarah Jones',
        date: 'March 10, 2026',
        image: 'images/dog-commands.jpg',
        imageAlt: 'Owner petting dog',
        content: `
                <p>Training your dog is not just about showing off tricks; it's about establishing communication, ensuring safety, and building a strong bond.</p>
                
                <h2>1. Sit</h2>
                <p>This is the easiest command and the foundation of all other training. Hold a treat close to their nose, move your hand up, allowing their head to follow the treat and causing their bottom to lower. Once they sit, say "Sit," give them the treat, and share affection.</p>
                
                <h2>2. Stay</h2>
                <p>Before teaching this, your dog must know how to sit. Ask your dog to sit, open the palm of your hand in front of you, and say "Stay." Take a few steps back. Reward them if they stay. This command requires self-control, so patience is crucial.</p>
                
                <blockquote>"Training is a lifelong journey. Short, positive, and consistent sessions yield the best results."</blockquote>
                
                <h2>3. Come</h2>
                <p>This command can keep a dog out of trouble. Put a leash and collar on your dog. Go down to their level and say "Come," while gently pulling on the leash. Reward them when they reach you.</p>
                
                <h2>4. Down</h2>
                <p>This is a more difficult command because it puts the dog in a submissive posture. Start with a treat in your hand, lower it to the floor, and once their elbows hit the floor, say "Down" and reward them.</p>
                
                <h2>5. Leave It</h2>
                <p>Essential for their safety when they find something they shouldn't eat. It requires practice and high-value treats to teach them that ignoring the forbidden item yields a better reward.</p>
        `,
        finalMessage: {
            icon: '🐕',
            title: 'Training Tip',
            text: 'Keep training sessions short (5-10 minutes) and end on a positive note. Your dog wants to please you; they just need to learn how!'
        }
    },
    {
        file: 'post-4.html',
        title: 'How to Groom Your Dog at Home',
        category: 'Dogs',
        readTime: '10 min read',
        author: 'David Miller',
        date: 'March 12, 2026',
        image: 'images/grooming-tools.jpg',
        imageAlt: 'Dog being groomed',
        content: `
                <p>Regular grooming is an essential part of your dog's health routine. It keeps their coat clean, their skin healthy, and gives you a chance to check for lumps, bumps, or parasites.</p>
                
                <h2>The Right Tools for the Job</h2>
                <p>Before you begin, gather your supplies. You'll need a suitable brush for your dog's coat type, dog-specific shampoo, nail clippers, styptic powder (in case you cut a nail too short), and ear cleaning solution.</p>
                
                <blockquote>"Grooming should be a bonding experience, not a battle. Take it slow and use plenty of positive reinforcement."</blockquote>
                
                <h2>Brushing is Foundation</h2>
                <p>Brush your dog thoroughly before a bath to remove mats and loose fur. Depending on the breed, brushing might be a daily or weekly requirement.</p>
                
                <h2>Bath Time</h2>
                <p>Use lukewarm water and dog-specific shampoo. Avoid getting water in their ears and eyes. Rinse thoroughly, as leftover shampoo can irritate the skin. Towel dry or use a dog dryer on a cool setting.</p>
                
                <h2>Nail Trimming</h2>
                <p>This is often the most stressful part for both dog and owner. Trim just the tip of the nail, avoiding the quick (the pink part containing blood vessels). If you're unsure, ask your vet to demonstrate.</p>
        `,
        finalMessage: {
            icon: '🛁',
            title: 'Grooming Goal',
            text: 'Consistency makes grooming easier over time. Reward your dog frequently during the process so they associate grooming with good things.'
        }
    },
    {
        file: 'post-5.html',
        title: 'The Day Bruno Saved Me ❤️🐶',
        category: 'Rescue Stories',
        readTime: '3 min read',
        author: 'Rahul & Bruno',
        date: 'April 3, 2026',
        image: 'images/bruno.png',
        imageAlt: 'Bruno the rescue dog',
        content: `
                <p>People often say that adopting a dog saves the dog's life. But in my case, Bruno saved mine.</p>
                
                <p>It was a dark period in my life. I had lost my job, and the isolation was suffocating. I went to the shelter not looking for a dog, but just looking for some connection.</p>
                
                <h2>Meeting Bruno</h2>
                <p>Bruno was sitting in the corner of his kennel. He wasn't barking or jumping; he just looked tired. We locked eyes, and I saw a reflection of how I felt inside.</p>
                
                <blockquote>"They say you don't choose the dog, the dog chooses you. Bruno didn't just choose me; he decided we were going to get through this together."</blockquote>
                
                <h2>The First Steps to Healing</h2>
                <p>Bringing Bruno home forced me into a routine. He needed to be walked, which meant I had to go outside. He needed to be fed, which gave me a sense of responsibility. Slowly, the thick fog began to lift.</p>
                
                <p>His unwavering loyalty and joy in the simple things—a falling leaf, a good scratch behind the ears—reminded me of the beauty in the world.</p>
        `,
        finalMessage: {
            icon: '❤️',
            title: 'A Lifeline',
            text: 'If you\'re thinking about getting a pet, don\'t think twice. They don\'t just enter your home — they change your life completely.'
        }
    }
];

posts.forEach(post => {
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
    console.log(`Updated ${post.file}`);
});
