#!/usr/bin/env python3
"""tools/build_maps.py — 외주 지도 에셋(art_src/maps)을 게임용으로 변환한다.

입력 (art_src/maps/assets/maps/):  MAP_<KEY>.png (그림) · MAP_<KEY>_mask.png (색 키 마스크, 정확한 GIS 경계) · MAP_<KEY>.json (지역 · 라벨)
출력:
  art_src/maps/build/MAP_<KEY>.webp     — (게임은 지금 선으로만 그린다. 그림이 필요해지면 사용) 그림을 마스크에 맞춰 정렬(배율 · 위치 자동 맞춤) → 땅만 남기고 → 마스크 경계선을 다시 그린 최종 그림
  game/data/maps.js                — maps(지도) · mapAreas(지역) 테이블. 클릭 판정용 지역 격자(GRID×GRID, 행별 RLE, base64)
그림과 마스크가 조금 어긋나도, 보이는 경계선 · 해안선은 마스크에서 다시 그리므로 클릭 영역과 정확히 맞는다.
실행: python3 tools/build_maps.py
"""
import json, base64, os, re, sys
import numpy as np
from PIL import Image, ImageFilter, ImageDraw

ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), '..'))
SRC = os.path.join(ROOT, 'art_src/maps/assets/maps')
OUT_IMG = os.path.join(ROOT, 'art_src/maps/build')   # 그림 합성본 (게임은 지금 그림 없이 선으로 그린다 — 나중에 쓰면 game/assets/maps 로)
OUT_JS = os.path.join(ROOT, 'game/data/maps.js')
GRID = 512          # 클릭 판정 격자 (2048 → 512, 한 칸 = 4px)
OUT_SIZE = 1600     # 최종 그림 크기
ORDER = ['KR', 'SEOUL', 'GYEONGGI', 'INCHEON', 'BUSAN', 'GWANGJU', 'GANGWON', 'JEJU',
         'DAEGU', 'DAEJEON', 'ULSAN', 'SEJONG', 'CHUNGBUK', 'CHUNGNAM', 'JEONBUK', 'JEONNAM', 'GYEONGBUK', 'GYEONGNAM']  # 뒤 10개: tools/build_regions.py 가 경계로 그린 마스크 (그림 없음)
TITLE = {'KR': '전국', 'SEOUL': '서울특별시', 'GYEONGGI': '경기도', 'INCHEON': '인천광역시', 'BUSAN': '부산광역시', 'GWANGJU': '광주광역시', 'GANGWON': '강원특별자치도', 'JEJU': '제주특별자치도',
         'DAEGU': '대구광역시', 'DAEJEON': '대전광역시', 'ULSAN': '울산광역시', 'SEJONG': '세종특별자치시', 'CHUNGBUK': '충청북도', 'CHUNGNAM': '충청남도',
         'JEONBUK': '전북특별자치도', 'JEONNAM': '전라남도', 'GYEONGBUK': '경상북도', 'GYEONGNAM': '경상남도'}
PROV_TO_MAP = {'RG_P_' + k: 'MAP_' + k for k in ['SEOUL', 'GYEONGGI', 'INCHEON', 'BUSAN', 'GWANGJU', 'GANGWON', 'JEJU', 'DAEGU', 'DAEJEON', 'ULSAN', 'SEJONG', 'CHUNGBUK', 'CHUNGNAM', 'JEONBUK', 'JEONNAM', 'GYEONGBUK', 'GYEONGNAM']}


def game_regions():
    out = set()
    for f in ('core.js', 'regions_all.js'):
        s = open(os.path.join(ROOT, 'game/data', f), encoding='utf-8').read()
        m = re.search(r"def\('regions', \[(.*?)\]\);", s, re.S)
        out |= set(re.findall(r"id:'(RG_[A-Z_]+)'", m.group(1)))
    return out


