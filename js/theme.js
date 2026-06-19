/* ================================================================
   theme.js — 다크 모드  (객체형 state + setState + render)
   흐름: themeToggle 클릭 → setState({ theme }) → render()
   render() 가 html[data-theme] 를 바꾸면 tokens.css 의 변수가
   다크 값으로 재정의되어 전체 색상이 전환됩니다.
   설정은 localStorage 에 저장되어 새로고침 후에도 유지됩니다.

   ※ Projects/ContactForm 과 동일하게 "상태는 객체, 변경은 setState,
     화면 반영은 render" 패턴으로 통일했습니다.
   ================================================================ */

'use strict';

const Theme = {
  state: {
    theme: 'light', // 'light' | 'dark'
  },

  init() {
    // 저장된 테마 → 없으면 시스템 설정 → 그래도 없으면 light
    const saved = localStorage.getItem(CONFIG.STORAGE_KEY_THEME);
    const systemDark =
      window.matchMedia &&
      window.matchMedia('(prefers-color-scheme: dark)').matches;

    this.setState({ theme: saved || (systemDark ? 'dark' : 'light') });

    $('#themeToggle').addEventListener('click', () => this.toggle());
  },

  setState(partial) {
    this.state = { ...this.state, ...partial };
    this.render();
  },

  toggle() {
    const theme = this.state.theme === 'dark' ? 'light' : 'dark';
    this.setState({ theme });
    localStorage.setItem(CONFIG.STORAGE_KEY_THEME, theme);
  },

  /** state → DOM 렌더 */
  render() {
    const { theme } = this.state;
    document.documentElement.setAttribute('data-theme', theme);

    const icon = $('#themeToggle i');
    if (icon) {
      icon.className =
        theme === 'dark'
          ? 'fa-solid fa-sun'
          : 'fa-solid fa-moon';
    }
  },
};
