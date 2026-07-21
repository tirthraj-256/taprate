/**
 * TapRate — Premium Micro-Interactions
 * Magnetic buttons · parallax · stagger reveals · 3D tilt
 */
(function () {
  const REDUCED = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function boot() {
    if (REDUCED) {
      document.documentElement.classList.add('reduce-motion');
      document.querySelectorAll('.reveal').forEach((el) => el.classList.add('reveal--visible'));
      return;
    }

    initAmbientLayer();
    initMagneticButtons();
    initParallax();
    initScrollReveal();
    initCardTilt();
    initMouseParallaxOrbs();
    enhanceLinks();
  }

  /** Floating gradient orbs (site-wide ambience) */
  function initAmbientLayer() {
    if (document.querySelector('.ambient')) return;
    const layer = document.createElement('div');
    layer.className = 'ambient';
    layer.setAttribute('aria-hidden', 'true');
    layer.innerHTML =
      '<div class="ambient__orb ambient__orb--1 parallax-layer" data-parallax-speed="0.04"></div>' +
      '<div class="ambient__orb ambient__orb--2 parallax-layer" data-parallax-speed="-0.03"></div>' +
      '<div class="ambient__orb ambient__orb--3 parallax-layer" data-parallax-speed="0.02"></div>';
    document.body.prepend(layer);
  }

  /** Stripe / Linear magnetic button pull */
  function initMagneticButtons() {
    document.querySelectorAll('.btn').forEach((btn) => {
      if (btn.classList.contains('btn--magnetic-init')) return;
      btn.classList.add('btn--magnetic', 'btn--magnetic-init');

      btn.addEventListener('mousemove', (e) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        const strength = btn.classList.contains('btn--lg') ? 0.22 : 0.28;
        btn.style.setProperty('--mag-x', `${x * strength}px`);
        btn.style.setProperty('--mag-y', `${y * strength}px`);
        btn.style.setProperty('--mag-px', `${((e.clientX - rect.left) / rect.width) * 100}%`);
        btn.style.setProperty('--mag-py', `${((e.clientY - rect.top) / rect.height) * 100}%`);
      });

      btn.addEventListener('mouseleave', () => {
        btn.style.setProperty('--mag-x', '0px');
        btn.style.setProperty('--mag-y', '0px');
      });
    });
  }

  /** Scroll + element parallax */
  function initParallax() {
    const layers = document.querySelectorAll('[data-parallax], [data-parallax-speed], .parallax-layer');
    if (!layers.length) return;

    let ticking = false;
    const state = { scrollY: 0, mouseX: 0, mouseY: 0 };

    function update() {
      layers.forEach((el) => {
        const speed = parseFloat(el.dataset.parallax || el.dataset.parallaxSpeed || '0.08');
        const rect = el.getBoundingClientRect();
        const centerY = rect.top + rect.height / 2;
        const viewportCenter = window.innerHeight / 2;
        const dist = (centerY - viewportCenter) * speed;
        const mouseFactor = el.classList.contains('parallax-layer') ? 0.015 : 0;
        const mx = (state.mouseX - window.innerWidth / 2) * mouseFactor * Math.abs(speed) * 10;
        const my = (state.mouseY - window.innerHeight / 2) * mouseFactor * Math.abs(speed) * 10;
        el.style.transform = `translate3d(${mx}px, ${dist + my}px, 0)`;
      });
      ticking = false;
    }

    function requestTick() {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    }

    window.addEventListener('scroll', requestTick, { passive: true });
    window.addEventListener('mousemove', (e) => {
      state.mouseX = e.clientX;
      state.mouseY = e.clientY;
      requestTick();
    }, { passive: true });
    requestTick();
  }

  /** Mouse-follow for ambient orbs */
  function initMouseParallaxOrbs() {
    const orbs = document.querySelectorAll('.ambient__orb');
    if (!orbs.length) return;

    document.addEventListener('mousemove', (e) => {
      const cx = (e.clientX / window.innerWidth - 0.5) * 2;
      const cy = (e.clientY / window.innerHeight - 0.5) * 2;
      orbs.forEach((orb, i) => {
        const factor = (i + 1) * 8;
        orb.style.marginLeft = `${cx * factor}px`;
        orb.style.marginTop = `${cy * factor * 0.6}px`;
      });
    }, { passive: true });
  }

  /** Enhanced fade-up with stagger */
  function initScrollReveal() {
    const grids = '.feature-grid, .card-grid, .stats, .process-grid, .hiw__order-steps, .pricing-grid, .blog-grid, .gallery-masonry, .faq-list, .logo-wall, .industry-grid';
    document.querySelectorAll(grids).forEach((grid) => {
      grid.querySelectorAll('.reveal').forEach((el, i) => {
        el.style.transitionDelay = `${i * 0.07}s`;
      });
    });

    const seen = new WeakSet();
    document.querySelectorAll('.reveal').forEach((el) => {
      if (seen.has(el)) return;
      seen.add(el);

      const observer = new IntersectionObserver(
        (entries, obs) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              el.classList.add('reveal--visible');
              obs.unobserve(el);
            }
          });
        },
        { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
      );
      observer.observe(el);
    });
  }

  /** Apple-style 3D card tilt */
  function initCardTilt() {
    const cards = document.querySelectorAll('.card:not(.card--luxury), .feature-card, .pricing-card');
    cards.forEach((card) => {
      if (card.closest('.card--luxury')) return;
      card.classList.add('card-tilt');

      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        card.style.transform = `perspective(800px) rotateY(${x * 8}deg) rotateX(${-y * 8}deg) translateY(-4px)`;
      });

      card.addEventListener('mouseleave', () => {
        card.style.transform = '';
      });
    });
  }

  /** Stripe-style link enhancements */
  function enhanceLinks() {
    document.querySelectorAll('.card__link').forEach((link) => {
      link.classList.add('link-arrow');
    });
    document.querySelectorAll('.footer__links a, .breadcrumb a').forEach((link) => {
      link.classList.add('link-underline');
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }

  /** Re-init magnetic buttons after header/footer inject */
  document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
      if (!REDUCED) initMagneticButtons();
    }, 50);
  });
})();
