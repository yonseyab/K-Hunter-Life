/* UI 스모크 테스트 — tests/ui/README.md 참고 */
const path=require('path');const APP='file://'+path.resolve(__dirname,'../../game/index.html');const OUT=process.env.OUT||require('os').tmpdir();
const {chromium}=require('playwright');(async()=>{const b=await chromium.launch({executablePath:process.env.CHROMIUM||undefined});
const errs=[];const p=await (await b.newContext({viewport:{width:1500,height:950}})).newPage();p.on('pageerror',e=>errs.push(e.message));
await p.goto(''+APP+'');await p.addScriptTag({path:require('path').join(__dirname,'fixture.js')});await p.evaluate(()=>{OBSERVE.legacy=true});await p.waitForTimeout(300);
await p.evaluate(()=>{gameFromScenario('SC_BDEMO');enterGame('relations')});await p.screenshot({path:''+OUT+'/r_list.png'});
await p.click('tr[data-relsel="HN_B0002"]');await p.screenshot({path:''+OUT+'/r_seo.png',fullPage:true});
const r0=await p.evaluate(()=>JSON.stringify([relOf('HN_B0002').to,relOf('HN_B0002').from,relOf('HN_B0002').status]));console.log(r0);
await p.evaluate(()=>{G.time=600;Object.values(G.ai||{}).forEach(a=>a.today=[]);render()});
await p.locator('[data-actdo="ACT_MEET"]').click();await p.locator('[data-actdo="ACT_GIFT"]').click();
await p.locator('[data-actdo="ACT_CONFESS"]').click();console.log((await p.locator('#toast').innerText()).replace(/\n/g,' | '));
console.log(await p.evaluate(()=>JSON.stringify([relOf('HN_B0002').from.RD_LIKE,relOf('HN_B0002').from.RD_ROMANCE,relOf('HN_B0002').status])));
await p.click('tr[data-relsel="NP_B0002"]');console.log('sister confess disabled:',await p.locator('[data-actdo="ACT_CONFESS"]').isDisabled());
// event rel fx still works
await p.evaluate(()=>{triggerEvent('EV_0002','now')});
await p.evaluate(()=>{UI.screen='profile';UI.profileId='HN_B0002';render()});
await p.evaluate(()=>{UI.screen='home';render()});
// creation looks
await p.evaluate(()=>{UI.mode='create';UI.cc=newCC();UI.cc.step=6;UI.cc.ab=genStart('real',Math.random);UI.cc.abEdit=true;render()});
await p.fill('[data-abk="APS_FACE"]','18');await p.locator('[data-abk="APS_FACE"]').press('Tab');console.log('looks',await p.evaluate(()=>JSON.stringify(UI.cc.ab.looks)));
await p.evaluate(()=>{autoAll(UI.cc);gameFromCreation(UI.cc);enterGame('relations')});console.log('newrel',await p.evaluate(()=>G.relations.length+' '+JSON.stringify(G.player.looks)));
await p.setViewportSize({width:400,height:850});await p.evaluate(()=>{UI.screen='relations';render()});console.log('w',await p.evaluate(()=>document.documentElement.scrollWidth));
console.log('errs',errs);await b.close()})();
