/* UI 스모크 테스트 — 공략 밸런스: 게이트 등급별 성공률 (데모 캐릭터 13급 + 길드 파티, 30회씩) */
const path=require('path');const APP='file://'+path.resolve(__dirname,'../../game/index.html');
const {chromium}=require('playwright');(async()=>{const b=await chromium.launch({executablePath:process.env.CHROMIUM||undefined});const p=await b.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message));
await p.goto(APP);await p.addScriptTag({path:require('path').join(__dirname,'fixture.js')});await p.waitForTimeout(300);
const r=await p.evaluate(()=>{gameFromScenario('SC_BDEMO');enterGame();const out={};
 for(const gid of ['GT_0001','GT_0002','GT_0003','GT_0005']){let ok=0,t=0,dm=0;for(let i=0;i<30;i++){(s=>{s.status='open';s.breakAt=nowAbs()+3000;G.simQ=[]})(gateSt(gid));UI.prep={gid,party:raidParty().slice(1).map(h=>h.id),retreat:35};startRaid(gid);clearInterval(UI._rt);const R=UI.raid;R.speed=1;let n=0;while(!R.done&&n<2000){if(R.crisis){resolveCrisis(R.crisis&&DB.crises[R.crisis.id].choices.length-1)}else{R.paused=false;raidTick()}n++}if(R.floor>=R.floors)ok++;t+=R.t;dm+=R.dmg;G.cond.hp=100;G.cond.energy=100;G.injuries=[];gateSt(gid).status='open'}
  out[gid]=`${DB.ranks[DB.gates[gid].rank].name}급 pow ${raidPower({gid,party:raidParty().map(h=>({id:h.id,hp:1}))}).r.toFixed(2)} 성공 ${ok}/30 평균 ${Math.round(t/30)}분`}
 return out});console.log(r);console.log('errs',errs);await b.close()})();
