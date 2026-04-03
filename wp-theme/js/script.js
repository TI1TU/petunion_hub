// script.js
document.addEventListener('DOMContentLoaded', () => {
    // Reveal animations on scroll
    const sections = document.querySelectorAll('section, .post-header, .post-featured-image, .post-content, .about-hero, .about-grid, .contact-grid');
    sections.forEach(section => {
        // Only apply fade-up to direct children to prevent extreme nesting animations
        const children = section.children;
        for(let i=0; i < children.length; i++) {
            if(!children[i].classList.contains('fade-up') && !children[i].classList.contains('hero-image') && !children[i].classList.contains('nav')) {
                children[i].classList.add('fade-up');
            }
        }
    });

    // Special treatment for Newsletter and About preview specifically for smoother inner animation
    const innerFadeElements = document.querySelectorAll('.about-preview-text, .about-preview-image, .newsletter-content > *');
    innerFadeElements.forEach(el => el.classList.add('fade-up'));

    // Intersection Observer for fade-in animations
    const observerOptions = {
        root: null,
        rootMargin: '0px 0px -50px 0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Optional: Stop observing once visible to prevent re-animation on scroll up
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const fadeElements = document.querySelectorAll('.fade-up, .blog-card, .category-card');
    fadeElements.forEach(el => {
        el.classList.add('fade-up');
        observer.observe(el);
    });

    // Stagger delay for grids
    const grids = document.querySelectorAll('.grid-3, .categories-grid');
    grids.forEach(grid => {
        const items = grid.children;
        for(let i=0; i<items.length; i++) {
            items[i].style.transitionDelay = `${i * 0.1}s`;
        }
    });

    // Mobile Menu Toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');

    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            
            const icon = mobileMenuBtn.querySelector('i');
            if (navLinks.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    }

    // Header scroll effect with glassmorphism enhancement
    const header = document.querySelector('.header');
    
    if (header) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                header.style.boxShadow = '0 10px 30px rgba(160, 82, 45, 0.08)';
                header.style.background = 'rgba(255, 255, 255, 0.9)';
                header.style.padding = '5px 0';
            } else {
                header.style.boxShadow = 'none';
                header.style.background = 'rgba(250, 248, 245, 0.7)';
                header.style.padding = '0';
            }
        });
    }
});
