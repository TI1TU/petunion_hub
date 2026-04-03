<?php get_header(); ?>

    <main>
        <section class="container section">
            <div class="blog-header-section">
                <h1><?php esc_html_e( 'Pet Care Blog – Tips, Training & Guides', 'petunionhub' ); ?></h1>
                <p><?php esc_html_e( 'Explore expert advice on pet care, dog training, nutrition, grooming, and health.', 'petunionhub' ); ?></p>
                <div class="blog-search-container">
                    <?php get_search_form(); ?>
                </div>
            </div>

            <div class="filter-tags">
                <a href="<?php echo esc_url( home_url( '/blog' ) ); ?>" class="filter-tag active"><?php esc_html_e( 'All', 'petunionhub' ); ?></a>
                <?php
                $tags = get_categories();
                foreach ( $tags as $tag ) {
                    echo '<a href="' . esc_url( get_category_link( $tag->term_id ) ) . '" class="filter-tag">' . esc_html( $tag->name ) . '</a>';
                }
                ?>
            </div>

            <div class="blog-layout">
                <div class="blog-main-content">
                    <div class="grid-2">
                        <?php
                        if ( have_posts() ) :
                            while ( have_posts() ) : the_post();
                                get_template_part( 'template-parts/content', 'card' );
                            endwhile;

                            the_posts_pagination( array(
                                'prev_text' => '<i class="fas fa-arrow-left"></i> ' . esc_html__( 'Previous', 'petunionhub' ),
                                'next_text' => esc_html__( 'Next', 'petunionhub' ) . ' <i class="fas fa-arrow-right"></i>',
                            ) );

                        else :
                            get_template_part( 'template-parts/content', 'none' );
                        endif;
                        ?>
                    </div>
                </div>

                <aside class="sidebar">
                    <?php get_sidebar(); ?>
                </aside>
            </div>
        </section>
    </main>

<?php get_footer(); ?>
