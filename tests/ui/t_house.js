/* UI 스모크 테스트 — tests/ui/README.md 참고 */
const path=require('path');const APP='file://'+path.resolve(__dirname,'../../game/index.html');const OUT=process.env.OUT||require('os').tmpdir();
const {chromium}=require('playwright');(async()=>{const b=await chromium.launch({executablePath:process.env.CHROMIUM||undefined});
const errs=[];const p=await (await b.newContext({viewport:{width:1500,height:950}})).newPage();p.on('pageerror',e=>errs.push(e.message));
await p.goto(APP);await p.addScriptTag({path:require('path').join(__dirname,'fixture.js')});await p.waitForTimeout(300);
/* 재정 화면에서 강남 투룸으로 이사 → 거주 지역 · 월세 · 시간 */
await p.evaluate(()=>{gameFromScenario('SC_BDEMO');enterGame('finance');G.money=30000000;render()});
await p.selectOption('[data-mvreg]','RG_SEOUL_GANGNAM');await p.click('[data-move="HOU_TWO|RG_SEOUL_GANGNAM"]');
console.log(await p.evaluate(()=>JSON.stringify({home:G.home,region:G.player.region,money:G.money,t:hhmm(G.time),fixed:fixedCosts()[0]})));
await p.screenshot({path:OUT+'/house.png'});
/* 계약 만료 뒤 다시 이사 → 보증금 전액 반환, 위약금 없음 */
console.log('refund',await p.evaluate(()=>{G.day=G.home.leaseEnd+1;const m0=G.money,L=leaveTerms();moveHome('HOU_ONE','RG_SEOUL_MAPO');return [L.early,L.refund,G.money-m0,G.ledger.slice(0,2).map(l=>l[1]).join(' / ')]}));
await p.setViewportSize({width:400,height:850});await p.evaluate(()=>render());console.log('w',await p.evaluate(()=>document.documentElement.scrollWidth));
console.log('errs',errs);await b.close()})();
