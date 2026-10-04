const fs = require('fs');

// 1. Fix CSS
let css = fs.readFileSync('style.css', 'utf8');

// Replace Hero Styles to make it a side-by-side layout instead of overlapped
css = css.replace(/\.hero \{[\s\S]*?\}/, `.hero {
  min-height: 100vh; display: flex; align-items: center; justify-content: space-between; gap: 50px;
  padding: 120px 40px 60px; max-width: 1400px; margin: 0 auto; overflow: hidden;
}`);
css = css.replace(/\.hero-content \{[\s\S]*?\}/, `.hero-content {
  text-align: left; max-width: 650px; position: relative; z-index: 10;
}`);
css = css.replace(/\.hero-actions \{[\s\S]*?\}/, `.hero-actions { display: flex; gap: 20px; justify-content: flex-start; }`);
css = css.replace(/\.hero-3d-scene \{[\s\S]*?\}/, `.hero-3d-scene {
  position: relative; flex: 1; perspective: 1200px; z-index: 1; display: flex; justify-content: center; align-items: center;
}`);
css = css.replace(/\.hero-main-img \{[\s\S]*?\}/, `.hero-main-img {
  width: 100%; max-width: 700px; opacity: 1; object-fit: cover;
  border-radius: var(--radius-lg); box-shadow: var(--shadow-3d);
  transition: transform 0.1s linear;
}`);

// Add Mobile Menu Styles
if (!css.includes('.mobile-menu-btn')) {
    css += `
/* Mobile Menu */
.mobile-menu-btn { display: none; background: none; border: none; font-size: 1.5rem; color: var(--charcoal); cursor: pointer; }
@media (max-width: 768px) {
  .header { justify-content: space-between; }
  .mobile-menu-btn { display: block; }
  .nav-links { 
    display: none; flex-direction: column; position: absolute; top: 100%; left: 0; 
    width: 100%; background: var(--glass-bg); padding: 20px; border-radius: 20px; 
    box-shadow: var(--shadow-elevated); backdrop-filter: blur(20px);
  }
  .nav-links.active { display: flex; }
  .hero { flex-direction: column; text-align: center; }
  .hero-content { text-align: center; }
  .hero-actions { justify-content: center; flex-wrap: wrap; }
}
`;
}
fs.writeFileSync('style.css', css);

// 2. Fix HTML files
const htmlFiles = ['index.html', 'about.html', 'contact.html', 'blog.html'];

htmlFiles.forEach(file => {
    let html = fs.readFileSync(file, 'utf8');
    
    // Fix Parallax extreme flipping (change pageX/Y to clientX/Y)
    html = html.replace(/e\.pageX/g, 'e.clientX');
    html = html.replace(/e\.pageY/g, 'e.clientY');
    
    // Also tone down the rotation from /80 or /40 to /120 to make it more subtle and premium
    html = html.replace(/\/ 80;/g, '/ 120;');
    html = html.replace(/\/ 40;/g, '/ 120;');
    html = html.replace(/\/ 35;/g, '/ 120;');
    
    // In index.html, fix the JS transform string which had translateZ
    if (file === 'index.html') {
        html = html.replace(/translate\(-50%, -50%\) translateZ\(-100px\) /g, '');
    }
    
    // Add mobile menu button if missing
    if (!html.includes('mobile-menu-btn')) {
        html = html.replace('</nav>', '</nav>\n            <button class="mobile-menu-btn"><i class="fas fa-bars"></i></button>');
    }
    
    // Add mobile menu JS script
    if (!html.includes('mobileMenuBtn')) {
        const scriptToAdd = `
    <script>
        const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
        const navLinks = document.querySelector('.nav-links');
        if (mobileMenuBtn && navLinks) {
            mobileMenuBtn.addEventListener('click', () => {
                navLinks.classList.toggle('active');
            });
        }
    </script>
</body>`;
        html = html.replace('</body>', scriptToAdd);
    }
    
    fs.writeFileSync(file, html);
    console.log("Fixed glitches in", file);
});
