# 📁 Portfolio — 순수 HTML / CSS / JavaScript

> Codyssey **B4-1 · 웹 기초와 프론트엔드** 미션
> 외부 라이브러리 없이 HTML · CSS · JavaScript 만으로 처음부터 끝까지 만든 반응형 포트폴리오입니다.

---

## 🌐 배포 URL

| 항목         | 링크                                                     |
| ------------ | -------------------------------------------------------- |
| 배포 사이트  | `https://ashofrondol.github.io/codyssey_B4-1/` |
| GitHub 저장소 | `https://github.com/ashofrondol/codyssey_B4-1` |

---

## 🛠️ 사용 기술

| 분류 | 사용 기술 |
|------|-----------|
| Markup | HTML5 (시맨틱 태그) |
| Styling | CSS3 (변수, Flexbox, Grid, Media Query, Intersection 기반 애니메이션) |
| Logic | JavaScript (ES6+ · `const`/`let` · 화살표 함수 · 구조분해 · 배열 메서드 · `fetch`/`async-await`) |
| Web API | GitHub REST API, Intersection Observer, localStorage |
| Asset | Google Fonts (Inter / Noto Sans KR), Font Awesome |

> 프레임워크/라이브러리(React, Vue, jQuery, Bootstrap, Tailwind 등) 미사용

---

## ✨ 주요 기능

### 1. 반응형 레이아웃 (Mobile First)
- 브레이크포인트: `768px` (태블릿), `1024px` (데스크톱)
- 모바일에서 네비게이션이 햄버거 메뉴로 전환됩니다.
- 네비게이션은 **Flexbox**, Projects 카드 그리드는 **CSS Grid `auto-fit, minmax(280px, 1fr)`** 로 구성했습니다.

### 2. 인터랙티브 UI
| 기능 | 동작 |
|------|------|
| 햄버거 메뉴 | 모바일에서 메뉴 토글 (`classList.toggle('is-open')`) |
| 부드러운 스크롤 | 네비/CTA 클릭 시 해당 섹션으로 smooth scroll |
| 스크롤 탑 버튼 | 스크롤 **300px** 이상에서 등장 → 클릭 시 맨 위로 이동 |
| 네비 배경 변경 | 스크롤 **60px** 이상에서 배경 + 그림자 적용 |
| 다크 모드 | 토글 버튼으로 전환, `localStorage`에 저장 → 새로고침 후에도 유지 / 시스템 `prefers-color-scheme` 자동 감지 |
| 스크롤 애니메이션 | Intersection Observer, `threshold: 0.2` |
| 타이핑 효과 | Hero 섹션 이름이 한 글자씩 타이핑 |
| 폼 검증 | 필수값 + 이메일 형식, 입력 필드 근처에 에러 표시 |

### 3. GitHub API 연동
- 엔드포인트: `https://api.github.com/users/{username}/repos?sort=updated&per_page=100`
- fork 저장소를 제외하고 최근 업데이트 12개 표시
- 상태 표현:
  - **로딩**: 스피너 + "프로젝트를 불러오는 중..."
  - **성공**: 카드 그리드 + 언어 필터 버튼
  - **에러**: 메시지 + 다시 시도 버튼 (HTTP 403 레이트 리밋 안내 포함)
  - **빈 상태**: "표시할 프로젝트가 없습니다."
- 보너스: 언어별 필터링 (`array.filter()`)

### 4. 상태 → 렌더링 흐름 (React 학습의 기초)
이 프로젝트는 **이벤트 → 상태 변경 → DOM 업데이트** 흐름을 의도적으로 분리해 작성했습니다.

세 모듈 모두 **객체형 state + `setState()` → `render()`** 패턴으로 통일했습니다.

| # | 상태 객체 | 트리거 이벤트 | 렌더링 결과 |
|---|-----------|---------------|-------------|
| 1 | `Theme.state` = `{ theme }` | `themeToggle` 클릭 | `html[data-theme]` 변경 → 전체 색상 전환 |
| 2 | `Projects.state` = `{ status, repos, activeLang, error }` | `fetch` / 필터 클릭 / 재시도 | 로딩 · 성공 · 에러 · 빈 상태 UI |
| 3 | `ContactForm.state` = `{ errors, status }` | `blur` / `input` / `submit` | 필드별 에러 메시지 표시/숨김, 성공 메시지 |
| 4 | (보너스) `Projects.state.activeLang` | 필터 버튼 클릭 | 언어별 카드 목록 변경 |

---

## 📂 폴더 구조

> 유지보수와 가독성을 위해 CSS·JS를 **기능별 파일로 분리**했습니다.

