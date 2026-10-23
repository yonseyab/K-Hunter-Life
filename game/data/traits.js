/* =========================================================
   traits.js — 특성
   수백~수천 개로 늘어날 것을 전제로 한다. 카테고리별로 파일을 나눠도 된다
   (예: traits_body.js, traits_mind.js — 같은 'traits' 테이블로 합쳐진다).

   id    : TR_#### (4자리)
   cat   : 카테고리 ID (traitCats)
   cost  : 캐릭터 생성 포인트. 음수 = 포인트 소모(장점), 양수 = 포인트 획득(단점), 0 = 중립
   pick  : 캐릭터 생성 화면에서 고를 수 있는지 (false 면 게임 중에만 생기는 특성)
   excl  : 같은 묶음(XG_*) 안에서는 하나만 가질 수 있다
   tags  : 검색용 키워드
   desc  : 인물 묘사
   ※ 특성이 게임에 주는 영향은 아직 정하지 않는다.
   ========================================================= */
def('traitCats', [
  {id:'TC_BODY',   name:'신체 · 체질'},
  {id:'TC_MIND',   name:'정신 · 기질'},
  {id:'TC_SOCIAL', name:'사회 · 관계'},
  {id:'TC_LIFE',   name:'생활 · 습관'},
  {id:'TC_SKILL',  name:'재능 · 기술'},
  {id:'TC_PAST',   name:'경력 · 과거'},
  {id:'TC_HUNTER', name:'헌터 · 각성'},
  {id:'TC_ETC',    name:'기타'},
]);

