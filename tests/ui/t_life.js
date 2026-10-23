/* UI 스모크 테스트 — tests/ui/README.md 참고 */
const path=require('path');const APP='file://'+path.resolve(__dirname,'../../game/index.html');const OUT=process.env.OUT||require('os').tmpdir();
const {chromium}=require('playwright');(async()=>{const b=await chromium.launch({executablePath:process.env.CHROMIUM||undefined});
const errs=[];const p=await (await b.newContext({viewport:{width:1500,height:950}})).newPage();p.on('pageerror',e=>errs.push(e.message));
await p.goto(APP);await p.addScriptTag({path:require('path').join(__dirname,'fixture.js')});await p.waitForTimeout(300);
/* 데모(3/14 시작)에서 4/1 고정 지출이 빠지는지, 돈이 모자라면 연체 알림이 오는지 */
await p.evaluate(()=>{gameFromScenario('SC_BDEMO');enterGame();G.stopOn.event=false;G.stopOn.lowEnergy=false});
const m0=await p.evaluate(()=>G.money);
await p.evaluate(()=>{runTime('week');runTime('week');runTime('week')});
console.log('money',m0,'→',await p.evaluate(()=>G.money),await p.evaluate(()=>G.ledger.filter(l=>l[1].startsWith('월세')).map(l=>l[0]).join(',')));
await p.evaluate(()=>{G.money=100000;G.lastDay=G.day;const d=G.day;let k=0;while(new Date(2026,2,9+d+k).getDate()!==1)k++;G.day=d+k;dayTick()});
console.log('debt',await p.evaluate(()=>G.money),await p.evaluate(()=>G.alerts[0].subj));
await p.evaluate(()=>{UI.screen='finance';render()});await p.screenshot({path:OUT+'/life_finance.png'});
console.log('errs',errs);await b.close()})();
