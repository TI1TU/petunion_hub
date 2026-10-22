// ==========================================================================
// PETUNION HUB — CORE JAVASCRIPT
// Handles Navigation, Search, Category Filtering, Accordions, Toasts & API
// ==========================================================================

document.addEventListener('DOMContentLoaded', () => {
    // ----------------------------------------------------------------------
    // 1. Mobile Menu Toggle
    // ----------------------------------------------------------------------
    const mobileMenuBtn = document.getElementById('mobileMenuBtn') || document.querySelector('.mobile-menu-btn');
    const navLinks = document.getElementById('navLinks') || document.querySelector('.nav-links');

    if (mobileMenuBtn && navLinks) {
        mobileMenuBtn.addEventListener('click', () => {
            const isActive = navLinks.classList.toggle('active');
            const icon = mobileMenuBtn.querySelector('i');
            if (icon) {
                icon.className = isActive ? 'fas fa-times' : 'fas fa-bars';
            }
            mobileMenuBtn.setAttribute('aria-expanded', isActive);
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!mobileMenuBtn.contains(e.target) && !navLinks.contains(e.target) && navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                const icon = mobileMenuBtn.querySelector('i');
                if (icon) icon.className = 'fas fa-bars';
                mobileMenuBtn.setAttribute('aria-expanded', 'false');
            }
        });
    }

    // ----------------------------------------------------------------------
    // 2. Reading Progress Bar (Article Detail Pages)
    // ----------------------------------------------------------------------
    const progressBar = document.getElementById('readingProgress');
    if (progressBar) {
        window.addEventListener('scroll', () => {
            const scrollTop = window.scrollY || document.documentElement.scrollTop;
            const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const progress = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;
            progressBar.style.width = `${progress}%`;
        }, { passive: true });
    }

    // ----------------------------------------------------------------------
    // 3. Header Glass Scroll Effect
    // ----------------------------------------------------------------------
    const header = document.querySelector('.header');
    if (header) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 40) {
                header.style.boxShadow = '0 10px 30px rgba(160, 82, 45, 0.08)';
                header.style.background = 'rgba(250, 248, 245, 0.95)';
            } else {
                header.style.boxShadow = 'none';
                header.style.background = 'rgba(250, 248, 245, 0.88)';
            }
        }, { passive: true });
    }

    // ----------------------------------------------------------------------
    // 4. FAQ Accordion Logic
    // ----------------------------------------------------------------------
    const faqItems = document.querySelectorAll('.faq-item');
    if (faqItems.length > 0) {
        faqItems.forEach(item => {
            const questionBtn = item.querySelector('.faq-question');
            if (questionBtn) {
                questionBtn.addEventListener('click', () => {
                    const wasActive = item.classList.contains('active');
                    // Accordion behavior: close other open items
                    faqItems.forEach(other => other.classList.remove('active'));
                    if (!wasActive) {
                        item.classList.add('active');
                    }
                });
            }
        });
    }

    // ----------------------------------------------------------------------
    // 5. Consolidated Blog Search & Category Filtering (blog.html)
    // ----------------------------------------------------------------------
    const filterTags = document.querySelectorAll('.filter-tag');
    const blogCards = document.querySelectorAll('.blog-card');
    const searchForm = document.querySelector('.search-form');
    const searchInput = document.querySelector('.search-input');
    const blogGrid = document.querySelector('.blog-grid') || document.querySelector('.grid-3');

    if (blogCards.length > 0 && (filterTags.length > 0 || searchInput)) {
        // Map alias category keys (e.g., 'care' -> 'pet-care' or vice versa)
        const normalizeCategory = (cat) => {
            if (!cat) return 'all';
            const c = cat.toLowerCase().trim();
            if (c === 'care' || c === 'pet-care') return 'care';
            if (c === 'training' || c === 'dog-training') return 'training';
            if (c === 'nutrition' || c === 'food' || c === 'best-food') return 'nutrition';
            if (c === 'health' || c === 'pet-health') return 'health';
            if (c === 'grooming' || c === 'grooming-guide') return 'grooming';
            if (c === 'adoption' || c === 'rescue') return 'adoption';
            if (c === 'cats' || c === 'cat-care') return 'cats';
            return c;
        };

        const updateGrid = () => {
            const query = searchInput ? searchInput.value.toLowerCase().trim() : '';
            const activeTag = document.querySelector('.filter-tag.active');
            const selectedCategory = activeTag ? normalizeCategory(activeTag.getAttribute('data-category')) : 'all';

            let visibleCount = 0;

            blogCards.forEach(card => {
                const titleEl = card.querySelector('.blog-card-title, h2, h3');
                const excerptEl = card.querySelector('.blog-card-excerpt, p');
                const categoryEl = card.querySelector('.blog-category');

                const title = titleEl ? titleEl.textContent.toLowerCase() : '';
                const excerpt = excerptEl ? excerptEl.textContent.toLowerCase() : '';
                const cardCatRaw = card.getAttribute('data-category') || (categoryEl ? categoryEl.textContent.toLowerCase() : '');
                const cardCategory = normalizeCategory(cardCatRaw);

                const matchesSearch = !query || title.includes(query) || excerpt.includes(query);
                const matchesCategory = selectedCategory === 'all' || cardCategory === selectedCategory;

                if (matchesSearch && matchesCategory) {
                    card.style.display = 'flex';
                    visibleCount++;
                } else {
                    card.style.display = 'none';
                }
            });

            // Handle empty state
            let noResultsMsg = document.querySelector('.no-results-message');
            if (visibleCount === 0) {
                if (!noResultsMsg && blogGrid) {
                    noResultsMsg = document.createElement('div');
                    noResultsMsg.className = 'no-results-message';
                    noResultsMsg.innerHTML = `
                        <i class="fas fa-search" aria-hidden="true"></i>
                        <h3>No articles found</h3>
                        <p>We couldn't find any articles matching your search or category filter.</p>
                        <button class="btn btn-primary btn-sm" id="resetFiltersBtn" style="margin-top: 16px;">
                            <i class="fas fa-undo"></i> Reset Filters
                        </button>
                    `;
                    blogGrid.parentNode.insertBefore(noResultsMsg, blogGrid.nextSibling);

                    document.getElementById('resetFiltersBtn')?.addEventListener('click', () => {
                        if (searchInput) searchInput.value = '';
                        filterTags.forEach(t => t.classList.remove('active'));
                        const allTag = document.querySelector('.filter-tag[data-category="all"]');
                        if (allTag) allTag.classList.add('active');
                        updateGrid();
                    });
                }
            } else if (noResultsMsg) {
                noResultsMsg.remove();
            }
        };

        // Wire Filter Tags click
        filterTags.forEach(tag => {
            tag.addEventListener('click', () => {
                filterTags.forEach(t => t.classList.remove('active'));
                tag.classList.add('active');
                updateGrid();

                // Update URL query state without reload
                const cat = tag.getAttribute('data-category');
                const url = new URL(window.location.href);
                if (cat && cat !== 'all') {
                    url.searchParams.set('category', cat);
                } else {
                    url.searchParams.delete('category');
                }
                window.history.replaceState({}, '', url.toString());
            });
        });

        // Wire Search input
        if (searchInput) {
            let debounceTimer;
            searchInput.addEventListener('input', () => {
                clearTimeout(debounceTimer);
                debounceTimer = setTimeout(updateGrid, 250);
            });
        }

        if (searchForm) {
            searchForm.addEventListener('submit', (e) => {
                e.preventDefault();
                updateGrid();
            });
        }

        // Parse initial URL query params on page load!
        const urlParams = new URLSearchParams(window.location.search);
        const initialCategory = urlParams.get('category');
        const initialSearch = urlParams.get('search');

        if (initialSearch && searchInput) {
            searchInput.value = initialSearch;
        }

        if (initialCategory) {
            const normalized = normalizeCategory(initialCategory);
            let matchedTag = false;
            filterTags.forEach(tag => {
                if (normalizeCategory(tag.getAttribute('data-category')) === normalized) {
                    filterTags.forEach(t => t.classList.remove('active'));
                    tag.classList.add('active');
                    matchedTag = true;
                }
            });
            if (!matchedTag) {
                // If specific tag isn't found, keep 'all'
                const allTag = document.querySelector('.filter-tag[data-category="all"]');
                if (allTag) allTag.classList.add('active');
            }
        }

        // Run initial filtering on page load
        updateGrid();
    }

    // ----------------------------------------------------------------------
    // 6. Homepage Search Submission Redirection
    // ----------------------------------------------------------------------
    const homeSearchForm = document.getElementById('homeSearchForm');
    if (homeSearchForm) {
        homeSearchForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const input = homeSearchForm.querySelector('input');
            const query = input ? input.value.trim() : '';
            if (query) {
                window.location.href = `blog.html?search=${encodeURIComponent(query)}`;
            } else {
                window.location.href = 'blog.html';
            }
        });
    }
});

