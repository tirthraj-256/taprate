/**
 * TapRate — Interactive Phone Mockup (auto-loop + tap to advance)
 */
(function () {
  const DATA = {
    idle: {
      step: 'Ready',
      title: 'Your Phone. Waiting to Connect.',
      desc: 'The phone is ready. Tap the NFC card to simulate a real tap — watch the screen change instantly, just like your customers will experience.',
      cta: '👆 Tap the card to try the next screen'
    },
    instagram: {
      step: 'Instagram',
      title: 'Instagram Profile Opens',
      desc: 'One tap sends customers straight to your Instagram — perfect for salons, restaurants, and brands building their social presence.',
      cta: 'Tap again for Website →'
    },
    website: {
      step: 'Website',
      title: 'Your Website Loads',
      desc: 'Prospects land on taprate.in, your menu, booking page, or portfolio. Update the URL anytime — the NFC chip stays the same.',
      cta: 'Tap again for Call →'
    },
    call: {
      step: 'Call',
      title: 'One-Tap Phone Call',
      desc: 'NFC can trigger an instant call to your business number. No dialling, no copy-paste — just tap and connect.',
      cta: 'Tap again for Google Reviews →'
    },
    google: {
      step: 'Google Reviews',
      title: 'Google Review Page',
      desc: 'Review standees open your exact Google Business page. Customers tap, rate 5 stars, and boost your local SEO ranking.',
      cta: ''
    }
  };

  const ORDER = ['idle', 'instagram', 'website', 'call', 'google'];
  const TAP_MS = 900;
  const AUTO_HOLD_MS = 2800;
  const AUTO_PAUSE_MS = 12000;

  let current = 0;
  let isAnimating = false;
  let autoTimer = null;
  let autoPausedUntil = 0;
  let isInView = false;

  function initHowItWorks() {
    const section = document.getElementById('how-it-works');
    if (!section) return;

    const scene = section.querySelector('#hiw-scene') || section.querySelector('.hiw__scene');
    const tapCard = section.querySelector('#hiw-tap-card');
    const flowSteps = section.querySelectorAll('.hiw__flow-step');
    const screens = section.querySelectorAll('.hiw__screen');
    const progressDots = section.querySelectorAll('.hiw__progress-dot');
    const infoStep = section.querySelector('.hiw__info-step');
    const infoTitle = section.querySelector('.hiw__info-title');
    const infoDesc = section.querySelector('.hiw__info-desc');
    const tapCta = section.querySelector('.hiw__tap-cta-text');

    function getStepIndex(screenKey) {
      if (screenKey === 'idle') return 0;
      return ORDER.indexOf(screenKey) + 1;
    }

    function updateFlowUI(screenKey) {
      const stepIdx = getStepIndex(screenKey);
      flowSteps.forEach((step) => {
        const s = parseInt(step.dataset.step, 10);
        step.classList.remove('hiw__flow-step--active', 'hiw__flow-step--done', 'hiw__flow-step--pulse');
        if (step.dataset.action === 'tap') {
          if (screenKey === 'idle') step.classList.add('hiw__flow-step--pulse');
          else if (stepIdx > 1) step.classList.add('hiw__flow-step--done');
        } else if (s < stepIdx) {
          step.classList.add('hiw__flow-step--done');
        } else if (s === stepIdx) {
          step.classList.add('hiw__flow-step--active');
        }
      });

      progressDots.forEach((dot, i) => {
        dot.classList.remove('hiw__progress-dot--active', 'hiw__progress-dot--done');
        const fill = dot.querySelector('.hiw__progress-fill');
        if (fill) {
          fill.classList.remove('hiw__progress-fill--running');
          fill.style.animation = 'none';
          fill.style.transform = i < stepIdx ? '' : 'scaleX(0)';
        }
        if (i < stepIdx) dot.classList.add('hiw__progress-dot--done');
        if (i === stepIdx) dot.classList.add('hiw__progress-dot--active');
      });

      scene.classList.toggle('hiw__scene--idle', screenKey === 'idle');
    }

    function playTapAnimation(cb) {
      if (isAnimating) return;
      isAnimating = true;
      const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      if (reduced) {
        if (cb) cb();
        isAnimating = false;
        return;
      }

      scene.classList.remove('hiw__scene--tapping');
      void scene.offsetWidth;
      scene.classList.add('hiw__scene--tapping');

      const applyAt = Math.round(TAP_MS * 0.48);
      setTimeout(() => {
        if (cb) cb();
      }, applyAt);

      setTimeout(() => {
        scene.classList.remove('hiw__scene--tapping');
        isAnimating = false;
      }, TAP_MS);
    }

    function setScreen(key, animateTap) {
      const idx = ORDER.indexOf(key);
      if (idx === -1) return;
      current = idx;

      const apply = () => {
        screens.forEach((s) => {
          const wasActive = s.classList.contains('hiw__screen--active');
          const active = s.dataset.screen === key;
          if (wasActive && !active) {
            s.classList.add('hiw__screen--exit');
            s.classList.remove('hiw__screen--active');
            window.setTimeout(() => s.classList.remove('hiw__screen--exit'), 520);
          } else if (active) {
            s.classList.remove('hiw__screen--exit');
            s.classList.add('hiw__screen--active');
          } else {
            s.classList.remove('hiw__screen--active', 'hiw__screen--exit');
          }
        });

        const d = DATA[key];
        if (infoStep) infoStep.textContent = d.step;
        if (infoTitle) infoTitle.textContent = d.title;
        if (infoDesc) infoDesc.textContent = d.desc;
        if (tapCta) {
          tapCta.textContent = d.cta;
          const ctaWrap = tapCta.closest('.hiw__tap-cta');
          if (ctaWrap) ctaWrap.hidden = !d.cta;
        }

        updateFlowUI(key);
        startSlideProgress();
      };

      if (animateTap) playTapAnimation(apply);
      else apply();
    }

    function advanceFromTap() {
      const nextIdx = (current + 1) % ORDER.length;
      setScreen(ORDER[nextIdx], true);
    }

    function getAutoHoldMs() {
      const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      return reduced ? 3200 : AUTO_HOLD_MS;
    }

    function getSlideProgressMs() {
      return getAutoHoldMs() + TAP_MS;
    }

    function stopSlideProgress() {
      progressDots.forEach((dot) => {
        const fill = dot.querySelector('.hiw__progress-fill');
        if (!fill) return;
        fill.classList.remove('hiw__progress-fill--running');
        fill.style.animation = 'none';
      });
    }

    function startSlideProgress() {
      if (!isInView || Date.now() < autoPausedUntil) return;

      const stepIdx = getStepIndex(ORDER[current]);
      const fill = progressDots[stepIdx]?.querySelector('.hiw__progress-fill');
      if (!fill) return;

      const duration = getSlideProgressMs();
      stopSlideProgress();
      fill.style.transform = 'scaleX(0)';
      void fill.offsetWidth;
      fill.style.removeProperty('animation');
      fill.style.setProperty('--hiw-progress-dur', `${duration}ms`);
      fill.classList.add('hiw__progress-fill--running');
    }

    function clearAutoLoop() {
      if (autoTimer) {
        clearTimeout(autoTimer);
        autoTimer = null;
      }
      stopSlideProgress();
    }

    function pauseAutoLoop(ms = AUTO_PAUSE_MS) {
      autoPausedUntil = Date.now() + ms;
      stopSlideProgress();
      clearAutoLoop();
      if (isInView) scheduleAutoLoop();
    }

    function scheduleAutoLoop() {
      clearAutoLoop();
      if (!isInView) return;

      const hold = getAutoHoldMs();

      function runStep() {
        if (!isInView) return;
        if (Date.now() < autoPausedUntil) {
          autoTimer = setTimeout(runStep, Math.min(500, autoPausedUntil - Date.now()));
          return;
        }
        if (isAnimating) {
          autoTimer = setTimeout(runStep, 150);
          return;
        }
        advanceFromTap();
        autoTimer = setTimeout(runStep, TAP_MS + hold);
      }

      const pauseWait = autoPausedUntil - Date.now();
      autoTimer = setTimeout(runStep, pauseWait > 0 ? pauseWait : hold);
    }

    function startAutoLoop() {
      isInView = true;
      scheduleAutoLoop();
      startSlideProgress();
    }

    function stopAutoLoop() {
      isInView = false;
      clearAutoLoop();
    }

    if (tapCard) {
      tapCard.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        pauseAutoLoop();
        advanceFromTap();
      });
    }

    section.querySelectorAll('.hiw-sc-call__btn, .hiw-sc-google__btn, .hiw-sc-web__cta').forEach((btn) => {
      btn.addEventListener('click', (e) => e.stopPropagation());
    });

    flowSteps.forEach((step) => {
      step.addEventListener('click', (e) => {
        e.stopPropagation();
        if (isAnimating) return;
        pauseAutoLoop();
        if (step.dataset.action === 'tap') {
          advanceFromTap();
          return;
        }
        const key = step.dataset.screen;
        if (key) setScreen(key, key !== 'idle');
      });
    });

    section.querySelector('.hiw__phone')?.addEventListener('click', (e) => {
      if (e.target.closest('button') && !e.target.closest('#hiw-tap-card')) return;
      if (isAnimating) return;
      pauseAutoLoop();
      advanceFromTap();
    });

    setScreen('idle', false);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            scene.classList.add('hiw__scene--visible');
            if (current === 0) updateFlowUI('idle');
            startAutoLoop();
          } else {
            scene.classList.remove('hiw__scene--visible');
            stopAutoLoop();
          }
        });
      },
      { threshold: 0.25 }
    );
    observer.observe(section);

    document.addEventListener('visibilitychange', () => {
      if (document.hidden) clearAutoLoop();
      else if (isInView) scheduleAutoLoop();
    });

    section.addEventListener('mouseenter', pauseAutoLoop);
    section.addEventListener('focusin', pauseAutoLoop);
  }

  document.addEventListener('DOMContentLoaded', initHowItWorks);
})();
