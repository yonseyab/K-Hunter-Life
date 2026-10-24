/* =========================================================
   hunter_info.js — 내 헌터 › 정보 탭 (2026-10-24)
   지켜보는 헌터 한 사람의 신상 · 각성 · 성격 · 배경 · 몸에 지닌 것 · 생활 · 기록을 한눈에. 조작 버튼 없음.
   (옛 '소지품' 탭 대신 — 착용 중인 장비와 가방 속 주요 물건만)
   ========================================================= */
const HUNTER_INFO = (() => {
  const kv = rows => `<dl class="hi-kv">${rows.filter(r => r && r[1] != null && r[1] !== '').map(([k, v]) => `<dt>${k}</dt><dd>${v}</dd>`).join('')}</dl>`;
  const sec = (title, body, cls = '') => `<section class="panel hi-sec ${cls}"><div class="ph">${title}</div><div class="pb">${body}</div></section>`;
  const optName = id => { const o = DB.bgOpts[id]; if (o) return o.rel ? relName(o.rel) : o.name; return DB.regions[id]?.name || ''; };
  function bgRows() {
    const bg = G.bio?.bg || {};
    return vals('bgItems').filter(it => !['BI_RESIDENCE', 'BI_FAMILY'].includes(it.id)).map(it => { const v = bg[it.id], ids = Array.isArray(v) ? v : v ? [v] : []; const n = ids.map(optName).filter(Boolean); return n.length ? [it.name, esc(n.join(', '))] : null; }).filter(Boolean);
  }
  function gearHTML() {
    const W = typeof GEAR !== 'undefined' ? GEAR.worn() : [];
    if (!W.length) return '<div class="dim">착용한 장비가 없다.</div>';
    return `<div class="hi-gear">${W.map(({ r, it }) => { const md = GEAR.maxDur(it), d = GEAR.durOf(r); return `<div class="hi-gear-row"><span class="dim">${esc(DB.equipSlots[GEAR.slotOf(it)]?.name || '')}</span><b data-item="${it.id}">${esc(it.name)}</b>${it.rank ? rkBadge(it.rank) : '<span></span>'}<span class="hi-dur" title="내구도 ${d} / ${md}"><i style="width:${md ? Math.round(d / md * 100) : 0}%"></i></span></div>`; }).join('')}</div>`;
  }
  function bagHTML() {
    const L = invOf().filter(r => r.loc === 'LOC_BAG' && DB.items[r.item]).slice(0, 10);
    if (!L.length) return '<div class="dim">가방이 비어 있다.</div>';
    return `<div class="chips">${L.map(r => `<span class="chip" data-item="${r.item}">${esc(DB.items[r.item].name)}${r.qty > 1 ? ' ×' + r.qty : ''}</span>`).join('')}</div>`;
  }
  function html() {
    const h = G.player, cls = DB.classes[h.cls], st = G.stats || {}, home = homeOf(), days = G.day - (G.startDay ?? G.day) + 1;
    const lk = looksOf(h), traits = (h.traits || []).map(id => DB.traits?.[id]).filter(Boolean);
    return `<div class="hi">
      <header class="hi-head"><div class="hi-por">${portrait(h, 160)}</div>
        <div class="hi-id"><h1 class="h1">${esc(h.name)}</h1>
          <div class="sub">${[h.age ? h.age + '세' : '', h.sex || '', regionName(h.region)].filter(Boolean).map(esc).join(' · ')}</div>
          <div class="hi-chips">${rkBadge(h.rank)}<span class="chip">Lv.${h.level}</span><span class="chip a">${esc(cls?.name || '클래스 없음')}</span><span class="chip">${esc(guildName(h.guild))}</span><span class="chip">각성 ${days}일째</span></div>
          ${G.dead ? `<div class="bad">${G.dead.kind === 'retire' ? '은퇴했다' : '세상을 떠났다'}</div>` : ''}</div></header>
      <div class="hi-grid">
        ${sec('신상', kv([['이름', esc(h.name)], ['성별', esc(h.sex || '—')], ['나이', h.age ? `${h.age}세 <span class="dim">(${esc(h.birth || '')})</span>` : '—'], ['출생지', esc(h.birthplace ? regionName(h.birthplace) : '')], ['사는 곳', esc(regionName(h.region))], ['언어', esc((h.langs || []).map(l => DB.ccLanguages?.[l]?.name || l).join(', '))], ['말투', esc(DB.ccSpeech?.[h.speech]?.name || '')], ['혈액형', esc(G.bio?.blood || '')], ['주로 쓰는 손', esc(G.bio?.hand || '')]]))}
        ${sec('각성', kv([['각성한 날', esc(h.awakenedDate || h.awakened || '—')], ['등급', rkBadge(h.rank) + ` <span class="dim">${esc(DB.ranks[h.rank]?.name || '')}급</span>`], ['레벨', 'Lv.' + h.level], ['클래스', esc(cls?.name || '—')], ['역할', esc([DB.roles[h.roleMain]?.name, DB.roles[h.roleSub]?.name].filter(Boolean).join(' · '))]]) + (traits.length ? `<div class="sub" style="margin:10px 0 4px">특성</div><div class="chips">${traits.map(t => `<span class="chip" title="${esc(t.desc || '')}">${esc(t.name)}</span>`).join('')}</div>` : ''))}
        ${sec('성격', `<div class="hi-pers">${persSummaryHTML(G.bio?.pers || {})}</div>`)}
        ${sec('외모', `<div class="abstrip">${vals('lookScores').filter(k => !k.adult).map(k => `<div><span class="k">${esc(k.name)}</span><span class="v">${lk[k.id] ?? '—'}</span></div>`).join('')}</div><div class="dim hi-note">1~20 절대 평가</div>`)}
        ${sec('각성 전의 삶', bgRows().length ? kv(bgRows()) : '<div class="dim">기록 없음</div>')}
        ${sec('생활', kv([['집', esc(DB.housing[home.type]?.name || '')], ['자금', won(G.money || 0)], ['소속', esc(guildName(h.guild))]]))}
        ${sec('몸에 지닌 것', gearHTML() + `<div class="sub" style="margin:12px 0 4px">가방</div>` + bagHTML())}
        ${sec('기록', kv([['공략', `${st.raids || 0}회 <span class="dim">클리어 ${st.cleared || 0}</span>`], ['각성한 지', days + '일'], ['아는 사람', (G.relations || []).length + '명']]) + `<button class="btn sm" data-home-tab="story|bio" style="margin-top:8px">일대기 보기</button>`)}
      </div></div>`;
  }
  return { html };
})();
