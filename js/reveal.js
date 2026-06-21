/* ================================================================
   reveal.js — Intersection Observer 기반 스크롤 애니메이션
   .reveal 요소가 화면에 threshold(0.2)만큼 들어오면 .is-visible 를
   추가해 등장시키고, 한 번 보인 요소는 unobserve 합니다.
   동적으로 추가된 카드도 observe() 를 다시 호출해 등록합니다.

   핵심 아이디어:
     - 스크롤 위치를 매번 계산하지 않고, 브라우저가 제공하는
       IntersectionObserver 에게 "요소가 화면에 들어오면 알려줘"라고 맡깁니다.
       (성능이 좋고 코드가 단순해짐)
     - 한 번 등장한 요소는 다시 관찰할 필요가 없으므로 unobserve 로 해제합니다.
   ================================================================ */

'use strict'; // 엄격 모드: 선언 안 한 변수 사용 등 흔한 실수를 에러로 잡아줌

const Reveal = {                                          // 스크롤 등장 애니메이션 기능 전체를 담는 단일 객체(모듈처럼 사용)
  observer: null,                                         // IntersectionObserver 인스턴스 캐시(init에서 채움)

  // ── 초기화: main.js 의 DOMContentLoaded 시점에 1회 호출 ──
  init() {
    this.observer = new IntersectionObserver(            // 화면 진입을 감시할 관찰자 생성
      (entries) => {                                     // 감시 중인 요소들의 교차 상태가 바뀔 때 호출되는 콜백
        entries.forEach((entry) => {                     // 이번에 변화가 생긴 요소들을 하나씩 확인
          if (entry.isIntersecting) {                    // 요소가 화면(뷰포트)에 threshold만큼 들어왔다면
            entry.target.classList.add('is-visible');    // .is-visible 추가 → CSS가 등장 애니메이션 실행
            this.observer.unobserve(entry.target);       // 이미 보였으니 더는 감시하지 않음(중복 처리·성능 낭비 방지)
          }
        });
      },
      { threshold: CONFIG.REVEAL_THRESHOLD }             // 요소가 이 비율(0.2=20%)만큼 보이면 위 콜백 발동
    );

    this.observe();                                      // 현재 페이지에 이미 있는 .reveal 요소들을 감시 대상으로 등록
  },

  // ── 관찰 등록: .reveal 요소들을 observer 에 연결(필요 시 여러 번 호출 가능) ──
  observe() {
    $$('.reveal').forEach((el) => {                      // 페이지의 모든 .reveal 요소를 순회
      if (!el.classList.contains('is-visible')) {        // 아직 등장하지 않은 요소만(이미 보인 건 다시 감시할 필요 없음)
        this.observer.observe(el);                       // 관찰 시작 → 화면에 들어오면 위 콜백이 처리
      }
    });
  },
};
