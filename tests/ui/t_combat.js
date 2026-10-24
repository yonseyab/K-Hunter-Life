/* 전투 시스템: 교전 · NPC 공략 · 내 공략 한 판 · 등급 차 · DB 몬스터 상세 */
const {chromium}=require('playwright'),path=require('path'),assert=require('assert/strict');
(async()=>{
  const b=await chromium.launch({executablePath:process.env.CHROMIUM});
  try {
    const p=await b.newPage({viewport:{width:1366,height:768}}),errs=[];
    p.on('pageerror',e=>errs.push(e.message));
    await p.goto('file://'+path.resolve(__dirname,'../../game/index.html'));
    await p.evaluate(async()=>{await packsLoad();gameFromScenario('SC_BDEMO');enterGame();await poolPrefetch()});
    /* DB 몬스터 상세 */
    await p.click('#nav [data-go="homeDb"]');await p.getByRole('tab',{name:'몬스터',exact:true}).click();
    await p.click('#dbx-list tr[data-dbx-sel="MON_B013"]');
    const t=await p.locator('#dbx-det').innerText();
    assert.match(t,/보스/);assert.match(t,/같은 급 헌터/);assert.match(t,/포효 —/);assert.match(t,/고블린/);
    const r=await p.evaluate(()=>{
      const gi=vals('gateInteriors')[0].id,roles=['ROLE_TANK','ROLE_MDPS','ROLE_RDPS','ROLE_HEAL'];
      const rate=(plv,glv,N)=>{let w=0;for(let k=0;k<N;k++){const g={rank:'RANK_'+String(glv).padStart(2,'0'),floors:5,...MONSTER.compose(Math.random,glv,gi)};
        const u=roles.map((x,i)=>COMBAT.fromLevel({id:'T'+i,name:'T'+i,role:x,level:COMBAT.levelOfRank(plv),rankLv:plv}));if(COMBAT.npcRaid(u,g,plv).ok)w++}return w/N};
      /* 교전 하나 */
      const L=COMBAT.levelOfRank(16),party=roles.map((x,i)=>COMBAT.fromLevel({id:'A'+i,name:'A'+i,role:x,level:L,rankLv:16}));
      const foes=COMBAT.encounter({rank:'RANK_16',mobs:['MON_B003'],mon:'MON_B003'},16,'mob',4,16),f=COMBAT.fight(party,foes);
      /* 내 공략 한 판 */
      let g;for(let i=0;i<60&&!g;i++){const x=spawnGate(Math.random);if(x&&DB.ranks[x.rank].lv>=DB.ranks[G.player.rank].lv)g=x}
      UI.prep={gid:g.id,party:raidParty().slice(1).map(h=>h.id),retreat:35};UI.playRaid=true;startRaid(g.id);const R=UI.raid;let k=0;
      if(R)while(!R.done&&!G.dead&&k++<300){if(R.crisis)resolveCrisis(AUTORAID.choose(R,DB.crises[R.crisis.id]));else raidTick()}
      return {fight:f.res,t:f.t,foes:foes.length,same:rate(14,14,40),hard:rate(14,10,40),easy:rate(14,17,30),done:!R||R.done||G.dead,log:R?R.log.length:0,
        moves:COMBAT.describeMove('CM_SMASH'),pwin:[SIM.pWin(10,16),SIM.bestLv(12,0.6)]};});
    assert.ok(['win','flee','wipe'].includes(r.fight)&&r.t>0&&r.foes>=2,'교전 결과');
    assert.ok(r.same>=0.7,'같은 등급은 대부분 이긴다 '+r.same);
    assert.ok(r.hard<=0.25,'4등급 위는 거의 못 이긴다 '+r.hard);
    assert.ok(r.easy>=0.95,'낮은 등급은 이긴다 '+r.easy);
    assert.ok(r.done&&r.log>3,'내 공략이 끝까지 돈다');
    assert.match(r.moves,/강타 — 적 하나에게 공격 ×1.8/);
    assert.ok(r.pwin[0]>=0&&r.pwin[0]<=1&&r.pwin[1]>=1&&r.pwin[1]<=20);
    assert.deepEqual(errs,[]);
    console.log('ok t_combat',JSON.stringify(r));
  } finally { await b.close(); }
})().catch(e=>{console.error(e);process.exit(1)});
