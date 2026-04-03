<?php get_header(); ?>

    <main id="primary" class="site-main">
        <?php
        while ( have_posts() ) : the_post();
        ?>
        <article id="post-<?php the_ID(); ?>" <?php post_class(); ?>>
            <header class="entry-header container section-header">
                <?php the_title( '<h1 class="entry-title section-title">', '</h1>' ); ?>
            </header>

            <div class="entry-content container">
                <?php
                the_content();

                wp_link_pages(
                    array(
                        'before' => '<div class="page-links">' . esc_html__( 'Pages:', 'petunionhub' ),
                        'after'  => '</div>',
                    )
                );
                ?>
            </div>
        </article>
        <?php
        endwhile;
        ?>
    </main>

<?php get_footer(); ?>
