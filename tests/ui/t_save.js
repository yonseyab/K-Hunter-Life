/* UI 스모크 테스트 — tests/ui/README.md 참고 */
const path=require('path');const APP='file://'+path.resolve(__dirname,'../../game/index.html');const OUT=process.env.OUT||require('os').tmpdir();
const {chromium}=require('playwright');(async()=>{const b=await chromium.launch({executablePath:process.env.CHROMIUM||undefined});
const errs=[];const p=await (await b.newContext({viewport:{width:1500,height:950}})).newPage();p.on('pageerror',e=>errs.push(e.message));
await p.goto(APP);await p.addScriptTag({path:require('path').join(__dirname,'fixture.js')});await p.waitForTimeout(300);
/* 슬롯 여러 개 · 자동 저장 · 지우기 · 사망 세이브 */
await p.evaluate(()=>{localStorage.removeItem('hl.saves.v1');gameFromScenario('SC_BDEMO');enterGame();G.stopOn.event=false;G.stopOn.lowEnergy=false});
await p.click('[data-savemenu]');await p.screenshot({path:OUT+'/save_menu.png'});
await p.click('[data-save="slot2"]');
await p.evaluate(()=>{runTime('morning')});
console.log('slots',await p.evaluate(()=>store.get(SAVE_KEY,[]).map(s=>s.slot.replace(/auto-\d+/,'auto')+':'+s.when)));
await p.evaluate(()=>{die('테스트 사망')});
console.log('dead marks',await p.evaluate(()=>store.get(SAVE_KEY,[]).map(s=>!!s.dead)));
await p.evaluate(()=>{goTitle();UI.panel='load';render()});
console.log('continue label',await p.evaluate(()=>document.querySelector('[data-title="continue"] small').textContent));
const n0=await p.evaluate(()=>store.get(SAVE_KEY,[]).length);
await p.click('[data-savedel="slot2"]');await p.click('[data-savedel="slot2"]');
console.log('del',n0,'→',await p.evaluate(()=>store.get(SAVE_KEY,[]).length));
await p.screenshot({path:OUT+'/save_title.png'});
console.log('errs',errs);await b.close()})();
