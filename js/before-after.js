/**
 * TapRate — Before / After chart animations
 */
(function () {
  function animateCounter(el, target, duration) {
    const start = performance.now();
    const suffix = el.dataset.suffix || '';
    const prefix = el.dataset.prefix || '';
    const tick = (now) => {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      el.textContent = prefix + Math.floor(eased * target) + suffix;
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }

  function initBeforeAfter() {
    const section = document.getElementById('before-after');
    if (!section) return;

    const panels = section.querySelectorAll('.ba-panel');
    const chart = section.querySelector('.ba-chart');
    const lineChart = section.querySelector('.ba-line-chart');
    const counters = section.querySelectorAll('[data-ba-count]');

    let played = false;

    function play() {
      if (played) return;
      played = true;
      panels.forEach((p) => p.classList.add('ba--animated'));
      if (chart) chart.classList.add('ba--animated');
      if (lineChart) lineChart.classList.add('ba--animated');
      counters.forEach((el) => {
        animateCounter(el, +el.dataset.baCount, 1800);
      });
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            play();
            observer.unobserve(section);
          }
        });
      },
      { threshold: 0.25 }
    );
    observer.observe(section);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initBeforeAfter);
  } else {
    initBeforeAfter();
  }
})();
