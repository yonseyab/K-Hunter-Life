#!/usr/bin/env node
/* =========================================================
   tools/fill/fill.js — 콘텐츠 채우기 도구 (2026-10-24)
   주문서를 뽑아 → (사람이든 어떤 AI든) 빈칸에 글만 채우고 → 검사 → 게임에 반영. 기존 게임 · 같은 묶음과 겹치면 막는다.

   node tools/fill/fill.js list                              채울 수 있는 종류와 지금 개수
   node tools/fill/fill.js order <종류> [--n 30] [--focus act:] 주문서 만들기 → fill/orders/<종류>-<날짜>.md
   node tools/fill/fill.js check <답 파일>                    검사만 (게임은 안 바뀜)
   node tools/fill/fill.js apply <답 파일> [--dry]           통과한 항목만 게임에 넣기 → game/data/ext/fill_<묶음>_<종류>.js
   node tools/fill/fill.js batches                           넣은 묶음 목록
   node tools/fill/fill.js undo <묶음 번호>                  그 묶음을 게임에서 빼기
   자세한 사용법: docs/FILL.md
   ========================================================= */
const fs = require('fs'), path = require('path');
const L = require('./lib.js'), KINDS = require('./kinds.js');
const { V } = L;
const VALIDATE = (require('../../game/engine/validate.js'), globalThis.VALIDATE);

const args = process.argv.slice(2), cmd = args[0];
const opt = k => { const i = args.indexOf('--' + k); return i >= 0 ? (args[i + 1] && !args[i + 1].startsWith('--') ? args[i + 1] : true) : undefined; };
const today = () => { const d = new Date(), p = n => String(n).padStart(2, '0'); return `${d.getFullYear()}${p(d.getMonth() + 1)}${p(d.getDate())}-${p(d.getHours())}${p(d.getMinutes())}`; };
const die = m => { console.error(m); process.exit(1); };

/* ---------- 주문서에 들어가는 공통 설명 ---------- */
const WORLD = `- **K-Hunter-Life**: 한국 헌터물 + 성좌물 **관찰형 인생 시뮬레이션**. 플레이어는 헌터를 직접 조종하지 않고, 그 헌터의 '성좌'로서 하루 30초씩 흘러가는 인생을 지켜본다.
- **때 · 곳**: 2026년 한국. 1999년에 첫 게이트가 열린 지 27년 — 법 · 보험 · 협회 수수료 · 인프라가 다 자리 잡았다. 첫 세대 각성자가 원로로 살아 있다. 실제 지명 · 지하철 노선은 그대로 쓴다.
- **헌터**: 인구 0.5% 가 각성, 0.2% 가 활동. 등급은 **1급(최강) ~ 20급(최약)**. 화려한 스타보다 '위험하고 피곤한 현장 노동자' 쪽. 헌터 협회 · 대기업 계열 대형 길드 · 생계형 소형 길드 · 프리랜서 파티.
- **게이트**: 등급이 있고, 시간 안에 공략하지 않으면 '브레이크'(몬스터가 밖으로 넘침). 몬스터를 잡으면 마정석(발전 · 산업 에너지원)이 나온다.
- **성좌**: 하늘 너머에서 헌터를 지켜보는 존재. 선물 · 축복을 보내고, 헌터가 성좌를 알게 되면 가끔 조언을 구한다.`;
const STYLE = `- 3인칭 · **현재형**("~한다") · 짧게 끊기. 건조한 기록체가 기본, 중요한 순간만 감정을 조금.
- 감정은 속마음 설명 대신 **보이는 행동 · 몸의 반응**으로.
- 생활감: 지하철 지연, 편의점 도시락, 월세, 단톡방 눈치싸움, 협회 창구 번호표 같은 디테일.
- 유머는 상황 유머 · 한국 커뮤니티 위트. 욕설 · 밈 · 비속어 OK (인물의 말로).
- 18세 이용가: 부상 묘사는 현실적으로. 성적인 내용은 성인끼리만, 미성년자 관련은 어떤 형태로도 금지. 자해 · 미성년자 대상 범죄 · 무차별 강력범죄는 다루지 않는다.
- 비하 · 혐오는 등장인물의 말로만, 서술(지문)이 동조하지 않게.
- 인물 · 기업 이름은 실존을 연상시키는 **가상 이름**. 판타지식 이름은 피하고 실제 한국 이름 분포.
- **이미 있는 것과 겹치지 않게** — 같은 장면 · 같은 표현 · 같은 이름이면 도구가 자동으로 뺀다.`;
const FORMAT = `- '## 답' 아래만 채운다. 앞부분(설명)은 지워도 되고 그대로 둬도 된다.
- 항목은 \`### 번호\` 로 시작한다. 칸은 \`칸: 값\` 한 줄씩. **빈칸(\`text:\` 처럼 값이 없는 줄)만 채우면 된다.**
- 미리 채워진 칸(on · kind · 효과 등)은 바꿔도 된다. 고를 수 있는 값은 위 '칸 설명'의 목록 — ID 를 써도, 이름을 써도 된다.
- 여러 줄 칸(line · text 목록)은 같은 칸 이름을 여러 번 쓴다. 선택지 같은 묶음 칸은 \`choice.t:\` 가 나올 때마다 새 선택지.
- \`//\` 로 시작하는 줄은 메모(무시). 항목을 더 쓰고 싶으면 \`### \` 블록을 복사해 더 붙여도 된다. 쓰기 싫은 항목은 비워 두면 건너뛴다.
- 자리 표시는 \`{p}\` 처럼 중괄호. 조사는 \`{p}은(는)\` \`{p}이(가)\` \`{p}을(를)\` 처럼 두 개를 같이 쓰면 게임이 맞춘다.`;

