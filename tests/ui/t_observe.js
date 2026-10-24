/* 시뮬레이션 중심 흐름: UI 정책 · 자동 일정 · 구매 · 사건 · 공략 선택 회귀 검사 */
const {chromium}=require('playwright'), path=require('path'), assert=require('assert/strict');
(async()=>{
  const b=await chromium.launch({executablePath:process.env.CHROMIUM});
  try {
    const p=await b.newPage({viewport:{width:1500,height:950}}), errs=[];
    p.on('pageerror',e=>errs.push(e.stack));
    await p.goto('file://'+path.resolve(__dirname,'../../game/index.html'));
    await p.evaluate(async()=>{await packsLoad();gameFromScenario('SC_BDEMO');enterGame();await poolPrefetch();prefs().play.stop='none';});
    assert.equal(await p.locator('#nav [data-go="acts"],#nav [data-go="alerts"],#nav [data-go="messenger"],#nav [data-go="party"],#nav [data-go="raidteam"]').count(),0);
    for(const s of ['life','home','gates','relations','profile','db','goals','inventory','finance','guild','shop','auction']) {
      await p.evaluate(s=>{UI.screen=s;UI.profileId=G.player.id;render()},s);
      assert.equal(await p.locator('#root [data-actdo],#root [data-goto],#root [data-raidprep],#root [data-partyfor],#root [data-go="schedule"]').count(),0,s+' direct controls');
    }
    await p.evaluate(()=>{UI.screen='goals';render()});await p.click('[data-direction="money"]');
    assert.equal(await p.evaluate(()=>GOALS.aiFocus()[0]),'GOAL_WEALTH');
    await p.evaluate(()=>{G.routine.mode='manual';UI.screen='schedule';render()});
    assert.deepEqual(await p.evaluate(()=>[UI.screen,ROUTINE.state().mode]),['goals','auto']);
    assert(await p.evaluate(()=>{const t=nowAbs(),m=G.money;doNow('ACT_REST',60);startRaid(vals('gates')[0]?.id);return t===nowAbs()&&m===G.money&&!raidActive()}));
    // Capture guard also blocks injected stale controls before any legacy handler.
    await p.evaluate(()=>{const x=document.createElement('button');x.id='stale';x.dataset.goto='RG_SEOUL_MAPO|PT_CAFE';document.body.append(x)});
    const t=await p.evaluate(()=>nowAbs());await p.click('#stale');assert.equal(await p.evaluate(()=>nowAbs()),t);
    await p.evaluate(()=>{document.querySelector('#stale').remove();UI.screen='life';G.alerts.unshift({subj:'검사 소식',body:'중복 없이 한 번 전달',unread:true});render();render()});
    assert.equal(await p.evaluate(()=>G.story.filter(x=>x.s.includes('검사 소식')).length),1);
    await p.evaluate(()=>{G.star={slot:0};G.starKnown=true;STARADV.roll=()=>0;EVT.pending().forEach(x=>EVT.auto(x));G.eventLog={};triggerEvent('EV_B0004','10:00');prefs().play.stop='each';EVT.arrived();render()});
    assert(await p.locator('[data-kpick]').count()>0);await p.click('[data-kpick="2"]');
    assert.equal(await p.evaluate(()=>EVT.pending().length),0);
    await p.click('[data-life-roll-continue]');
    // Real purchase and equipment controls must survive the UI policy.
    await p.evaluate(()=>{UI.screen='shop';G.coin=100000;render()});  /* 옛 상점 주소 → 성좌 › 상점 */
    assert.equal(await p.evaluate(()=>UI.screen),'homeTrade');
    await p.click('.su-item:not(.out) >> nth=0');assert(await p.locator('[data-subuy]').count()>0);await p.click('[data-subuy]');
    assert(await p.evaluate(()=>G.coin<100000));
    // Force a crisis, answer on the life screen, then complete through the same engine.
    const hand=await p.evaluate(()=>{
      prefs().play.stop='each';prefs().play.kinds.SK_CRISIS=true;G.cond.hp=100;G.cond.energy=100;G.injuries=[];G.time=600;
      const g=vals('gates').find(x=>gateSt(x.id).status==='open'&&!gateFit(G.player,x))||spawnGate(Math.random,G.player.region);
      gateSt(g.id).status='open';gateSt(g.id).permit=true;DB.balance.BAL_GATE.crisisPerTick=1;DB.balance.BAL_GATE.crisisPerSeg=1;
      const r=PLAY.raid(g,AUTORAID.party(g));render();return {stop:!!r?.stop,screen:UI.screen,crisis:!!UI.raid?.crisis,auto:UI.raid?.auto,timer:!!UI._rt};
    });
    assert(hand.stop&&hand.screen==='life'&&hand.crisis&&hand.auto,JSON.stringify(hand));
    assert(await p.locator('[data-kcrisis]').count()>0);
    const pausedAt=await p.evaluate(()=>UI.raid.t);await p.waitForTimeout(1200);assert.equal(await p.evaluate(()=>UI.raid.t),pausedAt);
    await p.evaluate(()=>{saveGame('slot1');const s=store.get(SAVE_KEY,[]).find(x=>x.slot==='slot1');G=JSON.parse(JSON.stringify(s.data));enterGame()});
    assert(await p.evaluate(()=>UI.raid?.crisis&&UI.raid.t===G.play.pendingRaid.t&&!PLAY.S.running));
    assert(await p.locator('[data-kcrisis]').count()>0);
    await p.evaluate(()=>{prefs().play.stop='none';DB.balance.BAL_GATE.crisisPerTick=0.06;DB.balance.BAL_DEATH.rescue=10;DB.balance.BAL_DEATH.soloRescue=10;DB.balance.BAL_DEATH.fatal=0});
    await p.click('[data-kcrisisauto]');
    {const st=await p.evaluate(()=>({done:UI.raid?.done,scr:UI.screen,pend:!!G.play.pendingRaid,dead:!!G.dead,cr:!!UI.raid?.crisis,story:G.story.some(x=>x.k==='raid'&&x.ok!=null)}));assert(st.done&&st.scr==='life'&&!st.pend&&st.story,JSON.stringify(st));}
    const n=await p.evaluate(()=>PLAY.st().raids);await p.evaluate(()=>PLAY.chooseCrisis());assert.equal(await p.evaluate(()=>PLAY.st().raids),n);
    await p.evaluate(()=>{prefs().autoRaid.on='off';prefs().play.stop='none';G.pendingPick=false;G.retroOpen=null;EVT.pending().forEach(x=>EVT.auto(x));PLAY.start()});
    const before=await p.evaluate(()=>nowAbs());await p.waitForTimeout(1500);assert(await p.evaluate(t=>nowAbs()>t,before));await p.evaluate(()=>PLAY.pause());
    await p.setViewportSize({width:400,height:800});await p.evaluate(()=>{UI.screen='life';render()});
    assert(await p.evaluate(()=>document.documentElement.scrollWidth<=401));
    assert.deepEqual(errs,[]);console.log('errs []');
  } finally {await b.close()}
})().catch(e=>{console.error(e);process.exitCode=1});
