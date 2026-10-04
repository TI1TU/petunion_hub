/**
 * VAEL ATELIER — HIGH-FASHION EDITORIAL ENGINE
 * Premium Interaction, GSAP Motion Architecture & Web Audio Soundscape
 */

(function () {
  'use strict';

  /* ==========================================================================
     PRODUCT CATALOG DATA (Avant-Garde Architectural Garments)
     ========================================================================== */
  const PRODUCTS = [
    {
      id: 'look-01',
      title: 'Architectural Trench 01',
      category: 'OUTERWEAR',
      price: '€2,450',
      priceNum: 2450,
      season: 'COLLECTION 08 / LOOK 01',
      image: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=1600&q=85',
      material: 'Double-Faced Melton Wool & Bonded Silk Voile',
      origin: 'Atelier Paris — 48 Hours Craft',
      description: 'A monument of minimalist architecture. Featuring dropped sculptural kimono shoulders, a cantilevered storm flap, and raw-finished hem lines that drape with monolithic weight.',
      specs: [
        { label: 'Composition', val: '92% Virgin Wool, 8% Raw Silk' },
        { label: 'Hardware', val: 'Hand-Carved Horn Buttons' },
        { label: 'Silhouette', val: 'Oversized Sculptural Cocoon' },
        { label: 'Lining', val: 'Cupro Twill Interior' }
      ]
    },
    {
      id: 'look-02',
      title: 'Asymmetric Drape Column',
      category: 'SILK & DRAPE',
      price: '€1,820',
      priceNum: 1820,
      season: 'COLLECTION 08 / LOOK 02',
      image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1600&q=85',
      material: 'Heavy Silk Charmeuse & Washed Crepe',
      origin: 'Atelier Kyoto — Master Weave',
      description: 'An organic exploration of fluid gravity. Bias-cut to contour without constraint, punctuated by an asymmetric high-neck cowl secured by a concealed palladium magnetic bar.',
      specs: [
        { label: 'Composition', val: '100% Mulberry Silk Charmeuse' },
        { label: 'Weight', val: '40 Momme Extra-Heavy' },
        { label: 'Closure', val: 'Concealed Magnetic Bar' },
        { label: 'Hem', val: 'Floor-Length Asymmetric Godet' }
      ]
    },
    {
      id: 'look-03',
      title: 'Monolithic Overcoat',
      category: 'OUTERWEAR',
      price: '€2,890',
      priceNum: 2890,
      season: 'COLLECTION 08 / LOOK 03',
      image: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1600&q=85',
      material: '100% Heavy Virgin Melton Wool',
      origin: 'Atelier Paris — Haute Façon',
      description: 'Sharp, uncompromising volume. Engineered with internal horsehair canvas structuring for an unyielding silhouette that frames the body like brutalist stone sculpture.',
      specs: [
        { label: 'Composition', val: '100% Virgin Wool (820 GSM)' },
        { label: 'Internal', val: 'Floating Full Horsehair Canvas' },
        { label: 'Collar', val: 'Extended Brutalist Peak Lapel' },
        { label: 'Vents', val: 'Deep Back Vent with Hidden Snaps' }
      ]
    },
    {
      id: 'look-04',
      title: 'Sculpted Hourglass Blazer',
      category: 'TAILORING',
      price: '€1,650',
      priceNum: 1650,
      season: 'COLLECTION 08 / LOOK 04',
      image: 'https://images.unsplash.com/photo-1508427953056-b00b8d78ebf5?auto=format&fit=crop&w=1600&q=85',
      material: 'High-Twist Wool Gabardine',
      origin: 'Biella Mill, Italy & Paris Atelier',
      description: 'Precision darting creates an exaggerated wasp waist juxtaposed against broad architectural shoulders. A study in razor-sharp contrast and feminine power.',
      specs: [
        { label: 'Composition', val: '100% High-Twist Wool Gabardine' },
        { label: 'Shoulders', val: 'Structured Pagoda Shoulder Pads' },
        { label: 'Cuffs', val: 'Functional Surgeon’s Cuffs' },
        { label: 'Fit', val: 'Extreme Architectural Cinch' }
      ]
    },
    {
      id: 'look-05',
      title: 'Fluid Pleated Trouser',
      category: 'TAILORING',
      price: '€940',
      priceNum: 940,
      season: 'COLLECTION 08 / LOOK 05',
      image: 'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=1600&q=85',
      material: 'Japanese Triacetate & Fine Wool',
      origin: 'Osaka Textile Lab',
      description: 'Double reverse inverted pleats create liquid drape in motion. High-waisted construction with an extended tab closure and unhemmed floor-grazing length.',
      specs: [
        { label: 'Composition', val: '64% Triacetate, 36% Virgin Wool' },
        { label: 'Rise', val: 'High-Waist Extended Tab' },
        { label: 'Pocketing', val: 'Deep Cotton Twill Pocket Bags' },
        { label: 'Leg', val: 'Extreme Wide Silhouette' }
      ]
    },
    {
      id: 'look-06',
      title: 'Brutalist Leather Tote 01',
      category: 'ACCESSORIES',
      price: '€1,480',
      priceNum: 1480,
      season: 'COLLECTION 08 / LOOK 06',
      image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=1600&q=85',
      material: 'Full-Grain Box Calfskin & Palladium',
      origin: 'Tuscany Tannery, Hand-Assembled Paris',
      description: 'A hand-molded geometric sculpture disguised as an everyday carry. Seamless corner joins with multiple coats of matte graphite edge sealant.',
      specs: [
        { label: 'Leather', val: 'Vegetable-Tanned French Calfskin' },
        { label: 'Hardware', val: 'Solid Brushed Palladium' },
        { label: 'Lining', val: 'Bonded Suede Interior' },
        { label: 'Dimensions', val: '42cm x 34cm x 16cm' }
      ]
    },
    {
      id: 'look-07',
      title: 'Cocoon Cashmere Wrap',
      category: 'OUTERWEAR',
      price: '€1,950',
      priceNum: 1950,
      season: 'COLLECTION 08 / LOOK 07',
      image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1600&q=85',
      material: 'Grade-A Mongolian Cashmere (7-Gauge)',
      origin: 'Ulaanbaatar Fiber / Paris Finishing',
      description: 'Weightless thermal sanctuary. Knitted with cloud-brushed Mongolian cashmere yarns in an enveloping organic cocoon silhouette.',
      specs: [
        { label: 'Composition', val: '100% Grade-A Pure Cashmere' },
        { label: 'Gauge', val: '7-Gauge Chunky Fisherman Rib' },
        { label: 'Finish', val: 'Brushed Cloud Softness' },
        { label: 'Care', val: 'Specialist Dry Clean Only' }
      ]
    },
    {
      id: 'look-08',
      title: 'Sculptural Obsidian Vest',
      category: 'TAILORING',
      price: '€1,120',
      priceNum: 1120,
      season: 'COLLECTION 08 / LOOK 08',
      image: 'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&w=1600&q=85',
      material: 'Bonded Technical Cotton & Silk Satin',
      origin: 'Atelier Paris',
      description: 'An avant-garde cuirass for the modern wardrobe. Clean geometric lines, subtle rear cutout, and asymmetric matte gunmetal clamp closures.',
      specs: [
        { label: 'Composition', val: '70% Bonded Cotton, 30% Silk' },
        { label: 'Closure', val: 'Matte Gunmetal Side Clamps' },
        { label: 'Back Detail', val: 'Architectural Geometric Cutout' },
        { label: 'Finish', val: 'Water-Repellent Nano Coating' }
      ]
    }
  ];

  /* State Store */
  const state = {
    cart: [],
    audioActive: false,
    currentFilter: 'ALL',
    activeProduct: null,
    selectedSize: 'FR 38'
  };

  /* DOM Elements Cache */
  let lenisInstance = null;
  const elements = {};

  /* ==========================================================================
     INITIALIZATION ROUTINE
     ========================================================================== */
  document.addEventListener('DOMContentLoaded', () => {
    cacheElements();
    initSmoothScroll();
    initPreloaderSequence();
    initCustomCursor();
    initNavigationBehavior();
    initMagneticEffects();
    initHorizontalRunway();
    initEditorialParallax();
    initProductInteractions();
    initCartDrawer();
    initSoundEngine();
    initWorldClocks();
    initNewsletter();
  });

  function cacheElements() {
    elements.preloader = document.getElementById('preloader');
    elements.preloaderFill = document.getElementById('preloader-fill');
    elements.preloaderCounter = document.getElementById('preloader-counter');
    elements.siteNav = document.getElementById('site-nav');
    elements.menuDrawer = document.getElementById('menu-drawer');
    elements.menuTrigger = document.getElementById('menu-trigger');
    elements.cartBtn = document.getElementById('cart-btn');
    elements.cartCount = document.getElementById('cart-count');
    elements.bagDrawer = document.getElementById('bag-drawer');
    elements.bagBackdrop = document.getElementById('bag-backdrop');
    elements.bagCloseBtn = document.getElementById('bag-close-btn');
    elements.bagItemsList = document.getElementById('bag-items-list');
    elements.bagSubtotal = document.getElementById('bag-subtotal');
    elements.soundToggle = document.getElementById('sound-toggle');
    elements.productModal = document.getElementById('product-modal');
    elements.modalClose = document.getElementById('modal-close');
    elements.cursorDot = document.getElementById('cursor-dot');
    elements.cursorRing = document.getElementById('cursor-ring');
    elements.cursorLabel = document.getElementById('cursor-label');
    elements.toastNotice = document.getElementById('toast-notice');
  }

  /* ==========================================================================
     SMOOTH SCROLL (LENIS + GSAP SCROLLTRIGGER SYNC)
     ========================================================================== */
  function initSmoothScroll() {
    if (typeof Lenis === 'undefined') {
      console.warn('Lenis not detected, running native scroll.');
      return;
    }

    lenisInstance = new Lenis({
      duration: 1.25,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1.05,
      touchMultiplier: 1.8
    });

    lenisInstance.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenisInstance.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);
  }

  /* ==========================================================================
     PRELOADER & HERO ENTRANCE SEQUENCE
     ========================================================================== */
  function initPreloaderSequence() {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion || !elements.preloader) {
      if (elements.preloader) elements.preloader.style.display = 'none';
      revealHero();
      return;
    }

    const tl = gsap.timeline({
      onComplete: () => {
        elements.preloader.style.display = 'none';
        revealHero();
      }
    });

    let counter = { val: 0 };
    tl.to(counter, {
      val: 100,
      duration: 1.35,
      ease: 'power2.inOut',
      onUpdate: () => {
        const num = Math.round(counter.val);
        if (elements.preloaderCounter) {
          elements.preloaderCounter.textContent = num < 10 ? `0${num}` : num;
        }
        if (elements.preloaderFill) {
          elements.preloaderFill.style.width = `${num}%`;
        }
      }
    });

    // Elegant curtain lift
    tl.to(elements.preloader, {
      clipPath: 'inset(0% 0% 100% 0%)',
      duration: 0.9,
      ease: 'power4.inOut'
    }, '+=0.1');
  }

  function revealHero() {
    const heroTl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    // 1. Logo & Nav
    heroTl.fromTo('.brand-logo', 
      { opacity: 0, y: -20 }, 
      { opacity: 1, y: 0, duration: 0.8 }
    );

    // 2. Hero Background reveal & scale down
    heroTl.fromTo('.hero-bg-image',
      { scale: 1.25, filter: 'brightness(0.3) blur(8px)' },
      { scale: 1.08, filter: 'brightness(0.7) blur(0px)', duration: 1.8, ease: 'power2.out' },
      '-=0.6'
    );

    // 3. Staggered headline words
    heroTl.fromTo('.hero-title span',
      { yPercent: 120, opacity: 0 },
      { yPercent: 0, opacity: 1, duration: 1.1, stagger: 0.12, ease: 'power4.out' },
      '-=1.3'
    );

    // 4. Supporting text with blur-to-sharp
    heroTl.fromTo('.hero-description',
      { opacity: 0, y: 30, filter: 'blur(10px)' },
      { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.9 },
      '-=0.7'
    );

    // 5. Hero CTA cluster & metadata
    heroTl.fromTo('.hero-meta-strip, .hero-actions-cluster, .hero-scroll-cue',
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.8, stagger: 0.1 },
      '-=0.5'
    );
  }

  /* ==========================================================================
     CUSTOM CURSOR (Desktop Only with Lerp Physics)
     ========================================================================== */
  function initCustomCursor() {
    if (!elements.cursorDot || !elements.cursorRing) return;
    if (window.matchMedia('(pointer: coarse)').matches) return;

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let ringX = mouseX;
    let ringY = mouseY;

    window.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      elements.cursorDot.style.left = `${mouseX}px`;
      elements.cursorDot.style.top = `${mouseY}px`;
    });

    // Lerp loop for fluid trailing outer ring
    function renderCursor() {
      ringX += (mouseX - ringX) * 0.16;
      ringY += (mouseY - ringY) * 0.16;

      elements.cursorRing.style.left = `${ringX}px`;
      elements.cursorRing.style.top = `${ringY}px`;

      requestAnimationFrame(renderCursor);
    }
    requestAnimationFrame(renderCursor);

    // Contextual Hover States
    const interactiveLinks = document.querySelectorAll('a, button, input, .nav-action-btn');
    interactiveLinks.forEach((el) => {
      el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
      el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
    });

    const productCards = document.querySelectorAll('.product-editorial-card');
    productCards.forEach((card) => {
      card.addEventListener('mouseenter', () => {
        document.body.classList.add('cursor-view');
        if (elements.cursorLabel) elements.cursorLabel.textContent = 'VIEW LOOK';
      });
      card.addEventListener('mouseleave', () => {
        document.body.classList.remove('cursor-view');
      });
    });

    const runwaySection = document.querySelector('.runway-horizontal-track');
    if (runwaySection) {
      runwaySection.addEventListener('mouseenter', () => {
        document.body.classList.add('cursor-drag');
        if (elements.cursorLabel) elements.cursorLabel.textContent = 'EXPLORE';
      });
      runwaySection.addEventListener('mouseleave', () => {
        document.body.classList.remove('cursor-drag');
      });
    }
  }

  /* ==========================================================================
     NAVIGATION BAR BEHAVIOR & FULLSCREEN MENU
     ========================================================================== */
  function initNavigationBehavior() {
    let lastScrollY = 0;

    window.addEventListener('scroll', () => {
      const currentScrollY = window.scrollY;

      // Compact sticky transition
      if (currentScrollY > 80) {
        elements.siteNav?.classList.add('scrolled');
      } else {
        elements.siteNav?.classList.remove('scrolled');
      }

      // Hide on scroll down, reveal on scroll up
      if (currentScrollY > 400 && currentScrollY > lastScrollY && !elements.menuDrawer?.classList.contains('open')) {
        elements.siteNav?.classList.add('nav-hidden');
      } else {
        elements.siteNav?.classList.remove('nav-hidden');
      }

      lastScrollY = currentScrollY;
    }, { passive: true });

    // Menu Drawer Toggle
    elements.menuTrigger?.addEventListener('click', toggleMenuDrawer);
    document.getElementById('menu-drawer-close')?.addEventListener('click', toggleMenuDrawer);

    // Interactive Menu Hover Preview Images
    const menuLinks = document.querySelectorAll('.menu-nav-anchor');
    const previewImg = document.getElementById('menu-preview-img');
    const previewImages = {
      'COLLECTION': 'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=800&q=80',
      'EDITORIAL': 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=800&q=80',
      'RUNWAY': 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&w=800&q=80',
      'ATELIER': 'https://images.unsplash.com/photo-1516762689617-e1cffcef479d?auto=format&fit=crop&w=800&q=80',
      'ARCHIVE': 'https://images.unsplash.com/photo-1581044777550-4cfa60707c03?auto=format&fit=crop&w=800&q=80'
    };

    menuLinks.forEach((link) => {
      link.addEventListener('mouseenter', () => {
        const text = link.getAttribute('data-category');
        if (previewImg && previewImages[text]) {
          previewImg.style.opacity = '0';
          setTimeout(() => {
            previewImg.src = previewImages[text];
            previewImg.style.opacity = '1';
          }, 150);
        }
      });
      link.addEventListener('click', () => {
        toggleMenuDrawer();
      });
    });
  }

  function toggleMenuDrawer() {
    const isOpen = elements.menuDrawer?.classList.toggle('open');
    elements.menuTrigger?.classList.toggle('active', isOpen);
    if (lenisInstance) {
      if (isOpen) {
        lenisInstance.stop();
      } else {
        lenisInstance.start();
      }
    }
  }

  /* ==========================================================================
     MAGNETIC EFFECTS & MOUSE PARALLAX TILT
     ========================================================================== */
  function initMagneticEffects() {
    const magneticBtns = document.querySelectorAll('.btn-primary-magnetic, .nav-action-btn');
    if (window.matchMedia('(pointer: coarse)').matches) return;

    magneticBtns.forEach((btn) => {
      btn.addEventListener('mousemove', (e) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;

        gsap.to(btn, {
          x: x * 0.35,
          y: y * 0.35,
          duration: 0.3,
          ease: 'power2.out'
        });
      });

      btn.addEventListener('mouseleave', () => {
        gsap.to(btn, {
          x: 0,
          y: 0,
          duration: 0.6,
          ease: 'elastic.out(1, 0.4)'
        });
      });
    });

    // Subtle 3D mouse tilt on hero container
    const heroSection = document.getElementById('hero-section');
    if (heroSection) {
      heroSection.addEventListener('mousemove', (e) => {
        const { clientX, clientY } = e;
        const centerX = window.innerWidth / 2;
        const centerY = window.innerHeight / 2;
        const moveX = (clientX - centerX) / centerX * 15;
        const moveY = (clientY - centerY) / centerY * 15;

        gsap.to('.hero-bg-image', {
          x: moveX,
          y: moveY,
          duration: 1.2,
          ease: 'power1.out'
        });
      });
    }
  }

  /* ==========================================================================
     HORIZONTAL SCROLLING RUNWAY SECTION (GSAP ScrollTrigger Pinned)
     ========================================================================== */
  function initHorizontalRunway() {
    const track = document.getElementById('runway-horizontal-track');
    const container = document.getElementById('runway-section-wrapper');
    const progressBar = document.getElementById('runway-progress-thumb');

    if (!track || !container || typeof ScrollTrigger === 'undefined') return;

    // Calculate total horizontal overflow distance
    function getScrollAmount() {
      const trackWidth = track.scrollWidth;
      return -(trackWidth - window.innerWidth + 80);
    }

    const tween = gsap.to(track, {
      x: getScrollAmount,
      ease: 'none'
    });

    ScrollTrigger.create({
      trigger: container,
      start: 'top top',
      end: () => `+=${track.scrollWidth - window.innerWidth + 300}`,
      pin: true,
      animation: tween,
      scrub: 1,
      invalidateOnRefresh: true,
      onUpdate: (self) => {
        if (progressBar) {
          progressBar.style.width = `${self.progress * 100}%`;
        }
      }
    });
  }

  /* ==========================================================================
     EDITORIAL STORY PARALLAX & MASK REVEALS
     ========================================================================== */
  function initEditorialParallax() {
    if (typeof ScrollTrigger === 'undefined') return;

    // Mask Clip-path Reveal on Editorial Images
    const maskReveals = document.querySelectorAll('.story-media-mask-left, .story-media-mask-right');
    maskReveals.forEach((mask) => {
      gsap.fromTo(mask, 
        { clipPath: 'inset(15% 0% 15% 0%)', opacity: 0.6 },
        {
          clipPath: 'inset(0% 0% 0% 0%)',
          opacity: 1,
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: mask,
            start: 'top 85%',
            toggleActions: 'play none none reverse'
          }
        }
      );
    });

    // Parallax Speed Offset on Floating Secondary Images
    const offsetImages = document.querySelectorAll('.story-offset-secondary-img');
    offsetImages.forEach((imgWrap) => {
      gsap.to(imgWrap, {
        yPercent: -25,
        ease: 'none',
        scrollTrigger: {
          trigger: imgWrap,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1
        }
      });
    });

    // Headings Staggered Reveal
    const headings = document.querySelectorAll('.story-headline-giant, .section-title-huge');
    headings.forEach((h) => {
      gsap.fromTo(h,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: h,
            start: 'top 88%'
          }
        }
      );
    });
  }

  /* ==========================================================================
     CINEMATIC PRODUCT TRANSITIONS & INTERACTIVE MODAL
     ========================================================================== */
  function initProductInteractions() {
    // Product Card Clicks
    const productCards = document.querySelectorAll('.product-editorial-card');
    productCards.forEach((card) => {
      card.addEventListener('click', () => {
        const productId = card.getAttribute('data-product-id');
        openProductModal(productId);
      });
    });

    // Modal Close
    elements.modalClose?.addEventListener('click', closeProductModal);
    elements.productModal?.addEventListener('click', (e) => {
      if (e.target === elements.productModal) closeProductModal();
    });

    // ESC Key to Close
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        if (elements.productModal?.classList.contains('active')) closeProductModal();
        if (elements.bagDrawer?.classList.contains('open')) closeCartDrawer();
        if (elements.menuDrawer?.classList.contains('open')) toggleMenuDrawer();
      }
    });

    // Category Filter Buttons
    const filterBtns = document.querySelectorAll('.filter-btn');
    filterBtns.forEach((btn) => {
      btn.addEventListener('click', () => {
        filterBtns.forEach((b) => b.classList.remove('active'));
        btn.classList.add('active');

        const cat = btn.getAttribute('data-filter');
        filterProducts(cat);
      });
    });

    // Sizing Buttons in Modal
    const sizePills = document.querySelectorAll('.size-pill-btn');
    sizePills.forEach((pill) => {
      pill.addEventListener('click', () => {
        sizePills.forEach((p) => p.classList.remove('active'));
        pill.classList.add('active');
        state.selectedSize = pill.getAttribute('data-size');
      });
    });

    // Add to Bag Button in Modal
    const addBagBtn = document.getElementById('modal-add-to-bag');
    addBagBtn?.addEventListener('click', () => {
      if (state.activeProduct) {
        addToCart(state.activeProduct, state.selectedSize);
        playHapticChime();
        showToastNotice(`Ajouté au panier: ${state.activeProduct.title} (${state.selectedSize})`);
      }
    });
  }

  function openProductModal(productId) {
    const product = PRODUCTS.find((p) => p.id === productId);
    if (!product) return;
    state.activeProduct = product;

    // Populate Modal Data
    const modalImg = document.getElementById('modal-main-img');
    const modalTitle = document.getElementById('modal-title');
    const modalCategory = document.getElementById('modal-category');
    const modalPrice = document.getElementById('modal-price');
    const modalDesc = document.getElementById('modal-desc');
    const modalSpecsContainer = document.getElementById('modal-specs-container');

    if (modalImg) modalImg.src = product.image;
    if (modalTitle) modalTitle.textContent = product.title;
    if (modalCategory) modalCategory.textContent = `${product.season} — ${product.category}`;
    if (modalPrice) modalPrice.textContent = product.price;
    if (modalDesc) modalDesc.textContent = product.description;

    if (modalSpecsContainer) {
      modalSpecsContainer.innerHTML = product.specs
        .map((s) => `
          <div class="modal-spec-row">
            <span>${s.label}</span>
            <span>${s.val}</span>
          </div>
        `).join('');
    }

    // Stop Lenis background scrolling
    if (lenisInstance) lenisInstance.stop();

    // Cinematic Open
    elements.productModal?.classList.add('active');
  }

  function closeProductModal() {
    elements.productModal?.classList.remove('active');
    state.activeProduct = null;
    if (lenisInstance) lenisInstance.start();
  }

  function filterProducts(category) {
    state.currentFilter = category;
    const cards = document.querySelectorAll('.product-editorial-card');

    cards.forEach((card) => {
      const cardCat = card.getAttribute('data-category');
      const matches = category === 'ALL' || cardCat === category;

      if (matches) {
        gsap.to(card, {
          autoAlpha: 1,
          scale: 1,
          duration: 0.5,
          ease: 'power2.out',
          display: 'flex'
        });
      } else {
        gsap.to(card, {
          autoAlpha: 0,
          scale: 0.95,
          duration: 0.4,
          ease: 'power2.in',
          display: 'none'
        });
      }
    });

    // Refresh ScrollTrigger layout calculations
    setTimeout(() => {
      ScrollTrigger.refresh();
    }, 450);
  }

  /* ==========================================================================
     SHOPPING BAG DRAWER & CHECKOUT SYSTEM
     ========================================================================== */
  function initCartDrawer() {
    elements.cartBtn?.addEventListener('click', openCartDrawer);
    elements.bagCloseBtn?.addEventListener('click', closeCartDrawer);
    elements.bagBackdrop?.addEventListener('click', closeCartDrawer);

    const checkoutBtn = document.getElementById('btn-checkout');
    checkoutBtn?.addEventListener('click', () => {
      if (state.cart.length === 0) {
        showToastNotice('Your atelier bag is currently empty.');
        return;
      }
      playHapticChime();
      showToastNotice('Order initiated: Redirecting to Private Atelier Vault...');
      setTimeout(() => {
        state.cart = [];
        renderCart();
        closeCartDrawer();
        showToastNotice('Merci. Atelier Concierge will contact you within 2 hours.');
      }, 1600);
    });
  }

  function openCartDrawer() {
    elements.bagDrawer?.classList.add('open');
    elements.bagBackdrop?.classList.add('active');
    if (lenisInstance) lenisInstance.stop();
  }

  function closeCartDrawer() {
    elements.bagDrawer?.classList.remove('open');
    elements.bagBackdrop?.classList.remove('active');
    if (lenisInstance) lenisInstance.start();
  }

  function addToCart(product, size) {
    const existingIndex = state.cart.findIndex((i) => i.id === product.id && i.size === size);
    if (existingIndex > -1) {
      state.cart[existingIndex].qty += 1;
    } else {
      state.cart.push({
        id: product.id,
        title: product.title,
        price: product.price,
        priceNum: product.priceNum,
        image: product.image,
        size: size,
        qty: 1
      });
    }

    renderCart();
    openCartDrawer();
  }

  function removeFromCart(index) {
    state.cart.splice(index, 1);
    renderCart();
  }

  function renderCart() {
    const totalItems = state.cart.reduce((sum, item) => sum + item.qty, 0);
    if (elements.cartCount) elements.cartCount.textContent = `(${totalItems})`;

    if (!elements.bagItemsList) return;

    if (state.cart.length === 0) {
      elements.bagItemsList.innerHTML = `
        <div class="bag-empty-state">
          <p>Your shopping bag is empty.</p>
          <span style="font-size: 11px; letter-spacing: 0.15em; text-transform: uppercase; margin-top: 0.5rem; display: inline-block;">Explore Collection 08</span>
        </div>
      `;
      if (elements.bagSubtotal) elements.bagSubtotal.textContent = '€0';
      return;
    }

    let subtotalNum = 0;
    elements.bagItemsList.innerHTML = state.cart.map((item, idx) => {
      subtotalNum += item.priceNum * item.qty;
      return `
        <div class="bag-item-row">
          <img src="${item.image}" alt="${item.title}" class="bag-item-thumb" />
          <div class="bag-item-details">
            <span class="bag-item-name">${item.title}</span>
            <span class="bag-item-meta">Size: ${item.size} • Qty: ${item.qty}</span>
            <span class="bag-item-price">${item.price}</span>
          </div>
          <button class="bag-item-remove-btn" data-index="${idx}">Remove</button>
        </div>
      `;
    }).join('');

    if (elements.bagSubtotal) {
      elements.bagSubtotal.textContent = `€${subtotalNum.toLocaleString()}`;
    }

    // Attach remove handlers
    elements.bagItemsList.querySelectorAll('.bag-item-remove-btn').forEach((btn) => {
      btn.addEventListener('click', () => {
        const idx = parseInt(btn.getAttribute('data-index'), 10);
        removeFromCart(idx);
      });
    });
  }

  function showToastNotice(msg) {
    if (!elements.toastNotice) return;
    const msgEl = elements.toastNotice.querySelector('.toast-message');
    if (msgEl) msgEl.textContent = msg;

    elements.toastNotice.classList.add('show');
    clearTimeout(elements.toastTimeout);
    elements.toastTimeout = setTimeout(() => {
      elements.toastNotice.classList.remove('show');
    }, 3800);
  }

  /* ==========================================================================
     WEB AUDIO SOUNDSCAPE & HAPTIC CHIMES
     ========================================================================== */
  let audioCtx = null;
  let ambientOsc1 = null;
  let ambientOsc2 = null;
  let ambientGain = null;

  function initSoundEngine() {
    elements.soundToggle?.addEventListener('click', () => {
      if (!state.audioActive) {
        startSoundscape();
        state.audioActive = true;
        elements.soundToggle.classList.add('active');
        const textSpan = elements.soundToggle.querySelector('.sound-label');
        if (textSpan) textSpan.textContent = 'SOUND: ON';
        showToastNotice('Ambiance Atelier Activée');
      } else {
        stopSoundscape();
        state.audioActive = false;
        elements.soundToggle.classList.remove('active');
        const textSpan = elements.soundToggle.querySelector('.sound-label');
        if (textSpan) textSpan.textContent = 'SOUND: OFF';
      }
    });
  }

  function startSoundscape() {
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (!audioCtx) audioCtx = new AudioContext();
      if (audioCtx.state === 'suspended') audioCtx.resume();

      // Gentle warm sub-bass drone
      ambientGain = audioCtx.createGain();
      ambientGain.gain.setValueAtTime(0.001, audioCtx.currentTime);
      ambientGain.gain.exponentialRampToValueAtTime(0.045, audioCtx.currentTime + 3);

      const filter = audioCtx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(220, audioCtx.currentTime);

      ambientOsc1 = audioCtx.createOscillator();
      ambientOsc1.type = 'sine';
      ambientOsc1.frequency.setValueAtTime(55, audioCtx.currentTime); // A1 note

      ambientOsc2 = audioCtx.createOscillator();
      ambientOsc2.type = 'sine';
      ambientOsc2.frequency.setValueAtTime(110.5, audioCtx.currentTime); // Subtle binaural beat

      ambientOsc1.connect(filter);
      ambientOsc2.connect(filter);
      filter.connect(ambientGain);
      ambientGain.connect(audioCtx.destination);

      ambientOsc1.start();
      ambientOsc2.start();
    } catch (e) {
      console.warn('Web Audio not allowed or unavailable:', e);
    }
  }

  function stopSoundscape() {
    if (ambientGain && audioCtx) {
      ambientGain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 1.2);
      setTimeout(() => {
        try {
          ambientOsc1?.stop();
          ambientOsc2?.stop();
        } catch (e) {}
      }, 1300);
    }
  }

  function playHapticChime() {
    if (!audioCtx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      audioCtx = new AudioContext();
    }
    if (audioCtx.state === 'suspended') audioCtx.resume();

    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(880, audioCtx.currentTime); // A5 high bell
    osc.frequency.exponentialRampToValueAtTime(1760, audioCtx.currentTime + 0.12);

    gain.gain.setValueAtTime(0.06, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 0.35);

    osc.connect(gain);
    gain.connect(audioCtx.destination);

    osc.start();
    osc.stop(audioCtx.currentTime + 0.36);
  }

  /* ==========================================================================
     LIVE ATELIER WORLD CLOCKS
     ========================================================================== */
  function initWorldClocks() {
    function updateClocks() {
      const now = new Date();

      const timeParis = now.toLocaleTimeString('en-GB', { timeZone: 'Europe/Paris', hour: '2-digit', minute: '2-digit', second: '2-digit' });
      const timeTokyo = now.toLocaleTimeString('en-GB', { timeZone: 'Asia/Tokyo', hour: '2-digit', minute: '2-digit', second: '2-digit' });
      const timeNYC = now.toLocaleTimeString('en-GB', { timeZone: 'America/New_York', hour: '2-digit', minute: '2-digit', second: '2-digit' });
      const timeMilan = now.toLocaleTimeString('en-GB', { timeZone: 'Europe/Rome', hour: '2-digit', minute: '2-digit', second: '2-digit' });

      const elParis = document.getElementById('clock-paris');
      const elTokyo = document.getElementById('clock-tokyo');
      const elNYC = document.getElementById('clock-nyc');
      const elMilan = document.getElementById('clock-milan');

      if (elParis) elParis.textContent = `${timeParis} CET`;
      if (elTokyo) elTokyo.textContent = `${timeTokyo} JST`;
      if (elNYC) elNYC.textContent = `${timeNYC} EST`;
      if (elMilan) elMilan.textContent = `${timeMilan} CET`;
    }

    updateClocks();
    setInterval(updateClocks, 1000);
  }

  /* ==========================================================================
     NEWSLETTER FORM
     ========================================================================== */
  function initNewsletter() {
    const form = document.getElementById('newsletter-form');
    form?.addEventListener('submit', (e) => {
      e.preventDefault();
      const input = form.querySelector('.newsletter-input');
      if (input && input.value) {
        playHapticChime();
        showToastNotice('Bienvenue. You have been added to the Private Runway Roster.');
        input.value = '';
      }
    });

    // Scroll to Top Button
    const scrollTopBtn = document.getElementById('scroll-top-btn');
    scrollTopBtn?.addEventListener('click', () => {
      if (lenisInstance) {
        lenisInstance.scrollTo(0, { duration: 1.5 });
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    });
  }

})();
