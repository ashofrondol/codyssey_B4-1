/* ================================================================
   main.js — 진입점 / 초기화 (가장 마지막에 로드)
   각 기능 모듈(Theme, Menu, Scroll, ...)은 별도 파일에 정의되어
   있고, 같은 전역 스코프를 공유합니다. 이 파일은 DOM 이 준비되면
   각 모듈의 init() 을 호출해 전체를 가동하는 오케스트레이터입니다.

   로드 순서(index.html): config → 기능 모듈들 → main(이 파일)
   기능 간 상호 호출은 모두 런타임(init/이벤트 핸들러)에서 일어나므로
   기능 파일들 사이의 순서는 상관없고, main 만 마지막이면 됩니다.

   이 파일이 하는 일은 단 두 가지입니다.
     1) DOM 이 다 만들어진 뒤(DOMContentLoaded) 한 번만 실행 보장
     2) 공통 셋업(연도 표시·reveal 클래스 부여) 후 각 모듈 init() 순차 호출
   ================================================================ */

'use strict'; // 엄격 모드: 선언 안 한 변수 사용 등 흔한 실수를 에러로 잡아줌

// ── 진입점: HTML 파싱이 끝나 DOM 이 준비되면 단 1회 실행 ──
document.addEventListener('DOMContentLoaded', () => { // 요소들이 모두 생긴 시점이라 $()로 안전하게 찾을 수 있음
  // 현재 연도
  $('#year').textContent = new Date().getFullYear();  // 푸터의 #year 자리에 올해 연도를 넣음(매년 수동 수정 불필요)

  // 상단 hero 영역 + about + skills + projects + contact 에 reveal 클래스 부여
  ['#about', '#skills', '#projects', '#contact', '.hero__inner'].forEach((sel) => { // 스크롤 등장 효과를 줄 섹션 목록을 순회
    const el = $(sel);                                 // 셀렉터로 해당 요소를 찾음(없을 수도 있음)
    if (el) el.classList.add('reveal');                // 있으면 reveal 클래스 부여 → Reveal.init()이 관찰해 등장 처리
  });

  // ── 각 기능 모듈 가동: 모듈 간 의존이 없도록 init 만 차례로 호출 ──
  Theme.init();        // 다크/라이트 테마 토글 + 저장된 테마 복원
  Menu.init();         // 모바일 햄버거 메뉴 열고 닫기
  Scroll.init();       // 부드러운 스크롤 + 맨 위로 가기 버튼
  Typing.init();       // hero 영역 타이핑 애니메이션
  Skills.init();       // 스킬 막대/그래프 표시
  ContactForm.init();  // 문의 폼 검증·전송 로직 연결
  Reveal.init();       // 위에서 부여한 reveal 요소를 화면 진입 시 나타나게
  NavSpy.init();       // 스크롤 위치에 따라 현재 메뉴 활성 표시
  Projects.init();     // GitHub 등에서 프로젝트 목록 불러와 렌더
});
