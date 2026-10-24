/* Codex 01 · 스킬이 참조하는 속성 12개 · 상태 28개. 수치는 전투 개편을 위한 데이터다. */

def('elements', [
  {
    id:'EL_C01', name:'화염', desc:'국소 열과 연소에 작용한다. 산소와 가연물 상태에 영향을 받는다.', color:'#d66a43', opposite:['EL_C02']
  },
  {
    id:'EL_C02', name:'냉기', desc:'열을 빼앗고 수분을 얼린다. 해빙 뒤 바닥 상태가 달라진다.', color:'#81bed4', opposite:['EL_C01']
  },
  {
    id:'EL_C03', name:'전격', desc:'도체를 따라 전하가 흐른다. 젖은 환경에서는 누전에 주의한다.', color:'#d9bd52', opposite:['EL_C07']
  },
  {
    id:'EL_C04', name:'바람', desc:'공기 흐름과 바람의 압력을 다룬다. 분진을 함께 옮길 수 있다.', color:'#87baa4', opposite:['EL_C05']
  },
  {
    id:'EL_C05', name:'대지', desc:'흙과 암석의 결에 작용한다. 지반 없는 곳에서는 제약을 받는다.', color:'#aa8a5a', opposite:['EL_C04']
  },
  {
    id:'EL_C06', name:'물', desc:'존재하는 물의 흐름과 수압을 다룬다. 물을 무한히 만들지 않는다.', color:'#5f9ec6', opposite:['EL_C01']
  },
  {
    id:'EL_C07', name:'빛', desc:'광량과 반사에 작용한다. 시각 기관에 부담을 줄 수 있다.', color:'#e0d8ad', opposite:['EL_C08']
  },
  {
    id:'EL_C08', name:'어둠', desc:'주변 광량과 윤곽을 흐린다. 접촉을 없애지는 않는다.', color:'#77718f', opposite:['EL_C07']
  },
  {
    id:'EL_C09', name:'독', desc:'마력성 독과 표면 오염을 다룬다. 생물의 내성에 따라 효과가 다르다.', color:'#92a361', opposite:['EL_C10']
  },
  {
    id:'EL_C10', name:'순수 마력', desc:'원소로 바꾸지 않은 마력의 흐름이다. 별도 물질을 만들지 않는다.', color:'#ad94c7', opposite:['EL_C09']
  },
  {
    id:'EL_C11', name:'진동', desc:'매질을 따라 전해지는 진동이다. 지형과 흡음 재료의 영향을 받는다.', color:'#bd919c', opposite:['EL_C12']
  },
  {
    id:'EL_C12', name:'자력', desc:'철성 물체에 끌림과 밀림을 준다. 비금속에는 직접 작용하지 않는다.', color:'#8b9ca7', opposite:['EL_C11']
  }
]);

