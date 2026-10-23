/* =========================================================
   engine/emo_graph.js — 일대기 감정 그래프 (2026-10-24 사용자: 일대기에, 연도별 · 월별)
   G.emoLog (MIND 표본: {t, c, CAL, JOY, …}) → 달마다 / 해마다 감정 7종의 평균 세기(0~100)
   감정 7종을 한 그래프에 겹치지 않고, 감정마다 작은 선 그래프 한 줄씩 (같은 가로축)
   ========================================================= */
const EMOGRAPH = (() => {
  const key = e => e.id.slice(3, 6);
  function buckets(mode, year) {
    const L = G.emoLog || [], E = vals('emotions'), B = new Map();
    L.forEach(r => { const d = dateOf(Math.floor(r.t / 1440)); if (mode === 'month' && d.y !== year) return; const k = mode === 'month' ? d.m : d.y;
      const b = B.get(k) || { n: 0, s: {} }; b.n++; E.forEach(e => b.s[e.id] = (b.s[e.id] || 0) + (r[key(e)] || 0)); B.set(k, b); });
    return B;
  }
  const years = () => { const s = new Set((G.emoLog || []).map(r => dateOf(Math.floor(r.t / 1440)).y)); s.add(dateOf(G.day).y); return [...s].sort((a, b) => a - b); };
  function html() {
    const Y = years(), mode = UI.emoMode === 'year' ? 'year' : 'month', year = Y.includes(UI.emoYear) ? UI.emoYear : Y[Y.length - 1];
    const B = buckets(mode, year), xs = mode === 'month' ? [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12] : Y, W = 600, H = 34, n = xs.length;
    const px = i => n <= 1 ? W / 2 : 8 + i * (W - 16) / (n - 1), py = v => H - 3 - v / 100 * (H - 6);
    const lab = x => mode === 'month' ? `${year}년 ${x}월` : `${x}년`;
    const rows = vals('emotions').map(e => {
      const pts = xs.map((x, i) => { const b = B.get(x); return b ? { i, x, v: Math.round(b.s[e.id] / b.n) } : null; }).filter(Boolean);
      const segs = []; let cur = []; pts.forEach((p, k) => { if (k && p.i !== pts[k - 1].i + 1) { segs.push(cur); cur = []; } cur.push(p); }); if (cur.length) segs.push(cur);
      const peak = pts.reduce((m, p) => p.v > (m?.v ?? -1) ? p : m, null);
      return `<div class="eg-row"><span class="eg-name"><i class="emodot" style="background:${e.color}"></i>${esc(e.name)}</span>
        <svg class="eg-spark" viewBox="0 0 ${W} ${H}" preserveAspectRatio="none" role="img" aria-label="${esc(e.name)} ${pts.map(p => lab(p.x) + ' ' + p.v).join(', ') || '기록 없음'}">
          <line x1="0" y1="${H - 3}" x2="${W}" y2="${H - 3}" class="eg-base"/>
          ${segs.map(s => s.length > 1 ? `<polyline points="${s.map(p => `${px(p.i).toFixed(1)},${py(p.v).toFixed(1)}`).join(' ')}" style="stroke:${e.color}"/>` : '').join('')}
          ${pts.map(p => `<line class="eg-dot" x1="${px(p.i).toFixed(1)}" y1="${py(p.v).toFixed(1)}" x2="${(px(p.i) + 0.01).toFixed(2)}" y2="${py(p.v).toFixed(1)}" style="stroke:${e.color}"><title>${lab(p.x)} · ${esc(e.name)} ${p.v}</title></line>`).join('')}
        </svg><span class="eg-peak">${peak ? `최고 ${peak.v}` : '—'}</span></div>`;
    }).join('');
    return `<section class="emo-graph" aria-label="감정 흐름"><header><b>감정 흐름</b>
        <span class="row" style="gap:6px;flex-wrap:wrap"><span class="seg" role="group" aria-label="보기"><button data-emomode="month" aria-pressed="${mode === 'month'}">월별</button><button data-emomode="year" aria-pressed="${mode === 'year'}">연도별</button></span>
        ${mode === 'month' ? `<label class="eg-year">연도 <select data-emoyear="1">${Y.map(y => `<option value="${y}" ${y === year ? 'selected' : ''}>${y}년</option>`).join('')}</select></label>` : ''}</span></header>
      ${(G.emoLog || []).length ? `<div class="eg-grid">${rows}<div class="eg-row eg-axis"><span></span><div class="eg-ticks">${xs.map((x, i) => `<span style="left:${(px(i) / W * 100).toFixed(2)}%">${mode === 'month' ? x + '월' : x}</span>`).join('')}</div><span></span></div></div>
        <p class="dim" style="font-size:11px;margin:6px 0 0">그 기간 감정 세기의 평균 (0~100). 점에 마우스를 올리면 값이 보여.</p>` : '<p class="muted" style="margin:8px 0 0">아직 감정 기록이 없어.</p>'}</section>`;
  }
  document.addEventListener('click', e => { const t = e.target.closest('[data-emomode]'); if (!t) return; UI.emoMode = t.dataset.emomode; render(); });
  document.addEventListener('change', e => { if (e.target.dataset?.emoyear) { UI.emoYear = +e.target.value; render(); } });
  return { html, buckets };
})();
