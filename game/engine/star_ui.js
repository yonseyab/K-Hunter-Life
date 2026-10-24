/* =========================================================
   star_ui.js — 좌측 '성좌' 탭 화면: 내 정보 · 상점 · 성좌 경매장 · 업적 (2026-10-24)
   지금은 화면 틀만. 빈칸(.su-ph)은 '이런 내용이 들어갈 예정' 문구 — 시스템 · 콘텐츠가 생기면 채운다.
   데이터: STARACC.cur() (성좌 계정) · G.coin · achievements · starBlessings
   ========================================================= */
const STAR_UI = (() => {
  const ph = (t, cls = '') => `<div class="su-ph ${cls}">${t}</div>`;
  const chips = (L, on = 0) => `<div class="su-chips">${L.map((x, i) => `<span class="chip ${i === on ? 'a' : ''}">${x}</span>`).join('')}</div>`;
  const coinBox = () => `<div class="su-coin"><span>보유 코인</span><b>${coinTxt(G.coin || 0)}</b></div>`;
  const head = (title, sub) => `<div class="su-head"><div><h1 class="h1">${title}</h1><div class="sub">${sub}</div></div>${coinBox()}</div>`;

  /* ---------- 내 정보 ---------- */
  function info() {
    const s = STARACC.cur();
    if (!s) return head('내 정보', '성좌 정보') + ph('성좌 계정이 없는 게임이야 (데모 · 옛 세이브). 새 게임에서 성좌를 만들면 여기에 보여.');
    const T = (tb, id) => DB[tb]?.[id]?.name || '—', col = STARACC.colOf(s), achN = Object.keys(s.ach || {}).length, achAll = vals('achievements').length;
    const UNL = [['pickClass', '클래스 직접 고르기'], ['pickStats', '능력치 직접 고르기'], ['pickPotential', '잠재력 직접 고르기'], ['peekPotential', '잠재력 엿보기 무료']];
    const day = G.player ? (G.day || 0) + 1 : 0;
    return head('내 정보', '성좌는 게임 계정 — 업적 · 코인 · 해금은 헌터가 바뀌어도 남는다') + `<div class="su-info">
      <section class="su-card" style="--sc:${col}"><div class="su-card-sig">${esc(STARACC.markOf(s))}</div><div class="su-card-name">${esc(s.name)}</div>
        <dl class="su-kv"><dt>성향</dt><dd>${esc(T('starTraits', s.trait))}</dd><dt>영역</dt><dd>${esc(T('starDomains', s.domain))}</dd><dt>말투</dt><dd>${esc(T('ccSpeech', s.speech))}</dd><dt>깨어난 날</dt><dd>${s.created ? new Date(s.created).toLocaleDateString('ko-KR') : '—'}</dd></dl>
        ${s.preset ? '' : '<div class="dim su-note">한 번 만든 성좌는 고칠 수 없다</div>'}</section>
      <div class="su-col">
        <div class="su-stats">${[['지켜보는 헌터', G.player ? esc(G.player.name) : '—'], ['함께한 날', day ? day + '일' : '—'], ['업적', `${achN} / ${achAll}`], ['헌터가 성좌를', G.starKnown ? '안다' : '모른다']].map(([k, v]) => `<div class="su-stat"><span>${k}</span><b>${v}</b></div>`).join('')}</div>
        <section class="panel"><div class="ph">해금</div><div class="pb su-unl">${UNL.map(([k, n]) => `<div class="${STARACC.unlocked(k) ? 'on' : ''}"><span>${STARACC.unlocked(k) ? '✓' : '🔒'}</span>${n}</div>`).join('')}</div></section>
        <section class="panel"><div class="ph">잠재력 엿보기</div><div class="pb">${ph('지켜보는 헌터의 잠재력을 코인으로 엿보는 칸 — 1단계(대략) · 2단계(전부)와 가격, 엿본 결과가 들어갈 예정')}</div></section>
        <section class="panel"><div class="ph">지난 헌터들</div><div class="pb">${ph('이 성좌가 지켜본 헌터들(은퇴 · 사망)의 이름 · 최고 등급 · 산 날 · 마지막 한마디가 쌓일 예정')}</div></section>
        <section class="panel"><div class="ph">고유 클래스 · 고유 스킬</div><div class="pb">${ph('정해진 성좌의 고유 클래스 · 고유 스킬과, 헌터에게 내려 준 기록이 들어갈 예정')}</div></section>
      </div></div>`;
  }

  /* ---------- 상점 ---------- */
  function shop() {
    const cards = Array.from({ length: 8 }, () => `<div class="su-item">${ph('상품 이름 · 등급<br>가격 ◈', 'sm')}</div>`).join('');
    return head('상점', '성좌가 코인으로 사서 헌터에게 선물한다 — 쓸지 말지는 헌터가 정한다') + `<div class="su-split">
      <div>${chips(['전체', '장비', '소모품', '마정석', '클래스북', '축복'])}<div class="su-grid">${cards}</div>
        ${ph('오늘의 진열 · 성좌 성향 할인 · 품절 같은 상점 소식이 들어갈 예정', 'sm')}</div>
      <aside class="panel su-side"><div class="ph">고른 상품</div><div class="pb">${ph('상품 그림 · 이름 · 등급 · 설명 · 착용 조건(귀속 · 특수 클래스)이 들어갈 예정')}
        <div class="su-buy"><span class="dim">가격</span><b>${coinTxt(0)}</b><button class="btn pri" disabled>헌터에게 선물하기</button></div>
        <div class="dim su-note">${G.starKnown ? '헌터는 선물이 누구에게서 왔는지 안다.' : '헌터는 아직 성좌를 모른다 — 선물은 헌터가 운이나 노력으로 얻은 것처럼 안배된다.'}</div></div></aside></div>`;
  }

  /* ---------- 성좌 경매장 ---------- */
  function auction() {
    const rows = Array.from({ length: 6 }, () => `<tr>${['물건 · 분류', '등급', '판매 성좌', '◈ 현재가', '◈ 즉시 구매', '남은 시간'].map(t => `<td><span class="su-bar" title="${t}"></span></td>`).join('')}<td class="r"><button class="btn sm" disabled>입찰</button></td></tr>`).join('');
    return head('성좌 경매장', '성좌들이 코인으로 거래한다 — 낙찰받은 물건은 바로 헌터에게 선물로 간다') + `<div class="su-split">
      <div>${chips(['경매 목록', '내 입찰', '낙찰 기록'])}${chips(['전체', '장비', '소모품', '마정석', '희귀'], -1)}
        <div class="panel"><div class="pb" style="padding:0;overflow:auto"><table class="tbl su-tbl"><thead><tr><th>물건</th><th>등급</th><th>판매 성좌</th><th class="r">현재가</th><th class="r">즉시 구매</th><th>남은 시간</th><th></th></tr></thead><tbody>${rows}</tbody></table></div></div>
        ${ph('올라온 물건 한 줄마다: 이름 · 등급 · 파는 성좌(익명일 수도) · 현재가 · 즉시 구매가 · 남은 시간 · 입찰 버튼이 들어갈 예정', 'sm')}</div>
      <aside class="panel su-side"><div class="ph">경매장 소식</div><div class="pb">${ph('다른 성좌들의 입찰 · 낙찰 소식, 내가 밀린 입찰(코인 돌려받음) 알림이 흐를 예정')}</div></aside></div>`;
  }

  /* ---------- 업적 ---------- */
  function achieve() {
    const s = STARACC.cur(), A = vals('achievements'), got = s?.ach || {};
    const list = A.length ? A.map(a => `<div class="su-ach ${got[a.id] ? 'on' : ''}"><b>${got[a.id] ? '✓ ' : ''}${esc(a.name)}</b><span>${esc(a.desc || '')}</span><span class="dim">◈ ${a.coin || 0}${a.unlock ? ' · 해금' : ''}</span></div>`).join('')
      : Array.from({ length: 9 }, () => `<div class="su-ach">${ph('업적 이름<br>달성 조건 · 보상(코인 · 해금)', 'sm')}</div>`).join('');
    return head('업적', '성좌 계정에 남는다 — 한 번 받은 업적은 다시 받을 수 없다') + `
      <div class="su-stats">${[['달성', `${Object.keys(got).length} / ${A.length}`], ['받은 코인', '—'], ['해금', `${Object.keys(s?.unlocks || {}).length}`]].map(([k, v]) => `<div class="su-stat"><span>${k}</span><b>${v}</b></div>`).join('')}</div>
      ${chips(['전체', '성장', '공략', '관계', '인생', '숨은 업적'])}<div class="su-grid ach">${list}</div>
      ${ph('숨은 업적은 달성 전까지 이름이 ??? 로 보일 예정', 'sm')}`;
  }

  const VIEWS = { starinfo: info, shop, auction, achieve };
  return { html: tab => `<div class="su">${(VIEWS[tab] || info)()}</div>` };
})();
