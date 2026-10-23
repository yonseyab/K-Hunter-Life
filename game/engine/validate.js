/* =========================================================
   engine/validate.js — 데이터 검증 규칙 (브라우저 개발 도구 · node tools/validate_data.js 공용)
   1) 중복 ID  2) 없는 ID 참조 (값 · 객체 키)  3) 테이블별 규칙 RULES
   ========================================================= */
(function (root) {
/* 게임 중 생기거나 파일로만 있는 ID: 존재 검사를 하지 않는다 */
const RUNTIME = ['POR', 'CREST', 'PP', 'NW', 'PG', 'GD_P', 'GT_G', 'NP_G', 'HN_G', 'HN_L', 'HN_A', 'AR', 'SYS', 'GRP', 'ME', 'MEM', 'VOICE_ASSET'];
const ID_RE = /^[A-Z][A-Z0-9]*(_[A-Z0-9]+)+$/;
const prefixOf = id => id.split('_')[0];

/* 이벤트 발동 조건(req) 검사: 종류(k)와 커마 조건의 필수 값 (index.html checkReq · checkCC 와 같은 목록) */
const REQ_K = ['time','slot','trait','density','rel','relStat','known','family','money','at','inRegion','romanceAny','spouseAny','homeIn','guildMaster','rep','hasGuild','noGuild','guildNot','all','any','not','energy','stress','sleepDebt','injured','relDim','relStatus','level','rankMax','cleared','item','weekday','flag','memory','noFlag',
  'look','lookNum','bmi','bg','pers','sex','age','basic','lang','cls',
  /* K-Hunter-Life: 세 층 원칙 · 감정 · 자기 인식 · 성인 · 장소 */
  'looks','emo','self','adult','place'];
function reqErrs(q, DB, where) {
  if (!q || typeof q !== 'object') return [`${where}: 조건 형식`];
  if (!REQ_K.includes(q.k)) return [`${where}: 모르는 조건 k=${q.k}`];
  const o = [];
  if (q.k === 'all' || q.k === 'any') (q.of || []).forEach((x, i) => o.push(...reqErrs(x, DB, `${where}.${q.k}[${i}]`)));
  if (q.k === 'not') o.push(...reqErrs(q.q, DB, where + '.not'));
  if (q.k === 'look' && (!DB.ccLook?.[q.item] || !Array.isArray(q.in))) o.push(`${where}: look 은 item(LK_) · in[] 필요`);
  if (q.k === 'lookNum' && !DB.ccLook?.[q.item]?.slider) o.push(`${where}: lookNum 은 슬라이더 항목(키 · 체중 등)만`);
  if (q.k === 'bg' && (!DB.bgItems?.[q.item] || !Array.isArray(q.in))) o.push(`${where}: bg 는 item(BI_) · in[] 필요`);
  if (q.k === 'pers' && !DB.ccPersonality?.[q.axis]) o.push(`${where}: pers 는 axis(PX_) 필요`);
  if (q.k === 'sex' && !['남', '여'].includes(q.v)) o.push(`${where}: sex 는 v '남' · '여'`);
  if (q.k === 'basic' && !['blood', 'hand', 'nation', 'bplace', 'langMain', 'voice', 'speech'].includes(q.key)) o.push(`${where}: basic key 값`);
  if (['lookNum', 'bmi', 'pers', 'age'].includes(q.k) && q.min == null && q.max == null) o.push(`${where}: min 또는 max 필요`);
  if (q.k === 'looks' && (!DB.lookScores?.[q.aspect] || (q.min == null && q.max == null))) o.push(`${where}: looks 는 aspect(APS_) · min/max 필요`);
  if (q.k === 'emo' && (!DB.emotions?.[q.id] || (q.min == null && q.max == null))) o.push(`${where}: emo 는 id(EM_) · min/max 필요`);
  if (q.k === 'self' && (!['looks', 'skill', 'money', 'belong'].includes(q.aspect) || (q.min == null && q.max == null))) o.push(`${where}: self 는 aspect(looks·skill·money·belong) · min/max 필요`);
  if (q.k === 'place' && (!Array.isArray(q.in) || q.in.some(x => !DB.placeTypes?.[x]))) o.push(`${where}: place 는 in[PT_] 필요`);
  if (q.who && q.who !== 'tgt') o.push(`${where}: who 는 'tgt' 만`);
  return o;
}
/* 세 층 원칙 (REBUILD_PLAN 2장): 캐릭터에 대해 단정하는 사실(asserts)은 반드시 조건(req)에 같은 사실이 있어야 한다.
   같은 종류(k) · 같은 대상 키(aspect · item · axis · id · key · who)이고, 조건 범위가 단정 범위 안에 들어야 한다 */
const ASSERT_KEYS = ['aspect', 'item', 'axis', 'id', 'key', 'who', 'type', 'dim', 'v'];
function reqFlat(req) { const out = []; (req || []).forEach(q => { if (q && q.k === 'all') out.push(...reqFlat(q.of)); else out.push(q); }); return out; }
function implies(q, a) {
  if (!q || q.k !== a.k) return false; if (ASSERT_KEYS.some(k => (a[k] ?? null) !== (q[k] ?? null))) return false;
  if (a.min != null && !(q.min != null && q.min >= a.min)) return false; if (a.max != null && !(q.max != null && q.max <= a.max)) return false;
  if (a.in && !(Array.isArray(q.in) && q.in.every(x => a.in.includes(x)))) return false;
  return true;
}
function assertErrs(row, DB, where) {
  const o = [], A = row.asserts; if (A == null) return o; if (!Array.isArray(A)) return [`${where}: asserts 는 배열`];
  const R = reqFlat(row.req);
  A.forEach((a, i) => { o.push(...reqErrs(a, DB, `${where} asserts[${i}]`)); if (!R.some(q => implies(q, a))) o.push(`${where}: asserts[${i}] (${a.k}${a.aspect ? ' ' + a.aspect : ''}) 이(가) req 에 없음 — 사실과 반대되는 서술이 나올 수 있음`); });
  return o;
}
/* 외모 · 형편을 단정하는 말이 있는데 asserts 가 없으면 오류 (noAssert:true 로 예외 — 다른 인물 이야기일 때) */
const ASSERT_WORDS = /잘생|예쁘|미인|미남|못생|추남|추녀|뚱뚱|비만|말라깽이|키가 크|키가 작|부자|가난|몸매/;
function assertWordErrs(row, texts, where) { if (row.noAssert || (row.asserts || []).length) return []; return texts.some(t => ASSERT_WORDS.test(String(t || ''))) ? [`${where}: 외모 · 형편을 단정하는 문장에 asserts 가 없음`] : []; }
/* 테이블별 규칙: [테이블, 행 검사 함수(row, DB) → 문제 문자열 배열] */
/* 위기 선택지 성향 (자동 공략이 방침에 따라 고를 때 쓴다, 2026-10-23): safe 안전 · careful 신중(판정 있지만 위험 낮음) · bold 정면 돌파 · greedy 전리품 · team 동료 협력 · escape 후퇴 */
const CR_STYLE = ['safe', 'careful', 'bold', 'greedy', 'team', 'escape'];
const RULES = [
  ['actions', (a, DB) => [
    ...((a.durs||[]).some(n=>!Number.isFinite(n)||n<=0||n>1440) ? ['durs 는 1~1440분 숫자'] : []),
    ...['pay','energy','stress'].filter(k=>a[k]!=null&&!Number.isFinite(a[k])).map(k=>k+' 는 유한한 숫자'),
    ...(a.ai?.base!=null&&!Number.isFinite(a.ai.base)?['ai.base 는 유한한 숫자']:[]),
    ...(a.routineOnly?(a.req||[]).filter(q=>!['hasGuild','noGuild','startBetween','money','injured','adultTarget','notFamily','notDating','dating','targetFree','hasJob','guildMaster','engaged','notCohabit','homeStorage'].includes(q.k)).map(q=>'일과에서 지원하지 않는 조건 '+q.k):[]),
    ...('routineOnly' in a && typeof a.routineOnly!=='boolean' ? ['routineOnly 는 boolean'] : []),
    ...(a.routineOnly && (!a.ai || !(a.show||[]).includes('schedule') || a.hidden || a.target || a.special) ? ['routineOnly 는 대상·특수 행동이 없는 schedule · ai 행동만 가능'] : []),
    ...Object.entries(a.ai?.goal||{}).filter(([id,w])=>!DB.aiGoals[id]||!Number.isFinite(w)).map(([id])=>'ai.goal 값 확인 '+id),
    ...Object.entries(a.ai?.need||{}).filter(([id,w])=>!DB.aiNeeds[id]||!Number.isFinite(w)).map(([id])=>'ai.need 값 확인 '+id),
    ...(a.cat && !DB.actionCats[a.cat] ? [`cat ${a.cat} 없음`] : []),
    ...(!a.hidden && !(a.durs || []).length ? ['durs 비어 있음'] : []),
    ...((a.train || []).filter(g => !DB.ablGroups[g]).map(g => `train ${g} 없음`)),
  ]],
  ['aiJobs', (j, DB) => (j.keys || []).filter(k => !DB.abilities[k]).map(k => `keys ${k} 없음`)],
  ['classes', (c, DB) => [...(c.pool || []).filter(k => !DB.skills[k]).map(k => `pool ${k} 없음`), ...(c.role && !DB.roles[c.role] ? [`role ${c.role} 없음`] : [])]],
  ['gates', (g, DB) => [...(!DB.ranks[g.rank] ? [`rank ${g.rank} 없음`] : []), ...(g.mon && !DB.monsters[g.mon] ? [`mon ${g.mon} 없음`] : []), ...(!DB.regions[g.region] ? [`region ${g.region} 없음`] : [])]],
  ['hunters', (h, DB) => [...(!DB.ranks[h.rank] ? [`rank ${h.rank} 없음`] : []), ...(h.level < 1 ? ['level < 1'] : []), ...Object.entries(h.abl || {}).filter(([k, v]) => !DB.abilities[k] || v < 1 || v > 20).map(([k, v]) => `abl ${k}=${v}`)]],
  ['balance', (b) => (b.proto !== true ? ['proto:true 표시 없음 ([prototype_default])'] : [])],
  /* 외주 데이터용 규칙 (docs/outsource) */
  ['events', (e, DB) => { const o = [], ON = ['npcInjured', 'npcRaidWin', 'npcRankUp', 'npcDied', 'npcAwaken', 'career:promo', 'career:fired', 'career:hired', 'career:grad', 'career:boom', 'career:slump'];
    if (!['alert', 'msg'].includes(e.ch)) o.push('ch 는 alert · msg'); if (e.ch === 'msg' && (!e.to || !(e.lines || []).length)) o.push('msg 는 to · lines 필요'); if (e.ch === 'alert' && (!e.from || !e.body)) o.push('alert 는 from · body 필요');
    if (e.on && !ON.includes(e.on)) o.push('on 값이 잘못됨: ' + e.on); if (e.on === 'npcDied' && e.ch !== 'alert') o.push('npcDied 는 alert 로');
    if (!e.subj) o.push('subj 없음'); if (!Array.isArray(e.req)) o.push('req 배열 없음'); else e.req.forEach((q, i) => o.push(...reqErrs(q, DB, `req[${i}]`)));
    const C = e.choices || []; if (C.length < 1 || C.length > 4) o.push('선택지는 1~4개');
    C.forEach((c, i) => { if (!c.t || !c.ok) o.push(`선택지 ${i + 1}: t · ok 필요`); if (c.check) { if (!(c.check.dc >= 10 && c.check.dc <= 30)) o.push(`선택지 ${i + 1}: dc 범위 10~30`); if (!c.ng) o.push(`선택지 ${i + 1}: 판정이 있으면 ng 필요`); }
      (c.tags || []).forEach(t => { if (!DB.mindTags?.[t]) o.push(`선택지 ${i + 1}: 태그 ${t} 없음`); }); (c.req || []).forEach((q, j) => o.push(...reqErrs(q, DB, `선택지 ${i + 1} req[${j}]`))); });
    if (C.length > 1 && C.every(c => c.check)) o.push('판정 없는 선택지가 하나는 있어야 함');
    if (e.kind && !DB.stopKinds?.[e.kind]) o.push('kind 는 stopKinds(SK_) 중 하나');
    o.push(...assertErrs(e, DB, 'asserts'), ...assertWordErrs(e, [e.body, e.subj, ...(e.lines || []), ...C.flatMap(c => [c.t, c.ok, c.ng])], '문장')); return o; }],
  ['crises', (c, DB) => { const o = []; if (!['fight', 'any', 'boss'].includes(c.when)) o.push('when 은 fight · any · boss'); const C = c.choices || [];
    if (C.length < 2 || C.length > 4) o.push('선택지는 2~4개'); if (!C.some(x => !x.check)) o.push('판정 없는 선택지가 하나는 있어야 함');
    (c.tags || []).forEach(t => { if (!DB.mindTags?.[t]) o.push(`태그 ${t} 없음`); });
    C.forEach((x, i) => { (x.tags || []).forEach(t => { if (!DB.mindTags?.[t]) o.push(`선택지 ${i + 1}: 태그 ${t} 없음`); }); if (x.check && !(x.check.dc >= 10 && x.check.dc <= 30)) o.push(`선택지 ${i + 1}: dc 범위`); if (x.check && !x.ng) o.push(`선택지 ${i + 1}: ng 필요`); if (x.style != null && !CR_STYLE.includes(x.style)) o.push(`선택지 ${i + 1}: style 은 ${CR_STYLE.join(' · ')}`); }); return o; }],
  /* K-Hunter-Life 새 테이블 */
  ['storyLines', (l, DB) => { const o = [], ON = /^(act:ACT_[A-Z0-9_]+|cat:ACC_[A-Z]+|move|small:(any|TRAVEL|PT_[A-Z]+)|meet|react:(looksHi|looksLo|jealous)|raid:(enter|zone|fight|hurt|heal|stone|boss|win|lose|retreat)|emo:(EM_[A-Z]+|calm)|day:(start|end|plan)|decide:(raid|rest|again|stop)|retro:MS_[A-Z_]+|farewell|old|prologue|world:(news|rumor))$/;
    if (!ON.test(l.on || '')) o.push('on 값이 잘못됨: ' + l.on); if (!l.text) o.push('text 필요'); if (![1, 2, 3].includes(l.lv ?? 2)) o.push('lv 는 1 · 2 · 3');
    const m = /^(act|cat|emo|retro|small):(.+)$/.exec(l.on || ''); if (m) { const id = m[2], T = { act: 'actions', cat: 'actionCats', emo: 'emotions', retro: 'milestoneTypes', small: 'placeTypes' }[m[1]]; if (!['any', 'TRAVEL', 'calm'].includes(id) && !DB[T]?.[id]) o.push(`on 의 ${id} 없음`); }
    (l.req || []).forEach((q, i) => o.push(...reqErrs(q, DB, `req[${i}]`))); o.push(...assertErrs(l, DB, 'asserts'), ...assertWordErrs(l, [l.text], 'text'));
    if (l.fx) Object.keys(l.fx).filter(k => !['stress', 'energy', 'money', 'emo', 'rel'].includes(k)).forEach(k => o.push('fx 에 쓸 수 없는 키 ' + k)); return o; }],
  ['mindTags', (t, DB) => Object.keys(t.w || {}).filter(k => { const [a, b] = k.split(':'); return a === 'px' ? !DB.ccPersonality[b] : a === 'emo' ? !DB.emotions[b] : a === 'st' ? !['hpLow', 'energyLow', 'stressHigh', 'moneyLow', 'injured', 'sleepy'].includes(b) : a === 'self' ? !['looks', 'skill', 'money', 'belong'].includes(b) : a === 'pol' ? !['risk', 'money', 'team', 'rest'].includes(b) : true; }).map(k => '재료 키 ' + k)],
  ['mindWhy', (w) => [...(![1, -1].includes(w.sign) ? ['sign 은 1 · -1'] : []), ...(!w.text ? ['text 필요'] : [])]],
  ['emoTriggers', (t, DB) => Object.keys(t.fx || {}).filter(k => !DB.emotions[k]).map(k => '감정 ' + k + ' 없음')],
  ['styleTags', (s, DB) => (s.tags || []).filter(t => !DB.mindTags[t]).map(t => '태그 ' + t + ' 없음')],
  ['ccNations', (n, DB) => (n.state && !DB.nationStates?.[n.state] ? ['state 는 nationStates(NS_) 중 하나'] : [])],
  ['traits', (t) => [...(!(t.cost >= -4 && t.cost <= 4) ? ['cost 는 -4~4'] : []), ...(!t.name || !t.desc ? ['name · desc 필요'] : [])]],
  ['items', (it, DB) => [...(it.use ? Object.keys(it.use).filter(k => !['mp', 'hp', 'energy', 'cure'].includes(k)).map(k => 'use 에 쓸 수 없는 키 ' + k) : []), ...(!('price' in it) ? ['price 필요 (값을 매길 수 없으면 null)'] : []),
    ...(it.slot && (typeof it.req !== 'object' || it.req === null) ? ['착용 장비는 req 필요 (조건이 없으면 {})'] : []), ...Object.keys(it.req || {}).filter(k => k !== 'lv' && !DB.baseStats[k]).map(k => 'req 에 쓸 수 없는 키 ' + k)]],
  ['sysShop', (x) => (!(x.coin >= 1) ? ['coin(코인 가격) 필요'] : [])],
  ['skills', (k) => [...(!['class', 'common'].includes(k.scope) ? ['scope 는 class · common'] : []), ...(!['액티브', '패시브'].includes(k.kind) ? ['kind 는 액티브 · 패시브'] : [])]],
  ['hearTexts', (h) => [...(!['npcInjured', 'npcRaidWin', 'npcRankUp', 'npcDied', 'npcAwaken', 'career:promo', 'career:fired', 'career:hired', 'career:grad', 'career:boom', 'career:slump', 'guildSign', 'guildLeave'].includes(h.on) ? ['on 값이 잘못됨: ' + h.on] : []), ...(!h.text || !h.text.includes('{a}') ? ['text 에 {a} 필요'] : [])]],
  ['gateInteriors', (g) => (!g.name ? ['name 필요'] : [])],
  ['gatePlacePool', (p, DB) => [...(!DB.regions[p.region] ? [`region ${p.region} 없음`] : []), ...(!(p.n > 0) ? ['n 없음'] : []), ...(!/^pool\/pl_[A-Z]+\.js$/.test(p.file || '') ? ['file 은 pool/pl_<시도>.js'] : [])]],
  ['regions', (r) => [...(!Array.isArray(r.geo) || r.geo.length !== 2 ? ['geo [경도, 위도] 필요'] : []), ...(!r.prov ? ['prov(시도 지도 키) 필요'] : [])]],
  ['objectives', (o) => [...(!['long', 'mid', 'short'].includes(o.term) ? ['term'] : []), ...(o.term === 'short' && !o.days ? ['단기는 days 필요'] : []), ...(!['rank', 'level', 'money', 'rep', 'cleared', 'raids', 'trainHours', 'social', 'stressBelow', 'req'].includes(o.measure) ? ['measure 값'] : [])]],
];

function check(DB, dup) {
  const errs = [...(dup || [])], warns = [];
  const ids = new Set(), prefixes = new Set();
  for (const t of Object.values(DB)) for (const id of Object.keys(t)) { ids.add(id); prefixes.add(prefixOf(id)); }
  const skip = id => RUNTIME.some(p => id === p || id.startsWith(p + '_') || id.startsWith(p));
  const check = (id, where) => { if (!ID_RE.test(id) || skip(id)) return; if (!prefixes.has(prefixOf(id))) return; if (!ids.has(id)) errs.push(`${where}: 없는 ID ${id}`); };
  const walk = (v, where, depth) => {
    if (depth > 8 || v == null) return;
    if (typeof v === 'string') return check(v, where);
    if (Array.isArray(v)) return v.forEach((x, i) => walk(x, `${where}[${i}]`, depth + 1));
    if (typeof v === 'object') for (const [k, x] of Object.entries(v)) { check(k, `${where}.${k}(키)`); walk(x, `${where}.${k}`, depth + 1); }
  };
  for (const [tn, t] of Object.entries(DB)) for (const [id, row] of Object.entries(t)) for (const [k, v] of Object.entries(row)) if (k !== 'id') walk(v, `${tn}.${id}.${k}`, 0);
  for (const [tn, fn] of RULES) for (const [id, row] of Object.entries(DB[tn] || {})) for (const p of fn(row, DB)) errs.push(`${tn}.${id}: ${p}`);
  const rows = Object.values(DB).reduce((a, t) => a + Object.keys(t).length, 0);
  return { errs, warns, stats: { tables: Object.keys(DB).length, rows } };
}

  root.VALIDATE = { check, RULES, RUNTIME, reqErrs, REQ_K, assertErrs, implies };
})(typeof window !== 'undefined' ? window : globalThis);
