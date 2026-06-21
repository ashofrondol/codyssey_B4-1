/* ================================================================
   navspy.js — 네비게이션 active 상태 (스크롤 스파이)
   각 섹션을 Intersection Observer 로 관찰하다가, 화면 중앙에
   들어온 섹션에 해당하는 네비 링크에 .is-active 를 부여합니다.

   핵심 아이디어:
     - 스크롤 위치를 직접 계산하지 않고, 브라우저가 제공하는
       IntersectionObserver 로 "이 섹션이 보이는지"를 효율적으로 감지합니다.
     - rootMargin 으로 화면 중앙의 좁은 띠만 판정 영역으로 삼아,
       그 띠에 걸친 섹션 하나를 현재 섹션으로 간주합니다.
   ================================================================ */

'use strict'; // 엄격 모드: 선언 안 한 변수 사용 등 흔한 실수를 에러로 잡아줌

const NavSpy = {                                          // 스크롤 스파이 기능 전체를 담는 단일 객체(모듈처럼 사용)
  // ── 초기화: main.js 의 DOMContentLoaded 시점에 1회 호출 ──
  init() {
    const sections = $$('main section[id]');             // 관찰 대상: id 가 있는 본문 섹션들(앵커로 이동 가능한 영역)
    const links = $$('.nav__link');                      // 상태를 바꿔줄 대상: 네비게이션 링크들

    // ── 관찰자(observer) 생성: 섹션이 판정 영역에 들어올 때마다 콜백 실행 ──
    const observer = new IntersectionObserver(
      (entries) => {                                     // entries: 이번에 교차 상태가 바뀐 섹션들의 정보 목록
        entries.forEach((entry) => {                     // 바뀐 섹션을 하나씩 확인
          if (entry.isIntersecting) {                    // 이 섹션이 판정 영역에 '들어온' 경우에만 처리
            const id = entry.target.id;                  // 들어온 섹션의 id(예: 'about') — 매칭할 앵커 값
            links.forEach((link) => {                     // 모든 네비 링크를 순회하며 활성 표시를 갱신
              link.classList.toggle(                       // 두 번째 인자가 true 인 링크에만 .is-active 부여(나머지는 제거)
                'is-active',                               // 현재 섹션을 가리키는 링크임을 나타내는 클래스
                link.getAttribute('href') === `#${id}`     // 링크의 href 가 '#섹션id' 와 같으면 그 링크가 현재 섹션
              );
            });
          }
        });
      },
      { rootMargin: '-40% 0px -55% 0px' }                 // 뷰포트 위 40%·아래 55%를 깎아, 화면 중앙의 좁은 띠만 판정 영역으로 사용
    );

    sections.forEach((s) => observer.observe(s));        // 각 섹션을 관찰 시작 — 이후 교차가 바뀔 때마다 위 콜백이 호출됨
  },
};