/* ---------- 값 읽기 ---------- */
function readField(f, raw, v, DB) {
  const empty = raw == null || (Array.isArray(raw) ? !raw.filter(x => String(x).trim()).length : String(raw).trim() === '');
  if (empty) return { skip: true };
  switch (f.type) {
    case 'text': return { val: String(raw).trim() };
    case 'texts': return { val: (Array.isArray(raw) ? raw : [raw]).map(x => String(x).trim()).filter(Boolean) };
    case 'enum': { const r = L.resolveEnum(raw, f.opts(DB)); return r === undefined ? { err: `${f.k}: 모르는 값 '${raw}'` } : { val: r }; }
    case 'enums': { const out = [], bad = []; String(raw).split(/[,，]/).map(x => x.trim()).filter(Boolean).forEach(x => { const r = L.resolveEnum(x, f.opts(DB)); if (r === undefined) bad.push(x); else out.push(r); }); return bad.length ? { err: `${f.k}: 모르는 값 ${bad.join(', ')}` } : { val: out }; }
    case 'num': { const n = L.num(raw); if (n === undefined) return { err: `${f.k}: 숫자가 아님 '${raw}'` }; if ((f.min != null && n < f.min) || (f.max != null && n > f.max)) return { err: `${f.k}: ${f.min}~${f.max} 사이` }; return { val: n }; }
    case 'bool': return { val: L.yes(raw) };
    case 'key': return /^[a-z][a-z0-9_.]*$/.test(String(raw).trim()) ? { val: String(raw).trim() } : { err: `${f.k}: 소문자 · 숫자 · 점만 (예: weather.rain)` };
    case 'req': { const r = L.parseReq(raw); return r.err ? { err: `${f.k}: ${r.err}` } : { val: r.req }; }
    case 'fx': { const r = L.parseFx(raw); return r.err ? { err: `${f.k}: ${r.err}` } : { val: r.fx }; }
    case 'check': { const m = String(raw).trim().match(/^(ABL_\w+|STAT_\w+)\s+(\d+)$/); if (!m) return { err: `${f.k}: 'ABL_A04 22' 꼴` }; if (!DB.abilities?.[m[1]] && !DB.baseStats?.[m[1]]) return { err: `${f.k}: 능력 ${m[1]} 없음` }; return { val: { attr: m[1], dc: +m[2] } }; }
    case 'range': { const m = String(raw).match(/(\d+)\D+(\d+)/); if (!m) return { err: `${f.k}: '20, 17' 꼴` }; let a = +m[1], b = +m[2]; if (a < b) [a, b] = [b, a]; if (a > 20 || b < 1) return { err: `${f.k}: 1~20 사이` }; return { val: [a, b] }; }
    case 'use': { const o = {}, bad = []; String(raw).split(',').map(x => x.trim()).filter(Boolean).forEach(t => { const m = t.match(/^(hp|mp|energy)\s*:\s*(\d+)$/), c = t.match(/^cure\s*:\s*(INJ_\w+)$/); if (m) o[m[1]] = +m[2]; else if (c && DB.injuryTypes?.[c[1]]) o.cure = c[1]; else bad.push(t); }); return bad.length ? { err: `${f.k}: 모르는 효과 ${bad.join(', ')}` } : { val: o }; }
  }
  return { val: raw };
}

