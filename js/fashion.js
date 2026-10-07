/**
 * VĀRA ATELIER — INDIAN LUXURY HAUTE COUTURE ENGINE
 * Royal Craftsmanship, GSAP Motion Architecture & Indian Ambient Soundscape
 */

(function () {
  'use strict';

  /* ==========================================================================
     PRODUCT CATALOG DATA (Avant-Garde Indian Haute Couture & Artisanal Weaves)
     ========================================================================== */
  const PRODUCTS = [
    {
      id: 'look-01',
      title: 'The Ayodhya Zardozi Lehenga',
      category: 'BRIDAL COUTURE',
      price: '₹4,85,000',
      priceNum: 485000,
      season: 'COLLECTION 08 / LOOK 01',
      image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1600&q=85',
      material: 'Pure Crimson Mulberry Silk & Hand-Beaten 24K Gold Zari',
      origin: 'Varanasi & New Delhi Atelier — 820 Karigar Hours',
      description: 'A monument of royal Indian bridal architecture. Hand-embroidered over 820 artisan hours using antique Dabka and Marodi techniques with hand-beaten gold wire, framed by micro-pearl border edging.',
      specs: [
        { label: 'Craft', val: 'Hand-Couched Real Zardozi Wire & Marodi' },
        { label: 'Textile', val: 'Pure Varanasi Katan Silk (420 GSM)' },
        { label: 'Dupatta', val: 'Dual Organza Tissue with Scalloped Zari' },
        { label: 'Lining', val: 'Pure Habotai Silk with Horsehair Can-Can' }
      ]
    },
    {
      id: 'look-02',
      title: 'Sculptural Kashi Katan Saree',
      category: 'HERITAGE DRAPE',
      price: '₹2,10,000',
      priceNum: 210000,
      season: 'COLLECTION 08 / LOOK 02',
      image: 'https://images.unsplash.com/photo-1596704017254-9b121068fb31?auto=format&fit=crop&w=1600&q=85',
      material: 'Organza Tissue & Handspun Kashi Silk',
      origin: 'Kashi Heritage Weavers, Varanasi',
      description: 'An organic exploration of liquid gold drape. Woven on generational wooden pit-looms in sacred Kashi, featuring antique dull gold Kadwa brocade motifs and a pallu edged with hand-knotted resham tassels.',
      specs: [
        { label: 'Weave', val: 'Authentic Kadwa Handloom Technique' },
        { label: 'Yarn', val: 'Twisted Katan Warp & Muga Gold Weft' },
        { label: 'Border', val: 'Antique Meenakari Floral Border' },
        { label: 'Length', val: '6.5 Metres with Unstitched Blouse Piece' }
      ]
    },
    {
      id: 'look-03',
      title: 'Royal Monolith Sherwani',
      category: 'HAUTE TAILORING',
      price: '₹3,40,000',
      priceNum: 340000,
      season: 'COLLECTION 08 / LOOK 03',
      image: 'https://images.unsplash.com/photo-1605296867304-46d5465a13f1?auto=format&fit=crop&w=1600&q=85',
      material: 'Raw Spun Matka Silk & Basra Pearl Buttons',
      origin: 'Atelier New Delhi — Bespoke Tailoring',
      description: 'Monumental architectural tailoring for the modern Indian royal. Built with floating horsehair chest canvas, high sculpted bandhgala collar, and solid gilded buttons set with natural Basra pearls.',
      specs: [
        { label: 'Fabric', val: 'Handwoven Raw Matka Silk (550 GSM)' },
        { label: 'Buttons', val: 'Custom-Cast Brass with Natural Pearls' },
        { label: 'Structure', val: 'Floating Full Horsehair Canvas Interior' },
        { label: 'Ensemble', val: 'Includes Tonal Churidar & Silk Stole' }
      ]
    },
    {
      id: 'look-04',
      title: 'Sculpted Chanderi Cape Ensemble',
      category: 'BRIDAL COUTURE',
      price: '₹1,85,000',
      priceNum: 185000,
      season: 'COLLECTION 08 / LOOK 04',
      image: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=1600&q=85',
      material: 'Hand-Gilded Chanderi & Liquid Habotai Silk',
      origin: 'Chanderi Loom Guild & Jaipur Atelier',
      description: 'A contemporary Indian couture silhouette. Featuring a dramatic floor-grazing architectural cape in gilded Chanderi tissue, paired with a boned silk corset and micro-pleated flared sharara trousers.',
      specs: [
        { label: 'Cape', val: 'Floor-Length Gilded Tissue Chanderi' },
        { label: 'Corset', val: 'Internal Steel-Boned Architecture' },
        { label: 'Embroidery', val: 'Tonal Cut-Dana & Bugle Bead Wire' },
        { label: 'Fit', val: 'Architectural Cinch with Fluid Drape' }
      ]
    },
    {
      id: 'look-05',
      title: 'Jaipur Meenakari Trouser Suit',
      category: 'HAUTE TAILORING',
      price: '₹1,45,000',
      priceNum: 145000,
      season: 'COLLECTION 08 / LOOK 05',
      image: 'https://images.unsplash.com/photo-1546804784-896d0dca3805?auto=format&fit=crop&w=1600&q=85',
      material: 'Tussar Georgette & Hand-Cast Brass Hardware',
      origin: 'Atelier Jaipur — Royal Armory Craft',
      description: 'Razor-sharp double-breasted tuxedo suit inspired by royal Rajasthani armory. Peak lapels hand-embroidered with micro-gold bullion thread, paired with fluid high-waisted cigarette trousers.',
      specs: [
        { label: 'Composition', val: '100% Wild Tussar Silk' },
        { label: 'Lapels', val: 'Hand-Embroidered Bullion Wire' },
        { label: 'Shoulders', val: 'Pagoda Sculptural Shoulder Architecture' },
        { label: 'Trousers', val: 'High-Rise Extended Tab Waist' }
      ]
    },
    {
      id: 'look-06',
      title: 'Brutalist Polki Minaudière Clutch',
      category: 'ACCESSORIES',
      price: '₹95,000',
      priceNum: 95000,
      season: 'COLLECTION 08 / LOOK 06',
      image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=1600&q=85',
      material: 'Hand-Hammered Brass, Raw Silk & Uncut Polki Quartz',
      origin: 'Jaipur Goldsmith Guild & Mumbai Studio',
      description: 'A hand-molded geometric sculpture for black-tie galas. Cast in solid brass with an antique oxidized gold wash, lined in crimson Banarasi raw silk with an uncut Polki quartz clasp.',
      specs: [
        { label: 'Metal', val: 'Solid Hand-Hammered Brass' },
        { label: 'Clasp', val: 'Bezel-Set Uncut Polki Quartz' },
        { label: 'Lining', val: 'Pure Crimson Banarasi Raw Silk' },
        { label: 'Chain', val: 'Detachable 24K Gilded Snake Chain' }
      ]
    },
    {
      id: 'look-07',
      title: 'Kashmiri Pashmina Monolith Wrap',
      category: 'HERITAGE DRAPE',
      price: '₹2,60,000',
      priceNum: 260000,
      season: 'COLLECTION 08 / LOOK 07',
      image: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=1600&q=85',
      material: '100% Hand-Spun Changthangi Pashmina',
      origin: 'Srinagar Valley & Ladakh Highland Guild',
      description: 'Weightless heritage heirloom. Hand-spun from pure Ladakh Changthangi mountain goat fleece and hand-embroidered with delicate needle Sozni motifs over 180 artisan days in Srinagar.',
      specs: [
        { label: 'Fiber', val: 'Grade-A 12-Micron Mountain Pashmina' },
        { label: 'Needlework', val: 'Hand-Embroidered Sozni Paisley Motifs' },
        { label: 'Dimensions', val: '100cm x 200cm Monolith Wrap' },
        { label: 'Certification', val: 'Geographical Indication (GI) Certified' }
      ]
    },
    {
      id: 'look-08',
      title: 'The Royal Gilded Bandhgala',
      category: 'HAUTE TAILORING',
      price: '₹1,95,000',
      priceNum: 195000,
      season: 'COLLECTION 08 / LOOK 08',
      image: 'https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8?auto=format&fit=crop&w=1600&q=85',
      material: 'Heavy Raw Silk & Hand-Polished Jade Closures',
      origin: 'Atelier New Delhi',
      description: 'An avant-garde interpretation of the Indian royal court jacket. Features a structured high bandhgala collar, hidden placket with hand-carved jade frog buttons, and deep dual riding vents.',
      specs: [
        { label: 'Textile', val: '100% Heavy Handwoven Raw Silk' },
        { label: 'Hardware', val: 'Hand-Carved Natural Green Jade Closures' },
        { label: 'Vents', val: 'Traditional Royal Court Riding Vents' },
        { label: 'Finish', val: 'Anti-Crease Silk Bonded Interlining' }
      ]
    }
  ];

  /* State Store */
  const state = {
    cart: [],
    audioActive: false,
    currentFilter: 'ALL',
    activeProduct: null,
    selectedSize: '38 (M)'
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

    // Regal curtain lift
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
      { scale: 1.08, filter: 'brightness(0.72) blur(0px)', duration: 1.8, ease: 'power2.out' },
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
        if (elements.cursorLabel) elements.cursorLabel.textContent = 'VIEW PIECE';
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

      if (currentScrollY > 80) {
        elements.siteNav?.classList.add('scrolled');
      } else {
        elements.siteNav?.classList.remove('scrolled');
      }

      if (currentScrollY > 400 && currentScrollY > lastScrollY && !elements.menuDrawer?.classList.contains('open')) {
        elements.siteNav?.classList.add('nav-hidden');
      } else {
        elements.siteNav?.classList.remove('nav-hidden');
      }

      lastScrollY = currentScrollY;
    }, { passive: true });

    elements.menuTrigger?.addEventListener('click', toggleMenuDrawer);
    document.getElementById('menu-drawer-close')?.addEventListener('click', toggleMenuDrawer);

    // Interactive Menu Hover Preview Images
    const menuLinks = document.querySelectorAll('.menu-nav-anchor');
    const previewImg = document.getElementById('menu-preview-img');
    const previewImages = {
      'COLLECTION': 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80',
      'EDITORIAL': 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=800&q=80',
      'RUNWAY': 'https://images.unsplash.com/photo-1605296867304-46d5465a13f1?auto=format&fit=crop&w=800&q=80',
      'ATELIER': 'https://images.unsplash.com/photo-1609357605129-26f69add5d6e?auto=format&fit=crop&w=800&q=80',
      'ARCHIVE': 'https://images.unsplash.com/photo-1596704017254-9b121068fb31?auto=format&fit=crop&w=800&q=80'
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

    // Mask Clip-path Reveal on Portrait Frames
    const portraitFrames = document.querySelectorAll('.story-portrait-frame');
    portraitFrames.forEach((frame) => {
      gsap.fromTo(frame, 
        { clipPath: 'inset(10% 0% 10% 0%)', opacity: 0.7 },
        {
          clipPath: 'inset(0% 0% 0% 0%)',
          opacity: 1,
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: frame,
            start: 'top 85%',
            toggleActions: 'play none none reverse'
          }
        }
      );

      const innerImg = frame.querySelector('.story-portrait-img');
      if (innerImg) {
        gsap.fromTo(innerImg,
          { scale: 1.12, yPercent: -4 },
          {
            scale: 1.02,
            yPercent: 4,
            ease: 'none',
            scrollTrigger: {
              trigger: frame,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 1
            }
          }
        );
      }
    });

    // Reveal for Specimen Inset Cards
    const specimenCards = document.querySelectorAll('.story-specimen-card');
    specimenCards.forEach((card) => {
      gsap.fromTo(card,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 90%'
          }
        }
      );
    });

    // Headings Staggered Reveal
    const headings = document.querySelectorAll('.story-headline-giant, .section-title-huge');
    headings.forEach((h) => {
      gsap.fromTo(h,
        { y: 40, opacity: 0 },
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
    const productCards = document.querySelectorAll('.product-editorial-card');
    productCards.forEach((card) => {
      card.addEventListener('click', () => {
        const productId = card.getAttribute('data-product-id');
        openProductModal(productId);
      });
    });

    elements.modalClose?.addEventListener('click', closeProductModal);
    elements.productModal?.addEventListener('click', (e) => {
      if (e.target === elements.productModal) closeProductModal();
    });

    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        if (elements.productModal?.classList.contains('active')) closeProductModal();
        if (elements.bagDrawer?.classList.contains('open')) closeCartDrawer();
        if (elements.menuDrawer?.classList.contains('open')) toggleMenuDrawer();
      }
    });

    const filterBtns = document.querySelectorAll('.filter-btn');
    filterBtns.forEach((btn) => {
      btn.addEventListener('click', () => {
        filterBtns.forEach((b) => b.classList.remove('active'));
        btn.classList.add('active');

        const cat = btn.getAttribute('data-filter');
        filterProducts(cat);
      });
    });

    const sizePills = document.querySelectorAll('.size-pill-btn');
    sizePills.forEach((pill) => {
      pill.addEventListener('click', () => {
        sizePills.forEach((p) => p.classList.remove('active'));
        pill.classList.add('active');
        state.selectedSize = pill.getAttribute('data-size');
      });
    });

    const addBagBtn = document.getElementById('modal-add-to-bag');
    addBagBtn?.addEventListener('click', () => {
      if (state.activeProduct) {
        addToCart(state.activeProduct, state.selectedSize);
        playHapticChime();
        showToastNotice(`Added to Atelier Roster: ${state.activeProduct.title} (${state.selectedSize})`);
      }
    });
  }

  function openProductModal(productId) {
    const product = PRODUCTS.find((p) => p.id === productId);
    if (!product) return;
    state.activeProduct = product;

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

    if (lenisInstance) lenisInstance.stop();
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
        showToastNotice('Your couture bag is currently empty.');
        return;
      }
      playHapticChime();
      showToastNotice('Order initiated: Connecting to Royal Concierge Desk...');
      setTimeout(() => {
        state.cart = [];
        renderCart();
        closeCartDrawer();
        showToastNotice('Dhanyavaad. Your Private Bespoke Stylist will connect within 2 hours.');
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
          <p>Your couture bag is empty.</p>
          <span style="font-size: 11px; letter-spacing: 0.15em; text-transform: uppercase; margin-top: 0.5rem; display: inline-block;">Explore Collection 08</span>
        </div>
      `;
      if (elements.bagSubtotal) elements.bagSubtotal.textContent = '₹0';
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
      elements.bagSubtotal.textContent = `₹${subtotalNum.toLocaleString('en-IN')}`;
    }

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
     WEB AUDIO SOUNDSCAPE & HAPTIC CHIMES (Indian Ambient Palace Drone)
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
        showToastNotice('Palace Soundscape Active');
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

      // Meditative Tanpura palace resonance (D2 root: 73.4Hz + A2 fifth: 110.1Hz)
      ambientGain = audioCtx.createGain();
      ambientGain.gain.setValueAtTime(0.001, audioCtx.currentTime);
      ambientGain.gain.exponentialRampToValueAtTime(0.045, audioCtx.currentTime + 3);

      const filter = audioCtx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(280, audioCtx.currentTime);

      ambientOsc1 = audioCtx.createOscillator();
      ambientOsc1.type = 'sine';
      ambientOsc1.frequency.setValueAtTime(73.4, audioCtx.currentTime);

      ambientOsc2 = audioCtx.createOscillator();
      ambientOsc2.type = 'sine';
      ambientOsc2.frequency.setValueAtTime(110.1, audioCtx.currentTime);

      ambientOsc1.connect(filter);
      ambientOsc2.connect(filter);
      filter.connect(ambientGain);
      ambientGain.connect(audioCtx.destination);

      ambientOsc1.start();
      ambientOsc2.start();
    } catch (e) {
      console.warn('Web Audio unavailable:', e);
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
    osc.frequency.setValueAtTime(987.77, audioCtx.currentTime); // B5 ghungroo sparkle bell
    osc.frequency.exponentialRampToValueAtTime(1975.53, audioCtx.currentTime + 0.12);

    gain.gain.setValueAtTime(0.06, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 0.35);

    osc.connect(gain);
    gain.connect(audioCtx.destination);

    osc.start();
    osc.stop(audioCtx.currentTime + 0.36);
  }

  /* ==========================================================================
     LIVE ATELIER WORLD CLOCKS (New Delhi, Varanasi, Mumbai, London)
     ========================================================================== */
  function initWorldClocks() {
    function updateClocks() {
      const now = new Date();

      const timeDelhi = now.toLocaleTimeString('en-GB', { timeZone: 'Asia/Kolkata', hour: '2-digit', minute: '2-digit', second: '2-digit' });
      const timeVaranasi = now.toLocaleTimeString('en-GB', { timeZone: 'Asia/Kolkata', hour: '2-digit', minute: '2-digit', second: '2-digit' });
      const timeLondon = now.toLocaleTimeString('en-GB', { timeZone: 'Europe/London', hour: '2-digit', minute: '2-digit', second: '2-digit' });
      const timeNYC = now.toLocaleTimeString('en-GB', { timeZone: 'America/New_York', hour: '2-digit', minute: '2-digit', second: '2-digit' });

      const elDelhi = document.getElementById('clock-delhi');
      const elVaranasi = document.getElementById('clock-varanasi');
      const elLondon = document.getElementById('clock-london');
      const elNYC = document.getElementById('clock-nyc');

      if (elDelhi) elDelhi.textContent = `${timeDelhi} IST`;
      if (elVaranasi) elVaranasi.textContent = `${timeVaranasi} IST`;
      if (elLondon) elLondon.textContent = `${timeLondon} GMT`;
      if (elNYC) elNYC.textContent = `${timeNYC} EST`;
    }

    updateClocks();
    setInterval(updateClocks, 1000);
  }

  /* ==========================================================================
     NEWSLETTER & SCROLL TO TOP
     ========================================================================== */
  function initNewsletter() {
    const form = document.getElementById('newsletter-form');
    form?.addEventListener('submit', (e) => {
      e.preventDefault();
      const input = form.querySelector('.newsletter-input');
      if (input && input.value) {
        playHapticChime();
        showToastNotice('Namaste. You have been added to the Royal Atelier Private Roster.');
        input.value = '';
      }
    });

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
