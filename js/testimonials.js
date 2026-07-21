/**
 * TapRate — Video testimonial modal
 */
(function () {
  function initTestimonialVideo() {
    const triggers = document.querySelectorAll('[data-video-id]');
    if (!triggers.length) return;

    let modal = document.getElementById('testimonial-modal');
    if (!modal) {
      modal = document.createElement('div');
      modal.id = 'testimonial-modal';
      modal.className = 'testimonial-modal';
      modal.innerHTML =
        '<div class="testimonial-modal__inner">' +
        '<button type="button" class="testimonial-modal__close" aria-label="Close video">×</button>' +
        '<iframe title="Client video testimonial" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>' +
        '</div>';
      document.body.appendChild(modal);
    }

    const iframe = modal.querySelector('iframe');
    const closeBtn = modal.querySelector('.testimonial-modal__close');

    function open(id) {
      if (!id) {
        iframe.srcdoc = '<html><body style="margin:0;background:#0F172A;color:#fff;font-family:sans-serif;display:flex;align-items:center;justify-content:center;height:100%;text-align:center;padding:2rem"><div><p style="font-size:1.25rem;margin-bottom:1rem">Client video testimonial coming soon.</p><p style="opacity:0.8">Ask us on WhatsApp to see live client results.</p></div></body></html>';
      } else {
        iframe.removeAttribute('srcdoc');
        iframe.src = 'https://www.youtube-nocookie.com/embed/' + id + '?autoplay=1&rel=0';
      }
      modal.classList.add('testimonial-modal--open');
      document.body.style.overflow = 'hidden';
    }

    function close() {
      modal.classList.remove('testimonial-modal--open');
      iframe.removeAttribute('srcdoc');
      iframe.src = '';
      document.body.style.overflow = '';
    }

    triggers.forEach((btn) => {
      btn.addEventListener('click', () => open(btn.dataset.videoId));
    });

    closeBtn.addEventListener('click', close);
    modal.addEventListener('click', (e) => {
      if (e.target === modal) close();
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') close();
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initTestimonialVideo);
  } else {
    initTestimonialVideo();
  }
})();
