<?php
/**
 * The sidebar containing the main widget area
 *
 * @link https://developer.wordpress.org/themes/basics/template-files/#template-partials
 *
 * @package PetUnion_Hub
 */

if ( ! is_active_sidebar( 'sidebar-1' ) ) {
	return;
}
?>

<aside id="secondary" class="widget-area sidebar">
	<?php dynamic_sidebar( 'sidebar-1' ); ?>
    
    <!-- Static Widgets for fallback/visual consistency -->
    <div class="sidebar-widget">
        <h4 class="widget-title"><?php esc_html_e( 'Popular Posts', 'petunionhub' ); ?></h4>
        <div class="popular-posts">
            <?php
            $popular_query = new WP_Query( array(
                'posts_per_page' => 3,
                'orderby'        => 'comment_count',
                'order'          => 'DESC'
            ) );

            if ( $popular_query->have_posts() ) :
                while ( $popular_query->have_posts() ) : $popular_query->the_post();
            ?>
            <div class="popular-post-item">
                <img src="<?php the_post_thumbnail_url( array(100, 100) ); ?>" alt="<?php the_title_attribute(); ?>">
                <div class="popular-post-info">
                    <h5><a href="<?php the_permalink(); ?>"><?php the_title(); ?></a></h5>
                    <span class="date"><?php echo get_the_date(); ?></span>
                </div>
            </div>
            <?php
                endwhile;
                wp_reset_postdata();
            endif;
            ?>
        </div>
    </div>

    <div class="sidebar-widget">
        <h4 class="widget-title"><?php esc_html_e( 'Categories', 'petunionhub' ); ?></h4>
        <ul class="sidebar-categories">
            <?php
            $categories = get_categories();
            foreach ( $categories as $category ) :
            ?>
            <li><a href="<?php echo esc_url( get_category_link( $category->term_id ) ); ?>"><?php echo esc_html( $category->name ); ?> <span>(<?php echo $category->count; ?>)</span></a></li>
            <?php endforeach; ?>
        </ul>
    </div>
</aside><!-- #secondary -->
