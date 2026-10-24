/* =========================================================
   hunter_info.js — 내 헌터 › 정보 탭 (2026-10-24, FM 정보창 느낌으로 촘촘하게)
   위: 이름 띠 + 핵심 정보 칸. 아래 세 줄: 신상 · 외모 · 생활 | 전투 능력 · 성격 · 특성 | 지닌 것 · 기록
   긴 내용(각성 전의 삶)은 접어 둔다. 조작 버튼 없음.
   ========================================================= */
const HUNTER_INFO = (() => {
  const rows = L => `<div class="hi-rows">${L.filter(r => r && r[1] != null && r[1] !== '').map(([k, v]) => `<div class="hi-row"><span>${k}</span><b>${v}</b></div>`).join('')}</div>`;
  const box = (title, body, extra = '') => `<section class="hi-box"><header>${title}${extra ? `<span>${extra}</span>` : ''}</header>${body}</section>`;
  const optName = id => { const o = DB.bgOpts[id]; if (o) return o.rel ? relName(o.rel) : o.name; return DB.regions[id]?.name || ''; };
  function bgRows() {
    const bg = G.bio?.bg || {};
    return vals('bgItems').filter(it => !['BI_RESIDENCE', 'BI_FAMILY'].includes(it.id)).map(it => { const v = bg[it.id], ids = Array.isArray(v) ? v : v ? [v] : []; const n = ids.map(optName).filter(Boolean); return n.length ? [esc(it.name), esc(n.join(', '))] : null; }).filter(Boolean);
  }
  function gearHTML() {
    const W = typeof GEAR !== 'undefined' ? GEAR.worn() : [];
    if (!W.length) return '<div class="hi-empty">착용한 장비가 없다.</div>';
    return `<div class="hi-rows">${W.map(({ r, it }) => { const md = GEAR.maxDur(it), d = GEAR.durOf(r), g = GEAR.gradeOf(it);
      return `<div class="hi-gear"><span class="hi-slot">${esc(DB.equipSlots[GEAR.slotOf(it)]?.name || '')}</span><b data-item="${it.id}" title="${esc(it.desc || '')}">${esc(it.name)}</b>${g ? `<span class="hi-grade" style="--gc:${g.color}">${esc(g.name)}</span>` : '<span></span>'}<span class="hi-dur" title="내구도 ${d} / ${md}"><i style="width:${md ? Math.round(d / md * 100) : 0}%"></i></span></div>`; }).join('')}</div>`;
  }
  function bagHTML() {
    const L = invOf().filter(r => r.loc === 'LOC_BAG' && DB.items[r.item]);
    if (!L.length) return '<div class="hi-empty">가방이 비어 있다.</div>';
    return `<div class="hi-bag">${L.slice(0, 12).map(r => `<span class="chip" data-item="${r.item}">${esc(DB.items[r.item].name)}${r.qty > 1 ? ' ×' + r.qty : ''}</span>`).join('')}${L.length > 12 ? `<span class="dim">외 ${L.length - 12}가지</span>` : ''}</div>`;
  }
  /* 전투 능력: 실제 전투 계산값 (engine/combat.js). 같은 등급 · 같은 역할 평균과 비교해 색 */
  function combatHTML(h) {
    if (typeof COMBAT === 'undefined') return '';
    const u = COMBAT.fromHunter(h), lv = DB.ranks[h.rank]?.lv ?? 20, t = COMBAT.fromLevel({ id: 'avg', name: '', role: h.roleMain, level: COMBAT.levelOfRank(lv), rankLv: lv });
    const cmp = (a, b, rev) => { const r = b ? a / b : 1; return (rev ? r <= 0.95 : r >= 1.08) ? 'up' : (rev ? r >= 1.05 : r <= 0.92) ? 'down' : ''; };
    const cell = (k, v, avg, rev, fmt = x => Math.round(x)) => `<div class="hi-cs ${cmp(v, avg, rev)}"><span>${k}</span><b>${fmt(v)}</b><i>${fmt(avg)}</i></div>`;
    const mv = (u.moves || []).map(m => DB.combatMoves[m.id]?.name).filter(Boolean);
    return `<div class="hi-cgrid">${cell('체력', u.max, t.max)}${cell('마력', u.mpMax, t.mpMax)}${cell(u.magic ? '마공' : '공격', u.magic ? u.mag : u.atk, u.magic ? t.mag : t.atk)}${cell('방어', u.def, t.def)}${cell('마법 저항', u.res, t.res)}${cell('명중', u.acc, t.acc)}${cell('회피', u.eva, t.eva)}${cell('치명', u.crit, t.crit, false, x => x.toFixed(1) + '%')}${cell('공격 간격', u.spd, t.spd, true, x => x.toFixed(2) + '초')}</div>
      <div class="hi-legend"><span class="up">■</span> 같은 등급 · 같은 역할 평균보다 높음 <span class="down">■</span> 낮음 · 작은 숫자 = 평균</div>
      ${mv.length ? `<div class="hi-moves"><span>쓰는 기술</span>${mv.map(n => `<span class="chip">${esc(n)}</span>`).join('')}</div>` : ''}`;
  }
  function html() {
    const h = G.player, cls = DB.classes[h.cls], st = G.stats || {}, home = homeOf(), days = G.day - (G.startDay ?? G.day) + 1, rk = DB.ranks[h.rank];
    const lk = looksOf(h), traits = (h.traits || []).map(id => DB.traits?.[id]).filter(Boolean), bg = bgRows();
    const fact = (k, v) => `<div class="hi-fact"><span>${k}</span><b>${v}</b></div>`;
    return `<div class="hi">
      <header class="hi-band" style="--rc:${rk?.color || 'var(--accent)'}">
        <div class="hi-por">${portrait(h, 120)}</div>
        <div class="hi-name"><div class="hi-tag">헌터 · ${esc(h.id)}</div><h1>${esc(h.name)}</h1>
          <div class="hi-sub">${[h.age ? h.age + '세' : '', h.sex || '', regionName(h.region)].filter(Boolean).map(esc).join(' · ')}${G.dead ? ` · <b class="bad">${G.dead.kind === 'retire' ? '은퇴' : '사망'}</b>` : ''}</div></div>
        <div class="hi-facts">${fact('등급', `<span class="hi-rk" style="--rc:${rk?.color || '#888'}">${esc(rk?.name || '?')}</span>급`)}${fact('레벨', 'Lv.' + h.level)}${fact('클래스', esc(cls?.name || '—'))}${fact('역할', esc([DB.roles[h.roleMain]?.name, DB.roles[h.roleSub]?.name].filter(Boolean).join(' · ')))}${fact('소속', esc(guildName(h.guild)))}${fact('각성', `${days}일째`)}${fact('자금', won(G.money || 0))}${fact('집', esc(DB.housing[home.type]?.name || '—'))}</div>
      </header>
      <div class="hi-cols">
        <div class="hi-col">
          ${box('신상', rows([['이름', esc(h.name)], ['성별', esc(h.sex || '—')], ['나이', h.age ? `${h.age}세 <span class="dim">${esc(h.birth || '')}</span>` : '—'], ['출생지', esc(h.birthplace ? regionName(h.birthplace) : '')], ['사는 곳', esc(regionName(h.region))], ['언어', esc((h.langs || []).map(l => DB.ccLanguages?.[l]?.name || l).join(', '))], ['말투', esc(DB.ccSpeech?.[h.speech]?.name || '')], ['혈액형', esc(G.bio?.blood || '')], ['주로 쓰는 손', esc(G.bio?.hand || '')], ['각성한 날', esc(h.awakenedDate || h.awakened || '')]]))}
          ${box('외모', `<div class="hi-looks">${vals('lookScores').filter(k => !k.adult).map(k => `<div><span>${esc(k.name)}</span><b>${lk[k.id] ?? '—'}</b></div>`).join('')}</div>`, '1~20')}
          
          <details class="hi-box hi-fold"><summary><span>각성 전의 삶</span><span class="dim">${bg.length ? bg.length + '줄' : '기록 없음'}</span></summary>${bg.length ? rows(bg) : '<div class="hi-empty">기록 없음</div>'}</details>
        </div>
        <div class="hi-col">
          ${box('전투 능력', combatHTML(h), '실제 전투 계산값')}
          ${box('성격', `<div class="hi-pers">${persSummaryHTML(G.bio?.pers || {})}</div>`)}
          ${box('특성', traits.length ? `<div class="hi-bag">${traits.map(t => `<span class="chip" title="${esc(t.desc || '')}">${esc(t.name)}</span>`).join('')}</div>` : '<div class="hi-empty">없음</div>')}
        </div>
        <div class="hi-col">
          ${box('착용', gearHTML(), '내구도')}
          ${box('가방', bagHTML())}
          ${box('기록', `<div class="hi-tiles"><div><b>${st.raids || 0}</b><span>공략</span></div><div><b>${st.cleared || 0}</b><span>클리어</span></div><div><b>${days}</b><span>각성 일수</span></div><div><b>${(G.relations || []).length}</b><span>아는 사람</span></div></div><button class="btn sm" data-home-tab="story|bio">일대기 보기</button>`)}
        </div>
      </div></div>`;
  }
  return { html };
})();
