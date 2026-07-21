/**
 * TapRate — Premium gallery: 360°, compare slider, video, lightbox
 */
(function () {
  function initGalleryCompare() {
    document.querySelectorAll('[data-gallery-compare]').forEach((root) => {
      const after = root.querySelector('.gallery-compare__after');
      const handle = root.querySelector('.gallery-compare__handle');
      const input = root.querySelector('.gallery-compare__input');
      if (!after || !input) return;

      const pin = root.closest('.gallery-pin');
      const media = pin && pin.querySelector('.gallery-pin__media img, .gallery-pin__media video');

      function setPos(pct) {
        const clamped = Math.max(8, Math.min(92, pct));
        after.style.width = clamped + '%';
        if (handle) handle.style.left = clamped + '%';
        input.value = clamped;
      }

      input.addEventListener('input', () => setPos(+input.value));

      let dragging = false;
      root.addEventListener('pointerdown', (e) => {
        if (e.target === input) return;
        dragging = true;
        root.setPointerCapture(e.pointerId);
        const rect = root.getBoundingClientRect();
        setPos(((e.clientX - rect.left) / rect.width) * 100);
      });
      root.addEventListener('pointermove', (e) => {
        if (!dragging) return;
        const rect = root.getBoundingClientRect();
        setPos(((e.clientX - rect.left) / rect.width) * 100);
      });
      root.addEventListener('pointerup', () => {
        dragging = false;
      });

      if (media) {
        const syncWidth = () => {
          const w = root.offsetWidth;
          const afterImg = after.querySelector('img');
          if (afterImg) afterImg.style.width = w + 'px';
        };
        syncWidth();
        window.addEventListener('resize', syncWidth);
      }

      setPos(50);
    });
  }

  function initGallery360() {
    document.querySelectorAll('[data-gallery-360]').forEach((el) => {
      const inner = el.querySelector('.gallery-pin__360-inner');
      const img = inner && inner.querySelector('img');
      if (!img) return;

      let rotation = 0;
      let dragging = false;
      let startX = 0;
      let startRot = 0;

      function apply() {
        inner.style.setProperty('--rotate-y', rotation + 'deg');
        img.style.transform = 'rotateY(' + rotation + 'deg)';
      }

      el.addEventListener('pointerdown', (e) => {
        dragging = true;
        startX = e.clientX;
        startRot = rotation;
        el.classList.add('is-dragging');
        el.setPointerCapture(e.pointerId);
      });

      el.addEventListener('pointermove', (e) => {
        if (!dragging) return;
        const delta = e.clientX - startX;
        rotation = Math.max(-55, Math.min(55, startRot + delta * 0.4));
        apply();
      });

      el.addEventListener('pointerup', () => {
        dragging = false;
        el.classList.remove('is-dragging');
      });

      el.addEventListener('pointercancel', () => {
        dragging = false;
        el.classList.remove('is-dragging');
      });

      if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        let idle = 0;
        const tick = () => {
          if (!dragging && el.matches(':hover')) {
            idle += 0.15;
            rotation = Math.sin(idle * 0.02) * 12;
            apply();
          }
          requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      }
    });
  }

  function getModal() {
    let modal = document.getElementById('gallery-modal');
    if (!modal) {
      modal = document.createElement('div');
      modal.id = 'gallery-modal';
      modal.className = 'gallery-modal';
      modal.innerHTML =
        '<div class="gallery-modal__inner">' +
        '<button type="button" class="gallery-modal__close" aria-label="Close">×</button>' +
        '<div class="gallery-modal__content"></div>' +
        '<div class="gallery-modal__caption" hidden></div>' +
        '</div>';
      document.body.appendChild(modal);

      modal.querySelector('.gallery-modal__close').addEventListener('click', closeModal);
      modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
      });
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeModal();
      });
    }
    return modal;
  }

  function openModal(content, caption) {
    const modal = getModal();
    const box = modal.querySelector('.gallery-modal__content');
    const cap = modal.querySelector('.gallery-modal__caption');
    box.innerHTML = '';
    box.appendChild(content);
    if (caption) {
      cap.innerHTML = caption;
      cap.hidden = false;
    } else {
      cap.hidden = true;
    }
    modal.classList.add('gallery-modal--open');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    const modal = document.getElementById('gallery-modal');
    if (!modal) return;
    modal.classList.remove('gallery-modal--open');
    const box = modal.querySelector('.gallery-modal__content');
    const vid = box.querySelector('video');
    if (vid) {
      vid.pause();
      vid.removeAttribute('src');
      vid.load();
    }
    box.innerHTML = '';
    document.body.style.overflow = '';
  }

  function initGalleryVideo() {
    document.querySelectorAll('[data-gallery-video]').forEach((btn) => {
      btn.addEventListener('click', () => {
        const src = btn.dataset.galleryVideo;
        const poster = btn.dataset.galleryPoster || '';
        const title = btn.dataset.galleryTitle || 'Product video';
        const desc = btn.dataset.galleryDesc || '';

        const video = document.createElement('video');
        video.controls = true;
        video.autoplay = true;
        video.playsInline = true;
        if (poster) video.poster = poster;

        if (src) {
          video.src = src;
          openModal(video, '<strong>' + title + '</strong>' + (desc ? desc : ''));
        } else {
          const placeholder = document.createElement('div');
          placeholder.style.cssText =
            'background:#0F172A;color:#fff;padding:3rem 2rem;text-align:center;min-height:280px;display:flex;align-items:center;justify-content:center;flex-direction:column;gap:0.5rem';
          placeholder.innerHTML =
            '<p style="font-size:1.125rem;margin:0">Product demo video coming soon</p>' +
            '<p style="opacity:0.75;font-size:0.875rem;margin:0">Add MP4 to <code>videos/</code> and set <code>data-gallery-video</code></p>';
          if (poster) {
            const bg = document.createElement('img');
            bg.src = poster;
            bg.alt = '';
            bg.style.cssText = 'width:100%;max-height:70vh;object-fit:contain;display:block';
            openModal(bg, '<strong>' + title + '</strong>' + (desc ? desc : ''));
          } else {
            openModal(placeholder, '<strong>' + title + '</strong>' + (desc ? desc : ''));
          }
        }
      });
    });

    document.querySelectorAll('.gallery-pin--video video').forEach((video) => {
      const pin = video.closest('.gallery-pin');
      if (!pin || !video.getAttribute('src')) return;
      pin.addEventListener('mouseenter', () => {
        video.play().catch(function () {});
      });
      pin.addEventListener('mouseleave', () => {
        video.pause();
        video.currentTime = 0;
      });
    });
  }

  function initGalleryLightbox() {
    document.querySelectorAll('[data-gallery-lightbox]').forEach((btn) => {
      btn.addEventListener('click', (e) => {
        if (e.target.closest('[data-gallery-compare], [data-gallery-360], [data-gallery-video]')) return;
        const img = btn.querySelector('img');
        if (!img) return;
        const clone = document.createElement('img');
        clone.src = img.currentSrc || img.src;
        clone.alt = img.alt;
        const title = btn.dataset.galleryTitle || img.alt;
        const desc = btn.dataset.galleryDesc || '';
        openModal(clone, '<strong>' + title + '</strong>' + (desc ? desc : ''));
      });
    });
  }

  function initGalleryFilters() {
    const bar = document.querySelector('[data-gallery-filters]');
    if (!bar) return;
    const pins = document.querySelectorAll('.gallery-masonry .gallery-pin');
    bar.addEventListener('click', (e) => {
      const btn = e.target.closest('.gallery-filter');
      if (!btn) return;
      bar.querySelectorAll('.gallery-filter').forEach((b) => b.classList.remove('gallery-filter--active'));
      btn.classList.add('gallery-filter--active');
      const filter = btn.dataset.filter;
      pins.forEach((pin) => {
        if (filter === 'all' || pin.dataset.category === filter) {
          pin.classList.remove('is-hidden');
        } else {
          pin.classList.add('is-hidden');
        }
      });
    });
  }

  function init() {
    initGalleryCompare();
    initGallery360();
    initGalleryVideo();
    initGalleryLightbox();
    initGalleryFilters();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
