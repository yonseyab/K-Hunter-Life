/* =========================================================
   tools/validate_data.js — 데이터 검증 (설정집 15.4 validate_world, 16장 수용 테스트)
   game/index.html 이 불러오는 data/*.js 를 같은 순서로 읽어서 검사한다.
     1) 중복 ID
     2) 없는 ID 참조: 값이나 객체 키가 'ID 모양'(대문자 접두어_…)이고 그 접두어가 실제로 쓰이는 접두어인데, 어느 테이블에도 없는 경우
     3) 테이블별 규칙 (아래 RULES): 필수 필드 · 값 범위
   실행: node tools/validate_data.js          (문제가 있으면 종료 코드 1)
   런타임에 생기는 ID(게임 중 생성 · 에셋 파일)는 RUNTIME 접두어로 빼 둔다.
   ========================================================= */
const fs = require('fs'), path = require('path'), vm = require('vm');
const ROOT = path.resolve(__dirname, '../game');

function load() {
  const html = fs.readFileSync(path.join(ROOT, 'index.html'), 'utf8');
  const files = [...html.matchAll(/<script src="(data\/[^"]+)"><\/script>/g)].map(m => m[1]);
  const ctx = { HLDB: {}, dup: [], console: { warn: () => {}, log: () => {} } };
  ctx.window = ctx;
  ctx.def = (table, rows) => { const t = ctx.HLDB[table] || (ctx.HLDB[table] = {}); rows.forEach(r => { if (!r.id) { ctx.dup.push(`[${table}] id 없는 행`); return; } if (t[r.id]) ctx.dup.push(`[${table}] 중복 ID ${r.id}`); t[r.id] = r; }); };
  vm.createContext(ctx);
  const ext = []; ctx.document = { write: h => { const m = /src="([^"]+)"/.exec(h); if (m) ext.push(m[1]); } };
  const base = files.slice();
  for (const f of base) { vm.runInContext(fs.readFileSync(path.join(ROOT, f), 'utf8'), ctx, { filename: f }); while (ext.length) { const e = ext.shift(); files.push(e); vm.runInContext(fs.readFileSync(path.join(ROOT, e), 'utf8'), ctx, { filename: e }); } }
  /* 대량 콘텐츠 팩 (data/packs/_manifest.js 의 HL_PACKS) — 게임은 뒤에서 불러오지만 검사는 함께 */
  const packErr = [];
  for (const f of (ctx.HL_PACKS || [])) { const fp = path.join(ROOT, 'data/packs', f); if (!fs.existsSync(fp)) { packErr.push(`팩 파일 없음: data/packs/${f}`); continue; } files.push('data/packs/' + f); vm.runInContext(fs.readFileSync(fp, 'utf8'), ctx, { filename: f }); }
  const listed = new Set(ctx.HL_PACKS || []), dir = path.join(ROOT, 'data/packs');
  if (fs.existsSync(dir)) for (const f of fs.readdirSync(dir)) if (f.endsWith('.js') && f !== '_manifest.js' && !listed.has(f)) packErr.push(`목록(_manifest.js)에 없는 팩 파일: data/packs/${f}`);
  ctx.dup.push(...packErr);
  return { DB: ctx.HLDB, dup: ctx.dup, files };
}

require('../game/engine/validate.js');
/* 게이트 장소 · 이름 목록 파일(data/pool, 필요할 때 불러옴): 파일 · ID · 개수 · 중복 */
function checkPools(DB, errs) {
  const got = {}, ctx = { poolPut: (id, txt) => { got[id] = txt; } }; vm.createContext(ctx);
  const files = new Set([...Object.values(DB.gatePlacePool || {}), ...Object.values(DB.gateNamePool || {})].map(p => p.file));
  for (const f of files) { const fp = path.join(ROOT, 'data', f); if (!fs.existsSync(fp)) { errs.push(`게이트 목록 파일 없음: ${f}`); continue; } vm.runInContext(fs.readFileSync(fp, 'utf8'), ctx, { filename: f }); }
  for (const t of ['gatePlacePool', 'gateNamePool']) for (const p of Object.values(DB[t] || {})) {
    const L = (got[p.id] || '').split('\n').filter(Boolean);
    if (got[p.id] == null) errs.push(`${t}.${p.id}: ${p.file} 에 목록 없음`); else if (L.length !== p.n) errs.push(`${t}.${p.id}: n ${p.n} ≠ 실제 ${L.length}`); else if (new Set(L).size !== L.length) errs.push(`${t}.${p.id}: 같은 항목이 두 번`);
  }
  if (Object.keys(DB.regions || {}).length > 255) errs.push('지역 255개 초과 (engine/sim.js 인구 region 열이 Uint8Array)');
}
/* 완전히 같은 문장 (대량 외주 품질, 2026-10-23): 테이블마다 같은 문장이 두 번 나오면 오류 */
function checkDupText(DB, errs) {
  const K = {
    events: e => (e.subj || '') + '|' + (e.body || (e.lines || []).join('/')),
    crises: c => (c.title || '') + '|' + (c.text || ''),
    hearTexts: h => h.text, rumorPool: r => r.text, newsPool: n => n.title,
    monsters: m => m.name, gateInteriors: g => g.name, storyLines: l => l.on + '|' + l.text, mindWhy: w => w.text,
  };
  for (const [t, f] of Object.entries(K)) { const seen = new Map(); for (const r of Object.values(DB[t] || {})) { const k = f(r); if (!k) continue; if (seen.has(k)) errs.push(`[${t}] 같은 문장: ${r.id} = ${seen.get(k)} (${String(k).slice(0, 40)})`); else seen.set(k, r.id); } }
  const cm = new Map(); for (const r of Object.values(DB.careerMsgs || {})) for (const x of r.texts || []) { if (cm.has(x)) errs.push(`[careerMsgs] 같은 문장: ${r.id} = ${cm.get(x)} (${x.slice(0, 40)})`); else cm.set(x, r.id); }
}
function validate() { const { DB, dup, files } = load(), r = globalThis.VALIDATE.check(DB, dup); checkPools(DB, r.errs); checkDupText(DB, r.errs); r.stats.files = files.length; return r; }

if (require.main === module) {
  const r = validate();
  console.log(`데이터 파일 ${r.stats.files}개 · 테이블 ${r.stats.tables}개 · 행 ${r.stats.rows}개`);
  r.errs.forEach(e => console.log('  ✗ ' + e));
  console.log(r.errs.length ? `문제 ${r.errs.length}개` : '문제 없음');
  process.exit(r.errs.length ? 1 : 0);
}
module.exports = { validate, load };
