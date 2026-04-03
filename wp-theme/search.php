<?php get_header(); ?>

    <main id="primary" class="site-main container section">
        <header class="page-header section-header">
            <h1 class="page-title section-title">
                <?php
                /* translators: %s: search query. */
                printf( esc_html__( 'Search Results for: %s', 'petunionhub' ), '<span>' . get_search_query() . '</span>' );
                ?>
            </h1>
        </header><!-- .page-header -->

        <div class="blog-layout">
            <div class="blog-main-content">
                <div class="grid-2">
                    <?php
                    if ( have_posts() ) :
                        while ( have_posts() ) : the_post();
                            get_template_part( 'template-parts/content', 'card' );
                        endwhile;

                        the_posts_pagination();
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
    </main><!-- #main -->

<?php get_footer(); ?>
