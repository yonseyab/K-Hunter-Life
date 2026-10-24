/* =========================================================
   tools/report_content.js — 콘텐츠 커버리지 · 중복 보고 (2026-10-24 기반 작업)
   validate_data.js 가 '틀렸나'를 본다면, 이건 '얼마나 찼나 · 어디가 비었나 · 겹치나'를 본다. 오류로 끝나지 않는다 (보고만).
   실행: node tools/report_content.js            → 화면에 요약
         node tools/report_content.js --md out.md → 마크다운 파일로도
         node tools/report_content.js --min 5     → '부족' 기준 (기본: 이야기 문장 5줄)
   새 콘텐츠를 많이 넣은 뒤 이걸 돌려 빈 곳부터 채운다.
   ========================================================= */
const fs = require('fs');
const { load } = require('./validate_data.js');
const args = process.argv.slice(2), MIN = +(args[args.indexOf('--min') + 1] || 0) || 5, MD = args.includes('--md') ? args[args.indexOf('--md') + 1] : null;
const { DB } = load();
const V = t => Object.values(DB[t] || {});
const out = [];
const h = s => out.push('\n## ' + s);
const line = s => out.push(s);
const count = (L, f) => L.reduce((m, r) => { (Array.isArray(f(r)) ? f(r) : [f(r)]).forEach(k => m.set(k, (m.get(k) || 0) + 1)); return m; }, new Map());
const table = (rows, head) => { line('| ' + head.join(' | ') + ' |'); line('|' + head.map(() => '---').join('|') + '|'); rows.forEach(r => line('| ' + r.join(' | ') + ' |')); };
const short = (L, n = 12) => L.length > n ? L.slice(0, n).join(', ') + ` … 외 ${L.length - n}` : L.join(', ') || '없음';

line('# 콘텐츠 보고 (' + new Date().toISOString().slice(0, 10) + ')');
line(`테이블 ${Object.keys(DB).length}개 · 행 ${Object.values(DB).reduce((a, t) => a + Object.keys(t).length, 0)}개 · '부족' 기준 ${MIN}`);

/* 1. 테이블 크기 — 큰 순서 + 비어 있는 테이블 */
h('테이블 크기');
const sizes = Object.entries(DB).map(([k, t]) => [k, Object.keys(t).length]).sort((a, b) => b[1] - a[1]);
line('큰 것: ' + sizes.slice(0, 15).map(([k, n]) => `${k} ${n}`).join(' · '));
line('비어 있음: ' + short(sizes.filter(([, n]) => !n).map(([k]) => k), 40));

/* 2. 이야기 문장 커버리지 */
h('이야기 문장 (storyLines) — 발동 시점별');
const SL = count(V('storyLines'), r => r.on);
const want = [
  ...V('actions').map(a => 'act:' + a.id),
  ...V('emotions').map(e => 'emo:' + e.id), 'emo:calm',
  ...['enter', 'zone', 'fight', 'hurt', 'heal', 'stone', 'boss', 'win', 'lose', 'retreat'].map(x => 'raid:' + x),
  'day:start', 'day:end', 'day:plan', 'move', 'meet', 'farewell', 'old', 'prologue', 'world:news', 'world:rumor',
  ...V('placeTypes').map(p => 'small:' + p.id),
];
const lack = want.map(k => [k, SL.get(k) || 0]).filter(([, n]) => n < MIN);
line(`살펴본 시점 ${want.length}개 중 ${MIN}줄 미만 ${lack.length}개`);
line('0줄: ' + short(lack.filter(([, n]) => !n).map(([k]) => k), 30));
line('1~' + (MIN - 1) + '줄: ' + short(lack.filter(([, n]) => n).map(([k, n]) => `${k}(${n})`), 30));

/* 3. 이벤트 · 위기 */
h('이벤트 · 위기');
const ev = V('events');
line(`이벤트 ${ev.length}개 — 채널: ` + [...count(ev, e => e.ch || '—')].map(([k, n]) => `${k} ${n}`).join(' · '));
line('멈춤 종류(kind): ' + V('stopKinds').map(k => `${k.name} ${ev.filter(e => e.kind === k.id).length}`).join(' · '));
line('세계 사건(on): ' + ([...count(ev.filter(e => e.on), e => e.on)].map(([k, n]) => `${k} ${n}`).join(' · ') || '없음'));
line('위기(crises) when: ' + [...count(V('crises'), c => c.when)].map(([k, n]) => `${k} ${n}`).join(' · '));

/* 4. 성좌 */
h('성좌');
const SM = count(V('starMessages'), m => m.on);
line('메시지(때별): ' + V('starMsgEvents').map(e => `${e.name} ${SM.get(e.id) || 0}`).join(' · '));
line(`축복 ${V('starBlessings').length} · 정해진 성좌 ${V('starPresets').length} · NPC 성좌 ${V('constellations').length} · 업적 ${V('achievements').length} · 선물 안배 문장 ${V('giftCovers').length}`);

