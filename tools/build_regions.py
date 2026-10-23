#!/usr/bin/env python3
"""tools/build_regions.py — 전국 시군구를 게임 지역으로 만든다.

사용: python3 tools/build_regions.py <HangJeongDong_verYYYYMMDD.geojson>
      (vuski/admdongkor 의 행정동 경계, CC BY 4.0. 저장소에는 넣지 않는다: 34MB)

게임 지역 단위 = 시 · 군 · 자치구. 일반구가 있는 시(수원시 장안구 …)는 시 하나로 묶는다 (기존 '경기 성남시'와 같은 방식).
출력
  game/data/regions_all.js            — core.js 에 없는 지역 (id · name · gateDensity · geo · prov)
  art_src/regions/sgg_map.json             — 게임 지역 ↔ (시도, 시군구) 대응 (tools/build_gate_pool.py 가 씀)
  art_src/maps/assets/maps/MAP_<KEY>.json · MAP_<KEY>_mask.png — 하위 지도가 없던 시도 (경계로 직접 그림, 그림 파일 없음)
그다음 python3 tools/build_maps.py 로 maps.js 를 다시 만든다.
"""
import json, math, os, re, sys
from collections import OrderedDict
from PIL import Image, ImageDraw
import numpy as np

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
MAPS = os.path.join(ROOT, 'art_src/maps/assets/maps')
OUT_JS = os.path.join(ROOT, 'game/data/regions_all.js')
OUT_MAP = os.path.join(ROOT, 'art_src/regions/sgg_map.json')
METRO = {'서울특별시', '부산광역시', '대구광역시', '인천광역시', '대전광역시', '울산광역시'}
# 시도 → (ID 코드, 짧은 이름, 지도 키)
PROV = {'서울특별시': ('SEOUL', '서울', 'SEOUL'), '부산광역시': ('BS', '부산', 'BUSAN'), '대구광역시': ('DG', '대구', 'DAEGU'),
        '인천광역시': ('IC', '인천', 'INCHEON'), '대전광역시': ('DJ', '대전', 'DAEJEON'), '울산광역시': ('US', '울산', 'ULSAN'),
        '세종특별자치시': ('SJ', '세종', 'SEJONG'), '경기도': ('GG', '경기', 'GYEONGGI'), '강원특별자치도': ('GW', '강원', 'GANGWON'),
        '충청북도': ('CB', '충북', 'CHUNGBUK'), '충청남도': ('CN', '충남', 'CHUNGNAM'), '전북특별자치도': ('JB', '전북', 'JEONBUK'),
        '경상북도': ('GB', '경북', 'GYEONGBUK'), '경상남도': ('GN', '경남', 'GYEONGNAM'), '제주특별자치도': ('JJ', '제주', 'JEJU')}
GJ_GU = {'동구', '서구', '남구', '북구', '광산구'}  # 전남광주통합특별시 안의 광주 자치구 (게임은 광주 · 전남을 따로 둔다)
# INCHEON: 2026 행정개편(중 · 동 · 서구 → 제물포 · 영종 · 서해 · 검단구)으로 예전 외주 지도와 경계가 달라 다시 그린다
NEW_MAPS = ['INCHEON', 'DAEGU', 'DAEJEON', 'ULSAN', 'SEJONG', 'CHUNGBUK', 'CHUNGNAM', 'JEONBUK', 'JEONNAM', 'GYEONGBUK', 'GYEONGNAM']
TITLE = {'INCHEON': '인천광역시', 'DAEGU': '대구광역시', 'DAEJEON': '대전광역시', 'ULSAN': '울산광역시', 'SEJONG': '세종특별자치시', 'CHUNGBUK': '충청북도', 'CHUNGNAM': '충청남도',
         'JEONBUK': '전북특별자치도', 'JEONNAM': '전라남도', 'GYEONGBUK': '경상북도', 'GYEONGNAM': '경상남도'}

# ---- 로마자 (ID 용, 국어의 로마자 표기법 간이판) ----
CHO = ['G', 'KK', 'N', 'D', 'TT', 'R', 'M', 'B', 'PP', 'S', 'SS', '', 'J', 'JJ', 'CH', 'K', 'T', 'P', 'H']
JUNG = ['A', 'AE', 'YA', 'YAE', 'EO', 'E', 'YEO', 'YE', 'O', 'WA', 'WAE', 'OE', 'YO', 'U', 'WO', 'WE', 'WI', 'YU', 'EU', 'UI', 'I']
JONG = ['', 'K', 'K', 'K', 'N', 'N', 'N', 'T', 'L', 'K', 'M', 'L', 'L', 'L', 'P', 'L', 'M', 'P', 'P', 'T', 'T', 'NG', 'T', 'T', 'K', 'T', 'P', 'T']
JONG_V = {1: 'G', 7: 'D', 8: 'R', 17: 'B', 19: 'S', 22: 'J'}  # 다음 글자가 모음으로 시작할 때


