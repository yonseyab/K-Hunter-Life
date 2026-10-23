/* UI 스모크 테스트 — tests/ui/README.md 참고 */
const path=require('path');const APP='file://'+path.resolve(__dirname,'../../game/index.html');const OUT=process.env.OUT||require('os').tmpdir();
const {chromium}=require('playwright');(async()=>{const b=await chromium.launch({executablePath:process.env.CHROMIUM||undefined});
const errs=[];const p=await (await b.newContext({viewport:{width:1500,height:950}})).newPage();p.on('pageerror',e=>errs.push(e.message+' '+(e.stack||'').split('\n')[1]));
await p.goto(APP);await p.addScriptTag({path:require('path').join(__dirname,'fixture.js')});await p.evaluate(()=>{OBSERVE.legacy=true});await p.waitForTimeout(300);
/* 2026-10-22 수정 묶음: 메뉴 · 할 수 있는 일(지도) · 상태창 위젯 · 빠른 검색 · 아이템 요구 스탯 · 상세 · 코인 상점 · 경매장 · 파티 · 공격대 · 길드 탭 */
await p.evaluate(()=>{gameFromScenario('SC_BDEMO');enterGame('home');G.stopOn.event=false;G.stopOn.lowEnergy=false});
console.log('nav',await p.evaluate(()=>[...document.querySelectorAll('#nav button')].map(b=>b.textContent.replace(/\d+$/,'')).join(',')));
console.log('clock',await p.evaluate(()=>(document.querySelector('#clockD')||document.querySelector('.home-clock')).textContent));
/* 빠른 검색 */
await p.evaluate(()=>{UI.profileId=G.player.id;UI.screen='profile';render()});console.log('name→me',await p.evaluate(()=>UI.screen==='profile'&&UI.profileId===G.player.id));
await p.evaluate(()=>qsOpen());await p.keyboard.type('오세');await p.waitForTimeout(100);
console.log('qs',await p.evaluate(()=>[...document.querySelectorAll('#qsr .qsi')].map(x=>x.querySelector('.qsn').textContent).join(',')));
await p.keyboard.press('Enter');console.log('qs go',await p.evaluate(()=>[UI.screen,UI.profileId]));
await p.keyboard.press('/');await p.keyboard.type('마정석');await p.keyboard.press('Enter');console.log('qs item',await p.evaluate(()=>UI.itemView));await p.keyboard.press('Escape');await p.evaluate(()=>closeItem());
/* 지도에서 가서 하기 */
await p.evaluate(()=>{UI.screen='acts';UI.actsTab='지도';UI.mapReg='RG_SEOUL_GANGNAM';UI.mapPlace='PT_LIB';render()});
await p.click('[data-mapdo]');console.log('mapdo',await p.evaluate(()=>[placeName(locOf()),hhmm(G.time)]));
/* 구 단위 지도: 서울 강남구 영역 클릭 → 선택, 전국 → 부산 들어가기 */
await p.evaluate(()=>{UI.screen='acts';UI.actsTab='지도';UI.mapId='MAP_SEOUL';UI.mapReg=null;render()});
{const pos=await p.evaluate(()=>{const a=vals('mapAreas').find(x=>x.id==='MA_SEOUL_EUNPYEONG');const r=document.querySelector('#gmap canvas').getBoundingClientRect();return [r.left+a.label[0]*r.width,r.top+a.label[1]*r.height]});await p.mouse.click(pos[0],pos[1]);console.log('map pick',await p.evaluate(()=>UI.mapReg))}
console.log('map grid',await p.evaluate(()=>vals('maps').map(m=>{const g=mapGrid(m.id);return m.id+':'+new Set(g).size}).join(' ')));
/* 오프닝 인트로: 새 게임 → 7장면 → 등록 안내 → 캐릭터 생성 */
console.log('intro',await p.evaluate(()=>{goTitle();document.querySelector('[data-title="new"]').click();const m0=UI.mode;for(let k=0;k<7;k++){UI.intro.t=0;introNext()}const e=UI.intro.end;UI.intro.t=0;introNext();const m1=UI.mode;UI.mode='app';return [m0,introList().length,e,m1]}));
await p.evaluate(()=>{gameFromScenario('SC_BDEMO');enterGame('home');G.stopOn.event=false;G.stopOn.lowEnergy=false});
/* 아이템 요구 스탯 */
console.log('req',await p.evaluate(()=>{if(!invOf().some(r=>r.item==='IT_0002'))invAdd('IT_0002',1,'LOC_BAG');const it=DB.items.IT_0002,me=G.player;const old=me.stats.STAT_BODY;me.stats.STAT_BODY=5;const miss=reqMiss(it);const i=invOf().findIndex(r=>r.item==='IT_0002');equip(i,false);const j=invOf().findIndex(r=>r.item==='IT_0002');equip(j,true);const on=invOf().find(r=>r.item==='IT_0002').loc;me.stats.STAT_BODY=old;return JSON.stringify(miss)+' '+on}));
/* 코인: 상점 구매 · 판매, 공략 보상 */
console.log('coin',await p.evaluate(()=>{const c0=G.coin;UI.screen='shop';UI.shopTab='buy';UI.shopSel='SS_B0001';render();document.querySelector('[data-shopbuy]').click();const c1=G.coin;return [c0,c1,coinsFor(12,19,true),coinsFor(12,13,false)]}));
/* 경매장 */
await p.evaluate(()=>{UI.screen='auction';render()});
console.log('auc',await p.evaluate(()=>{const A=AUC(),l=A.lots.find(x=>!x.done);const m0=G.money;aucBid(l.id,false);const m1=G.money;l.cap=1e12;DB.balance.BAL_AUCTION.bidPerHour=1;aucTick(1);const m2=G.money;return [A.lots.length,m0-m1,m2-m1,l.bidder]}));
console.log('auc buy',await p.evaluate(()=>{const l=AUC().lots.find(x=>!x.done&&x.buyout);G.money+=l.buyout;const n0=invOf().filter(r=>r.item===l.item).reduce((a,r)=>a+r.qty,0);aucBid(l.id,true);return [l.done,invOf().filter(r=>r.item===l.item).reduce((a,r)=>a+r.qty,0)-n0]}));
console.log('auc list',await p.evaluate(()=>{const i=invOf().findIndex(r=>r.loc==='LOC_BAG'&&DB.items[r.item].price);const id=invOf()[i].item;aucList(i,1000,1);const l=AUC().lots.find(x=>x.seller==='ME');l.cap=1e12;DB.balance.BAL_AUCTION.bidPerHour=1;aucTick(3);const m0=G.money;l.end=nowAbs()-1;aucTick(1);return [id,l.bidder,G.money-m0]}));
await p.evaluate(()=>{UI.screen='auction';UI.aucTab='경매 목록';render()});await p.screenshot({path:OUT+'/auction.png'});
/* 화면 순회 */
for(const k of ['home','acts','party','raidteam','guild','auction','status','shop','inventory']){await p.evaluate(k=>{UI.screen=k;render()},k)}
console.log('errs',errs);await b.close()})();
