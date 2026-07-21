/**
 * TapRate — Interactive Phone Mockup (Tap-to-Advance)
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
      cta: 'Tap to start over →'
    }
  };

  const ORDER = ['idle', 'instagram', 'website', 'call', 'google'];
  const TAP_MS = 900;

  let current = 0;
  let isAnimating = false;

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
        if (fill) fill.style.width = i < stepIdx ? '100%' : i === stepIdx ? '100%' : '0%';
        if (i < stepIdx) dot.classList.add('hiw__progress-dot--done');
        if (i === stepIdx) dot.classList.add('hiw__progress-dot--active');
      });

      scene.classList.toggle('hiw__scene--idle', screenKey === 'idle');
    }

    function playTapAnimation(cb) {
      if (isAnimating) return;
      isAnimating = true;
      scene.classList.remove('hiw__scene--tapping');
      void scene.offsetWidth;
      scene.classList.add('hiw__scene--tapping');
      setTimeout(() => {
        scene.classList.remove('hiw__scene--tapping');
        isAnimating = false;
        if (cb) cb();
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
            setTimeout(() => s.classList.remove('hiw__screen--exit'), 500);
          }
          s.classList.toggle('hiw__screen--active', active);
        });

        const d = DATA[key];
        if (infoStep) infoStep.textContent = d.step;
        if (infoTitle) infoTitle.textContent = d.title;
        if (infoDesc) infoDesc.textContent = d.desc;
        if (tapCta) tapCta.textContent = d.cta;

        updateFlowUI(key);
      };

      if (animateTap) playTapAnimation(apply);
      else apply();
    }

    function advanceFromTap() {
      const nextIdx = (current + 1) % ORDER.length;
      setScreen(ORDER[nextIdx], true);
    }

    if (tapCard) {
      tapCard.addEventListener('click', (e) => {
        e.preventDefault();
        advanceFromTap();
      });
    }

    flowSteps.forEach((step) => {
      step.addEventListener('click', () => {
        if (step.dataset.action === 'tap') {
          advanceFromTap();
          return;
        }
        const key = step.dataset.screen;
        if (key) setScreen(key, key !== 'idle');
      });
    });

    section.querySelector('.hiw__phone')?.addEventListener('click', () => {
      advanceFromTap();
    });

    setScreen('idle', false);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            scene.classList.add('hiw__scene--visible');
            if (current === 0) updateFlowUI('idle');
          }
        });
      },
      { threshold: 0.2 }
    );
    observer.observe(section);
  }

  document.addEventListener('DOMContentLoaded', initHowItWorks);
})();
