/* ================================================================
   main.js — 진입점 / 초기화 (가장 마지막에 로드)
   각 기능 모듈(Theme, Menu, Scroll, ...)은 별도 파일에 정의되어
   있고, 같은 전역 스코프를 공유합니다. 이 파일은 DOM 이 준비되면
   각 모듈의 init() 을 호출해 전체를 가동하는 오케스트레이터입니다.

   로드 순서(index.html): config → 기능 모듈들 → main(이 파일)
   기능 간 상호 호출은 모두 런타임(init/이벤트 핸들러)에서 일어나므로
   기능 파일들 사이의 순서는 상관없고, main 만 마지막이면 됩니다.
   ================================================================ */

'use strict';

document.addEventListener('DOMContentLoaded', () => {
  // 현재 연도
  $('#year').textContent = new Date().getFullYear();

  // 상단 hero 영역 + about + skills + projects + contact 에 reveal 클래스 부여
  ['#about', '#skills', '#projects', '#contact', '.hero__inner'].forEach((sel) => {
    const el = $(sel);
    if (el) el.classList.add('reveal');
  });

  Theme.init();
  Menu.init();
  Scroll.init();
  Typing.init();
  Skills.init();
  ContactForm.init();
  Reveal.init();
  NavSpy.init();
  Projects.init();
});