```
codyssey_B4-1/
├── index.html             # 메인 페이지 (시맨틱 마크업)
├── css/
│   ├── style.css          # 진입점 — 아래 파일들을 @import (순서 = cascade)
│   ├── tokens.css         # CSS 변수 (라이트/다크 테마)
│   ├── base.css           # 리셋 · 기본 요소
│   ├── layout.css         # 컨테이너 · 섹션 골격
│   ├── buttons.css        # 버튼 컴포넌트
│   ├── header.css         # 헤더 · 네비 · 햄버거
│   ├── hero.css           # Hero 섹션
│   ├── about.css          # About 섹션
│   ├── skills.css         # Skills 섹션
│   ├── projects.css       # Projects 섹션 · 카드 · 상태박스
│   ├── form.css           # Contact 폼
│   ├── footer.css         # Footer
│   ├── widgets.css        # 스크롤탑 버튼 · reveal 애니메이션
│   └── responsive.css     # 미디어쿼리 (가장 마지막)
├── js/
│   ├── config.js          # 설정(CONFIG) · 셀렉터 유틸($, $$) · escapeHtml
│   ├── theme.js           # 다크 모드
│   ├── menu.js            # 햄버거 메뉴
│   ├── scroll.js          # 스크롤(네비 배경 · 스크롤탑 · 부드러운 스크롤)
│   ├── typing.js          # Hero 타이핑 효과
│   ├── skills.js          # Skills 동적 렌더
│   ├── reveal.js          # Intersection Observer 스크롤 애니메이션
│   ├── navspy.js          # 네비 active 스파이
│   ├── projects.js        # GitHub API 연동 (상태 → 렌더)
│   ├── contact.js         # Contact 폼 검증
│   └── main.js            # 진입점 — DOMContentLoaded 에서 각 모듈 init()
├── images/                # (사용 시) 프로필/스크린샷 등 이미지 자산
└── README.md
```

> JS 파일은 모두 `defer` 로 연결되며, classic 스크립트가 전역 스코프를 공유하므로
> `config.js`(공용) → 각 기능 모듈 → `main.js`(초기화) 순서로 로드됩니다.

---

## ▶️ 로컬 실행 방법

1. VS Code에서 폴더를 엽니다.
2. **Live Server** 확장을 설치합니다.
3. `index.html` 우클릭 → **Open with Live Server** 를 선택합니다.
4. 또는, `index.html` 을 그대로 브라우저로 열어도 됩니다 (단, `file://` 환경에서는 일부 브라우저 정책에 영향을 받을 수 있습니다).

> **본인 데이터로 바꾸려면** `js/config.js` 의 `CONFIG.GITHUB_USERNAME` 값을 본인 GitHub 아이디로 변경하세요.

```js
const CONFIG = {
  GITHUB_USERNAME: 'YourGitHubID',
  ...
};
```

---

## 🚀 GitHub Pages 배포

```bash
# 1. 저장소 생성 후 푸시
git init
git add .
git commit -m "init: portfolio"
git branch -M main
git remote add origin https://github.com/<username>/<repo>.git
git push -u origin main

# 2. GitHub 저장소 페이지 → Settings → Pages
#    Source: Deploy from a branch
#    Branch: main / (root)  →  Save
```

배포 후 `https://<username>.github.io/<repo>/` 에서 접속 가능합니다.

---

## 📸 스크린샷

> 배포 후 아래 이미지 파일을 `images/` 폴더에 추가하고 경로를 연결해 주세요.

| 데스크톱 | 모바일 | 다크 모드 |
|----------|--------|-----------|
| ![desktop](images/screenshot-desktop.png) | ![mobile](images/screenshot-mobile.png) | ![dark](images/screenshot-dark.png) |

---

## ⚙️ 주요 설정값 (변경 가능)

`js/config.js` 상단의 `CONFIG` 객체에서 다음 값을 변경할 수 있습니다.

| Key | 의미 | 기본값 |
|-----|------|--------|
| `GITHUB_USERNAME` | GitHub API에 사용할 계정명(username) | `ashofrondol` |
| `SCROLL_TOP_THRESHOLD` | 스크롤 탑 버튼이 나타나는 기준 (px) | `300` |
| `NAV_SCROLL_THRESHOLD` | 네비 배경이 변경되는 기준 (px) | `60` |
| `REVEAL_THRESHOLD` | Intersection Observer 임계값 | `0.2` |

---

## ⚠️ GitHub API 레이트 리밋

GitHub API는 **인증 없이 호출 시 시간당 60회** 까지만 응답합니다.
초과 시 `403 rate limit exceeded` 가 반환되며, 이 경우 본 사이트의 Projects 섹션은 다음과 같이 처리합니다.

- 에러 메시지: *"GitHub API 호출 한도(시간당 60회)를 초과했습니다. 잠시 후 다시 시도해 주세요."*
- [다시 시도] 버튼 제공

---

## 📚 과제 체크리스트

- [x] 시맨틱 태그 사용 (`header / nav / main / section / article / footer`)
- [x] 네비 Flexbox, 카드 Grid (`auto-fit, minmax`)
- [x] 모바일 퍼스트 반응형, 768/1024 브레이크포인트
- [x] 햄버거 메뉴, 부드러운 스크롤, 스크롤 탑 버튼, 네비 배경 변화
- [x] 다크 모드 + `localStorage` 유지 + 시스템 설정 감지
- [x] Intersection Observer 스크롤 애니메이션
- [x] Contact 폼 유효성 검사 (필수값/이메일)
- [x] GitHub API 연동 + 로딩/성공/에러/빈 상태
- [x] ES6+ (`const`/`let`, 화살표 함수, 구조분해, 템플릿 리터럴, `map/filter/forEach`)
- [x] `fetch` + `async/await` + `try/catch`
- [x] (보너스) 언어별 필터 / 타이핑 효과 / 시스템 다크 모드 감지

---

## 👤 Author

**JeongSeYoung** (GitHub: `ashofrondol`)
- Email: ashofrondol@gmail.com
- GitHub: [@ashofrondol](https://github.com/ashofrondol)
