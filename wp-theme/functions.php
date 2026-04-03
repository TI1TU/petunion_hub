<?php
/**
 * PetUnion Hub functions and definitions
 *
 * @link https://developer.wordpress.org/themes/basics/theme-functions/
 *
 * @package PetUnion_Hub
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

/**
 * Sets up theme defaults and registers support for various WordPress features.
 */
function petunionhub_setup() {
	// Add default posts and comments RSS feed links to head.
	add_theme_support( 'automatic-feed-links' );

	/*
	 * Let WordPress manage the document title.
	 * By adding theme support, we declare that this theme does not use a
	 * hard-coded <title> tag in the document head, and expect WordPress to
	 * provide it for us.
	 */
	add_theme_support( 'title-tag' );

	/*
	 * Enable support for Post Thumbnails on posts and pages.
	 *
	 * @link https://developer.wordpress.org/themes/functionality/featured-images-post-thumbnails/
	 */
	add_theme_support( 'post-thumbnails' );

	// This theme uses wp_nav_menu() in one location.
	register_nav_menus(
		array(
			'primary' => esc_html__( 'Primary Menu', 'petunionhub' ),
			'footer'  => esc_html__( 'Footer Menu', 'petunionhub' ),
		)
	);

	/*
	 * Switch default core markup for search form, comment form, and comments
	 * to output valid HTML5.
	 */
	add_theme_support(
		'html5',
		array(
			'search-form',
			'comment-form',
			'comment-list',
			'gallery',
			'caption',
			'style',
			'script',
		)
	);

	// Add theme support for wide and full alignment for Gutenberg blocks.
	add_theme_support( 'align-wide' );

	// Add theme support for responsive embeds.
	add_theme_support( 'responsive-embeds' );
}
add_action( 'after_setup_theme', 'petunionhub_setup' );

/**
 * Register widget area.
 *
 * @link https://developer.wordpress.org/themes/functionality/sidebars/#registering-a-sidebar
 */
function petunionhub_widgets_init() {
	register_sidebar(
		array(
			'name'          => esc_html__( 'Sidebar', 'petunionhub' ),
			'id'            => 'sidebar-1',
			'description'   => esc_html__( 'Add widgets here.', 'petunionhub' ),
			'before_widget' => '<section id="%1$s" class="widget %2$s">',
			'after_widget'  => '</section>',
			'before_title'  => '<h2 class="widget-title">',
			'after_title'   => '</h2>',
		)
	);
}
add_action( 'widgets_init', 'petunionhub_widgets_init' );

/**
 * Enqueue scripts and styles.
 */
function petunionhub_scripts() {
	// Enqueue Google Fonts
	wp_enqueue_style( 'petunionhub-fonts', 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Outfit:wght@500;600;700;800;900&display=swap', array(), null );

	// Enqueue Font Awesome
	wp_enqueue_style( 'font-awesome', 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css', array(), '6.4.0' );

	// Enqueue Theme Stylesheet
	wp_enqueue_style( 'petunionhub-style', get_stylesheet_uri(), array(), wp_get_theme()->get( 'Version' ) );

	// Enqueue JS
	wp_enqueue_script( 'petunionhub-script', get_template_directory_uri() . '/js/script.js', array(), '1.0.0', true );

	if ( is_singular() && comments_open() && get_option( 'thread_comments' ) ) {
		wp_enqueue_script( 'comment-reply' );
	}
}
add_action( 'wp_enqueue_scripts', 'petunionhub_scripts' );

/**
 * Estimate reading time.
 */
function petunionhub_estimated_reading_time() {
    $post = get_post();
    $content = $post->post_content;
    $word_count = str_word_count( strip_tags( $content ) );
    $readingtime = ceil( $word_count / 200 );

    if ( $readingtime == 1 ) {
        $timer = " min read";
    } else {
        $timer = " min read";
    }
    $totalreadingtime = $readingtime . $timer;

    return $totalreadingtime;
}