def roman(s):
    out, syl = [], [ord(c) - 0xAC00 for c in s if 0xAC00 <= ord(c) <= 0xD7A3]
    for i, v in enumerate(syl):
        cho, jung, jong = v // 588, (v % 588) // 28, v % 28
        c = CHO[cho]
        if i == 0 and c == 'R': c = 'R'
        if i > 0 and cho == 5 and syl[i - 1] % 28 in (4, 8): c = 'L'   # ㄴ/ㄹ + ㄹ → ll
        out.append(c + JUNG[jung])
        nxt_vowel = i + 1 < len(syl) and syl[i + 1] // 588 == 11
        out.append(JONG_V.get(jong, JONG[jong]) if nxt_vowel else JONG[jong])
    return ''.join(out)


def ring_area_centroid(ring):
    a = cx = cy = 0.0
    for (x0, y0), (x1, y1) in zip(ring, ring[1:] + ring[:1]):
        f = x0 * y1 - x1 * y0; a += f; cx += (x0 + x1) * f; cy += (y0 + y1) * f
    if abs(a) < 1e-12: return 0, ring[0][0], ring[0][1]
    return a / 2, cx / (3 * a), cy / (3 * a)


def polys(geom):
    if geom['type'] == 'Polygon': return [geom['coordinates']]
    return geom['coordinates']


