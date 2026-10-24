@echo off
rem 콘텐츠 채우기 도구 줄임 (docs/FILL.md) — 예: fill list · fill order story --n 40 · fill check 파일 · fill apply 파일
node "%~dp0tools\fill\fill.js" %*
