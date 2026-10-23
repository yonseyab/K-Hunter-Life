/* UI 스모크 테스트 — tests/ui/README.md 참고 */
const path=require('path');const APP='file://'+path.resolve(__dirname,'../../game/index.html');const OUT=process.env.OUT||require('os').tmpdir();
const {chromium}=require('playwright');(async()=>{const b=await chromium.launch({executablePath:process.env.CHROMIUM||undefined});
const errs=[];const p=await (await b.newContext({viewport:{width:1500,height:950}})).newPage();p.on('pageerror',e=>errs.push(e.message+' '+(e.stack||'').split('\n')[1]));
await p.goto(APP);await p.addScriptTag({path:require('path').join(__dirname,'fixture.js')});await p.waitForTimeout(300);
/* 세계 사건 → 이벤트: 동료 부상 · 등급 상승 · 부고 · 가족 각성 · 실직 · 졸업. 선택 결과 · 쿨다운 */
await p.evaluate(()=>{gameFromScenario('SC_BDEMO');enterGame();G.stopOn.event=false;G.stopOn.lowEnergy=false;G.threads.forEach(t=>{if(t.event)t.event.resolved=true});relOf('HN_B0002').close=60;relOf('HN_B0002').to.RD_CLOSE=60});
const G0=await p.evaluate(()=>G.relations.find(r=>r.id.startsWith('HN_')&&r.id!=='HN_B0002').id);
const fire=async(k,who,data)=>p.evaluate(([k,who,data])=>{G.happen=[{k,who,t:nowAbs(),data}];const f=processHappen();const th=G.threads.find(t=>t.with===who);return f?`${f.ev.id} ${th?th.msgs.slice(-1)[0]?.t:G.alerts[0].subj}`:'(없음) '+(th?th.msgs.slice(-1)[0]?.t:'')},[k,who,data]);
console.log(await fire('npcInjured','HN_B0002',{gate:'망원 한강공원'}));
await p.evaluate(()=>{G.threads.forEach(t=>{if(t.event)t.event.resolved=true})});console.log('cooldown',await fire('npcInjured','HN_B0002',{gate:'망원 한강공원'}));
console.log('deferred',await p.evaluate(()=>G.happen.length));await p.evaluate(()=>{G.threads.forEach(t=>{if(t.event)t.event.resolved=true})});console.log(await fire('npcRankUp','HN_B0002',{rank:'12'}));
console.log(await fire('npcDied',G0,{why:'정자동 지하주차장 공략 중 전사'}));
console.log(await fire('career:fired','NP_B0003',{job:'회사원',rank:'주임'}));
console.log(await fire('career:grad','NP_B0002',{job:'서비스직'}));
console.log('stranger',await fire('npcInjured','HN_B0011',{gate:'x'}));
/* 메신저에서 답하기 */
await p.evaluate(()=>{UI.screen='messenger';UI.thWith='NP_B0003';render()});await p.click('[data-reply="1"]');console.log('reply',await p.evaluate(()=>[G.money,relOf('NP_B0003').close]));
await p.screenshot({path:OUT+'/happen_msg.png'});
/* 가족 각성: 엔진 확률을 높여 실제로 일어나게 */
console.log('awaken',await p.evaluate(()=>{G.threads.forEach(t=>{if(t.event)t.event.resolved=true});DB.balance.BAL_POP.awakenDetailed=1;runTime('morning');DB.balance.BAL_POP.awakenDetailed=0;const h=H('NP_B0002');return [h?.awake,h?.rank,h?.cls,threadWith('NP_B0002').msgs.map(m=>m.t).filter(t=>/각성/.test(t)).join('/'),relOf('NP_B0002').rel]}));
await p.evaluate(()=>{UI.screen='profile';UI.profileId='NP_B0002';UI.profTab='개요';render()});await p.screenshot({path:OUT+'/happen_awaken.png'});
console.log('sim ok',await p.evaluate(()=>{runTime('week');return SIM.detailedList().filter(x=>x.id==='NP_B0002').length}));
console.log('errs',errs);await b.close()})();
