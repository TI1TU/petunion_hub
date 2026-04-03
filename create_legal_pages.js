const fs = require('fs');
const indexHtml = fs.readFileSync('index.html', 'utf8');

const headerMatch = indexHtml.match(/<header class="header">([\s\S]*?)<\/header>/);
const footerMatch = indexHtml.match(/<footer class="footer">([\s\S]*?)<\/footer>/);

const headerContent = headerMatch[0].replace(/class="active">Home<\/a>/, '>Home</a>');
const footerContent = footerMatch[0];

const privacyHtml = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Privacy Policy | PetUnion Hub</title>
    <link rel="stylesheet" href="style.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
</head>
<body>
    ${headerContent}
    <main>
        <section class="container section">
            <div class="section-header" style="text-align: center; justify-content: center; margin-bottom: 40px; display: block;">
                <h1 class="section-title">Privacy Policy</h1>
                <p style="color: var(--text-light); margin-top: 15px;">Last Updated: April 2026</p>
            </div>
            <div style="max-width: 800px; margin: 0 auto; line-height: 1.8; color: var(--text-color);">
                <h2>1. Introduction</h2>
                <p>Welcome to PetUnion Hub! This Privacy Policy explains how we collect, use, and protect your personal information when you use our website. We are dedicated to maintaining the trust of our community and keeping your data safe.</p>
                <br>
                <h2>2. Information We Collect</h2>
                <p>When you use PetUnion Hub to submit a pet story or interact with our community, we may collect the following information:</p>
                <ul>
                    <li><strong>Personal Details:</strong> Your name and email address when you use our contact form or submit a story.</li>
                    <li><strong>Story Content:</strong> Your pet's name, the story you write, and any images you upload to share with the community.</li>
                </ul>
                <br>
                <h2>3. How We Use Your Information</h2>
                <p>We use the information we collect strictly to operate, maintain, and improve our website. Specifically, we use it to:</p>
                <ul>
                    <li>Publish your submitted pet stories and images on our blog.</li>
                    <li>Respond to your inquiries or support requests.</li>
                    <li>Ensure our community remains safe and supportive for all members.</li>
                </ul>
                <br>
                <h2>4. Cookies and Tracking Technologies</h2>
                <p>We use cookies and similar tracking technologies to improve your experience on our website. Cookies help us understand how you use our site and make it easier to navigate. You can control the use of cookies through your browser settings.</p>
                <br>
                <h2>5. Third-Party Services</h2>
                <p>To better understand how visitors interact with our website and support our community, we may use trusted third-party services:</p>
                <ul>
                    <li><strong>Analytics:</strong> We may use basic analytics services (like Google Analytics) to help us see which blog posts are most popular.</li>
                    <li><strong>Advertisements:</strong> In the future, we may display ads (like Google AdSense). These third parties may use cookies to serve personalized ads based on your previous visits.</li>
                </ul>
                <br>
                <h2>6. Data Protection and Security</h2>
                <p>Your privacy is important to us. We implement basic technical and organizational security measures to protect your information from unauthorized access, alteration, disclosure, or destruction. However, please remember that no method of transmission over the internet is 100% secure.</p>
                <br>
                <h2>7. Your User Rights</h2>
                <p>As a valued member of our community, you have rights regarding your personal information, including:</p>
                <ul>
                    <li><strong>Access and Correction:</strong> Requesting details of or corrections to the information we have about you.</li>
                    <li><strong>Data Removal:</strong> If you wish to have your submitted story, images, or personal details removed from the website, please contact us.</li>
                </ul>
                <br>
                <h2>8. Children's Information</h2>
                <p>PetUnion Hub is not directed at children. We do not knowingly collect personal information from children without parental consent. If you believe we have inadvertently collected such data, please contact us so we can promptly delete it.</p>
                <br>
                <h2>9. Updates to This Policy</h2>
                <p>We may update this Privacy Policy from time to time as our website evolves. We recommend checking this page periodically to stay informed of any changes.</p>
                <br>
                <h2>10. Contact Information</h2>
                <p>If you have any questions, concerns, or requests regarding this Privacy Policy, please reach out to us at: <a href="mailto:stories@petunionhub.com" style="color: var(--primary-color); font-weight: bold;">stories@petunionhub.com</a> or visit our <a href="contact.html" style="color: var(--primary-color); font-weight: bold;">Contact</a> page.</p>
            </div>
        </section>
    </main>
    ${footerContent}
    <script src="script.js"></script>
