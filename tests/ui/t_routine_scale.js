/* 일과 확장 계약: 시험 데이터는 브라우저 메모리에만 등록하고 실제 콘텐츠에는 남기지 않는다. */
const assert=require('assert/strict'),path=require('path');
const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch({executablePath:process.env.CHROMIUM||undefined});try{
  const p=await b.newPage({viewport:{width:1500,height:1000}}),errs=[];
  p.on('pageerror',e=>errs.push(e.message));
  await p.goto('file://'+path.resolve(__dirname,'../../game/index.html'));await p.addScriptTag({path:require('path').join(__dirname,'fixture.js')});
  const result=await p.evaluate(()=>{
    gameFromScenario('SC_BDEMO');enterGame('goals');G.goals=[];G.player.rank='RANK_20';GOALS.add('OBJ_B_MONEY',100000000);G.goals[0].focus=true;
    const original=SIM.actsCompiled().length,start=performance.now();
    const actions=Array.from({length:40000},(_,i)=>({id:'ACT_SCALE_'+i,name:'확장 활동 '+i,cat:'ACC_WORK',routineOnly:true,place:'PT_HOME',show:['schedule'],durs:[60],pay:1000,ai:{goal:{GOAL_WEALTH:i===39999?100:0.1}},desc:'대량 시험용'}));
    const goals=Array.from({length:20000},(_,i)=>({id:'OBJ_SCALE_'+i,name:'확장 목표 '+i+' {t}',term:'long',ai:'GOAL_WEALTH',measure:'money',opts:[100000000],desc:'대량 시험용'}));
    def('actions',actions);def('objectives',goals);SIM.compile();
    ROUTINE.plan();const schedule=G.schedule[wd(G.day)];
    const found=schedule.some(x=>x.act==='ACT_SCALE_39999'),page=ROUTINE_CATALOG.page('actions','',999999);
    const checked=VALIDATE.check(DB);UI.screen='goals';render();
    return {found,ms:Math.round(performance.now()-start),npcBefore:original,npcAfter:SIM.actsCompiled().length,
      page:page.rows.length,total:page.total,dom:document.querySelectorAll('*').length,errors:checked.errs.slice(0,5),
      finite:schedule.every(x=>Number.isFinite(x.at)&&Number.isFinite(x.dur)&&x.dur>0)};
  });
  assert.equal(result.found,true,'32767 이후에 등록한 최적 후보도 선택해야 함');
  assert.equal(result.npcBefore,result.npcAfter,'일과 전용 확장이 배경 인구 후보를 늘리면 안 됨');
  assert.ok(result.page<=24);assert.ok(result.total>=40000);assert.ok(result.dom<3000);assert.equal(result.finite,true);assert.deepEqual(result.errors,[]);
  assert.ok(result.ms<15000,'대량 데이터 검증·계획·렌더가 15초 안에 완료되어야 함');
  await p.click('[data-rtab="goals"]');
  await p.fill('#routine-query-objectives','확장 목표 19999');await p.click('[data-rsearch="objectives"]');
  assert.equal(await p.locator('[data-goaladd="OBJ_SCALE_19999"]').count(),1);
  // 기존 저장을 손상시키지 않고, 등록 내용이 바뀌면 검색 인덱스도 갱신된다.
  assert.equal(await p.evaluate(()=>{def('actions',[{id:'ACT_SCALE_NEW',name:'추가 후 검색',cat:'ACC_WORK',routineOnly:true,show:['schedule'],durs:[60],pay:2000,ai:{goal:{GOAL_WEALTH:1}}}]);return ROUTINE_CATALOG.page('actions','추가 후 검색').total}),1);
  assert.equal(await p.evaluate(()=>{const before=ROUTINE.state().report.total;ROUTINE.plan();return ROUTINE.state().report.total===before+1}),true,'같은 날 추가한 콘텐츠도 다음 계획에 반영');
  // 조건을 만족하지 못하는 최고 가중치 후보는 제외하고, 제외 이유를 남긴다.
  const blocked=await p.evaluate(()=>{DB.actions.ACT_SCALE_39999.req=[{k:'money',min:1e12}];def('actions',[DB.actions.ACT_SCALE_39999]);ROUTINE.state().planned=null;ROUTINE.plan();return [G.schedule[wd(G.day)].some(x=>x.act==='ACT_SCALE_39999'),ROUTINE.state().report.blocked.some(x=>x[0].includes('돈'))]});
  assert.deepEqual(blocked,[false,true]);
  // 실제 수행한 수입과 목표 진척이 같은 날짜 결산으로 연결된다.
  const outcome=await p.evaluate(()=>{const before=ROUTINE.snapshot(),day=G.day;perform(DB.actions.ACT_SCALE_NEW,60);GOALS.check();ROUTINE.record(day,before,60);const row=ROUTINE.state().log[0];return [row.money,Object.values(row.goals)[0].to>Object.values(row.goals)[0].from]});
  assert.deepEqual(outcome,[2000,true]);
  assert.equal(await p.evaluate(()=>{const validate=VALIDATE.RULES.find(x=>x[0]==='actions')[1];return validate({id:'ACT_INVALID',routineOnly:true,show:['schedule'],cat:'ACC_WORK',durs:[-1],ai:{goal:{GOAL_UNKNOWN:1}},req:[{k:'unknown'}]},DB).length>=3}),true);
  assert.deepEqual(errs,[]);console.log('scale',JSON.stringify(result));console.log('errs',errs);
}finally{await b.close();}})().catch(e=>{console.error(e);process.exitCode=1});
