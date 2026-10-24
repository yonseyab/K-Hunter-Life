/* =========================================================
   engine/star.js — 성좌 (2026-10-24 사용자 결정, data/stars.js)
   플레이어 = 내 헌터의 성좌. 코인 = G.coin (성좌 포인트). 내 성좌 설정 · 업적 · 성좌 화면은 나중에 (커마 화면과 같이).
   - 선물(gift): 상점 · 성좌 경매장에서 산 물건은 바로 헌터 가방으로. 입을지 · 쓸지는 헌터가 정한다
   - NPC 성좌(ofHunter): 헌터 한 명에 성좌 하나, 성좌 하나가 여럿을 키울 수 있다. 고유 클래스가 있으면 거의 성좌가 붙어 있다
   - 고유 클래스(grantClass): 성좌 하나에 하나, 가진 헌터는 세계에 한 명. 받으면 원래 클래스가 바뀐다. 성좌가 주거나 고유 클래스북으로만
   - 성좌 경매장: 코인 거래. 출품 · 경쟁 입찰은 NPC 성좌(없으면 '익명의 성좌')
   - 메시지 · 축복: 자리만 (say)
   ========================================================= */
const STAR = (() => {
  const B = () => DB.balance.BAL_STAR;
  const josa = (w, a, b) => { w = String(w || '').replace(/\s*\([^)]*\)$/, ''); const c = w.charCodeAt(w.length - 1) - 0xAC00; return c >= 0 && c <= 11171 && c % 28 ? a : b; };
  const me = () => (typeof STARACC !== 'undefined' ? STARACC.cur() : null);
  const starName = () => me()?.name || null;
  function ensure() {
    if (!G) return;
    G.starGifts = G.starGifts || []; G.uniqueHeld = G.uniqueHeld || {};
    if (G.auction && !G.auction.coin) G.auction = { lots: [], seq: G.auction.seq || 0, coin: true };  /* 옛 원화 경매는 비운다 */
  }
  /* 성좌 메시지 (자리만). on 에 맞는 starMessages 가 있으면 이야기 창에 한 줄 */
  function say(on, vars) {
    const st = me(), L = vals('starMessages').filter(m => m.on === on && (st?.preset ? m.trait === st.trait : (!m.trait || m.trait === st?.trait)));  /* 정해진 성좌는 자기 성향에 맞는 것만 */ if (!L.length) return false;
    const m = L[Math.floor(Math.random() * L.length)], t = String(m.text || '').replace(/\{(\w+)\}/g, (_, k) => vars?.[k] ?? '');
    STORY.add('event', `[${starName() || '성좌'}] ${t}`, 1); return true;
  }
  /* 선물: 바로 헌터 가방으로. 장비면 헌터가 입어 볼지, 클래스북이면 읽을지 헌터가 정한다 */
  function gift(item, qty, via) {
    ensure(); const it = DB.items[item]; if (!it || !(qty > 0)) return false;
    invAdd(item, qty, 'LOC_BAG');
    G.starGifts.unshift({ t: nowAbs(), item, qty, via }); if (G.starGifts.length > B().giftsKeep) G.starGifts.length = B().giftsKeep;
    const what = `${it.name}${qty > 1 ? ' ' + qty + '개' : ''}`, nm = starName();
    STORY.add('event', G.starKnown && nm ? `성좌 「${nm}」${josa(nm, '이', '가')} ${what}${josa(what, '을', '를')} 선물했다.` : `어디선가 ${what}${josa(what, '이', '가')} 가방에 들어와 있다. 성좌의 선물이다.`, 1);
    say('gift', { item: it.name }); if (typeof STARADV !== 'undefined') STARADV.onGift();
    if (GEAR.slotOf(it)) GEAR.consider('선물받은');
    if (it.classBook) readBook(it);
    return true;
  }

  /* ---------- 고유 클래스 ---------- */
  const isUnique = id => !!DB.classes[id]?.unique;
  const holderOf = cls => { ensure(); return G.uniqueHeld[cls] || null; };
  /* h(헌터 객체)에게 클래스를 준다. 고유 클래스는 세계에 한 명만 — 이미 누가 가졌으면 실패. 원래 클래스는 바뀐다 */
  function grantClass(h, cls, via) {
    ensure(); const c = DB.classes[cls]; if (!h || !c) return false;
    if (c.unique && G.uniqueHeld[cls] && G.uniqueHeld[cls] !== h.id) return false;
    const old = h.cls; if (old && isUnique(old) && G.uniqueHeld[old] === h.id) delete G.uniqueHeld[old];
    h.cls = cls; if (c.unique) G.uniqueHeld[cls] = h.id;
    if (typeof classSkillSync === 'function') classSkillSync(h, old);
    if (h.id === G.player.id) { STORY.add('up', `클래스가 「${c.name}」${josa(c.name, '으로', '로')} 바뀌었다.`, 3); say('classGrant', { cls: c.name }); }
    return true;
  }
  /* 클래스북: 헌터가 읽으면 그 클래스로 바뀐다 (고유는 아무도 안 가졌을 때만). 읽을지 판단은 지금은 늘 읽음 — 성격 판단은 나중에 */
  function readBook(it) {
    const i = invOf().findIndex(r => r.item === it.id && r.loc === 'LOC_BAG'); if (i < 0) return false;
    if (!grantClass(G.player, it.classBook, 'book')) return false; invTake(i, 1); return true;
  }

  /* ---------- NPC 성좌 ---------- */
  const hash = s => { let h = 0; for (const c of String(s)) h = (h * 31 + c.charCodeAt(0)) | 0; return Math.abs(h); };
  /* 그 헌터를 키우는 NPC 성좌 (없으면 null). 헌터 ID로 정해져 바뀌지 않는다. 다른 사람은 모른다 — 개발자 보기 · 사건 조건용
     고유 클래스가 있으면 그 클래스가 묶인 성좌(uniqueRate), 없으면 npcRate 확률로 아무 성좌 */
  function ofHunter(hid) {
    if (!hid || hid === G.player?.id) return null; const L = vals('constellations'); if (!L.length) return null;
    const h = typeof H === 'function' ? H(hid) : null, k = hash(hid), roll = (k % 1000) / 1000, cls = h?.cls && DB.classes[h.cls];
    if (cls?.unique) { const s = L.find(x => x.cls === cls.id) || DB.constellations[cls.star]; return s && roll < B().uniqueRate ? s : null; }
    return roll < B().npcRate ? L[k % L.length] : null;
  }
  const sellerName = () => { const L = vals('constellations'); return L.length && Math.random() >= B().anonSeller ? L[Math.floor(Math.random() * L.length)].name : '익명의 성좌'; };

  /* ---------- 성좌 경매장 (코인) ---------- */
  const AB = () => DB.balance.BAL_AUCTION;
  const A = () => { ensure(); return G.auction || (G.auction = { lots: [], seq: 0, coin: true }); };
  const toCoin = w => Math.max(1, Math.round((w || 0) / DB.balance.BAL_COIN.wonPerCoin));
  function aucNew(n) {
    const b = AB(), a = A(), pool = vals('items').filter(i => b.cats.includes(i.cat) && i.price && !i.old && !GEAR.gradeOf(i)?.hidden && !(i.classBook && isUnique(i.classBook) && holderOf(i.classBook))); if (!pool.length) return;
    for (let k = 0; k < n && a.lots.filter(l => l.end > nowAbs()).length < b.maxLots; k++) {
      const it = pick(pool), r = x => x[0] + Math.random() * (x[1] - x[0]), qty = ['ITC_STONE', 'ITC_MAT', 'ITC_CONSUME'].includes(it.cat) ? 1 + Math.floor(Math.random() * 4) : 1, base = toCoin(it.price) * qty;
      a.lots.push({ id: 'AU' + (++a.seq), item: it.id, qty, seller: sellerName(), start: Math.max(1, Math.round(base * r(b.start))), bid: 0, bidder: null, buyout: Math.max(2, Math.round(base * r(b.buyout))), end: nowAbs() + Math.round(r(b.days) * 1440), cap: base * r(b.npcMax) });
    }
  }
  const aucNext = l => l.bid ? Math.max(l.bid + 1, Math.ceil(l.bid * (1 + AB().step))) : l.start;
  function refund(l) { if (l.bidder === 'ME' && l.bid) G.coin = (G.coin || 0) + l.bid; }
  function aucBid(id, buy) {
    const l = A().lots.find(x => x.id === id); if (!l || l.end <= nowAbs() || l.done) { toast('끝난 경매입니다'); return false; }
    const amt = buy ? l.buyout : aucNext(l); if (!amt || (G.coin || 0) < amt) { toast('코인이 부족합니다'); return false; }
    refund(l); G.coin -= amt; l.bid = amt; l.bidder = 'ME';
    if (buy) aucClose(l); else toast(`${esc(DB.items[l.item].name)}에 ◈${amt} 입찰했다`); return true;
  }
  function aucClose(l) {
    l.done = true; l.end = Math.min(l.end, nowAbs());
    if (l.bidder === 'ME') { gift(l.item, l.qty, 'auction'); toast(`경매 낙찰 — ${esc(DB.items[l.item].name)}${l.qty > 1 ? ' ×' + l.qty : ''}, 헌터에게 보냈습니다 (◈${l.bid})`); }
  }
  function aucTick(hours) {
    const b = AB(), a = A(), now = nowAbs();
    for (let h = 0; h < hours; h++) a.lots.forEach(l => {
      if (l.done || l.end <= now || l.bidder && l.bidder !== 'ME' && Math.random() < .5) return;
      if (Math.random() < b.bidPerHour) { const nx = aucNext(l); if (nx > l.cap) return; const who = sellerName();
        if (l.bidder === 'ME') { refund(l); toast(`성좌 경매장: ${esc(who)}${josa(who, '이', '가')} ${esc(DB.items[l.item].name)}에 ◈${nx}를 불렀습니다. 입찰한 코인은 돌아왔습니다.`); }
        l.bid = nx; l.bidder = who; }
    });
    a.lots.filter(l => !l.done && l.end <= now).forEach(aucClose); a.lots = a.lots.filter(l => !l.done || now - l.end < 3 * 1440);
  }
  const aucDay = () => aucNew(AB().newPerDay);
  /* 화면은 옛 경매장 표 그대로, 원화 → 코인 · 출품 탭 없음 */
  function auctionView() {
    const a = A(); if (!a.lots.length) aucNew(10);
    const tab = UI.aucTab === '내 입찰' ? '내 입찰' : '경매 목록', now = nowAbs(), cat = UI.aucCat || 'ALL';
    const L = tab === '내 입찰' ? a.lots.filter(l => l.bidder === 'ME') : a.lots.filter(l => !l.done && l.end > now && (cat === 'ALL' || DB.items[l.item].cat === cat));
    const left = l => l.done || l.end <= now ? (l.bidder === 'ME' ? '<span class="good">낙찰</span>' : '<span class="dim">종료</span>') : durTxt(l.end - now).replace(/ \d+분$/, '');
    return `<div class="h-row"><div><h1 class="h1">성좌 경매장</h1><div class="sub">성좌들이 코인으로 거래합니다 · 낙찰받은 물건은 바로 헌터에게 선물로 갑니다 · 더 높은 입찰이 나오면 코인을 돌려받습니다</div></div><div class="panel pb stat" style="min-width:180px"><div class="lab"><span>보유 코인</span></div><div class="big num" style="font-size:20px">${coinTxt(G.coin || 0)}</div></div></div>
    <div class="tabs" role="tablist">${['경매 목록', '내 입찰'].map(t => `<button role="tab" aria-selected="${tab === t}" data-auctab="${t}">${t}</button>`).join('')}</div>
    ${tab === '경매 목록' ? `<div class="chips" style="margin:0 0 10px">${[['ALL', '전체'], ...AB().cats.map(c => [c, DB.itemCats[c]?.name])].map(([id, n]) => `<button class="chip ${cat === id ? 'a' : ''}" data-auccat="${id}">${n}</button>`).join('')}</div>` : ''}
    <div class="panel pb tight"><div class="tw"><table><thead><tr><th>물건</th><th>등급</th><th class="r">수량</th><th>출품자</th><th class="r">현재가</th><th>최고 입찰</th><th class="r">즉시 구매</th><th>남은 시간</th><th></th></tr></thead><tbody>
    ${L.sort((x, y) => x.end - y.end).map(l => { const it = DB.items[l.item], live = !l.done && l.end > now, nx = aucNext(l);
      return `<tr><td><b data-item="${it.id}" style="cursor:pointer;text-decoration:underline dotted">${esc(it.name)}</b> <span class="dim">${DB.itemCats[it.cat]?.name || ''}</span></td><td>${it.rank ? rkBadge(it.rank) : '<span class="dim">—</span>'}</td><td class="r num">${l.qty}</td><td class="muted">${esc(l.seller)}</td><td class="r num">${coinTxt(l.bid || l.start)}</td><td>${l.bidder === 'ME' ? '<span class="chip a">나</span>' : l.bidder ? esc(l.bidder) : '<span class="dim">없음</span>'}</td><td class="r num">${l.buyout ? coinTxt(l.buyout) : '—'}</td><td class="num">${left(l)}</td>
      <td class="r">${live ? `<span class="row" style="gap:4px;justify-content:flex-end;flex-wrap:nowrap"><button class="btn sm" data-aucbid="${l.id}" ${l.bidder === 'ME' || (G.coin || 0) < nx ? 'disabled' : ''}>${l.bidder === 'ME' ? '최고가' : '◈' + nx + ' 입찰'}</button>${l.buyout ? `<button class="btn sm pri" data-aucbuy="${l.id}" ${(G.coin || 0) < l.buyout ? 'disabled' : ''}>즉시 구매</button>` : ''}</span>` : ''}</td></tr>`; }).join('') || `<tr><td colspan="9" class="muted">${tab === '경매 목록' ? '올라온 물건이 없습니다.' : '없습니다.'}</td></tr>`}</tbody></table></div></div>`;
  }
  return { ensure, say, gift, isUnique, holderOf, grantClass, readBook, ofHunter, aucNew, aucBid, aucClose, aucTick, aucDay, aucNext, auctionView, A };
})();
/* 옛 이름으로 부르는 곳 (index.html · 테스트) */
const AUC = () => STAR.A();
function aucNew(n) { return STAR.aucNew(n); }
function aucBid(id, buy) { return STAR.aucBid(id, buy); }
function aucTick(h) { return STAR.aucTick(h); }
function aucDay() { return STAR.aucDay(); }
const aucNext = l => STAR.aucNext(l);
V.auction = () => STAR.auctionView();
