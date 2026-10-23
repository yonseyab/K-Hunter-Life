/* UI 스모크 테스트 — tests/ui/README.md 참고 */
const path=require('path');const APP='file://'+path.resolve(__dirname,'../../game/index.html');const OUT=process.env.OUT||require('os').tmpdir();
const {chromium}=require('playwright');(async()=>{const b=await chromium.launch({executablePath:process.env.CHROMIUM||undefined});
const errs=[];const p=await (await b.newContext({viewport:{width:1500,height:950}})).newPage();p.on('pageerror',e=>errs.push(e.message+' '+(e.stack||'').split('\n')[1]));
await p.goto(APP);await p.addScriptTag({path:require('path').join(__dirname,'fixture.js')});await p.waitForTimeout(300);
/* 동거 생활비 분담: 비율 선택 · 상대 돈에서 상대 몫 · 상대가 못 내면 대신 냄 */
await p.evaluate(()=>{gameFromScenario('SC_BDEMO');enterGame('finance');const r=relOf('HN_B0002');r.status='RS_SPOUSE';homeOf().partner='HN_B0002';G.money=10000000;render()});
console.log('full vs mine',await p.evaluate(()=>[fixedCosts(true).reduce((a,x)=>a+x[1],0),fixedCosts().reduce((a,x)=>a+x[1],0),partnerShare()]));
await p.click('[data-split="0.7"]');
console.log('split 0.7',await p.evaluate(()=>[mySplit(),fixedCosts().map(x=>x.join(':')).join(' | '),partnerShare()]));
console.log('pay ok',await p.evaluate(()=>{const ag=(G.ai=G.ai||{})['HN_B0002']||(G.ai['HN_B0002']={});ag.money=5000000;const m0=G.money,a0=ag.money,lk=relOf('HN_B0002').from.RD_LIKE;let d=G.day;while(new Date(2026,2,9+d).getDate()!==1)d++;lifeDay(d);return [m0-G.money,a0-ag.money,relOf('HN_B0002').from.RD_LIKE-lk]}));
console.log('pay short',await p.evaluate(()=>{const ag=G.ai['HN_B0002'];ag.money=1000;const m0=G.money;let d=G.day+1;while(new Date(2026,2,9+d).getDate()!==1)d++;lifeDay(d);return [m0-G.money,ag.money,G.alerts[0].subj,G.ledger[0].join(' ')]}));
await p.screenshot({path:OUT+'/split.png'});
console.log('errs',errs);await b.close()})();