def('statusEffects', [
  {
    id:'SE_C001', name:'출혈', kind:'debuff', turns:3, stack:true,
    desc:'상처에서 피가 새어 체력이 줄어든다.', text:'{t}의 붕대 가장자리로 피가 번진다.', dmg:0.025
  },
  {
    id:'SE_C002', name:'화상', kind:'debuff', turns:3, stack:false,
    desc:'표면 열손상이 이어진다.', text:'{t}의 피부에 남은 열이 가시지 않는다.', dmg:0.02, el:'EL_C01'
  },
  {
    id:'SE_C003', name:'냉각', kind:'debuff', turns:3, stack:false,
    desc:'팔다리 움직임이 둔해진다.', text:'{t}의 옷자락에 서리가 남는다.', stat:{speed:0.85}, el:'EL_C02'
  },
  {
    id:'SE_C004', name:'감전', kind:'debuff', turns:3, stack:false,
    desc:'짧은 경련으로 자세가 흐트러진다.', text:'{t}의 손끝이 경련한다.', stat:{acc:0.9}, el:'EL_C03'
  },
  {
    id:'SE_C005', name:'중독', kind:'debuff', turns:3, stack:false,
    desc:'마력성 독이 체력을 소모시킨다.', text:'{t}의 얼굴에 식은땀이 맺힌다.', dmg:0.018, el:'EL_C09'
  },
  {
    id:'SE_C006', name:'속박', kind:'debuff', turns:3, stack:false,
    desc:'발을 떼기 어려워 이동이 느려진다.', text:'{t}의 발이 붙잡힌다.', stat:{speed:0.6}
  },
  {
    id:'SE_C007', name:'균형손실', kind:'debuff', turns:3, stack:false,
    desc:'중심이 흔들려 방어가 약해진다.', text:'{t}의 발끝이 바닥을 헛짚는다.', stat:{def:0.85}
  },
  {
    id:'SE_C008', name:'시야흐림', kind:'debuff', turns:3, stack:false,
    desc:'눈앞 윤곽이 번져 명중이 낮아진다.', text:'{t}의 눈앞에서 윤곽이 번진다.', stat:{acc:0.85}
  },
  {
    id:'SE_C009', name:'위치노출', kind:'debuff', turns:3, stack:false,
    desc:'표식으로 동선을 읽히기 쉬워진다.', text:'{t}의 움직임을 따라 표식이 남는다.', stat:{evade:0.9}
  },
  {
    id:'SE_C010', name:'출력불안', kind:'debuff', turns:3, stack:false,
    desc:'마력 흐름이 흔들린다.', text:'{t}의 마력 흐름이 일정하지 않다.', stat:{power:0.88}
  },
  {
    id:'SE_C011', name:'귀울림', kind:'debuff', turns:3, stack:false,
    desc:'반사음 때문에 주변 소리를 구별하기 어렵다.', text:'{t}의 귀에 낮은 소리가 남는다.', stat:{sense:0.85}, el:'EL_C11'
  },
  {
    id:'SE_C012', name:'방호약화', kind:'debuff', turns:3, stack:false,
    desc:'갑각이나 방호층의 약점이 드러난다.', text:'{t}의 방호면에 작은 틈이 벌어진다.', stat:{def:0.88}
  },
  {
    id:'SE_C013', name:'방호', kind:'buff', turns:3, stack:false,
    desc:'얇은 방호층이 충격을 나눈다.', text:'{t}의 앞에 얇은 막이 겹친다.', stat:{def:1.15}
  },
  {
    id:'SE_C014', name:'견고', kind:'buff', turns:3, stack:false,
    desc:'자세를 고정해 충격을 버틴다.', text:'{t}의 두 발이 바닥을 단단히 딛는다.', stat:{def:1.2}
  },
  {
    id:'SE_C015', name:'기민', kind:'buff', turns:3, stack:false,
    desc:'짧은 시간 발을 빠르게 뗀다.', text:'{t}의 발걸음 간격이 짧아진다.', stat:{speed:1.15}
  },
  {
    id:'SE_C016', name:'집중', kind:'buff', turns:3, stack:false,
    desc:'주변 자극을 줄여 명중을 보조한다.', text:'{t}의 시선이 한 지점에 머문다.', stat:{acc:1.15}
  },
  {
    id:'SE_C017', name:'안정', kind:'buff', turns:3, stack:false,
    desc:'떨림을 줄여 동작을 일정하게 한다.', text:'{t}의 떨리던 손이 잦아든다.', stat:{acc:1.08}
  },
  {
    id:'SE_C018', name:'완충', kind:'buff', turns:3, stack:false,
    desc:'가까운 충격을 분산한다.', text:'{t}의 옷자락을 따라 완충층이 접힌다.', stat:{def:1.12}
  },
  {
    id:'SE_C019', name:'회복보조', kind:'buff', turns:3, stack:false,
    desc:'처치 뒤 얕은 손상의 회복을 보조한다.', text:'{t}의 호흡이 조금 고르게 돌아온다.', stat:{regen:1.1}
  },
  {
    id:'SE_C020', name:'절연', kind:'buff', turns:3, stack:false,
    desc:'전류가 흐르는 경로를 제한한다.', text:'{t}의 장비 바깥으로 전류가 우회한다.', stat:{resist:1.15}, el:'EL_C03'
  },
  {
    id:'SE_C021', name:'내열', kind:'buff', turns:3, stack:false,
    desc:'표면으로 전해지는 열을 줄인다.', text:'{t}의 방호층 바깥으로 열기가 흩어진다.', stat:{resist:1.15}, el:'EL_C01'
  },
  {
    id:'SE_C022', name:'차광', kind:'buff', turns:3, stack:false,
    desc:'강한 빛의 노출을 줄인다.', text:'{t}의 눈앞으로 옅은 그늘이 드리운다.', stat:{resist:1.12}, el:'EL_C07'
  },
  {
    id:'SE_C023', name:'정온', kind:'buff', turns:3, stack:false,
    desc:'긴장으로 흔들리는 호흡을 가다듬는다.', text:'{t}의 어깨에서 힘이 조금 빠진다.', stat:{mind:1.12}
  },
  {
    id:'SE_C024', name:'연결', kind:'buff', turns:3, stack:false,
    desc:'동료의 신호를 읽기 쉽게 유지한다.', text:'{t}의 신호기가 같은 박자로 깜박인다.', stat:{sense:1.1}
  },
  {
    id:'SE_C025', name:'정렬', kind:'buff', turns:3, stack:false,
    desc:'작업면의 어긋남을 줄인다.', text:'{t}의 손 아래에서 작업면이 나란해진다.', stat:{acc:1.1}
  },
  {
    id:'SE_C026', name:'보존', kind:'buff', turns:3, stack:false,
    desc:'잔류 마력과 수분의 손실을 늦춘다.', text:'{t}의 밀봉면에 얇은 막이 남는다.', stat:{resist:1.08}
  },
  {
    id:'SE_C027', name:'엄폐', kind:'buff', turns:3, stack:false,
    desc:'얕은 차폐물 뒤에서 노출을 줄인다.', text:'{t}의 몸이 차폐면 뒤로 들어간다.', stat:{evade:1.12}
  },
  {
    id:'SE_C028', name:'지탱', kind:'buff', turns:3, stack:false,
    desc:'체중과 하중을 여러 지점에 나눈다.', text:'{t}의 하중이 지지점으로 나뉜다.', stat:{def:1.1}
  }
]);