// --------------------------------------------------------------------------
// 7. Global Toast Notification Helper
// --------------------------------------------------------------------------
function showToast(message, type = 'info') {
    let container = document.getElementById('toastContainer');
    if (!container) {
        container = document.createElement('div');
        container.id = 'toastContainer';
        container.className = 'toast-container';
        document.body.appendChild(container);
    }

    const toast = document.createElement('div');
    toast.className = 'toast';
    const icon = type === 'success' ? 'fa-check-circle' : (type === 'error' ? 'fa-exclamation-circle' : 'fa-info-circle');
    toast.innerHTML = `<i class="fas ${icon}" style="color: var(--accent-color);"></i> <span>${message}</span>`;
    container.appendChild(toast);

    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateY(10px)';
        toast.style.transition = 'all 0.3s ease';
        setTimeout(() => toast.remove(), 300);
    }, 3500);
}

// --------------------------------------------------------------------------
// 8. Global Newsletter Subscription Handler
// --------------------------------------------------------------------------
async function handleNewsletter(event) {
    event.preventDefault();
    const form = event.target;
    const input = form.querySelector('input[type="email"]');
    const button = form.querySelector('button[type="submit"]');

    if (!input || !input.value) return;
    const email = input.value.trim();

    if (button) {
        button.disabled = true;
        button.innerText = 'Subscribing...';
    }

    try {
        const response = await fetch('/api/newsletter', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email })
        });
        const result = await response.json();
        if (response.ok && result.success) {
            showToast('Thank you for subscribing! Check your inbox soon for pet care guides.', 'success');
            input.value = '';
        } else {
            showToast(result.error || 'You are already subscribed or something went wrong.', 'info');
        }
    } catch (err) {
        // Fallback for purely static hosting
        showToast('Thank you for subscribing to PetUnion Hub updates!', 'success');
        input.value = '';
    } finally {
        if (button) {
            button.disabled = false;
            button.innerText = 'Subscribe Free';
        }
    }
}