/* ---------- 겹침 검사 준비: 기존 게임 내용 ---------- */
function dupSets(kind, DB) {
  const T = new L.Dup(0.72, 0.55), N = new L.Dup(0.999, 0.8);
  (kind.existing(DB) || []).forEach(e => { if (e.text) T.add(e.id, e.text, e.scope); if (e.name) N.add(e.id, e.name, e.scope); });
  return { T, N };
}

/* ---------- 검사 ---------- */
function examine(file, DB) {
  const txt = fs.readFileSync(file, 'utf8'), head = L.parseAnswer(txt, { list: [] });
  const kindId = opt('kind') || head.meta.kind; const kind = KINDS[kindId];
  if (!kind) die(`종류를 모름: '${kindId}'. 답 파일 맨 위(## 답 아래)에 'kind: story' 처럼 있어야 한다. 종류: ${Object.keys(KINDS).join(' · ')}`);
  const { meta, blocks } = L.parseAnswer(txt, kind);
  const { T, N } = dupSets(kind, DB), rules = VALIDATE.RULES.filter(([t]) => t === kind.table).map(x => x[1]);
  const fillKeys = [...kind.fields.filter(f => f.fill).map(f => f.k), ...Object.entries(kind.group || {}).flatMap(([g, F]) => F.filter(f => f.fill).map(f => g + '.' + f.k))];
  const res = [];
  for (const b of blocks) {
    const r = { no: b.no, line: b.line, err: [], warn: [], row: null };
    const filled = fillKeys.some(k => { const [g, s] = k.split('.'); if (s) return (b.g[g] || []).some(o => o[s] && String(o[s]).trim()); const x = b.f[k]; return Array.isArray(x) ? x.some(y => y.trim()) : x && String(x).trim(); });
    if (!filled) { r.empty = true; res.push(r); continue; }
    const v = {};
    for (const f of kind.fields) { const o = readField(f, b.f[f.k], v, DB); if (o.err) r.err.push(o.err); else if (!o.skip) v[f.k] = o.val; else if (f.need) r.err.push(`${f.k}: 비어 있음 (${f.label})`); }
    for (const [g, F] of Object.entries(kind.group || {})) v[g] = (b.g[g] || []).map((o, i) => { const c = {}; for (const f of F) { const x = readField(f, o[f.k], c, DB); if (x.err) r.err.push(`${g} ${i + 1}: ${x.err}`); else if (!x.skip) c[f.k] = x.val; else if (f.need) r.err.push(`${g} ${i + 1}: ${f.k} 비어 있음`); } return c; });
    /* 문장 검사 */
    const lintOne = (f, t, where, ctx) => { const o = L.lintText(t, f.lint || 'line', { ph: f.ph ? f.ph(ctx, DB) : [], need: f.needPh, len: f.len }); o.err.forEach(e => r.err.push(`${where}: ${e}`)); o.warn.forEach(w => r.warn.push(`${where}: ${w}`)); };
    for (const f of kind.fields) if ((f.type === 'text' || f.type === 'texts') && v[f.k] != null) [].concat(v[f.k]).forEach((t, i) => lintOne(f, t, f.k + ([].concat(v[f.k]).length > 1 ? ` ${i + 1}` : ''), v));
    for (const [g, F] of Object.entries(kind.group || {})) (v[g] || []).forEach((c, i) => F.forEach(f => { if (f.type === 'text' && c[f.k] != null) lintOne(f, c[f.k], `${g} ${i + 1}.${f.k}`, v); }));
    if (kind.check) r.err.push(...kind.check(v, DB));
    /* 겹침: 기존 게임 + 이 묶음 안 */
    for (const f of kind.fields) {
      if (!f.dup || v[f.k] == null) continue;
      for (const t of [].concat(v[f.k])) {
        if (f.dup === 'name') { const key = kind.nameKey && f.k === 'name' ? kind.nameKey(v) : t, [s, it] = N.best(key); if (L.norm(key) === it?.n || s >= 0.999) r.err.push(`겹침: 이름 '${t}' 이(가) 이미 있음 (${it.id})`); else if (s >= N.soft) r.warn.push(`비슷한 이름: '${t}' ↔ ${it.id} '${String(it.text).split('|')[0]}'`); }
        else { const [s, it] = T.best(t); if (s >= T.hard) r.err.push(`겹침 ${Math.round(s * 100)}%: 「${t.slice(0, 30)}」 ↔ ${it.id} 「${String(it.text).slice(0, 30)}」`); else if (s >= T.soft) r.warn.push(`비슷함 ${Math.round(s * 100)}%: ↔ ${it.id} 「${String(it.text).slice(0, 30)}」`); }
      }
    }
    /* 게임 검사 규칙 (engine/validate.js) 을 이 한 줄에 그대로 */
    if (!r.err.length) {
      let row; try { row = kind.make(v, DB); } catch (e) { r.err.push('행 만들기 실패: ' + e.message); }
      if (row) { row.id = `${kind.prefix}_CHECK`; rules.forEach(fn => { try { fn(row, DB).forEach(e => r.err.push('게임 규칙: ' + e)); } catch (e) { r.err.push('게임 규칙 오류: ' + e.message); } }); delete row.id; r.row = row; }
    }
    /* 통과하면 이 묶음 안 겹침 검사에 넣는다 */
    if (!r.err.length) for (const f of kind.fields) if (f.dup && v[f.k] != null) [].concat(v[f.k]).forEach(t => f.dup === 'name' ? N.add('#' + b.no, kind.nameKey && f.k === 'name' ? kind.nameKey(v) : t) : T.add('#' + b.no, t));
    res.push(r);
  }
  return { kind, meta, res };
}
function printReport({ kind, meta, res }) {
  const ok = res.filter(r => !r.empty && !r.err.length), bad = res.filter(r => r.err.length), empty = res.filter(r => r.empty);
  console.log(`[${kind.title}] 항목 ${res.length} · 통과 ${ok.length} · 걸림 ${bad.length} · 빈 칸 ${empty.length}${meta.by ? ' · 채운 사람 ' + meta.by : ''}`);
  for (const r of res) {
    if (r.empty) continue;
    if (r.err.length) { console.log(`  ✗ ### ${r.no} (${r.line}줄)`); r.err.forEach(e => console.log('      - ' + e)); }
    if (r.warn.length) { console.log(`  ${r.err.length ? ' ' : '⚠'} ### ${r.no} 확인해 볼 것`); r.warn.forEach(e => console.log('      · ' + e)); }
  }
  return ok;
}

