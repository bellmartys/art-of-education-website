/* Bell Martys — small enhancements: mobile menu, artist photos, gallery lightbox. */
(function () {
  var doc = document.documentElement;
  doc.classList.add('js');

  // Header shadow once the page scrolls
  var header = document.querySelector('.site-header');
  function onScroll() { if (header) header.classList.toggle('is-stuck', window.scrollY > 4); }
  window.addEventListener('scroll', onScroll, { passive: true }); onScroll();

  // Mobile menu
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.querySelector('.site-nav');
  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      var open = nav.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && nav.classList.contains('is-open')) { nav.classList.remove('is-open'); toggle.setAttribute('aria-expanded', 'false'); toggle.focus(); }
    });
  }

  // Artist portraits: each tile shows initials until a photo named after the
  // artist (e.g. images/artists/frida-kahlo.jpg) is placed in the folder.
  var exts = ['jpg', 'jpeg', 'png', 'webp', 'avif'];
  document.querySelectorAll('[data-artist]').forEach(function (tile) {
    var i = 0;
    (function tryNext() {
      if (i >= exts.length) return;
      var img = new Image();
      img.alt = '';
      img.onload = function () { tile.appendChild(img); };
      img.onerror = function () { i++; tryNext(); };
      img.src = tile.getAttribute('data-base') + tile.getAttribute('data-artist') + '.' + exts[i];
    })();
  });

  // Tabs (Philosophy page): one section shows at a time
  document.querySelectorAll('[data-tabs]').forEach(function (box) {
    var tabs = Array.prototype.slice.call(box.querySelectorAll('[role="tab"]'));
    function select(t, focus) {
      tabs.forEach(function (b) {
        var on = b === t;
        b.setAttribute('aria-selected', on ? 'true' : 'false');
        b.tabIndex = on ? 0 : -1;
        document.getElementById(b.getAttribute('aria-controls')).hidden = !on;
      });
      if (focus) t.focus();
    }
    tabs.forEach(function (b, i) {
      b.addEventListener('click', function () { select(b); });
      b.addEventListener('keydown', function (e) {
        var n = e.key === 'ArrowRight' ? i + 1 : e.key === 'ArrowLeft' ? i - 1 : null;
        if (n !== null) { e.preventDefault(); select(tabs[(n + tabs.length) % tabs.length], true); }
      });
    });
    select(tabs[0]);
  });

  // Gallery lightbox
  var links = Array.prototype.slice.call(document.querySelectorAll('.gallery a'));
  var box = document.querySelector('.lightbox');
  if (links.length && box && box.showModal) {
    var img = box.querySelector('.lb-stage img'), count = box.querySelector('.lb-count'), at = 0;
    function show(n) {
      at = (n + links.length) % links.length;
      img.src = links[at].href;
      img.alt = links[at].querySelector('img').alt;
      count.textContent = (at + 1) + ' / ' + links.length;
      var pre = new Image(); pre.src = links[(at + 1) % links.length].href;
    }
    links.forEach(function (a, n) {
      a.addEventListener('click', function (e) { e.preventDefault(); show(n); box.showModal(); });
    });
    box.querySelector('.lb-close').addEventListener('click', function () { box.close(); });
    box.querySelector('.lb-prev').addEventListener('click', function () { show(at - 1); });
    box.querySelector('.lb-next').addEventListener('click', function () { show(at + 1); });
    box.addEventListener('click', function (e) { if (e.target === box || e.target.classList.contains('lb-stage')) box.close(); });
    box.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowLeft') show(at - 1);
      if (e.key === 'ArrowRight') show(at + 1);
    });
    box.addEventListener('close', function () { img.removeAttribute('src'); if (links[at]) links[at].focus(); });
    var x0 = null;
    box.addEventListener('touchstart', function (e) { x0 = e.touches[0].clientX; }, { passive: true });
    box.addEventListener('touchend', function (e) {
      if (x0 === null) return;
      var dx = e.changedTouches[0].clientX - x0; x0 = null;
      if (Math.abs(dx) > 45) show(at + (dx < 0 ? 1 : -1));
    });
  }
})();
