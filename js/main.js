/* ================================================================
   Portfolio - main.js
   "이벤트 → 상태(state) → 화면(render)" 흐름을 코드로 표현합니다.
   1) 다크 모드  (state: theme)
   2) GitHub API (state: status / repos / activeLang)
   3) Contact 폼 (state: errors / submitted)
   + 햄버거 메뉴, 부드러운 스크롤, 스크롤 탑, 스크롤 애니메이션, 타이핑 효과
   ================================================================ */

'use strict';

/* ----- 0. 설정값 (README에 명시되는 임계값) ----- */
const CONFIG = {
  // 본인 GitHub 아이디로 바꿔주세요.
  GITHUB_USERNAME: 'JungSaeYoung',
  // 스크롤 탑 버튼이 나타나는 기준 (px)
  SCROLL_TOP_THRESHOLD: 300,
  // 네비 배경이 바뀌는 기준 (px)
  NAV_SCROLL_THRESHOLD: 60,
  // Intersection Observer threshold
  REVEAL_THRESHOLD: 0.2,
  // 로컬스토리지 key
  STORAGE_KEY_THEME: 'portfolio-theme',
};

/* ----- 1. 유틸 ----- */
const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

/* ================================================================
   2. 다크 모드 (state: theme → render: html[data-theme])
   ================================================================ */
const Theme = {
  state: 'light',

  init() {
    // 저장된 테마 → 없으면 시스템 설정 → 그래도 없으면 light
    const saved = localStorage.getItem(CONFIG.STORAGE_KEY_THEME);
    const systemDark =
      window.matchMedia &&
      window.matchMedia('(prefers-color-scheme: dark)').matches;

    this.state = saved || (systemDark ? 'dark' : 'light');
    this.render();

    $('#themeToggle').addEventListener('click', () => this.toggle());
  },

  toggle() {
    this.state = this.state === 'dark' ? 'light' : 'dark';
    localStorage.setItem(CONFIG.STORAGE_KEY_THEME, this.state);
    this.render();
  },

  render() {
    document.documentElement.setAttribute('data-theme', this.state);
    const icon = $('#themeToggle i');
    if (icon) {
      icon.className =
        this.state === 'dark'
          ? 'fa-solid fa-sun'
          : 'fa-solid fa-moon';
    }
  },
};

/* ================================================================
   3. 햄버거 메뉴 (mobile)
   ================================================================ */
const Menu = {
  init() {
    const btn = $('#hamburger');
    const menu = $('#navMenu');

    btn.addEventListener('click', () => {
      const isOpen = menu.classList.toggle('is-open');
      btn.classList.toggle('is-open', isOpen);
      btn.setAttribute('aria-expanded', String(isOpen));
      btn.setAttribute('aria-label', isOpen ? '메뉴 닫기' : '메뉴 열기');
    });

    // 메뉴 링크 클릭 시 자동으로 닫기
    $$('.nav__link').forEach((link) => {
      link.addEventListener('click', () => {
        if (menu.classList.contains('is-open')) {
          menu.classList.remove('is-open');
          btn.classList.remove('is-open');
          btn.setAttribute('aria-expanded', 'false');
        }
      });
    });
  },
};

/* ================================================================
   4. 스크롤 관련: nav 배경 변경 + 스크롤 탑 버튼
   ================================================================ */
