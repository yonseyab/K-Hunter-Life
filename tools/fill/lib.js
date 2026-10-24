/* =========================================================
   tools/fill/lib.js — 콘텐츠 채우기 도구의 공용 부품 (2026-10-24)
   - 답 파일 읽기 (블록 형식)          parseAnswer
   - 값 풀이 (ID · 이름 · 짧은 문법)     resolveEnum · parseReq · parseFx
   - 겹침 검사 (기존 게임 + 같은 묶음)   Dup
   - 문장 검사 (스타일 규칙)            lintText
   ========================================================= */
const fs = require('fs'), path = require('path');
const REPO = path.resolve(__dirname, '../..');
const GAME = () => process.env.KHL_GAME ? path.resolve(process.env.KHL_GAME) : path.join(REPO, 'game');
const FILLDIR = () => process.env.KHL_FILL ? path.resolve(process.env.KHL_FILL) : path.join(REPO, 'fill');
function loadDB() { delete require.cache[require.resolve('../validate_data.js')]; return require('../validate_data.js').load().DB; }
const V = (DB, t) => Object.values(DB[t] || {});

/* ---------- 답 파일 ----------
   ### 번호          ← 한 항목의 시작 (번호는 아무거나)
   칸: 값            ← 한 줄에 하나. 같은 칸을 여러 번 쓰면 목록 (lines · texts …)
   choice.t: …       ← 묶음 칸. 묶음의 첫 칸(choice.t)이 다시 나오면 새 묶음
   // …  또는 > …    ← 메모 (무시)
   '## 답' 줄이 있으면 그 아래만 읽는다 (주문서 앞부분은 무시) */
