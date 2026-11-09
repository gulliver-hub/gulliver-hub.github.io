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

// Header: add the service page links under "サービス" on every page.
(function () {
  var link = document.querySelector('.menu a[href="/#service"]');
  if (!link) return;
  var items = [
    ['/discord-server-build/', '構築代行'],
    ['/discord-community-management/', '運営代行'],
    ['/discord-server-maintenance/', 'サーバー保守']
  ];
  var wrap = document.createElement('div');
  wrap.className = 'menu-dd';
  link.parentNode.insertBefore(wrap, link);
  wrap.appendChild(link);
  var sub = document.createElement('div');
  sub.className = 'menu-sub';
  items.forEach(function (it) {
    var a = document.createElement('a');
    a.href = it[0];
    a.textContent = it[1];
    if (location.pathname === it[0]) a.setAttribute('aria-current', 'page');
    sub.appendChild(a);
  });
  wrap.appendChild(sub);
})();

// Footer: link the commerce disclosure page on every page that has a footer.
(function () {
  var wrap = document.querySelector('footer .wrap');
  if (!wrap || wrap.querySelector('a[href*="tokushoho"]')) return;
  var a = document.createElement('a');
  a.href = '/tokushoho/';
  a.textContent = '特定商取引法に基づく表記';
  wrap.insertBefore(document.createTextNode(' ／ '), wrap.firstChild);
  wrap.insertBefore(a, wrap.firstChild);
})();

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