/* ---------- 주문서 ---------- */
function order(kindId) {
  const kind = KINDS[kindId]; if (!kind) die(`종류: ${Object.keys(KINDS).join(' · ')}`);
  const DB = L.loadDB(), n = +opt('n') || 30, T = kind.targets(DB, n, { focus: opt('focus') === true ? '' : opt('focus'), goal: +opt('goal') || undefined });
  const out = [], P = s => out.push(s);
  const enumName = (f, val) => { if (!f.opts || val == null || val === '') return ''; const row = f.opts(DB).find(o => o[0] === val); return row ? row[1] : ''; };
  P(`# 콘텐츠 주문서 — ${kind.title} ${T.length}개`);
  P(`> 이 파일 하나만 보고 채울 수 있게 썼다. 사람이든 AI든 **맨 아래 '## 답'의 빈칸만 채워** 돌려주면 된다. 만든 날: ${today()} · 종류: \`${kind.id}\``);
  P('\n## 1. 이 게임'); P(WORLD);
  P('\n## 2. 무엇을 쓰나'); P(kind.about);
  P('\n## 3. 스타일 규칙'); P('공통:'); P(STYLE); P('\n이 종류:'); kind.rules.forEach(x => P('- ' + x));
  P('\n## 4. 칸 설명');
  const fieldDoc = (f, pre = '') => {
    P(`- \`${pre}${f.k}\` — ${f.label}${f.fill ? ' **← 채울 칸**' : ' (미리 정함 · 바꿔도 됨)'}${f.need ? ' · 꼭 필요' : ''}`);
    if (f.opts) { const all = f.opts(DB), used = new Set(T.map(t => pre ? null : t[f.k]).filter(Boolean)); const L2 = all.length > 40 ? all.filter(o => used.has(o[0])) : all;
      if (L2.length) P('  고를 수 있는 값: ' + L2.map(o => `\`${o[0] === '' ? '(비움)' : o[0]}\` ${o[1]}`).join(' · ') + (all.length > L2.length ? ` · 그 밖 ${all.length - L2.length}개 (ID 나 이름을 쓰면 도구가 찾는다)` : '')); }
  };
  kind.fields.forEach(f => fieldDoc(f)); Object.entries(kind.group || {}).forEach(([g, F]) => { P(`- 묶음 \`${g}.*\` (선택지 하나 = \`${g}.${kind.groups[g].first}:\` 부터 다음 \`${g}.${kind.groups[g].first}:\` 전까지):`); F.forEach(f => fieldDoc(f, g + '.')); });
  if (kind.fields.some(f => f.type === 'req')) P('\n조건(req) 짧은 문법 — `;` 로 여러 개: `rel=REL_FRIEND` · `money>=300000` · `money<=500000` · `time=19:00-05:00` · `noGuild` · `hasGuild` · `level>=10` · `rank<=15` · `age>=30` · `stress>=60` · `energy<=30` · `adult` · `known` · `close>=30` · `injured` · `weekday=0,6` · `tag=CT_URBAN`');
  if (kind.fields.some(f => f.type === 'fx') || Object.values(kind.group || {}).flat().some(f => f.type === 'fx')) P('\n효과(fx) 짧은 문법 — `,` 로 여러 개: `hp:-10` · `energy:-5` · `stress:+3` · `money:-30000` · `kills:1` · `stones:2` · `time:20`(분) · `party:-4` · `progress:1` · `rep:1` · `retreat` · `rel:close+4`(친밀 · like · trust · romance · rival · grudge · depend) · `emo:EM_JOY+8` · `injury:rand/INJ_CUT/1`(부위/종류/심각도 1~3)');
  /* 좋은 예 · 이미 있는 것 */
  const ex = (kind.existing(DB) || []).filter(e => e.text || e.name);
  P('\n## 5. 좋은 예 (게임에 이미 있는 것)'); ex.filter(e => e.text).slice(0, 6).forEach(e => P(`- ${e.text}`)); if (!ex.length) P('- (아직 없음 — 위 규칙대로 처음부터)');
  P('\n## 6. 이미 있는 것 — 이것과 비슷하게 쓰면 도구가 뺀다');
  const scopes = [...new Set(T.map(t => t.on || t.ev || t.when || t.cat || t.kind).filter(Boolean))];
  const byScope = {}; ex.forEach(e => { const k = e.scope || ''; (byScope[k] = byScope[k] || []).push(e); });
  if (ex.some(e => e.name)) P('이름: ' + ex.filter(e => e.name).map(e => String(e.name).split('|')[0]).slice(0, 300).join(' · '));
  const shown = new Set();
  (scopes.length ? scopes : ['']).forEach(sc => { const L3 = (byScope[sc] || []).filter(e => e.text); if (!L3.length) return; P(`- **${sc || '전체'}**`); L3.slice(0, 40).forEach(e => { shown.add(e); P(`  - ${e.text}`); }); });
  const rest = ex.filter(e => e.text && !shown.has(e)); if (rest.length && rest.length <= 120) { P('- **그 밖**'); rest.forEach(e => P(`  - ${e.text}`)); } else if (rest.length) P(`- 그 밖 ${rest.length}개는 생략 (도구가 자동으로 비교한다)`);
  P('\n## 7. 답 쓰는 법'); P(FORMAT);
  P('\n## 답'); P(`kind: ${kind.id}`); P('by: ');
  T.forEach((t, i) => {
    P(`\n### ${i + 1}`);
    const hint = kind.fields.filter(f => f.opts && t[f.k] != null && t[f.k] !== '').map(f => enumName(f, t[f.k])).filter(Boolean);
    const phf = kind.fields.find(f => f.fill && f.ph); const ph = phf ? phf.ph(t, DB) : [];
    P(`// ${hint.join(' · ')}${ph.length ? ` · 자리 표시: ${ph.map(x => '{' + x + '}').join(' ')}` : ''}`);
    for (const f of kind.fields) { const val = t[f.k]; if (f.show && !f.show(t)) continue; if (f.fill) { if (f.type === 'texts') { P(`${f.k}: `); P(`${f.k}: `); } else P(`${f.k}: `); } else if (val != null && val !== '') P(`${f.k}: ${val}`); }
    for (const [g, F] of Object.entries(kind.group || {})) (t[g] || []).forEach(c => F.forEach(f => { const val = c[f.k]; if (f.show && !f.show(c)) return; if (f.fill) P(`${g}.${f.k}: `); else if (val != null && val !== '') P(`${g}.${f.k}: ${val}`); }));
  });
  const dir = path.join(L.FILLDIR(), 'orders'); fs.mkdirSync(dir, { recursive: true });
  const file = path.join(dir, `${kind.id}-${today()}.md`); fs.writeFileSync(file, out.join('\n') + '\n');
  console.log(`주문서: ${path.relative(L.REPO, file)} (${T.length}개)\n이 파일을 그대로 사람이나 AI에게 주고, 돌려받은 파일로: node tools/fill/fill.js check <파일> → apply <파일>`);
}

