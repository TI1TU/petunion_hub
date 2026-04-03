const fs = require('fs');

const mainHtml = `    <main>
        <section class="container section">
            <!-- Hero Section -->
            <div class="about-hero" style="margin-bottom: 60px;">
                <span class="hero-badge">Our Story 🐾</span>
                <h1>A place where every pet's story matters</h1>
                <p>Welcome to PetUnion Hub, a warm and inviting community dedicated entirely to celebrating the love, joy, and profound connection between pets and their humans.</p>
            </div>

            <!-- Our Mission (Large Card) -->
            <div class="featured-story-large" style="margin-bottom: 80px;">
                <div class="featured-large-img">
                    <img src="images/hero-pets.jpg" alt="A heartwarming moment between a dog and owner">
                </div>
                <div class="featured-large-content">
                    <h2 class="blog-card-title" style="margin-bottom: 20px;">Our Mission</h2>
                    <p class="blog-card-excerpt" style="font-size: 1.25rem;">
                        We built this platform to share real pet stories and connect pet lovers from across the world. 
                        We believe that underneath every muddy footprint and chewed toy lies a story of unconditional love. 
                        Our mission is to give every pet a voice and every owner a supportive community to share their deepest emotions.
                    </p>
                </div>
            </div>

            <!-- What We Do (Grid 3) -->
            <div class="section-title-wrapper" style="text-align: center; margin-bottom: 40px;">
                <h2 class="section-title">What We Do</h2>
            </div>
            
            <div class="blog-grid-section">
                <div class="grid-3">
                    <div class="blog-card" style="padding: 40px; text-align: center; display: flex; flex-direction: column; align-items: center;">
                        <div class="mission-icon" style="margin-bottom: 20px; width: 64px; height: 64px; border-radius: 50%; background: rgba(163, 201, 168, 0.2); color: var(--primary-color); display: flex; align-items: center; justify-content: center; font-size: 1.8rem;"><i class="fas fa-heart"></i></div>
                        <h3 style="margin-bottom: 16px; font-size: 1.5rem;">Share Real Stories</h3>
                        <p style="color: var(--text-light); line-height: 1.6;">We publish heartfelt, user-submitted pet stories highlighting rescue missions, lifelong friendships, and emotional milestones.</p>
                    </div>

                    <div class="blog-card" style="padding: 40px; text-align: center; display: flex; flex-direction: column; align-items: center;">
                        <div class="mission-icon" style="margin-bottom: 20px; width: 64px; height: 64px; border-radius: 50%; background: rgba(244, 162, 97, 0.2); color: var(--secondary-color); display: flex; align-items: center; justify-content: center; font-size: 1.8rem;"><i class="fas fa-book-open"></i></div>
                        <h3 style="margin-bottom: 16px; font-size: 1.5rem;">Helpful Blogs</h3>
                        <p style="color: var(--text-light); line-height: 1.6;">From gentle care tips to training guides, we provide supportive resources to help you give your pet their absolute best life.</p>
                    </div>

                    <div class="blog-card" style="padding: 40px; text-align: center; display: flex; flex-direction: column; align-items: center;">
                        <div class="mission-icon" style="margin-bottom: 20px; width: 64px; height: 64px; border-radius: 50%; background: rgba(231, 111, 81, 0.2); color: var(--accent-color); display: flex; align-items: center; justify-content: center; font-size: 1.8rem;"><i class="fas fa-users"></i></div>
                        <h3 style="margin-bottom: 16px; font-size: 1.5rem;">Build Community</h3>
                        <p style="color: var(--text-light); line-height: 1.6;">We curate a safe, emotional haven where thousands of pet enthusiasts come together to relate, laugh, and sometimes, mourn together.</p>
                    </div>
                </div>
            </div>

            <!-- Why This Platform -->
            <div class="featured-story-large" style="flex-direction: row-reverse; margin-bottom: 80px;">
                <div class="featured-large-img">
                    <img src="images/about-pet.jpg" alt="Person bonding with their dog">
                </div>
                <div class="featured-large-content">
                    <h2 class="blog-card-title" style="margin-bottom: 20px;">Why This Platform?</h2>
                    <p class="blog-card-excerpt" style="font-size: 1.15rem; margin-bottom: 20px;">
                        <strong>Every pet has a unique story.</strong> Whether they helped you overcome illness, brought laughter into a quiet home, or simply offered a gentle nudge when you needed it most, their stories deserve to be told.
                    </p>
                    <p class="blog-card-excerpt" style="font-size: 1.15rem; margin-bottom: 20px;">
                        We recognized that people needed a place to authentically express these deep emotions without judgment. PetUnion Hub exists to inspire others through real experiences and to remind us all of the profound empathy animals bring into our lives.
                    </p>
                </div>
            </div>

            <!-- Submit Story Banner Component -->
            <div class="story-banner" style="margin-bottom: 0;">
                <div class="story-banner-content">
                    <h2>Join thousands of pet lovers.</h2>
                    <p>Be part of our journey. Whether you want to share a heartwarming rescue tale or read about the lives of extraordinary everyday pets, there's a place for you here.</p>
                    <a href="#submit-story" class="btn btn-primary" style="margin-right: 15px;">Share Your Story</a>
                    <a href="blog.html" class="btn btn-secondary">Read Pet Blogs</a>
                </div>
            </div>
            
            <div style="height: 60px;"></div>
        </section>
    </main>`;

let content = fs.readFileSync('about.html', 'utf8');
content = content.replace(/<main>[\s\S]*?<\/main>/, mainHtml);
fs.writeFileSync('about.html', content);
console.log('Successfully updated about.html');
