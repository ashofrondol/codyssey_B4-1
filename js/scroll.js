/* ================================================================
   scroll.js — 스크롤 관련 인터랙션
   - 스크롤 위치에 따라 nav 배경(.is-scrolled)과 스크롤탑 버튼(.is-visible) 토글
   - 스크롤탑 버튼 클릭 → 부드럽게 맨 위로
   - 앵커(#) 링크 클릭 → 해당 섹션으로 smooth scroll
   scroll 이벤트는 자주 발생하므로 requestAnimationFrame 으로 묶어 throttle.
   ================================================================ */

'use strict'; // 엄격 모드: 선언 안 한 변수 사용 등 흔한 실수를 에러로 잡아줌

const Scroll = {                                          // 스크롤 인터랙션 기능 전체를 담는 단일 객체(모듈처럼 사용)
  // ── 초기화: main.js 의 DOMContentLoaded 시점에 1회 호출 ──
  init() {
    const header = $('#header');                          // 상단 고정 헤더 요소(스크롤 시 배경을 바꿀 대상)
    const scrollTopBtn = $('#scrollTop');                 // '맨 위로' 버튼 요소(스크롤 내려가면 나타남)

    // ── 스크롤 이벤트: rAF 로 throttle 하여 클래스 토글 ──
    // scroll 이벤트는 자주 호출되므로 requestAnimationFrame로 묶음
    let ticking = false;                                  // 이미 다음 프레임 처리가 예약됐는지 표시(중복 실행 방지 플래그)
    window.addEventListener('scroll', () => {             // 페이지가 스크롤될 때마다 실행
      if (ticking) return;                                // 이번 프레임에 이미 예약돼 있으면 추가 작업 건너뜀(throttle)
      window.requestAnimationFrame(() => {                // 다음 화면 그리기 직전에 한 번만 계산(불필요한 연산 줄임)
        const y = window.scrollY;                         // 현재 세로 스크롤 위치(px)
        header.classList.toggle('is-scrolled', y > CONFIG.NAV_SCROLL_THRESHOLD); // 기준치 넘으면 헤더에 배경 클래스 켬
        scrollTopBtn.classList.toggle(                    // '맨 위로' 버튼 표시 클래스 토글
          'is-visible',
          y > CONFIG.SCROLL_TOP_THRESHOLD                 // 기준치보다 많이 내려갔을 때만 버튼을 보이게
        );
        ticking = false;                                  // 처리를 끝냈으니 다시 예약 가능 상태로 되돌림
      });
      ticking = true;                                     // 이번 프레임 처리를 예약했음을 표시
    });

    // ── '맨 위로' 버튼: 클릭 시 부드럽게 최상단 이동 ──
    // 스크롤 탑 클릭 → 부드럽게 맨 위로
    scrollTopBtn.addEventListener('click', () => {        // 버튼을 누르면
      window.scrollTo({ top: 0, behavior: 'smooth' });    // 페이지 맨 위(0)로 부드럽게 스크롤
    });

    // ── 앵커(#) 링크: 해당 섹션으로 smooth scroll ──
    // 네비 링크 클릭 시 (CSS scroll-behavior로 처리되지만 명시적으로도 동작)
    $$('a[href^="#"]').forEach((link) => {                // href 가 '#'으로 시작하는 모든 링크를 순회
      link.addEventListener('click', (event) => {         // 그 링크를 클릭하면
        const href = link.getAttribute('href');           // 링크가 가리키는 대상(예: '#about')을 읽음
        if (href.length <= 1) return;                     // '#' 한 글자뿐이면(대상 없음) 무시
        const target = $(href);                           // 그 id 를 가진 실제 섹션 요소를 찾음
        if (!target) return;                              // 해당 섹션이 없으면 기본 동작에 맡기고 종료(방어 코드)
        event.preventDefault();                           // 브라우저 기본 점프(순간 이동)를 막음 — 부드럽게 이동하려고
        target.scrollIntoView({ behavior: 'smooth', block: 'start' }); // 그 섹션이 화면 위쪽에 오도록 부드럽게 스크롤
      });
    });
  },
};
