/* ================================================================
   navspy.js — 네비게이션 active 상태 (스크롤 스파이)
   각 섹션을 Intersection Observer 로 관찰하다가, 화면 중앙에
   들어온 섹션에 해당하는 네비 링크에 .is-active 를 부여합니다.
   ================================================================ */

'use strict';

const NavSpy = {
  init() {
    const sections = $$('main section[id]');
    const links = $$('.nav__link');

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.id;
            links.forEach((link) => {
              link.classList.toggle(
                'is-active',
                link.getAttribute('href') === `#${id}`
              );
            });
          }
        });
      },
      { rootMargin: '-40% 0px -55% 0px' }
    );

    sections.forEach((s) => observer.observe(s));
  },
};
