/* ================================================================
   menu.js — 햄버거 메뉴 (모바일)
   햄버거 클릭 시 #navMenu 에 classList.toggle('is-open') 으로
   메뉴를 표시/숨김. aria-expanded/aria-label 도 함께 갱신하고,
   메뉴 링크를 누르면 자동으로 닫힙니다.
   ================================================================ */

'use strict';

const Menu = {
  init() {
    const btn = $('#hamburger');
    const menu = $('#navMenu');

    btn.addEventListener('click', () => {
      const isOpen = menu.classList.toggle('is-open');
      btn.classList.toggle('is-open', isOpen);
      btn.setAttribute('aria-expanded', String(isOpen));
      btn.setAttribute('aria-label', isOpen ? '메뉴 닫기' : '메뉴 열기');
    });

    // 메뉴 링크 클릭 시 자동으로 닫기
    $$('.nav__link').forEach((link) => {
      link.addEventListener('click', () => {
        if (menu.classList.contains('is-open')) {
          menu.classList.remove('is-open');
          btn.classList.remove('is-open');
          btn.setAttribute('aria-expanded', 'false');
        }
      });
    });
  },
};
