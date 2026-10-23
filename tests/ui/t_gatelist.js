/* 게이트 목록 (쇼핑몰식): 탭 = 저장된 필터 · 필터 줄 · 열 머리 정렬(오름 · 내림) · 발생 시각 · 공략 중(누가) · 나에게(등급 · 공략권) · 클리어 모아보기(지난 기록) · 탭 편집(숨김 · 순서 · 새 탭) — tests/ui/README.md 참고 */
const path=require('path');const APP='file://'+path.resolve(__dirname,'../../game/index.html');const OUT=process.env.OUT||require('os').tmpdir();
const {chromium}=require('playwright');(async()=>{const b=await chromium.launch({executablePath:process.env.CHROMIUM||undefined});
const errs=[];const p=await (await b.newContext({viewport:{width:1500,height:950}})).newPage();p.on('pageerror',e=>errs.push(e.message));
const ok=(c,m)=>{if(!c)errs.push('단언 실패: '+m)};
await p.goto(APP);await p.addScriptTag({path:require('path').join(__dirname,'fixture.js')});await p.waitForFunction(()=>typeof DB!=='undefined');
await p.evaluate(async()=>{gameFromScenario('SC_BDEMO');enterGame('gates');await poolPrefetch();for(let i=0;i<200;i++)spawnGate(Math.random);UI.gF=null;render()});
const rows=()=>p.evaluate(()=>[...document.querySelectorAll('tr[data-gate]')].map(tr=>tr.dataset.gate));
/* 1) 탭 · 개수 */
const t1=await p.evaluate(()=>[...document.querySelectorAll('[data-gtab]')].map(b=>b.textContent.trim()));console.log(t1.join(' | '));ok(t1.length>=8,'기본 탭');
/* 2) 정렬: 남은 시간 오름 → 머리 다시 누르면 내림 */
await p.evaluate(()=>{const f=gateF();f.scope='all';render()});
let L=await rows();const left=ids=>p.evaluate(ids=>ids.map(id=>gateLeft(DB.gates[id])),ids);let v=await left(L);ok(v.every((x,i)=>!i||v[i-1]<=x),'남은 시간 오름차순');
await p.click('th[data-gsort="left"]');L=await rows();v=await left(L);ok(v.every((x,i)=>!i||v[i-1]>=x),'내림차순');
await p.click('th[data-gsort="rank"]');L=await rows();const rk=await p.evaluate(ids=>ids.map(id=>DB.ranks[DB.gates[id].rank].lv),L);ok(rk.every((x,i)=>!i||rk[i-1]>=x),'등급 정렬');
await p.selectOption('#gs-k','born');await p.click('[data-gsortdir]');L=await rows();const bo=await p.evaluate(ids=>ids.map(id=>DB.gates[id].born??-1),L);ok(bo.every((x,i)=>!i||bo[i-1]>=x),'발생 최근 순');
/* 3) 필터: 입장 가능만 · 상태 칩 · 공략권 */
await p.click('[data-gfset="fit|fit"]');L=await rows();ok(L.length&&await p.evaluate(ids=>ids.every(id=>!gateFit(G.player,DB.gates[id])),L),'입장 가능만');
await p.click('[data-gfset="fit|easy"]');L=await rows();ok(L.length&&await p.evaluate(ids=>ids.every(id=>gateFitKey(DB.gates[id])==='easy'),L),'너무 쉬움');
const t3=await p.evaluate(()=>[...document.querySelectorAll('tr[data-gate]')].filter(tr=>{const g=DB.gates[tr.dataset.gate];return !g.owner&&!g.bid}).map(tr=>tr.querySelector('td:last-child').innerText).slice(0,3));console.log(t3);ok(t3.length&&t3.every(x=>x.includes('너무 쉬움')),'나에게: 너무 쉬움');
await p.click('[data-gfset="fit|any"]');
/* 4) 공략 중: NPC 파티 예약을 지금 진행 중으로 → 상태 · 누구 */
const g4=await p.evaluate(()=>{const g=Object.values(G.genGates).find(x=>gateSt(x.id).status==='open');(G.simQ=G.simQ||[]).push({s:nowAbs()-30,t:nowAbs()+120,gid:g.id,ok:true,by:'테스트 길드',n:4});return g.id});
await p.click('[data-gft="status|raiding"]');await p.evaluate(()=>{const f=gateF();f.status=['raiding'];render()});L=await rows();ok(L.includes(g4),'공략 중 필터');
const mine4=await p.evaluate(id=>gateMine(DB.gates[id])[0],g4);console.log(mine4);ok(mine4.includes('공략 중')&&mine4.includes('테스트 길드'),'공략 중 · 누가');
/* 5) 클리어 모아보기: 클리어 → 기록으로 넘어가도 보인다 */
const g5=await p.evaluate(()=>{const g=Object.values(G.genGates).find(x=>gateSt(x.id).status==='open'&&x.id!==G.simQ.at(-1).gid);const st=gateSt(g.id);st.status='cleared';st.by='다른 파티';st.clearedAt=nowAbs()-5*1440;worldTick(0);return g.id});
await p.click('[data-gtab="cleared"]');L=await rows();ok(L.includes(g5),'클리어 모아보기 (지난 기록)');
await p.click(`tr[data-gate="${g5}"]`);ok(await p.evaluate(()=>document.body.innerText.includes('지난 게이트')),'지난 게이트 상세');await p.screenshot({path:OUT+'/gl_cleared.png'});
/* 6) 탭 편집: 숨기기 · 순서 · 새 탭 저장 */
await p.click('[data-gtab="near"]');await p.click('[data-gtabedit]');
await p.click('[data-gft="type|던전형"]');await p.fill('#gtab-name','던전만');await p.click('[data-gtabsave]');
const t6=await p.evaluate(()=>({tabs:[...document.querySelectorAll('[data-gtab]')].map(b=>b.textContent.trim()),cur:UI.gTab,saved:JSON.stringify(G.prefs.gateTabs.custom)}));console.log(JSON.stringify(t6).slice(0,300));ok(t6.tabs.some(t=>t.startsWith('던전만'))&&t6.saved.includes('던전형'),'새 탭');
await p.uncheck('[data-gtabshow="broken"]');ok(!(await p.evaluate(()=>[...document.querySelectorAll('[data-gtab]')].some(b=>b.dataset.gtab==='broken'))),'탭 숨기기');
const o0=await p.evaluate(()=>G.prefs.gateTabs.order.slice(0,2).join());await p.click('[data-gtabmove="fit|-1"]');const o1=await p.evaluate(()=>G.prefs.gateTabs.order.slice(0,2).join());ok(o1==='fit,near'&&o0==='near,fit','탭 순서');
await p.screenshot({path:OUT+'/gl_tabs.png'});
/* 7) 저장 · 불러오기 뒤에도 탭 유지 */
const t7=await p.evaluate(()=>{const s=JSON.parse(JSON.stringify(G));G=s;UI.gF=null;enterGame('gates');return [...document.querySelectorAll('[data-gtab]')].map(b=>b.dataset.gtab).join()});ok(t7.startsWith('fit,near')&&t7.includes('U'),'저장 뒤 탭');
console.log('errs',errs);await b.close()})();
