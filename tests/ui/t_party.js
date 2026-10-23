/* 파티: 갈 게이트 먼저 · 등급 맞는 사람만 · 거절 뒤 재시도 막힘 · 모집 게시판 — tests/ui/README.md 참고 */
const path=require('path');const APP='file://'+path.resolve(__dirname,'../../game/index.html');const OUT=process.env.OUT||require('os').tmpdir();
const {chromium}=require('playwright');(async()=>{const b=await chromium.launch({executablePath:process.env.CHROMIUM||undefined});
const errs=[];const p=await (await b.newContext({viewport:{width:1500,height:950}})).newPage();p.on('pageerror',e=>errs.push(e.message));
const ok=(c,m)=>{if(!c)errs.push('단언 실패: '+m)};
await p.goto(APP);await p.addScriptTag({path:require('path').join(__dirname,'fixture.js')});await p.waitForTimeout(300);
await p.evaluate(async()=>{gameFromScenario('SC_BDEMO');enterGame('party');await poolPrefetch()});await p.waitForTimeout(300);
/* 게이트 없이 초대 막힘 */
await p.evaluate(()=>{UI.partyTab='지인';render()});
ok(await p.evaluate(()=>[...document.querySelectorAll('[data-partyinv]')].every(b=>b.disabled)),'게이트 전 초대 막힘');
/* 게이트 고르기 */
const gid=await p.evaluate(()=>{const g=partyGates()[0];return g&&g.id});ok(!!gid,'주변 게이트 있음');
await p.selectOption('[data-pgate]',gid);ok(await p.evaluate(id=>G.party.gid===id,gid),'게이트 선택');
/* 등급 안 맞는 사람은 초대 불가 */
const fit=await p.evaluate(()=>{const g=partyGate(),pool=Object.values(partyPoolTabs()).flat();const bad=pool.filter(h=>gateFit(h,g)),good=pool.filter(h=>!gateFit(h,g));return {bad:bad.length,good:good.length,badDisabled:bad.every(h=>{UI.partyTab=Object.keys(partyPoolTabs()).find(k=>partyPoolTabs()[k].includes(h));render();const b=document.querySelector(`[data-partyinv="${h.id}"]`);return !b||b.disabled})}});
console.log(JSON.stringify(fit));ok(fit.badDisabled,'등급 안 맞으면 버튼 막힘');
const forced=await p.evaluate(()=>{const g=partyGate(),h=allHunters().find(x=>x.id!==G.player.id&&gateFit(x,g));if(!h)return 'none';partyInvite(h.id);return partyIds().includes(h.id)?'joined':'blocked'});ok(forced!=='joined','등급 안 맞으면 합류 안 됨');
/* 거절 → 같은 사람 다시 못 부름 */
const rf=await p.evaluate(()=>{UI.partyTab='협회 매칭';const g=partyGate(),c=partyPoolTabs()['협회 매칭'].filter(h=>!inviteBlock(h,g));if(!c.length)return {n:0};const h=c[0];const orig=Math.random;Math.random=()=>0;partyInvite(h.id);Math.random=orig;
  const refused=!partyIds().includes(h.id),wait=inviteWait(h.id);const n0=partyIds().length;for(let k=0;k<20;k++)partyInvite(h.id);return {n:c.length,refused,wait,after:partyIds().includes(h.id),blk:inviteBlock(h,g)}});
console.log(JSON.stringify(rf));ok(rf.n===0||(rf.refused&&rf.wait>0&&!rf.after&&rf.blk.includes('거절')),'거절 뒤 재시도 막힘');
/* 매칭 후보는 모두 등급 맞음 */
ok(await p.evaluate(()=>partyPoolTabs()['협회 매칭'].every(h=>!gateFit(h,partyGate()))),'매칭 후보 등급 맞음');
await p.evaluate(()=>{UI.partyTab='협회 매칭';render()});await p.screenshot({path:OUT+'/pt_invite.png'});
/* 모집 게시판 */
await p.click('[data-partytab="모집 게시판"]');const bd=await p.evaluate(()=>partyBoard().map(po=>({g:DB.gates[po.gid].rank,m:po.ids.map(id=>H(id).rank),fit:po.ids.every(id=>!gateFit(H(id),DB.gates[po.gid]))})));
console.log(JSON.stringify(bd).slice(0,300));ok(bd.every(x=>x.fit),'게시판 구성원 등급 맞음');await p.screenshot({path:OUT+'/pt_board.png'});
/* 진입 준비 */
await p.evaluate(()=>{UI.partyTab='지인';render()});await p.click('[data-partygo]');ok(await p.evaluate(()=>UI.screen==='raidprep'),'진입 준비로');
console.log('errs',errs);await b.close()})();
