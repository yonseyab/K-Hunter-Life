/* UI 스모크 테스트 — tests/ui/README.md 참고 */
const path=require('path');const APP='file://'+path.resolve(__dirname,'../../game/index.html');const OUT=process.env.OUT||require('os').tmpdir();
const {chromium}=require('playwright');(async()=>{const b=await chromium.launch({executablePath:process.env.CHROMIUM||undefined});
const errs=[];const p=await (await b.newContext({viewport:{width:1500,height:950}})).newPage();p.on('pageerror',e=>errs.push(e.message));
await p.goto(APP);await p.addScriptTag({path:require('path').join(__dirname,'fixture.js')});await p.evaluate(()=>{OBSERVE.legacy=true});await p.waitForTimeout(300);
/* 입찰 게이트 GT_0003: 1000만 입찰 → 마감 뒤 결과. 무허가 공략 적발 */
await p.evaluate(()=>{gameFromScenario('SC_BDEMO');enterGame('gates');G.money=20000000;UI.gateSel='GT_0003';G.stopOn.event=false;render()});
await p.locator('[data-bid^="GT_0003|"]').last().click(); /* 입찰 단계는 게이트 총수익 비율 (BAL_ECON.bidSteps) */console.log('after bid',await p.evaluate(()=>G.money+' '+gateSt('GT_0003').myBid));
await p.screenshot({path:OUT+'/bid.png'});
await p.evaluate(()=>{runTime('morning')});
console.log('result',await p.evaluate(()=>JSON.stringify({w:gateSt('GT_0003').winner,permit:gateSt('GT_0003').permit,money:G.money,st:gateStatus(DB.gates.GT_0003)})));
/* 무허가: 흑익 길드 게이트 GT_0004 */
const caught=await p.evaluate(()=>{let n=0;for(let i=0;i<20;i++){const before=G.money;const s=gateSt('GT_0004');s.status='open';s.breakAt=nowAbs()+3000;G.simQ=[];UI.prep={gid:'GT_0004',party:[],retreat:20};startRaid('GT_0004');UI.raid.done=true;finishRaid(false);if(G.money<before-1000000)n++}return n});
console.log('caught of 20',caught);
console.log('errs',errs);await b.close()})();
