/* ================================================================
   skills.js — Skills 목록 동적 렌더
   data 배열을 map + 템플릿 리터럴로 카드 HTML 로 변환해
   #skills-list 에 주입합니다.
   ※ HTML 에 카드를 직접 적지 않고 데이터(배열)로 관리하므로,
     기술을 추가/삭제하려면 아래 data 배열만 고치면 됩니다(마크업 중복 X).
   ================================================================ */

'use strict'; // 엄격 모드: 선언 안 한 변수 사용 등 흔한 실수를 에러로 잡아줌

const Skills = {                                          // 스킬 목록 렌더 기능 전체를 담는 단일 객체(모듈처럼 사용)
  // ── 데이터: 화면에 뿌릴 기술 목록(이름 + 아이콘 클래스) ──
  data: [
    { name: 'HTML5',      icon: 'fa-brands fa-html5' },   // 각 항목은 표시 이름과 Font Awesome 아이콘 클래스 한 쌍
    { name: 'CSS3',       icon: 'fa-brands fa-css3-alt' },
    { name: 'JavaScript', icon: 'fa-brands fa-js' },
    { name: 'Git',        icon: 'fa-brands fa-git-alt' },
    { name: 'GitHub',     icon: 'fa-brands fa-github' },
    { name: 'Figma',      icon: 'fa-brands fa-figma' },
    { name: 'Linux',      icon: 'fa-brands fa-linux' },
    { name: 'Python',     icon: 'fa-brands fa-python' },  // 항목을 늘리려면 이 배열에 같은 형태로 추가만 하면 됨
  ],

  // ── 초기화: main.js 의 DOMContentLoaded 시점에 1회 호출 ──
  init() {
    const list = $('#skills-list');                       // 카드를 채워 넣을 목록 컨테이너(<ul>) 찾기
    if (!list) return;                                    // 이 페이지에 목록이 없으면 즉시 종료(방어 코드)

    // 배열 메서드 map + 템플릿 리터럴로 HTML 생성
    list.innerHTML = this.data                            // data 배열 → HTML 문자열로 바꿔 한 번에 주입
      .map(                                               // 각 항목을 <li> 카드 마크업으로 변환(name·icon 만 구조 분해)
        ({ name, icon }) => `
        <li class="skill reveal">
          <div class="skill__icon"><i class="${icon}" aria-hidden="true"></i></div>
          <div class="skill__name">${name}</div>
        </li>`
      )
      .join('');                                          // 변환된 <li> 문자열들을 이어 붙여 최종 HTML 완성
  },
};