def hex2rgb(h):
    return tuple(int(h[i:i + 2], 16) for i in (1, 3, 5))


def region_index(mask, areas):
    """마스크(2048² RGB) → 지역 번호(0 = 바깥 · 경계, 1.. = areas 순서)"""
    idx = np.zeros(mask.shape[:2], np.uint8)
    for i, a in enumerate(areas):
        r, g, b = hex2rgb(a['color'])
        idx[(mask[:, :, 0] == r) & (mask[:, :, 1] == g) & (mask[:, :, 2] == b)] = i + 1
    return idx


def fill_borders(idx, it=3):
    """경계선(0) 중 땅 안쪽 픽셀을 이웃 지역으로 채운다 (클릭 틈 없애기). 바깥은 그대로."""
    out = idx.copy()
    for _ in range(it):
        z = out == 0
        if not z.any(): break
        nb = np.zeros_like(out)
        for dy, dx in ((0, 1), (0, -1), (1, 0), (-1, 0)):
            sh = np.roll(np.roll(out, dy, 0), dx, 1)
            nb = np.where((nb == 0) & (sh > 0), sh, nb)
        # 양쪽(가로 또는 세로)이 모두 땅인 경계 픽셀만 채운다 → 해안선 바깥으로 번지지 않게
        horiz = (np.roll(out, 1, 1) > 0) & (np.roll(out, -1, 1) > 0)
        vert = (np.roll(out, 1, 0) > 0) & (np.roll(out, -1, 0) > 0)
        fill = z & (nb > 0) & (horiz | vert)
        out[fill] = nb[fill]
    return out


def downsample(idx, n=GRID):
    s = idx.shape[0] // n
    b = idx.reshape(n, s, n, s).transpose(0, 2, 1, 3).reshape(n, n, s * s)
    out = np.zeros((n, n), np.uint8)
    for k in range(1, int(idx.max()) + 1):
        cnt = (b == k).sum(2)
        better = cnt > (b == out[..., None]).sum(2) * (out > 0)
        out = np.where((cnt > 0) & ((out == 0) | better), k, out)
    return out


def rle_b64(grid):
    """행별 RLE: (값 1바이트, 길이 2바이트) 반복 → base64"""
    buf = bytearray()
    for row in grid:
        v, c = int(row[0]), 0
        for x in row:
            x = int(x)
            if x == v: c += 1
            else:
                buf += bytes([v]) + c.to_bytes(2, 'little'); v, c = x, 1
        buf += bytes([v]) + c.to_bytes(2, 'little')
    return base64.b64encode(bytes(buf)).decode()


def land_of_art(art):
    """그림에서 땅으로 보이는 부분 (배경 남색보다 밝거나 채도 있는 곳)"""
    small = art.resize((512, 512), Image.BILINEAR).filter(ImageFilter.GaussianBlur(3))
    a = np.asarray(small).astype(np.float32)
    lum = a.mean(2)
    return lum > (np.percentile(lum, 35) + 14)


def fit_affine(land_art, land_mask):
    """그림의 땅이 마스크의 땅과 겹치도록 x · y 배율과 이동을 찾는다 (512 좌표)."""
    def stats(m):
        ys, xs = np.nonzero(m); return xs.mean(), ys.mean(), xs.std(), ys.std()
    ax, ay, asx, asy = stats(land_art); mx, my, msx, msy = stats(land_mask)
    sx, sy = msx / asx, msy / asy
    best = None
    yy, xx = np.mgrid[0:512, 0:512]
    for dsx in np.linspace(-0.06, 0.06, 7):
        for dsy in np.linspace(-0.06, 0.06, 7):
            for ox in range(-8, 9, 2):
                for oy in range(-8, 9, 2):
                    SX, SY = sx * (1 + dsx), sy * (1 + dsy)
                    # 마스크 좌표 (x,y) → 그림 좌표
                    srcx = ((xx - mx - ox) / SX + ax).astype(int); srcy = ((yy - my - oy) / SY + ay).astype(int)
                    ok = (srcx >= 0) & (srcx < 512) & (srcy >= 0) & (srcy < 512)
                    warped = np.zeros_like(land_mask); warped[ok] = land_art[srcy[ok], srcx[ok]]
                    iou = (warped & land_mask).sum() / max(1, (warped | land_mask).sum())
                    if best is None or iou > best[0]: best = (iou, SX, SY, mx + ox, my + oy)
    iou, SX, SY, cx, cy = best
    return iou, SX, SY, ax, ay, cx, cy


