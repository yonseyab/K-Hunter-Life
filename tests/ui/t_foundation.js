/* 2026-10-24 기반 작업: 색인(def 뒤 갱신) · 빈칸 문장 · 꼬리표 조건 · 더 붙는 생활비 · IndexedDB 세이브(옛 세이브 옮기기 · 새로 고침 뒤 유지) */
const {chromium}=require('playwright'),path=require('path'),assert=require('assert/strict');
(async()=>{const b=await chromium.launch({executablePath:process.env.CHROMIUM});try{const p=await (await b.newContext()).newPage();const errs=[];p.on('pageerror',e=>errs.push(e.stack));
await p.goto('file://'+path.resolve(__dirname,'../../game/index.html'));await p.waitForFunction(()=>typeof SAVES!=='undefined');
const r=await p.evaluate(async()=>{localStorage.clear();await packsLoad();gameFromScenario('SC_BDEMO');enterGame();
  const n0=CONTENT.get('storyLines','on','day:start').length;def('storyLines',[{id:'SL_TEST_1',on:'day:start',lv:1,text:'시험'}]);const n1=CONTENT.get('storyLines','on','day:start').length;
  def('textBits',[{id:'TB_T1',key:'test.word',texts:['사과']}]);const f=CONTENT.fill('{@test.word}을(를) {먹는다|먹는다} — {who.name}',{who:{name:'민수'}});
  def('regions',[{...DB.regions[locOf().region],ctags:['CT_URBAN']}]);const t1=checkReq({k:'tag',of:'here',tag:'CT_URBAN'}),t2=checkReq({k:'tag',of:'here',tag:'CT_RURAL'});
  def('costItems',[{id:'CI_T1',name:'시험 구독',amount:9900}]);const fc=fixedCosts().some(x=>x[0]==='시험 구독');
  return {n0,n1,f,t1,t2,fc}});
assert.equal(r.n1,r.n0+1);assert.equal(r.f,'사과를 먹는다 — 민수');assert.equal(r.t1,true);assert.equal(r.t2,false);assert.equal(r.fc,true);
/* IndexedDB: 옛 localStorage 세이브를 옮기고, 새로 고침 뒤에도 남는다 */
await p.evaluate(()=>{localStorage.setItem('khl.saves.v1',JSON.stringify([{slot:'slot9',savedAt:1,name:'옛',rank:G.player.rank,when:'x',data:G}]));localStorage.removeItem('khl.saves.v1.meta')});
await p.reload();await p.waitForFunction(()=>SAVES.ready,null,{timeout:10000});
const a=await p.evaluate(()=>({list:store.get(SAVE_KEY,[]).map(s=>s.slot+':'+!!s.data),old:localStorage.getItem('khl.saves.v1')}));
assert.deepEqual(a.list,['slot9:true']);assert.equal(a.old,null);
await p.evaluate(async()=>{await packsLoad();loadGame('slot9');enterGame();G.money=777;saveGame('slot1')});await p.waitForTimeout(400);
await p.reload();await p.waitForFunction(()=>SAVES.ready,null,{timeout:10000});
const c=await p.evaluate(()=>({m:store.get(SAVE_KEY,[]).find(s=>s.slot==='slot1')?.data?.money,meta:(localStorage.getItem('khl.saves.v1.meta')||'').length}));
assert.equal(c.m,777);assert(c.meta<2000,'목록만 localStorage');
await p.evaluate(()=>deleteSave('slot9'));assert.deepEqual(await p.evaluate(()=>store.get(SAVE_KEY,[]).map(s=>s.slot)),['slot1']);
assert.deepEqual(errs,[]);console.log('foundation: index / fill / tag / costItems / idb save passed');}finally{await b.close()}})().catch(e=>{console.error(e);process.exitCode=1});
