<?php
/**
 * Template part for displaying posts as cards
 *
 * @package PetUnion_Hub
 */
?>

<article id="post-<?php the_ID(); ?>" <?php post_class( 'blog-card' ); ?>>
    <div class="blog-card-img-wrapper">
        <?php if ( has_post_thumbnail() ) : ?>
            <?php the_post_thumbnail( 'large', array( 'class' => 'blog-card-img' ) ); ?>
        <?php else : ?>
            <img src="https://images.unsplash.com/photo-1548199973-03cce0bbc87b?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" alt="<?php the_title_attribute(); ?>" class="blog-card-img">
        <?php endif; ?>
    </div>
    <div class="blog-card-content">
        <div class="blog-meta">
            <span class="blog-category"><?php echo get_the_category_list( ', ' ); ?></span>
            <span>• <?php echo petunionhub_estimated_reading_time(); ?></span>
        </div>
        <h3 class="blog-card-title"><a href="<?php the_permalink(); ?>"><?php the_title(); ?></a></h3>
        <p class="blog-card-excerpt"><?php echo wp_trim_words( get_the_excerpt(), 20 ); ?></p>
        <div class="blog-card-footer">
            <a href="<?php the_permalink(); ?>" class="read-more"><?php esc_html_e( 'Read Full Guide', 'petunionhub' ); ?> <i class="fas fa-arrow-right"></i></a>
        </div>
    </div>
</article>
