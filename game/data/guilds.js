/* guilds.js — 길드. crest: 문장 에셋 ID (assets/crests/<id>.png 가 있으면 표시, 없으면 글자 문장)
   recruit : 입단 기준 [prototype_default] — minLv: 이 등급 숫자 이하(=더 강한)만 받는다 · minRep: 평판 · share: 제안 배분율 범위(%) · months: 계약 기간
             없으면 지금은 사람을 받지 않는다 */

/* 길드 등급 (협회 심사) — 매월 1일 조건을 모두 채우면 한 단계 승급. need: rep 평판 · raids 누적 공략 성공 · members 길드원 수 · rankLv 길드 등급 숫자(이하)
   recruit: 영입 판정 보너스 · rent: 사무실 운영비 배수 · morale: 길드원 사기 보너스(월) · consign: 매월 협회가 입찰 없이 맡기는 게이트 수(길드 등급 근처의 입찰 게이트). 수치는 [prototype_default] */
/* ════ 길드 (guilds) '최대한 많이' 선택 필드 (2026-10-24) — 전부 선택. 안 쓰면 그만, 필요할 때 넣어 쓴다. 공통 [작업] notes 메모 · src 작성자 · ver 버전 ════
   [기본] id 'GD_…' · name · alias · en · short · tier(guildTiers) · rank · color · color2 · crest · sym(crestSyms) · motto 구호 · desc · lore · founded 세운 해
   [조직] master 길드장 · subs [부길드장 ID] · members 인원 · ranks [글 직급] · parent 모기업(글) · rivals [guilds] · allies [guilds] · type(corp 대기업 · union 연합 · public 공공 · party 민간 파티 · cult 종교 · crime 범죄)
   [거점] region · hq places ID · branches [regions] · facilities [글 훈련장 · 공방 · 숙소]
   [돈]   funds · income 월 수입 · pay 급여 체계(글) · share 배분율 · raids · rep 평판 · fame 대중 인지도 1~5 · scandal [글]
   [모집] recruit {minLv, minRep, share, months, rank, cls [classes], roles [roles], test 시험(글)} · style 분위기(글: 군대식 · 가족 같은 · 실적주의)
   [게이트] gateRanks [약한, 센] 주로 도는 등급 · bidStyle(aggressive · careful) · territory [regions]
   [문장] lines {join, leave, promote, fire, news} */
def('guildTiers', [
  {id:'GTR_1', name:'신생 길드',  lv:1, need:{rep:0,  raids:0,   members:1,  rankLv:20}, recruit:0, rent:1,   morale:0, consign:0, desc:'협회에 막 등록된 길드.'},
  {id:'GTR_2', name:'정식 길드',  lv:2, need:{rep:20, raids:5,   members:3,  rankLv:18}, recruit:1, rent:1.2, morale:1, consign:0, desc:'공략 실적이 쌓여 협회 정식 등록 심사를 통과한 길드.'},
  {id:'GTR_3', name:'중견 길드',  lv:3, need:{rep:40, raids:20,  members:6,  rankLv:14}, recruit:2, rent:1.6, morale:2, consign:1, desc:'지역에서 이름이 알려진 길드.'},
  {id:'GTR_4', name:'상위 길드',  lv:4, need:{rep:65, raids:50,  members:12, rankLv:9},  recruit:3, rent:2.5, morale:3, consign:2, desc:'협회가 고등급 게이트 협조를 요청하는 길드.'},
  {id:'GTR_5', name:'대형 길드',  lv:5, need:{rep:85, raids:120, members:25, rankLv:5},  recruit:4, rent:4,   morale:4, consign:3, desc:'전국 단위로 활동하는 길드.'},
]);
/* 문장 기호 — 길드장이 고른다 (그림 에셋이 없을 때 글자 대신 표시) */
def('crestSyms', [
  {id:'CS_01', glyph:'✦', name:'별'},   {id:'CS_02', glyph:'◆', name:'마름모'}, {id:'CS_03', glyph:'▲', name:'봉우리'},
  {id:'CS_04', glyph:'●', name:'원'},   {id:'CS_05', glyph:'✚', name:'십자'},   {id:'CS_06', glyph:'☾', name:'초승달'},
  {id:'CS_07', glyph:'☀', name:'해'},   {id:'CS_08', glyph:'♜', name:'성채'},   {id:'CS_09', glyph:'✖', name:'교차'},
  {id:'CS_10', glyph:'◎', name:'과녁'}, {id:'CS_11', glyph:'❖', name:'문양'},   {id:'CS_12', glyph:'♠', name:'창끝'},
]);