function parseAnswer(txt, spec) {
  let s = String(txt).replace(/\r/g, '');
  const mark = s.search(/^##\s*답\s*$/m); let ln = 0; if (mark >= 0) { ln = s.slice(0, mark).split('\n').length - 1; s = s.slice(mark); }
  const meta = {}, blocks = []; let cur = null;
  const groups = spec.groups || {};
  for (const raw of s.split('\n')) {
    ln++; const line = raw.trim();
    if (!line || line.startsWith('//') || line.startsWith('>') || /^##\s/.test(line)) continue;
    const mb = line.match(/^###\s*(.*)$/); if (mb) { cur = { no: mb[1].trim() || String(blocks.length + 1), line: ln, f: {}, g: {} }; blocks.push(cur); continue; }
    const m = line.match(/^([A-Za-z][\w.]*)\s*[:：]\s?(.*)$/); if (!m) { if (cur) (cur.junk = cur.junk || []).push(ln); continue; }
    const k = m[1], v = m[2].trim();
    if (!cur) { meta[k] = v; continue; }   /* 첫 블록 전: 작성자(by) 같은 머리 정보 */
    const gi = k.indexOf('.');
    if (gi > 0 && groups[k.slice(0, gi)]) {
      const g = k.slice(0, gi), sub = k.slice(gi + 1), G = groups[g], L = cur.g[g] || (cur.g[g] = []);
      if (sub === G.first || !L.length) L.push({});
      const o = L[L.length - 1]; if (G.list?.includes(sub)) (o[sub] = o[sub] || []).push(v); else o[sub] = v; continue;
    }
    if (spec.list?.includes(k)) (cur.f[k] = cur.f[k] || []).push(v); else cur.f[k] = v;
  }
  return { meta, blocks };
}

/* ---------- 값 풀이 ---------- */
/* 고를 수 있는 값: ID 를 써도, 이름을 써도 된다. 표 = [[id, 이름, …별칭]] */
function resolveEnum(v, table) {
  if (v == null || v === '') return null; const s = String(v).trim(), n = s.replace(/\s+/g, '');
  for (const [id, ...names] of table) if (id === s || names.some(x => x && String(x).replace(/\s+/g, '') === n)) return id;
  const t = s.split(/\s+[—-]\s+/)[0].trim(); if (t !== s) return resolveEnum(t, table);   /* 'ACT_SLEEP — 수면' 처럼 통째로 붙여 넣어도 */
  return undefined;
}
const num = v => { const x = Number(String(v).replace(/[, 원]/g, '')); return Number.isFinite(x) ? x : undefined; };
const yes = v => /^(y|yes|true|1|예|네|o|ㅇ|있음|맞음)$/i.test(String(v || '').trim());

/* 조건 짧은 문법 (;로 여러 개): rel=REL_FRIEND · money>=300000 · money<=500000 · time=19:00-05:00 · noGuild · hasGuild · level>=10 · rank<=15
   · age>=30 · age<=40 · stress>=60 · energy<=30 · adult · known · close>=30 · injured · weekday=0,6 · tag=CT_URBAN · tag.gate=CT_UNDEAD
   대괄호로 시작하면 JSON 그대로 ([{"k":"money","min":1}]) */
function parseReq(v) {
  const s = String(v || '').trim(); if (!s) return { req: [] };
  if (s.startsWith('[')) { try { return { req: JSON.parse(s) }; } catch (e) { return { err: 'req JSON 형식' }; } }
  const out = [], bad = [];
  const hm = t => { const [h, m] = t.split(':').map(Number); return h * 60 + (m || 0); };
  for (const tok0 of s.split(';')) {
    const tok = tok0.trim(); if (!tok) continue; let m;
    if ((m = tok.match(/^rel\s*=\s*(REL_\w+)$/))) out.push({ k: 'rel', type: m[1] });
    else if ((m = tok.match(/^(money|age|stress|energy)\s*(>=|<=)\s*([\d,]+)$/))) out.push({ k: m[1], [m[2] === '>=' ? 'min' : 'max']: num(m[3]) });
    else if ((m = tok.match(/^level\s*>=\s*(\d+)$/))) out.push({ k: 'level', min: +m[1] });
    else if ((m = tok.match(/^rank\s*<=\s*(\d+)$/))) out.push({ k: 'rankMax', lv: +m[1] });
    else if ((m = tok.match(/^close\s*>=\s*(\d+)$/))) out.push({ k: 'relStat', key: 'close', min: +m[1] });
    else if ((m = tok.match(/^time\s*=\s*(\d{1,2}:\d{2})\s*-\s*(\d{1,2}:\d{2})$/))) out.push({ k: 'time', from: hm(m[1]), to: hm(m[2]) });
    else if ((m = tok.match(/^weekday\s*=\s*([\d,]+)$/))) out.push({ k: 'weekday', in: m[1].split(',').map(Number) });
    else if ((m = tok.match(/^tag(?:\.(here|gate|who|player|bag))?\s*=\s*(CT_\w+)$/))) out.push({ k: 'tag', of: m[1] || 'here', tag: m[2] });
    else if (['noGuild', 'hasGuild', 'adult', 'known', 'injured', 'family'].includes(tok)) out.push({ k: tok });
    else bad.push(tok);
  }
  return bad.length ? { req: out, err: '모르는 조건: ' + bad.join(', ') } : { req: out };
}

/* 효과 짧은 문법 (,로 여러 개): hp:-10 · energy:-5 · stress:+3 · money:-30000 · kills:1 · stones:2 · time:20 · party:-4 · progress:1 · rep:1 · exp:50
   · retreat · rel:close+4 (상대와 친밀 +4, 다른 마음도: like · trust · respect · romance · rival · grudge · depend) · emo:EM_JOY+8 · item:IT_… · injury:부위/종류/심각도 (예: rand/INJ_CUT/1) */
const FX_NUM = ['hp', 'energy', 'stress', 'money', 'kills', 'stones', 'time', 'party', 'progress', 'rep', 'exp'];
function parseFx(v, allow) {
  const s = String(v || '').trim(); if (!s) return { fx: undefined };
  if (s.startsWith('{')) { try { return { fx: JSON.parse(s) }; } catch (e) { return { err: 'fx JSON 형식' }; } }
  const fx = {}, bad = [];
  for (const t0 of s.split(',')) {
    const t = t0.trim(); if (!t) continue; let m;
    if ((m = t.match(/^(\w+)\s*:\s*([+-]?[\d,]+)$/)) && FX_NUM.includes(m[1]) && (!allow || allow.includes(m[1]))) fx[m[1]] = num(m[2]);
    else if (t === 'retreat' && (!allow || allow.includes('retreat'))) fx.retreat = true;
    else if ((m = t.match(/^rel\s*:\s*(close|like|trust|respect|romance|rival|grudge|depend)\s*([+-]\d+)$/)) && (!allow || allow.includes('rel'))) { if (['close', 'like', 'trust'].includes(m[1]) && !fx.rel) fx.rel = ['T', m[1], +m[2]]; else (fx.relDim = fx.relDim || []).push(['T', 'RD_' + m[1].toUpperCase(), +m[2]]); }
    else if ((m = t.match(/^emo\s*:\s*(EM_\w+)\s*([+-]\d+)$/)) && (!allow || allow.includes('emo'))) (fx.emo = fx.emo || {})[m[1]] = +m[2];
    else if ((m = t.match(/^item\s*:\s*(IT_\w+)$/)) && (!allow || allow.includes('item'))) fx.item = m[1];
    else if ((m = t.match(/^injury\s*:\s*([\w]+)\/(INJ_\w+)\/([123])$/)) && (!allow || allow.includes('injury'))) fx.injury = { part: m[1], type: m[2], sev: +m[3] };
    else bad.push(t);
  }
  return bad.length ? { fx, err: '모르는 효과: ' + bad.join(', ') } : { fx };
}

/* ---------- 겹침 검사 ----------
   글자 둘씩 묶은 조각(bigram)이 얼마나 겹치는지(자카드)로 본다. 띄어쓰기 · 문장부호 · 자리 표시({p} 등)는 지우고 비교.
   문장: 0.72 이상이면 겹침(오류) · 0.55 이상이면 비슷함(경고). 이름: 같으면 오류, 0.8 이상이면 경고 */
const norm = s => String(s || '').replace(/\{[^}]*\}/g, '').replace(/[\s.,!?·…'"“”‘’~\-—()[\]<>「」『』:;/]/g, '').toLowerCase();
const grams = s => { const n = norm(s), g = new Set(); if (n.length < 2) { if (n) g.add(n); return g; } for (let i = 0; i < n.length - 1; i++) g.add(n.slice(i, i + 2)); return g; };
const jac = (a, b) => { if (!a.size || !b.size) return 0; let i = 0; for (const x of a) if (b.has(x)) i++; return i / (a.size + b.size - i); };
class Dup {
  constructor(hard = 0.72, soft = 0.55) { this.hard = hard; this.soft = soft; this.items = []; this.idx = new Map(); }
  add(id, text, scope = '') { const g = grams(text); const it = { id, text, g, scope, n: norm(text) }; this.items.push(it); for (const x of g) { if (!this.idx.has(x)) this.idx.set(x, []); this.idx.get(x).push(it); } }
  /* 가장 비슷한 것 [점수, 항목] */
  best(text) {
    const g = grams(text), n = norm(text), seen = new Map();
    for (const x of g) for (const it of this.idx.get(x) || []) seen.set(it, (seen.get(it) || 0) + 1);
    let top = [0, null];
    for (const [it, c] of seen) { const s = it.n === n ? 1 : c / (g.size + it.g.size - c); if (s > top[0]) top = [s, it]; }
    return top;
  }
}

/* ---------- 문장 검사 ----------
   kind: line(이야기 지문 · 현재형 · 마침표) · head(뉴스 제목) · chat(메신저 말) · name(이름) · desc(설명) · short(짧은 꾸밈말)
   돌려줌: {err:[], warn:[]} */
function lintText(t, kind, opt = {}) {
  const err = [], warn = [], s = String(t || '').trim();
  if (!s) return { err: ['비어 있음'], warn };
  const len = [...s].length, [mn, mx] = opt.len || { line: [4, 90], head: [8, 80], chat: [2, 70], name: [2, 24], desc: [8, 160], short: [2, 30] }[kind] || [1, 200];
  if (len < mn) err.push(`너무 짧음 (${len}자, ${mn}자 이상)`); if (len > mx) err.push(`너무 김 (${len}자, ${mx}자 이하)`);
  if (/[\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}]/u.test(s) && kind !== 'chat') err.push('이모지 금지');
  if (/TODO|\?\?\?|xxx|여기에|채워/i.test(s)) err.push('채우지 않은 자리');
  if (/[\n\t]/.test(s)) err.push('줄바꿈 금지 (한 줄로)');
  const ph = [...s.matchAll(/\{([^{}]*)\}/g)].map(m => m[1]);
  const allowed = opt.ph || [];
  ph.forEach(p => { if (/\|/.test(p) || p.startsWith('@')) return; if (!allowed.includes(p)) err.push(`쓸 수 없는 자리 표시 {${p}} — 쓸 수 있는 것: ${allowed.map(x => '{' + x + '}').join(' ') || '없음'}`); });
  (opt.need || []).forEach(p => { if (!ph.includes(p)) err.push(`{${p}} 가 꼭 있어야 함`); });
  if ((s.match(/\{/g) || []).length !== (s.match(/\}/g) || []).length) err.push('중괄호 짝이 안 맞음');
  if (kind === 'line') {
    if (!/[.!?…"”]$/.test(s)) err.push('문장 끝에 마침표');
    if (/(습니다|합니다|해요|에요|예요|세요)[.!?]?$/.test(s.replace(/"[^"]*"/g, ''))) err.push('지문은 존댓말 금지 (~한다 체)');
    if (/(었다|았다|였다|했다|됐다|갔다|왔다)\.$/.test(s.replace(/"[^"]*"/g, ''))) warn.push('과거형으로 끝남 — 현재형(~한다)이 기본');
    if (/^(나는|내가|저는|제가)\s/.test(s)) err.push('1인칭 지문 금지 (3인칭)');
  }
  if (kind === 'name' && /[.!?{}]/.test(s)) err.push('이름에 문장부호 · 자리 표시 금지');
  if (/[A-Za-z]{4,}/.test(s.replace(/\{[^}]*\}/g, '')) && !opt.latin) warn.push('영어 단어 — 꼭 필요한지 확인');
  if (/(미성년|초등학생|중학생|고등학생|어린이).*(성관계|섹스|야한|성적)|(성관계|섹스|야한|성적).*(미성년|초등학생|중학생|고등학생|어린이)/.test(s)) err.push('금지 주제 (STYLE_CHECKLIST 26)');
  if (/자해|자살 방법/.test(s)) err.push('금지 주제 (STYLE_CHECKLIST 26)');
  return { err, warn };
}

/* ---------- 묶음 번호 · 파일 ---------- */
function batches() {
  const dir = path.join(GAME(), 'data/ext'); if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir).map(f => f.match(/^fill_(\d{2})_(\w+)\.js$/)).filter(Boolean).map(m => ({ no: +m[1], kind: m[2], file: m[0] })).sort((a, b) => a.no - b.no);
}
const nextBatch = () => (batches().reduce((a, b) => Math.max(a, b.no), 0) || 0) + 1;
function listFile() { return path.join(GAME(), 'data/ext/_list.js'); }
function listAdd(file) { const p = listFile(), s = fs.readFileSync(p, 'utf8'); if (s.includes(`'${file}'`)) return; fs.writeFileSync(p, s.replace(/var HL_EXT = \[\n?/, m => m + `  '${file}',\n`)); }
function listDel(file) { const p = listFile(), s = fs.readFileSync(p, 'utf8'); fs.writeFileSync(p, s.split('\n').filter(l => l.trim() !== `'${file}',`).join('\n')); }
const js = v => JSON.stringify(v);

module.exports = { REPO, GAME, FILLDIR, loadDB, V, parseAnswer, resolveEnum, num, yes, parseReq, parseFx, Dup, lintText, norm, batches, nextBatch, listAdd, listDel, js };
