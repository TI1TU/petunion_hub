const fs = require('fs');

const mainHtml = `    <main>
        <section class="container section">
            <div style="text-align: center; max-width: 800px; margin: 0 auto;">
                <span class="hero-badge">Get In Touch 🐾</span>
                <h1 style="font-size: 3.5rem; margin-bottom: 16px;">We'd love to hear from you</h1>
                <p style="font-size: 1.15rem; color: var(--text-light);">Have a question, feedback, or a story idea? Drop us a line below.</p>
            </div>

            <div class="contact-grid">
                <div>
                    <form class="contact-form" action="#" method="POST" onsubmit="event.preventDefault(); alert('Message sent successfully!');">
                        <div class="form-group">
                            <label for="name">Full Name</label>
                            <input type="text" id="name" class="form-control" placeholder="Jane Doe" required>
                        </div>
                        <div class="form-group">
                            <label for="email">Email Address</label>
                            <input type="email" id="email" class="form-control" placeholder="jane@example.com" required>
                        </div>
                        <div class="form-group">
                            <label for="message">Your Message</label>
                            <textarea id="message" class="form-control" placeholder="Type your message or question here..." required></textarea>
                        </div>
                        <button type="submit" class="btn btn-primary" style="width: 100%; margin-top: 10px;">Send Message</button>
                    </form>
                    
                    <div style="margin-top: 24px; padding: 20px; border-radius: 12px; background: rgba(163, 201, 168, 0.15); border: 1px solid rgba(163, 201, 168, 0.4);">
                        <p style="margin: 0; font-size: 0.95rem; display: flex; align-items: flex-start; gap: 12px; color: var(--text-dark);">
                            <i class="fas fa-info-circle" style="color: var(--primary-color); margin-top: 3px;"></i>
                            <span><strong>Want to share your pet story?</strong> Use our <a href="#submit-story" style="color: var(--primary-color); font-weight: 600; text-decoration: underline;">Submit Story</a> page for faster publishing layout.</span>
                        </p>
                    </div>
                </div>
                
                <div class="contact-info">
                    <h2>Contact Information</h2>
                    <p>Fill out the form and our team will get back to you within 24 hours.</p>
                    
                    <div class="info-item">
                        <div class="info-icon"><i class="fas fa-envelope"></i></div>
                        <div>
                            <h4>Email Us</h4>
                            <p>hello@petunionhub.com</p>
                        </div>
                    </div>
                    
                    <h4 style="margin-top: 32px; margin-bottom: 16px; font-size: 1.2rem;">Follow Our Community</h4>
                    <div class="social-links">
                        <a href="#" class="social-link"><i class="fab fa-facebook-f"></i></a>
                        <a href="#" class="social-link"><i class="fab fa-twitter"></i></a>
                        <a href="#" class="social-link"><i class="fab fa-instagram"></i></a>
                        <a href="#" class="social-link"><i class="fab fa-pinterest-p"></i></a>
                    </div>
                    
                    <div style="margin-top: 40px; padding-top: 40px; border-top: 1px solid rgba(0,0,0,0.05);">
                        <h4 style="font-size: 1.2rem; margin-bottom: 20px;">Frequently Asked Questions</h4>
                        
                        <div style="margin-bottom: 20px;">
                            <h5 style="margin-bottom: 8px; font-size: 1.05rem;">How to submit a story?</h5>
                            <p style="color: var(--text-light); font-size: 0.95rem;">You can use our dedicated Submit Story portal. Provide us with your pet's name, a 300+ word story, and a clear photo!</p>
                        </div>
                        
                        <div style="margin-bottom: 20px;">
                            <h5 style="margin-bottom: 8px; font-size: 1.05rem;">How long does approval take?</h5>
                            <p style="color: var(--text-light); font-size: 0.95rem;">Our community team reviews submissions within 48 to 72 hours to ensure all stories meet our community guidelines.</p>
                        </div>
                    </div>
                </div>
            </div>
            
            <!-- Call to Action Section -->
            <div style="height: 40px;"></div>
            <section class="cta-section blog-cta" style="margin-bottom: 0;">
                <div class="cta-content">
                    <h2 class="cta-title">Join our pet-loving community</h2>
                    <p class="cta-desc">Discover our comprehensive guides and share moments that matter with fellow pet lovers from all around the world.</p>
                    <a href="#submit-story" class="btn btn-secondary">Share Your Story</a>
                </div>
            </section>
        </section>
    </main>`;

let content = fs.readFileSync('contact.html', 'utf8');
content = content.replace(/<main>[\s\S]*?<\/main>/, mainHtml);
fs.writeFileSync('contact.html', content);
console.log('Successfully updated contact.html');
