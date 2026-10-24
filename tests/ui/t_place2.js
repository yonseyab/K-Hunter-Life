/* UI 스모크 테스트 — tests/ui/README.md 참고 */
const path=require('path');const APP='file://'+path.resolve(__dirname,'../../game/index.html');const OUT=process.env.OUT||require('os').tmpdir();
const {chromium}=require('playwright');(async()=>{const b=await chromium.launch({executablePath:process.env.CHROMIUM||undefined});
const errs=[];const p=await (await b.newContext({viewport:{width:1500,height:950}})).newPage();p.on('pageerror',e=>errs.push(e.message+' '+(e.stack||'').split('\n')[1]));
await p.goto(APP);await p.addScriptTag({path:require('path').join(__dirname,'fixture.js')});await p.waitForTimeout(300);
/* 장소 2차: 일반인 일터 지역 · 출퇴근(시간 · 요금 · 기력) · 근무 중 위치 · 출근 중 바쁨 */
await p.evaluate(()=>{gameFromScenario('SC_BDEMO');enterGame();G.stopOn.event=false;G.stopOn.lowEnergy=false});
console.log('work',await p.evaluate(()=>['NP_B0001','NP_B0002','NP_B0003'].map(id=>{const c=SIM.commuteOf(P(id));return P(id).name+':'+(c?regionName(c.region)+' '+c.min+'분 '+c.fare+'원':'없음')}).join(' | ')));
/* 평일 근무 시간대 위치 */
console.log('where',await p.evaluate(()=>{const id='NP_B0003',c=SIM.careerOf(P(id));c.work='RG_SEOUL_EUNPYEONG';let d=G.day;while(((d%7)+7)%7>=5)d++;G.day=d;G.time=0;G.lastDay=d-1;dayTick();
  const T=G.ai[id].today.filter(x=>x.act==='ACT_WORK');if(!T.length)return 'no work today: '+G.ai[id].today.map(x=>x.act).join(',');const out=[];for(const t of [T[0].s+5,T[0].s+120,T.at(-1).e-5]){G.time=t;const w=npcWhere(id);out.push(`${hhmm(t)} ${placeName(w)} ${w.busy||''}`)}return out.join(' / ')}));
console.log('commute cost',await p.evaluate(()=>JSON.stringify(G.ai.NP_B0003.commute||null)));
await p.evaluate(()=>{relOf('NP_B0003').to.RD_CLOSE=40;DB_UI.open('people','NP_B0003')});
console.log('detail',(await p.locator('#dbx-det').innerText()).match(/일터[^\n]*\n?[^\n]*/)?.[0]?.replace(/\n/g,' '));
console.log('errs',errs);await b.close()})();
