/**
 * TapRate — Lucide-style outline icons
 * Thin stroke SVGs injected via data-icon attribute
 */
(function () {
  const NS = 'http://www.w3.org/2000/svg';

  const ICONS = {
    nfc: [
      ['path', { d: 'M6 8.32a7.43 7.43 0 0 1 0 7.36' }],
      ['path', { d: 'M9.46 6.21a11.76 11.76 0 0 1 0 11.58' }],
      ['path', { d: 'M12.91 4.1a15.91 15.91 0 0 1 .01 15.8' }],
      ['path', { d: 'M16.37 2a20.16 20.16 0 0 1 0 20' }]
    ],
    star: [
      ['polygon', { points: '12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2' }]
    ],
    palette: [
      ['circle', { cx: '13.5', cy: '6.5', r: '.5', 'data-fill': 'true' }],
      ['circle', { cx: '17.5', cy: '10.5', r: '.5', 'data-fill': 'true' }],
      ['circle', { cx: '8.5', cy: '7.5', r: '.5', 'data-fill': 'true' }],
      ['circle', { cx: '6.5', cy: '12.5', r: '.5', 'data-fill': 'true' }],
      ['path', { d: 'M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z' }]
    ],
    'refresh-cw': [
      ['path', { d: 'M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8' }],
      ['path', { d: 'M21 3v5h-5' }],
      ['path', { d: 'M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16' }],
      ['path', { d: 'M8 16H3v5' }]
    ],
    smartphone: [
      ['rect', { width: '14', height: '20', x: '5', y: '2', rx: '2', ry: '2' }],
      ['path', { d: 'M12 18h.01' }]
    ],
    'map-pin': [
      ['path', { d: 'M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z' }],
      ['circle', { cx: '12', cy: '10', r: '3' }]
    ],
    'credit-card': [
      ['rect', { width: '20', height: '14', x: '2', y: '5', rx: '2' }],
      ['line', { x1: '2', x2: '22', y1: '10', y2: '10' }]
    ],
    globe: [
      ['circle', { cx: '12', cy: '12', r: '10' }],
      ['path', { d: 'M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20' }],
      ['path', { d: 'M2 12h20' }]
    ],
    building: [
      ['rect', { width: '16', height: '20', x: '4', y: '2', rx: '2', ry: '2' }],
      ['path', { d: 'M9 22v-4h6v4' }],
      ['path', { d: 'M8 6h.01' }],
      ['path', { d: 'M16 6h.01' }],
      ['path', { d: 'M12 6h.01' }],
      ['path', { d: 'M12 10h.01' }],
      ['path', { d: 'M12 14h.01' }],
      ['path', { d: 'M16 10h.01' }],
      ['path', { d: 'M16 14h.01' }],
      ['path', { d: 'M8 10h.01' }],
      ['path', { d: 'M8 14h.01' }]
    ],
    settings: [
      ['path', { d: 'M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z' }],
      ['circle', { cx: '12', cy: '12', r: '3' }]
    ],
    factory: [
      ['path', { d: 'M2 20a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8l-7 5V8l-7 5V4a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z' }],
      ['path', { d: 'M17 18h1' }],
      ['path', { d: 'M12 18h1' }],
      ['path', { d: 'M7 18h1' }]
    ],
    sparkles: [
      ['path', { d: 'm12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z' }],
      ['path', { d: 'M5 3v4' }],
      ['path', { d: 'M19 17v4' }],
      ['path', { d: 'M3 5h4' }],
      ['path', { d: 'M17 19h4' }]
    ],
    zap: [
      ['path', { d: 'M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z' }]
    ],
    phone: [
      ['path', { d: 'M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z' }]
    ],
    mail: [
      ['rect', { width: '20', height: '16', x: '2', y: '4', rx: '2' }],
      ['path', { d: 'm22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7' }]
    ],
    truck: [
      ['path', { d: 'M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2' }],
      ['path', { d: 'M15 18H9' }],
      ['path', { d: 'M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.624l-3.48-4.35A1 1 0 0 0 17.52 8H14' }],
      ['circle', { cx: '17', cy: '18', r: '2' }],
      ['circle', { cx: '7', cy: '18', r: '2' }]
    ],
    shield: [
      ['path', { d: 'M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z' }]
    ],
    package: [
      ['path', { d: 'm7.5 4.27 9 5.15' }],
      ['path', { d: 'M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z' }],
      ['path', { d: 'm3.3 7 8.7 5 8.7-5' }],
      ['path', { d: 'M12 22V12' }]
    ],
    antenna: [
      ['path', { d: 'M12 20h.01' }],
      ['path', { d: 'M2 8.82a15 15 0 0 1 20 0' }],
      ['path', { d: 'M5 12.859a10 10 0 0 1 14 0' }],
      ['path', { d: 'M8.5 16.429a5 5 0 0 1 7 0' }]
    ]
  };

  function createSvg(name, label) {
    const shapes = ICONS[name];
    if (!shapes) return null;

    const svg = document.createElementNS(NS, 'svg');
    svg.setAttribute('viewBox', '0 0 24 24');
    svg.setAttribute('aria-hidden', label ? 'false' : 'true');
    if (label) {
      svg.setAttribute('role', 'img');
      const title = document.createElementNS(NS, 'title');
      title.textContent = label;
      svg.appendChild(title);
    }

    shapes.forEach(([tag, attrs]) => {
      const el = document.createElementNS(NS, tag);
      Object.entries(attrs).forEach(([k, v]) => el.setAttribute(k, v));
      svg.appendChild(el);
    });

    return svg;
  }

  function renderIcon(el) {
    const name = el.dataset.icon;
    if (!name || el.dataset.iconRendered) return;
    const label = el.dataset.iconLabel || '';
    const svg = createSvg(name, label);
    if (!svg) return;
    el.textContent = '';
    el.classList.add('icon', 'icon--md');
    el.appendChild(svg);
    el.dataset.iconRendered = 'true';
  }

  function initIcons(root) {
    (root || document).querySelectorAll('[data-icon]').forEach(renderIcon);
  }

  window.TapRateIcons = { init: initIcons, create: createSvg };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => initIcons());
  } else {
    initIcons();
  }
})();