/* 5. 클래스 · 스킬 · 장비 · 몬스터 */
h('클래스 · 스킬 · 장비 · 몬스터');
const cls = V('classes').filter(c => !c.old);
line('클래스 갈래: ' + [...count(cls, c => DB.classCats?.[c.cat]?.name || c.cat)].map(([k, n]) => `${k} ${n}`).join(' · '));
const used = new Set(cls.flatMap(c => [...(c.pool || []), ...(c.passive || []), ...(c.learn || []).map(l => l.skill)]));
const orphan = V('skills').filter(s => s.scope === 'class' && !used.has(s.id));
line(`클래스 스킬 중 어느 클래스에도 안 붙은 것 ${orphan.length}개: ` + short(orphan.map(s => s.name)));
const gear = V('items').filter(i => i.slot);
const grades = V('itemGrades');
table(V('equipSlots').map(sl => [sl.name, ...grades.map(g => gear.filter(i => i.slot === sl.id && i.grade === g.id).length)]), ['칸', ...grades.map(g => g.name)]);
line('물건 갈래: ' + V('itemCats').map(c => `${c.name} ${V('items').filter(i => i.cat === c.id).length}`).join(' · '));
const mons = V('monsters');
line(`몬스터 ${mons.length} — 갈래: ` + ([...count(mons, m => DB.monsterCats?.[m.cat]?.name || m.cat)].map(([k, n]) => `${k} ${n}`).join(' · ') || '없음'));
const rk = count(mons, m => m.rank || '—');
line('몬스터 등급별: ' + V('ranks').map(r => `${r.name} ${rk.get(r.id) || 0}`).join(' · '));

/* 6. 장소 */
h('장소');
const places = V('places');
line(`이름 있는 장소 ${places.length} · 장소 종류 ${V('placeTypes').length} · 지역 ${V('regions').length}`);
const pr = new Set(places.map(p => p.region));
line(`이름 있는 장소가 하나도 없는 지역 ${V('regions').filter(r => !pr.has(r.id)).length}개`);

/* 7. 꼬리표 · 빈칸 재료 */
h('꼬리표 · 빈칸 문장 재료');
const allRows = Object.entries(DB).flatMap(([t, T]) => Object.values(T).map(r => [t, r]));
const ctUse = count(allRows.filter(([, r]) => r.ctags), ([, r]) => r.ctags);
line('공통 꼬리표 쓰임: ' + V('contentTags').map(t => `${t.name} ${ctUse.get(t.id) || 0}`).join(' · '));
const keys = new Set(V('textBits').map(b => b.key)), refs = new Set();
allRows.forEach(([, r]) => JSON.stringify(r).replace(/\{@([a-z][a-z0-9_.]*)\}/g, (m, k) => refs.add(k)));
line('문장에서 부르는데 재료가 없는 {@key}: ' + short([...refs].filter(k => !keys.has(k))));
line('재료는 있는데 아무도 안 부르는 key: ' + short([...keys].filter(k => !refs.has(k))));

/* 8. 겹침 — 띄어쓰기 · 문장부호를 지우고 같은 문장, 같은 이름 */
h('겹침 (거의 같은 문장 · 같은 이름)');
const norm = s => String(s || '').replace(/[\s.,!?·…'"“”‘’~\-—()[\]]/g, '');
const texts = [];
V('storyLines').forEach(r => texts.push([r.id, r.text]));
V('events').forEach(r => (r.lines || []).forEach(t => texts.push([r.id, t])));
V('crises').forEach(r => texts.push([r.id, r.text]));
V('hearTexts').forEach(r => texts.push([r.id, r.text]));
V('giftCovers').forEach(r => texts.push([r.id, r.text]));
const seen = new Map(), dupT = [];
texts.forEach(([id, t]) => { const k = norm(t); if (k.length < 6) return; if (seen.has(k) && seen.get(k) !== id) dupT.push(`${seen.get(k)} = ${id} 「${String(t).slice(0, 24)}」`); else seen.set(k, id); });
line(`거의 같은 문장 ${dupT.length}쌍` + (dupT.length ? ':\n- ' + dupT.slice(0, 20).join('\n- ') : ''));
const nm = new Map(), dupN = [];
['items', 'classes', 'skills', 'monsters', 'places', 'traits'].forEach(t => V(t).forEach(r => { if (!r.name || r.old) return; const k = t + '|' + r.name; if (nm.has(k)) dupN.push(`${t}: ${r.name} (${nm.get(k)} · ${r.id})`); else nm.set(k, r.id); }));
line(`같은 테이블 안 같은 이름 ${dupN.length}개` + (dupN.length ? ':\n- ' + dupN.slice(0, 20).join('\n- ') : ''));

const txt = out.join('\n');
console.log(txt);
if (MD) { fs.writeFileSync(MD, txt + '\n'); console.log('\n→ ' + MD); }