const Scroll = {
  init() {
    const header = $('#header');
    const scrollTopBtn = $('#scrollTop');

    // scroll 이벤트는 자주 호출되므로 requestAnimationFrame로 묶음
    let ticking = false;
    window.addEventListener('scroll', () => {
      if (ticking) return;
      window.requestAnimationFrame(() => {
        const y = window.scrollY;
        header.classList.toggle('is-scrolled', y > CONFIG.NAV_SCROLL_THRESHOLD);
        scrollTopBtn.classList.toggle(
          'is-visible',
          y > CONFIG.SCROLL_TOP_THRESHOLD
        );
        ticking = false;
      });
      ticking = true;
    });

    // 스크롤 탑 클릭 → 부드럽게 맨 위로
    scrollTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // 네비 링크 클릭 시 (CSS scroll-behavior로 처리되지만 명시적으로도 동작)
    $$('a[href^="#"]').forEach((link) => {
      link.addEventListener('click', (event) => {
        const href = link.getAttribute('href');
        if (href.length <= 1) return;
        const target = $(href);
        if (!target) return;
        event.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    });
  },
};

/* ================================================================
   5. 타이핑 효과 (Hero name)
   ================================================================ */
const Typing = {
  init() {
    const target = $('#typed');
    if (!target) return;

    const fullText = target.textContent.trim();
    target.textContent = '';
    let i = 0;

    const tick = () => {
      if (i <= fullText.length) {
        target.textContent = fullText.slice(0, i);
        i += 1;
        setTimeout(tick, 90);
      }
    };
    tick();
  },
};

/* ================================================================
   6. Skills 동적 렌더
   ================================================================ */
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

/* ================================================================
   7. GitHub API
   상태(state):  status = 'idle' | 'loading' | 'success' | 'error' | 'empty'
                repos  = 가져온 저장소 배열
                activeLang = 현재 선택된 언어 필터
   흐름: 이벤트(fetch/필터 클릭) → state 변경 → render() 호출
   ================================================================ */
const Projects = {
  state: {
    status: 'idle',
    repos: [],
    activeLang: 'All',
    error: null,
  },

  container: null,
  filtersEl: null,

  init() {
    this.container = $('#projects-container');
    this.filtersEl = $('#filters');
    this.fetchRepos();
  },

  setState(partial) {
    this.state = { ...this.state, ...partial };
    this.render();
  },

  async fetchRepos() {
    this.setState({ status: 'loading', error: null });

    try {
      const url = `https://api.github.com/users/${CONFIG.GITHUB_USERNAME}/repos?sort=updated&per_page=100`;
      const res = await fetch(url, {
        headers: { Accept: 'application/vnd.github+json' },
      });

      if (!res.ok) {
        if (res.status === 403) {
          throw new Error('GitHub API 호출 한도(시간당 60회)를 초과했습니다. 잠시 후 다시 시도해 주세요.');
        }
        if (res.status === 404) {
          throw new Error('사용자를 찾을 수 없습니다. main.js의 GITHUB_USERNAME 값을 확인해 주세요.');
        }
        throw new Error(`요청 실패 (HTTP ${res.status})`);
      }

      const data = await res.json();

      // fork 저장소는 제외하고 상위 12개만 표시 (선택사항)
      const repos = data
        .filter((r) => !r.fork)
        .slice(0, 12);

      if (repos.length === 0) {
        this.setState({ status: 'empty', repos: [] });
        return;
      }

      this.setState({ status: 'success', repos });
    } catch (err) {
      console.error('[GitHub API]', err);
      this.setState({ status: 'error', error: err.message });
    }
  },

  /** state → DOM 렌더 */
  render() {
    const { status, repos, activeLang, error } = this.state;

    if (status === 'loading') {
      this.filtersEl.innerHTML = '';
      this.container.innerHTML = `
        <div class="state-box">
          <div class="spinner" role="status" aria-label="로딩 중"></div>
          <p>프로젝트를 불러오는 중입니다...</p>
        </div>`;
      return;
    }

    if (status === 'error') {
      this.filtersEl.innerHTML = '';
      this.container.innerHTML = `
        <div class="state-box">
          <i class="fa-solid fa-triangle-exclamation" aria-hidden="true"></i>
          <p>프로젝트를 불러올 수 없습니다.<br/><small>${error || ''}</small></p>
          <button class="btn btn--primary btn--sm" id="retryBtn">
            <i class="fa-solid fa-rotate-right"></i> 다시 시도
          </button>
        </div>`;
      $('#retryBtn').addEventListener('click', () => this.fetchRepos());
      return;
    }

    if (status === 'empty') {
      this.filtersEl.innerHTML = '';
      this.container.innerHTML = `
        <div class="state-box">
          <i class="fa-regular fa-folder-open" aria-hidden="true"></i>
          <p>표시할 프로젝트가 없습니다.</p>
        </div>`;
      return;
    }

    if (status === 'success') {
      this.renderFilters();
      this.renderCards();
    }
  },

  renderFilters() {
    const { repos, activeLang } = this.state;

    // 언어 추출 → 중복 제거
    const langs = ['All', ...new Set(
      repos.map((r) => r.language).filter(Boolean)
    )];

    this.filtersEl.innerHTML = langs
      .map(
        (lang) => `
        <button
          type="button"
          class="filter-btn ${lang === activeLang ? 'is-active' : ''}"
          data-lang="${lang}"
        >${lang}</button>`
      )
      .join('');

    $$('.filter-btn', this.filtersEl).forEach((btn) => {
      btn.addEventListener('click', () => {
        this.setState({ activeLang: btn.dataset.lang });
      });
    });
  },

  renderCards() {
    const { repos, activeLang } = this.state;

    const filtered =
      activeLang === 'All'
        ? repos
        : repos.filter((r) => r.language === activeLang);

    if (filtered.length === 0) {
      this.container.innerHTML = `
        <div class="state-box">
          <i class="fa-regular fa-folder-open"></i>
          <p>"${activeLang}" 언어로 작성된 프로젝트가 없습니다.</p>
        </div>`;
      return;
    }

    // 구조분해 할당 + map + 템플릿 리터럴로 카드 생성
    this.container.innerHTML = filtered
      .map(({
        name,
        description,
        html_url,
        stargazers_count,
        forks_count,
        language,
      }) => `
        <article class="card reveal">
          <div class="card__head">
            <i class="fa-regular fa-folder" aria-hidden="true"></i>
            <h3 class="card__title">${escapeHtml(name)}</h3>
          </div>
          <p class="card__desc">
            ${escapeHtml(description || '설명이 등록되지 않은 저장소입니다.')}
          </p>
          <div class="card__meta">
            <span><i class="fa-regular fa-star"></i>${stargazers_count}</span>
            <span><i class="fa-solid fa-code-fork"></i>${forks_count}</span>
            ${language ? `<span class="card__lang">${escapeHtml(language)}</span>` : ''}
          </div>
          <a
            href="${html_url}"
            target="_blank"
            rel="noopener"
            class="card__link"
          >
            저장소 보기 <i class="fa-solid fa-arrow-up-right-from-square"></i>
          </a>
        </article>`)
      .join('');

    // 새로 렌더된 카드도 스크롤 애니메이션 대상에 등록
    Reveal.observe();
  },
};

/* HTML escape (XSS 방지) */
function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

/* ================================================================
   8. Contact 폼 (state: errors / submitted)
   ================================================================ */
const ContactForm = {
  init() {
    const form = $('#contactForm');
    const successEl = $('#formSuccess');
    if (!form) return;

    // input/blur 시 개별 필드 실시간 검증
    $$('input, textarea', form).forEach((field) => {
      field.addEventListener('blur', () => this.validateField(field));
      field.addEventListener('input', () => this.clearError(field));
    });

    form.addEventListener('submit', (event) => {
      event.preventDefault(); // 기본 제출 동작 방지

      const fields = $$('input, textarea', form);
      const results = fields.map((f) => this.validateField(f));
      const isValid = results.every(Boolean);

      if (!isValid) {
        successEl.hidden = true;
        return;
      }

      // 실제 전송은 하지 않지만 데이터는 구성 (Formspree 등 추후 연동 지점)
      const formData = new FormData(form);
      const payload = Object.fromEntries(formData.entries());
      console.log('[Contact] 전송될 데이터:', payload);

      form.reset();
      successEl.hidden = false;

      // 5초 후 자동으로 성공 메시지 숨김
      setTimeout(() => { successEl.hidden = true; }, 5000);
    });
  },

  validateField(field) {
    const value = field.value.trim();
    const wrapper = field.closest('.form__field');
    const errorEl = $(`[data-error-for="${field.id}"]`, wrapper);

    let message = '';

    if (field.required && value === '') {
      message = '필수 입력 항목입니다.';
    } else if (field.type === 'email' && value !== '' && !this.isValidEmail(value)) {
      message = '올바른 이메일 형식이 아닙니다.';
    } else if (field.id === 'message' && value !== '' && value.length < 5) {
      message = '메시지는 5자 이상 입력해 주세요.';
    }

    if (message) {
      wrapper.classList.add('has-error');
      errorEl.textContent = message;
      return false;
    }
    wrapper.classList.remove('has-error');
    errorEl.textContent = '';
    return true;
  },

  clearError(field) {
    const wrapper = field.closest('.form__field');
    if (wrapper.classList.contains('has-error')) {
      wrapper.classList.remove('has-error');
      $(`[data-error-for="${field.id}"]`, wrapper).textContent = '';
    }
  },

  isValidEmail(email) {
    // 단순화한 RFC 5322 패턴
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  },
};

/* ================================================================
   9. Intersection Observer 기반 스크롤 애니메이션
   ================================================================ */
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

/* ================================================================
   10. 네비게이션 active 상태 (현재 보이는 섹션 강조)
   ================================================================ */
const NavSpy = {
  init() {
    const sections = $$('main section[id]');
    const links = $$('.nav__link');

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.id;
            links.forEach((link) => {
              link.classList.toggle(
                'is-active',
                link.getAttribute('href') === `#${id}`
              );
            });
          }
        });
      },
      { rootMargin: '-40% 0px -55% 0px' }
    );

    sections.forEach((s) => observer.observe(s));
  },
};

/* ================================================================
   11. 초기화
   ================================================================ */
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
