/* data/base/b_hunters.js 생성기 — Claude가 만드는 최소 재료(이름 있는 헌터 몇 명). 실행: node tools/gen_base_hunters.js
   능력치는 시드로 만든다. 정식 인물은 Codex 외주로 채운다. */
const fs=require('fs'),path=require('path');
function hashStr(s){let h=2166136261;for(let i=0;i<s.length;i++){h^=s.charCodeAt(i);h=Math.imul(h,16777619)}return h>>>0}
function rng(seed){let a=hashStr(String(seed));return ()=>{a|=0;a=a+0x6D2B79F5|0;let t=Math.imul(a^a>>>15,1|a);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296}}
const gauss=r=>{let u=0,v=0;while(!u)u=r();while(!v)v=r();return Math.sqrt(-2*Math.log(u))*Math.cos(2*Math.PI*v)};
const cl=(v,a,b)=>Math.max(a,Math.min(b,Math.round(v)));
/* [id, 이름, 성별, 나이, 등급, 레벨, 역할, 부역할, 클래스, 길드, 지역, 각성 연월, 성향 문구, 키, 몸무게] */
const L=[
 ['HN_B0001','한지석','남',38,'RANK_16',14,'ROLE_TANK',null,'CLS_B01','GD_B01','RG_SEOUL_MAPO','2015-05','버티는 맏형',181,88],
 ['HN_B0002','오세린','여',26,'RANK_18',6,'ROLE_HEAL','ROLE_SUP','CLS_B05','GD_B01','RG_SEOUL_MAPO','2024-09','꼼꼼한 회복 담당',163,51],
 ['HN_B0003','배준호','남',23,'RANK_19',3,'ROLE_MDPS',null,'CLS_B02','GD_B01','RG_SEOUL_SEODAEMUN','2025-11','겁 없는 막내',178,70],
 ['HN_B0004','임가윤','여',31,'RANK_13',22,'ROLE_RDPS','ROLE_SCOUT','CLS_B03','GD_B01','RG_SEOUL_MAPO','2019-02','말수 적은 저격수',167,55],
 ['HN_B0005','서명훈','남',47,'RANK_10',38,'ROLE_TANK','ROLE_SUP','CLS_B01','GD_B02','RG_SEOUL_EUNPYEONG','2001-08','1세대 원로',176,84],
 ['HN_B0006','차은솔','여',29,'RANK_13',21,'ROLE_MAGE',null,'CLS_B04','GD_B02','RG_SEOUL_EUNPYEONG','2018-04','계산 빠른 마법사',169,57],
 ['HN_B0007','노태경','남',34,'RANK_12',26,'ROLE_MDPS','ROLE_SCOUT','CLS_B02','GD_B02','RG_SEOUL_JONGNO','2016-10','실리파 돌격수',183,79],
 ['HN_B0008','윤채원','여',41,'RANK_05',55,'ROLE_MAGE',null,'CLS_B04','GD_B03','RG_SEOUL_GANGNAM','2004-03','방송을 타는 간판',171,58],
 ['HN_B0009','권도하','남',36,'RANK_06',50,'ROLE_TANK',null,'CLS_B01','GD_B03','RG_SEOUL_GANGNAM','2008-07','기업형 공격대장',187,92],
 ['HN_B0010','고민서','여',24,'RANK_14',17,'ROLE_SCOUT','ROLE_RDPS','CLS_B07','GD_B03','RG_SEOUL_SONGPA','2022-12','계약직 정찰조',161,49],
 ['HN_B0011','남궁현','남',52,'RANK_09',42,'ROLE_SUP','ROLE_HEAL','CLS_B06','GD_B04','RG_GG_SEONGNAM','1999-11','협회 출신 연합장',172,75],
 ['HN_B0012','송하람','여',33,'RANK_15',15,'ROLE_RDPS',null,'CLS_B03','GD_B05','RG_IC_YEONSU','2017-06','바람결 파티장',165,53],
 ['HN_B0013','진우석','남',28,'RANK_17',9,'ROLE_MDPS',null,'CLS_B02',null,'RG_SEOUL_MAPO','2023-03','떠도는 프리랜서',175,73],
 ['HN_B0014','문예진','여',22,'RANK_20',1,'ROLE_HEAL',null,'CLS_B05',null,'RG_SEOUL_MAPO','2026-01','갓 각성한 대학생',158,47],
 ['HN_B0015','정이수','남',44,'RANK_08',47,'ROLE_RDPS',null,'CLS_B03',null,'RG_SEOUL_GANGNAM','2003-09','언론에 안 나오는 강자',179,71],
];
const SK={CLS_B01:['SK_B0001','SK_B0002','SK_B0003','SK_B0004'],CLS_B02:['SK_B0005','SK_B0006','SK_B0007','SK_B0008'],CLS_B03:['SK_B0009','SK_B0010','SK_B0011','SK_B0012'],CLS_B04:['SK_B0013','SK_B0014','SK_B0015','SK_B0016'],CLS_B05:['SK_B0017','SK_B0018','SK_B0019','SK_B0020'],CLS_B06:['SK_B0021','SK_B0022','SK_B0023','SK_B0024'],CLS_B07:['SK_B0025','SK_B0026','SK_B0027','SK_B0028']};
const COM=['SK_B0101','SK_B0102','SK_B0103','SK_B0104','SK_B0105','SK_B0106'];
const out=L.map(([id,name,sex,age,rank,lv,rm,rs,cls,guild,region,awk,style,ht,wt])=>{const r=rng(id);
  const stats={STAT_BODY:cl(42+lv*4.2+gauss(r)*8,20,400),STAT_MIND:cl(30+lv*2.6+gauss(r)*7,15,400),STAT_MANA:cl(30+lv*3.2+gauss(r)*8,15,400),STAT_SENSE:cl(34+lv*3.4+gauss(r)*8,15,400)};
  const abl={};for(let i=1;i<=30;i++)abl['ABL_A'+String(i).padStart(2,'0')]=cl(7+lv*0.12+gauss(r)*2.2,1,20);for(let i=1;i<=40;i++)abl['ABL_B'+String(i).padStart(2,'0')]=cl(9+gauss(r)*2.6,1,20);
  const tot=Object.values(abl).reduce((a,b)=>a+b,0);
  const skills=[...SK[cls].slice(0,2+Math.min(2,Math.floor(lv/15))).map(s=>[s,cl(1+lv/10+r()*2,1,20)]),[COM[Math.floor(r()*COM.length)],cl(1+lv/12,1,20)]];
  const looks={APS_FACE:cl(10+gauss(r)*3.5,1,20),APS_BODY:cl(10+gauss(r)*3,1,20),APS_SENSUAL:cl(10+gauss(r)*3,1,20),APS_STYLE:cl(10+gauss(r)*3,1,20)};
  return {id,name,sex,birth:`${2026-age}-${String(1+Math.floor(r()*12)).padStart(2,'0')}-${String(1+Math.floor(r()*28)).padStart(2,'0')}`,age,height:ht,weight:wt,region,nation:'NAT_KR',birthplace:'BP_SEOUL',langs:['LANG_KO'],voice:'VOICE_00'+(1+Math.floor(r()*4)),speech:'SPEECH_00'+(1+Math.floor(r()*8)),
    rank,level:lv,exp:Math.round(80*Math.pow(lv,1.8)*r()),awake:true,roleMain:rm,roleSub:rs,guild,awakened:awk,affinity:['화염','냉기','바람','대지','그림자','빛'][Math.floor(r()*6)],cls,traits:[],skills,
    contract:guild?{share:6+Math.floor(r()*8),until:'2027-0'+(1+Math.floor(r()*9)),bonus:'공략 성공 시 +1%'}:{share:0,until:'—',bonus:'—'},style,personality:'',media:'무난함',status:'정상',morale:'보통',fit:60+Math.floor(r()*35),prefs:[],form:[],career:[],byRank:{},portrait:'POR_'+id,
    stats,abl,looks,pot:{level:lv+10+Math.floor(r()*30),cap:Math.min(1400,tot+120+Math.floor(r()*200))}}});
const txt=`/* data/base/b_hunters.js — 자동 생성 (tools/gen_base_hunters.js). 직접 고치지 말 것.
   Claude 최소 재료: 길드 · 파티 · 데모에 필요한 이름 있는 헌터 몇 명 (배치 코드 B). 정식 인물은 Codex 외주로 채운다. */
def('hunters', [
${out.map(h=>'  '+JSON.stringify(h)).join(',\n')}
]);
`;
fs.writeFileSync(path.join(__dirname,'../game/data/base/b_hunters.js'),txt);console.log('hunters',out.length);
