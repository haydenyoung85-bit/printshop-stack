(function () {
  var form = document.querySelector('[data-filters]');
  var grid = document.querySelector('[data-grid]');
  if (!form || !grid) return;
  var cards = Array.prototype.slice.call(grid.querySelectorAll('.card'));
  var count = document.querySelector('[data-count]');
  var empty = document.querySelector('[data-empty]');
  function val(name) { var el = form.querySelector('[name="' + name + '"]:checked') || form.querySelector('select[name="' + name + '"],input[type=search][name="' + name + '"]'); return el ? el.value : ''; }
  function apply() {
    var q = (form.q.value || '').trim().toLowerCase(), cat = val('cat'), t = form.tier.value, n = 0;
    var terms = q ? q.split(/\s+/) : [];
    cards.forEach(function (c) {
      var ok = (!cat || c.dataset.cat === cat) && (!t || c.dataset.tier === t) && terms.every(function (w) { return c.dataset.hay.indexOf(w) > -1; });
      c.hidden = !ok; if (ok) n++;
    });
    count.textContent = 'Showing ' + n + ' of ' + cards.length + ' tools';
    empty.hidden = n !== 0;
  }
  form.addEventListener('input', apply);
  form.addEventListener('change', apply);
  form.addEventListener('submit', function (e) { e.preventDefault(); });
  apply();
})();
