function getBasePath() {
  const script = document.querySelector('script[src*="components.js"]');
  if (script) return script.getAttribute('src').replace(/js\/components\.js.*$/, '');
  return '';
}

function renderLogo(base, footer = false) {
  const cls = footer ? 'logo logo--footer' : 'logo';
  return `<a href="${base}index.html" class="${cls}" aria-label="TapRate Business Cards & Review Stands — Home">
    <img src="${base}logo.png" alt="TapRate Business Cards and Review Stands" class="logo__img" width="180" height="52"
      onerror="this.style.display='none';this.nextElementSibling.style.display='flex'">
    <span class="logo__text" style="display:none;font-family:var(--font-display);font-weight:800;font-size:1.375rem;color:${footer ? '#fff' : 'var(--color-primary)'}">Tap<span style="color:var(--color-gold)">Rate</span></span>
  </a>`;
}

function renderHeader(activePage = '') {
  const base = getBasePath();
  const a = (p) => activePage === p ? ' nav__link--active' : '';
  return `<header class="header" role="banner">
    <div class="container header__inner">
      ${renderLogo(base)}
      <nav class="nav" role="navigation" aria-label="Main navigation">
        <ul class="nav__list">
          <li class="nav__item"><a href="${base}index.html" class="nav__link${a('')}">Home</a></li>
          <li class="nav__item"><a href="${base}services.html" class="nav__link${a('services')}">Services</a>
            <div class="nav__dropdown">
              <a href="${base}services/nfc-business-cards.html">NFC Business Cards</a>
              <a href="${base}services/google-review-stands.html">Google Review Stands</a>
              <a href="${base}services/digital-networking.html">Digital Networking</a>
              <a href="${base}services/corporate-branding.html">Corporate Branding</a>
              <a href="${base}services/custom-nfc-manufacturing.html">Custom NFC Manufacturing</a>
            </div>
          </li>
          <li class="nav__item"><a href="${base}products.html" class="nav__link${a('products')}">Products</a>
            <div class="nav__dropdown">
              <a href="${base}products/nfc-smart-business-card.html">NFC Smart Business Card</a>
              <a href="${base}products/metal-nfc-business-card.html">Metal NFC Card</a>
              <a href="${base}products/google-review-nfc-standee.html">Google Review Standee</a>
              <a href="${base}products/google-review-nfc-card.html">Google Review Card</a>
              <a href="${base}products/corporate-team-bundle.html">Corporate Team Bundle</a>
            </div>
          </li>
          <li class="nav__item"><a href="${base}pricing.html" class="nav__link${a('pricing')}">Pricing</a></li>
          <li class="nav__item"><a href="${base}industries.html" class="nav__link${a('industries')}">Industries</a></li>
          <li class="nav__item"><a href="${base}about.html" class="nav__link${a('about')}">About</a></li>
          <li class="nav__item"><a href="${base}contact.html" class="nav__link${a('contact')}">Contact</a></li>
        </ul>
        <div class="header__actions">
          <a href="tel:+918401625979" class="header__phone">📞 +91 8401625979</a>
          <a href="${base}enquiry.html" class="btn btn--primary btn--sm">Design My Card →</a>
        </div>
        <button class="menu-toggle" aria-label="Toggle menu"><span></span><span></span><span></span></button>
      </nav>
    </div>
  </header>`;
}

