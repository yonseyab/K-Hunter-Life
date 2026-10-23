const {chromium}=require('playwright'),path=require('path'),assert=require('assert/strict'),os=require('os');
(async()=>{
 const b=await chromium.launch({executablePath:process.env.CHROMIUM});
 try {
  const p=await b.newPage({viewport:{width:1366,height:768}}),errs=[];
  p.on('pageerror',e=>errs.push(e.message));
  await p.goto('file://'+path.resolve(__dirname,'../../game/index.html'));
  await p.evaluate(async()=>{await packsLoad();gameFromScenario('SC_BDEMO');enterGame();G.ledger=[['3/14','식비',-1000]];render()});
  const geometry=()=>p.locator('#story').boundingBox();
  const normal=await geometry();
  assert.equal(await p.locator('[data-home-ledger-date]').innerText(),'3/14');
  assert(await p.evaluate(()=>parseFloat(getComputedStyle(document.querySelector('[data-home-ledger-date]')).fontSize)<parseFloat(getComputedStyle(document.querySelector('.home-money-label>.muted')).fontSize)));
  // Entering/leaving the gate must not add a row or change the story's position.
  await p.evaluate(()=>{UI.raid={gid:(vals('gates')[0]||spawnGate(Math.random,G.player.region)).id,done:false,party:[]};render()});
  assert.equal(await p.locator('.gbanner').count(),0);
  assert.equal(await p.locator('#lifeSide .in-gate').count(),1);
  assert.match(await p.locator('#lifeSide .sw2-title').innerText(),/STATUS.*게이트 안.*외부 연락.*다른 행동 불가/);
  assert.deepEqual(await geometry(),normal);
  await p.screenshot({path:path.join(process.env.OUT||os.tmpdir(),'khl-gate-status.png'),fullPage:true});
  await p.evaluate(()=>{UI.raid=null;render()});
  assert.equal(await p.locator('#lifeSide .in-gate').count(),0);
  assert.deepEqual(await geometry(),normal);
  // A checked event is resolved once. The animation reveals the same engine roll.
  await p.evaluate(()=>{
   prefs().play.stop='each';G.eventLog={};
   DB.events.EV_POPUP_TEST={...DB.events.EV_B0004,id:'EV_POPUP_TEST',subj:'판정 테스트',choices:[{t:'상황을 살핀다',check:{attr:'STAT_BODY',dc:150},ok:'위험을 알아차렸다.',ng:'위험을 놓쳤다.',okFx:{money:1000},ngFx:{money:-1000}}]};
   triggerEvent('EV_POPUP_TEST','10:00');EVT.arrived();render();
   window.judgeCalls=0;window.oldJudge=judge;judge=function(...args){judgeCalls++;const j=oldJudge(...args);window.popupJudgement=j;return j};
  });
  const dialog=p.locator('#lifeEventModal');
  assert(await dialog.evaluate(el=>el.open&&el.matches(':modal')));
  assert.equal(await p.locator('#lifePend').count(),0);
  assert.deepEqual(await geometry(),normal);
  await p.keyboard.press('Escape');assert(await dialog.isVisible());
  // Pending choices survive save/load and show again without applying anything.
  const money=await p.evaluate(()=>{const m=G.money;saveGame('slot1');const s=store.get(SAVE_KEY,[]).find(x=>x.slot==='slot1');G=clone(s.data);enterGame();return m});
  assert(await dialog.isVisible());assert.equal(await p.evaluate(()=>G.money),money);
  await p.click('#lifeEventModal [data-kpick="0"]');
  assert.equal(await p.evaluate(()=>judgeCalls),1);
  const j=await p.evaluate(()=>popupJudgement);
  assert.equal(await p.evaluate(()=>G.money),money+(j.ok?1000:-1000));
  assert(await p.locator('.event-die').isVisible());assert(await p.locator('[data-life-roll-continue]').isDisabled());
  // Programmatically double-clicking an old control cannot apply the event twice.
  await p.evaluate(()=>document.querySelector('.event-roll').insertAdjacentHTML('beforeend','<button id="stalePick" data-kpick="0">stale</button>'));
  await p.evaluate(()=>document.querySelector('#stalePick').click());assert.equal(await p.evaluate(()=>judgeCalls),1);
  await p.evaluate(()=>document.querySelector('#stalePick').remove());
  await p.locator('[data-life-roll-continue]').waitFor({state:'visible'});
  await p.waitForFunction(()=>!document.querySelector('[data-life-roll-continue]').disabled);
  assert.equal(await p.locator('.event-die').innerText(),String(j.dice));
  assert.match(await p.locator('.event-roll-result').innerText(),new RegExp('= '+j.total+' / 난이도 '+j.dc));
  assert.deepEqual(await geometry(),normal);
  await p.screenshot({path:path.join(process.env.OUT||os.tmpdir(),'khl-event-dice.png'),fullPage:true});
  await p.click('[data-life-roll-continue]');assert.equal(await dialog.count(),0);
  // A real raid crisis uses the same popup, gate modifiers and actual d20.
  await p.evaluate(()=>{
   prefs().play.kinds.SK_CRISIS=true;G.cond.hp=100;G.cond.energy=100;
   const g=vals('gates').find(x=>gateSt(x.id).status==='open'&&!gateFit(G.player,x))||spawnGate(Math.random,G.player.region);
   gateSt(g.id).status='open';gateSt(g.id).permit=true;DB.balance.BAL_GATE.crisisPerTick=1;
   PLAY.raid(g,AUTORAID.party(g));
   DB.crises.CR_POPUP_TEST={id:'CR_POPUP_TEST',title:'좁은 통로',text:'앞으로 나아갈 방법을 고른다.',choices:[{t:'안전한 길을 찾는다',check:{attr:'STAT_BODY',dc:150},risk:'낮음',ok:'길을 찾았다.',ng:'우회한다.',okFx:{},ngFx:{}}]};
   UI.raid.crisis={id:'CR_POPUP_TEST'};DB.balance.BAL_GATE.crisisPerTick=0;window.judgeCalls=0;render();
  });
  assert(await dialog.isVisible());
  await p.click('[data-kcrisis="0"]');
  await p.waitForFunction(()=>document.querySelector('[data-life-roll-continue]')&&!document.querySelector('[data-life-roll-continue]').disabled);
  assert.equal(await p.evaluate(()=>judgeCalls),1);
  assert.equal(await p.locator('.event-die').innerText(),String(await p.evaluate(()=>popupJudgement.dice)));
  await p.click('[data-life-roll-continue]');
  // Contract negotiations expose their own real d20 without changing their rules.
  await p.evaluate(()=>{UI.raid=null;gameFromScenario('SC_BDEMO');enterGame();prefs().play.stop='each';G.offers=[{gid:vals('guilds')[0].id,share:10,exp:nowAbs()+1440}];render()});
  await p.click('[data-life-offer="0|neg"]');
  await p.waitForFunction(()=>!document.querySelector('[data-life-roll-continue]').disabled);
  assert.match(await p.locator('.event-roll-result').innerText(),/협상력.*난이도 18/);
  await p.click('[data-life-roll-continue]');
  if(await p.locator('[data-life-offer="0|no"]').count())await p.click('[data-life-offer="0|no"]');
  // Modal remains inside the viewport and supports reduced motion.
  await p.setViewportSize({width:320,height:700});await p.emulateMedia({reducedMotion:'reduce'});
  await p.evaluate(()=>{UI.raid=null;G.retroOpen=null;G.retroQ=[];G.eventLog={};triggerEvent('EV_POPUP_TEST','11:00');render()});
  const bounds=await dialog.boundingBox();assert(bounds.x>=0&&bounds.x+bounds.width<=321);
  await p.click('[data-kpick="0"]');await p.waitForFunction(()=>!document.querySelector('[data-life-roll-continue]').disabled);
  assert.equal(await p.locator('.event-die').evaluate(el=>getComputedStyle(el).animationName),'none');
  await p.click('[data-life-roll-continue]');
  assert.deepEqual(errs,[]);console.log('ledger date / stable red gate status / modal / saved choice / actual dice once / crisis / narrow viewport passed; errs []');
 } finally {await b.close()}
})().catch(e=>{console.error(e);process.exitCode=1});
