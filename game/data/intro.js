/* =========================================================
   intro.js — 오프닝 인트로 (새 게임 → 인트로 → 캐릭터 생성). Gemini 문구 · ChatGPT 그림 (원본: art_src/intro)
   introScenes : ord 순서. img = assets/intro/<img>.webp (1920×1080, 하단 1/3은 자막 자리) · head 큰 문구 · text 자막 · mood calm/tense/warm/ominous(전환 속도)
                 status:true 면 그 장면에 상태창을 게임 UI로 띄운다 (화면 너비 28~72% · 높이 12~52%)
   introText   : IT_SKIP 건너뛰기 · IT_NEXT 진행 안내 · IT_END 마지막 안내(→ 캐릭터 생성) · IT_TITLE 타이틀 소개 문구
   ========================================================= */
def('introScenes', [
  {id:'IN_01', ord:1, img:'INTRO_01', head:'일상이 된 균열', text:'1999년 첫 게이트가 열린 지 27년. 지하철역 출구 옆, 허공에 어두운 문이 떠 있다. 출근길 사람들은 익숙하게 그 곁을 지나간다.', mood:'calm'},
  {id:'IN_02', ord:2, img:'INTRO_02', head:'등급과 남은 시간', text:'협회가 등급과 남은 시간을 공지하면, 장비를 챙긴 헌터들이 통제선 안으로 걸어 들어간다.', mood:'tense'},
  {id:'IN_03', ord:3, img:'INTRO_03', head:'바깥과 끊어진 세계', text:'문 너머는 매번 다른 이세계다. 각성자만 발을 들일 수 있고, 안에서는 바깥과 연락이 닿지 않는다.', mood:'ominous'},
  {id:'IN_04', ord:4, img:'INTRO_04', head:'어느 날 찾아오는 각성', text:'각성은 아주 드물게, 예고 없이 찾아온다. 본인만 보는 상태창이 생기며, 등급은 대부분 가장 낮은 20급에서 시작한다.', mood:'calm'},
  {id:'IN_05', ord:5, img:'INTRO_05', head:'마정석과 헌터의 삶', text:'누군가는 길드와 공격대에 들어가 마정석을 캐고, 누군가는 평범한 어제의 일상을 계속 살아간다.', mood:'warm'},
  {id:'IN_06', ord:6, img:'INTRO_06', head:'시간이 다하면, 브레이크', text:'브레이크는 드문 재난이다. 기한을 넘긴 문에서는 몬스터가 쏟아진다. 치유 포션은 없고, 목숨은 하나뿐이다.', mood:'ominous'},
  {id:'IN_07', ord:7, img:'INTRO_07', head:'오늘, 당신이 각성했다', text:'평범했던 하루의 끝, 허공에 낯선 창이 떠올랐다. 레벨 1, 20급. 이제 무엇이 될지는 당신의 몫이다.', mood:'tense', status:true},
]);
def('introText', [
  {id:'IT_SKIP',  text:'건너뛰기'},
  {id:'IT_NEXT',  text:'클릭하거나 Space로 계속'},
  {id:'IT_END',   text:'헌터 협회 각성자 등록 절차를 시작합니다.'},
  {id:'IT_TITLE', text:'1999년 첫 게이트 이후 27년, 게이트가 일상이 된 2026년. 당신의 기록'},
]);
