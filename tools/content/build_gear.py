#!/usr/bin/env python3
"""tools/content/build_gear.py — 장비 원고(src/gear_*.txt)를 game/data/content/k_gear.js 로 만든다. build.py 가 부른다.
원고는 이름 · 설명 · 속성만 담고, 수치(성능 · 값 · 칸)는 갈래 머리 + 등급으로 채운다.

원고 형식
  @W 갈래 | 영문 | 칸(WEAPON · SUB) | 손 1·2 | 거리 melee·near·far | 공격 종류 AK_… | 성능 atk=3,acc=1 | 별칭들(클래스 무기 이름과 잇는다)
  @A 갈래 | 영문 | 별칭들                       (방어구. 성능은 ARMOR 표)
  @C 갈래 | 영문 | 칸(EAR · NECK · HAND · SPECIAL) | 성능 | 별칭들   (장신구 · 성물)
  물건 줄: 등급 | 이름 | 설명 [| 토큰]      방어구는 '등급 칸글자' — 상 · 하 · 벌
  토큰: el:EL_FIRE  se:SE_BURN@0.2  resist:EL_FIRE  atk=1 같은 성능 덧셈
"""
import re, os, glob

ROOT = os.path.dirname(os.path.abspath(__file__))
GRADE = {1: 'IG_1', 2: 'IG_2', 3: 'IG_3', 4: 'IG_4', 5: 'IG_5', 6: 'IG_6'}
MUL = {1: 1, 2: 1.5, 3: 2.2, 4: 3, 5: 4, 6: 5.5}
PRICE = {1: 150000, 2: 600000, 3: 3000000, 4: 15000000, 5: 80000000, 6: None}
SLOTW = {'WEAPON': 'SLOT_WEAPON', 'SUB': 'SLOT_SUB', 'EAR': 'SLOT_EAR', 'NECK': 'SLOT_NECK', 'HAND': 'SLOT_HAND', 'SPECIAL': 'SLOT_SPECIAL'}
ARMOR = {'경갑': 'def=2,eva=2', '가죽갑': 'def=2,eva=1,res=1', '중갑': 'def=4,spd=-1', '전신갑': 'def=5,res=1,spd=-2', '방검복': 'def=3',
         '로브': 'res=3,mag=1', '코트': 'def=2,res=1', '작업복': 'def=1,res=2', '위장복': 'def=1,eva=3', '방호복': 'def=1,res=3'}
ASLOT = {'상': 'SLOT_TOP', '하': 'SLOT_BOTTOM', '벌': 'SLOT_TOP'}
APRICE = {'상': 0.6, '하': 0.4, '벌': 1.0}


def stats(s):
    o = {}
    for p in [x for x in (s or '').split(',') if x.strip()]:
        k, v = p.split('='); o[k.strip()] = int(v)
    return o


def scale(base, n):
    return {k: (round(v * MUL[n]) if v > 0 else v) for k, v in base.items()}


def build():
    types, items = [], []
    for path in sorted(glob.glob(os.path.join(ROOT, 'src', 'gear_*.txt'))):
        cur = None
        for raw in open(path, encoding='utf-8'):
            line = raw.strip()
            if not line or line.startswith('//'): continue
            if line.startswith('@'):
                kind, rest = line[1], line[2:].strip()
                h = [x.strip() for x in rest.split('|')]
                ti = len(types) + 1
                if kind == 'W':
                    name, en, slot, hands, rng, ak, st, al = h
                    cur = {'id': f'GTY_K{ti:02d}', 'name': name, 'en': en, 'group': 'weapon' if slot == 'WEAPON' else 'sub', 'slot': SLOTW[slot], 'hands': int(hands),
                           'range': rng, 'kind2': ak, 'base': stats(st), 'alias': [a.strip() for a in al.split(',')],
                           'cat': 'ITC_WEAPON' if slot == 'WEAPON' else ('ITC_ACCESSORY' if ak == 'AK_SPECIAL' else 'ITC_ARMOR')}
                elif kind == 'A':
                    name, en, al = h
                    cur = {'id': f'GTY_K{ti:02d}', 'name': name, 'en': en, 'group': 'armor', 'slot': 'SLOT_TOP', 'base': stats(ARMOR[name]),
                           'alias': [a.strip() for a in al.split(',')], 'cat': 'ITC_ARMOR'}
                else:
                    name, en, slot, st, al = h
                    cur = {'id': f'GTY_K{ti:02d}', 'name': name, 'en': en, 'group': 'special' if slot == 'SPECIAL' else 'acc', 'slot': SLOTW[slot], 'base': stats(st),
                           'alias': [a.strip() for a in al.split(',')], 'cat': 'ITC_ACCESSORY'}
                types.append(cur); continue
            p = [x.strip() for x in line.split('|')]
            g, name, desc = p[0], p[1], p[2]
            tok = p[3].split() if len(p) > 3 else []
            n, part = (int(g.split()[0]), g.split()[1] if ' ' in g else None)
            st = scale(cur['base'], n)
            it = {'id': f'IT_K{len(items) + 1:04d}', 'name': name, 'en': None, 'cat': cur['cat'], 'grade': GRADE[n], 'rarity': min(n, 5), 'slot': cur['slot'],
                  'gtype': cur['id'], 'desc': desc}
            if cur['group'] in ('weapon', 'sub'):
                it['wtype'] = cur['name']; it['range'] = cur['range']; it['kind2'] = cur['kind2']; it['hands'] = cur['hands']
                if cur['hands'] == 2 and cur['slot'] == 'SLOT_WEAPON': it['twoHand'] = True
                price = PRICE[n]
            elif cur['group'] == 'armor':
                it['atype'] = cur['name']; it['slot'] = ASLOT[part]; it['part'] = part
                if part == '벌': it['onePiece'] = True
                else: st = {k: (round(v * (0.65 if part == '상' else 0.45)) or (1 if v > 0 else v)) for k, v in st.items()}
                price = PRICE[n] and round(PRICE[n] * APRICE[part] / 10000) * 10000
            else:
                it['atype'] = cur['name']
                if cur['group'] == 'special': it['special'] = True
                price = PRICE[n] and round(PRICE[n] * 0.7 / 10000) * 10000
            se, res = [], []
            for t in tok:
                if t.startswith('el:'): it['el'] = t[3:]
                elif t.startswith('se:'):
                    s, c = t[3:].split('@'); se.append({'se': s, 'chance': float(c)})
                elif t.startswith('resist:'): res.append(t[7:])
                elif '=' in t:
                    k, v = t.split('='); st[k] = st.get(k, 0) + int(v)
            it['stat'] = {k: v for k, v in st.items() if v}
            if se: it['se'] = se
            if res: it['resist'] = res
            it['price'] = price
            it['tags'] = [cur['name']]
            it['src'] = 'claude'
            items.append(it)
    alias = {}
    for t in types:
        for a in [t['name']] + t['alias']: alias.setdefault(a, t)
    return types, items, alias