def compose(key, art, mask_idx, areas):
    land512 = downsample(mask_idx) > 0
    la = land_of_art(art)
    iou, SX, SY, ax, ay, cx, cy = fit_affine(la, land512)
    W = art.size[0]; f = W / 512
    # PIL affine: 출력(마스크) 좌표 → 입력(그림) 좌표.  x_in = (x_out - cx*f)/SX + ax*f
    a = 1 / SX; b = 0; c = ax * f - cx * f / SX
    d = 0; e = 1 / SY; g = ay * f - cy * f / SY
    aligned = art.transform(art.size, Image.AFFINE, (a, b, c, d, e, g), resample=Image.BICUBIC, fillcolor=(12, 18, 26))
    aligned = aligned.resize((2048, 2048), Image.LANCZOS) if aligned.size[0] != 2048 else aligned
    land = mask_idx > 0
    land_full = fill_borders(mask_idx) > 0
    # 바깥: 깨끗한 남색 + 옅은 격자
    bg = Image.new('RGB', (2048, 2048), (11, 17, 25)); dr = ImageDraw.Draw(bg)
    for t in range(0, 2048, 64):
        dr.line([(t, 0), (t, 2047)], fill=(16, 25, 36)); dr.line([(0, t), (2047, t)], fill=(16, 25, 36))
    # 그림에 땅이 없는 곳(그림과 마스크가 어긋난 곳)은 그림의 땅 질감 조각을 깔아 메운다
    al_land = np.asarray(Image.fromarray(land_of_art(aligned).astype(np.uint8) * 255).resize((2048, 2048), Image.NEAREST)) > 0
    holes = land_full & ~al_land
    if holes.any():
        A = np.asarray(aligned); best = None
        for yy in range(0, 2048 - 256, 64):
            for xx in range(0, 2048 - 256, 64):
                v = al_land[yy:yy + 256, xx:xx + 256].mean()
                if best is None or v > best[0]: best = (v, xx, yy)
        _, bx, by = best; patch = A[by:by + 256, bx:bx + 256]
        tex = np.tile(patch, (8, 8, 1))[:2048, :2048]
        hm = Image.fromarray((holes * 255).astype(np.uint8)).filter(ImageFilter.GaussianBlur(3))
        aligned = Image.composite(Image.fromarray(tex), aligned, hm)
    alpha = Image.fromarray((land_full * 255).astype(np.uint8)).filter(ImageFilter.GaussianBlur(1.2))
    img = Image.composite(aligned, bg, alpha)
    # 마스크에서 경계선 다시 그리기: 지역 사이 = 옅은 하늘색, 해안선 = 조금 밝게
    full = fill_borders(mask_idx, 4)
    inner = np.zeros(full.shape, bool); coast = np.zeros(full.shape, bool)
    for dy, dx in ((0, 1), (1, 0)):
        sh = np.roll(np.roll(full, dy, 0), dx, 1)
        diff = full != sh
        inner |= diff & (full > 0) & (sh > 0)
        coast |= diff & ((full > 0) ^ (sh > 0))
    def lines(m, width):
        im = Image.fromarray((m * 255).astype(np.uint8))
        im = im.filter(ImageFilter.MaxFilter(width)) if width > 1 else im
        return im.filter(ImageFilter.GaussianBlur(0.8))
    arr = np.asarray(img).astype(np.float32)
    for m, col, op, w in ((inner, (95, 145, 196), 0.55, 3), (coast, (120, 175, 225), 0.75, 3)):
        al = np.asarray(lines(m, w)).astype(np.float32)[..., None] / 255 * op
        arr = arr * (1 - al) + np.array(col, np.float32) * al
    out = Image.fromarray(arr.clip(0, 255).astype(np.uint8)).resize((OUT_SIZE, OUT_SIZE), Image.LANCZOS)
    out.save(os.path.join(OUT_IMG, f'MAP_{key}.webp'), 'WEBP', quality=84, method=6)
    return iou