</body>
</html>`;

const termsHtml = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Terms & Conditions | PetUnion Hub</title>
    <link rel="stylesheet" href="style.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
</head>
<body>
    ${headerContent}
    <main>
        <section class="container section">
            <div class="section-header" style="text-align: center; justify-content: center; margin-bottom: 40px; display: block;">
                <h1 class="section-title">Terms & Conditions</h1>
                <p style="color: var(--text-light); margin-top: 15px;">Last Updated: April 2026</p>
            </div>
            <div style="max-width: 800px; margin: 0 auto; line-height: 1.8; color: var(--text-color);">
                <h2>1. Introduction</h2>
                <p>Welcome to PetUnion Hub! By accessing or using our website, you agree to comply with and be bound by these Terms & Conditions. If you do not agree with any part of these terms, please do not use our website.</p>
                <br>
                <h2>2. Use of Our Website</h2>
                <p>PetUnion Hub is a free community platform dedicated to sharing pet-related stories, blogs, and advice. You are welcome to browse, read, and interact with the content on our website for personal, non-commercial use only. There are no products sold or ecommerce transactions involved.</p>
                <br>
                <h2>3. User-Generated Content Rules</h2>
                <p>When you submit a story, image, or any other content to PetUnion Hub, you agree to provide truthful and authentic information. You are solely responsible for the content you submit and the consequences of sharing it publicly.</p>
                <br>
                <h2>4. Content Ownership and Permissions</h2>
                <p>By submitting your pet story or images to our website, you grant PetUnion Hub a non-exclusive, royalty-free, perpetual license to use, publish, edit, and display your content on our blog and community channels. You retain the original copyright to your story and images.</p>
                <br>
                <h2>5. Prohibited Content</h2>
                <p>To keep our community safe and positive for everyone, the following types of content are strictly prohibited:</p>
                <ul>
                    <li>Offensive, abusive, defamatory, or hateful language.</li>
                    <li>Illegal content or promotion of illegal acts, including animal cruelty.</li>
                    <li>Plagiarized or copied content without proper authorization or credit.</li>
                    <li>Spam, self-promotion, or unsolicited advertising.</li>
                </ul>
                <p>We reserve the right to reject or remove any content that violates these rules without prior notice.</p>
                <br>
                <h2>6. Disclaimer</h2>
                <p>The content provided on PetUnion Hub, including articles, community stories, and tips, is for informational and educational purposes only. It is not intended to substitute professional veterinary advice, diagnosis, or treatment. Always seek the advice of your veterinarian with any questions you may have regarding your pet's health. We do not guarantee the accuracy, completeness, or usefulness of any user-submitted content.</p>
                <br>
                <h2>7. Limitation of Liability</h2>
                <p>Under no circumstances shall PetUnion Hub or its owners be liable for any direct, indirect, incidental, or consequential damages resulting from your use of the website, interaction with other users, or any actions taken based on the content provided here.</p>
                <br>
                <h2>8. Changes to These Terms</h2>
                <p>We reserve the right to modify or replace these Terms & Conditions at any time. Your continued use of the website after any changes constitutes your acceptance of the new terms.</p>
                <br>
                <h2>9. Contact Information</h2>
                <p>If you have any questions about these Terms & Conditions, please contact us at: <a href="mailto:stories@petunionhub.com" style="color: var(--primary-color); font-weight: bold;">stories@petunionhub.com</a>.</p>
            </div>
        </section>
    </main>
    ${footerContent}
    <script src="script.js"></script>
</body>
</html>`;

fs.writeFileSync('privacy-policy.html', privacyHtml);
fs.writeFileSync('terms-conditions.html', termsHtml);
console.log('Created legal pages!');
