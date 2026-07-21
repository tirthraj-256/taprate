document.addEventListener('DOMContentLoaded', () => {
  initHeader();
  initMobileMenu();
  initFAQ();
  initTestimonialSlider();
  initCounters();
  initForms();
});

function initHeader() {
  const h = document.querySelector('.header');
  if (!h) return;
  window.addEventListener('scroll', () => h.classList.toggle('header--scrolled', window.scrollY > 20), { passive: true });
}

function initMobileMenu() {
  const t = document.querySelector('.menu-toggle');
  const n = document.querySelector('.nav');
  if (!t || !n) return;
  t.addEventListener('click', () => n.classList.toggle('nav--open'));
  n.querySelectorAll('.nav__link').forEach((l) => l.addEventListener('click', () => n.classList.remove('nav--open')));
}

function initFAQ() {
  document.querySelectorAll('.faq-question').forEach((b) => {
    b.addEventListener('click', () => {
      const i = b.closest('.faq-item');
      const o = i.classList.contains('faq-item--open');
      document.querySelectorAll('.faq-item').forEach((x) => x.classList.remove('faq-item--open'));
      if (!o) i.classList.add('faq-item--open');
    });
  });
}

function initTestimonialSlider() {
  const t = document.querySelector('.testimonial-track');
  const d = document.querySelectorAll('.testimonial-dot');
  if (!t || !d.length) return;
  let c = 0;
  const go = (i) => {
    c = i;
    t.style.transform = `translateX(-${c * 100}%)`;
    d.forEach((x, j) => x.classList.toggle('testimonial-dot--active', j === c));
  };
  d.forEach((x, i) => x.addEventListener('click', () => go(i)));
  setInterval(() => go((c + 1) % d.length), 6000);
}

function initCounters() {
  document.querySelectorAll('[data-count]').forEach((el) => {
    new IntersectionObserver(
      (e, o) => {
        if (e[0].isIntersecting) {
          const tgt = +el.dataset.count;
          const sfx = el.dataset.suffix || '';
          const dur = 2000;
          const st = performance.now();
          const upd = (now) => {
            const p = Math.min((now - st) / dur, 1);
            el.textContent = Math.floor((1 - Math.pow(1 - p, 3)) * tgt) + sfx;
            if (p < 1) requestAnimationFrame(upd);
          };
          requestAnimationFrame(upd);
          o.unobserve(el);
        }
      },
      { threshold: 0.5 }
    ).observe(el);
  });
}

function getSiteBasePath() {
  const s = document.querySelector('script[src*="components.js"]');
  return s ? s.getAttribute('src').replace(/js\/components\.js.*$/, '') : '';
}

function getFormsConfig() {
  const cfg = window.TAPRATE_FORMS || {};
  return {
    scriptUrl: (cfg.scriptUrl || '').trim(),
    secret: (cfg.secret || '').trim(),
  };
}

function formObjectFromForm(form) {
  const data = Object.fromEntries(new FormData(form).entries());
  delete data._gotcha;
  return data;
}

async function sendFormToGoogleSheets(payload) {
  const { scriptUrl, secret } = getFormsConfig();
  if (!scriptUrl) {
    console.warn(
      'TapRate: Set scriptUrl in js/form-config.js to save enquiries to Google Sheets. See docs/GOOGLE-SHEETS-FORMS.md'
    );
    return { ok: true, skipped: true };
  }

  const body = JSON.stringify({
    ...payload,
    secret: secret || undefined,
  });

  try {
    const res = await fetch(scriptUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body,
    });
    if (res.ok) {
      return res.json();
    }
  } catch (_) {
    /* fall through — no-cors retry */
  }

  await fetch(scriptUrl, {
    method: 'POST',
    mode: 'no-cors',
    headers: { 'Content-Type': 'application/json' },
    body,
  });
  return { ok: true, opaque: true };
}

function setFormStatus(form, message, isError) {
  let el = form.querySelector('.form-status');
  if (!el) {
    el = document.createElement('p');
    el.className = 'form-status';
    el.setAttribute('role', 'alert');
    const submit = form.querySelector('[type=submit]');
    if (submit) submit.before(el);
    else form.appendChild(el);
  }
  el.textContent = message;
  el.classList.toggle('form-status--error', !!isError);
}

function initForms() {
  document.querySelectorAll('form[data-form]').forEach((form) => {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();

      const gotcha = form.querySelector('[name="_gotcha"]');
      if (gotcha && gotcha.value.trim()) {
        location.href = getSiteBasePath() + 'thank-you.html';
        return;
      }

      const submitBtn = form.querySelector('[type=submit]');
      const defaultLabel = submitBtn ? submitBtn.textContent : '';
      if (submitBtn) {
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;
      }
      form.querySelector('.form-status')?.remove();

      const fields = formObjectFromForm(form);
      const payload = {
        formType: form.dataset.formType || 'enquiry',
        pageUrl: window.location.href,
        ...fields,
      };

      try {
        const result = await sendFormToGoogleSheets(payload);
        if (result && result.ok === false) {
          throw new Error(result.error || 'Could not save your enquiry');
        }
        location.href = getSiteBasePath() + 'thank-you.html';
      } catch (err) {
        if (submitBtn) {
          submitBtn.textContent = defaultLabel;
          submitBtn.disabled = false;
        }
        setFormStatus(
          form,
          err.message ||
            'Something went wrong. Please call +91 8401625979 or WhatsApp us and we will help you right away.',
          true
        );
      }
    });
  });
}
