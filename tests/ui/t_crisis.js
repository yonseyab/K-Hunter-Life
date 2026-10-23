/* UI 스모크 테스트 — tests/ui/README.md 참고 */
const path=require('path');const APP='file://'+path.resolve(__dirname,'../../game/index.html');const OUT=process.env.OUT||require('os').tmpdir();
const {chromium}=require('playwright');(async()=>{const b=await chromium.launch({executablePath:process.env.CHROMIUM||undefined});
const errs=[];const p=await (await b.newContext({viewport:{width:1500,height:950}})).newPage();p.on('pageerror',e=>errs.push(e.message));
await p.goto(APP);await p.addScriptTag({path:require('path').join(__dirname,'fixture.js')});await p.waitForTimeout(300);
/* 위기 조건: 몬스터 분류 · 게이트 형태 · 등급 범위에 맞는 위기만 나오는지 */
await p.evaluate(()=>{gameFromScenario('SC_BDEMO');enterGame()});
const r=await p.evaluate(()=>{const out={};vals('gates').forEach(g=>{out[g.name+'('+DB.monsters[g.mon].name+','+g.type+')']=vals('crises').filter(c=>c.when!=='boss'&&crisisFits(c,g)).map(c=>c.id.slice(3)).join(',')});return out});
console.log(r);
/* 같은 공략 안에서는 겹치지 않게 */
const seq=await p.evaluate(()=>{UI.raid={gid:'GT_0001',party:[{n:'나',hp:100,mp:100},{n:'동료',id:null,hp:100,mp:100}],crN:0,log:[],loot:[],inj:[],t:0,kills:0,stones:0,floor:1,floors:5};const ids=[];for(let i=0;i<5;i++){raidCrisis('fight');ids.push(UI.raid.crisis.id)}const fx=raidFx({stress:5});UI.raid=null;return [ids,fx]});
console.log('seq',seq);
console.log('errs',errs);await b.close()})();
