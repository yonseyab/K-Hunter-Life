/* UI 스모크 테스트 — tests/ui/README.md 참고 */
const path=require('path');const APP='file://'+path.resolve(__dirname,'../../game/index.html');const OUT=process.env.OUT||require('os').tmpdir();
const {chromium}=require('playwright');(async()=>{const b=await chromium.launch({executablePath:process.env.CHROMIUM||undefined});
const errs=[];const p=await (await b.newContext({viewport:{width:1500,height:950}})).newPage();p.on('pageerror',e=>errs.push(e.message));
await p.goto(''+APP+'');await p.addScriptTag({path:require('path').join(__dirname,'fixture.js')});await p.waitForTimeout(300);
await p.evaluate(()=>{gameFromScenario('SC_BDEMO');enterGame()});
console.log(await p.evaluate(()=>{const q={k:'time',from:1080,to:360};return [0,300,359,360,1079,1080,1439].map(t=>{G.time=t;return hhmm(t)+':'+inTime(t,q.from,q.to)}).join(' ')}).catch(e=>'noevalReq'));
console.log(await p.evaluate(()=>{const ev=DB.events.EV_0004;return [600,1200].map(t=>{G.time=t;return hhmm(t)+' '+ev.req.map(describeReq).join(' · ')+' → '+eligible(ev)}).join(' | ')}));
console.log(await p.evaluate(()=>[...document.querySelectorAll('#nav [data-go]')].map(b=>b.dataset.go).join(',')));
await p.click('#nav [data-go="db"]');await p.locator('tr[data-dbsel="HN_B0004"]').click();
console.log(await p.evaluate(()=>UI.screen+' '+UI.profileId+' nav:'+document.querySelector('#nav [aria-current]')?.dataset.go));
await p.evaluate(()=>{UI.screen='status';render()});await p.locator('[data-hunter]').first().click();console.log(await p.evaluate(()=>UI.screen+' '+UI.profileId));
console.log('errs',errs);await b.close()})();
