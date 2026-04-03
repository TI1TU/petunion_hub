/**
 * PetUnion Hub - Premium Brand Script
 */
document.addEventListener('DOMContentLoaded', () => {
    // 1. Premium Reveal Animations
    const observerOptions = {
        root: null,
        rootMargin: '0px 0px -100px 0px',
        threshold: 0.15
    };

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const revealElements = document.querySelectorAll('.reveal');
    revealElements.forEach(el => revealObserver.observe(el));

    // 2. Stagger Grid Item Animations
    const staggerGrids = document.querySelectorAll('.categories-premium, .products-grid, .features-grid, .testimonials-grid, .grid-3');
    staggerGrids.forEach(grid => {
        const items = grid.children;
        for(let i=0; i<items.length; i++) {
            items[i].style.transitionDelay = `${i * 0.1}s`;
        }
    });

    // 3. Header Scroll Behavior
    const header = document.querySelector('.header');
    if (header) {
        const checkScroll = () => {
            if (window.scrollY > 80) {
                header.classList.add('scrolled');
                header.style.background = 'rgba(253, 252, 248, 0.95)';
                header.style.padding = '10px 0';
                header.style.boxShadow = '0 15px 30px rgba(27, 67, 50, 0.08)';
            } else {
                header.classList.remove('scrolled');
                header.style.background = 'rgba(253, 252, 248, 0.8)';
                header.style.padding = '20px 0';
                header.style.boxShadow = 'none';
            }
        };
        window.addEventListener('scroll', checkScroll);
        checkScroll(); // Initial check
    }

    // 4. Mobile Menu Toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    if (mobileMenuBtn && navLinks) {
        mobileMenuBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            const icon = mobileMenuBtn.querySelector('i');
            if (navLinks.classList.contains('active')) {
                icon.classList.replace('fa-bars', 'fa-times');
            } else {
                icon.classList.replace('fa-times', 'fa-bars');
            }
        });
    }

    // 5. FAQ Accordion Logic
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        if (question) {
            question.addEventListener('click', () => {
                const isActive = item.classList.contains('active');
                
                // Close other items
                faqItems.forEach(other => other.classList.remove('active'));
                
                // Toggle current item
                if (!isActive) {
                    item.classList.add('active');
                }
            });
        }
    });

    // 6. Blog & Product Filtering (Consolidated)
    const filterTags = document.querySelectorAll('.filter-tag');
    const blogCards = document.querySelectorAll('.blog-card, .featured-card, .product-card');
    const searchForm = document.querySelector('.search-form');
    const searchInput = document.querySelector('.search-input');

    const updateDisplay = () => {
        const query = searchInput ? searchInput.value.toLowerCase().trim() : '';
        const activeTag = document.querySelector('.filter-tag.active');
        const category = activeTag ? activeTag.getAttribute('data-category') : 'all';

        blogCards.forEach(card => {
            const title = card.querySelector('h3')?.textContent.toLowerCase() || '';
            const excerpt = card.querySelector('.blog-card-excerpt, .product-category')?.textContent.toLowerCase() || '';
            const cardCat = card.getAttribute('data-category');

            const matchesSearch = query === '' || title.includes(query) || excerpt.includes(query);
            const matchesCategory = category === 'all' || cardCat === category;

            if (matchesSearch && matchesCategory) {
                card.style.display = 'flex';
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            } else {
                card.style.display = 'none';
                card.style.opacity = '0';
                card.style.transform = 'translateY(20px)';
            }
        });
    };

    if (filterTags.length > 0) {
        filterTags.forEach(tag => {
            tag.addEventListener('click', () => {
                filterTags.forEach(t => t.classList.remove('active'));
                tag.classList.add('active');
                updateDisplay();
            });
        });
    }

    if (searchForm && searchInput) {
        searchForm.addEventListener('submit', (e) => e.preventDefault());
        let searchDebounce;
        searchInput.addEventListener('input', () => {
            clearTimeout(searchDebounce);
            searchDebounce = setTimeout(updateDisplay, 300);
        });
    }
});
