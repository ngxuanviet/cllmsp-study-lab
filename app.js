/* ===== CLLMSP Study Lab — app.js =====
 * Điều hướng, đồng bộ 2 cột, hover từ khoá song ngữ, localStorage, engine MCQ + Free-Text offline,
 * Practice / Mock Exam, Export/Import. (Labs tương tác nằm trong labs.js)
 */
(() => {
  'use strict';
  const C = window.CLLMSP;
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const esc = s => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const pad = n => String(n).padStart(2, '0');
  const shuffle = a => { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.random() * (i + 1) | 0; [a[i], a[j]] = [a[j], a[i]]; } return a; };

  /* ---------- State + localStorage ---------- */
  const KEY = 'cllmsp.progress.v1';
  const defState = () => ({ version: 1, progress: {}, last: { sec: '1.1' }, answers: {}, exams: [], lang: 'both', split: 58 });
  let S = load();
  function load() { try { return Object.assign(defState(), JSON.parse(localStorage.getItem(KEY) || '{}')); } catch (e) { return defState(); } }
  function save() { try { localStorage.setItem(KEY, JSON.stringify(S)); } catch (e) { toast('⚠ Không thể lưu localStorage'); } renderNav(); }
  function toast(msg) { const t = $('#toast'); t.textContent = msg; t.classList.add('show'); clearTimeout(toast._t); toast._t = setTimeout(() => t.classList.remove('show'), 2200); }

  /* ---------- Rendering helpers ---------- */
  // [[term-id|text]] -> <span class="kw" data-term-id> (dùng cho Handbook, cả VI lẫn EN)
  const kwHtml = t => esc(t).replace(/\[\[([\w-]+)\|([^\]]+?)\]\]/g, '<span class="kw" data-term-id="$1">$2</span>');
  // inline markdown nhẹ cho bài giảng: **bold**, `code`, {{ref:id}} / {{ref:id|label}}
  function inline(t) {
    return esc(t)
      .replace(/\{\{ref:([\w-]+)(?:\|([^}]+))?\}\}/g, (_, id, lb) => `<button class="cite" data-ref="${id}">📖 ${lb ? 'Dẫn chứng: ' + lb : citeLabel(id)}</button>`)
      .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
      .replace(/`([^`]+)`/g, '<code>$1</code>');
  }
  function citeLabel(id) {
    const p = C.paras[id]; if (!p) return 'Dẫn chứng: ' + id;
    if (p.sec) return `Dẫn chứng: Mục ${p.mod}.${p.sec} - Trang ${p.page}`;
    const kind = { lo: 'Learning Objectives', ms: 'Module Summary', intro: 'Giới thiệu' }[p.type] || '';
    return `Dẫn chứng: Module ${p.mod} ${kind} - Trang ${p.page}`;
  }
  const secInfo = id => { const n = parseInt(id); const m = C.TOC.find(x => x.n === n); const s = m && m.secs.find(x => x[0] === id); return { n, m, title: s ? s[1] : '' }; };
  const st = id => S.progress[id] || 'todo';
  const stLabel = { todo: 'Chưa học', learning: 'Đang học', done: 'Đã hoàn thành' };

  /* ---------- Navigation ---------- */
  let curSec = null, curMod = null;
  function renderNav() {
    const done = C.ALL_SECS.filter(s => st(s) === 'done').length;
    const pct = Math.round(done / C.ALL_SECS.length * 100);
    $('#overall-bar').style.width = pct + '%'; $('#overall-txt').textContent = `${done}/${C.ALL_SECS.length} · ${pct}%`;
    $('#module-nav').innerHTML = C.TOC.map(m => {
      const d = m.secs.filter(s => st(s[0]) === 'done').length;
      return `<button class="mod-chip ${m.n === curMod ? 'on' : ''} ${C.modules[m.n] ? '' : 'soon'}" data-mod="${m.n}" title="${esc(m.en)}"><b>M${pad(m.n)}</b><small>${d}/${m.secs.length}${C.modules[m.n] ? '' : ' · sắp có'}</small></button>`;
    }).join('');
    const mod = C.TOC.find(m => m.n === curMod);
    $('#sec-tabs').innerHTML = mod ? mod.secs.map(s => `<button class="sec-tab ${s[0] === curSec ? 'on' : ''}" data-sec="${s[0]}" title="${esc(s[1])}"><span class="dot ${st(s[0])}"></span>${s[0]} ${esc(s[1].split(':')[0].slice(0, 28))}</button>`).join('') : '';
    const tab = $('.sec-tab.on'); if (tab) tab.scrollIntoView({ block: 'nearest', inline: 'nearest' });
  }

  function setModule(n) {
    if (curMod === n) return; curMod = n; renderHandbook(n);
  }

  function openSection(sec, o = {}) {
    const { n } = secInfo(sec); curSec = sec; setModule(n);
    if (!o.keepStatus && st(sec) === 'todo') S.progress[sec] = 'learning';
    S.last = { sec }; save(); renderLesson(sec);
    $('#lesson-scroll').scrollTop = 0;
    closeStudy();
    if (o.scrollHb !== false) { const h = document.getElementById(`m${pad(n)}-s${pad(parseInt(sec.split('.')[1]))}-h`); if (h) scrollHb(h, 'start'); }
  }

  /* ---------- Handbook (cột phải) ---------- */
  function renderHandbook(n) {
    const hb = $('#handbook'); const m = C.modules[n]; const toc = C.TOC.find(x => x.n === n);
    if (!m) { hb.innerHTML = `<div class="soon-box"><h3>Module ${pad(n)} — ${esc(toc.en)}</h3><p>Nội dung song ngữ của Module này sẽ được bổ sung ở bước tiếp theo.</p></div>`; return; }
    let h = `<div class="hb-mod">Module ${pad(n)}</div><h2 class="hb-mod-title">${esc(toc.en)}<small style="display:block;font-size:13px;font-weight:400;color:var(--mut)">${esc(toc.vi)}</small></h2>`;
    m.handbook.forEach(it => {
      if (it.kind === 'h') { h += `<h3 class="hb-h" id="${it.id}">${kwHtml(it.en)}<small>${kwHtml(it.vi)}</small></h3>`; return; }
      const tag = { kc: 'KEY CONCEPT', sr: 'SECURITY RELEVANCE', lo: 'LEARNING OBJECTIVE', ms: 'MODULE SUMMARY', intro: 'INTRO' }[it.type];
      h += `<div class="para ${it.type}" id="${it.id}"><span class="tag">${tag ? tag + ' · ' : ''}${it.id} · tr.${it.page}</span><div class="vi">${kwHtml(it.vi)}</div><div class="en">${kwHtml(it.en)}</div></div>`;
    });
    hb.innerHTML = h; hb.scrollTop = 0; applyLang();
  }
  function applyLang() { const hb = $('#handbook'); hb.classList.toggle('only-vi', S.lang === 'vi'); hb.classList.toggle('only-en', S.lang === 'en'); $$('#lang-seg button').forEach(b => b.classList.toggle('on', b.dataset.lang === S.lang)); }
  function scrollHb(el, block = 'center', spot = true) {
    el.scrollIntoView({ behavior: 'smooth', block });
    if (spot) { el.classList.remove('spot'); void el.offsetWidth; el.classList.add('spot'); clearTimeout(el._sp); el._sp = setTimeout(() => el.classList.remove('spot'), 2900); }
  }
  function goRef(id) {
    const p = C.paras[id]; if (!p) { toast('Chưa có đoạn dẫn chứng: ' + id); return; }
    setModule(p.mod);
    requestAnimationFrame(() => { const el = document.getElementById(id); if (el) scrollHb(el, 'center'); });
  }

  /* Hover 2 chiều: cùng data-term-id trong cùng đoạn (VI ↔ EN) */
  function kwToggle(k, on) { const sc = k.closest('.para, .hb-h'); if (!sc) return; $$(`.kw[data-term-id="${CSS.escape(k.dataset.termId)}"]`, sc).forEach(x => x.classList.toggle('kw-active', on)); }
  document.addEventListener('mouseover', e => { const k = e.target.closest && e.target.closest('.kw'); if (k) kwToggle(k, true); });
  document.addEventListener('mouseout', e => { const k = e.target.closest && e.target.closest('.kw'); if (k) kwToggle(k, false); });
  document.addEventListener('click', e => { const k = e.target.closest && e.target.closest('.kw'); if (k) { kwToggle(k, true); setTimeout(() => kwToggle(k, false), 1600); } });

  /* ---------- Lesson (cột trái) ---------- */
  function codeBox(b) { return `<div class="codebox ${b.tone || ''}"><div class="ch"><span>${esc(b.title || '')}</span><span>${esc(b.lang || '')}</span></div><pre>${esc(b.code)}</pre></div>`; }
  function block(b) {
    switch (b.t) {
      case 'p': return `<p class="lp">${inline(b.x)}</p>`;
      case 'h': return `<h4 class="lsec" style="font-size:15px">${inline(b.x)}</h4>`;
      case 'ul': return `<ul class="lul">${b.items.map(i => `<li>${inline(i)}</li>`).join('')}</ul>`;
      case 'note': return `<div class="note ${b.k || ''}"><b class="nt">${{ warn: '⚠ Lưu ý', exam: '🎯 Điểm thi', tip: '💡 Mẹo' }[b.k] || 'ℹ Ghi chú'}</b>${inline(b.x)}</div>`;
      case 'code': return codeBox(b);
      case 'pair': return `<div class="pair">${codeBox(Object.assign({ tone: 'bad' }, b.bad))}${codeBox(Object.assign({ tone: 'good' }, b.good))}</div>`;
    }
    return '';
  }
  function renderLesson(sec) {
    const el = $('#lesson'); const { n, m, title } = secInfo(sec); const mod = C.modules[n];
    const data = mod && mod.sections && mod.sections[sec];
    if (!data) { el.innerHTML = `<div class="lesson-head"><div class="crumb">Module ${pad(n)} · Mục ${sec}</div><h1>${esc(title)}</h1></div><div class="soon-box">Bài giảng chuyên sâu cho mục này sẽ được bổ sung ở bước tiếp theo.</div>`; return; }
    const qs = C.questions.filter(q => q.sec === sec && !q.examOnly);
    el.innerHTML = `
      <div class="lesson-head"><div class="crumb">Module ${pad(n)} · ${esc(m.vi)} · Mục ${sec}</div><h1>${esc(data.title)}</h1><div style="color:var(--mut);font-size:13px">${esc(title)}</div></div>
      <div class="status-row"><span style="font-size:12px;color:var(--mut)">Trạng thái:</span>
        ${['todo', 'learning', 'done'].map(s => `<button class="btn ${st(sec) === s ? 'on' : ''}" data-status="${s}">${stLabel[s]}</button>`).join('')}
        <button class="btn" data-ref="m${pad(n)}-s${pad(parseInt(sec.split('.')[1]))}-h">📖 Đến mục trong Handbook</button></div>
      <h3 class="lsec">1 · Giải thích bản chất &amp; dẫn chứng</h3>${data.concept.map(block).join('')}
      <h3 class="lsec">2 · Ví dụ thực tế &amp; Payload / Code cụ thể</h3>${data.examples.map(block).join('')}
      <h3 class="lsec">3 · Mô phỏng tương tác trực quan</h3><div id="labs-host"></div>
      <div class="quiz"><h3 class="lsec">4 · Câu hỏi kiểm tra tại chỗ</h3><div id="quiz-host"></div></div>
      <div class="row-btn" style="margin-top:28px;justify-content:space-between">${navBtn(sec, -1)}${navBtn(sec, 1)}</div>`;
    const lh = $('#labs-host'); (data.labs || []).forEach(cfg => window.Labs.mount(lh, cfg));
    const qh = $('#quiz-host'); qs.forEach(q => renderQuestion(q, qh, { instant: true }));
    if (!qs.length) qh.innerHTML = '<div class="lp">Chưa có câu hỏi cho mục này.</div>';
  }
  function navBtn(sec, d) {
    const i = C.ALL_SECS.indexOf(sec) + d; const t = C.ALL_SECS[i]; if (!t) return '<span></span>';
    return `<button class="btn ${d > 0 ? 'btn-primary' : ''}" data-open="${t}">${d < 0 ? '← ' + t : t + ' →'} ${esc(secInfo(t).title.split(':')[0].slice(0, 30))}</button>`;
  }

  /* ---------- Quiz engine (MCQ + Free-text offline) ---------- */
  const norm = s => ' ' + String(s).toLowerCase().replace(/[^a-z0-9+]+/g, ' ').trim() + ' ';
  function gradeFree(q, text) {
    const ans = norm(text);
    const rows = q.clusters.map(c => { const hit = c.terms.find(t => ans.includes(norm(t).slice(0, -1))); return { name: c.name, hit: hit || null, terms: c.terms }; });
    const hits = rows.filter(r => r.hit).length; const score = hits / rows.length;
    return { rows, hits, score, correct: score >= 0.7 };
  }
  function record(q, res) {
    const a = S.answers[q.id] || { attempts: 0, right: 0 };
    a.attempts++; if (res.correct) a.right++; a.correct = res.correct; a.score = res.score; a.last = res.choice !== undefined ? res.choice : res.text; a.ts = Date.now();
    a.sec = q.sec; a.domain = q.domain; a.type = q.type; S.answers[q.id] = a; save();
  }
  const L = 'ABCD';
  function renderQuestion(q, host, o = {}) {
    const el = document.createElement('div'); el.className = 'q'; el.dataset.qid = q.id;
    const prev = S.answers[q.id];
    el.innerHTML = `<div class="q-meta"><span class="badge ${q.type}">${q.type === 'mcq' ? 'MULTIPLE-CHOICE' : 'FREE-TEXT'}</span><span class="badge">Domain ${q.domain}</span><span class="badge">Mục ${q.sec}</span>${prev ? `<span class="badge" style="color:${prev.correct ? 'var(--ok)' : 'var(--bad)'}">Lần trước: ${prev.correct ? '✔ đúng' : '✘ sai'} (${prev.attempts} lần)</span>` : ''}</div>
      <div class="q-text">${inline(q.q)}</div><div class="q-body"></div><div class="fb hidden"></div>`;
    const body = $('.q-body', el), fb = $('.fb', el); const resp = o.initial ? Object.assign({}, o.initial) : {}; let locked = false;
    const instant = o.instant !== false;

    function finish(res) { locked = true; if (!o.noRecord) record(q, res); fb.classList.remove('hidden'); if (o.onAnswer) o.onAnswer(res); }
    const citeBtn = `<button class="cite" data-ref="${q.ref}">📖 Xem dẫn chứng trong Handbook</button>`;

    if (q.type === 'mcq') {
      body.innerHTML = q.options.map((t, i) => `<button class="opt" data-i="${i}"><b>${L[i]}</b><span>${inline(t)}</span></button>`).join('');
      const opts = $$('.opt', body);
      const mark = () => opts.forEach((b, i) => b.classList.toggle('sel', resp.choice === i));
      const reveal = () => {
        if (locked || resp.choice === undefined) return null;
        const ok = resp.choice === q.answer; const res = { correct: ok, score: ok ? 1 : 0, choice: resp.choice };
        opts.forEach((b, i) => { b.disabled = true; b.classList.remove('sel'); if (i === q.answer) b.classList.add('right'); else if (i === resp.choice) b.classList.add('wrongsel'); });
        const getWhy = i => q.why && (q.why[L[i]] || q.why[i]);
        const wrong = opts.map((_, i) => i).filter(i => i !== q.answer && getWhy(i));
        fb.innerHTML = `<div class="res ${ok ? 'ok' : 'no'}">${ok ? '✔ Chính xác!' : '✘ Chưa đúng — đáp án đúng là ' + L[q.answer]}</div>
          <div><b>Vì sao ${L[q.answer]} đúng:</b> ${inline(q.exp)}</div>
          ${wrong.length ? `<div style="margin-top:6px"><b>Vì sao các phương án còn lại sai:</b><ul>${wrong.map(i => `<li><b>${L[i]}.</b> ${inline(getWhy(i))}</li>`).join('')}</ul></div>` : ''}${citeBtn}`;
        finish(res); return res;
      };
      opts.forEach((b, i) => b.addEventListener('click', () => { if (locked) return; resp.choice = i; mark(); if (instant) reveal(); else if (o.onChange) o.onChange(resp); }));
      mark(); el._reveal = reveal; el._resp = resp;
    } else {
      body.innerHTML = `<textarea class="lab-in" rows="3" placeholder="Trả lời ngắn bằng tiếng Anh…" spellcheck="false" style="font-family:inherit;font-size:14px">${esc(resp.text || '')}</textarea>${instant ? '<div class="row-btn"><button class="btn btn-primary" data-submit>Nộp bài</button></div>' : ''}`;
      const ta = $('textarea', body);
      const reveal = () => {
        if (locked) return null; resp.text = ta.value; if (!resp.text.trim() && instant) { toast('Hãy nhập câu trả lời trước'); return null; }
        const g = gradeFree(q, resp.text); const res = { correct: g.correct, score: g.score, text: resp.text };
        ta.disabled = true; const sb = $('[data-submit]', body); if (sb) sb.remove();
        fb.innerHTML = `<div class="res ${g.correct ? 'ok' : 'no'}">${g.correct ? '✔ Đạt' : '✘ Chưa đạt'} <span class="score-pill ${g.correct ? 'ok' : 'no'}">${g.hits}/${g.rows.length} nhóm ý · ${Math.round(g.score * 100)}%</span> <small style="color:var(--mut)">(cần ≥ 70%)</small></div>
          <div class="kwchips">${g.rows.map(r => r.hit ? `<span class="kwc hit">✔ ${esc(r.name)} <small>(“${esc(r.hit)}”)</small></span>` : `<span class="kwc miss">✘ Thiếu: ${esc(r.name)} <small>(vd: ${esc(r.terms.slice(0, 3).join(' / '))})</small></span>`).join('')}</div>
          <div class="model-ans"><b>Model Answer:</b> ${esc(q.model)}</div>
          <div><b>Giải thích:</b> ${inline(q.exp)}</div>${citeBtn}${instant ? '<div class="row-btn"><button class="btn" data-retry>↻ Làm lại</button></div>' : ''}`;
        const rt = $('[data-retry]', fb); if (rt) rt.onclick = () => { const n = renderQuestion(q, document.createDocumentFragment(), o); el.replaceWith(n); };
        finish(res); return res;
      };
      body.addEventListener('click', e => { if (e.target.matches('[data-submit]')) reveal(); });
      ta.addEventListener('input', () => { resp.text = ta.value; if (o.onChange) o.onChange(resp); });
      el._reveal = reveal; el._resp = resp;
    }
    host.appendChild(el);
    if (o.autoReveal) el._reveal();
    return el;
  }

  /* ---------- Study: Ôn tập / Thi thử ---------- */
  let session = null;
  function closeStudy() { if (session && session.timer) clearInterval(session.timer); session = null; $('#study').classList.add('hidden'); }
  function openStudy(mode) {
    if (session && session.timer) clearInterval(session.timer); session = null;
    $('#study').classList.remove('hidden'); $('#study-title').textContent = mode === 'exam' ? '🎯 Thi thử CLLMSP' : '📝 Ôn tập';
    const all = C.questions, ans = S.answers, wrongIds = Object.keys(ans).filter(k => !ans[k].correct && all.find(q => q.id === k));
    const doneQ = Object.keys(ans).length, right = Object.values(ans).filter(a => a.correct).length;
    const domOpts = Object.entries(C.DOMAINS).map(([d, v]) => { const c = all.filter(q => q.domain == d).length; return `<option value="${d}" ${c ? '' : 'disabled'}>Domain ${d}: ${esc(v.name)} (${c})</option>`; }).join('');
    const mcq = all.filter(q => q.type === 'mcq').length;
    $('#study-body').innerHTML = `
      <div class="cards"><div class="stat"><b>${all.length}</b><small>câu trong ngân hàng (${mcq} MCQ / ${all.length - mcq} Free-Text)</small></div><div class="stat"><b>${doneQ}</b><small>đã làm</small></div><div class="stat"><b>${doneQ ? Math.round(right / doneQ * 100) : 0}%</b><small>tỉ lệ đúng</small></div><div class="stat"><b style="color:var(--bad)">${wrongIds.length}</b><small>câu sai cần ôn</small></div></div>
      <div class="note exam"><b class="nt">Đề thi thật CLLMSP</b>200 câu hỏi (154 Multiple-Choice + 46 Free-Text), phân bổ chuẩn theo trọng số 9 Domain (M01: 10%, M02: 15%, M03: 12.5%, M04: 12.5%, M05: 10%, M06: 10%, M07: 12.5%, M08: 10%, M09: 7.5%). Ngân hàng câu hỏi hiện có đầy đủ ${all.length} câu trên toàn bộ 9 Modules.</div>
      <h3 class="lsec">📝 Chế độ Ôn tập (xem đáp án &amp; giải thích ngay)</h3>
      <div class="form-row"><label>Phạm vi <select id="pr-dom"><option value="all">Tất cả 9 Domains (${all.length})</option>${domOpts}</select></label>
        <label>Loại <select id="pr-type"><option value="all">MCQ + Free-Text</option><option value="mcq">Chỉ MCQ</option><option value="free">Chỉ Free-Text</option></select></label>
        <label>Nguồn <select id="pr-src"><option value="all">Tất cả</option><option value="wrong">Chỉ câu đã làm sai (${wrongIds.length})</option><option value="new">Chưa làm</option></select></label>
        <label>Số câu <input type="number" id="pr-n" value="15" min="1" max="${all.length}" style="width:70px"></label></div>
      <div class="row-btn"><button class="btn btn-primary" id="pr-go">Bắt đầu ôn tập</button><button class="btn" id="pr-wrong" ${wrongIds.length ? '' : 'disabled'}>🔁 Ôn lại tất cả câu sai</button></div>
      <h3 class="lsec">🎯 Chế độ Thi thử (phân bổ theo trọng số 9 Domain, tỉ lệ chuẩn 77% MCQ / 23% Free-Text)</h3>
      <div class="form-row"><label>Số câu <select id="ex-n"><option value="200">200 câu (Chuẩn đề thi thật: 154 MCQ + 46 Free-Text)</option><option value="40">40 câu (Đề rút gọn 20%)</option><option value="100">100 câu (Nửa đề chuẩn)</option><option value="${all.length}">Tất cả ngân hàng (${all.length} câu)</option></select></label>
        <label><input type="checkbox" id="ex-instant"> Hiện đáp án ngay sau mỗi câu</label><label><input type="checkbox" id="ex-timer" checked> Tính giờ (1,5 phút/câu)</label></div>
      <div class="row-btn"><button class="btn btn-primary" id="ex-go">Bắt đầu thi thử</button></div>
      <h3 class="lsec">📈 Lịch sử thi thử</h3>
      ${S.exams.length ? `<table class="res"><tr><th>Thời gian</th><th>Chế độ</th><th>Điểm</th><th>Đúng/Tổng</th></tr>${S.exams.slice().reverse().slice(0, 12).map(e => `<tr><td>${new Date(e.ts).toLocaleString('vi-VN')}</td><td>${e.mode}</td><td><b style="color:${e.pct >= 70 ? 'var(--ok)' : 'var(--bad)'}">${e.pct}%</b></td><td>${e.correct}/${e.total}</td></tr>`).join('')}</table>` : '<div class="lp">Chưa có lần thi nào.</div>'}`;
    $('#pr-go').onclick = () => {
      const d = $('#pr-dom').value, t = $('#pr-type').value, s = $('#pr-src').value, n = +$('#pr-n').value || 10;
      let pool = all.filter(q => (d === 'all' || q.domain == d) && (t === 'all' || q.type === t));
      if (s === 'wrong') pool = pool.filter(q => ans[q.id] && !ans[q.id].correct); if (s === 'new') pool = pool.filter(q => !ans[q.id]);
      if (!pool.length) return toast('Không có câu hỏi phù hợp bộ lọc');
      startSession({ title: 'Ôn tập', qs: shuffle(pool).slice(0, n), instant: true });
    };
    $('#pr-wrong').onclick = () => startSession({ title: 'Ôn lại câu sai', qs: shuffle(all.filter(q => wrongIds.includes(q.id))), instant: true });
    $('#ex-go').onclick = () => { const n = +$('#ex-n').value; startSession({ title: 'Thi thử', qs: pickExam(n), instant: $('#ex-instant').checked, minutes: $('#ex-timer').checked ? Math.ceil(n * 1.5) : 0, exam: true }); };
  }
  function pickExam(count) {
    const all = C.questions; count = Math.min(count, all.length);
    if (count === 200) {
      const mcqs = all.filter(q => q.type === 'mcq');
      const frees = shuffle(all.filter(q => q.type === 'free'));
      if (mcqs.length >= 154 && frees.length >= 46) {
        return shuffle(shuffle(mcqs).slice(0, 154).concat(frees.slice(0, 46)));
      }
    }
    const doms = [...new Set(all.map(q => q.domain))]; const wsum = doms.reduce((s, d) => s + C.DOMAINS[d].w, 0);
    let out = [];
    doms.forEach(d => {
      const n = Math.round(count * C.DOMAINS[d].w / wsum); const pool = all.filter(q => q.domain === d);
      const wantM = Math.round(n * 154 / 200); const m = shuffle(pool.filter(q => q.type === 'mcq')), f = shuffle(pool.filter(q => q.type === 'free'));
      const pick = m.slice(0, wantM).concat(f.slice(0, n - Math.min(wantM, m.length)));
      out = out.concat(pick.length < n ? pick.concat(shuffle(pool.filter(q => !pick.includes(q))).slice(0, n - pick.length)) : pick);
    });
    if (out.length < count) out = out.concat(shuffle(all.filter(q => !out.includes(q))).slice(0, count - out.length));
    return shuffle(out).slice(0, count);
  }
  function startSession(cfg) {
    session = Object.assign({ i: 0, resp: [], res: [], t0: Date.now() }, cfg);
    if (cfg.minutes) { session.left = cfg.minutes * 60; session.timer = setInterval(() => { session.left--; const t = $('#sess-timer'); if (t) t.textContent = pad(session.left / 60 | 0) + ':' + pad(Math.max(0, session.left % 60)); if (session.left <= 0) endSession(); }, 1000); }
    drawSession();
  }
  function drawSession() {
    const s = session, q = s.qs[s.i], b = $('#study-body');
    b.innerHTML = `<div style="display:flex;justify-content:space-between;align-items:center"><b>${esc(s.title)} · Câu ${s.i + 1}/${s.qs.length}</b>${s.minutes ? '<span class="timer">⏱ <span id="sess-timer"></span></span>' : ''}</div><div class="prog"><i style="width:${(s.i + 1) / s.qs.length * 100}%"></i></div><div id="sess-q"></div>
      <div class="row-btn" style="justify-content:space-between;margin-top:14px"><button class="btn" id="s-prev" ${s.i ? '' : 'disabled'}>← Trước</button>
      <span><button class="btn" id="s-end">Kết thúc &amp; xem kết quả</button> ${s.i < s.qs.length - 1 ? '<button class="btn btn-primary" id="s-next">Câu tiếp →</button>' : ''}</span></div>`;
    if (s.minutes) $('#sess-timer').textContent = pad(s.left / 60 | 0) + ':' + pad(Math.max(0, s.left % 60));
    const done = s.res[s.i];
    renderQuestion(q, $('#sess-q'), { instant: s.instant, initial: s.resp[s.i], autoReveal: !!done && s.instant, noRecord: !!done,
      onAnswer: r => { if (!done) s.res[s.i] = r; s.resp[s.i] = r.choice !== undefined ? { choice: r.choice } : { text: r.text }; }, onChange: r => { s.resp[s.i] = Object.assign({}, r); } });
    $('#s-prev').onclick = () => { s.i--; drawSession(); }; const nx = $('#s-next'); if (nx) nx.onclick = () => { s.i++; drawSession(); };
    $('#s-end').onclick = endSession;
  }
  function endSession() {
    const s = session; if (!s) return; if (s.timer) clearInterval(s.timer);
    const b = $('#study-body'); b.innerHTML = '<div id="sum"></div><h3 class="lsec">Xem lại từng câu</h3><div id="rev"></div>';
    const results = []; const rev = $('#rev');
    s.qs.forEach((q, i) => {
      const had = s.res[i] && s.instant; // đã chấm & ghi nhận rồi
      renderQuestion(q, rev, { instant: false, initial: s.resp[i], autoReveal: true, noRecord: !!had, onAnswer: r => { results[i] = r; } });
      if (!results[i]) { results[i] = s.res[i] || { correct: false, score: 0 }; if (!rev.lastChild.querySelector('.fb:not(.hidden)')) { const f = $('.fb', rev.lastChild); f.classList.remove('hidden'); f.innerHTML = '<div class="res no">✘ Chưa trả lời</div><div class="model-ans">Đáp án/Model: ' + (q.type === 'mcq' ? L[q.answer] + '. ' + esc(q.options[q.answer]) : esc(q.model)) + '</div><button class="cite" data-ref="' + q.ref + '">📖 Xem dẫn chứng trong Handbook</button>'; } }
    });
    const correct = results.filter(r => r && r.correct).length, total = s.qs.length, pct = Math.round(correct / total * 100);
    const bd = {}; s.qs.forEach((q, i) => { bd[q.domain] = bd[q.domain] || [0, 0]; bd[q.domain][1]++; if (results[i] && results[i].correct) bd[q.domain][0]++; });
    if (s.exam) { S.exams.push({ ts: Date.now(), mode: 'Thi thử', total, correct, pct, byDomain: bd, sec: Math.round((Date.now() - s.t0) / 1000) }); save(); }
    $('#sum').innerHTML = `<div class="cards"><div class="stat"><b style="color:${pct >= 70 ? 'var(--ok)' : 'var(--bad)'}">${pct}%</b><small>${pct >= 70 ? 'ĐẠT (≥70%)' : 'CHƯA ĐẠT'}</small></div><div class="stat"><b>${correct}/${total}</b><small>câu đúng</small></div></div>
      <table class="res"><tr><th>Domain</th><th>Đúng/Tổng</th></tr>${Object.entries(bd).map(([d, v]) => `<tr><td>D${d} · ${esc(C.DOMAINS[d].name)}</td><td>${v[0]}/${v[1]}</td></tr>`).join('')}</table>
      <div class="row-btn"><button class="btn btn-primary" id="back-home">← Về menu ôn tập</button></div>`;
    $('#back-home').onclick = () => openStudy(s.exam ? 'exam' : 'practice'); session = null;
  }

  /* ---------- Export / Import / Reset ---------- */
  function exportProgress() {
    const d = new Date(); const blob = new Blob([JSON.stringify(Object.assign({ exportedAt: d.toISOString() }, S), null, 2)], { type: 'application/json' });
    const a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = `cllmsp-progress-${d.getFullYear()}${pad(d.getMonth() + 1)}${pad(d.getDate())}.json`; a.click(); setTimeout(() => URL.revokeObjectURL(a.href), 500); toast('Đã xuất tiến độ');
  }
  function importProgress(file) {
    const r = new FileReader();
    r.onload = () => { try { const j = JSON.parse(r.result); if (!j || typeof j.progress !== 'object' || typeof j.answers !== 'object') throw 0;
      if (!confirm('Nhập tiến độ sẽ ghi đè dữ liệu hiện tại. Tiếp tục?')) return; S = Object.assign(defState(), j); delete S.exportedAt; save(); curMod = null; openSection(S.last.sec || '1.1'); toast('Đã khôi phục tiến độ'); } catch (e) { toast('⚠ File JSON không hợp lệ'); } };
    r.readAsText(file);
  }

  /* ---------- Events ---------- */
  document.addEventListener('click', e => {
    const t = e.target.closest('[data-ref],[data-open],[data-status],[data-mod],[data-sec]'); if (!t) return;
    if (t.dataset.ref) return goRef(t.dataset.ref);
    if (t.dataset.open) return openSection(t.dataset.open);
    if (t.dataset.sec) return openSection(t.dataset.sec);
    if (t.dataset.mod) { const n = +t.dataset.mod; const m = C.TOC.find(x => x.n === n); return openSection(m.secs[0][0]); }
    if (t.dataset.status) { S.progress[curSec] = t.dataset.status; save(); $$('.status-row [data-status]').forEach(b => b.classList.toggle('on', b.dataset.status === t.dataset.status)); toast(stLabel[t.dataset.status]); }
  });
  $('#btn-practice').onclick = () => openStudy('practice'); $('#btn-exam').onclick = () => openStudy('exam'); $('#study-close').onclick = closeStudy;
  $('#btn-export').onclick = exportProgress; $('#btn-import').onclick = () => $('#file-import').click();
  $('#file-import').onchange = e => { if (e.target.files[0]) importProgress(e.target.files[0]); e.target.value = ''; };
  $('#btn-reset').onclick = () => { if (confirm('Xoá TOÀN BỘ tiến độ & lịch sử làm bài?')) { S = defState(); save(); curMod = null; openSection('1.1'); toast('Đã đặt lại'); } };
  $('#lang-seg').onclick = e => { const b = e.target.closest('button'); if (b) { S.lang = b.dataset.lang; save(); applyLang(); } };
  // kéo thanh chia cột
  (() => {
    const left = $('#col-left'); left.style.flexBasis = S.split + '%'; let drag = false;
    $('#divider').addEventListener('mousedown', () => { drag = true; document.body.style.userSelect = 'none'; });
    window.addEventListener('mouseup', () => { if (drag) { drag = false; document.body.style.userSelect = ''; save(); } });
    window.addEventListener('mousemove', e => { if (!drag) return; S.split = Math.min(75, Math.max(35, e.clientX / innerWidth * 100)); left.style.flexBasis = S.split + '%'; });
  })();

  /* ---------- Boot: mở lại đúng vị trí đang học dở ---------- */
  const start = C.ALL_SECS.includes(S.last.sec) ? S.last.sec : '1.1';
  openSection(start, { scrollHb: true });
  window.CLLMSP_APP = { goRef, openSection, renderQuestion, gradeFree };
})();
