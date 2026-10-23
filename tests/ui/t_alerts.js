/* 알림 (단말기 › 알림, 2026-10-23 재설계): 알림 이벤트 도착 · 배지 · 화면에서 답하기 · 분류 · 분류 끄기 · 모두 읽음 · 지우기 · 기한 · 개수 제한 · 세계 사건 알림(대상 인물) · 위젯 — tests/ui/README.md 참고 */
const path=require('path');const APP='file://'+path.resolve(__dirname,'../../game/index.html');const OUT=process.env.OUT||require('os').tmpdir();
const {chromium}=require('playwright');(async()=>{const b=await chromium.launch({executablePath:process.env.CHROMIUM||undefined});
const errs=[];const p=await (await b.newContext({viewport:{width:1500,height:950}})).newPage();p.on('pageerror',e=>errs.push(e.message));
const ok=(c,m)=>{if(!c)errs.push('단언 실패: '+m)};
await p.goto(APP);await p.addScriptTag({path:require('path').join(__dirname,'fixture.js')});await p.evaluate(()=>{OBSERVE.legacy=true});await p.waitForFunction(()=>typeof DB!=='undefined');
await p.evaluate(()=>{gameFromScenario('SC_BDEMO');enterGame()});
/* 1) 알림 이벤트 → 목록 · 배지 · 답하기 */
const r1=await p.evaluate(()=>{G.alerts.forEach(m=>m.unread=false);const e=vals('events').find(x=>x.ch==='alert'&&!x.on&&x.choices?.length&&eligible(x));triggerEvent(e.id,'10:00');
  UI.screen='alerts';UI.alertCat=null;UI.alert=null;render();return {id:e.id,badge:alertsUnread(),nav:document.querySelector('[data-go="alerts"] .badge')?.textContent||'',choices:document.querySelectorAll('[data-choice]').length,need:document.body.innerText.includes('답할 것')}});
console.log(JSON.stringify(r1));ok(r1.choices>0&&r1.need,'알림 이벤트 표시');  /* 좌측 알림 메뉴 · 배지는 새 UI에서 없앰 (소식은 이야기 창으로) */
await p.screenshot({path:OUT+'/al_list.png'});
await p.locator('[data-choice="0"]').click();
const r2=await p.evaluate(()=>({res:!!G.alerts[0].resolved,unread:alertsUnread(),again:eligible(DB.events[G.alerts[0].ev])}));
console.log(JSON.stringify(r2));ok(r2.res&&r2.unread===0,'답하기');
/* 2) 분류 · 끄기 · 모두 읽음 · 지우기 */
const r3=await p.evaluate(()=>{const push=(from,subj)=>G.alerts.unshift({from,subj,body:'b',when:'11:00',unread:true,ev:null,resolved:null,actions:[]});
  push('SYS_ASSOC','[경매 낙찰] 테스트');push('SYS_ASSOC','[공지] 게이트 테스트');push('SYS_ALERT','재난 테스트');push(Object.keys(DB.guilds)[0],'[길드 등급 심사] 테스트');push('SYS_LIFE','생활 테스트');
  const cats=G.alerts.slice(0,5).map(alertCat);const u0=alertsUnread();
  render();document.querySelector('[data-alcat="AC_TRADE"]').click();const shown=document.querySelectorAll('[data-alert]').length;
  document.querySelector('[data-almute="AC_TRADE"]').click();const u1=alertsUnread();
  triggerEvent(vals('events').find(x=>x.ch==='alert'&&!x.on&&!eventActive(x.id)).id,'12:00');const u2=alertsUnread();
  document.querySelector('[data-alcat="all"]').click();document.querySelector('[data-alread]').click();const u3=alertsUnread();
  const n0=G.alerts.length;document.querySelector('[data-alclean]').click();const n1=G.alerts.length,needs=G.alerts.filter(alertNeeds).length;
  return {cats,u0,shown,u1,u2,u3,n0,n1,needs}});
console.log(JSON.stringify(r3));
ok(r3.cats.join()==='AC_LIFE,AC_GUILD,AC_DISASTER,AC_GATE,AC_TRADE','분류');ok(r3.u0===5&&r3.shown>=1&&r3.u1===4&&r3.u2===5&&r3.u3===0,'끄기 · 읽음');ok(r3.n1===r3.needs&&r3.n1>=1,'지우기 (답할 것은 남김)');
/* 3) 기한 · 개수 제한 */
const r4=await p.evaluate(()=>{const B=DB.balance.BAL_ALERT,m=G.alerts.find(alertNeeds);m.t=nowAbs()-B.expireH*60-1;
  for(let i=0;i<B.keep+30;i++)G.alerts.push({from:'SYS_ASSOC',subj:'x'+i,body:'',when:'',unread:false,ev:null,resolved:null,actions:[]});alertTidy();
  return {exp:!!m.expired&&!!m.resolved,n:G.alerts.length,keep:B.keep}});
console.log(JSON.stringify(r4));ok(r4.exp&&r4.n<=r4.keep,'기한 · 제한');
/* 4) 세계 사건 알림 (on + SUBJ): 부고 */
const r5=await p.evaluate(()=>{const e=vals('events').find(x=>x.ch==='alert'&&x.on==='npcDied');if(!e)return {none:true};const who=G.relations[0].id;
  G.alerts=[];G.hapLog={};G.happen=[{k:'npcDied',who,t:nowAbs(),data:{}}];const r=processHappen();const a=G.alerts[0];return {ev:e.id,fired:!!r,subj:a?.subj,who:a?.who===who,name:nameOf(who)}});
console.log(JSON.stringify(r5));ok(r5.none||r5.fired&&r5.who,'세계 사건 알림');
/* 5) 시간 진행 중 알림 이벤트가 생긴다 (7일) + 위젯 */
const r6=await p.evaluate(()=>{G.alerts=[];G.eventLog={};G.stopOn={};const T=DB.balance.BAL_TIME,e0=T.eventPerHour;T.eventPerHour=0.2;for(let d=0;d<7;d++)runTime('morning');T.eventPerHour=e0;return {n:G.alerts.filter(m=>m.ev).length}});
console.log(JSON.stringify(r6));ok(r6.n>=1,'진행 중 알림 이벤트');
const r7=await p.evaluate(()=>{return {has:typeof WG_DESC.WG_ALERTS==='string'&&!!WIDGETS.WG_ALERTS}});ok(r7.has,'위젯 설명');
await p.evaluate(()=>{UI.screen='alerts';UI.alertCat='all';render()});await p.screenshot({path:OUT+'/al_all.png'});
console.log('errs',errs);await b.close()})();
