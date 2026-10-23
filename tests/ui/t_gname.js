/* 게이트 장소 이름 (data/gate_pool.js + data/pool): 지연 불러오기 · 장소만(게이트명 안 씀) · 하루 출현 수 · 목록 범위 · 중복 방지 · 저장/불러오기 · 예전 저장 · 장소 고갈 → 가까운 지역 · 재현 · 지도 — tests/ui/README.md 참고 */
const path=require('path');const APP='file://'+path.resolve(__dirname,'../../game/index.html');const OUT=process.env.OUT||require('os').tmpdir();
const {chromium}=require('playwright');(async()=>{const b=await chromium.launch({executablePath:process.env.CHROMIUM||undefined});
const errs=[];const p=await (await b.newContext({viewport:{width:1500,height:950}})).newPage();p.on('pageerror',e=>errs.push(e.message));
const ok=(c,m)=>{if(!c)errs.push('단언 실패: '+m)};
const t0=Date.now();await p.goto(APP);await p.addScriptTag({path:require('path').join(__dirname,'fixture.js')});await p.evaluate(()=>{OBSERVE.legacy=true});await p.waitForFunction(()=>typeof DB!=='undefined'&&!!DB.gatePlacePool);console.log('load ms',Date.now()-t0);
await p.evaluate(()=>{gameFromScenario('SC_BDEMO');enterGame()});
/* 0) 목록은 뒤에서 불러온다: 시작 직후엔 일부만, 기다리면 전부 */
const t1=Date.now();const r0=await p.evaluate(async()=>{const early=Object.keys(POOL.txt).length;await poolPrefetch();return {early,all:Object.keys(POOL.txt).length,need:vals('gatePlacePool').length}});
console.log('prefetch ms',Date.now()-t1,JSON.stringify(r0));ok(r0.all===r0.need,'목록 전부 불러옴');
/* 1) 300개 생성: 형식 · 계열 · 중복 · 전국 지역 */
/* 0.5) 하루 출현 수 ≈ 60 (BAL_WORLD.spawnPerHour 2.5) */
const rd=await p.evaluate(()=>{const n0=G.genSeq||0,r=rng('spawn-day');let n=0;for(let d=0;d<10;d++)for(let h=0;h<24;h++)for(let k=DB.balance.BAL_WORLD.spawnPerHour;k>0;k--)if(r()<Math.min(1,k))n++;return n/10});
console.log('하루 출현 기댓값',rd);ok(rd>45&&rd<75,'하루 약 60개');
const r1=await p.evaluate(()=>{const t=performance.now();for(let k=0;k<300;k++)spawnGate(Math.random);const ms=performance.now()-t;
  const L=Object.values(G.genGates),bad=[];
  for(const g of L){const gi=DB.gateInteriors[g.interior];if(!gi||gi.name!==g.terrain)bad.push('지형 '+g.id);
    if(g.name!==g.place)bad.push('형식 '+g.name);if(!poolList('gatePlacePool',placePoolOf(g.region).id).includes(g.place))bad.push('지역 장소 아님 '+g.name)}
  const key=g=>g.region+'|'+g.place,home=G.player.region,near=L.filter(g=>kmBetween(home,g.region)<=15).length;
  return {ms,n:L.length,bad:bad.slice(0,5),dupPlace:L.length-new Set(L.map(key)).size,regions:new Set(L.map(g=>g.region)).size,provs:new Set(L.map(g=>DB.regions[g.region].prov)).size,near,
used:Object.values(G.gpUsed).reduce((a,x)=>a+x.length,0),sample:L.slice(0,4).map(g=>regionName(g.region)+' '+g.name)}});
console.log(JSON.stringify(r1));ok(r1.n===300&&!r1.bad.length&&!r1.dupPlace&&r1.used===300,'생성 300개');ok(r1.ms<3000,'생성 시간');ok(r1.provs>=8,'여러 시도');ok(r1.near>=60,'내 주변 비중');
/* 2) 화면 표시 (목록 · 뉴스) */
await p.evaluate(()=>{UI.screen='gates';UI.gF=null;gateF().scope='all';render()});const gid=await p.evaluate(()=>{const g=Object.values(G.genGates).find(x=>gateSt(x.id).status==='open');return g&&g.id});
ok(await p.evaluate(id=>document.body.textContent.includes(DB.gates[id].name),gid),'목록에 이름');await p.screenshot({path:OUT+'/gn_gates.png'});
ok(await p.evaluate(()=>(G.news||[]).some(n=>Object.values(G.genGates).some(g=>n.title.includes(g.name)))),'뉴스에 이름');
ok(await p.evaluate(()=>(G.news||[]).filter(n=>n.cat==='게이트').length<300),'뉴스는 주변만');
/* 2.5) 목록 범위: 기본 주변 40km, 전국으로 바꾸면 더 많이 */
const sc=await p.evaluate(()=>{const n=()=>document.querySelectorAll('[data-gate]').length,set=v=>document.querySelector(`[data-gfset="scope|${v}"]`).click();UI.gF=null;render();const near=n();set('all');const all=n();set('here');const here=n();return {near,all,here}});
console.log(JSON.stringify(sc));ok(sc.all>sc.near&&sc.near>=sc.here,'목록 범위');
/* 3) 클리어 · 정리 뒤에도 사용 기록 유지, 저장/불러오기 */
const r3=await p.evaluate(()=>{const before=JSON.stringify(G.gpUsed),names=Object.fromEntries(Object.values(G.genGates).map(g=>[g.id,g.name]));
  Object.keys(G.genGates).slice(0,50).forEach(id=>{G.gates[id].status='cleared'});G.time+=24*60*10;runTime('hour');
  const s=JSON.parse(JSON.stringify(G));G=s;enterGame('gates');const same=Object.values(G.genGates).filter(g=>names[g.id]).every(g=>names[g.id]===g.name);
  const keep=Object.entries(JSON.parse(before)).every(([r,a])=>a.every(x=>G.gpUsed[r].includes(x)));return {same,keep}});
console.log(JSON.stringify(r3));ok(r3.same&&r3.keep,'저장 · 정리 뒤 이름 · 사용 기록');
/* 4) 예전 저장 (새 필드 없음) */
const r4=await p.evaluate(()=>{const s=JSON.parse(JSON.stringify(G));delete s.gpUsed;const old=Object.values(s.genGates)[0];if(old){delete old.place;delete old.interior;old.name='예전 이름 - 예전 게이트명'}
  G=s;enterGame('gates');render();spawnGate(Math.random);return {old:old?DB.gates[old.id].name:'-',used:Object.values(G.gpUsed).reduce((a,x)=>a+x.length,0)}});
console.log(JSON.stringify(r4));ok(r4.old==='예전 이름 - 예전 게이트명'||r4.old==='-','예전 이름 보존');ok(r4.used===1,'예전 저장 새 기록');
/* 5) 장소 고갈: 그 지역 장소를 다 쓰면 가장 가까운 다른 지역 장소 (게이트도 그 지역) */
const r5=await p.evaluate(()=>{const R='RG_IC_YEONSU',pp=placePoolOf(R);G.gpUsed[R]=poolList('gatePlacePool',pp.id).slice();
  const a=gateNameFor(R,Math.random,'x'),near=vals('regions').filter(x=>x.id!==R&&placeLeft(x.id)>0).sort((x,y)=>kmBetween(R,x.id)-kmBetween(R,y.id))[0].id;
  return {region:a.region,near,place:a.place,inPool:poolList('gatePlacePool',placePoolOf(a.region).id).includes(a.place)}});
console.log(JSON.stringify(r5));ok(r5.region===r5.near&&r5.inPool,'고갈 → 가까운 지역');
/* 6) 같은 난수 → 같은 결과 */
const r6=await p.evaluate(()=>{const run=()=>{G.gpUsed={};const r=rng('seed-x');return gateNameFor('RG_SEOUL_MAPO',r,'x').name};return [run(),run()]});
console.log(JSON.stringify(r6));ok(r6[0]===r6[1],'재현');
/* 7) 지도: 모든 시도에 하위 지도, 모든 게임 지역을 지도에서 고를 수 있음 */
const r7=await p.evaluate(()=>{const inMap=new Set(vals('mapAreas').filter(a=>a.region).map(a=>a.region));return {regions:vals('regions').length,miss:vals('regions').filter(r=>!inMap.has(r.id)).map(r=>r.id),kr:vals('mapAreas').filter(a=>a.map==='MAP_KR'&&!a.to).map(a=>a.name)}});
console.log(JSON.stringify(r7));ok(!r7.miss.length&&!r7.kr.length,'지도 연결');
await p.evaluate(()=>{UI.screen='acts';UI.actsTab='지도';UI.mapId='MAP_GYEONGBUK';UI.mapReg='RG_GB_POHANG';render()});await p.waitForTimeout(200);await p.screenshot({path:OUT+'/gn_map.png'});
console.log('errs',errs);await b.close()})();
