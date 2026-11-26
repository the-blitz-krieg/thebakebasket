/* The Bake Basket: small progressive enhancements. No third-party code, no innerHTML from user data. */
(function () {
  'use strict';

  // Load the interactive Google Map only when the visitor asks for it (faster pages, no tracking until then).
  var btn = document.querySelector('[data-load-map]');
  if (btn) {
    btn.addEventListener('click', function () {
      var box = document.getElementById(btn.getAttribute('data-load-map'));
      if (!box) return;
      var f = document.createElement('iframe');
      f.src = btn.getAttribute('data-src');
      f.title = 'Map showing The Bake Basket in Madhavaram, Chennai';
      f.loading = 'lazy';
      f.referrerPolicy = 'no-referrer-when-downgrade';
      f.setAttribute('allowfullscreen', '');
      while (box.firstChild) box.removeChild(box.firstChild);
      box.appendChild(f);
      btn.hidden = true;
    });
  }

  // Close the mobile menu after a link is chosen.
  var mnav = document.querySelector('.mnav');
  if (mnav) {
    mnav.addEventListener('click', function (e) {
      if (e.target.closest('a')) mnav.removeAttribute('open');
    });
  }

  // Send a GTM event for every WhatsApp, call and email click.
  window.dataLayer = window.dataLayer || [];
  document.addEventListener('click', function (e) {
    var a = e.target.closest('a[href]');
    if (!a) return;
    var h = a.getAttribute('href');
    var ev = h.indexOf('wa.me') > -1 ? 'whatsapp_click' : h.indexOf('tel:') === 0 ? 'call_click' : h.indexOf('mailto:') === 0 ? 'email_click' : null;
    if (ev) window.dataLayer.push({ event: ev, link_location: a.getAttribute('data-loc') || 'page', page_path: location.pathname });
  });
})();
