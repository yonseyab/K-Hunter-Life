/* UI 스모크 테스트 — tests/ui/README.md 참고 */
const path=require('path');const APP='file://'+path.resolve(__dirname,'../../game/index.html');const OUT=process.env.OUT||require('os').tmpdir();
const {chromium}=require('playwright');(async()=>{const b=await chromium.launch({executablePath:process.env.CHROMIUM||undefined});
const errs=[];const p=await (await b.newContext({viewport:{width:1500,height:950}})).newPage();p.on('pageerror',e=>errs.push(e.message+' '+(e.stack||'').split('\n')[1]));
await p.goto(APP);await p.addScriptTag({path:require('path').join(__dirname,'fixture.js')});await p.evaluate(()=>{OBSERVE.legacy=true});await p.waitForTimeout(300);
/* 길드 3차: 평판 · 협회 등급 심사 · 영입 경쟁 · 문장 · NPC 길드 계약 */
await p.evaluate(()=>{gameFromScenario('SC_BDEMO');enterGame('guild');leaveGuild();UI.guildTab='길드 창설';G.money=80000000;G.rep=30;G.time=600;G.stopOn.event=false;G.stopOn.lowEnergy=false;render()});
await p.fill('#gname','새벽빛 길드');await p.click('[data-guildfound]');
console.log('found',await p.evaluate(()=>`${G.myGuild.tier} rep=${G.myGuild.rep} rent=${guildRent(G.myGuild)}`));
await p.evaluate(()=>{for(const id of ['HN_B0008','HN_B0010','HN_B0013']){for(let k=0;k<8&&!H(id).guild;k++)recruitTry(id,15)}});
console.log('members',await p.evaluate(()=>guildMembers(G.myGuild.id).length));
/* 평판: 공략 성공 · 실패 */
console.log('rep',await p.evaluate(()=>{const r0=G.myGuild.rep;guildRaidRep(true,20);guildRaidRep(true,1);guildRaidRep(false,20);return `${r0}→${G.myGuild.rep} log=${G.myGuild.repLog.map(x=>x[1]).join(',')}`}));
/* 등급 심사: 조건 채우면 승급, 평판 폭락이면 강등 */
console.log('review',await p.evaluate(()=>{const g=G.myGuild;g.rep=25;g.raids=6;tierReview(g,G.day);const a=g.tier;g.rep=5;tierReview(g,G.day);return `${a} → ${g.tier} · ${G.alerts[0].subj}`}));
/* 영입 경쟁: 사기 낮은 길드원에게 제안 → 붙잡기 / 기한 지나면 떠남 */
console.log('poach',await p.evaluate(()=>{const g=G.myGuild,B=DB.balance.BAL_GUILD;B.poachChance=1;const ids=Object.keys(g.mem);ids.forEach(id=>g.mem[id].morale=10);poachMonth(g,B);return `${g.poach.length} offers: ${g.poach.map(p=>p.id+'←'+p.gid).join(' ')}`}));
await p.evaluate(()=>{UI.screen='squad';UI.guildTab='영입 · 관리';render()});
const pid=await p.evaluate(()=>G.myGuild.poach[0]?.id);
if(pid){await p.click(`[data-poach="${pid}|hold"]`);console.log('hold',await p.evaluate(id=>`${H(id).guild===G.myGuild.id} share=${G.myGuild.mem[id].share} morale=${G.myGuild.mem[id].morale}`,pid))}
console.log('expire',await p.evaluate(()=>{const g=G.myGuild,p=g.poach[0];if(!p)return 'none';g.mem[p.id].morale=0;poachDay(p.exp);return `${H(p.id).name} → ${H(p.id).guild}`}));
/* 문장 */
await p.click('[data-crest="sym|CS_06"]');await p.click('[data-crest="col|2"]');
console.log('crest',await p.evaluate(()=>`${G.myGuild.sym} ${G.myGuild.color2} ${crest(G.myGuild.id).replace(/<[^>]+>/g,'')}`));
await p.screenshot({path:OUT+'/guild3.png',fullPage:true});
/* NPC 길드가 무소속 헌터와 계약 */
console.log('npcSign',await p.evaluate(()=>{DB.balance.BAL_GUILD.npcSign=1;const f0=allHunters().filter(h=>!h.guild).length;for(let i=0;i<5;i++)npcGuildSign();return `${f0}→${allHunters().filter(h=>!h.guild).length} · ${G.news[0].title}`}));
/* NPC 길드 월간 변동 (승률 · 사망 → 평판, 공략 수 · 자금) + 저장/불러오기 후 유지 */
console.log('npcMonth',await p.evaluate(()=>{G.gStat={GD_B01:{win:30,fail:2,dead:0,pay:9e7},GD_B05:{win:2,fail:6,dead:2,pay:1e6}};const b=[DB.guilds.GD_B01.rep,DB.guilds.GD_B05.rep,DB.guilds.GD_B01.raids];let d=G.day;while(new Date(2026,2,9+d).getDate()!==1)d++;npcGuildMonth(d);
  const a=[DB.guilds.GD_B01.rep,DB.guilds.GD_B05.rep,DB.guilds.GD_B01.raids];DB.guilds.GD_B01.rep=0;syncGuildState();return `${b} → ${a} · restored ${DB.guilds.GD_B01.rep}`}));
/* 월초 처리 한 번 + 1주 진행 오류 없음 */
await p.evaluate(()=>{let d=G.day;while(new Date(2026,2,9+d).getDate()!==1)d++;guildMonth(d);runTime('week')});
console.log('errs',errs);await b.close()})();
