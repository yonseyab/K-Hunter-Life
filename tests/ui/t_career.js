/* UI 스모크 테스트 — tests/ui/README.md 참고 */
const path=require('path');const APP='file://'+path.resolve(__dirname,'../../game/index.html');const OUT=process.env.OUT||require('os').tmpdir();
const {chromium}=require('playwright');(async()=>{const b=await chromium.launch({executablePath:process.env.CHROMIUM||undefined});
const errs=[];const p=await (await b.newContext({viewport:{width:1500,height:950}})).newPage();p.on('pageerror',e=>errs.push(e.message+' '+(e.stack||'').split('\n')[1]));
await p.goto(APP);await p.addScriptTag({path:require('path').join(__dirname,'fixture.js')});await p.waitForTimeout(300);
/* 비각성자 생활 루프: 직업 · 직급 · 승진/해고/취업/졸업 · 자영업 · 가족 메시지 · 실업률 */
await p.evaluate(()=>{gameFromScenario('SC_BDEMO');enterGame();G.stopOn.event=false;G.stopOn.lowEnergy=false});
console.log('family',await p.evaluate(()=>['NP_B0001','NP_B0002','NP_B0003'].map(id=>SIM.jobTitle(P(id))+' '+won(SIM.payOf(SIM.careerOf(P(id))))).join(' | ')));
console.log('pop',await p.evaluate(()=>{const S=SIM.stats();return `civ ${S.civ} unemp ${S.unemp} (${(S.unemp/S.civ*100).toFixed(1)}%)`}));
/* 동생을 졸업 직전으로 → 한 달 안에 졸업 · 취업 메시지 */
await p.evaluate(()=>{const c=SIM.careerOf(P('NP_B0002'));c.tot=47;for(let i=0;i<5;i++)runTime('week')});
console.log('sister',await p.evaluate(()=>[SIM.jobTitle(P('NP_B0002')),JSON.stringify(G.ai.NP_B0002.careerLog||[]),(threadWith('NP_B0002').msgs.slice(-1)[0]||{}).t]));
console.log('world career',await p.evaluate(()=>{let n={};for(let k=0;k<1;k++){}return JSON.stringify(G.simStat.career)}));
console.log('pop after',await p.evaluate(()=>{const S=SIM.stats();return `unemp ${S.unemp} (${(S.unemp/S.civ*100).toFixed(1)}%) avg ${won(S.avgMoney)}`}));
await p.evaluate(()=>{DB_UI.open('people','NP_B0002')});await p.screenshot({path:OUT+'/career_db.png'});
/* 배경 인구 일반인 승격 → 경력 이어짐 */
console.log('promo civ',await p.evaluate(()=>{const r=SIM.search('','NPC',1).rows[0];const o=P(r.id);return r.job+' → '+SIM.jobTitle(o)}));
console.log('errs',errs);await b.close()})();