function renderFooter() {
  const base = getBasePath();
  return `<footer class="footer" role="contentinfo">
    <div class="container">
      <div class="footer__grid">
        <div class="footer__brand">
          ${renderLogo(base, true)}
          <p>Ahmedabad's premier manufacturer of NFC business cards, Google review standees, and digital networking solutions. Helping 2,500+ businesses across Gujarat connect smarter.</p>
          <div class="footer__social">
            <a href="https://facebook.com/taprate" aria-label="Facebook" target="_blank" rel="noopener">f</a>
            <a href="https://instagram.com/taprate" aria-label="Instagram" target="_blank" rel="noopener">📷</a>
            <a href="https://linkedin.com/company/taprate" aria-label="LinkedIn" target="_blank" rel="noopener">in</a>
            <a href="https://youtube.com/@taprate" aria-label="YouTube" target="_blank" rel="noopener">▶</a>
          </div>
        </div>
        <div><h4>Products</h4><ul class="footer__links">
          <li><a href="${base}products/nfc-smart-business-card.html">NFC Business Cards</a></li>
          <li><a href="${base}products/metal-nfc-business-card.html">Metal NFC Cards</a></li>
          <li><a href="${base}products/google-review-nfc-standee.html">Review Standees</a></li>
          <li><a href="${base}products/google-review-nfc-card.html">Review Cards</a></li>
          <li><a href="${base}products/corporate-team-bundle.html">Corporate Bundles</a></li>
        </ul></div>
        <div><h4>Services</h4><ul class="footer__links">
          <li><a href="${base}services/nfc-business-cards.html">NFC Card Printing</a></li>
          <li><a href="${base}services/google-review-stands.html">Review Stand Design</a></li>
          <li><a href="${base}services/digital-networking.html">Digital Networking</a></li>
          <li><a href="${base}services/corporate-branding.html">Corporate Branding</a></li>
        </ul></div>
        <div><h4>Company</h4><ul class="footer__links">
          <li><a href="${base}about.html">About Us</a></li>
          <li><a href="${base}portfolio.html">Portfolio</a></li>
          <li><a href="${base}testimonials.html">Testimonials</a></li>
          <li><a href="${base}case-studies.html">Case Studies</a></li>
          <li><a href="${base}blog.html">Blog</a></li>
          <li><a href="${base}faq.html">FAQs</a></li>
          <li><a href="${base}careers.html">Careers</a></li>
        </ul></div>
        <div><h4>Contact</h4><ul class="footer__contact">
          <li><span>📍</span> GARDEN RESIDENCY 1, Gala Gymkhana Rd, Chittavan, South Bopal, Bopal, Ahmedabad, Gujarat 380058</li>
          <li><span>📞</span> <a href="tel:+918401625979">+91 8401625979</a></li>
          <li><span>✉️</span> <a href="mailto:hello@taprate.in">hello@taprate.in</a></li>
          <li><span>🕐</span> Mon–Sat: 10 AM – 7 PM</li>
        </ul></div>
      </div>
      <div class="footer__bottom">
        <p>© 2026 TapRate Business Cards & Review Stands. All rights reserved.</p>
        <div><a href="${base}privacy-policy.html">Privacy Policy</a> · <a href="${base}terms.html">Terms</a> · <a href="${base}locations/ahmedabad.html">Ahmedabad</a></div>
      </div>
    </div>
  </footer>
  <nav class="float-dock" aria-label="Quick contact">
    <a href="${base}enquiry.html" class="float-dock__btn float-dock__btn--quote">
      <span class="float-dock__icon" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" x2="8" y1="13" y2="13"/><line x1="16" x2="8" y1="17" y2="17"/></svg></span>
      <span class="float-dock__label">Design</span>
    </a>
    <a href="tel:+918401625979" class="float-dock__btn float-dock__btn--call">
      <span class="float-dock__icon" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg></span>
      <span class="float-dock__label">Call</span>
    </a>
    <a href="https://wa.me/918401625979?text=Hi%20TapRate%2C%20I%27m%20interested%20in%20NFC%20products." class="float-dock__btn float-dock__btn--wa" target="_blank" rel="noopener">
      <span class="float-dock__icon" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"/></svg></span>
      <span class="float-dock__label">WhatsApp</span>
    </a>
  </nav>`;
}

document.addEventListener('DOMContentLoaded', () => {
  const h = document.getElementById('site-header');
  const f = document.getElementById('site-footer');
  const p = document.body.dataset.page || '';
  if (h) h.innerHTML = renderHeader(p);
  if (f) f.innerHTML = renderFooter();

  const base = getBasePath();
  const motion = document.createElement('script');
  motion.src = base + 'js/micro-interactions.js';
  document.body.appendChild(motion);

  const icons = document.createElement('script');
  icons.src = base + 'js/icons.js';
  document.body.appendChild(icons);

  const testimonials = document.createElement('script');
  testimonials.src = base + 'js/testimonials.js';
  document.body.appendChild(testimonials);

  const gallery = document.createElement('script');
  gallery.src = base + 'js/gallery.js';
  document.body.appendChild(gallery);
});
