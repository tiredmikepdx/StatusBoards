(function () {
  var params = new URLSearchParams(window.location.search);
  if (params.get('bypassMaintenance') === '1') return;

  var blocked = function () {
    return Promise.reject(new Error('DOWN FOR MAINTENANCE'));
  };

  window.fetch = blocked;
  window.XMLHttpRequest = function () {
    throw new Error('DOWN FOR MAINTENANCE');
  };

  document.documentElement.setAttribute('lang', 'en');
  document.documentElement.classList.add('maintenance-mode');
  document.title = 'DOWN FOR MAINTENANCE';

  var style = document.createElement('style');
  style.textContent = `
    :root { color-scheme: dark; }
    * { box-sizing: border-box; }
    body {
      margin: 0;
      min-height: 100vh;
      display: grid;
      place-items: center;
      font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
      background: radial-gradient(circle at top, #1f2937, #020617 45%);
      color: #f9fafb;
      padding: 1.5rem;
    }
    .maintenance-mode body > :not(.maintenance-screen) {
      display: none !important;
    }
    main {
      width: min(760px, 100%);
      border: 1px solid #334155;
      border-radius: 18px;
      background: rgba(2, 6, 23, 0.95);
      padding: clamp(1.25rem, 3vw, 2rem);
      box-shadow: 0 20px 40px rgba(0,0,0,0.35);
    }
    h1 {
      margin: 0 0 0.5rem;
      font-size: clamp(1.5rem, 4vw, 2.2rem);
      letter-spacing: 0.02em;
    }
    p {
      margin: 0.4rem 0;
      line-height: 1.55;
      color: #cbd5e1;
      font-size: clamp(1rem, 2.6vw, 1.1rem);
    }
  `;

  var message = document.createElement('main');
  message.className = 'maintenance-screen';
  message.innerHTML = `
    <h1>DOWN FOR MAINTENANCE</h1>
    <p>The published status-board pages are currently unavailable while maintenance is in progress.</p>
    <p>Source code and configuration remain intact.</p>
  `;

  document.head.appendChild(style);

  function renderMaintenance() {
    document.body.innerHTML = '';
    document.body.appendChild(message);
  }

  if (document.body) {
    renderMaintenance();
  } else {
    document.addEventListener('DOMContentLoaded', renderMaintenance, { once: true });
  }
})();
