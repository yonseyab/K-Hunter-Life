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
  // 성좌를 모르면 묻지 않는다: 팝업 없이 헌터 혼자 정하고, 선택 · 판정 문장 없이 결과만 이어진다.
  const EVDEF="DB.events.EV_POPUP_TEST={...DB.events.EV_B0004,id:'EV_POPUP_TEST',subj:'판정 테스트',choices:[{t:'상황을 살핀다',check:{attr:'STAT_BODY',dc:150},ok:'위험을 알아차렸다.',ng:'위험을 놓쳤다.',okFx:{money:1000},ngFx:{money:-1000}},{t:'그냥 지나간다',ok:'아무 일도 없었다.',ng:'아무 일도 없었다.',okFx:{},ngFx:{}}]};";
  await p.evaluate(ev=>{prefs().play.stop='each';G.eventLog={};G.star=null;G.starKnown=false;eval(ev);
   window.judgeCalls=0;window.oldJudge=judge;judge=function(...args){judgeCalls++;const j=oldJudge(...args);window.popupJudgement=j;return j};
   G.story=[];triggerEvent('EV_POPUP_TEST','10:00');EVT.arrived();render();},EVDEF);
  const dialog=p.locator('#lifeEventModal');
  assert.equal(await dialog.count(),0,'모르면 팝업 없음');
  const quiet=await p.evaluate(()=>G.story.map(x=>x.s).join('\n'));
  assert(!/쪽을 고른다|d20|난이도/.test(quiet),'선택 · 판정 문장 없음: '+quiet);
  // 성좌를 알면 헌터가 묻는다.
  await p.evaluate(()=>{G.star={slot:0};G.starKnown=true;G.eventLog={};window.judgeCalls=0;triggerEvent('EV_POPUP_TEST','10:30');EVT.arrived();render()});
  assert(await dialog.evaluate(el=>el.open&&el.matches(':modal')));
  assert.equal(await p.locator('#lifeEventModal .ask-line').count(),1);
  assert.equal(await p.locator('#lifeEventModal [data-kauto]').innerText(),'말 걸지 않기');
  assert(!/d20|난이도/.test(await dialog.innerText()),'선택지에 판정 숫자 없음');
  assert.deepEqual(await geometry(),normal);
  await p.keyboard.press('Escape');assert(await dialog.isVisible());
  // 저장 · 불러오기 뒤에도 그대로 남는다.
  const money=await p.evaluate(()=>{const m=G.money;saveGame('slot1');const s=store.get(SAVE_KEY,[]).find(x=>x.slot==='slot1');G=clone(s.data);enterGame();return m});
  assert(await dialog.isVisible());assert.equal(await p.evaluate(()=>G.money),money);
  // 따른다 (난수 0 → 따름)
  await p.evaluate(()=>{STARADV.roll=()=>0});
  await p.click('#lifeEventModal [data-kpick="0"]');
  await p.evaluate(()=>{STARADV.roll=()=>Math.random()});
  assert.equal(await p.evaluate(()=>judgeCalls),1);
  const j=await p.evaluate(()=>popupJudgement);
  assert.equal(await p.evaluate(()=>G.money),money+(j.ok?1000:-1000));
  assert(await p.locator('.advice-res').isVisible());assert.equal(await p.locator('.event-die').count(),0);
  assert(!/d20|난이도/.test(await dialog.innerText()));
  assert.equal(await p.evaluate(()=>G.starRel.asked),1);
  // 오래된 버튼을 다시 눌러도 두 번 적용되지 않는다.
  await p.evaluate(()=>document.querySelector('.advice-res').insertAdjacentHTML('beforeend','<button id="stalePick" data-kpick="0">stale</button>'));
  await p.evaluate(()=>document.querySelector('#stalePick').click());assert.equal(await p.evaluate(()=>judgeCalls),1);
  await p.evaluate(()=>document.querySelector('#stalePick').remove());
  await p.screenshot({path:path.join(process.env.OUT||os.tmpdir(),'khl-event-advice.png'),fullPage:true});
  await p.click('[data-life-roll-continue]');assert.equal(await dialog.count(),0);
  // 거부한다: 헌터 자신은 2번을 원하고(판단 엔진), 난수가 크면 성좌 말을 듣지 않는다.
  await p.evaluate(()=>{G.eventLog={};triggerEvent('EV_POPUP_TEST','11:00');EVT.arrived();render();window._d=MIND.decide;MIND.decide=(o,c)=>({i:1,reason:'',scores:[{i:0,s:0,nz:0},{i:1,s:1,nz:0}]});STARADV.roll=()=>0.999});
  const m2=await p.evaluate(()=>G.money);
  await p.click('#lifeEventModal [data-kpick="0"]');
  await p.evaluate(()=>{STARADV.roll=()=>Math.random();MIND.decide=window._d});
  assert.equal(await p.evaluate(()=>G.money),m2,'거부 → 헌터 자신의 선택(돈 변화 없음)');
  assert.match(await p.locator('.advice-react').innerText(),/고개를 젓는다/);
  await p.click('[data-life-roll-continue]');
  // 공략 위기도 같은 방식.
  await p.evaluate(()=>{
   prefs().play.kinds.SK_CRISIS=true;G.cond.hp=100;G.cond.energy=100;
   const g=vals('gates').find(x=>gateSt(x.id).status==='open'&&!gateFit(G.player,x))||spawnGate(Math.random,G.player.region);
   gateSt(g.id).status='open';gateSt(g.id).permit=true;DB.balance.BAL_GATE.crisisPerTick=1;DB.balance.BAL_GATE.crisisPerSeg=1;
   PLAY.raid(g,AUTORAID.party(g));
   DB.crises.CR_POPUP_TEST={id:'CR_POPUP_TEST',title:'좁은 통로',text:'앞으로 나아갈 방법을 고른다.',choices:[{t:'안전한 길을 찾는다',check:{attr:'STAT_BODY',dc:150},risk:'낮음',ok:'길을 찾았다.',ng:'우회한다.',okFx:{},ngFx:{}}]};
   UI.raid.crisis={id:'CR_POPUP_TEST'};DB.balance.BAL_GATE.crisisPerTick=0;DB.balance.BAL_GATE.crisisPerSeg=0;window.judgeCalls=0;render();
  });
  assert(await dialog.isVisible());
  await p.click('[data-kcrisis="0"]');
  assert.equal(await p.evaluate(()=>judgeCalls),1);
  assert(await p.locator('.advice-res').isVisible());
  await p.click('[data-life-roll-continue]');
  // 길드 제안
  await p.evaluate(()=>{UI.raid=null;gameFromScenario('SC_BDEMO');enterGame();G.star={slot:0};G.starKnown=true;prefs().play.stop='each';G.offers=[{gid:vals('guilds')[0].id,share:10,exp:nowAbs()+1440}];render()});
  assert.equal(await p.locator('[data-life-offer]').count(),4);
  await p.evaluate(()=>{STARADV.roll=()=>0});
  await p.click('[data-life-offer="0"]');
  await p.evaluate(()=>{STARADV.roll=()=>Math.random()});
  assert.match(await p.evaluate(()=>G.story.slice(-4).map(x=>x.s).join(' ')),/제안을 받아들인다/);
  await p.click('[data-life-roll-continue]').catch(()=>{});
  // 좁은 화면
  await p.setViewportSize({width:320,height:700});await p.emulateMedia({reducedMotion:'reduce'});
  await p.evaluate(()=>{UI.raid=null;G.retroOpen=null;G.retroQ=[];G.eventLog={};triggerEvent('EV_POPUP_TEST','11:30');EVT.arrived();render()});
  const bounds=await dialog.boundingBox();assert(bounds.x>=0&&bounds.x+bounds.width<=321);
  await p.click('[data-kauto]');await p.click('[data-life-roll-continue]').catch(()=>{});
  assert.deepEqual(errs,[]);console.log('ledger date / gate status / unknown star quiet / ask modal / follow · refuse / crisis / offer / narrow viewport passed; errs []');
 } finally {await b.close()}
})().catch(e=>{console.error(e);process.exitCode=1});
