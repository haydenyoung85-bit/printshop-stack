(function () {
  var d = document;
  // Scroll reveal (skipped entirely when reduced motion is requested).
  var reduce = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
  var els = d.querySelectorAll('.reveal');
  if (!reduce && 'IntersectionObserver' in window) {
    d.documentElement.classList.add('js-reveal');
    var io = new IntersectionObserver(function (es) { es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }); }, { rootMargin: '0px 0px -40px 0px' });
    els.forEach(function (el) { io.observe(el); });
  }
  var form = d.querySelector('[data-filters]'), grid = d.querySelector('[data-grid]');
  if (!form || !grid) return;
  var cards = [].slice.call(grid.querySelectorAll('.card'));
  var count = d.querySelector('[data-count]'), empty = d.querySelector('[data-empty]');
  function radio(n) { var el = form.querySelector('[name="' + n + '"]:checked'); return el ? el.value : ''; }
  function apply() {
    var q = (form.q.value || '').trim().toLowerCase(), cat = radio('cat'), t = radio('tier'), n = 0;
    var terms = q ? q.split(/\s+/) : [];
    cards.forEach(function (c) {
      var ok = (!cat || c.dataset.cat === cat) && (!t || c.dataset.tier === t) && terms.every(function (w) { return c.dataset.hay.indexOf(w) > -1; });
      c.hidden = !ok; if (ok) { n++; c.classList.add('in'); }
    });
    if (count) count.textContent = n + ' of ' + cards.length + ' tools';
    if (empty) empty.hidden = n !== 0;
  }
  form.addEventListener('input', apply);
  form.addEventListener('change', apply);
  form.addEventListener('submit', function (e) { e.preventDefault(); var t = d.querySelector('[data-results]'); if (t) t.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth' }); });
  d.addEventListener('keydown', function (e) {
    if (e.key === '/' && !/INPUT|TEXTAREA|SELECT/.test((d.activeElement || {}).tagName || '')) { e.preventDefault(); form.q.focus(); }
  });
  var reset = d.querySelector('[data-reset]');
  if (reset) reset.addEventListener('click', function () { form.reset(); apply(); form.q.focus(); });
  apply();
})();
