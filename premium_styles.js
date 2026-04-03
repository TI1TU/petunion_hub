const fs = require('fs');
let css = fs.readFileSync('style.css', 'utf8');

css = css.replace('.blog-category {\r\n  color: var(--secondary-color);\r\n  font-weight: 700;\r\n  text-transform: uppercase;\r\n  letter-spacing: 0.5px;\r\n}', '.blog-category {\n  color: var(--primary-color);\n  font-weight: 700;\n  text-transform: uppercase;\n  letter-spacing: 1px;\n  background: rgba(160, 82, 45, 0.08);\n  padding: 6px 14px;\n  border-radius: 50px;\n  font-size: 0.75rem;\n  display: inline-block;\n}');

css = css.replace('.blog-meta {\r\n  display: flex;\r\n  gap: 16px;\r\n  font-size: 0.9rem;\r\n  color: var(--text-light);\r\n  margin-bottom: 16px;\r\n  font-weight: 500;\r\n}', '.blog-meta {\n  display: flex;\n  gap: 16px;\n  font-size: 0.9rem;\n  color: var(--text-light);\n  margin-bottom: 20px;\n  font-weight: 500;\n  align-items: center;\n}');

css = css.replace('.sidebar-widget {\r\n    background: var(--surface);\r\n    padding: 32px;\r\n    border-radius: var(--radius);\r\n    box-shadow: var(--shadow-sm);\r\n    margin-bottom: 40px;\r\n    border: 1px solid rgba(0,0,0,0.03);\r\n}', '.sidebar-widget {\n    background: var(--surface);\n    padding: 40px;\n    border-radius: var(--radius-lg);\n    box-shadow: 0 10px 40px rgba(0,0,0,0.04);\n    margin-bottom: 40px;\n    border: none;\n    transition: var(--transition);\n}\n\n.sidebar-widget:hover {\n    box-shadow: 0 15px 50px rgba(0,0,0,0.06);\n    transform: translateY(-4px);\n}');

css = css.replace('.popular-post-item {\r\n    display: flex;\r\n    gap: 16px;\r\n    align-items: center;\r\n}', '.popular-post-item {\n    display: flex;\n    gap: 16px;\n    align-items: center;\n    padding: 10px;\n    border-radius: 16px;\n    transition: var(--transition);\n    cursor: pointer;\n    margin: -10px;\n}\n\n.popular-post-item:hover {\n    background: rgba(160, 82, 45, 0.03);\n    transform: translateX(5px);\n}');

fs.writeFileSync('style.css', css);
console.log('CSS updated');
