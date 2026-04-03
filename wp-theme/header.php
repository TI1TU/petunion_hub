<!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
    <meta charset="<?php bloginfo( 'charset' ); ?>">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="profile" href="https://gmpg.org/xfn/11">
    <?php wp_head(); ?>
</head>
<body <?php body_class(); ?>>
<?php wp_body_open(); ?>
    <header class="header">
        <div class="container nav">
            <a href="<?php echo esc_url( home_url( '/' ) ); ?>" class="logo" rel="home">
                <?php if ( has_custom_logo() ) : ?>
                    <?php the_custom_logo(); ?>
                <?php else : ?>
                    <img src="<?php echo get_template_directory_uri(); ?>/logo.png" alt="<?php bloginfo( 'name' ); ?>">
                <?php endif; ?>
            </a>
            <nav class="nav-links">
                <?php
                wp_nav_menu(
                    array(
                        'theme_location' => 'primary',
                        'menu_id'        => 'primary-menu',
                        'container'      => false,
                        'items_wrap'      => '%3$s',
                        'fallback_cb'     => 'wp_page_menu',
                        'before'          => '',
                        'after'           => '',
                        'link_before'     => '',
                        'link_after'      => '',
                    )
                );
                ?>
            </nav>
            <button class="mobile-menu-btn"><i class="fas fa-bars"></i></button>
        </div>
    </header>
