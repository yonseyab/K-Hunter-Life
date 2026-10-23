/* 끝 · 일대기 · 작별 · 기록관 · 파일 · 같은 세계 이어 가기 · 플레이 중 인물 바꾸기 · 노화 (K-Hunter-Life) — assert */
const path=require('path');const APP='file://'+path.resolve(__dirname,'../../game/index.html');
const {chromium}=require('playwright');(async()=>{const b=await chromium.launch({executablePath:process.env.CHROMIUM||undefined});
const errs=[];const p=await (await b.newContext({viewport:{width:1500,height:950}})).newPage();p.on('pageerror',e=>errs.push(e.message));
const ok=(c,m)=>{if(!c)errs.push('단언 실패: '+m)};
await p.goto(APP);await p.waitForFunction(()=>typeof DB!=='undefined');await p.evaluate(()=>localStorage.clear());
await p.evaluate(async()=>{await packsLoad();gameFromScenario('SC_BDEMO');enterGame();await poolPrefetch();prefs().play.stop='none';prefs().autoRaid.on='off';PLAY.runSync(1440*3,60)});
/* 플레이 중 인물 바꾸기: 아는 헌터로 → 원래 헌터는 NPC (HN_L) */
const sw=await p.evaluate(()=>{prefs().autoRaid.on='off';const c=LEGACY.candidates();const old=G.player.name,to=c[0];const prev=LEGACY.switchTo(to.id);return {n:c.length,old,now:G.player.name,toName:to.name,prev,npc:!!G.genHunters[prev],npcName:G.genHunters[prev]?.name,rel:G.relations[0].id===prev,detailed:SIM.detailedList().some(h=>h.id===prev)}});
ok(sw.n>0&&sw.now===sw.toName&&sw.npc&&sw.npcName===sw.old&&sw.rel&&sw.detailed,'인물 바꾸기 '+JSON.stringify(sw));
await p.evaluate(()=>PLAY.runSync(1440,60));
/* 은퇴 → 노년 → 일대기 한 장 → 기록관 자동 보관 */
const ret=await p.evaluate(()=>{retire();return {dead:G.dead,card:!!G.bioCard,ch:G.bioCard.chapters.length,old:G.bioCard.oldAge?.lines.length,arc:LEGACY.list().length,screen:UI.screen}});
ok(ret.dead.kind==='retire'&&ret.card&&ret.ch>=1&&ret.old>=1&&ret.arc>=1&&ret.screen==='gameover','은퇴 일대기 '+JSON.stringify(ret));
await p.evaluate(()=>render());ok(await p.locator('#farewell').count()===1,'작별 한마디 입력');
await p.fill('#farewell','고생했다');await p.click('[data-kfare]');
ok(await p.evaluate(()=>G.bioCard.farewell==='고생했다'&&LEGACY.list()[0].card.farewell==='고생했다'),'작별 저장 · 기록관 반영');
/* 파일로 내보내기 · 가져오기 (같은 형식) */
const io=await p.evaluate(()=>{const s=LEGACY.exportJSON(LEGACY.list()[0].aid);const e=JSON.parse(s);e.aid='AR_TEST';const r=LEGACY.importJSON(JSON.stringify(e));const bad=LEGACY.importJSON('{"x":1}');return {ok:r.ok,bad:bad.error,n:LEGACY.list().length}});
ok(io.ok&&io.bad&&io.n>=2,'파일 가져오기 '+JSON.stringify(io));
/* 같은 세계에서 새 인물로: 커마 → 세계 상태 이어짐 · 전 주인공이 NPC 로 · 관계 */
const day0=await p.evaluate(()=>G.day);
await p.selectOption('#contRel','mentor');await p.click('[data-kcont="new"]');
ok(await p.evaluate(()=>UI.mode==='create'&&!!UI.continueFrom),'커마로 넘어감');
await p.evaluate(()=>{const cc=UI.cc;autoAll(cc);cc.step=CC_STEPS.length-1;render()});
ok(await p.locator('[data-karadd]').count()===1,'커마 확인 단계에 기록관 넣기');
await p.selectOption('#arWhen','rookie');await p.selectOption('#arRel','rival');await p.click('[data-karadd]');
await p.evaluate(()=>{gameFromCreation(UI.cc);UI.cc=null;enterGame()});
const cont=await p.evaluate(d0=>({same:G.day===d0,legacy:(G.legacyOf||[]).length,rel:G.relations.map(r=>r.rel),arch:Object.keys(G.genHunters).filter(k=>k.startsWith('HN_A')).length,lnpc:Object.keys(G.genHunters).filter(k=>k.startsWith('HN_L')).length,story:G.story.some(x=>/같은 세계/.test(x.s))}),day0);
ok(cont.same&&cont.legacy>=1&&cont.rel.includes('REL_MENTOR')&&cont.rel.includes('REL_RIVAL')&&cont.arch===1&&cont.lnpc>=1&&cont.story,'같은 세계 이어 가기 '+JSON.stringify(cont));
/* 고비 · 나이 · 노화 사망 */
const age=await p.evaluate(()=>{G.player.age=103;G.player.birth='1923-01-01';DB.balance.BAL_AGE.maxAge=103;LIFE.daily();return {dead:G.dead?.cause}});
ok(/노환|병/.test(age.dead||''),'노화로 생을 마침 '+JSON.stringify(age));
await p.evaluate(()=>{UI.screen='gameover';render()});ok(await p.locator('.bio').count()===1,'일대기 화면');
/* 기록관 화면 */
await p.evaluate(()=>{UI.screen='archive';G.dead=null;render()});ok(await p.locator('[data-karexp]').count()>=2,'기록관 목록');
console.log(JSON.stringify({sw,ret,io,cont,age}));console.log('errs',JSON.stringify(errs));await b.close()})();
