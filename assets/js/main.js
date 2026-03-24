// Always Ahead - Main JS

// --- Dark mode (runs immediately to avoid flash) ---
(function () {
  var key = 'aa-theme';
  var stored = localStorage.getItem(key);
  var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  var theme = stored || (prefersDark ? 'dark' : 'light');
  document.documentElement.setAttribute('data-theme', theme);
})();

document.addEventListener('DOMContentLoaded', function () {
  var key = 'aa-theme';
  var current = document.documentElement.getAttribute('data-theme') || 'dark';
  document.body.setAttribute('data-theme', current);

  var toggleBtn = document.getElementById('theme-toggle');
  var sunIcon = document.getElementById('icon-sun');
  var moonIcon = document.getElementById('icon-moon');

  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    document.body.setAttribute('data-theme', theme);
    localStorage.setItem(key, theme);
    if (sunIcon && moonIcon) {
      sunIcon.style.display = theme === 'dark' ? 'block' : 'none';
      moonIcon.style.display = theme === 'dark' ? 'none' : 'block';
    }
  }

  applyTheme(current);

  if (toggleBtn) {
    toggleBtn.addEventListener('click', function () {
      var curr = document.documentElement.getAttribute('data-theme');
      applyTheme(curr === 'dark' ? 'light' : 'dark');
    });
  }

  // --- Scroll reveal ---
  var reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
    reveals.forEach(function (el) { observer.observe(el); });
  } else {
    // Fallback: show all
    reveals.forEach(function (el) { el.classList.add('visible'); });
  }

  // --- Subscribe forms ---
  document.querySelectorAll('.subscribe-form').forEach(function (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var input = form.querySelector('input[type="email"]');
      var btn = form.querySelector('.btn-subscribe');
      if (!input || !input.value) return;

      // Save original children and state
      var originalChildren = Array.from(btn.childNodes).map(function(n) { return n.cloneNode(true); });
      var originalDisabled = btn.disabled;

      // Build success state using DOM methods
      while (btn.firstChild) { btn.removeChild(btn.firstChild); }
      var checkSvg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
      checkSvg.setAttribute('width', '16');
      checkSvg.setAttribute('height', '16');
      checkSvg.setAttribute('viewBox', '0 0 24 24');
      checkSvg.setAttribute('fill', 'none');
      checkSvg.setAttribute('stroke', 'currentColor');
      checkSvg.setAttribute('stroke-width', '2.5');
      checkSvg.setAttribute('stroke-linecap', 'round');
      checkSvg.setAttribute('stroke-linejoin', 'round');
      var polyline = document.createElementNS('http://www.w3.org/2000/svg', 'polyline');
      polyline.setAttribute('points', '20 6 9 17 4 12');
      checkSvg.appendChild(polyline);
      btn.appendChild(checkSvg);
      btn.appendChild(document.createTextNode(" You're in!"));
      btn.style.background = '#059669';
      btn.disabled = true;
      input.value = '';

      setTimeout(function () {
        while (btn.firstChild) { btn.removeChild(btn.firstChild); }
        originalChildren.forEach(function(n) { btn.appendChild(n); });
        btn.style.background = '';
        btn.disabled = originalDisabled;
      }, 4000);
    });
  });

  // --- Ticker: duplicate items using cloneNode for seamless loop ---
  var track = document.querySelector('.ticker-track');
  if (track) {
    var items = Array.from(track.children);
    items.forEach(function (item) {
      track.appendChild(item.cloneNode(true));
    });
  }
});
