/* ================================================================
   scroll.js — 스크롤 관련 인터랙션
   - 스크롤 위치에 따라 nav 배경(.is-scrolled)과 스크롤탑 버튼(.is-visible) 토글
   - 스크롤탑 버튼 클릭 → 부드럽게 맨 위로
   - 앵커(#) 링크 클릭 → 해당 섹션으로 smooth scroll
   scroll 이벤트는 자주 발생하므로 requestAnimationFrame 으로 묶어 throttle.
   ================================================================ */

'use strict';

const Scroll = {
  init() {
    const header = $('#header');
    const scrollTopBtn = $('#scrollTop');

    // scroll 이벤트는 자주 호출되므로 requestAnimationFrame로 묶음
    let ticking = false;
    window.addEventListener('scroll', () => {
      if (ticking) return;
      window.requestAnimationFrame(() => {
        const y = window.scrollY;
        header.classList.toggle('is-scrolled', y > CONFIG.NAV_SCROLL_THRESHOLD);
        scrollTopBtn.classList.toggle(
          'is-visible',
          y > CONFIG.SCROLL_TOP_THRESHOLD
        );
        ticking = false;
      });
      ticking = true;
    });

    // 스크롤 탑 클릭 → 부드럽게 맨 위로
    scrollTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // 네비 링크 클릭 시 (CSS scroll-behavior로 처리되지만 명시적으로도 동작)
    $$('a[href^="#"]').forEach((link) => {
      link.addEventListener('click', (event) => {
        const href = link.getAttribute('href');
        if (href.length <= 1) return;
        const target = $(href);
        if (!target) return;
        event.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    });
  },
};
