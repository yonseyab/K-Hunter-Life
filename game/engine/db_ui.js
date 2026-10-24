/* =========================================================
   engine/db_ui.js — DB 화면 (2026-10-24). 탭 8개: 인물 · 게이트 · 몬스터 · 장비 · 장소 · 기타 · 클래스 · 스킬
   탭마다 목록(검색 · 정렬) + 분류 칩 + 오른쪽 상세. 분류 칩은 사용자가 고친다:
     어떤 기준으로 나눌지(분류 기준) · 어떤 칩을 보일지(숨기기). 설정은 SETTINGS.dbView[탭] 에 남는다 (세이브와 상관없이 유지)
   탭 정의 T: rows() 항목 목록 · id(e) · name(e) · q(e) 검색 글 · F 필드 {키: {n 이름, v(e) 값(글 · 글 목록), s(e) 정렬 값, g 분류 가능}}
             cols 목록 열 [필드 키] · sort 기본 정렬 [키, 1|-1] · group 기본 분류 기준 · detail(e) 상세 HTML
   클릭: data-dbx-* (이 파일이 받는다). 상세 안의 data-item · data-hunter · data-gate 는 본편이 받는다
   ========================================================= */
const DB_UI = (() => {
  const MAX = 600;  /* 목록에 한 번에 그리는 줄 */
  const STAT = { atk: '공격', mag: '마력', def: '방어', res: '저항', spd: '속도', acc: '명중', eva: '회피', crit: '치명' };
  const nm = (t, id) => DB[t]?.[id]?.name || '';
  const kv = rows => `<dl class="dbx-kv">${rows.filter(r => r && r[1] != null && r[1] !== '').map(([k, v]) => `<dt>${k}</dt><dd>${v}</dd>`).join('')}</dl>`;
  const sec = (title, body) => body ? `<div class="dbx-sec"><div class="dbx-st">${title}</div>${body}</div>` : '';
  const chips = (L, cls = '') => L.length ? `<div class="chips">${L.join('')}</div>` : '';
  const go = (tab, id, label, extra = '') => `<button type="button" class="chip ${extra}" data-dbx-go="${tab}|${id}">${esc(label)}</button>`;
  const rkLv = r => DB.ranks[r]?.lv ?? 99;
  const rk = r => r ? rkBadge(r) : '<span class="dim">—</span>';
  const stars = n => n ? `<span class="dbx-star" title="희귀도 ${n}">${'★'.repeat(n)}<i>${'★'.repeat(Math.max(0, 5 - n))}</i></span>` : '';
  const ord = t => { let m; return () => m || (m = new Map(vals(t).map((x, i) => [x.name, i]))); };  /* 분류 칩 순서 = 표 순서 */
  const O = { classCats: ord('classCats'), roles: ord('roles'), itemCats: ord('itemCats'), equipSlots: ord('equipSlots'), monsterCats: ord('monsterCats'), skillCats: ord('skillCats'), gearTypes: ord('gearTypes'), placeTypes: ord('placeTypes') };
  const gradeOf = it => DB.itemGrades[it.grade];
  const gradeChip = it => { const g = gradeOf(it); return g ? `<span class="dbx-grade" style="--gc:${g.color}">${g.name}</span>` : '<span class="dim">—</span>'; };
  const prov = rid => { const r = DB.regions[rid]; if (!r) return ''; return (r.name || '').split(' ')[0]; };
  const elName = e => nm('elements', e), seName = s => nm('statusEffects', s);
  const statTxt = st => Object.entries(st || {}).map(([k, v]) => `${STAT[k] || k} ${v > 0 ? '+' : '−'}${Math.abs(v)}`);
  const statSum = st => Object.values(st || {}).reduce((a, v) => a + v, 0);
  const holders = test => allHunters().filter(test).map(h => `<button type="button" class="chip" data-hunter="${h.id}">${esc(h.name)}</button>`);

  /* ---------- 탭 정의 ---------- */
  const T = {};
  /* 인물: 상세 인물(헌터 · 일반인) + 배경 인구(검색으로 앞에서부터) */
  T.people = {
    rows() {
      const me = G.player.id, out = allHunters().map(h => ({ k: 'H', id: h.id, name: h.name, kind: '헌터', age: h.age, rank: h.rank, guild: h.guild, region: h.region, sex: h.sex, cls: h.cls, job: DB.classes[h.cls]?.name || '', me: h.id === me, o: h }));
      [...vals('npcs'), ...Object.values(G.genNpcs || {})].forEach(n => out.push({ k: 'N', id: n.id, name: n.name, kind: '일반인', age: n.age, rank: null, guild: null, region: n.region, sex: n.sex, job: n.job || '', o: n }));
      /* 배경 인구는 헌터 · 일반인을 반씩 (앞에서부터) */
      const seen = new Set(out.map(x => x.id)), q = (S().q || '').trim(), on = typeof SIM !== 'undefined' && SIM.POP, a = on ? SIM.search(q, 'HUNTER', 750) : { rows: [], total: 0 }, c = on ? SIM.search(q, 'NPC', 750) : { rows: [], total: 0 }, pop = { rows: [...a.rows, ...c.rows], total: a.total + c.total };
      pop.rows.forEach(x => { if (!seen.has(x.id)) out.push({ k: 'P', id: x.id, name: x.name, kind: x.awake ? '헌터' : '일반인', age: x.age, rank: x.rank, guild: x.guild, region: x.region, job: x.awake ? '' : x.job || '', pop: true, o: x }); });
      out.popTotal = pop.total;
      return out;
    },
    q: e => [e.name, e.id, e.job, guildName(e.guild)].join(' '),
    F: {
      name: { n: '이름', v: e => e.name },
      kind: { n: '구분', v: e => e.kind, g: 1 },
      age: { n: '나이', v: e => e.age ?? '', s: e => e.age ?? 999 },
      rank: { n: '등급', v: e => e.rank ? DB.ranks[e.rank].name + '급' : '', s: e => rkLv(e.rank), g: 1, html: e => rk(e.rank) },
      guild: { n: '소속', v: e => e.kind === '헌터' ? guildName(e.guild) : '', g: 1 },
      sido: { n: '시도', v: e => prov(e.region), g: 1 },
      region: { n: '사는 곳', v: e => regionName(e.region) },
      job: { n: '클래스 · 직업', v: e => e.job },
      sex: { n: '성별', v: e => e.sex || '', g: 1 },
      detail: { n: '기록', v: e => e.pop ? '배경 인구' : '상세 인물', g: 1 },
    },
    cols: ['name', 'kind', 'age', 'rank', 'guild', 'job', 'region'], sort: ['rank', 1], group: 'kind',
    note: L => L.popTotal > 1500 ? `배경 인구 ${L.popTotal.toLocaleString()}명 중 헌터 · 일반인 750명씩만 목록에 올립니다. 이름으로 검색하면 좁혀집니다.` : '',
    detail(e) {
      const tag = e.me ? ' <span class="chip a">나</span>' : '';
      if (e.k === 'H') {
        const h = e.o, me = e.me, rep = me ? null : KNOW.get(h.id, 'report'), known = me || !!rep || SETTINGS.dev, rel = relOf(h.id);
        return head(h.name + '', h.id, rk(h.rank) + tag) + kv([['구분', '헌터'], ['등급', DB.ranks[h.rank].name + '급'], ['레벨', known ? 'Lv.' + (rep ? rep.v.level : h.level) : '<span class="dim">모름 (스카우트 보고서 필요)</span>'], ['클래스', DB.classes[h.cls] ? go('classes', h.cls, DB.classes[h.cls].name) : '—'],
          ['소속', esc(guildName(h.guild))], ['나이', h.age ? h.age + '세' : '—'], ['성별', esc(h.sex || '')], ['사는 곳', esc(regionName(h.region))], ['나와의 관계', me ? '나' : rel ? esc(relName(rel.rel, h.sex)) : '모르는 사이']])
          + (me ? '' : `<div class="dbx-act"><button class="btn sm pri" data-hunter="${h.id}">정보창 열기</button></div>`);
      }
      if (e.k === 'N') { const n = e.o; return head(n.name, n.id) + `<div class="dbx-civ">${civDetailHTML(n, relOf(n.id), pairs => kv(pairs))}</div>`; }
      const x = e.o;
      return head(x.name, x.id, x.rank ? rk(x.rank) : '') + kv(x.awake ? [['구분', '헌터'], ['등급', DB.ranks[x.rank].name + '급'], ['레벨', '<span class="dim">모름</span>'], ['소속', esc(guildName(x.guild))], ['나이', x.age + '세'], ['사는 곳', esc(regionName(x.region))]]
        : [['구분', '일반인'], ['직업', esc(x.job || '—')], ['나이', x.age + '세'], ['사는 곳', esc(regionName(x.region))]])
        + (x.awake ? `<div class="dbx-act"><button class="btn sm pri" data-hunter="${x.id}">정보창 열기</button></div>` : '') + '<div class="dbx-note">배경 인구 (집계로만 움직이는 사람). 정보창을 열면 상세 인물이 됩니다.</div>';
    }
  };
  /* 게이트: 지금 열린 게이트 + 지난 게이트 기록 */
  const gateStatus = g => { if (g.arc) return g.ok === 'cleared' ? '클리어 (지난)' : '브레이크 (지난)'; const st = gateSt(g.id); return st.status === 'open' ? '열림' : st.status === 'cleared' ? '클리어' : '브레이크'; };
  T.gates = {
    rows: () => [...vals('gates'), ...(G.gateArc || []).map(a => ({ ...a, arc: true, id: 'ARC:' + a.id + ':' + a.end }))],
    q: g => [g.name, g.id, regionName(g.region), g.type].join(' '),
    F: {
      name: { n: '이름', v: g => g.name },
      rank: { n: '등급', v: g => DB.ranks[g.rank]?.name + '급', s: g => rkLv(g.rank), g: 1, html: g => rk(g.rank) },
      status: { n: '상태', v: gateStatus, g: 1 },
      type: { n: '형태', v: g => g.type || '', g: 1 },
      sido: { n: '시도', v: g => prov(g.region), g: 1 },
      region: { n: '지역', v: g => regionName(g.region) },
      interior: { n: '내부', v: g => nm('gateInteriors', g.interior), g: 1 },
      owner: { n: '공략권', v: g => g.arc ? '' : g.owner ? guildName(g.owner) : g.bid ? '입찰' : '협회 개방', g: 1 },
      left: { n: '브레이크까지', v: g => g.arc ? '' : gateLeftTxt(g), s: g => g.arc ? 1e12 : gateSt(g.id).status !== 'open' ? 1e11 : gateLeft(g) },
      when: { n: '나온 때', v: g => g.born != null ? fmtDay(g.born) : '', s: g => -(g.born || 0) },
    },
    cols: ['name', 'rank', 'status', 'type', 'region', 'owner', 'left'], sort: ['left', 1], group: 'status', empty: '아직 열린 게이트가 없습니다. 게이트가 열리면 협회 공지와 함께 여기 올라옵니다.',
    detail(g) {
      const mobs = [...new Set([g.mon, ...(g.mobs || []).map(m => m.id || m), g.boss?.id || g.boss].filter(x => x && DB.monsters[x]))];
      if (g.arc) return head(g.name, g.id.split(':')[1], rk(g.rank)) + kv([['상태', gateStatus(g)], ['등급', DB.ranks[g.rank]?.name + '급'], ['지역', esc(regionName(g.region))], ['형태', esc(g.type || '')], ['파티', esc(g.party || '')], ['나온 때', g.born != null ? fmtDay(g.born) : ''], ['끝난 때', g.end ? fmtDay(g.end) : ''], ['공략한 곳', esc(g.by || '—')]]);
      return head(g.name, g.id, rk(g.rank)) + kv([['상태', gateStatus(g)], ['브레이크까지', gateLeftTxt(g)], ['등급', DB.ranks[g.rank]?.name + '급'], ['지역', go('places', g.region, regionName(g.region))], ['장소', esc(g.place || '')], ['형태', esc(g.type || '')], ['내부', esc(nm('gateInteriors', g.interior))],
        ['층수', g.floors ? g.floors + '층' : ''], ['파티', esc(g.party || '')], ['공략권', g.owner ? esc(guildName(g.owner)) : g.bid ? '입찰로 정함' : '협회 개방'], ['나온 때', g.born != null ? fmtDay(g.born) : '']])
        + sec('출현 몬스터', chips(mobs.map(m => go('monsters', m, DB.monsters[m].name)))) + `<div class="dbx-act"><button class="btn sm pri" data-gate="${g.id}">게이트 상세</button></div>`;
    }
  };
  const mRange = m => { const [a, b] = COMBAT.range(m); return a === b ? `${a}급` : `${a}~${b}급`; };
  const mRole = m => DB.monsterRoles?.[m.mrole] || DB.monsterRoles?.MR_BRUTE;
  const TG = { near: '앞에 선 사람 (위협이 큰 쪽)', weak: 'HP가 낮은 사람', back: '뒤에 선 사람 (힐러 · 마법사 · 궁수)', random: '아무나' };
  const xTxt = v => v >= 1.15 ? `<b class="bad">${v}배</b>` : v <= 0.85 ? `<span class="good">${v}배</span>` : `${v}배`;
  T.monsters = {
    rows: () => vals('monsters'),
    q: m => [m.name, m.id, m.desc, mRole(m)?.name].join(' '),
    F: {
      name: { n: '이름', v: m => m.name },
      cat: { n: '분류', v: m => nm('monsterCats', m.cat), g: 1, o: O.monsterCats },
      kind: { n: '구분', v: m => m.boss ? '보스' : '잡몹', g: 1 },
      role: { n: '역할', v: m => mRole(m)?.name || '', g: 1 },
      rank: { n: '나오는 등급', v: m => mRange(m), s: m => COMBAT.range(m)[1], g: 0 },
      size: { n: '크기', v: m => nm('monsterSizes', m.size), g: 1 },
      el: { n: '속성', v: m => elName(m.el), g: 1 },
      weak: { n: '약점', v: m => (m.weak || []).map(elName), g: 1 },
    },
    cols: ['name', 'kind', 'role', 'cat', 'rank', 'weak'], sort: ['rank', -1], group: 'cat',
    detail(m) {
      const gs = vals('gates').filter(g => g.mon === m.id || g.boss === m.id || (g.mobs || []).some(x => (x.id || x) === m.id)), r = mRole(m), [a, b] = COMBAT.range(m), lv = Math.round((a + b) / 2), c = COMBAT.compare(m, lv);
      const pack = m.boss ? null : (m.pack || r?.pack || [2, 4]);
      const sum = `${m.boss ? '보스' : '잡몹'} · ${esc(r?.name || '')}${pack ? ` · 한 무리 ${pack[0]}~${pack[1]}마리` : ''}. ${esc(r?.desc || '')}`;
      return head(m.name, m.id, `<span class="chip ${m.boss ? 'b' : ''}">${m.boss ? '보스' : '잡몹'}</span>`) + `<p class="dbx-sum">${sum}</p>`
        + sec(`전투에서 — ${lv}급 게이트 기준, 같은 급 헌터(근접 딜러)와 비교`, kv([['나오는 게이트', mRange(m)], ['체력', xTxt(c.hp)], [c.magic ? '마법 위력' : '공격', xTxt(c.pow)], ['방어', xTxt(c.def)], ['마법 저항', xTxt(c.res)],
          ['공격 간격', `${c.spd}초마다`], ['회피', c.eva > 0 ? `+${c.eva}%p` : c.eva < 0 ? `${c.eva}%p` : '같음'], ['노리는 대상', TG[m.target || r?.target] || ''], ['약점 (피해 ×1.5)', (m.weak || []).map(elName).join(' · ')], ['저항 (피해 ×0.6)', (m.resist || []).map(elName).join(' · ')],
          ['안 걸리는 상태', (m.immune || []).map(seName).join(' · ')], ['기본 공격 속성', elName(m.el)], ...(m.boss ? [['격노', `HP ${Math.round((m.enrage ?? DB.balance.BAL_COMBAT.boss.enrageAt) * 100)}% 아래에서 공격 ×1.3 · 빨라짐`]] : [])])
          + `<div class="dbx-note">${m.boss ? '보스는 잡몹보다 훨씬 크게 계산한다 (체력 ×' + DB.balance.BAL_COMBAT.boss.hp / DB.balance.BAL_COMBAT.mob.hp + ').' : ''} 파티보다 높은 등급 게이트에서 만나면 더 세진다.</div>`)
        + sec('쓰는 기술', (m.moves || []).length ? `<ul class="dbx-ul">${m.moves.map(id => `<li>${esc(COMBAT.describeMove(id))}</li>`).join('')}</ul>` : '<div class="dim">기본 공격만 한다.</div>')
        + sec('데리고 나오는 잡몹', chips((m.minions || []).filter(x => DB.monsters[x]).map(x => go('monsters', x, DB.monsters[x].name))))
        + sec('전리품', chips((m.drops || []).filter(d => DB.items[d.item]).map(d => go(DB.itemCats[DB.items[d.item].cat]?.equip ? 'equipment' : 'other', d.item, `${DB.items[d.item].name} ${Math.round(d.chance * 100)}%`))))
        + sec('출현 중인 게이트', chips(gs.map(g => go('gates', g.id, g.name))))
        + (m.desc || m.lore ? `<div class="dbx-flavor">${m.desc ? `<p class="dbx-desc">${esc(m.desc)}</p>` : ''}${m.lore ? `<p class="dbx-lore">${esc(m.lore)}</p>` : ''}</div>` : '');
    }
  };
  const ITEMF = {
    name: { n: '이름', v: i => i.name },
    grade: { n: '등급', v: i => gradeOf(i)?.name || '', s: i => gradeOf(i)?.n || 0, g: 1, html: gradeChip },
    price: { n: '기준가', v: i => i.price == null ? '감정 필요' : i.price ? won(i.price) : '—', s: i => i.price ?? 1e15 },
  };
  T.equipment = {
    rows: () => vals('items').filter(i => DB.itemCats[i.cat]?.equip && !(gradeOf(i)?.hidden && !SETTINGS.dev)),
    q: i => [i.name, i.id, i.desc, i.wtype, i.atype].join(' '),
    F: {
      ...ITEMF,
      cat: { n: '분류', v: i => nm('itemCats', i.cat), g: 1, o: O.itemCats },
      type: { n: '갈래', v: i => i.wtype || i.atype || nm('gearTypes', i.gtype), g: 1, o: O.gearTypes },
      slot: { n: '칸', v: i => nm('equipSlots', i.slot) + (i.twoHand ? ' (양손)' : i.onePiece ? ' (한 벌)' : ''), g: 1 },
      range: { n: '거리', v: i => ({ melee: '근접', near: '가까이', far: '멀리' })[i.range] || '', g: 1 },
      el: { n: '속성', v: i => elName(i.el), g: 1 },
      stat: { n: '성능', v: i => statTxt(i.stat).join(' · '), s: i => -statSum(i.stat) },
    },
    cols: ['name', 'grade', 'type', 'slot', 'stat', 'price'], sort: ['grade', 1], group: 'cat',
    detail(i) {
      const t = DB.gearTypes?.[i.gtype], own = (G.inv || []).filter(r => r.item === i.id).length;
      return head(i.name, i.id, gradeChip(i)) + (i.desc ? `<p class="dbx-desc">${esc(i.desc)}</p>` : '') + kv([['분류', esc(nm('itemCats', i.cat))], ['갈래', esc(i.wtype || i.atype || t?.name || '')], ['칸', esc(nm('equipSlots', i.slot)) + (i.twoHand ? ' · 보조 칸도 차지 (양손)' : i.onePiece ? ' · 하의 칸도 차지 (한 벌)' : '')],
        ['거리', ({ melee: '근접', near: '가까이', far: '멀리' })[i.range] || ''], ['공격 종류', esc(nm('attackKinds', i.kind2))], ['속성', esc(elName(i.el))], ['상태 이상', (i.se || []).map(s => `${esc(seName(s.se))} ${Math.round(s.chance * 100)}%`).join(' · ')], ['저항', (i.resist || []).map(elName).join(' · ')],
        ['내구도', gradeOf(i)?.dur == null ? '닳지 않음' : gradeOf(i)?.dur], ['기준가', i.price == null ? '감정 필요' : i.price ? won(i.price) : '—'], ['가지고 있음', own ? own + '개' : '']])
        + sec('전투에서', (() => { const g = gradeOf(i), K = DB.balance.BAL_COMBAT.hunter; if (!g) return ''; const b = g.bonus;
            return i.slot === 'SLOT_WEAPON' ? `<div>공격 · 마공 +${b * K.gearAtk} <span class="dim">(등급 보정 ${b} × ${K.gearAtk})</span></div>` : ['SLOT_TOP', 'SLOT_BOTTOM'].includes(i.slot) ? `<div>방어 +${+(b * K.gearDef / (i.onePiece ? 1 : 2)).toFixed(1)} · 마법 저항 +${+(b * K.gearDef * 0.6 / (i.onePiece ? 1 : 2)).toFixed(1)} <span class="dim">(상의 · 하의 등급 보정의 평균 × ${K.gearDef})</span></div>` : '<div class="dim">전투 효과 없음 (아직)</div>'; })())
        + sec('성능', chips(statTxt(i.stat).map(s => `<span class="chip">${s}</span>`)) + chips((typeof GEAR !== 'undefined' ? GEAR.perf(i) : []).map(([k, v]) => `<span class="chip">${esc(k)} ${esc(String(v))}</span>`)))
        + sec('이 갈래를 쓰는 클래스', chips((t?.classes || []).filter(c => DB.classes[c]).map(c => go('classes', c, DB.classes[c].name))))
        + `<div class="dbx-act"><button class="btn sm" data-item="${i.id}">물건 창으로 보기</button></div>`;
    }
  };
  /* 장소: 전국 지역(시 · 군 · 구) + 고정 장소 */
  T.places = {
    rows: () => [...vals('regions').map(r => ({ ...r, k: 'R' })), ...vals('places').map(p => ({ ...p, k: 'P' }))],
    q: p => [p.name, p.id].join(' '),
    F: {
      name: { n: '이름', v: p => p.name },
      kind: { n: '구분', v: p => p.k === 'R' ? '지역' : nm('placeTypes', p.type) || '장소', g: 1 },
      sido: { n: '시도', v: p => p.k === 'R' ? prov(p.id) : prov(p.region), g: 1 },
      gates: { n: '열린 게이트', v: p => { const n = openGates(p).length; return n ? n + '곳' : ''; }, s: p => -openGates(p).length },
      dens: { n: '게이트 밀도', v: p => p.gateDensity ? ['', '보통', '많음', '아주 많음'][p.gateDensity] || p.gateDensity : '', s: p => -(p.gateDensity || 0), g: 1 },
      km: { n: '내 집에서', v: p => { const r = p.k === 'R' ? p.id : p.region; return r && DB.regions[r] ? Math.round(kmBetween(G.player.region, r)) + 'km' : ''; }, s: p => { const r = p.k === 'R' ? p.id : p.region; return r && DB.regions[r] ? kmBetween(G.player.region, r) : 1e9; } },
    },
    cols: ['name', 'kind', 'sido', 'dens', 'gates', 'km'], sort: ['km', 1], group: 'sido',
    detail(p) {
      const rid = p.k === 'R' ? p.id : p.region, gs = openGates(p), hs = allHunters().filter(h => h.region === rid);
      return head(p.name, p.id) + (p.desc ? `<p class="dbx-desc">${esc(p.desc)}</p>` : '') + kv([['구분', p.k === 'R' ? '지역 (시 · 군 · 구)' : esc(nm('placeTypes', p.type))], ['시도', esc(prov(rid))], ['게이트 밀도', p.gateDensity ? ['', '보통', '많음', '아주 많음'][p.gateDensity] : ''], ['내 집에서', rid && DB.regions[rid] ? Math.round(kmBetween(G.player.region, rid)) + 'km' : ''],
        ['남은 게이트 장소', p.k === 'R' && typeof placeLeft === 'function' ? placeLeft(p.id) + '곳' : ''], ['내 집', rid === G.player.region ? '여기 산다' : '']])
        + sec('열린 게이트', chips(gs.map(g => go('gates', g.id, `${DB.ranks[g.rank].name}급 ${g.name}`)))) + sec('사는 헌터 (상세 인물)', chips(hs.map(h => go('people', h.id, h.name))));
    }
  };
  const openGates = p => { const rid = p.k === 'R' ? p.id : p.region; return vals('gates').filter(g => g.region === rid && gateSt(g.id).status === 'open'); };
  T.other = {
    rows: () => vals('items').filter(i => !DB.itemCats[i.cat]?.equip),
    q: i => [i.name, i.id, i.desc].join(' '),
    F: {
      ...ITEMF,
      cat: { n: '분류', v: i => nm('itemCats', i.cat), g: 1 },
      rank: { n: '게이트 등급', v: i => i.rank ? DB.ranks[i.rank].name + '급' : '', s: i => rkLv(i.rank), g: 1, html: i => rk(i.rank) },
      use: { n: '쓰임', v: i => i.use ? '사용' : '', g: 1 },
      shop: { n: '시스템 상점', v: i => vals('sysShop').some(s => s.item === i.id) ? '판매' : '', g: 1 },
    },
    cols: ['name', 'cat', 'rank', 'use', 'price'], sort: ['cat', 1], group: 'cat',
    detail(i) {
      const s = vals('sysShop').find(x => x.item === i.id), u = i.use || {}, own = (G.inv || []).filter(r => r.item === i.id).reduce((a, r) => a + r.qty, 0);
      return head(i.name, i.id, i.rank ? rk(i.rank) : '') + (i.desc ? `<p class="dbx-desc">${esc(i.desc)}</p>` : '') + kv([['분류', esc(nm('itemCats', i.cat))], ['게이트 등급', i.rank ? DB.ranks[i.rank].name + '급' : ''], ['기준가', i.price == null ? '감정 필요' : i.price ? won(i.price) : '—'],
        ['쓰면', [u.hp ? `체력 ${u.hp}% 회복` : '', u.mp ? `마력 ${u.mp}% 회복` : '', u.energy ? `기력 ${u.energy}` : '', u.cure ? `${esc(nm('injuryTypes', u.cure))} 치료` : ''].filter(Boolean).join(' · ')], ['시스템 상점', s ? coinTxt(shopCoin(s)) : ''], ['가지고 있음', own ? own + '개' : '']])
        + `<div class="dbx-act"><button class="btn sm" data-item="${i.id}">물건 창으로 보기</button></div>`;
    }
  };
  T.classes = {
    rows: () => vals('classes'),
    q: c => [c.name, c.id, c.en, c.desc, ...(c.alias || [])].join(' '),
    F: {
      name: { n: '이름', v: c => c.name },
      cat: { n: '계열', v: c => nm('classCats', c.cat), g: 1, o: O.classCats },
      role: { n: '성향', v: c => (c.roles || [c.role]).map(r => nm('roles', r)), g: 1, o: O.roles },
      rarity: { n: '희귀도', v: c => c.rarity ? '★' + c.rarity : '', s: c => -(c.rarity || 0), g: 1, html: c => stars(c.rarity) },
      range: { n: '거리', v: c => ({ melee: '근접', near: '가까이', far: '멀리' })[c.range] || '', g: 1 },
      res: { n: '쓰는 힘', v: c => ({ stamina: '체력', mp: '마력' })[c.resource] || '', g: 1 },
      el: { n: '속성', v: c => elName(c.el), g: 1 },
      gear: { n: '장비 갈래', v: c => (c.weapons || []).concat(c.armors || []), g: 1 },
      fame: { n: '흔한 정도', v: c => ({ common: '흔함', rare: '드묾', unique: '고유' })[c.fame] || c.fame || '', g: 1 },
    },
    cols: ['name', 'cat', 'role'], sort: ['cat', 1], group: 'cat',
    detail(c) {
      const sk = id => DB.skills[id] ? go('skills', id, DB.skills[id].name) : '', C = DB.balance.BAL_COMBAT, rs = C.roleStat[c.role] || {}, rn = nm('roles', c.role);
      const w = v => v >= 1.15 ? `<b class="good">×${v}</b>` : v <= 0.85 ? `<span class="bad">×${v}</span>` : `×${v}`;
      const mvIds = [...new Set([...(c.pool || []), ...(c.passive || []), ...(c.learn || []).map(l => l.skill)].map(id => DB.skills[id]?.move).filter(Boolean))];
      return head(c.name, c.id, stars(c.rarity)) + `<p class="dbx-sum">${esc(rn)} 클래스. ${esc(c.desc || '')}</p>`
        + sec(`전투에서 — 역할 '${esc(rn)}' 기준 (보통 = ×1)`, kv([['체력', w(rs.hp)], ['물리 공격', w(rs.atk)], ['마법 공격', w(rs.mag)], ['방어', w(rs.def)], ['마법 저항', w(rs.res)], ['공격 간격', `${rs.spd}초마다 (세부 능력 '시전 속도'로 조금 빨라짐)`], ['기본 공격', rs.magic ? '마법 (마공으로 계산)' : '물리 (공격으로 계산)']])
          + `<div class="dbx-st" style="margin-top:6px">역할 기본 기술</div><ul class="dbx-ul">${(C.roleMoves[c.role] || []).map(id => `<li>${esc(COMBAT.describeMove(id))}</li>`).join('')}</ul>`
          + (mvIds.length ? `<div class="dbx-st" style="margin-top:6px">이 클래스 스킬이 주는 기술</div><ul class="dbx-ul">${mvIds.map(id => `<li>${esc(COMBAT.describeMove(id))}</li>`).join('')}</ul>` : '<div class="dbx-note">이 클래스 스킬에는 아직 전투 기술이 붙어 있지 않다 (역할 기본 기술만 쓴다).</div>'))
        + kv([['계열', esc(nm('classCats', c.cat))], ['각성 때', `후보 ${(c.pool || []).length}개 중 ${c.pick}개를 받는다`]])
        + sec('각성 후보 스킬', chips((c.pool || []).map(sk))) + sec('기본 패시브', chips((c.passive || []).map(sk)))
        + sec('레벨에 따라 배우는 스킬', chips((c.learn || []).map(l => DB.skills[l.skill] ? `<button type="button" class="chip" data-dbx-go="skills|${l.skill}"><span class="dim">Lv.${l.lv}</span> ${esc(DB.skills[l.skill].name)}</button>` : '')))
        + sec('알려진 보유자', chips(holders(h => h.cls === c.id)))
        + (c.lore || (c.habits || []).length ? `<div class="dbx-flavor">${c.lore ? `<p class="dbx-lore">${esc(c.lore)}</p>` : ''}${(c.habits || []).length ? `<ul class="dbx-ul">${c.habits.map(j => `<li>${esc(j)}</li>`).join('')}</ul>` : ''}</div>` : '');
    }
  };
  const TGT = { self: '자신', ally: '아군 하나', allies: '아군 모두', enemy: '적 하나', enemies: '적 여럿', area: '범위' };
  T.skills = {
    rows: () => vals('skills'),
    q: k => [k.name, k.id, k.en, k.desc, nm('classes', k.cls)].join(' '),
    F: {
      name: { n: '이름', v: k => k.name },
      scope: { n: '범위', v: k => k.scope === 'class' ? '클래스 전용' : '공용', g: 1 },
      kind: { n: '종류', v: k => k.kind || '', g: 1 },
      cls: { n: '클래스', v: k => nm('classes', k.cls), g: 1 },
      ccat: { n: '계열', v: k => k.cls ? nm('classCats', DB.classes[k.cls]?.cat) : '', g: 1, o: O.classCats },
      cat: { n: '묶음 (공용)', v: k => nm('skillCats', k.cat), g: 1, o: O.skillCats },
      grade: { n: '등급', v: k => k.grade ? k.grade + '단계' : '', s: k => k.grade || 0, g: 1 },
      target: { n: '대상', v: k => TGT[k.target] || '', g: 1 },
      el: { n: '속성', v: k => elName(k.el), g: 1 },
      tags: { n: '쓰임', v: k => k.tags || [], g: 1 },
      cost: { n: '비용', v: k => k.cost ? [k.cost.mp ? '마력 ' + k.cost.mp : '', k.cost.stamina ? '체력 ' + k.cost.stamina : ''].filter(Boolean).join(' ') : '', s: k => (k.cost?.mp || 0) + (k.cost?.stamina || 0) },
    },
    cols: ['name', 'scope', 'kind', 'cls', 'cat', 'grade', 'cost'], sort: ['scope', 1], group: 'scope',
    detail(k) {
      const use = k.lines?.use || [], owners = vals('classes').filter(x => (x.pool || []).includes(k.id) || (x.passive || []).includes(k.id) || (x.learn || []).some(l => l.skill === k.id));
      const old = [['대상', TGT[k.target] || ''], ['위력', k.power ? '×' + k.power : ''], ['비용', k.cost ? JSON.stringify(k.cost) : ''], ['속성', esc(elName(k.el))], ['상태 이상', (k.se || []).map(s => `${esc(seName(s.se))} ${Math.round(s.chance * 100)}%`).join(' · ')]].filter(r => r[1]);
      return head(k.name, k.id, `<span class="chip">${esc(k.kind || '')}</span>`) + `<p class="dbx-sum">${k.scope === 'class' ? '클래스 전용' : '공용'} ${esc(k.kind || '')} 스킬. ${esc(k.desc || '')}</p>`
        + sec('전투에서', k.move ? `<ul class="dbx-ul"><li>${esc(COMBAT.describeMove(k.move))}</li></ul><div class="dbx-note">스킬 레벨 1당 위력 · 치유 +5%.</div>` : '<div class="dim">전투 효과 없음 — 아직 전투 기술(move)이 붙어 있지 않다.</div>')
        + kv([['클래스', k.cls && DB.classes[k.cls] ? go('classes', k.cls, DB.classes[k.cls].name) : ''], ['묶음', esc(nm('skillCats', k.cat))]])
        + sec('가진 클래스', chips(owners.map(x => go('classes', x.id, x.name)))) + sec('알려진 보유자', chips(holders(h => (h.skills || []).some(([s]) => s === k.id))))
        + (old.length ? `<details class="dbx-old"><summary>아직 쓰지 않는 값</summary>${kv(old)}</details>` : '')
        + (use.length || k.lore ? `<div class="dbx-flavor">${k.lore ? `<p class="dbx-lore">${esc(k.lore)}</p>` : ''}${use.length ? `<ul class="dbx-ul dbx-q">${use.slice(0, 3).map(s => `<li>${esc(s.replace(/\{u\}/g, '헌터').replace(/\{t\}/g, '상대').replace(/([가-힣])\(([가-힣])\)/g, '$2'))}</li>`).join('')}</ul>` : ''}</div>` : '');
    }
  };
  const head = (name, id, badge = '') => `<div class="dbx-h"><div class="dbx-hn">${badge ? badge + ' ' : ''}<b>${esc(name)}</b></div><span class="dbx-id">${esc(id)}</span></div>`;
  const fmtDay = t => { const d = dateOf(Math.floor(t / 1440)); return `${d.m}/${d.d} ${hhmm(t % 1440)}`; };

  /* ---------- 상태 · 설정 ---------- */
  const TABS = ['people', 'gates', 'monsters', 'equipment', 'places', 'other', 'classes', 'skills'];
  const cur = () => { const t = (UI.homeTabs || {}).db; return TABS.includes(t) ? t : 'people'; };
  const S = () => { const st = UI.dbx || (UI.dbx = {}); return st[cur()] || (st[cur()] = { q: '', chip: null, sel: null, edit: false }); };
  const view = (tab = cur()) => { const all = SETTINGS.dbView || (SETTINGS.dbView = {}), d = T[tab]; const v = all[tab] || (all[tab] = {}); if (!d.F[v.g]?.g) v.g = d.group; if (!Array.isArray(v.hide)) v.hide = []; if (!v.s || !d.F[v.s[0]]) v.s = d.sort.slice(); return v; };
  const saveView = () => { try { store.set('khl.settings', SETTINGS); } catch (e) { } };
  const valsOf = (f, e) => { const v = f.v(e); return (Array.isArray(v) ? v : [v]).map(x => x == null || x === '' ? '(없음)' : String(x)); };

  let cache = null;  /* 탭 · 검색이 그대로면 rows 를 다시 만들지 않는다 (같은 렌더 안) */
  function rowsOf(tab) { const d = T[tab], key = tab + '|' + (tab === 'people' ? S().q : '') + '|' + (G.day * 1440 + (G.time || 0)); if (cache?.key === key) return cache.L; const L = d.rows(); cache = { key, L }; return L; }
  function groups(tab) {
    const d = T[tab], v = view(tab), f = d.F[v.g], L = rowsOf(tab), m = new Map();
    L.forEach(e => valsOf(f, e).forEach(x => m.set(x, (m.get(x) || 0) + 1)));
    const so = f.o ? f.o() : f.s ? new Map(L.map(e => [valsOf(f, e)[0], f.s(e)])) : null, sv = x => so.has(x) ? so.get(x) : 1e9;
    return [...m.entries()].sort((a, b) => (so ? (sv(a[0]) > sv(b[0]) ? 1 : sv(a[0]) < sv(b[0]) ? -1 : 0) : 0) || (a[0] === '(없음)') - (b[0] === '(없음)') || a[0].localeCompare(b[0], 'ko'));
  }
  function filtered(tab) {
    const d = T[tab], v = view(tab), st = S(), f = d.F[v.g], q = (st.q || '').trim().toLowerCase();
    let L = rowsOf(tab).filter(e => (!q || d.q(e).toLowerCase().includes(q)) && (st.chip == null || valsOf(f, e).includes(st.chip)) && (st.chip != null || !v.hide.length || valsOf(f, e).some(x => !v.hide.includes(x))));
    const [k, dir] = v.s, sf = d.F[k], sv = sf.s || (e => { const x = sf.v(e); return Array.isArray(x) ? x.join(',') : x ?? ''; });
    L = L.map(e => [sv(e), e]).sort((a, b) => { const x = a[0], y = b[0]; const c = typeof x === 'number' && typeof y === 'number' ? x - y : String(x).localeCompare(String(y), 'ko'); return c * dir || String(d.F.name.v(a[1])).localeCompare(String(d.F.name.v(b[1])), 'ko'); }).map(x => x[1]);
    return L;
  }

  /* ---------- 그리기 ---------- */
  const cell = (f, e) => f.html ? f.html(e) : (() => { const v = f.v(e); return esc(Array.isArray(v) ? v.join(' · ') : v ?? ''); })();
  function listHTML(tab, L) {
    const d = T[tab], v = view(tab), sel = S().sel, [sk, sd] = v.s;
    return `<table class="dbx-tbl"><thead><tr>${d.cols.map(k => `<th><button type="button" class="dbx-th ${sk === k ? 'on' : ''}" data-dbx-sort="${k}" aria-label="${d.F[k].n} 순으로 정렬">${d.F[k].n}${sk === k ? `<i>${sd > 0 ? '▲' : '▼'}</i>` : ''}</button></th>`).join('')}</tr></thead><tbody>
      ${L.slice(0, MAX).map(e => `<tr data-dbx-sel="${esc(e.id)}" tabindex="0" class="${e.id === sel ? 'sel' : ''}">${d.cols.map((k, i) => `<td class="${i ? '' : 'nm'}">${cell(d.F[k], e)}${!i && e.me ? ' <span class="chip a">나</span>' : ''}</td>`).join('')}</tr>`).join('') || `<tr><td colspan="${d.cols.length}" class="muted">${!rowsOf(tab).length && d.empty ? d.empty : '조건에 맞는 항목이 없습니다.'}</td></tr>`}</tbody></table>
      ${L.length > MAX ? `<div class="dbx-more">앞 ${MAX}개만 보입니다. 검색 · 분류로 좁혀 보세요.</div>` : ''}`;
  }
  function chipsHTML(tab) {
    const v = view(tab), st = S(), G0 = groups(tab), shown = G0.filter(([x]) => !v.hide.includes(x)), total = rowsOf(tab).length;
    if (st.chip != null && !G0.some(([x]) => x === st.chip)) st.chip = null;
    return `<div class="dbx-chips" role="group" aria-label="분류">
      <button type="button" class="chip ${st.chip == null ? 'a' : ''}" data-dbx-chip="">전체 <span class="n">${total.toLocaleString()}</span></button>
      ${shown.map(([x, n]) => `<button type="button" class="chip ${st.chip === x ? 'a' : ''}" data-dbx-chip="${esc(x)}">${esc(x)} <span class="n">${n.toLocaleString()}</span></button>`).join('')}
      ${v.hide.length ? `<span class="dbx-hid" title="숨긴 칩: ${esc(v.hide.join(', '))}">숨김 ${v.hide.length}</span>` : ''}
      <button type="button" class="btn sm dbx-cfg ${st.edit ? 'on' : ''}" data-dbx-edit="1" aria-expanded="${!!st.edit}">분류 칩 설정</button></div>`;
  }
  function editHTML(tab) {
    const d = T[tab], v = view(tab), G0 = groups(tab);
    return `<div class="dbx-edit panel" role="region" aria-label="분류 칩 설정"><div class="dbx-edit-row">
        <label for="dbx-g">분류 기준</label><select id="dbx-g" data-dbx-group="1">${Object.entries(d.F).filter(([, f]) => f.g).map(([k, f]) => `<option value="${k}" ${v.g === k ? 'selected' : ''}>${f.n}</option>`).join('')}</select>
        <span class="dim">보일 칩을 고르세요 (끄면 '전체'에서도 빠집니다)</span>
        <span class="sp"></span><button type="button" class="btn sm" data-dbx-all="1">모두 보이기</button><button type="button" class="btn sm" data-dbx-none="1">모두 숨기기</button><button type="button" class="btn sm" data-dbx-reset="1">기본값</button><button type="button" class="btn sm pri" data-dbx-edit="1">닫기</button></div>
      <div class="dbx-edit-list">${G0.map(([x, n]) => `<label class="dbx-tg ${v.hide.includes(x) ? '' : 'on'}"><input type="checkbox" data-dbx-show="${esc(x)}" ${v.hide.includes(x) ? '' : 'checked'}><span>${esc(x)}</span><span class="n">${n.toLocaleString()}</span></label>`).join('')}</div></div>`;
  }
  function bodyHTML(tab) {
    const d = T[tab], v = view(tab), st = S(), L = filtered(tab), all = rowsOf(tab);
    if (st.sel && !L.some(e => e.id === st.sel)) st.sel = null;
    if (!st.sel && L.length) st.sel = L[0].id;
    const e = L.find(x => x.id === st.sel), [sk, sd] = v.s;
    return `<div class="dbx-bar">
        <div class="field dbx-q"><input type="search" placeholder="${nm0(tab)} 검색 (이름 · ID · 설명)" value="${esc(st.q || '')}" data-dbx-q="1" aria-label="검색"></div>
        <label class="dbx-sortl" for="dbx-s">정렬</label><select id="dbx-s" data-dbx-sortsel="1">${Object.entries(d.F).map(([k, f]) => `<option value="${k}" ${sk === k ? 'selected' : ''}>${f.n}</option>`).join('')}</select>
        <button type="button" class="btn sm" data-dbx-dir="1" aria-label="정렬 방향 바꾸기">${sd > 0 ? '오름차순 ▲' : '내림차순 ▼'}</button>
        <span class="dbx-count" id="dbx-count">${L.length.toLocaleString()} / ${all.length.toLocaleString()}개</span></div>
      <div id="dbx-chipbox">${chipsHTML(tab)}</div>${st.edit ? editHTML(tab) : ''}
      ${d.note && d.note(all) ? `<div class="dbx-note">${d.note(all)}</div>` : ''}
      <div class="dbx-main"><div class="panel dbx-list" id="dbx-list">${listHTML(tab, L)}</div>
        <aside class="panel dbx-det" id="dbx-det" aria-live="polite">${e ? d.detail(e) : '<div class="muted">항목을 고르세요.</div>'}</aside></div>`;
  }
  const nm0 = tab => ({ people: '인물', gates: '게이트', monsters: '몬스터', equipment: '장비', places: '장소', other: '아이템', classes: '클래스', skills: '스킬' })[tab];
  function html() { bind(); return `<div class="dbx" data-dbx-tab="${cur()}">${bodyHTML(cur())}</div>`; }
  /* 검색 · 고르기는 화면 전체를 다시 그리지 않고 목록 · 칩 · 상세만 */
  function refresh(keepList) {
    const tab = cur(), d = T[tab], st = S(), L = filtered(tab);
    if (st.sel && !L.some(e => e.id === st.sel)) st.sel = L[0]?.id || null;
    const l = document.getElementById('dbx-list'), c = document.getElementById('dbx-count'), ch = document.getElementById('dbx-chipbox'), dt = document.getElementById('dbx-det');
    if (!l) { render(); return; }
    if (!keepList) { const sc = l.scrollTop; l.innerHTML = listHTML(tab, L); l.scrollTop = sc; } else l.querySelectorAll('tr[data-dbx-sel]').forEach(r => r.classList.toggle('sel', r.dataset.dbxSel === st.sel));
    if (c) c.textContent = `${L.length.toLocaleString()} / ${rowsOf(tab).length.toLocaleString()}개`;
    if (ch && !keepList) ch.innerHTML = chipsHTML(tab);
    const e = L.find(x => x.id === st.sel); if (dt) { dt.innerHTML = e ? d.detail(e) : '<div class="muted">항목을 고르세요.</div>'; dt.scrollTop = 0; }
  }

  /* ---------- 입력 ---------- */
  let bound = false, qTimer = 0;
  function bind() {
    if (bound) return; bound = true;
    document.addEventListener('click', e => {
      const el = e.target.closest('[data-dbx-sel],[data-dbx-chip],[data-dbx-sort],[data-dbx-dir],[data-dbx-edit],[data-dbx-all],[data-dbx-none],[data-dbx-reset],[data-dbx-go],[data-dbx-gear]'); if (!el || !el.closest('.dbx,#iv')) return;
      const D = el.dataset, st = S(), v = view();
      if (D.dbxSel != null) { st.sel = D.dbxSel; refresh(true); return; }
      if (D.dbxChip != null) { st.chip = D.dbxChip === '' ? null : D.dbxChip; refresh(); return; }
      if (D.dbxSort) { v.s = v.s[0] === D.dbxSort ? [D.dbxSort, -v.s[1]] : [D.dbxSort, 1]; saveView(); render(); return; }
      if (D.dbxDir) { v.s = [v.s[0], -v.s[1]]; saveView(); render(); return; }
      if (D.dbxEdit) { st.edit = !st.edit; render(); return; }
      if (D.dbxAll) { v.hide = []; saveView(); render(); return; }
      if (D.dbxNone) { v.hide = groups(cur()).map(([x]) => x); st.chip = null; saveView(); render(); return; }
      if (D.dbxReset) { delete SETTINGS.dbView[cur()]; st.chip = null; saveView(); render(); return; }
      if (D.dbxGear) { open('equipment', null, { q: '', chip: D.dbxGear, group: 'type' }); return; }
      if (D.dbxGo) { const [tab, id] = D.dbxGo.split('|'); open(tab, id); return; }
    });
    document.addEventListener('keydown', e => { const r = e.target.closest?.('tr[data-dbx-sel]'); if (!r) return;
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); S().sel = r.dataset.dbxSel; refresh(true); }
      if (e.key === 'ArrowDown' || e.key === 'ArrowUp') { e.preventDefault(); const n = e.key === 'ArrowDown' ? r.nextElementSibling : r.previousElementSibling; if (n?.dataset.dbxSel) { n.focus(); S().sel = n.dataset.dbxSel; refresh(true); } } });
    document.addEventListener('input', e => { const el = e.target; if (!el.dataset?.dbxQ) return; S().q = el.value; clearTimeout(qTimer); qTimer = setTimeout(() => { cache = null; refresh(); }, cur() === 'people' ? 200 : 60); });
    document.addEventListener('change', e => { const el = e.target, D = el.dataset || {}; if (!el.closest?.('.dbx')) return; const v = view(), st = S();
      if (D.dbxGroup) { v.g = el.value; v.hide = []; st.chip = null; saveView(); render(); return; }
      if (D.dbxSortsel) { v.s = [el.value, v.s[1]]; saveView(); render(); return; }
      if (D.dbxShow != null) { const x = D.dbxShow; v.hide = el.checked ? v.hide.filter(y => y !== x) : [...new Set([...v.hide, x])]; if (!el.checked && st.chip === x) st.chip = null; saveView(); render(); } });
  }
  /* 다른 탭 항목으로 건너가기 (상세의 칩) */
  function open(tab, id, o = {}) {
    if (!T[tab]) return; (UI.homeTabs || (UI.homeTabs = {})).db = tab; UI.screen = 'homeDb'; const st = S();
    if (o.group) { const v = view(tab); v.g = o.group; v.hide = []; saveView(); }
    st.q = o.q ?? ''; st.chip = o.chip ?? null; st.edit = false; cache = null;
    if (id) { st.sel = id; const L = filtered(tab); if (!L.some(e => e.id === id)) st.chip = null; }
    if ($('#iv')) $('#iv').remove();
    render(); document.querySelector('#dbx-list tr.sel')?.scrollIntoView({ block: 'nearest' });
  }
  return { html, open, T, TABS };
})();
