<?php get_header(); ?>

    <main>
        <?php while ( have_posts() ) : the_post(); ?>
        <section class="container section">
            <div class="post-header">
                <div class="post-meta">
                    <span class="post-category"><?php echo get_the_category_list( ', ' ); ?></span>
                    <span>• <?php echo petunionhub_estimated_reading_time(); ?></span>
                </div>
                <h1 class="post-title"><?php the_title(); ?></h1>
                <div class="post-author" style="justify-content: center;">
                    <?php echo get_avatar( get_the_author_meta( 'ID' ), 48, '', '', array( 'class' => 'author-img' ) ); ?>
                    <div class="author-info">
                        <div class="author-name"><?php the_author(); ?></div>
                        <div class="author-date"><?php echo get_the_date(); ?></div>
                    </div>
                </div>
            </div>

            <?php if ( has_post_thumbnail() ) : ?>
            <div class="post-featured-image">
                <?php the_post_thumbnail( 'full' ); ?>
            </div>
            <?php endif; ?>

            <article class="post-content">
                <?php the_content(); ?>

                <div class="share-bar">
                    <span class="share-text"><?php esc_html_e( 'Share this article:', 'petunionhub' ); ?></span>
                    <a href="https://www.facebook.com/sharer/sharer.php?u=<?php the_permalink(); ?>" class="share-btn" target="_blank"><i class="fab fa-facebook-f"></i></a>
                    <a href="https://twitter.com/intent/tweet?url=<?php the_permalink(); ?>&text=<?php the_title(); ?>" class="share-btn" target="_blank"><i class="fab fa-twitter"></i></a>
                    <a href="https://pinterest.com/pin/create/button/?url=<?php the_permalink(); ?>&media=<?php the_post_thumbnail_url(); ?>&description=<?php the_title(); ?>" class="share-btn" target="_blank"><i class="fab fa-pinterest-p"></i></a>
                    <a href="javascript:void(0);" onclick="navigator.clipboard.writeText('<?php the_permalink(); ?>'); alert('Link copied!');" class="share-btn"><i class="fas fa-link"></i></a>
                </div>
            </article>
        </section>
        <?php endwhile; ?>
    </main>

<?php get_footer(); ?>
