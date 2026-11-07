// Count clicks on contact links (mail, X DM) and the Apps referral link in Google Analytics.
document.addEventListener('click', function (e) {
  var a = e.target.closest && e.target.closest('a[href]');
  if (!a || typeof gtag !== 'function') return;
  var href = a.getAttribute('href') || '';
  var name = null, method = null;
  if (href.indexOf('mailto:') === 0) { name = 'contact_click'; method = 'email'; }
  else if (/^https:\/\/(x|twitter)\.com\/gulliver_hub/.test(href)) { name = 'contact_click'; method = 'x'; }
  else if (href.indexOf('page.theapps.jp/signup') !== -1) { name = 'apps_referral_click'; method = 'apps'; }
  if (!name) return;
  gtag('event', name, {
    method: method,
    link_text: (a.textContent || '').trim().slice(0, 60),
    page_path: location.pathname
  });
});

// Mobile menu: open/close the nav with the hamburger button.
(function () {
  var btn = document.querySelector('.menu-toggle');
  if (!btn) return;
  var bar = btn.closest('.topbar');
  function set(open) {
    bar.classList.toggle('open', open);
    btn.setAttribute('aria-expanded', open ? 'true' : 'false');
    btn.setAttribute('aria-label', open ? 'メニューを閉じる' : 'メニューを開く');
  }
  btn.addEventListener('click', function () { set(!bar.classList.contains('open')); });
  bar.querySelectorAll('.menu a').forEach(function (a) { a.addEventListener('click', function () { set(false); }); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') set(false); });
})();
