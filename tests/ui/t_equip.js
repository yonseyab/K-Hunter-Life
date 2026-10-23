/* UI 스모크 테스트 — tests/ui/README.md 참고 */
const path=require('path');const APP='file://'+path.resolve(__dirname,'../../game/index.html');const OUT=process.env.OUT||require('os').tmpdir();
const {chromium}=require('playwright');(async()=>{const b=await chromium.launch({executablePath:process.env.CHROMIUM||undefined});
const errs=[];const p=await (await b.newContext({viewport:{width:1500,height:950}})).newPage();p.on('pageerror',e=>errs.push(e.message));
await p.goto(APP);await p.addScriptTag({path:require('path').join(__dirname,'fixture.js')});await p.waitForTimeout(300);
/* 관찰형: 화면에 직접 착용 버튼은 없다. 헌터 판단(GEAR.consider) · 칸 겹침(양손 · 한 벌) · 내구도 */
await p.evaluate(()=>{gameFromScenario('SC_BDEMO');enterGame('inventory');invAdd('IT_B0021',1,'LOC_BAG');UI.invSel=G.inv.findIndex(r=>r.item==='IT_B0021'&&r.loc==='LOC_BAG');render()});
const r=await p.evaluate(()=>{const o={btn:document.querySelectorAll('[data-equip]').length};
  const w0=GEAR.at('SLOT_WEAPON')?.it.id;o.keep=GEAR.consider().length===0||GEAR.at('SLOT_WEAPON').it.id===w0;  /* 단검(일반)은 지금 무기보다 낫지 않으면 안 바꾼다 */
  DB.items.IT_TEST_2H={id:'IT_TEST_2H',name:'시험 양손검',cat:'ITC_WEAPON',grade:'IG_5',price:1000,slot:'SLOT_WEAPON',twoHand:true};
  DB.items.IT_TEST_SUB={id:'IT_TEST_SUB',name:'시험 방패',cat:'ITC_WEAPON',grade:'IG_1',price:1000,slot:'SLOT_SUB'};
  invAdd('IT_TEST_SUB',1,'LOC_BODY');invAdd('IT_TEST_2H',1,'LOC_BAG');o.got=GEAR.consider();o.sub=GEAR.at('SLOT_SUB')?.it.id;o.subBag=G.inv.find(r=>r.item==='IT_TEST_SUB').loc;
  o.mod=checkMods(Object.keys(DB.abilities).find(k=>DB.abilities[k].g==='ABG_A1')).parts.find(x=>x[0]==='시험 양손검')?.[1];
  const x=GEAR.at('SLOT_WEAPON');x.r.dur=1;const m=G.money;G.money=0;GEAR.afterRaid(true);G.money=m;o.broken=GEAR.broken(x.r);o.mod0=GEAR.bonus(x);G.money=1e9;GEAR.afterRaid(true);o.fixed=!GEAR.broken(x.r);
  return o});
console.log(JSON.stringify(r));const ok=(c,m)=>{if(!c)errs.push('단언 실패: '+m)};
ok(r.btn===0,'직접 착용 버튼 없음');ok(r.keep,'나쁘면 안 바꿈');ok(r.got.includes('시험 양손검')&&r.sub==='IT_TEST_2H'&&r.subBag==='LOC_BAG','양손 무기가 보조 칸까지');ok(r.mod===11,'전설 +11');ok(r.broken&&r.mod0===0,'망가지면 성능 없음');ok(r.fixed,'돈이 있으면 헌터가 공방에 맡김');
console.log('errs',errs);await b.close()})();
