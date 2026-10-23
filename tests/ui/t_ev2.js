/* UI 스모크 테스트 — tests/ui/README.md 참고 */
const path=require('path');const APP='file://'+path.resolve(__dirname,'../../game/index.html');const OUT=process.env.OUT||require('os').tmpdir();
const {chromium}=require('playwright');(async()=>{const b=await chromium.launch({executablePath:process.env.CHROMIUM||undefined});
const errs=[];const p=await (await b.newContext({viewport:{width:1500,height:950}})).newPage();p.on('pageerror',e=>errs.push(e.message));
await p.goto(''+APP+'');await p.addScriptTag({path:require('path').join(__dirname,'fixture.js')});await p.waitForTimeout(300);
await p.evaluate(()=>{gameFromScenario('SC_BDEMO');enterGame()});
console.log(await p.evaluate(()=>{const o=[];
 G.cond.energy=15;o.push('7:'+eligible(DB.events.EV_0007));G.cond.energy=80;o.push('7b:'+eligible(DB.events.EV_0007));
 o.push('8:'+eligible(DB.events.EV_0008));addInjury('rand','INJ_CUT',1);o.push('8b:'+eligible(DB.events.EV_0008));
 const r=relOf('HN_B0002');r.from.RD_ROMANCE=70;G.time=1200;o.push('9:'+eligible(DB.events.EV_0009));
 o.push('10:'+eligible(DB.events.EV_0010));o.push(DB.events.EV_0009.req.map(describeReq).join(' | '));return o.join(' ')}));
// trigger 7 and choose option 2 via UI
/* 알림 화면 (2026-10-23 재설계) — 자세한 확인은 t_alerts.js */
console.log('alerts screen',await p.evaluate(()=>{UI.screen='alerts';render();return !!document.querySelector('[data-alcat]')}));
// trigger 9 msg and accept
await p.evaluate(()=>{triggerEvent('EV_0009','지금');UI.screen='messenger';UI.thWith='HN_B0002';render()});
await p.locator('[data-reply="0"]').click().catch(async()=>{console.log('no reply btn')});
console.log(await p.evaluate(()=>relOf('HN_B0002').status));
// flags chain
await p.evaluate(()=>{G.player.guild=null;G.stats={cleared:1};triggerEvent('EV_0010','지금');const c=DB.events.EV_0010.choices[0],{ok}=judge(c);applyFx(ok?c.okFx:c.ngFx)});
console.log('flag',await p.evaluate(()=>JSON.stringify(G.flags)+' 11:'+eligible(DB.events.EV_0011)+' 10again:'+eligible(DB.events.EV_0010)));
console.log('errs',errs);await b.close()})();
