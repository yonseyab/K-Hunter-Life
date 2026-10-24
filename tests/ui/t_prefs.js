/* 게임 설정 (G.prefs): 마정석 · 소재 자동 판매 + 게이트 출현 알림 범위 — tests/ui/README.md 참고 */
const path=require('path');const APP='file://'+path.resolve(__dirname,'../../game/index.html');const OUT=process.env.OUT||require('os').tmpdir();
const {chromium}=require('playwright');(async()=>{const b=await chromium.launch({executablePath:process.env.CHROMIUM||undefined});
const errs=[];const p=await (await b.newContext({viewport:{width:1500,height:950}})).newPage();p.on('pageerror',e=>errs.push(e.message));
const ok=(c,m)=>{if(!c)errs.push('단언 실패: '+m)};
await p.goto(APP);await p.addScriptTag({path:require('path').join(__dirname,'fixture.js')});await p.waitForFunction(()=>typeof DB!=='undefined');
await p.evaluate(async()=>{const c=newCC();autoAll(c);gameFromCreation(c);enterGame();await poolPrefetch()});
/* 1) 설정 값 (화면은 2026-10-24 삭제 — 판매 · 알림은 헌터가 알아서. 값은 엔진에 남아 있다) */
await p.evaluate(()=>{const P=prefs();P.autoSell='stone';Object.assign(P.gateNote,{mode:'custom',area:'near',km:10,from:20,to:19,kind:'open'})});
const r1=await p.evaluate(()=>JSON.stringify(G.prefs));console.log(r1);
ok(r1.includes('"autoSell":"stone"')&&r1.includes('"mode":"custom"')&&r1.includes('"km":10')&&r1.includes('"to":19')&&r1.includes('"kind":"open"'),'설정 저장');
/* 2) 알림 판정 */
const r2=await p.evaluate(()=>{const home=G.player.region,far=vals('regions').find(x=>kmBetween(home,x.id)>60).id;
  const mk=(lv,rg,bid)=>({rank:'RANK_'+String(lv).padStart(2,'0'),region:rg,bid});const N=G.prefs.gateNote;
  const c={a:gateNoteWants(mk(20,home,false)),b:gateNoteWants(mk(19,home,false)),c:gateNoteWants(mk(18,home,false)),d:gateNoteWants(mk(20,far,false)),e:gateNoteWants(mk(20,home,true))};
  N.mode='off';c.off=gateNoteWants(mk(20,home,false));N.mode='all';c.all=gateNoteWants(mk(5,home,false));N.mode='fit';c.fit=[gateNoteWants(mk(20,home,false)),gateNoteWants(mk(5,home,false))];
  N.mode='off';const n0=G.alerts.length;for(let i=0;i<50;i++)spawnGate(Math.random);c.offSpawn=G.alerts.filter(m=>(m.subj||'').startsWith('[공지]')).length-G.alerts.slice(50).filter(m=>(m.subj||'').startsWith('[공지]')).length;c.newAlerts=G.alerts.length-n0;return c});
console.log(JSON.stringify(r2));ok(r2.a&&r2.b&&!r2.c&&!r2.d&&!r2.e&&!r2.off&&r2.all&&r2.fit[0]&&!r2.fit[1],'알림 판정');ok(r2.newAlerts===0,'끄면 공지 없음');
/* 3) 자동 판매: 공략 → 마정석은 팔리고 소재는 남는다 */
const r3=await p.evaluate(()=>{G.prefs.autoSell='stone';const g=Object.values(DB.gates).find(x=>gateSt(x.id).status==='open'&&!gateFit(G.player,x));gateSt(g.id).permit=true;
  const m0=G.money;startRaid(g.id);clearInterval(UI._rt);let k=0;while(UI.raid&&!UI.raid.done&&k++<3000){if(UI.raid.crisis){const C=DB.crises[UI.raid.crisis.id];resolveCrisis(C.choices.findIndex(c=>!c.check)>=0?C.choices.findIndex(c=>!c.check):0)}else raidTick()}clearInterval(UI._rt);
  const stones=invOf().filter(r=>DB.items[r.item]?.cat==='ITC_STONE').reduce((a,r)=>a+r.qty,0);return {sold:UI.raid?.sold||0,stones,money:G.money-m0,ledger:G.ledger[0]?.[1]||'',dead:!!G.dead}});
console.log(JSON.stringify(r3));ok(r3.dead||(r3.stones===0&&(r3.sold>0?r3.money>0&&r3.ledger.includes('원격 매입'):true)),'자동 판매');
/* 4) 끄면 가방에 남는다 */
const r4=await p.evaluate(()=>{if(G.dead)return {skip:true};G.prefs.autoSell='off';const items=[['IT_B0001',3]];invAdd('IT_B0001',3,'LOC_BAG');const res=autoSellLoot(items);return {res,left:invOf().find(r=>r.item==='IT_B0001')?.qty||0}});
console.log(JSON.stringify(r4));ok(r4.skip||(r4.res===null&&r4.left>=3),'직접 판매');
/* 5) 알림 화면 → 설정 바로 가기 */
await p.evaluate(()=>{if(G.dead)return;UI.screen='alerts';UI.alertCat='AC_GATE';render()});if(await p.locator('[data-settingstab="게임 설정"]').count()){await p.click('[data-settingstab="게임 설정"]');ok(await p.evaluate(()=>UI.screen==='settings'&&UI.settingsTab==='게임 설정'),'바로 가기')}
console.log('errs',errs);await b.close()})();
