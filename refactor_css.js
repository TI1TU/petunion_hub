const fs = require('fs');

const cssAdditions = `
/* --- MASSIVE BLOG REDESIGN --- */

.featured-story-large {
    background: var(--surface);
    border-radius: var(--radius-lg);
    box-shadow: var(--shadow);
    display: flex;
    overflow: hidden;
    margin-bottom: 60px;
    border: 1px solid rgba(0,0,0,0.03);
    transition: var(--transition);
}

.featured-story-large:hover {
    transform: translateY(-8px);
    box-shadow: var(--shadow-hover);
}

.featured-large-img {
    flex: 1.2;
    overflow: hidden;
    position: relative;
    min-height: 400px;
}

.featured-large-img img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.8s cubic-bezier(0.16, 1, 0.3, 1);
}

.featured-story-large:hover .featured-large-img img {
    transform: scale(1.05);
}

.featured-large-content {
    flex: 1;
    padding: 60px;
    display: flex;
    flex-direction: column;
    justify-content: center;
}

.featured-large-content .blog-card-title {
    font-size: 2.5rem;
    margin-bottom: 24px;
    line-height: 1.2;
}

.featured-large-content .blog-card-excerpt {
    font-size: 1.15rem;
    color: var(--text-light);
    margin-bottom: 40px;
    line-height: 1.8;
}

.featured-large-content .blog-card-author-info {
    margin-bottom: 30px;
}

.blog-grid-section {
    margin-bottom: 80px;
}

/* Submit Story Banner */
.story-banner {
    background: linear-gradient(135deg, #FAF8F5 0%, #FFFFFF 100%);
    border-radius: var(--radius-lg);
    padding: 80px 40px;
    text-align: center;
    box-shadow: var(--shadow-hover);
    margin: 80px 0;
    border: 1px solid rgba(160, 82, 45, 0.08);
    position: relative;
    overflow: hidden;
}

.story-banner::before {
    content: '';
    position: absolute;
    top: -50px;
    left: -50px;
    width: 200px;
    height: 200px;
    background: radial-gradient(circle, rgba(248, 150, 30, 0.1) 0%, transparent 70%);
    border-radius: 50%;
}

.story-banner-content {
    position: relative;
    z-index: 1;
    max-width: 600px;
    margin: 0 auto;
}

.story-banner h2 {
    font-size: 2.8rem;
    margin-bottom: 20px;
    color: var(--primary-color);
}

.story-banner p {
    font-size: 1.2rem;
    color: var(--text-light);
    margin-bottom: 40px;
}

/* Mobile Adjustments for new elements */
@media (max-width: 992px) {
    .featured-story-large {
        flex-direction: column;
    }
    
    .featured-large-img {
        min-height: 300px;
    }
    
    .featured-large-content {
        padding: 40px;
    }
    
    .story-banner h2 {
        font-size: 2.2rem;
    }
}
@media (max-width: 768px) {
    .featured-large-content {
        padding: 24px;
    }
    .featured-large-content .blog-card-title {
        font-size: 1.8rem;
    }
}
`;

fs.appendFileSync('style.css', cssAdditions);
console.log('Appended premium CSS components to style.css');
