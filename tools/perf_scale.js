/* =========================================================
   tools/perf_scale.js — 대량 콘텐츠 속도 시험 (2026-10-24 기반 작업)
   콘텐츠를 SCALE 배로 불려(이야기 문장 · 이벤트 · 위기 · 물건을 ID 만 바꿔 복제) 같은 게임을 DAYS 일 흘리고,
   하루 계산 시간 · 화면 그리기 · 세이브 크기 · 저장/불러오기 시간을 SCALE=1 과 나란히 잰다.
   실행: CHROMIUM=/opt/pw-browsers/chromium NODE_PATH=$(npm root -g) [DAYS=20] [SCALES=1,10,30] node tools/perf_scale.js
   기준(넘으면 ✗): 하루 평균 300ms · 화면 하나 400ms · 세이브 3MB (2026-10-24 측정: ×1 약 140ms · ×30 약 290ms)
   ========================================================= */
const path = require('path'), APP = 'file://' + path.resolve(__dirname, '../game/index.html');
const DAYS = +process.env.DAYS || 20, SCALES = (process.env.SCALES || '1,10,30').split(',').map(Number);
const LIMIT = { day: 300, screen: 400, save: 3 * 1024 * 1024 };
const { chromium } = require('playwright');
(async () => {
  const b = await chromium.launch({ executablePath: process.env.CHROMIUM }); const rows = [];
  for (const S of SCALES) {
    const p = await (await b.newContext()).newPage(), errs = []; p.on('pageerror', e => errs.push(e.message));
    await p.goto(APP); await p.waitForFunction(() => typeof DB !== 'undefined');
    const r = await p.evaluate(async ({ S, DAYS }) => {
      localStorage.clear(); await packsLoad();
      /* 콘텐츠 불리기: 같은 행을 ID 만 바꿔 S 배 */
      const grow = (t, n) => { const L = vals(t), add = []; for (let k = 1; k < n; k++) L.forEach(r => add.push({ ...JSON.parse(JSON.stringify(r)), id: r.id + '_X' + k })); if (add.length) def(t, add); };
      ['storyLines', 'events', 'crises', 'hearTexts', 'items'].forEach(t => grow(t, S));
      const c = newCC(); autoAll(c); gameFromCreation(c); enterGame(); if (typeof poolPrefetch === 'function') await poolPrefetch();
      prefs().play.stop = 'none';
      const t0 = performance.now(), d0 = G.day; let guard = 0;
      while (G.day - d0 < DAYS && !G.dead && guard++ < DAYS * 2000) {
        if (UI.raid && !UI.raid.done) { if (UI.raid.crisis) PLAY.chooseCrisis(); else PLAY.stepSync(1); continue; }
        PLAY.stepSync(60);
      }
      const dayMs = (performance.now() - t0) / Math.max(1, G.day - d0);
      let screenMax = 0, slow = ''; for (const s of ['life', 'homeHunter', 'homeTrade', 'db', 'gates']) { UI.screen = s; const a = performance.now(); try { render(); } catch (e) { } const ms = performance.now() - a; if (ms > screenMax) { screenMax = ms; slow = s; } }
      const a = performance.now(); saveGame('slot1'); const saveMs = performance.now() - a, size = (store.get(SAVE_KEY, []).find(x => x.slot === 'slot1') ? JSON.stringify(G).length : 0);
      const l0 = performance.now(); loadGame('slot1'); const loadMs = performance.now() - l0;
      return { rows: Object.values(DB).reduce((x, t) => x + Object.keys(t).length, 0), days: G.day - d0, dayMs, screenMax, slow, saveMs, loadMs, size, heap: performance.memory ? performance.memory.usedJSHeapSize : 0 };
    }, { S, DAYS });
    rows.push({ S, ...r, errs: errs.length }); await p.close();
  }
  const mb = n => (n / 1024 / 1024).toFixed(2) + 'MB', ok = (v, lim) => v > lim ? '✗' : '✓';
  console.log('배수 | 행 수 | 흘린 날 | 하루 평균 | 가장 느린 화면 | 저장 · 불러오기 | 세이브 크기 | 메모리 | 오류');
  rows.forEach(r => console.log(`×${r.S} | ${r.rows} | ${r.days} | ${r.dayMs.toFixed(1)}ms ${ok(r.dayMs, LIMIT.day)} | ${r.slow} ${r.screenMax.toFixed(0)}ms ${ok(r.screenMax, LIMIT.screen)} | ${r.saveMs.toFixed(0)} · ${r.loadMs.toFixed(0)}ms | ${mb(r.size)} ${ok(r.size, LIMIT.save)} | ${mb(r.heap)} | ${r.errs}`));
  await b.close();
  process.exitCode = rows.some(r => r.dayMs > LIMIT.day || r.screenMax > LIMIT.screen || r.size > LIMIT.save || r.errs) ? 1 : 0;
})().catch(e => { console.error(e); process.exitCode = 1; });
