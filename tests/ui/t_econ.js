/* 경제 기준(BAL_ECON) · 커마 발동 조건(checkCC) — tests/ui/README.md 참고 */
const path=require('path');const APP='file://'+path.resolve(__dirname,'../../game/index.html');
const {chromium}=require('playwright');(async()=>{const b=await chromium.launch({executablePath:process.env.CHROMIUM||undefined});
const errs=[];const p=await (await b.newContext()).newPage();p.on('pageerror',e=>errs.push(e.message));const ok=(c,m)=>{if(!c)errs.push('단언 실패: '+m)};
await p.goto(APP);await p.addScriptTag({path:require('path').join(__dirname,'fixture.js')});await p.waitForTimeout(300);
/* 경제 */
const e=await p.evaluate(()=>{gameFromScenario('SC_BDEMO');enterGame();const g20={rank:'RANK_20'},g10={rank:'RANK_10'},g1={rank:'RANK_01'};
  return {v20:gateValue(20),v15:gateValue(15),v10:gateValue(10),v1:gateValue(1),s20:stoneFor(20),s15:stoneFor(15),s8:stoneFor(8),s3:stoneFor(3),
    p4:raidPayout(g20,true,1,4),fail:raidPayout(g20,false,0.5,4),fail0:raidPayout(g20,false,0,4)}});
console.log(JSON.stringify(e));
ok(e.v20===1000000&&Math.abs(e.v15-6630000)<20000&&e.v10>4e7&&e.v1>1.2e9,'게이트 총수익');ok(/^IT_ST20_[1-4]$/.test(e.s20)&&/^IT_ST15_[1-4]$/.test(e.s15)&&/^IT_ST08_[1-4]$/.test(e.s8)&&/^IT_ST03_[1-4]$/.test(e.s3),'마정석 = 게이트 등급 × 품질');
ok(e.p4===250000&&e.fail===50000&&e.fail0===25000,'몫 · 실패');
/* 커마 발동 조건 */
const c=await p.evaluate(()=>{G.player.sex='여';G.bio=G.bio||{};G.bio.look={LK_CHEST_S:'SZ_5',LK_FIGURE:'LV_4',LK_HEIGHT:165,LK_WEIGHT:48};G.player.look=G.bio.look;G.bio.bg={BI_HOOD:['NB_0001','NB_0003'],BI_JOB:'JB_0004'};G.bio.pers={PX_EXTRO:9};G.bio.blood='AB';
  const t=q=>checkReq(q,null);return {
    look:t({k:'look',item:'LK_CHEST_S',in:['SZ_5']}),lookNo:t({k:'look',item:'LK_CHEST_S',in:['SZ_1']}),num:t({k:'lookNum',item:'LK_HEIGHT',min:160,max:170}),
    bmi:t({k:'bmi',max:18}),bg:t({k:'bg',item:'BI_HOOD',in:['NB_0003']}),pers:t({k:'pers',axis:'PX_EXTRO',min:8}),sex:t({k:'sex',v:'여'}),sexNo:t({k:'sex',v:'남'}),
    basic:t({k:'basic',key:'blood',in:['AB']}),combo:t({k:'all',of:[{k:'sex',v:'여'},{k:'look',item:'LK_FIGURE',in:['LV_4','LV_5']}]}),
    val:VALIDATE.reqErrs({k:'look',item:'LK_NOPE',in:['x']},DB,'t').length>0&&VALIDATE.reqErrs({k:'pers',axis:'PX_EXTRO',min:8},DB,'t').length===0}});
console.log(JSON.stringify(c));ok(c.look&&!c.lookNo&&c.num&&c.bmi&&c.bg&&c.pers&&c.sex&&!c.sexNo&&c.basic&&c.combo&&c.val,'커마 조건');
console.log('errs',errs);await b.close()})();
