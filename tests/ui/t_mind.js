/* 판단 엔진 · 세 층 원칙 · 자기 인식 · 성격 변화 · 이야기꾼 (K-Hunter-Life) — assert */
const path=require('path');const APP='file://'+path.resolve(__dirname,'../../game/index.html');
const {chromium}=require('playwright');(async()=>{const b=await chromium.launch({executablePath:process.env.CHROMIUM||undefined});
const errs=[];const p=await (await b.newContext({viewport:{width:1500,height:950}})).newPage();p.on('pageerror',e=>errs.push(e.message));
const ok=(c,m)=>{if(!c)errs.push('단언 실패: '+m)};
await p.goto(APP);await p.waitForFunction(()=>typeof DB!=='undefined');
await p.evaluate(async()=>{await packsLoad();gameFromScenario('SC_BDEMO');enterGame()});
/* 성격대로: 겁 많고 비관적인 사람은 위험한 선택을, 모험적이고 낙관적인 사람은 안전한 선택을 덜 고른다 */
const r=await p.evaluate(()=>{prefs().play.predict='steady';G.cond.hp=100;G.cond.energy=100;G.injuries=[];G.emo=null;
  const C=DB.crises.CR_B0001.choices,count=pers=>{G.bio.pers=Object.assign({},G.bio.pers,pers);G.persF={};let bold=0;for(let i=0;i<200;i++){const d=MIND.decide(C,{kind:'crisis'});if(['bold'].includes(C[d.i].style))bold++}return bold};
  const brave=count({PX_ADVEN:10,PX_PESSI:1}),timid=count({PX_ADVEN:1,PX_PESSI:10});
  /* 태그 추정: 태그 · style 이 없어도 효과로 */
  const inf=[MIND.tagsOf({okFx:{retreat:true}}),MIND.tagsOf({check:{},risk:'위험',okFx:{}}),MIND.tagsOf({okFx:{money:-1000,rel:['T','close',3]}})];
  return {brave,timid,inf}});
ok(r.brave>r.timid+40,'성격에 따라 다르게 고름 '+JSON.stringify(r));ok(r.inf[0].includes('TAG_ESCAPE')&&r.inf[1].includes('TAG_RISK')&&r.inf[2].includes('TAG_KIND'),'효과로 태그 추정');
/* 예측 가능성: 자주 의외일수록 고른 것이 흩어진다 */
const pr=await p.evaluate(()=>{const C=DB.crises.CR_B0001.choices,spread=lv=>{prefs().play.predict=lv;const n=new Set(),c={};for(let i=0;i<300;i++){const d=MIND.decide(C,{kind:'crisis'});c[d.i]=(c[d.i]||0)+1}return Math.max(...Object.values(c))};return {steady:spread('steady'),often:spread('often')}});
ok(pr.steady>pr.often,'예측 가능성 '+JSON.stringify(pr));
/* 방침 대 성격: 방침 100%면 '안전 우선' 방침이 겁 없는 성격을 누른다 */
const pol=await p.evaluate(()=>{prefs().play.predict='steady';G.bio.pers.PX_ADVEN=10;G.bio.pers.PX_PESSI=1;G.persF={};const C=DB.crises.CR_B0001.choices,run=w=>{prefs().play.policyVsChar=w;prefs().autoRaid.policy='safe';let bold=0;for(let i=0;i<200;i++){const d=MIND.decide(C,{kind:'crisis'});if(C[d.i].style==='bold')bold++}return bold};const a=run(0),b=run(1);prefs().play.policyVsChar=0.4;prefs().autoRaid.policy='balanced';return {char:a,policy:b}});
ok(pol.char>pol.policy+100,'방침 대 성격 (안전 방침 100%면 대담한 선택이 줄어듦) '+JSON.stringify(pol));
/* 이유 문장 */
const why=await p.evaluate(()=>{const d=MIND.decide(DB.crises.CR_B0001.choices,{kind:'crisis'});return d.reason});ok(typeof why==='string','이유 문장 '+why);
/* NPC 도 같은 엔진: 같은 태그 점수 (−1~1) */
const npc=await p.evaluate(()=>{const h=H('HN_B0003');return MIND.npcScore(h,['TAG_RISK'])});ok(npc>=-1&&npc<=1,'NPC 점수 '+npc);
/* 경험이 성격을 바꾼다: 큰 부상이 쌓이면 비관 쪽으로, 기록이 남는다 · 시작값에서 driftMax 이상 안 움직인다 */
const dr=await p.evaluate(()=>{G.bio.pers.PX_PESSI=5;G.persF={};G.persBase={...G.bio.pers};G.persLog=[];for(let i=0;i<40;i++)MIND.drift('injuryBig');return {v:G.bio.pers.PX_PESSI,log:G.persLog.length,max:DB.balance.BAL_MIND.driftMax}});
ok(dr.v>5&&dr.v<=5+dr.max&&dr.log>=1,'성격 변화 '+JSON.stringify(dr));
/* 세 층 원칙: 외모 사실(1층)에 반대되는 반응(2층)은 나오지 않는다 */
const three=await p.evaluate(()=>{G.player.looks={APS_FACE:18,APS_BODY:14,APS_SENSUAL:12,APS_STYLE:14};const hi=STORY.lines('react:looksHi').length,lo=STORY.lines('react:looksLo').length;
  G.player.looks={APS_FACE:4,APS_BODY:8,APS_SENSUAL:8,APS_STYLE:8};const hi2=STORY.lines('react:looksHi').length,lo2=STORY.lines('react:looksLo').length,ev=eligible(DB.events.EV_B0007);
  return {hi,lo,hi2,lo2,ev}});
ok(three.hi>0&&three.lo===0&&three.hi2===0&&three.lo2>0&&three.ev===false,'세 층 원칙 '+JSON.stringify(three));
/* 3층 자기 인식: 사실에 묶여 있다 — 비관적이면 칭찬을 덜 믿지만 기준선에서 band 이상 벗어나지 않는다 */
const self=await p.evaluate(()=>{G.player.looks={APS_FACE:18,APS_BODY:15,APS_SENSUAL:12,APS_STYLE:15};G.selfHeard={};G.bio.pers.PX_PESSI=10;const base=SELF.base().looks;for(let i=0;i<50;i++)SELF.hear('looks',-1);const low=SELF.get().looks;G.selfHeard={};for(let i=0;i<50;i++)SELF.hear('looks',1);const up=SELF.get().looks;return {base,low,up,band:DB.balance.BAL_SELF.band}});
ok(self.low>=self.base-self.band&&self.up<=self.base+self.band&&self.low<self.up,'자기 인식 묶임 '+JSON.stringify(self));
/* 이야기꾼: 오래 조용하면 확률이 오르고, 큰일이 몰리면 내려간다 */
const tl=await p.evaluate(()=>{G.teller={last:nowAbs()-200*60,log:[]};const quiet=TELLER.mul('big');G.teller={last:nowAbs(),log:[]};for(let i=0;i<6;i++)TELLER.note(3,true);const busy=TELLER.mul('big');prefs().play.teller='off';const off=TELLER.mul('big');prefs().play.teller='on';return {quiet,busy,off}});
ok(tl.quiet>1.2&&tl.busy<1&&tl.off===1,'이야기꾼 '+JSON.stringify(tl));
/* 하루 공략 판단: 지치면 쉬고, 고정 횟수 제한 없음 (BAL_AUTORAID perDay 를 보지 않음) */
const day=await p.evaluate(()=>{G.time=600;G.cond.energy=20;const a=MIND.wantRaid(false);G.cond.energy=95;G.cond.hp=100;G.injuries=[];const n=Array.from({length:60},()=>MIND.wantRaid(false).go).filter(Boolean).length;return {tired:a.go,goes:n,blocked:AUTORAID.blocked()}});
ok(day.tired===false&&day.goes>0,'공략 판단 '+JSON.stringify(day));ok(!/횟수/.test(day.blocked||''),'하루 최대 횟수 제한 없음');
console.log(JSON.stringify({r,pr,pol,dr,three,self,tl,day,why}));
console.log('errs',JSON.stringify(errs));await b.close()})();
