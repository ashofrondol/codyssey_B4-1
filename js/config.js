/* ================================================================
   config.js — 공용 설정 & 유틸리티 (가장 먼저 로드)
   - CONFIG     : README에 명시되는 임계값/키 등 설정 상수
   - $, $$      : querySelector / querySelectorAll 래퍼
   - escapeHtml : innerHTML 삽입 전 XSS 방지용 이스케이프

   여러 기능 파일이 이 값들을 공유합니다. 모든 스크립트는 classic
   <script defer> 로 로드되어 같은 전역 스코프를 공유하므로,
   이 파일을 가장 먼저 연결하면 다른 파일에서 그대로 참조할 수 있습니다.
   ================================================================ */

'use strict'; // 엄격 모드: 흔한 실수를 에러로 잡아줌

/* ----- 설정값 (README에 명시되는 임계값) ----- */
const CONFIG = { // 사이트 전역에서 공유하는 설정 상수 모음(여러 js 파일이 참조)
  // GitHub API 호출에 사용할 본인 계정명(username) — 표시 이름이 아니라 GitHub 핸들
  GITHUB_USERNAME: 'ashofrondol',
  // Contact 폼 전송 엔드포인트(Formspree).
  //   formspree.io 가입 → New form → 받은 endpoint 의 폼 ID 로 YOUR_FORM_ID 만 교체.
  //   예) 'https://formspree.io/f/abcdwxyz'
  //   ※ 이 폼 ID 는 공개돼도 안전합니다(서버 비밀키 아님). 미설정 시 데모 모드로 동작.
  CONTACT_ENDPOINT: 'https://formspree.io/f/xykarqqq',
  // 스크롤 탑 버튼이 나타나는 기준 (px)
  SCROLL_TOP_THRESHOLD: 300,
  // 네비 배경이 바뀌는 기준 (px)
  NAV_SCROLL_THRESHOLD: 60,
  // Intersection Observer threshold
  REVEAL_THRESHOLD: 0.2,
  // 로컬스토리지 key
  STORAGE_KEY_THEME: 'portfolio-theme',
};

/* ----- 셀렉터 유틸 ----- */
// $  : 조건에 맞는 '첫' 요소 1개 반환 (document.querySelector 의 짧은 별칭, root 로 탐색 범위 지정 가능)
const $ = (sel, root = document) => root.querySelector(sel);
// $$ : 조건에 맞는 '모든' 요소를 진짜 배열로 반환 (NodeList → Array, 그래서 forEach/map 사용이 편함)
const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

/* ----- HTML escape (XSS 방지) ----- */
// 사용자 입력 등을 innerHTML 로 넣기 전, 특수문자를 안전한 엔티티로 바꿔 스크립트 주입을 막음
function escapeHtml(str) {
  return String(str)             // 문자열이 아닐 수도 있으니 먼저 문자열로 강제 변환
    .replace(/&/g, '&amp;')      // & → &amp;  (반드시 가장 먼저! 뒤 엔티티의 & 가 다시 안 바뀌도록)
    .replace(/</g, '&lt;')       // < → &lt;   (태그 시작 차단)
    .replace(/>/g, '&gt;')       // > → &gt;   (태그 끝 차단)
    .replace(/"/g, '&quot;')     // " → &quot; (속성값 따옴표 깨짐 방지)
    .replace(/'/g, '&#039;');    // ' → &#039; (속성값 따옴표 깨짐 방지)
}
