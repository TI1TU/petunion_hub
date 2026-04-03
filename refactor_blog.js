const fs = require('fs');

const mainHtml = `    <main>
        <section class="container section">
            <div class="blog-header">
                <h1>Real Stories. Real Love. Real Pets 🐾</h1>
                <p>Explore heartwarming pet stories and helpful blogs from our community</p>
                
                <div class="search-container">
                    <form action="#" class="search-form">
                        <input type="text" placeholder="Search pet stories or guides..." class="search-input">
                        <button type="submit" class="search-submit"><i class="fas fa-search"></i></button>
                    </form>
                </div>
            </div>

            <div class="filter-tags">
                <div class="filter-tag active" data-category="all">All</div>
                <div class="filter-tag" data-category="dogs">Dogs</div>
                <div class="filter-tag" data-category="cats">Cats</div>
                <div class="filter-tag" data-category="emotional">Emotional</div>
                <div class="filter-tag" data-category="funny">Funny</div>
                <div class="filter-tag" data-category="rescue">Rescue</div>
            </div>

            <!-- Featured Section (Single Large Custom Card) -->
            <div class="featured-blogs">
                <article class="featured-story-large" data-category="rescue">
                    <div class="featured-large-img">
                        <img src="images/bruno.png" alt="Bruno the rescue dog">
                    </div>
                    <div class="featured-large-content">
                        <div class="blog-meta">
                            <span class="blog-category">Rescue</span>
                            <span>• 3 min read</span>
                        </div>
                        <h2 class="blog-card-title"><a href="post-5.html">The Day Bruno Saved Me ❤️🐶</a></h2>
                        <p class="blog-card-excerpt">A heartwarming story from our community about adopting Bruno, and how a rescue dog became a lifeline during tough times. If you're thinking about getting a pet, don't think twice. They don't just enter your home — they change your life.</p>
                        <div class="blog-card-author-info">
                            <span class="author">Rahul & Bruno</span>
                            <span class="date">April 3, 2026</span>
                        </div>
                        <div class="blog-card-footer">
                            <a href="post-5.html" class="btn btn-primary">Read More</a>
                        </div>
                    </div>
                </article>
            </div>

            <!-- Blog Grid Section (3 Columns) -->
            <div class="blog-grid-section">
                <div class="grid-3">
                    <!-- Blog Card 1 -->
                    <article class="blog-card" data-category="dogs">
                        <div class="blog-card-img-wrapper">
                            <img src="images/puppy-care.jpg" alt="Puppies running" class="blog-card-img">
                        </div>
                        <div class="blog-card-content">
                            <div class="blog-meta">
                                <span class="blog-category">Dogs</span>
                                <span>• 5 min read</span>
                            </div>
                            <h3 class="blog-card-title"><a href="post-1.html">The Ultimate Puppy Care Guide</a></h3>
                            <p class="blog-card-excerpt">Discover the essential tips for the first 30 days of puppy parenthood to ensure a smooth transition.</p>
                            <div class="blog-card-author-info">
                                <span class="author">Emma Wilson</span>
                                <span class="date">March 15, 2026</span>
                            </div>
                            <div class="blog-card-footer">
                                <a href="post-1.html" class="read-more">Read More <i class="fas fa-arrow-right"></i></a>
                            </div>
                        </div>
                    </article>

                    <!-- Blog Card 2 -->
                    <article class="blog-card" data-category="dogs">
                        <div class="blog-card-img-wrapper">
                            <img src="images/dog-commands.jpg" alt="Owner petting dog" class="blog-card-img">
                        </div>
                        <div class="blog-card-content">
                            <div class="blog-meta">
                                <span class="blog-category">Dogs</span>
                                <span>• 6 min read</span>
                            </div>
                            <h3 class="blog-card-title"><a href="post-3.html">5 Basic Commands Every Dog Should Know</a></h3>
                            <p class="blog-card-excerpt">Start your dog's training journey with these five essential commands for safety and obedience.</p>
                            <div class="blog-card-author-info">
                                <span class="author">Sarah Jones</span>
                                <span class="date">March 10, 2026</span>
                            </div>
                            <div class="blog-card-footer">
                                <a href="post-3.html" class="read-more">Read More <i class="fas fa-arrow-right"></i></a>
                            </div>
                        </div>
                    </article>

                    <!-- Blog Card 3 -->
                    <article class="blog-card" data-category="cats">
                        <div class="blog-card-img-wrapper">
                            <img src="images/cat-body-language.jpg" alt="Curious cat" class="blog-card-img">
                        </div>
                        <div class="blog-card-content">
                            <div class="blog-meta">
                                <span class="blog-category">Cats</span>
                                <span>• 4 min read</span>
                            </div>
                            <h3 class="blog-card-title"><a href="#">Understanding Cat Body Language</a></h3>
                            <p class="blog-card-excerpt">Is your cat happy, anxious, or annoyed? Learn to interpret their tail flicks and ear positions.</p>
                            <div class="blog-card-author-info">
                                <span class="author">Dr. Emily White</span>
                                <span class="date">March 8, 2026</span>
                            </div>
                            <div class="blog-card-footer">
                                <a href="#" class="read-more">Read More <i class="fas fa-arrow-right"></i></a>
                            </div>
                        </div>
                    </article>

                    <!-- Blog Card 4 -->
                    <article class="blog-card" data-category="dogs">
                        <div class="blog-card-img-wrapper">
                            <img src="images/grooming-tools.jpg" alt="Dog being groomed" class="blog-card-img">
                        </div>
                        <div class="blog-card-content">
                            <div class="blog-meta">
                                <span class="blog-category">Dogs</span>
                                <span>• 10 min read</span>
                            </div>
                            <h3 class="blog-card-title"><a href="post-4.html">How to Groom Your Dog at Home</a></h3>
                            <p class="blog-card-excerpt">Master the art of home grooming. From bathing to nail trimming, we cover everything you need.</p>
                            <div class="blog-card-author-info">
                                <span class="author">David Miller</span>
                                <span class="date">March 12, 2026</span>
                            </div>
                            <div class="blog-card-footer">
                                <a href="post-4.html" class="read-more">Read More <i class="fas fa-arrow-right"></i></a>
                            </div>
                        </div>
                    </article>

                    <!-- Blog Card 5 -->
                    <article class="blog-card" data-category="emotional">
                        <div class="blog-card-img-wrapper">
                            <img src="images/hero-pets.jpg" alt="Senior dog with owner" class="blog-card-img">
                        </div>
                        <div class="blog-card-content">
                            <div class="blog-meta">
                                <span class="blog-category">Emotional</span>
                                <span>• 7 min read</span>
                            </div>
                            <h3 class="blog-card-title"><a href="#">Growing Old Together</a></h3>
                            <p class="blog-card-excerpt">A beautiful reflection on the privileges of caring for a senior dog during their golden years.</p>
                            <div class="blog-card-author-info">
                                <span class="author">Jessica Smith</span>
                                <span class="date">February 28, 2026</span>
                            </div>
                            <div class="blog-card-footer">
                                <a href="#" class="read-more">Read Story <i class="fas fa-arrow-right"></i></a>
                            </div>
                        </div>
                    </article>
                    
                    <!-- Blog Card 6 -->
                    <article class="blog-card" data-category="dogs">
                        <div class="blog-card-img-wrapper">
                            <img src="images/dog-treats.jpg" alt="Nutritious food" class="blog-card-img">
                        </div>
                        <div class="blog-card-content">
                            <div class="blog-meta">
                                <span class="blog-category">Dogs</span>
                                <span>• 4 min read</span>
                            </div>
                            <h3 class="blog-card-title"><a href="post-2.html">Top 10 Nutritious Foods</a></h3>
                            <p class="blog-card-excerpt">Learn what ingredients to look for to ensure your furry friend lives a long, healthy life.</p>
                            <div class="blog-card-author-info">
                                <span class="author">Chris Miller</span>
                                <span class="date">March 2, 2026</span>
                            </div>
                            <div class="blog-card-footer">
                                <a href="post-2.html" class="read-more">Read More <i class="fas fa-arrow-right"></i></a>
                            </div>
                        </div>
                    </article>
                </div>

                <div class="load-more-container" style="margin-top: 60px;">
                    <button class="btn btn-outline" id="loadMore">Load More Articles</button>
                </div>
            </div>

            <!-- Submit Story Banner Component -->
            <div class="story-banner">
                <div class="story-banner-content">
                    <h2>Have a story to share? Let the world hear it ❤️</h2>
                    <p>Your pet\'s story could inspire, comfort, or bring a smile to someone today. We publish community stories every week.</p>
                    <a href="#submit-story" class="btn btn-primary">Submit Your Story</a>
                </div>
            </div>

            <!-- Call to Action Section -->
            <section class="cta-section blog-cta" style="margin-bottom: 0;">
                <div class="cta-content">
                    <h2 class="cta-title">Join our pet-loving community today</h2>
                    <p class="cta-desc">Discover our comprehensive guides and share moments that matter with fellow pet lovers from all around the world.</p>
                    <a href="#submit-story" class="btn btn-secondary">Share Your Story</a>
                </div>
            </section>
        </section>
    </main>`;

let content = fs.readFileSync('blog.html', 'utf8');
content = content.replace(/<main>[\s\S]*?<\/main>/, mainHtml);
fs.writeFileSync('blog.html', content);
console.log('Successfully updated blog.html');
