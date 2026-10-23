/* UI 스모크 테스트 — tests/ui/README.md 참고 */
const path=require('path');const APP='file://'+path.resolve(__dirname,'../../game/index.html');const OUT=process.env.OUT||require('os').tmpdir();
const {chromium}=require('playwright');(async()=>{const b=await chromium.launch({executablePath:process.env.CHROMIUM||undefined});
const errs=[];const p=await (await b.newContext({viewport:{width:1500,height:950}})).newPage();p.on('pageerror',e=>errs.push(e.message));
await p.goto(''+APP+'');await p.addScriptTag({path:require('path').join(__dirname,'fixture.js')});await p.waitForTimeout(300);
await p.evaluate(()=>{gameFromScenario('SC_BDEMO');enterGame('relations')});
await p.click('.tools [data-set="dev"]');console.log(await p.evaluate(()=>SETTINGS.dev), (await p.locator('.rlist tbody tr').first().innerText()).replace(/\s+/g,' '));
await p.evaluate(()=>{UI.screen='profile';UI.profileId='HN_B0009';render()});console.log((await p.locator('.hprof').innerText()).includes('Lv.70'));
await p.evaluate(()=>{UI.screen='gates';UI.gateSel='GT_0003';render()});console.log((await p.locator('.kv').first().innerText()).replace(/\n/g,' ').slice(0,200));
await p.click('.tools [data-set="dev"]');console.log(await p.evaluate(()=>SETTINGS.dev));
console.log('errs',errs);await b.close()})();
