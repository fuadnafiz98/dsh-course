/* ============================================================
   DeepSeek Harness course — shared behaviors
   - a.code[data-src][data-lines]  -> GitHub blob link @ pinned commit
   - .quiz                          -> clickable retrieval-practice card
   - svg [data-dg-title]            -> click opens the detail panel
   - button.mark-done[data-lesson]  -> progress in localStorage
   - input.filterbox                -> live-filters [data-filt] items
   ============================================================ */
(function () {
  'use strict';

  var COMMIT = '639ed015397290b3745d163aafe02ffee4aa3f84';
  var REPO = 'https://github.com/deepseek-ai/deepseek-harness';
  var TREE = REPO + '/tree/' + COMMIT + '/';
  var BLOB = REPO + '/blob/' + COMMIT + '/';

  window.DSH = { commit: COMMIT, repo: REPO, blob: BLOB, tree: TREE };

  function srcHref(path, lines) {
    var isDir = /\/$/.test(path) || !/\.[a-zA-Z0-9]+$/.test(path);
    var href = (isDir ? TREE : BLOB) + path.replace(/\/$/, '');
    if (!isDir && lines) {
      var m = String(lines).match(/^(\d+)\s*[-–]\s*(\d+)$/);
      href += m ? '#L' + m[1] + '-L' + m[2] : '#L' + String(lines).replace(/\D/g, '');
    }
    return href;
  }
  window.DSH.srcHref = srcHref;

  /* ---------- code links ---------- */
  document.querySelectorAll('a.code[data-src]').forEach(function (a) {
    var path = a.getAttribute('data-src');
    var lines = a.getAttribute('data-lines');
    a.href = srcHref(path, lines);
    a.target = '_blank';
    a.rel = 'noopener';
    a.title = path + (lines ? ' (lines ' + lines + ')' : '') + ' @ ' + COMMIT.slice(0, 7);
    if (!a.textContent.trim()) {
      var short = path.split('/').pop() || path.replace(/\/$/, '').split('/').pop();
      a.innerHTML = short + (lines ? ' <span class="lines">:' + lines + '</span>' : '');
    }
  });
  /* bare [data-src] spans render as code chips without navigation */
  document.querySelectorAll('code[data-src]').forEach(function (c) {
    c.title = c.getAttribute('data-src');
  });

  /* ---------- quizzes ---------- */
  document.querySelectorAll('.quiz').forEach(function (quiz, qi) {
    var key = 'dsh-quiz:' + location.pathname + ':' + qi;
    var buttons = quiz.querySelectorAll('.opts button');
    var answered = false;
    function mark(btn) {
      if (answered) return;
      answered = true;
      quiz.classList.add('answered');
      buttons.forEach(function (b) {
        b.disabled = true;
        if (b.hasAttribute('data-ok')) b.classList.add('correct');
      });
      if (!btn.hasAttribute('data-ok')) btn.classList.add('wrong');
      try { localStorage.setItem(key, btn.hasAttribute('data-ok') ? 'ok' : 'miss'); } catch (e) {}
    }
    buttons.forEach(function (b) { b.addEventListener('click', function () { mark(b); }); });
    try {
      if (localStorage.getItem(key)) {
        quiz.classList.add('answered');
        buttons.forEach(function (b) { b.disabled = true; if (b.hasAttribute('data-ok')) b.classList.add('correct'); });
      }
    } catch (e) {}
  });

  /* ---------- diagram detail panel ---------- */
  var backdrop = document.createElement('div');
  backdrop.className = 'dg-panel-backdrop';
  var panel = document.createElement('aside');
  panel.className = 'dg-panel';
  panel.innerHTML =
    '<header><h3 id="dg-panel-title"></h3><button aria-label="Close"><i class="ph ph-x"></i></button></header>' +
    '<div class="body"><div id="dg-panel-body"></div><div class="srcs"></div></div>';
  document.addEventListener('DOMContentLoaded', function () {
    document.body.appendChild(backdrop);
    document.body.appendChild(panel);
  });
  var activeNode = null;
  function closePanel() {
    panel.classList.remove('open');
    backdrop.classList.remove('open');
    if (activeNode) { activeNode.classList.remove('dg-active'); activeNode = null; }
  }
  function openPanel(node) {
    if (activeNode) activeNode.classList.remove('dg-active');
    activeNode = node;
    node.classList.add('dg-active');
    panel.querySelector('#dg-panel-title').textContent = node.getAttribute('data-dg-title') || '';
    var bodyHost = panel.querySelector('#dg-panel-body');
    var bodyRef = node.getAttribute('data-dg-body') || '';
    if (bodyRef.charAt(0) === '#') {
      var tpl = document.getElementById(bodyRef.slice(1));
      bodyHost.innerHTML = tpl ? tpl.innerHTML : '<p class="muted">(no detail)</p>';
    } else {
      bodyHost.innerHTML = bodyRef;
    }
    var srcs = panel.querySelector('.srcs');
    srcs.innerHTML = '';
    var spec = node.getAttribute('data-dg-src');
    if (spec) {
      spec.split(';;').forEach(function (entry) {
        var parts = entry.split('|');
        var loc = parts[0];
        var label = parts[1];
        var m = loc.match(/^(.+?)(?::(\d+(?:-\d+)?))?$/);
        var a = document.createElement('a');
        a.className = 'code';
        a.href = srcHref(m[1], m[2]);
        a.target = '_blank';
        a.rel = 'noopener';
        a.innerHTML = label || (m[1] + (m[2] ? ' <span class="lines">:' + m[2] + '</span>' : ''));
        srcs.appendChild(a);
      });
    }
    /* re-wire any a.code inside the injected body */
    bodyHost.querySelectorAll('a.code[data-src]').forEach(function (a) {
      a.href = srcHref(a.getAttribute('data-src'), a.getAttribute('data-lines'));
      a.target = '_blank'; a.rel = 'noopener';
    });
    panel.classList.add('open');
    backdrop.classList.add('open');
  }
  document.addEventListener('click', function (ev) {
    var node = ev.target.closest && ev.target.closest('[data-dg-title]');
    if (node) { ev.preventDefault(); openPanel(node); return; }
    if (ev.target === backdrop || ev.target.closest('.dg-panel header button')) closePanel();
  });
  document.addEventListener('keydown', function (ev) { if (ev.key === 'Escape') closePanel(); });

  /* ---------- progress tracking ---------- */
  var doneKey = function (n) { return 'dsh-done:' + n; };
  document.querySelectorAll('button.mark-done').forEach(function (btn) {
    var n = btn.getAttribute('data-lesson');
    function paint() {
      var done = false;
      try { done = !!localStorage.getItem(doneKey(n)); } catch (e) {}
      btn.classList.toggle('done', done);
      btn.innerHTML = done ? '<i class="ph ph-check"></i> Completed — click to undo' : 'Mark this lesson complete';
    }
    btn.addEventListener('click', function () {
      try {
        if (localStorage.getItem(doneKey(n))) localStorage.removeItem(doneKey(n));
        else localStorage.setItem(doneKey(n), '1');
      } catch (e) {}
      paint();
    });
    paint();
  });
  /* hub progress + card checkmarks */
  var progressRoot = document.querySelector('[data-progress]');
  if (progressRoot) {
    var total = parseInt(progressRoot.getAttribute('data-progress'), 10);
    var done = 0;
    for (var i = 1; i <= total; i++) {
      var isDone = false;
      try { isDone = !!localStorage.getItem(doneKey(i)); } catch (e) {}
      if (isDone) done++;
      document.querySelectorAll('.card[data-lesson="' + i + '"]').forEach(function (c) {
        c.classList.toggle('done', isDone);
      });
    }
    var bar = progressRoot.querySelector('.bar i');
    var label = progressRoot.querySelector('.count');
    if (bar) bar.style.width = (total ? (done / total) * 100 : 0) + '%';
    if (label) label.textContent = done + ' / ' + total + ' lessons complete';
  }

  /* ---------- reference filtering ---------- */
  document.querySelectorAll('input.filterbox').forEach(function (input) {
    var sel = input.getAttribute('data-target') || '[data-filt]';
    input.addEventListener('input', function () {
      var q = input.value.trim().toLowerCase();
      document.querySelectorAll(sel).forEach(function (el) {
        var hay = (el.getAttribute('data-filt') || el.textContent).toLowerCase();
        el.style.display = hay.indexOf(q) === -1 ? 'none' : '';
      });
    });
  });

  /* ---------- prev/next keyboard nav ---------- */
  document.addEventListener('keydown', function (ev) {
    if (ev.target && /^(input|textarea|select)$/i.test(ev.target.tagName)) return;
    var link = null;
    if (ev.key === 'ArrowRight') link = document.querySelector('.lesson-nav a[rel="next"]');
    if (ev.key === 'ArrowLeft') link = document.querySelector('.lesson-nav a[rel="prev"]');
    if (link) location.href = link.href;
  });
})();
