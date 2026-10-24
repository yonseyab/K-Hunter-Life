# fill — 콘텐츠 채우기 작업 폴더

- `orders/` 주문서 (사람 · AI 에게 그대로 준다). 새로 뽑기: `node tools/fill/fill.js order <종류> --n 30`
- `done/` 게임에 넣은 답 파일 원본 (묶음 번호_종류.md)
- 받은 답 파일은 아무 데나 두고 `node tools/fill/fill.js check <파일>` → `apply <파일>`

사용법 전체: [docs/FILL.md](../docs/FILL.md)
