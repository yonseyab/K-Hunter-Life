/* UI 스모크 테스트 — tests/ui/README.md 참고 */
const path=require('path');const APP='file://'+path.resolve(__dirname,'../../game/index.html');const OUT=process.env.OUT||require('os').tmpdir();
const {chromium}=require('playwright');(async()=>{const b=await chromium.launch({executablePath:process.env.CHROMIUM||undefined});
const errs=[];const p=await (await b.newContext({viewport:{width:1500,height:950}})).newPage();p.on('pageerror',e=>errs.push(e.message));
await p.goto(APP);await p.addScriptTag({path:require('path').join(__dirname,'fixture.js')});await p.waitForTimeout(300);
/* 데모: 장검 착용 중. 가방에 단검을 넣고 착용하면 장검이 가방으로 */
await p.evaluate(()=>{gameFromScenario('SC_BDEMO');enterGame('inventory');invAdd('IT_B0021',1,'LOC_BAG');UI.invSel=G.inv.findIndex(r=>r.item==='IT_B0021'&&r.loc==='LOC_BAG');render()});
await p.click('[data-equip$="|on"]');
console.log(await p.evaluate(()=>G.inv.filter(r=>DB.items[r.item].slot==='SLOT_WEAPON').map(r=>r.item+':'+r.loc).join(' ')));
await p.click('[data-equip$="|off"]');
console.log(await p.evaluate(()=>G.inv.filter(r=>DB.items[r.item].slot==='SLOT_WEAPON').map(r=>r.item+':'+r.loc).join(' ')));
console.log('errs',errs);await b.close()})();
