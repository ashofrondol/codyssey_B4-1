/* ================================================================
   projects.js — GitHub API 연동 (이벤트 → 상태 → 렌더)
   상태(state):  status = 'idle' | 'loading' | 'success' | 'error' | 'empty'
                repos  = 가져온 저장소 배열
                activeLang = 현재 선택된 언어 필터
   흐름: 이벤트(fetch/필터 클릭) → setState() → render() 호출

   설계 메모: DOM 이 아니라 state 가 '단일 진실의 원천'이라,
     무슨 일이 생기면 state 만 바꾸고(setState) 화면은 render() 가 다시 그립니다.
     덕분에 "지금 화면 상태"를 state 한 곳만 보면 알 수 있습니다.

   ※ escapeHtml() 은 config.js, Reveal 은 reveal.js 에 정의되어 있으며
     같은 전역 스코프를 공유하므로 그대로 호출합니다.
     ($ / $$ 도 마찬가지로 다른 파일에서 정의한 querySelector 헬퍼입니다.)
   ================================================================ */

'use strict'; // 엄격 모드: 선언 안 한 변수 사용 등 흔한 실수를 에러로 잡아줌

const Projects = {                                       // 프로젝트(저장소) 목록 기능 전체를 담는 단일 객체(모듈처럼 사용)
  // ── 상태(state): 화면이 의존하는 '단일 진실의 원천' ──
  state: {
    status: 'idle',                                      // 진행 상태: idle(대기) | loading(불러오는중) | success | error | empty(빈 결과)
    repos: [],                                           // GitHub 에서 받아온 저장소 목록(가공 후 보관)
    activeLang: 'All',                                   // 현재 선택된 언어 필터('All' 이면 전체 표시)
    error: null,                                         // 에러 메시지(실패 시 사용자에게 보여줄 문구)
  },

  container: null,                                       // 카드들이 그려질 컨테이너 요소 캐시(init 에서 채움)
  filtersEl: null,                                       // 언어 필터 버튼들이 그려질 영역 캐시(init 에서 채움)

  // ── 초기화: main.js 의 DOMContentLoaded 시점에 1회 호출 ──
  init() {
    this.container = $('#projects-container');           // 카드 목록을 넣을 컨테이너를 찾아 보관
    this.filtersEl = $('#filters');                      // 언어 필터 버튼 영역을 찾아 보관
    this.fetchRepos();                                   // 곧바로 GitHub 저장소 데이터를 가져오기 시작
  },

  // ── 상태 변경의 유일한 통로: state 를 합치고 즉시 render ──
  setState(partial) {
    this.state = { ...this.state, ...partial };          // 기존 state 를 복사한 뒤 바뀐 부분(partial)만 덮어쓰기
    this.render();                                       // 바뀐 state 를 화면에 반영하도록 다시 그림
  },

  // ── 데이터 가져오기: GitHub REST API 호출 ──
  async fetchRepos() {
    this.setState({ status: 'loading', error: null });   // 먼저 '로딩 중'으로 전환(이전 에러는 지움) → 스피너 표시

    try {
      const url = `https://api.github.com/users/${CONFIG.GITHUB_USERNAME}/repos?sort=updated&per_page=100`; // 사용자명으로 저장소 목록 요청(최근 수정순, 최대 100개)
      const res = await fetch(url, {                      // 실제 네트워크 요청을 보내고 응답을 기다림
        headers: { Accept: 'application/vnd.github+json' }, // GitHub 권장 헤더: v3 JSON 형식으로 받겠다고 명시
      });

      if (!res.ok) {                                       // HTTP 상태가 200대가 아니면(요청 실패)
        if (res.status === 403) {                          // 403: 비인증 호출 한도(시간당 60회) 초과한 경우
          throw new Error('GitHub API 호출 한도(시간당 60회)를 초과했습니다. 잠시 후 다시 시도해 주세요.'); // 사용자에게 보여줄 친절한 메시지로 에러 발생
        }
        if (res.status === 404) {                          // 404: 해당 사용자명이 존재하지 않는 경우
          throw new Error('사용자를 찾을 수 없습니다. config.js의 GITHUB_USERNAME 값을 확인해 주세요.'); // 설정값 점검을 안내하는 에러 발생
        }
        throw new Error(`요청 실패 (HTTP ${res.status})`);   // 그 외 상태 코드는 일반 실패 메시지로 처리
      }

      const data = await res.json();                       // 응답 본문을 JSON 으로 파싱(저장소 배열)

      // fork 저장소는 제외하고 상위 12개만 표시 (선택사항)
      const repos = data
        .filter((r) => !r.fork)                            // 남의 것을 복제한 fork 저장소는 빼서 '내 작업'만 남김
        .slice(0, 12);                                     // 너무 많지 않게 앞에서 12개로 제한

      if (repos.length === 0) {                            // 표시할 저장소가 하나도 없으면
        this.setState({ status: 'empty', repos: [] });     // '빈 결과' 상태로 전환(안내 박스 표시)
        return;                                             // 더 진행할 게 없으니 종료
      }

      this.setState({ status: 'success', repos });         // 정상: '성공' 상태 + 가공된 저장소 목록 저장 → 카드/필터 렌더
    } catch (err) {                                        // 위 과정 어디서든 에러가 나면(네트워크 실패 포함) 여기로
      console.error('[GitHub API]', err);                  // 개발자 콘솔에 원본 에러를 남겨 디버깅에 도움
      this.setState({ status: 'error', error: err.message }); // 화면은 '에러' 상태 + 사용자용 메시지로 전환
    }
  },

  /** state → DOM 렌더 */
  // ── 렌더: 현재 status 에 따라 화면 모양을 결정하는 분기점 ──
  render() {
    const { status, repos, activeLang, error } = this.state; // 그릴 때 필요한 값들을 state 에서 한 번에 꺼내기

    if (status === 'loading') {                            // (1) 불러오는 중이면
      this.filtersEl.innerHTML = '';                       // 필터 영역은 아직 보여줄 게 없으니 비움
      this.container.innerHTML = `
        <div class="state-box">
          <div class="spinner" role="status" aria-label="로딩 중"></div>
          <p>프로젝트를 불러오는 중입니다...</p>
        </div>`;                                            // 스피너 + 안내 문구로 컨테이너 채움
      return;                                               // 로딩 화면만 보여주고 끝
    }

    if (status === 'error') {                              // (2) 실패 상태면
      this.filtersEl.innerHTML = '';                       // 필터는 의미 없으니 비움
      this.container.innerHTML = `
        <div class="state-box">
          <i class="fa-solid fa-triangle-exclamation" aria-hidden="true"></i>
          <p>프로젝트를 불러올 수 없습니다.<br/><small>${error || ''}</small></p>
          <button class="btn btn--primary btn--sm" id="retryBtn">
            <i class="fa-solid fa-rotate-right"></i> 다시 시도
          </button>
        </div>`;                                            // 경고 아이콘 + 에러 메시지 + '다시 시도' 버튼 표시
      $('#retryBtn').addEventListener('click', () => this.fetchRepos()); // 재시도 버튼을 누르면 다시 가져오기 실행
      return;                                               // 에러 화면만 보여주고 끝
    }

    if (status === 'empty') {                              // (3) 빈 결과 상태면
      this.filtersEl.innerHTML = '';                       // 필터도 비움
      this.container.innerHTML = `
        <div class="state-box">
          <i class="fa-regular fa-folder-open" aria-hidden="true"></i>
          <p>표시할 프로젝트가 없습니다.</p>
        </div>`;                                            // '없음' 안내 박스 표시
      return;                                               // 끝
    }

    if (status === 'success') {                            // (4) 정상적으로 데이터를 받았으면
      this.renderFilters();                                // 언어 필터 버튼들 그리기
      this.renderCards();                                  // 저장소 카드들 그리기
    }
  },

  // ── 언어 필터 버튼 렌더 + 클릭 이벤트 연결 ──
  renderFilters() {
    const { repos, activeLang } = this.state;              // 필터를 만들 저장소 목록과 현재 선택값 꺼내기

    // 언어 추출 → 중복 제거
    const langs = ['All', ...new Set(                      // 맨 앞은 항상 'All', 그 뒤로 등장한 언어들을 Set 으로 중복 제거해 펼침
      repos.map((r) => r.language).filter(Boolean)         // 각 저장소의 언어만 뽑되, null/빈값은 걸러냄(언어 없는 저장소 대비)
    )];

    this.filtersEl.innerHTML = langs
      .map(
        (lang) => `
        <button
          type="button"
          class="filter-btn ${lang === activeLang ? 'is-active' : ''}"
          data-lang="${lang}"
        >${lang}</button>`                                  // 언어마다 버튼 1개 생성(현재 선택된 언어에는 is-active 클래스 부여)
      )
      .join('');                                            // 버튼 문자열들을 이어붙여 한 번에 DOM 에 주입

    $$('.filter-btn', this.filtersEl).forEach((btn) => {    // 방금 만든 필터 버튼들을 모두 순회하며
      btn.addEventListener('click', () => {                 // 클릭하면
        this.setState({ activeLang: btn.dataset.lang });    // 선택 언어를 그 버튼 값으로 바꿈 → render 가 다시 필터링해 그림
      });
    });
  },

  // ── 저장소 카드 렌더(현재 선택 언어로 필터링한 결과만) ──
  renderCards() {
    const { repos, activeLang } = this.state;              // 카드로 그릴 저장소 목록과 현재 선택 언어 꺼내기

    const filtered =
      activeLang === 'All'                                  // 'All' 이면 거르지 않고 전체 사용
        ? repos
        : repos.filter((r) => r.language === activeLang);   // 특정 언어면 그 언어 저장소만 남김

    if (filtered.length === 0) {                            // 선택한 언어에 해당하는 저장소가 없으면
      this.container.innerHTML = `
        <div class="state-box">
          <i class="fa-regular fa-folder-open"></i>
          <p>"${activeLang}" 언어로 작성된 프로젝트가 없습니다.</p>
        </div>`;                                            // 어떤 언어가 비었는지 알려주는 안내 박스 표시
      return;                                               // 그릴 카드가 없으니 끝
    }

    // 구조분해 할당 + map + 템플릿 리터럴로 카드 생성
    this.container.innerHTML = filtered
      .map(({                                               // 저장소 하나하나에서 필요한 필드만 구조분해로 꺼내며
        name,                                               // 저장소 이름
        description,                                        // 저장소 설명(없을 수 있음)
        html_url,                                           // 저장소 웹 주소(링크용)
        stargazers_count,                                   // 별(star) 개수
        forks_count,                                        // 포크(fork) 개수
        language,                                           // 주 사용 언어(없을 수 있음)
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
        </article>`)                                        // 카드 HTML 한 장: 제목/설명/별·포크·언어/외부 링크. 사용자 입력값은 escapeHtml 로 안전 처리(XSS 방지), 링크는 noopener 로 보안 처리
      .join('');                                            // 카드 문자열들을 이어붙여 컨테이너에 한 번에 주입

    // 새로 렌더된 카드도 스크롤 애니메이션 대상에 등록
    Reveal.observe();                                       // 방금 추가된 .reveal 요소들을 IntersectionObserver 에 다시 등록(등장 애니메이션 적용)
  },
};
