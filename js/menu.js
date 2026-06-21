/* ================================================================
   menu.js — 햄버거 메뉴 (모바일)
   햄버거 클릭 시 #navMenu 에 classList.toggle('is-open') 으로
   메뉴를 표시/숨김. aria-expanded/aria-label 도 함께 갱신하고,
   메뉴 링크를 누르면 자동으로 닫힙니다.
   ※ 접근성: 토글 상태를 aria-expanded 로 알리고, aria-label 로
     스크린리더 사용자에게 '열기/닫기' 동작을 안내합니다.
   ================================================================ */

'use strict'; // 엄격 모드: 선언 안 한 변수 사용 등 흔한 실수를 에러로 잡아줌

const Menu = {                                          // 햄버거 메뉴 기능 전체를 담는 단일 객체(모듈처럼 사용)
  // ── 초기화: main.js 의 DOMContentLoaded 시점에 1회 호출 ──
  init() {
    const btn = $('#hamburger');                        // 햄버거 버튼 요소(클릭 대상)
    const menu = $('#navMenu');                          // 펼쳐졌다 닫히는 내비게이션 메뉴 요소

    // ── 햄버거 버튼: 클릭마다 메뉴 열고/닫기 ──
    btn.addEventListener('click', () => {               // 버튼을 누를 때마다
      const isOpen = menu.classList.toggle('is-open');  // 메뉴에 is-open 토글 → 켜졌으면 true 반환(현재 열림 상태)
      btn.classList.toggle('is-open', isOpen);          // 버튼도 같은 상태로 맞춤(아이콘 X↔☰ 전환용)
      btn.setAttribute('aria-expanded', String(isOpen)); // 펼침 여부를 스크린리더에 전달('true'/'false' 문자열)
      btn.setAttribute('aria-label', isOpen ? '메뉴 닫기' : '메뉴 열기'); // 다음에 할 동작을 라벨로 안내
    });

    // ── 메뉴 링크 클릭 시 자동으로 닫기 ──
    $$('.nav__link').forEach((link) => {                // 모든 메뉴 링크를 순회하며 각각에 핸들러 연결
      link.addEventListener('click', () => {            // 메뉴 안의 링크를 누르면(다른 곳으로 이동 시작)
        if (menu.classList.contains('is-open')) {       // 지금 메뉴가 열려 있을 때만(닫혀 있으면 할 일 없음)
          menu.classList.remove('is-open');             // 메뉴 닫기
          btn.classList.remove('is-open');              // 버튼 아이콘도 닫힘 상태로 되돌림
          btn.setAttribute('aria-expanded', 'false');   // 접근성 상태도 '닫힘'으로 갱신
        }
      });
    });
  },
};
