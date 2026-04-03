const fs = require('fs');

let css = fs.readFileSync('style.css', 'utf8');

css = css.replace(/--primary-color: #A0522D; \/\* Sienna \*\//, '--primary-color: #A07855; /* Soft Brown */');
css = css.replace(/--primary-gradient: linear-gradient.*/, '--primary-gradient: linear-gradient(135deg, #A07855 0%, #b89370 100%);');
css = css.replace(/--secondary-color: #43aa8b; \/\* Vibrant Teal\/Green \*\//, '--secondary-color: #88b088; /* Light Green */');
css = css.replace(/--accent-color: #F8961E; \/\* Sunburst Orange \*\//, '--accent-color: #e5a882; /* Soft Peach */');
css = css.replace(/--bg-color: #FAF8F5; \/\* Warm off-white \*\//, '--bg-color: #FDFBF7; /* Cream */');
css = css.replace(/--text-color: #2b2d42;/, '--text-color: #4a433e;');
css = css.replace(/--text-light: #6c757d;/, '--text-light: #8a837c;');

css = css.replace(/--radius: 24px;/, '--radius: 20px;');
css = css.replace(/--shadow-sm: 0 4px 12px rgba\(160, 82, 45, 0.08\);/, '--shadow-sm: 0 4px 16px rgba(160, 120, 85, 0.04);');
css = css.replace(/--shadow: 0 16px 32px -8px rgba\(160, 82, 45, 0.12\);/, '--shadow: 0 16px 32px -8px rgba(160, 120, 85, 0.08);');
css = css.replace(/--shadow-hover: 0 24px 48px -12px rgba\(160, 82, 45, 0.25\);/, '--shadow-hover: 0 24px 48px -12px rgba(160, 120, 85, 0.15);');
css = css.replace(/--shadow-glow: 0 8px 32px rgba\(248, 150, 30, 0.4\);/, '--shadow-glow: 0 8px 32px rgba(229, 168, 130, 0.3);');

css = css.replace(/rgba\(248, 150, 30, 0.15\)/g, 'rgba(136, 176, 136, 0.2)');
css = css.replace(/rgba\(67, 170, 139, 0.15\)/g, 'rgba(160, 120, 85, 0.15)');

fs.writeFileSync('style.css', css);
