/* 자동 일과: 실제 시간 진행·중단·저장·기존 목표 보존을 단언한다. */
const assert = require('assert/strict'), path = require('path');
const { chromium } = require('playwright');
(async () => {
  const b = await chromium.launch({ executablePath: process.env.CHROMIUM || undefined });
  try {
    const p = await b.newPage({ viewport: { width: 1500, height: 950 } }), errs = [];
    p.on('pageerror', e => errs.push(e.message));
    await p.goto('file://' + path.resolve(__dirname, '../../game/index.html'));await p.addScriptTag({path:require('path').join(__dirname,'fixture.js')});
    await p.evaluate(() => { gameFromScenario('SC_BDEMO'); enterGame('goals'); prefs().autoRaid.on='off'; G.threads.forEach(t => { if(t.event)t.event.resolved=true; }); G.offers=[]; });
    assert.equal(await p.locator('h1').innerText(), '일과');
    assert.equal(await p.locator('[data-routine-start="1"]').count(),0);  /* '하루 맡기기' 버튼은 새 버전에서 없앰 (실시간 재생으로 대체) */
    assert.equal(await p.locator('#routine-query-objectives').count(),0);
    await p.click('[data-rtab="goals"]');
    assert.equal(await p.locator('#routine-query-objectives').count(),1);
    assert.equal(await p.locator('[data-routine-start]').count(),0);
    await p.click('[data-rtab="records"]');
    assert.equal(await p.locator('#routine-query-objectives').count(),0);
    assert.equal(await p.locator('[data-routine-start]').count(),0);
    await p.click('[data-rtab="day"]');
    const focus = await p.evaluate(() => {
      G.goals=[]; GOALS.add('OBJ_B_MONEY', 100000000); GOALS.add('OBJ_B_TRAIN',6); GOALS.add('OBJ_B_SOCIAL',2);
      const [a,b,c]=GOALS.active(); ROUTINE.focus(a.id); ROUTINE.focus(b.id);
      return [a.focus,b.focus,!!ROUTINE.focus(c.id),GOALS.aiFocus().length];
    });
    assert.deepEqual(focus,[true,true,true,2]);
    await p.evaluate(() => {
      G.cond.hp=100;G.cond.energy=100;G.cond.stress=0;G.cond.sleepDebt=0;
      DB.balance.BAL_TIME.eventPerHour=0;
      DB.balance.BAL_ROUTINE.urgentHours=0;
      G.threads.forEach(t=>{if(t.event)t.event.resolved=true});
      ROUTINE.state().mode='auto';ROUTINE.plan();
    });
    assert.ok(await p.evaluate(()=>G.schedule[wd(G.day)].length>0));
    const manual=await p.evaluate(()=>{ROUTINE.state().mode='manual';G.schedule=Array.from({length:7},()=>[{at:0,act:'ACT_REST',dur:1440}]);const s=JSON.stringify(G.schedule);ROUTINE.plan();return s===JSON.stringify(G.schedule)});
    assert.equal(manual,true);
    // 실제 이틀 진행과 날짜별 집계. 이벤트 중단은 뒤에서 따로 확인한다.
    const result=await p.evaluate(async()=>{
      const old=maybeEvent, hap=processHappen;maybeEvent=()=>null;processHappen=()=>null;
      const start=nowAbs();await ROUTINE.run(2);maybeEvent=old;processHappen=hap;
      return {spent:nowAbs()-start,minutes:ROUTINE.state().log.reduce((n,x)=>n+x.minutes,0),days:ROUTINE.state().log.length,busy:UI.busy,goals:G.goals.length};
    });
    assert.equal(result.spent,2880);assert.equal(result.minutes,2880);assert.ok(result.days>=2);assert.equal(result.busy,false);assert.equal(result.goals,3);
    for(const [field,val] of [['hp',40],['energy',20],['stress',85]]) {
      const spent=await p.evaluate(async([field,val])=>{G.cond.hp=100;G.cond.energy=100;G.cond.stress=0;G.cond[field]=val;const start=nowAbs();await ROUTINE.run(1);return nowAbs()-start},[field,val]);
      assert.equal(spent,0,field+' safety');
    }
    assert.ok(await p.evaluate(async()=>{G.cond.hp=100;G.cond.stress=0;G.cond.energy=20;const start=nowAbs();await ROUTINE.run(1);return nowAbs()-start})>0,'안전선 알림은 하루 한 번 — 다시 맡기면 이어 감');
    const eventStop=await p.evaluate(async()=>{
      G.cond.hp=100;G.cond.energy=100;G.cond.stress=0;G.stopOn.event=false;prefs().autoRaid.on='off';G.threads.forEach(t=>{if(t.event)t.event.resolved=true});G.offers=[];DB.balance.BAL_ROUTINE.urgentHours=0;
      const old=maybeEvent;maybeEvent=()=>({ch:'msg',subj:'중요 사건'});const start=nowAbs();await ROUTINE.run(1);maybeEvent=old;
      return [nowAbs()-start,ROUTINE.state().reason];
    });
    assert.ok(eventStop[0]>0&&eventStop[0]<=60);assert.match(eventStop[1],/새 메시지/);
    assert.equal(await p.evaluate(()=>{G.threads[0].event={resolved:false};return !!ROUTINE.safety()}),true);
    assert.equal(await p.evaluate(()=>{G.threads.forEach(t=>{if(t.event)t.event.resolved=true});const g=vals('gates')[0];g.region=locOf().region;gateSt(g.id).status='open';gateSt(g.id).breakAt=nowAbs()+60;DB.balance.BAL_ROUTINE.urgentHours=12;return !!ROUTINE.safety()}),true);
    assert.equal(await p.evaluate(()=>String(ROUTINE.safety()||'').includes('브레이크')),false,'같은 게이트 브레이크 경고는 한 번만');
    assert.equal(await p.evaluate(()=>{const s=JSON.parse(JSON.stringify(G));return s.routine.log.length>0&&!('running' in s.routine)&&s.goals.length===3}),true);
    // 실제 저장과 재진입, 이전 저장 보정, 일과 중단 버튼도 확인한다.
    assert.equal(await p.evaluate(()=>{saveGame('slot1');const saved=store.get(SAVE_KEY,[]).find(x=>x.slot==='slot1');G=clone(saved.data);enterGame('goals');return G.routine.log.length>0&&!UI.routineRunning}),true);
    assert.equal(await p.evaluate(()=>{delete G.routine;return ROUTINE.state().mode==='auto'&&ROUTINE.state().log.length===0}),true);
    await p.evaluate(()=>{
      G.threads.forEach(t=>{if(t.event)t.event.resolved=true});G.offers=[];
      G.cond.hp=100;G.cond.energy=100;G.cond.stress=0;DB.balance.BAL_ROUTINE.urgentHours=0;
      ROUTINE.state().mode='manual';UI.screen='goals';closeItem();render();  /* 앞 일과의 결과 창 닫기 */
    });
    /* 실행 중 멈추기는 함수로 (버튼은 없앰) */
    await p.evaluate(async()=>{const pr=ROUTINE.run(7);UI.routineCancel=true;await pr});
    await p.waitForFunction(()=>!UI.busy);
    assert.match(String(await p.evaluate(()=>ROUTINE.state().reason)),/직접|멈/);
    await p.screenshot({path:path.join(process.env.OUT||require('os').tmpdir(),'hunter-routine.png')});
    assert.deepEqual(errs,[]);console.log('routine assertions passed; errs',errs);
  } finally { await b.close(); }
})().catch(e=>{console.error(e);process.exitCode=1});
