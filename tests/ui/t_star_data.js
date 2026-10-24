/* 2026-10-24: 빈 표 구조 — 축복(판정 · 전투 보정 · 재사용) · 성좌 메시지(on · once · known) · 스탯 포인트 규칙 */
const {chromium}=require('playwright'),path=require('path'),assert=require('assert/strict');
(async()=>{const b=await chromium.launch({executablePath:process.env.CHROMIUM});try{const p=await b.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.stack));
await p.goto('file://'+path.resolve(__dirname,'../../game/index.html'));
const r=await p.evaluate(async()=>{localStorage.clear();await packsLoad();gameFromScenario('SC_BDEMO');enterGame();
 def('starBlessings',[{id:'SBL_T1',name:'시험 축복',coin:10,days:1,cd:2,fx:{check:{ABL_A01:3},cstat:{atk:1.5}}}]);
 def('starMessages',[{id:'SMS_T1',on:'levelUp',text:'{name}, 레벨 {level}.',once:true},{id:'SMS_T2',on:'raidWin',text:'안다',known:true}]);
 G.coin=100;const a0=COMBAT.fromHunter(G.player).atk;const ok=STAR.bless('SBL_T1'),again=STAR.bless('SBL_T1');const a1=COMBAT.fromHunter(G.player).atk;const m=checkMods('ABL_A01').parts.map(x=>x[0]);
 const s1=STAR.say('levelUp',{level:9}),s2=STAR.say('levelUp',{level:10});G.starKnown=false;const s3=STAR.say('raidWin',{});
 G.time+=2*1440;G.day+=2;STAR.blessTick();const a2=COMBAT.fromHunter(G.player).atk;
 G.player.statPts=10;const add=autoStatAlloc();
 return {ok,again,a0,a1,a2,m,s1,s2,s3,coin:G.coin,add:Object.values(add).reduce((x,y)=>x+y,0),pts:G.player.statPts}});
assert.equal(r.ok,true);assert.equal(r.again,false);assert(r.a1>r.a0*1.4);assert(r.m.includes('시험 축복'));assert.equal(r.coin,90);
assert.equal(r.s1,true);assert.equal(r.s2,false);assert.equal(r.s3,false);assert(Math.abs(r.a2-r.a0)<0.01,'축복 끝');
assert.equal(r.add,10);assert.equal(r.pts,0);
assert.deepEqual(errs,[]);console.log('star data structures / stat alloc passed');}finally{await b.close()}})().catch(e=>{console.error(e);process.exitCode=1});
