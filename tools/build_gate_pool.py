#!/usr/bin/env python3
"""게이트 장소 전달본(HunterLife_GateContent_200k) → 게임 데이터

사용: python3 tools/build_gate_pool.py <압축 푼 HunterLife_GateContent_200k 폴더>
      (먼저 tools/build_regions.py 로 art_src/regions/sgg_map.json 을 만들어 둔다)

출력
  game/data/gate_pool.js       — 목록 색인 (항상 불러옴): gatePlacePool(게임 지역별 장소 수 · 파일)
  game/data/pool/pl_<지도키>.js — 시도별 장소 목록 (필요할 때 불러옴)
(전달본의 게이트명은 쓰지 않는다 — 사용자 결정 2026-10-23)
- 장소는 표시명에서 게임 지역 이름 부분을 뗀 나머지를 저장 (예: '경기 성남시 분당구 구미동 OO' → '분당구 구미동 OO'. 화면에서 지역 이름을 앞에 붙인다)
- 목록은 줄바꿈으로 이은 문자열 하나 (poolPut(ID, 문자열)). 게임에서 처음 쓸 때 나눈다
"""
import json, os, re, sys
from collections import defaultdict

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DATA = os.path.join(ROOT, 'game', 'data')
OUT = os.path.join(DATA, 'gate_pool.js')
POOL = os.path.join(DATA, 'pool')
JUNK = ['업소명없음']  # 원본의 이름 자리표시: 장소로 쓰지 않는다



def js_str(s):
    return json.dumps(s, ensure_ascii=False)


def main(pkg):
    rname = {}
    for f in ('core.js', 'regions_all.js'):
        rname.update(dict(re.findall(r"\{id:'(RG_[A-Z_]+)',\s*name:'([^']+)'", open(os.path.join(DATA, f), encoding='utf-8').read())))
    smap = json.load(open(os.path.join(ROOT, 'art_src/regions/sgg_map.json'), encoding='utf-8'))
    key_of, city_of, map_of = {}, {}, {}
    for m in smap:
        map_of[m['region']] = m['map']; key_of[(m['sido'], m['city'])] = m['region']
        for s in m['sgg']: key_of[(m['sido'], s)] = m['region']; city_of[(m['sido'], s)] = m['city']
    places = defaultdict(list)
    idx = json.load(open(os.path.join(pkg, 'data/locations/index.json'), encoding='utf-8'))
    miss = []
    for e in idx:
        sido, sgg = e['지역'], e['시군구']; norm = sgg.replace(' ', '')
        if sido == '세종특별자치시':  # 세종: 시군구가 비었거나 시 이름 그대로 → 지역 하나
            sgg = norm = '세종특별자치시' if sgg else ''
        rid = key_of.get((sido, norm)) or key_of.get((sido, sgg.split(' ')[0])) or (sido == '세종특별자치시' and 'RG_SJ_SEJONG')
        if not rid: miss.append((sido, sgg)); continue
        city = city_of.get((sido, norm), sgg.split(' ')[0])
        gu = norm[len(city):] if norm.startswith(city) else ''
        for x in json.load(open(os.path.join(pkg, e['파일']), encoding='utf-8')):
            if any(j in x['장소명'] for j in JUNK): continue
            d = x['표시명']
            if sgg:
                k = d.find(' ' + sgg + ' '); assert k >= 0, (sgg, d); rest = d[k + len(sgg) + 2:].strip()
            else:
                rest = d.split(' ', 1)[1].strip()
            if gu and not rest.startswith(gu): rest = gu + ' ' + rest
            assert rest and '\n' not in rest
            places[rid].append(rest)
    assert not miss, ('게임 지역에 대응 못 한 자료', miss)
    os.makedirs(POOL, exist_ok=True)
    for f in os.listdir(POOL): os.remove(os.path.join(POOL, f))
    by_map, rows, total = defaultdict(list), [], 0
    for rid in sorted(places, key=lambda r: (map_of[r], r)):
        L = list(dict.fromkeys(places[rid]))  # 같은 지역 안 같은 표시 이름은 하나만
        pid = 'GPP_' + rid[3:]; total += len(L)
        by_map[map_of[rid]].append(f"poolPut('{pid}',{js_str(chr(10).join(L))});")
        rows.append(f"  {{id:'{pid}', region:'{rid}', n:{len(L)}, file:'pool/pl_{map_of[rid]}.js'}}")
    no_place = sorted(set(rname) - set(places))
    for k, lines in by_map.items():
        open(os.path.join(POOL, f'pl_{k}.js'), 'w', encoding='utf-8').write('/* 자동 생성 (tools/build_gate_pool.py) */\n' + '\n'.join(lines) + '\n')
    open(OUT, 'w', encoding='utf-8').write('\n'.join([
        '/* gate_pool.js — 자동 생성 (tools/build_gate_pool.py). 직접 고치지 말 것',
        '   게이트 장소 · 이름 후보의 색인. 실제 목록은 data/pool/*.js 에 나뉘어 있고, 게임이 시작되면 뒤에서 차례로 불러온다 (poolLoad)',
        '   장소: 주소기반산업지원서비스 건물DB(2026-09) · 소상공인시장진흥공단 상가정보(2026-06-30)에서 추린 실제 장소 (현재 존속 여부 미확인)',
        '   (뒤에 붙이던 게이트명 20만 개는 쓰지 않기로 함 2026-10-23 — docs/world/content/gate_names_200k 에 보관) */',
        "def('gatePlacePool', [", ',\n'.join(rows), ']);', '']))
    print(OUT, '장소', total, '·', len(rows), '지역 ·', len(by_map), '파일 · 장소 없는 지역', no_place)


if __name__ == '__main__':
    main(sys.argv[1])
