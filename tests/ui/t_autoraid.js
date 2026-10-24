/* 자동 공략 (K-Hunter-Life: 판단 엔진이 가고 말지 · 어디로 · 위기 선택을 정한다, 하루 고정 횟수 없음) — assert */
const path=require('path');const APP='file://'+path.resolve(__dirname,'../../game/index.html');const OUT=process.env.OUT||require('os').tmpdir();
const {chromium}=require('playwright');(async()=>{const b=await chromium.launch({executablePath:process.env.CHROMIUM||undefined});
const errs=[];const p=await (await b.newContext({viewport:{width:1500,height:950}})).newPage();p.on('pageerror',e=>errs.push(e.message));
const ok=(c,m)=>{if(!c)errs.push('단언 실패: '+m)};
await p.goto(APP);await p.addScriptTag({path:require('path').join(__dirname,'fixture.js')});await p.waitForFunction(()=>typeof DB!=='undefined');
await p.evaluate(async()=>{gameFromScenario('SC_BDEMO');enterGame();await poolPrefetch();EVT.pending().forEach(x=>EVT.auto(x));G.offers=[];prefs().play.stop='none'});
/* 1) 선택지 성향 추정 · 위기 선택은 판단 엔진 (이유가 공략 기록에) · 동료가 없으면 협력 선택지 안 고름 */
const r1=await p.evaluate(()=>{const C={choices:[{t:'a',check:{attr:'ABL_A01',dc:15},risk:'위험',okFx:{kills:2}},{t:'b',okFx:{time:20}},{t:'c',needParty:true,check:{attr:'ABL_B15',dc:12},okFx:{progress:1}},{t:'d',check:{attr:'ABL_A24',dc:12},okFx:{stones:3}},{t:'e',okFx:{retreat:true}}]};
  const st=C.choices.map(AUTORAID.inferStyle).join(',');const R={gid:Object.keys(DB.gates)[0],t:0,log:[],party:[{hp:100},{hp:0}]};const picks=new Set();for(let i=0;i<40;i++)picks.add(AUTORAID.choose(R,C));
  return {st,solo:picks.has(2),why:R.log.length,line:R.log[0]?.[2]}});
ok(r1.st==='bold,safe,team,greedy,escape','성향 추정');ok(!r1.solo,'동료 없으면 협력 선택지 안 고름');ok(r1.why>0&&/고른다/.test(r1.line),'고른 이유 기록 '+r1.line);
/* 2) 꺼져 있으면 안 간다 · 켜면 판단해서 한 번 간다 · 이야기 창에 공략 장면 */
const r2=await p.evaluate(()=>{const A=prefs().autoRaid;A.on='off';G.time=600;const off=PLAY.maybeRaid();Object.assign(A,{on:'on',policy:'balanced',km:40,minParty:1});
  G.cond.energy=100;G.cond.hp=100;G.injuries=[];G.bio.pers.PX_ADVEN=10;G.bio.pers.PX_PESSI=1;G.persF={};prefs().play.predict='steady';
  const r0=G.stats?.raids||0;let k=0;while((G.stats?.raids||0)===r0&&k++<30){PLAY.st().gd=-1;PLAY.st().lastRaidAt=-1e9;G.time=600;G.cond.energy=100;G.cond.hp=100;G.injuries=[];PLAY.maybeRaid()}
  return {off,raids:(G.stats.raids||0)-r0,tries:k,scene:G.story.filter(x=>x.k==='raid').length,screen:UI.screen,decide:G.story.some(x=>x.k==='decide')}});
ok(r2.off===null,'꺼짐');ok(r2.raids===1&&r2.scene>2&&r2.decide,'판단해서 공략 · 장면 서술 '+JSON.stringify(r2));
/* 3) 혼자 가지 않기 (방침 minParty) */
const r3=await p.evaluate(()=>{const A=prefs().autoRaid;A.minParty=9;PLAY.st().gd=-1;PLAY.st().lastRaidAt=-1e9;G.time=620;G.cond.energy=100;G.cond.hp=100;G.injuries=[];const r0=G.stats.raids;let k=0;while(k++<20){PLAY.st().gd=-1;PLAY.maybeRaid()}return {raids:G.stats.raids-r0,solo:PLAY.st().solo===G.day}});
ok(r3.raids===0&&r3.solo,'혼자 가지 않기 '+JSON.stringify(r3));
/* 4) 고정 하루 횟수 없음: 기력 · 감정 · 최근 공략으로 판단 (지치면 안 감) */
const r4=await p.evaluate(()=>{prefs().autoRaid.minParty=1;G.cond.energy=10;G.time=600;PLAY.st().gd=-1;PLAY.st().lastRaidAt=-1e9;const r0=G.stats.raids;PLAY.maybeRaid();return {tired:G.stats.raids-r0,blocked:AUTORAID.blocked()}});
ok(r4.tired===0,'지치면 쉼');ok(!/횟수/.test(r4.blocked||''),'하루 횟수 제한 없음');
/* 5) 설정에서 헌터의 방침을 정하지 않는다 (2026-10-24 — 성좌는 헌터의 삶을 정하지 않는다) */
await p.evaluate(()=>{UI.screen='settings';render()});ok(await p.locator('[data-kpref^="autoRaid."]').count()===0,'방침 설정 없음');
await p.screenshot({path:OUT+'/ar_panel.png'});
console.log(JSON.stringify({r1,r2,r3,r4}));console.log('errs',errs);await b.close()})();
