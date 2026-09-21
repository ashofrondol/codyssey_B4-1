/* ================================================================
   theme.js — 다크 모드  (객체형 state + setState + render)
   흐름: themeToggle 클릭 → setState({ theme }) → render()
   render() 가 html[data-theme] 를 바꾸면 tokens.css 의 변수가
   다크 값으로 재정의되어 전체 색상이 전환됩니다.
   설정은 localStorage 에 저장되어 새로고침 후에도 유지됩니다.

   ※ Projects/ContactForm 과 동일하게 "상태는 객체, 변경은 setState,
     화면 반영은 render" 패턴으로 통일했습니다.
   ================================================================ */

'use strict'; // 엄격 모드: 선언 안 한 변수 사용 등 흔한 실수를 에러로 잡아줌

const Theme = {                                          // 테마(다크/라이트) 기능 전체를 담는 단일 객체(모듈처럼 사용)
  // ── 허용된 테마 값 ──
  // tokens.css 가 실제로 정의하는 테마는 이 둘뿐이다(:root 와 [data-theme="dark"]).
  // 다른 값이 <html data-theme> 에 들어가면 매칭되는 규칙이 없어 색이 라이트로 보이는데,
  // 화면만 보고는 '테마가 깨졌다'는 사실을 알 수 없다. 그래서 값을 여기 한 곳에 못박고
  // init/render 양쪽에서 검사한다.
  THEMES: ['light', 'dark'],

  // ── 상태(state): 화면이 의존하는 '단일 진실의 원천' ──
  state: {
    theme: 'light', // 현재 테마: 'light'(밝은) | 'dark'(어두운) — 기본값은 라이트
  },

  // ── 초기화: main.js 의 DOMContentLoaded 시점에 1회 호출 ──
  init() {
    // 저장된 테마 → 없으면 시스템 설정 → 그래도 없으면 light
    const saved = localStorage.getItem(CONFIG.STORAGE_KEY_THEME); // 지난 방문 때 저장해 둔 테마 값 읽기(없으면 null)
    const systemDark =                                  // OS/브라우저가 다크 모드를 선호하는지 여부
      window.matchMedia &&                              // matchMedia 지원 브라우저인지 먼저 확인(구형 대비 방어)
      window.matchMedia('(prefers-color-scheme: dark)').matches; // 시스템 다크 모드면 true

    // localStorage 는 사용자가 직접 고칠 수 있고 옛 버전의 값이 남아 있을 수도 있다.
    // 예전에는 saved 가 무엇이든 그대로 썼기 때문에 'dark-blue' 같은 값도 조용히 통과했다.
    // 모르는 값이면 버리되, 왜 무시했는지는 콘솔에 남긴다(조용히 넘어가지 않는다).
    const isKnownTheme = this.THEMES.indexOf(saved) !== -1; // 저장값이 아는 테마인지 확인
    if (saved !== null && !isKnownTheme) {              // 값은 있는데 아는 테마가 아니면
      console.warn(                                     // 무시한다는 사실과 허용 값을 함께 알림
        `[Theme] 저장된 테마 "${saved}" 를 알 수 없어 무시합니다. ` +
        `허용 값: ${this.THEMES.join(' | ')}`
      );
    }
    const restored = isKnownTheme ? saved : null;       // 아는 값일 때만 복원 대상으로 삼음

    this.setState({ theme: restored || (systemDark ? 'dark' : 'light') }); // 저장값 우선, 없으면 시스템 설정, 그것도 없으면 라이트

    $('#themeToggle').addEventListener('click', () => this.toggle()); // 토글 버튼 클릭 시 테마 전환 실행
  },

  // ── 상태 변경의 유일한 통로: state 를 합치고 즉시 render ──
  setState(partial) {
    this.state = { ...this.state, ...partial };         // 기존 state 에 바뀐 부분(partial)만 덮어써 새 state 생성
    this.render();                                      // 상태가 바뀌었으니 화면을 다시 그림(단방향 흐름)
  },

  // ── 테마 전환: 현재와 반대 테마로 바꾸고 저장 ──
  toggle() {
    const theme = this.state.theme === 'dark' ? 'light' : 'dark'; // 지금이 다크면 라이트로, 아니면 다크로 뒤집기
    this.setState({ theme });                           // 새 테마를 상태에 반영(→ render 로 화면 전환)
    localStorage.setItem(CONFIG.STORAGE_KEY_THEME, theme); // 선택을 저장해 새로고침/재방문 후에도 유지
  },

  /** state → DOM 렌더 */
  render() {
    const { theme } = this.state;                       // 현재 state 에서 theme 값 꺼내기(구조 분해 할당)
    if (this.THEMES.indexOf(theme) === -1) {            // 아는 테마가 아니면 DOM 에 반영하기 전에 멈춤
      // 여기까지 모르는 값이 왔다면 setState 호출부가 잘못된 것이다.
      // 그대로 setAttribute 하면 '색이 이상한데 원인은 안 보이는' 상태가 되므로 실패시킨다.
      throw new Error(`Theme.render(): 알 수 없는 theme "${theme}" — 허용 값은 ${this.THEMES.join(' | ')} 입니다.`);
    }
    document.documentElement.setAttribute('data-theme', theme); // <html>에 data-theme 지정 → tokens.css 변수가 해당 테마 값으로 전환

    const icon = $('#themeToggle i');                   // 토글 버튼 안의 아이콘(<i>) 요소 찾기
    if (icon) {                                         // 아이콘이 있을 때만 처리(방어 코드)
      icon.className =                                  // 아이콘 클래스를 통째로 교체해 모양 변경
        theme === 'dark'                                // 현재가 다크 모드면
          ? 'fa-solid fa-sun'                           // 해 아이콘(클릭하면 라이트로 갈 수 있음을 암시)
          : 'fa-solid fa-moon';                         // 라이트 모드면 달 아이콘(클릭하면 다크로 갈 수 있음을 암시)
    }
  },
};
