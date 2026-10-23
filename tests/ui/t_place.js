/* UI 스모크 테스트 — tests/ui/README.md 참고 */
const path=require('path');const APP='file://'+path.resolve(__dirname,'../../game/index.html');const OUT=process.env.OUT||require('os').tmpdir();
const {chromium}=require('playwright');(async()=>{const b=await chromium.launch({executablePath:process.env.CHROMIUM||undefined});
const errs=[];const p=await (await b.newContext({viewport:{width:1500,height:950}})).newPage();p.on('pageerror',e=>errs.push(e.message));
await p.goto(APP);await p.addScriptTag({path:require('path').join(__dirname,'fixture.js')});await p.waitForTimeout(300);
/* 장소 · 이동: 위치 표시 · 이동 메뉴 · 행동하면 자동 이동 · 먼 지역 · NPC 바쁨 · 게이트 이동 */
await p.evaluate(()=>{gameFromScenario('SC_BDEMO');enterGame();G.stopOn.event=false;G.stopOn.lowEnergy=false});
console.log('loc',await p.evaluate(()=>placeName(locOf())));
await p.click('[data-locmenu]');await p.screenshot({path:OUT+'/place_menu.png'});
await p.click('[data-goto="RG_SEOUL_MAPO|PT_TRAIN"]');console.log('goto',(await p.locator('#toast').innerText()).replace(/\n/g,' '));
console.log('travel costs',await p.evaluate(()=>['RG_SEOUL_GANGNAM','RG_GG_SEONGNAM','RG_BS_HAEUNDAE','RG_JJ_JEJU'].map(r=>r+':'+JSON.stringify(travelCost(locOf(),{region:r,pt:'PT_CAFE'}))).join(' ')));
console.log('rest',await p.evaluate(()=>{doNow('ACT_REST',60);return placeName(locOf())+' '+hhmm(G.time)}),(await p.locator('#toast').innerText()).replace(/\n/g,' ').slice(0,120));
/* NPC 바쁨: 오늘 일정에서 지금 일하는 중이면 만날 수 없다 */
console.log('busy',await p.evaluate(()=>{const a=SIM.aiOf(P('HN_B0002'));a.day=G.day;a.today=[{s:G.time-30,e:G.time+120,act:'ACT_TR_COMBAT'}];return [npcWhere('HN_B0002').busy,actCheck(DB.actions.ACT_MEET,60,false,'HN_B0002').why.join()]}));
console.log('free',await p.evaluate(()=>{const a=G.ai.HN_B0002;a.today=[{s:G.time-30,e:G.time+120,act:'ACT_FRIENDS'}];return [placeName(npcWhere('HN_B0002')),actCheck(DB.actions.ACT_MEET,60,false,'HN_B0002').ok]}));
/* 먼 지역 게이트로 공략 → 이동 시간 */
console.log('far gate',await p.evaluate(()=>{const g=vals('gates').find(x=>x.region!==G.player.region&&gateSt(x.id).status==='open');if(!g)return 'none';const t0=nowAbs();gateSt(g.id).permit=true;startRaid(g.id);return [g.region,nowAbs()-t0,placeName(locOf()),UI.screen]}));
await p.evaluate(()=>{if(UI.raid){UI.raid.done=true;clearInterval(UI._rt)}UI.screen='profile';UI.profileId='HN_B0002';UI.profTab='생활';SETTINGS.dev=true;render()});await p.screenshot({path:OUT+'/place_profile.png'});
console.log('errs',errs);await b.close()})();
