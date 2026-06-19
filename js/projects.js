/* ================================================================
   projects.js — GitHub API 연동 (이벤트 → 상태 → 렌더)
   상태(state):  status = 'idle' | 'loading' | 'success' | 'error' | 'empty'
                repos  = 가져온 저장소 배열
                activeLang = 현재 선택된 언어 필터
   흐름: 이벤트(fetch/필터 클릭) → setState() → render() 호출

   ※ escapeHtml() 은 config.js, Reveal 은 reveal.js 에 정의되어 있으며
     같은 전역 스코프를 공유하므로 그대로 호출합니다.
   ================================================================ */

'use strict';

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
          throw new Error('사용자를 찾을 수 없습니다. config.js의 GITHUB_USERNAME 값을 확인해 주세요.');
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
