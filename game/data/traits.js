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
/* ════ 특성 (traits) '최대한 많이' 선택 필드 (2026-10-24) — 전부 선택. 안 쓰면 그만, 필요할 때 넣어 쓴다. 공통 [작업] notes 메모 · src 작성자 · ver 버전 ════
   [기본] id 'TR_…' · name · alias · cat(traitCats) · cost 포인트(− = 좋은 특성) · pick 커마에서 고를 수 있음 · tags · desc · lore · icon · color · rarity 1~5
   [효과] stats {STAT_…: ±} · abl {ABL_…: ±} · mind {mindTags: 가중치} 판단 성향 · emo {emotions: 배율} 감정 쉽게/어렵게 · px {ccPersonality: ±} 성격 쏠림
          heal 회복 배율 · energy 기력 배율 · sleep 수면 · money 돈 씀씀이 · luck 운 · injury 부상 배율 · se [statusEffects 면역 · 취약]
   [조건] req 얻는 조건(글/규칙) · ban [traits 같이 못 가짐] · with [traits 잘 붙는 짝] · gain 게임 중 생기는 길(글) · lose 없어지는 길(글) · hidden 숨은 특성(일대기에서만 드러남)
   [사회] visible 남이 아는 특성 · rel {relDims: ±} 첫인상 · fame 평판
   [문장] lines {gain, show, lose, daily} — {u} */
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

