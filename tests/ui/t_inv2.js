/* UI 스모크 테스트 — tests/ui/README.md 참고 */
const path=require('path');const APP='file://'+path.resolve(__dirname,'../../game/index.html');const OUT=process.env.OUT||require('os').tmpdir();
const {chromium}=require('playwright');(async()=>{const b=await chromium.launch({executablePath:process.env.CHROMIUM||undefined});
const errs=[];const p=await (await b.newContext({viewport:{width:1500,height:950}})).newPage();p.on('pageerror',e=>errs.push(e.message));
await p.goto(''+APP+'');await p.addScriptTag({path:require('path').join(__dirname,'fixture.js')});await p.waitForTimeout(300);
await p.evaluate(()=>{gameFromScenario('SC_BDEMO');enterGame('inventory')});
console.log(await p.evaluate(()=>[...document.querySelectorAll('[data-invloc]')].map(b=>b.innerText).join(' | ')));
await p.locator('tr[data-invsel]').first().click();await p.locator('[data-shoptab-go]').click();console.log(await p.evaluate(()=>UI.screen+' '+UI.shopTab));
await p.locator('[data-shopsell]').click();
await p.click('[data-shoptab="buy"]');await p.click('[data-shopsel="SS_B0001"]');await p.click('[data-shopbuy="SS_B0001"]');
console.log(await p.evaluate(()=>G.inv.filter(r=>r.item==='IT_B0023').map(r=>r.loc+':'+r.qty).join(',')));
await p.click('#nav [data-go="inventory"]');await p.screenshot({path:''+OUT+'/s_inv2.png'});
await p.evaluate(()=>{UI.screen='db';UI.dbTab='ITEM';render()});await p.evaluate(()=>{UI.screen='status';render()});
await p.setViewportSize({width:400,height:850});for(const k of ['inventory','shop']){await p.evaluate(k=>{UI.screen=k;render()},k);console.log(k,await p.evaluate(()=>document.documentElement.scrollWidth))}
await p.evaluate(()=>{const c=newCC();autoAll(c);gameFromCreation(c);enterGame('inventory')});await p.evaluate(()=>{UI.screen='shop';UI.shopTab='sell';render()});
console.log('errs',errs);await b.close()})();
