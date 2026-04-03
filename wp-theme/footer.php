    <footer class="footer">
        <div class="container">
            <div class="footer-grid">
                <div class="footer-about">
                    <a href="<?php echo esc_url( home_url( '/' ) ); ?>" class="logo">
                        <img src="<?php echo get_template_directory_uri(); ?>/logo.png" alt="<?php bloginfo( 'name' ); ?>">
                    </a>
                    <p><?php bloginfo( 'description' ); ?>. We believe every pet deserves a happy, healthy life. Our mission is to empower pet owners with expert advice, helpful guides, and a loving community.</p>
                    <div class="social-links">
                        <a href="#" class="social-link" title="Facebook"><i class="fab fa-facebook-f"></i></a>
                        <a href="#" class="social-link" title="Twitter"><i class="fab fa-twitter"></i></a>
                        <a href="#" class="social-link" title="Instagram"><i class="fab fa-instagram"></i></a>
                        <a href="#" class="social-link" title="Pinterest"><i class="fab fa-pinterest-p"></i></a>
                    </div>
                </div>
                <div>
                    <h4 class="footer-title">Quick Links</h4>
                    <div class="footer-links">
                        <?php
                        wp_nav_menu(
                            array(
                                'theme_location' => 'footer',
                                'menu_id'        => 'footer-menu',
                                'container'      => false,
                                'fallback_cb'     => false,
                            )
                        );
                        ?>
                    </div>
                </div>
                <div>
                    <h4 class="footer-title">Categories</h4>
                    <div class="footer-links">
                        <?php
                        $categories = get_categories();
                        foreach($categories as $category) {
                            echo '<a href="' . get_category_link($category->term_id) . '">' . $category->name . '</a>';
                        }
                        ?>
                    </div>
                </div>
                <div>
                    <h4 class="footer-title">Contact Us</h4>
                    <div class="footer-links">
                        <p style="color: var(--text-light); font-size: 1.05rem;"><i class="fas fa-envelope" style="margin-right: 10px; color: var(--primary-color);"></i> hello@petunionhub.com</p>
                        <p style="color: var(--text-light); font-size: 1.05rem;"><i class="fas fa-map-marker-alt" style="margin-right: 10px; color: var(--primary-color);"></i> 123 Pet Lane, Pawsome City</p>
                        <a href="<?php echo get_permalink( get_page_by_path( 'contact' ) ); ?>" class="read-more" style="margin-top: 10px;">Send a Message <i class="fas fa-arrow-right"></i></a>
                    </div>
                </div>
            </div>
            <div class="footer-bottom">
                <p>&copy; <?php echo date('Y'); ?> <?php bloginfo( 'name' ); ?>. All rights reserved.</p>
            </div>
        </div>
    </footer>

    <?php wp_footer(); ?>
</body>
</html>
