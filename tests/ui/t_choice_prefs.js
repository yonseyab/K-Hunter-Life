const {chromium}=require('playwright'),path=require('path'),assert=require('assert/strict'),os=require('os');
(async()=>{
 const b=await chromium.launch({executablePath:process.env.CHROMIUM});
 try {
  const p=await b.newPage({viewport:{width:1366,height:768}}),errs=[];p.on('pageerror',e=>errs.push(e.message));
  await p.goto('file://'+path.resolve(__dirname,'../../game/index.html'));
  await p.evaluate(async()=>{await packsLoad();gameFromScenario('SC_BDEMO');enterGame();G.player.awakenedDate='2020-03-14';render()});
  assert.equal(await p.locator('#awakeningElapsed').innerText(),'각성한 지 6년 0일째');
  assert(await p.evaluate(()=>document.querySelector('#awakeningElapsed').nextElementSibling.matches('[data-qsopen]')));
  await p.evaluate(()=>{G.day++;PLAY.ui()});assert.equal(await p.locator('#awakeningElapsed').innerText(),'각성한 지 6년 1일째');
  await p.evaluate(()=>{
   prefs().play.stop='each';G.eventLog={};
   DB.events.EV_PREF_TEST={...DB.events.EV_B0004,id:'EV_PREF_TEST',choices:[{t:'주변을 확인한다',check:{attr:'STAT_BODY',dc:150},ok:'확인했다.',ng:'놓쳤다.',okFx:{money:100},ngFx:{money:-100}}]};
   triggerEvent('EV_PREF_TEST','10:00');EVT.arrived();render();window.judgeCount=0;window.oldJudge=judge;judge=function(...args){judgeCount++;return oldJudge(...args)};
  });
  await p.click('[data-kpick="0"]');await p.click('[data-life-roll-skip]');
  assert(!await p.locator('[data-life-roll-continue]').isDisabled());
  assert(!await p.locator('[data-life-roll-skip]').isVisible());
  assert.equal(await p.evaluate(()=>choicePrefs().skipDice),false,'one-time skip does not persist');
  assert.equal(await p.evaluate(()=>judgeCount),1);
  await p.locator('[data-choice-setting="skipDice"]').check();
  await p.click('[data-life-roll-continue]');
  await p.evaluate(()=>{saveGame('slot1');G=clone(store.get(SAVE_KEY,[]).find(s=>s.slot==='slot1').data);enterGame();G.eventLog={};triggerEvent('EV_PREF_TEST','11:00');EVT.arrived();render()});
  assert.equal(await p.evaluate(()=>choicePrefs().skipDice),true);
  await p.click('[data-kpick="0"]');
  assert(!await p.locator('[data-life-roll-continue]').isDisabled(),'saved preference reveals immediately');
  assert.equal(await p.locator('.event-die.rolling').count(),0);
  assert(await p.locator('[data-choice-setting="skipDice"]').isChecked());
  await p.locator('[data-choice-setting="delegate"]').check();
  await p.screenshot({path:path.join(process.env.OUT||os.tmpdir(),'khl-dice-settings.png'),fullPage:true});
  await p.click('[data-life-roll-continue]');
  await p.evaluate(()=>{saveGame('slot1');G=clone(store.get(SAVE_KEY,[]).find(s=>s.slot==='slot1').data);enterGame();G.eventLog={};triggerEvent('EV_PREF_TEST','12:00');EVT.arrived();render()});
  assert.equal(await p.evaluate(()=>EVT.pending().length),0);
  assert.equal(await p.locator('#lifeEventModal').count(),0,'delegated events do not need a popup');
  assert.equal(await p.evaluate(()=>G.story.filter(x=>x.ev==='EV_PREF_TEST'&&x.k==='choice').at(-1).how),'auto');
  assert.equal(await p.evaluate(()=>EVT.stopWanted({kind:'SK_DEATH'})),false);
  await p.evaluate(()=>{G.offers=[{gid:vals('guilds')[0].id,share:10,exp:nowAbs()+1440}];render()});
  assert.equal(await p.evaluate(()=>G.offers.length),0,'delegated contract is answered');
  assert.equal(await p.locator('#lifeEventModal').count(),0);
  // Preferences belong to the hunter and come back when playing that hunter again.
  const switched=await p.evaluate(()=>{const next=LEGACY.candidates()[0];const old=LEGACY.switchTo(next.id);return {old,settings:{...choicePrefs()}}});
  assert.deepEqual(switched.settings,{skipDice:false,delegate:false});
  assert(await p.evaluate(id=>!!LEGACY.switchTo(id),switched.old));
  assert.deepEqual(await p.evaluate(()=>choicePrefs()),{skipDice:true,delegate:true});
  // The same controls remain reachable to turn automatic delegation off.
  await p.evaluate(()=>{UI.screen='settings';UI.settingsTab='재생 · 멈춤';render()});
  await p.locator('[data-choice-setting="delegate"]').uncheck();
  assert.equal(await p.evaluate(()=>choicePrefs().delegate),false);
  assert.equal(await p.evaluate(()=>EVT.stopWanted({kind:'SK_DEATH'})),true);
  await p.evaluate(()=>{UI.raid=null;gameFromScenario('SC_BDEMO');enterGame()});
  assert.deepEqual(await p.evaluate(()=>choicePrefs()),{skipDice:false,delegate:false});
  const raid=await p.evaluate(()=>{
    choicePrefs().delegate=true;prefs().play.stop='each';prefs().play.kinds.SK_CRISIS=true;G.cond.hp=100;G.cond.energy=100;
    const g=vals('gates').find(x=>gateSt(x.id).status==='open'&&!gateFit(G.player,x))||spawnGate(Math.random,G.player.region);gateSt(g.id).status='open';gateSt(g.id).permit=true;DB.balance.BAL_GATE.crisisPerTick=1;
    const result=PLAY.raid(g,AUTORAID.party(g));return {stopped:!!result?.stop,done:UI.raid.done||!!G.dead};
  });
  assert(raid.done&&!raid.stopped,'always delegate also passes raid crisis choices');
  assert.deepEqual(errs,[]);console.log('awakening anniversary / live counter / skip once / persistent skip and delegate / save / hunter isolation / settings off passed; errs []');
 }finally{await b.close()}
})().catch(e=>{console.error(e);process.exitCode=1});
