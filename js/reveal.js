/* ================================================================
   reveal.js — Intersection Observer 기반 스크롤 애니메이션
   .reveal 요소가 화면에 threshold(0.2)만큼 들어오면 .is-visible 를
   추가해 등장시키고, 한 번 보인 요소는 unobserve 합니다.
   동적으로 추가된 카드도 observe() 를 다시 호출해 등록합니다.
   ================================================================ */

'use strict';

const Reveal = {
  observer: null,

  init() {
    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            this.observer.unobserve(entry.target);
          }
        });
      },
      { threshold: CONFIG.REVEAL_THRESHOLD }
    );

    this.observe();
  },

  observe() {
    $$('.reveal').forEach((el) => {
      if (!el.classList.contains('is-visible')) {
        this.observer.observe(el);
      }
    });
  },
};
