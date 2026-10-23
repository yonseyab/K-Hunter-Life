/* 인생 화면 · 실시간 재생 · 이야기 창 · 멈춤 · 자동 결정 · 고비 회고 (K-Hunter-Life) — assert */
const path=require('path');const APP='file://'+path.resolve(__dirname,'../../game/index.html');
const {chromium}=require('playwright');(async()=>{const b=await chromium.launch({executablePath:process.env.CHROMIUM||undefined});
const errs=[];const p=await (await b.newContext({viewport:{width:1500,height:950}})).newPage();p.on('pageerror',e=>errs.push(e.message));
const ok=(c,m)=>{if(!c)errs.push('단언 실패: '+m)};
await p.goto(APP);await p.waitForFunction(()=>typeof DB!=='undefined');
/* 타이틀: 무작위 헌터로 시작 · 기록관 */
ok(await p.locator('[data-ktitle="random"]').count()===1&&await p.locator('[data-ktitle="archive"]').count()===1,'타이틀 메뉴');
await p.evaluate(()=>packsLoad());await p.click('[data-ktitle="random"]');await p.waitForFunction(()=>UI.mode==='app');
const rnd=await p.evaluate(()=>({screen:UI.screen,pro:G.story.filter(x=>x.k==='prologue').map(x=>x.s),name:G.player.name,cls:G.player.cls}));
ok(rnd.screen==='life'&&rnd.pro.length>=3&&rnd.cls,'무작위 시작 · 시작 전 인생 요약 '+JSON.stringify(rnd));
await p.evaluate(async()=>{await packsLoad();gameFromScenario('SC_BDEMO');enterGame();await poolPrefetch()});
/* 첫 화면 = 인생: 이야기 창 · 상태 · 끼어들기 · 재생 막대 */
ok(await p.locator('#story').count()===1,'이야기 창');ok(await p.locator('#lifeSide').count()===1,'오른쪽 상태');
ok(await p.locator('#lifeBar button').count()===4,'방향 · 구매 · 장비 버튼');ok(await p.locator('#playbar [data-kspeed]').count()===4,'배속 4개');
ok(await p.locator('[data-advance="next"]').count()===0,"옛 '계속' 버튼 없음");
const nav=await p.locator('#nav [data-go]').evaluateAll(L=>L.map(x=>x.dataset.go));ok(JSON.stringify(nav)===JSON.stringify(['life','homeHunter','homeDb','homeTrade']),'좌측 대분류 네 개 '+nav);
/* 실시간: ▶ 누르면 시계가 움직이고, 문장은 붙기만 한다 */
const t0=await p.evaluate(()=>nowAbs());
await p.evaluate(()=>{prefs().play.stop='none';prefs().autoRaid.on='off';DB.balance.BAL_TIME.eventPerHour=0});
await p.click('[data-kspeed="20"]');await p.waitForTimeout(1500);
const t1=await p.evaluate(()=>nowAbs());ok(t1-t0>=120,'×20 1.5초에 2시간 이상 흐름 '+(t1-t0));
ok(await p.evaluate(()=>PLAY.S.running),'재생 중');
await p.click('[data-kplay="toggle"]');await p.waitForTimeout(400);const t2=await p.evaluate(()=>nowAbs());await p.waitForTimeout(600);
ok(await p.evaluate(t=>nowAbs()===t,t2),'일시정지하면 시간이 멈춤');
ok(await p.locator('#story .sl').count()>3,'이야기 창에 문장');
/* ×1 = 하루 30초: 1초에 48분 안팎 */
const r1=await p.evaluate(async()=>{prefs().autoRaid.on='off';PLAY.setSpeed(1);const a=nowAbs();PLAY.start('run');await new Promise(r=>setTimeout(r,2000));PLAY.pause();return nowAbs()-a});
ok(r1>=60&&r1<=130,'×1 2초 ≈ 96분 '+r1);
/* 상세도: 요약이면 행동 문장이 안 보인다 */
const vis=await p.evaluate(()=>{const it={t:nowAbs(),k:'act',s:'x',lv:3};prefs().play.detail='summary';const a=STORY.visible(it);prefs().play.detail='detail';return [a,STORY.visible(it)]});
ok(vis[0]===false&&vis[1]===true,'상세도 3단계');
/* 조사 */
ok(await p.evaluate(()=>STORY.josa('가윤이(가) 집(으)로 간다. 지석은(는) 서울(으)로')==='가윤이 집으로 간다. 지석은 서울로'),'조사 맞춤');
/* 이벤트: 멈춤 설정 '사건마다' → 멈추고 카드가 뜬다 → 직접 고르면 이야기 창에 결과 */
const ev=await p.evaluate(()=>{EVT.pending().forEach(x=>EVT.auto(x));prefs().play.stop='each';G.eventLog={};triggerEvent('EV_B0004','10:00');const s=EVT.arrived();return {s:!!s,pend:EVT.pending().length,top:EVT.pending()[0]?.ev.id}});
ok(ev.s&&ev.pend===1&&ev.top==='EV_B0004','사건마다 멈춤 '+JSON.stringify(ev));
await p.evaluate(()=>render());ok(await p.locator('#lifeEventModal [data-kpick]').count()>=2,'선택지 팝업');
await p.click('#lifeEventModal [data-kpick="2"]');
const after=await p.evaluate(()=>({pend:EVT.pending().length,last:G.story.filter(x=>x.k==='choice').slice(-1)[0]?.s||''}));
ok(after.pend===0&&/지금 있는 걸로 버틴다/.test(after.last),'직접 고른 결과가 이야기 창에 '+after.last);
/* 자동 결정: '안 멈춤' → 판단 엔진이 고르고 이유 문장 */
const au=await p.evaluate(()=>{EVT.pending().forEach(x=>EVT.auto(x));prefs().play.stop='none';G.eventLog={};triggerEvent('EV_B0004','11:00');const s=EVT.arrived();return {s,pend:EVT.pending().length,how:G.story.filter(x=>x.k==='choice').slice(-1)[0]}});
ok(!au.s&&au.pend===0&&au.how.how==='auto','자동 결정 '+JSON.stringify(au));
/* 큰 갈림길만: 연애(big) 멈춤 · 돈(not big) 자동 */
const big=await p.evaluate(()=>{prefs().play.stop='big';return [EVT.stopWanted({kind:'SK_LOVE',choices:[]}),EVT.stopWanted({kind:'SK_MONEY',choices:[]})]});
ok(big[0]===true&&big[1]===false,'큰 갈림길만 '+big);
/* 자동 결정 끄기 → 전부 멈춤 */
ok(await p.evaluate(()=>{prefs().play.autoDecide=false;const r=EVT.stopWanted({kind:'SK_MONEY',choices:[]});prefs().play.autoDecide=true;return r}),'자동 결정 끔 → 멈춤');
/* 고비 회고: 기록은 유지하되 한 줄 입력 없이 계속 */
await p.evaluate(()=>{prefs().play.stop='big';LIFE.milestone('MS_LOVE',{who:'오세린'});render()});
ok(await p.locator('.kcard.retro').count()===1,'회고 카드');ok(await p.locator('#retroLine,[data-kretro="save"]').count()===0,'한 줄 입력 제거');await p.click('[data-kretro="skip"]');
const ms=await p.evaluate(()=>({note:G.milestones.slice(-1)[0].note,open:G.retroOpen}));ok(!ms.note&&!ms.open,'회고 닫기 '+JSON.stringify(ms));
/* 하루 진행(동기): 하루 계획 · 하루 마무리 · 일대기 기록 */
const day=await p.evaluate(()=>{prefs().play.stop='none';G.pendingPick=false;EVT.pending().forEach(x=>EVT.auto(x));const d0=G.day;PLAY.runSync(1440*2,60);return {d:G.day-d0,ends:G.story.filter(x=>x.dayEnd!=null).length,chron:(G.chron||[]).length,plan:G.story.some(x=>/오늘 할 일/.test(x.s))}});
ok(day.d>=2&&day.ends>=1&&day.chron>=1&&day.plan,'하루 계획 · 마무리 '+JSON.stringify(day));
/* 감정: 들뜸이 생기고 반감기로 가라앉는다 · 바뀔 때 이야기 창에 한 줄 */
const emo=await p.evaluate(()=>{G.emo=null;EMO.add('EM_JOY',80);const c0=EMO.cur(),n0=G.story.filter(x=>x.k==='emo').length;EMO.decay(60*40);return {c0,c1:EMO.cur(),lines:G.story.filter(x=>x.k==='emo').length-n0}});
ok(emo.c0==='EM_JOY'&&emo.c1==='EM_CALM','감정 가라앉음 '+JSON.stringify(emo));
/* 공략 위기에서 직접 고르기로 넘기기: SK_CRISIS 켜면 옛 공략 화면 */
const hand=await p.evaluate(async()=>{prefs().play.kinds.SK_CRISIS=true;prefs().play.stop='each';G.cond.hp=100;G.cond.energy=100;G.injuries=[];G.time=600;
  const g=vals('gates').find(x=>gateSt(x.id).status==='open'&&!gateFit(G.player,x))||spawnGate(Math.random,G.player.region);gateSt(g.id).status='open';DB.balance.BAL_GATE.crisisPerTick=1;
  const r=PLAY.raid(g,AUTORAID.party(g));const R=UI.raid,h={stop:!!(r&&r.stop),screen:UI.screen,crisis:!!R.crisis,auto:R.auto};
  clearInterval(UI._rt);DB.balance.BAL_GATE.crisisPerTick=0.06;let k=0;while(!R.done&&!G.dead&&k++<3000){if(R.crisis)PLAY.chooseCrisis();else PLAY.stepSync(1)}clearInterval(UI._rt);
  h.narr=G.story.filter(x=>x.k==='raid'&&x.ok!=null).length;h.done=R.done;return h});
ok(hand.stop&&hand.screen==='life'&&hand.crisis&&hand.auto===true,'위기 직접 고르기로 넘김 '+JSON.stringify(hand));ok(hand.done&&hand.narr>=1,'직접 끝낸 공략도 이야기 창에');
await p.evaluate(()=>{prefs().play.kinds.SK_CRISIS=false;prefs().play.stop='none';UI.screen='life';render()});
/* 400px 폭 가로 스크롤 없음 */
await p.setViewportSize({width:400,height:800});await p.evaluate(()=>{UI.screen='life';render()});
ok(await p.evaluate(()=>document.documentElement.scrollWidth<=401),'400px 가로 스크롤 없음 '+await p.evaluate(()=>document.documentElement.scrollWidth));
console.log(JSON.stringify({r1,day,emo,au:au.how.s.slice(0,80)}));
console.log('errs',JSON.stringify(errs));await b.close()})();
