/* ================================================================
   skills.js — Skills 목록 동적 렌더
   data 배열을 map + 템플릿 리터럴로 카드 HTML 로 변환해
   #skills-list 에 주입합니다.
   ================================================================ */

'use strict';

const Skills = {
  data: [
    { name: 'HTML5',      icon: 'fa-brands fa-html5' },
    { name: 'CSS3',       icon: 'fa-brands fa-css3-alt' },
    { name: 'JavaScript', icon: 'fa-brands fa-js' },
    { name: 'Git',        icon: 'fa-brands fa-git-alt' },
    { name: 'GitHub',     icon: 'fa-brands fa-github' },
    { name: 'Figma',      icon: 'fa-brands fa-figma' },
    { name: 'Linux',      icon: 'fa-brands fa-linux' },
    { name: 'Python',     icon: 'fa-brands fa-python' },
  ],

  init() {
    const list = $('#skills-list');
    if (!list) return;

    // 배열 메서드 map + 템플릿 리터럴로 HTML 생성
    list.innerHTML = this.data
      .map(
        ({ name, icon }) => `
        <li class="skill reveal">
          <div class="skill__icon"><i class="${icon}" aria-hidden="true"></i></div>
          <div class="skill__name">${name}</div>
        </li>`
      )
      .join('');
  },
};