def main():
    os.makedirs(OUT_IMG, exist_ok=True)
    regs = game_regions()
    maps, areas_out, report = [], [], []
    for key in ORDER:
        meta = json.load(open(os.path.join(SRC, f'MAP_{key}.json'), encoding='utf-8'))
        areas = meta['areas']
        mask = np.asarray(Image.open(os.path.join(SRC, f'MAP_{key}_mask.png')).convert('RGB'))
        idx = region_index(mask, areas)
        miss = [a['id'] for i, a in enumerate(areas) if not (idx == i + 1).any()]
        if miss: print('지역 없음', key, miss); sys.exit(1)
        grid = downsample(fill_borders(idx))
        art_p = os.path.join(SRC, f'MAP_{key}.png')   # 경계로 그린 지도(build_regions.py)는 그림이 없다
        iou = compose(key, Image.open(art_p).convert('RGB'), idx, areas) if os.path.exists(art_p) else 0
        mid = f'MAP_{key}'
        maps.append({'id': mid, 'name': TITLE[key], 'grid': GRID, 'rle': rle_b64(grid), 'parent': None if key == 'KR' else 'MAP_KR'})
        for i, a in enumerate(areas):
            rid = a['id']; aid = 'MA_' + rid[3:]
            row = {'id': aid, 'map': mid, 'n': i + 1, 'name': a['name'], 'label': [round(a['label'][0] / 2048, 4), round(a['label'][1] / 2048, 4)]}
            if rid in regs: row['region'] = rid
            if rid in PROV_TO_MAP: row['to'] = PROV_TO_MAP[rid]
            areas_out.append(row)
        report.append(f'{key}: 지역 {len(areas)} · 정렬 IoU {iou:.3f} · 게임 지역 {sum(1 for a in areas if a["id"] in regs)}')
    js = ['/* =========================================================',
          '   maps.js — 지도 (자동 생성: python3 tools/build_maps.py · 손으로 고치지 마세요)',
          '   maps     : 지도. grid × grid 지역 격자 (게임은 이 격자로 땅 · 경계선을 직접 그린다)(rle: 행별 [값 1바이트, 길이 2바이트] base64, 값 = mapAreas.n, 0 = 바깥)',
          '   mapAreas : 지도의 지역. region = 게임 지역 ID(있으면 고를 수 있다) · to = 누르면 열리는 하위 지도 · label = 이름 위치(0~1)',
          '   경계 자료: 통계청 SGIS 행정동 경계(공공누리 1유형) → vuski/admdongkor 가공(CC BY 4.0) → 지역 단위 병합 · 정사영 · 래스터화. 그림: ChatGPT image_gen',
          '   ========================================================= */',
          "def('maps', ["]
    for m in maps:
        js.append('  ' + json.dumps(m, ensure_ascii=False) + ',')
    js.append(']);')
    js.append("def('mapAreas', [")
    for a in areas_out:
        js.append('  ' + json.dumps(a, ensure_ascii=False) + ',')
    js.append(']);')
    open(OUT_JS, 'w', encoding='utf-8').write('\n'.join(js) + '\n')
    print('\n'.join(report))
    print('maps.js', os.path.getsize(OUT_JS), 'bytes')


if __name__ == '__main__':
    main()