def main(src):
    feats = json.load(open(src, encoding='utf-8'))['features']
    core = open(os.path.join(ROOT, 'game/data/core.js'), encoding='utf-8').read()
    have = dict(re.findall(r"\{id:'(RG_[A-Z_]+)',\s*name:'([^']+)'", core))
    labels = {}
    for f in os.listdir(MAPS):
        if f.endswith('.json'):
            m = json.load(open(os.path.join(MAPS, f), encoding='utf-8'))
            if m['map'] != 'KR' and m['map'] not in NEW_MAPS:
                for a in m['areas']: labels[(m['map'], a['name'])] = a['id']
    groups = OrderedDict()
    for ft in feats:
        p = ft['properties']; sido, sgg = p['sidonm'], p['sggnm']
        if sido == '전남광주통합특별시': code, short, key = ('GJ', '광주', 'GWANGJU') if sgg in GJ_GU else ('JN', '전남', 'JEONNAM')
        else: code, short, key = PROV[sido]
        m = re.match(r'^(\S+?시)(\S+구)$', sgg)
        city = m.group(1) if m else sgg
        g = groups.setdefault((key, city), {'sido': sido, 'code': code, 'short': short, 'key': key, 'name': city, 'sgg': set(), 'dong': 0, 'polys': []})
        g['sgg'].add(sgg); g['dong'] += 1; g['polys'] += polys(ft['geometry'])
    rows, smap, used = [], [], set()
    for (key, city), g in groups.items():
        A = X = Y = 0.0
        for poly in g['polys']:
            a, x, y = ring_area_centroid([tuple(c) for c in poly[0]]); a = abs(a); A += a; X += x * a; Y += y * a
        g['geo'] = [round(X / A, 3), round(Y / A, 3)]
        rid = labels.get((key, city))
        if not rid:
            base = 'RG_' + g['code'] + '_' + roman(re.sub(r'(시|군|구)$', '', city) or city)
            rid = base
            if rid in used: rid = base + roman(city[-1])
        assert rid not in used and re.match(r'^RG_[A-Z]+_[A-Z]+$', rid), rid
        used.add(rid); g['id'] = rid
        g['gname'] = have.get(rid) or ('세종시' if key == 'SEJONG' else f"{g['short']} {city}")
        dens = 2 if g['sido'] in METRO or g['key'] == 'GWANGJU' else (2 if city.endswith('시') and g['dong'] >= 20 else 1)
        smap.append({'region': rid, 'sido': g['sido'], 'city': city, 'sgg': sorted(g['sgg']), 'map': key})
        if rid not in have:
            rows.append(f"  {{id:'{rid}', name:'{g['gname']}', gateDensity:{dens}, geo:[{g['geo'][0]},{g['geo'][1]}], prov:'{key}'}}")
    lost = [k for k in have if k not in used]
    assert not lost, ('core.js 지역이 경계 자료에 없음', lost)
    assert len(used) < 256, 'sim.js 인구 region 열이 Uint8Array'
    os.makedirs(os.path.dirname(OUT_MAP), exist_ok=True)
    json.dump(smap, open(OUT_MAP, 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
    open(OUT_JS, 'w', encoding='utf-8').write(
        '/* regions_all.js — 자동 생성 (tools/build_regions.py). 직접 고치지 말 것\n'
        '   전국 시 · 군 · 자치구 (일반구는 시로 묶음). core.js 에 있는 지역(직접 정한 값)은 빼고 나머지를 넣는다.\n'
        '   geo: 행정동 경계 면적 중심 [경도, 위도] (vuski/admdongkor 2026-10, CC BY 4.0) · gateDensity: 광역시 구 · 큰 시 2, 그 밖 1 [prototype_default] · prov: 시도 지도 키 */\n'
        "def('regions', [\n" + ',\n'.join(rows) + '\n]);\n')
    print(OUT_JS, len(rows), '개 추가 · 전체', len(used))
    # ---- 하위 지도가 없던 시도: 경계로 마스크 그리기 ----
    # 먼 섬 때문에 본토가 작아지지 않게: CLIP 밖 섬은 지도에서 뺀다(지역 자체는 남음). INSET 지역은 통째로 지도 귀퉁이(비율 위치)로 옮겨 그린다
    CLIP = {'INCHEON': (126.3, 127.0, 37.2, 38.0), 'JEONNAM': (125.8, 128.0, 33.9, 35.6)}
    INSET = {('GYEONGBUK', '울릉군'): (0.86, 0.12)}
    for key in NEW_MAPS:
        G = [g for g in groups.values() if g['key'] == key]
        if key in CLIP:
            x0, x1, y0, y1 = CLIP[key]
            for g in G:
                g['polys'] = [poly for poly in g['polys'] if any(x0 <= c[0] <= x1 and y0 <= c[1] <= y1 for c in poly[0])]
                assert g['polys'], g['name']
        ins = [g for g in G if (key, g['name']) in INSET]
        pts = [c for g in G if g not in ins for poly in g['polys'] for c in poly[0]]
        lat0 = sum(c[1] for c in pts) / len(pts); k = math.cos(math.radians(lat0))
        xs = [c[0] * k for c in pts]; ys = [-c[1] for c in pts]
        x0, x1, y0, y1 = min(xs), max(xs), min(ys), max(ys); S = 2048 * 0.88 / max(x1 - x0, y1 - y0)
        ox = (2048 - (x1 - x0) * S) / 2; oy = (2048 - (y1 - y0) * S) / 2
        P = lambda c: (ox + (c[0] * k - x0) * S, oy + (-c[1] - y0) * S)
        for g in ins:  # 귀퉁이로 옮김: 중심이 (fx, fy) 비율 위치에 오게 경위도를 평행 이동
            fx, fy = INSET[(key, g['name'])]; cx, cy = P(g['geo']); dx = (fx * 2048 - cx) / S / k; dy = -(fy * 2048 - cy) / S
            g['polys'] = [[[(c[0] + dx, c[1] + dy) for c in ring] for ring in poly] for poly in g['polys']]; g['draw_geo'] = [g['geo'][0] + dx, g['geo'][1] + dy]
        img = Image.new('RGB', (2048, 2048)); dr = ImageDraw.Draw(img); areas = []
        for i, g in enumerate(G):
            g['col'] = '#%02X%02X%02X' % (40 + (i * 53) % 200, 40 + (i * 97) % 200, 40 + (i * 151) % 200)
            g['area'] = sum(abs(ring_area_centroid([tuple(c) for c in poly[0]])[0]) for poly in g['polys'])
        for g in sorted(G, key=lambda g: -g['area']):  # 큰 지역부터: 안에 둘러싸인 지역(완주군 안 전주시 등)이 위에 그려지게
            for poly in g['polys']:
                dr.polygon([P(c) for c in poly[0]], fill=g['col'])
                for hole in poly[1:]: dr.polygon([P(c) for c in hole], fill='#000000')
        for g in G:
            areas.append({'id': g['id'], 'name': g['name'], 'color': g['col'], 'label': [round(v) for v in P(g.get('draw_geo', g['geo']))]})
        arr = np.asarray(img)
        for a in areas:  # 라벨이 지역 밖이면(오목한 모양) 지역 안 가장 가까운 점으로
            r, gg, b = (int(a['color'][j:j + 2], 16) for j in (1, 3, 5))
            m = (arr[:, :, 0] == r) & (arr[:, :, 1] == gg) & (arr[:, :, 2] == b)
            assert m.any(), a['id']
            x, y = a['label']
            if not (0 <= x < 2048 and 0 <= y < 2048 and m[y, x]):
                yy, xx = np.nonzero(m); j = np.argmin((xx - x) ** 2 + (yy - y) ** 2); a['label'] = [int(xx[j]), int(yy[j])]
        img.save(os.path.join(MAPS, f'MAP_{key}_mask.png'), optimize=True)
        json.dump({'map': key, 'size': [2048, 2048], 'generated': True, 'areas': areas}, open(os.path.join(MAPS, f'MAP_{key}.json'), 'w', encoding='utf-8'), ensure_ascii=False)
        print(key, len(areas), '지역')


if __name__ == '__main__':
    main(sys.argv[1])
