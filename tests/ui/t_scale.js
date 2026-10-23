/* 인구 · 게이트 규모 (2026-10-23 세계 설정: 각성 0.5% · 활동 0.2% · 하루 약 5,500개) · 개별/집계 · 전국 현황 화면 — assert */
const path=require('path');const APP='file://'+path.resolve(__dirname,'../../game/index.html');
const {chromium}=require('playwright');(async()=>{const b=await chromium.launch({executablePath:process.env.CHROMIUM||undefined});
const errs=[];const p=await (await b.newContext({viewport:{width:1500,height:950}})).newPage();p.on('pageerror',e=>errs.push(e.message));
const ok=(c,m)=>{if(!c)errs.push('단언 실패: '+m)};
await p.goto(APP);await p.waitForFunction(()=>typeof DB!=='undefined');
const r=await p.evaluate(async()=>{await packsLoad();gameFromScenario('SC_BDEMO');enterGame();await poolPrefetch();
  const N=SCALE.national(),seoul=SCALE.provPop('SEOUL'),mapo=SCALE.gatesPerDayIn('RG_SEOUL_MAPO'),loc=SCALE.localRegions(),Z=G.pop.scale;
  /* 하루 집계 */ const rows=[];for(let i=0;i<3;i++)rows.push(SCALE.day(G.day+i));
  /* 개별 게이트: 하루 진행 뒤 개수 · 다른 헌터 공략 비율 */
  prefs().play.stop='none';prefs().autoRaid.on='off';const g0=G.genSeq||0;for(let k=0;k<4;k++)PLAY.runSync(1440,60);const born=(G.genSeq||0)-g0;
  const all=Object.values(G.genGates),closed=all.filter(g=>gateSt(g.id).status!=='open'),cleared=all.filter(g=>gateSt(g.id).status==='cleared'),broken=all.filter(g=>gateSt(g.id).status==='broken');
  const used=Object.values(G.gpUsed||{}).reduce((a,x)=>a+x.length,0);
  return {awake:Math.round(N.awake),active:Math.round(N.active),perDay:Math.round(N.gatesPerDay),seoul:Math.round(seoul),mapo:Math.round(mapo*10)/10,loc:loc.length,Z,agg:rows.map(x=>x.n),born,open:all.length-closed.length,cleared:cleared.length,broken:broken.length,used,idle:(()=>{const P=SIM.POP;let a=0,i=0;for(let k=0;k<P.n;k++){if(P.flags[k]&2){a++;if(P.flags[k]&16)i++}}return {a,i}})()}});
ok(Math.abs(r.awake-258500)<2000&&Math.abs(r.active-103400)<1000,'각성 0.5% · 활동 0.2% '+r.awake+' '+r.active);
ok(r.perDay>5000&&r.perDay<6000,'전국 하루 게이트 약 5,500 '+r.perDay);
ok(r.mapo>25&&r.mapo<60,'마포 하루 약 40 '+r.mapo);ok(r.loc>=2&&r.loc<=DB_LOCALMAX(),'개별 게이트 범위 '+r.loc);
function DB_LOCALMAX(){return 8}
ok(r.agg.every(n=>n>3500&&n<6500),'집계 하루 발생 '+r.agg);
ok(r.Z&&r.Z.nA<=24000&&r.Z.awake>r.Z.active,'생활권 인구 '+JSON.stringify(r.Z));
ok(r.idle.i/r.idle.a>0.5&&r.idle.i/r.idle.a<0.7,'비활동 각성자 약 60% '+JSON.stringify(r.idle));
ok(r.born>100,'4일 개별 게이트 생성 '+r.born);ok(r.cleared>r.broken*3,'대부분 다른 헌터가 공략 '+r.cleared+'/'+r.broken);
ok(r.used<r.born,'쓴 장소 기록이 쌓이지 않음 (정리) '+r.used+'/'+r.born);
/* 전국 현황 화면 */
await p.evaluate(()=>{UI.screen='world';render()});ok(await p.locator('h1:has-text("전국 현황")').count()===1,'전국 현황 화면');
ok((await p.locator('.tbl tbody tr').count())>=17,'시도별 표');
console.log(JSON.stringify(r));console.log('errs',JSON.stringify(errs));await b.close()})();
