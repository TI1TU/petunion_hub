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

    // --- CONSOLIDATED BLOG FILTERING & SEARCH ---
    const filterTags = document.querySelectorAll('.filter-tag');
    const blogCards = document.querySelectorAll('.blog-card, .featured-card');
    const featuredSection = document.querySelector('.featured-blogs');
    const searchForm = document.querySelector('.search-form');
    const searchInput = document.querySelector('.search-input');

    const updateBlogGrid = () => {
        const query = searchInput ? searchInput.value.toLowerCase().trim() : '';
        const activeTag = document.querySelector('.filter-tag.active');
        const category = activeTag ? activeTag.getAttribute('data-category') : 'all';

        let featuredVisibleCount = 0;
        let gridVisibleCount = 0;

        blogCards.forEach(card => {
            const titleEl = card.querySelector('.blog-card-title');
            const excerptEl = card.querySelector('.blog-card-excerpt');
            const title = titleEl ? titleEl.textContent.toLowerCase() : '';
            const excerpt = excerptEl ? excerptEl.textContent.toLowerCase() : '';
            const cardCat = card.getAttribute('data-category');

            const matchesSearch = query === '' || title.includes(query) || excerpt.includes(query);
            const matchesCategory = category === 'all' || cardCat === category;

            if (matchesSearch && matchesCategory) {
                card.style.display = 'flex';
                if (card.classList.contains('featured-card')) {
                    featuredVisibleCount++;
                } else {
                    gridVisibleCount++;
                }
            } else {
                card.style.display = 'none';
            }
        });

        // Toggle featured section visibility
        if (featuredSection) {
            featuredSection.style.display = featuredVisibleCount > 0 ? 'block' : 'none';
        }

        // Optional: show "no results" message if both are 0
        const noResultsMsg = document.querySelector('.no-results-message');
        if (featuredVisibleCount === 0 && gridVisibleCount === 0) {
            if (!noResultsMsg && featuredSection) {
                const msg = document.createElement('div');
                msg.className = 'no-results-message';
                msg.innerHTML = `<div style="text-align: center; padding: 60px 0;">
                    <i class="fas fa-search" style="font-size: 3rem; color: var(--accent-color); margin-bottom: 20px; opacity: 0.5;"></i>
                    <h3>No articles found</h3>
                    <p>Try adjusting your search or filter to find what you're looking for.</p>
                </div>`;
                featuredSection.parentNode.insertBefore(msg, featuredSection.nextSibling);
            }
        } else if (noResultsMsg) {
            noResultsMsg.remove();
        }
    };

    if (filterTags.length > 0) {
        filterTags.forEach(tag => {
            tag.addEventListener('click', () => {
                filterTags.forEach(t => t.classList.remove('active'));
                tag.classList.add('active');
                updateBlogGrid();
            });
        });
    }

    if (searchForm && searchInput) {
        searchForm.addEventListener('submit', (e) => {
            e.preventDefault();
            updateBlogGrid();
        });

        let searchDebounce;
        searchInput.addEventListener('input', () => {
            clearTimeout(searchDebounce);
            searchDebounce = setTimeout(updateBlogGrid, 300);
        });
    }
});

    // FAQ Accordion Logic
    const faqItems = document.querySelectorAll('.faq-item');
    if (faqItems.length > 0) {
        faqItems.forEach(item => {
            const question = item.querySelector('.faq-question');
            question.addEventListener('click', () => {
                const isActive = item.classList.contains('active');
                
                // Close other items for a cleaner accordion feel
                faqItems.forEach(other => other.classList.remove('active'));
                
                // Toggle current item
                if (!isActive) {
                    item.classList.add('active');
                }
            });
        });
    }

