/* UI 스모크 테스트 — tests/ui/README.md 참고 */
const path=require('path');const APP='file://'+path.resolve(__dirname,'../../game/index.html');const OUT=process.env.OUT||require('os').tmpdir();
const {chromium}=require('playwright');(async()=>{const b=await chromium.launch({executablePath:process.env.CHROMIUM||undefined});
const errs=[];const p=await (await b.newContext({viewport:{width:1500,height:950}})).newPage();p.on('pageerror',e=>errs.push(e.message));
await p.goto(''+APP+'');await p.addScriptTag({path:require('path').join(__dirname,'fixture.js')});await p.evaluate(()=>{OBSERVE.legacy=true});await p.waitForTimeout(300);
await p.evaluate(()=>{gameFromScenario('SC_BDEMO');enterGame('inventory');G.cond.mp=40;addInjury('PART_ARM_L','INJ_BLEED',1)});
const idx=await p.evaluate(()=>G.inv.findIndex(r=>r.item==='IT_B0023'&&r.loc==='LOC_BAG'));
await p.evaluate(i=>{UI.invSel=i;render()},idx);await p.click('[data-useitem]');console.log('mp',await p.evaluate(()=>G.cond.mp));
const k=await p.evaluate(()=>G.inv.findIndex(r=>r.item==='IT_B0020'));await p.evaluate(i=>{UI.invSel=i;render()},k);await p.click('[data-useitem]');console.log('inj',await p.evaluate(()=>G.injuries.length));
const s=await p.evaluate(()=>G.inv.findIndex(r=>r.item==='IT_B0001'&&r.loc==='LOC_BAG'));await p.evaluate(i=>{UI.invSel=i;G.time=600;render()},s);
const m0=await p.evaluate(()=>G.money);await p.click('[data-actdo="ACT_ASSOC_SELL"]');console.log('assoc',m0,await p.evaluate(()=>G.money),await p.locator('#toast').innerText());
// wall test
console.log(await p.evaluate(()=>{const h=G.player;h.level=10;h.exp=expNeed(10)+50;const r1=addExp(10);const at=atWall(h);let n=0,res;while(n<1000){res=tryWall(0.5);n++;if(res.length)break}return JSON.stringify({r1,at,n,res,lv:h.level,walls:h.walls})}));
// raid with consumable
await p.evaluate(()=>{const s=gateSt('GT_0006');s.status='open';s.breakAt=nowAbs()+3000;G.simQ=[];UI.prep={gid:'GT_0006',party:[],retreat:20};startRaid('GT_0006');UI.raid.paused=true;render()});
const btn=p.locator('#rItems [data-useitem]');console.log('raid items',await btn.count());if(await btn.count()){await btn.first().click();console.log(await p.evaluate(()=>UI.raid.log.slice(-1)[0][2]))}
await p.screenshot({path:''+OUT+'/u_raid.png'});
console.log('errs',errs);await b.close()})();
