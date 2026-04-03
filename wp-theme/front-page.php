<?php get_header(); ?>

    <main>
        <!-- Hero Section -->
        <section class="container hero">
            <div class="hero-content">
                <span class="hero-badge"><?php echo esc_html( get_theme_mod( 'hero_badge', 'Welcome to PetUnion Hub 🐾' ) ); ?></span>
                <h1><?php echo esc_html( get_theme_mod( 'hero_title', 'Your Ultimate Guide to Pet Care, Health & Training' ) ); ?></h1>
                <p><?php echo esc_html( get_theme_mod( 'hero_description', 'Expert tips on pet care, training, nutrition, and health to help your furry friends live their best lives.' ) ); ?></p>
                <div class="hero-actions">
                    <a href="<?php echo esc_url( get_post_type_archive_link( 'post' ) ); ?>" class="btn btn-primary">Explore Blogs</a>
                    <a href="<?php echo esc_url( get_permalink( get_page_by_path( 'about' ) ) ); ?>" class="btn btn-outline">Learn More</a>
                </div>
            </div>
            <div class="hero-image">
                <img src="<?php echo esc_url( get_theme_mod( 'hero_image', 'https://images.unsplash.com/photo-1450778869180-41d0601e046e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80' ) ); ?>" alt="<?php echo esc_attr( get_bloginfo( 'name' ) ); ?> Hero Image">
            </div>
        </section>

        <!-- Categories Section -->
        <section class="container section">
            <div class="section-header">
                <h2 class="section-title">Blog Categories</h2>
            </div>
            <div class="categories-grid">
                <?php
                $categories = get_categories( array(
                    'orderby' => 'name',
                    'order'   => 'ASC'
                ) );
                
                foreach( $categories as $category ) :
                    $icon_class = 'fas fa-heartbeat'; // Default icon
                    // Logic to map icons based on category slug
                    if ( $category->slug == 'training' ) $icon_class = 'fas fa-bone';
                    if ( $category->slug == 'nutrition' ) $icon_class = 'fas fa-drumstick-bite';
                    if ( $category->slug == 'health' ) $icon_class = 'fas fa-stethoscope';
                    if ( $category->slug == 'grooming' ) $icon_class = 'fas fa-cut';
                ?>
                <a href="<?php echo esc_url( get_category_link( $category->term_id ) ); ?>" class="category-card">
                    <div class="category-icon"><i class="<?php echo esc_attr( $icon_class ); ?>"></i></div>
                    <div class="category-title"><?php echo esc_html( $category->name ); ?></div>
                </a>
                <?php endforeach; ?>
            </div>
        </section>

        <!-- Featured Blogs -->
        <section class="container section">
            <div class="section-header">
                <h2 class="section-title">Featured Articles</h2>
                <a href="<?php echo esc_url( get_post_type_archive_link( 'post' ) ); ?>" class="btn btn-outline">View All Posts</a>
            </div>
            <div class="grid-3">
                <?php
                $featured_query = new WP_Query( array(
                    'posts_per_page' => 3,
                    'meta_key'       => '_is_featured',
                    'meta_value'     => 'yes'
                ) );

                if ( $featured_query->have_posts() ) :
                    while ( $featured_query->have_posts() ) : $featured_query->the_post();
                        get_template_part( 'template-parts/content', 'card' );
                    endwhile;
                    wp_reset_postdata();
                else :
                    // Fallback to latest posts if no featured
                    $latest_query = new WP_Query( array( 'posts_per_page' => 3 ) );
                    while ( $latest_query->have_posts() ) : $latest_query->the_post();
                        get_template_part( 'template-parts/content', 'card' );
                    endwhile;
                    wp_reset_postdata();
                endif;
                ?>
            </div>
        </section>

        <!-- About Preview Section -->
        <section class="about-preview section">
            <div class="container about-preview-content">
                <div class="about-preview-text">
                    <h2 class="section-title">About <?php bloginfo( 'name' ); ?></h2>
                    <p><?php echo esc_html( get_theme_mod( 'about_preview_text', 'At PetUnion Hub, we share trusted tips and guides to help you take better care of your pets. Our mission is to empower pet owners with expert advice and a loving community.' ) ); ?></p>
                    <a href="<?php echo esc_url( get_permalink( get_page_by_path( 'about' ) ) ); ?>" class="btn btn-outline">Read More</a>
                </div>
                <div class="about-preview-image">
                    <img src="<?php echo esc_url( get_theme_mod( 'about_image', 'https://images.unsplash.com/photo-1552053831-71594a27632d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' ) ); ?>" alt="Golden Retriever">
                </div>
            </div>
        </section>

        <!-- Newsletter Section -->
        <section class="newsletter-section">
            <div class="container newsletter-content">
                <div class="newsletter-text">
                    <h2>Get weekly pet care tips & guides</h2>
                    <p>Stay updated with the latest in pet health, nutrition, and training.</p>
                </div>
                <?php if ( is_active_sidebar( 'newsletter-area' ) ) : ?>
                    <?php dynamic_sidebar( 'newsletter-area' ); ?>
                <?php else : ?>
                    <form class="newsletter-form">
                        <input type="email" placeholder="Your email address" required>
                        <button type="submit" class="btn btn-primary">Subscribe</button>
                    </form>
                <?php endif; ?>
            </div>
        </section>
    </main>

<?php get_footer(); ?>