/* ---------- 반영 ---------- */
function apply(file) {
  const DB = L.loadDB(), ex = examine(file, DB), ok = printReport(ex), kind = ex.kind;
  if (!ok.length) die('넣을 항목이 없다.');
  if (opt('dry')) { console.log(`(--dry) ${ok.length}개를 넣을 수 있다. 게임은 바꾸지 않았다.`); return; }
  const no = L.nextBatch(), NN = String(no).padStart(2, '0'), name = `fill_${NN}_${kind.id}.js`, dest = path.join(L.GAME(), 'data/ext', name);
  const rows = ok.map((r, i) => { let id = `${kind.prefix}_F${NN}${String(i + 1).padStart(3, '0')}`; return { id, ...r.row }; });
  rows.forEach(r => { if (DB[kind.table]?.[r.id]) die('ID 충돌: ' + r.id); });
  const by = ex.meta.by ? String(ex.meta.by).replace(/\*\//g, '') : '적지 않음';
  const body = `/* fill 묶음 ${NN} — ${kind.title} ${rows.length}개 · ${today()} · 채운 사람: ${by}
   tools/fill/fill.js apply 가 만든 파일 (원본: fill/done/${NN}_${kind.id}.md). 직접 고치지 말고, 빼려면: node tools/fill/fill.js undo ${no} */
def(${JSON.stringify(kind.table)}, [
${rows.map(r => '  ' + L.js(r) + ',').join('\n')}
]);
`;
  fs.writeFileSync(dest, body); L.listAdd(name);
  /* 검사 규칙 중 상태를 가진 것(같은 이름 찾기 등)이 위 미리 검사의 흔적을 갖고 있지 않게 새로 읽는다 */
  delete require.cache[require.resolve('../../game/engine/validate.js')]; delete require.cache[require.resolve('../validate_data.js')];
  const v = require('../validate_data.js').validate();
  if (v.errs.length) { fs.unlinkSync(dest); L.listDel(name); console.log('게임 검사에서 걸려 되돌렸다:'); v.errs.slice(0, 30).forEach(e => console.log('  ✗ ' + e)); process.exit(1); }
  const done = path.join(L.FILLDIR(), 'done'); fs.mkdirSync(done, { recursive: true }); fs.copyFileSync(file, path.join(done, `${NN}_${kind.id}.md`));
  console.log(`\n반영: 묶음 ${NN} · ${rows.length}개 → game/data/ext/${name} (data/ext/_list.js 에 등록). 게임 검사 통과.`);
  console.log(`빼려면: node tools/fill/fill.js undo ${no}`);
}

/* ---------- 명령 ---------- */
if (cmd === 'list') {
  const DB = L.loadDB();
  console.log('종류         | 넣는 곳          | 지금 개수 | 설명');
  for (const k of Object.values(KINDS)) console.log(`${k.id.padEnd(12)} | ${k.table.padEnd(16)} | ${String(k.count ? k.count(DB) : V(DB, k.table).length).padStart(7)} | ${k.title}`);
  console.log('\n주문서: node tools/fill/fill.js order <종류> [--n 30] · 빈 곳 보고: node tools/report_content.js');
} else if (cmd === 'order') order(args[1]);
else if (cmd === 'check') { if (!args[1]) die('파일을 알려 줘'); printReport(examine(args[1], L.loadDB())); }
else if (cmd === 'apply') { if (!args[1]) die('파일을 알려 줘'); apply(args[1]); }
else if (cmd === 'batches') { const B = L.batches(); if (!B.length) console.log('넣은 묶음 없음'); B.forEach(b => { const s = fs.readFileSync(path.join(L.GAME(), 'data/ext', b.file), 'utf8'); console.log(`${String(b.no).padStart(2, '0')} · ${b.kind} · ${(s.match(/^  \{/gm) || []).length}개 · ${(s.match(/채운 사람: ([^\n]*)/) || [])[1] || ''}`); }); }
else if (cmd === 'undo') { const no = +args[1], b = L.batches().find(x => x.no === no); if (!b) die('그 묶음이 없다'); fs.unlinkSync(path.join(L.GAME(), 'data/ext', b.file)); L.listDel(b.file); console.log(`묶음 ${String(no).padStart(2, '0')} (${b.kind}) 을 게임에서 뺐다.`); }
else console.log(fs.readFileSync(__filename, 'utf8').split('\n').slice(1, 14).join('\n').replace(/^\/\* =+|^ +=+ \*\/$/gm, ''));
