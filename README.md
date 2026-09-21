# 📁 Portfolio — 순수 HTML / CSS / JavaScript

> Codyssey **B4-1 · 웹 기초와 프론트엔드** 미션
> 외부 라이브러리 없이 HTML · CSS · JavaScript 만으로 처음부터 끝까지 만든 반응형 포트폴리오입니다.

---

## 0. 과제 명세 (원본 미션 요구사항)

> 출처: `codyssey_assignments/B4-1.pdf` — 원문 요구사항을 그대로 옮기고, 해설은 💡 로 구분했다.

### 0.1 미션 한눈에 보기

| 항목 | 내용 |
| --- | --- |
| 분야 | AI/SW 기초 |
| 구분 | 웹 기초와 프론트엔드 |
| 학습시간 | 80시간 |
| 미션 제목 | **나를 소개하는 웹페이지 처음부터 만들기** |
| 결과물 | 반응형 포트폴리오 웹사이트 1개 (GitHub Pages 배포) |

#### 1. 미션 소개 (원문)

> HTML, CSS, JavaScript는 모든 웹 개발의 기초입니다. 브라우저가 이해하는 유일한 언어이며, React/Vue/Angular 같은 프레임워크도 결국 이 세 가지로 변환되어 동작합니다.
>
> 이 미션에서는 외부 라이브러리 없이 순수 HTML/CSS/JavaScript만으로 반응형 포트폴리오 웹사이트를 처음부터 끝까지 완성합니다. 단순히 화면을 그리는 것이 아니라, "사용자 이벤트 → DOM 조작 → 화면 변화"가 연결되는 웹의 동작 원리를 결과물로 확인합니다.
>
> 또한 GitHub API를 연동하여 실제 서비스에서 자주 등장하는 로딩/에러/빈 상태를 직접 처리하는 경험을 쌓습니다. 이 미션은 다음 미션인 React 학습의 필수 기반이 됩니다. React의 컴포넌트, 상태, 이벤트 개념은 모두 이 미션에서 다루는 DOM 조작과 이벤트 처리를 추상화한 것이기 때문입니다.

#### 이 과제가 진짜로 묻는 것 (해설)

> 💡 **1) 이것은 "예쁜 포트폴리오 만들기" 과제가 아니다.** 제약 사항에 명시되어 있듯 "UI 고퀄리티보다 *이벤트 → 상태 → 렌더링* 흐름 이해 우선"이다. 채점자는 디자인이 아니라 **한 번의 클릭이 어떤 경로로 화면 픽셀까지 도달하는지**를 코드로 따라가며 설명할 수 있는가를 본다.
>
> 💡 **2) React를 금지한 것이 핵심 장치다.** React를 쓰면 `useState` 한 줄이 상태-렌더링 연결을 자동으로 해주기 때문에, 학습자는 그 사이에 무슨 일이 일어나는지 영원히 모른 채 넘어간다. 이 과제는 그 자동화를 일부러 제거해서 `상태 변수 → 수동 렌더 함수 호출 → DOM 갱신`을 **손으로 배선하게** 만든다. 즉 이 과제의 정답은 "React를 흉내 낸 작은 구조"를 스스로 발명하는 것이다.
>
> 💡 **3) GitHub API 연동은 네트워크 공부가 아니라 "상태가 4개인 UI" 공부다.** 로딩/성공/에러/빈 상태 — 비동기가 개입하는 순간 UI는 boolean 하나로 표현되지 않는다. 실무 프론트엔드의 절반은 이 4가지 상태를 빠뜨리지 않는 일이다.
>
> 💡 **4) 로컬스토리지 다크 모드는 "상태의 수명(persistence)"을 묻는다.** 메모리에만 있는 상태와 새로고침을 넘어 살아남는 상태의 차이, 그리고 초기 로드 시 저장된 상태를 화면에 복원하는 순서를 다룬다.
>
> 💡 **5) 배포까지가 과제다.** 로컬 Live Server에서만 되고 GitHub Pages에서 깨지는 흔한 원인(대소문자 구분 경로, 절대경로 `/css/style.css`, `file://` 전용 코드)을 직접 만나보게 하려는 의도다.

---

### 0.2 최종 산출물 (제출물)

#### 2. 최종 결과물 (원문)

다음 조건을 만족하는 **반응형 포트폴리오 웹사이트 1개**를 완성한다.

1. **반응형 웹사이트**
   - 모바일, 태블릿, 데스크톱 등 모든 환경에서 레이아웃이 최적화되어 보인다.
   - Hero, About, Skills, Projects, Contact, Footer 섹션을 포함한다.
2. **인터랙티브 UI**
   - 다크 모드 토글, 햄버거 메뉴, 부드러운 스크롤, 스크롤 애니메이션 등 사용자와 상호작용하는 기능이 동작한다.
   - 폼 유효성 검사가 구현되어 있다.
3. **외부 API 연동**
   - GitHub API에서 본인의 저장소 목록을 가져와 Projects 섹션에 동적으로 렌더링한다.
   - 로딩/에러/빈 상태가 UI로 표현된다.
4. **상태 유지**
   - 다크 모드 설정이 로컬스토리지에 저장되어, 새로고침 후에도 유지된다.
5. **배포**
   - GitHub Pages로 배포되어 외부에서 접속 가능한 URL이 존재한다.

#### 제출물 체크리스트 (원문 "7. 제약 사항 > 제출물")

- [ ] GitHub 저장소 URL
- [ ] 배포된 사이트 URL (GitHub Pages)
- [ ] 데스크톱/모바일/다크모드 스크린샷

- [ ] (R10-3) README에 프로젝트 설명, 사용 기술, 배포 URL, 스크린샷이 포함되어야 한다.

> 💡 스크린샷은 **3종(데스크톱 / 모바일 / 다크모드)** 이 명시적으로 요구된다. "스크린샷 한 장"으로는 제출 조건을 만족하지 못한다.

---

### 0.3 과제 목표 — 수료 후 스스로 설명할 수 있어야 하는 것

#### 3. 과제 목표 (원문)

이 과제를 마친 후, 학습자는 아래를 스스로 설명할 수 있어야 한다.

- [ ] HTML에서 시맨틱 태그를 왜 사용하는지 또한 본인이 어떤 기준으로 구조를 설계했는지 설명할 수 있다.
- [ ] CSS에서 Flexbox와 Grid의 차이, 그리고 언제 각각을 선택해야 하는지 설명할 수 있다.
- [ ] `querySelector` 로 DOM을 선택하고, `addEventListener` 로 이벤트를 연결하는 흐름을 설명할 수 있다.
- [ ] 화살표 함수, 구조분해 할당, 배열 메서드(map/filter)가 왜 필요하고 어떻게 사용하는지 설명할 수 있다.
- [ ] `fetch` 와 `async/await` 로 비동기 데이터를 가져오고, 로딩/성공/실패 상태를 UI로 어떻게 표현했는지 설명할 수 있다.
- [ ] "하나의 기능"을 만들기 위해 이벤트 → 상태 변경 → DOM 업데이트가 어떻게 연결되는지 설명할 수 있다. (React의 상태-렌더링 흐름의 기초)

> 💡 이 6줄은 구두 평가 문항 그 자체다. 코드가 동작해도 이 6가지를 자기 코드의 **줄 번호를 짚어가며** 말하지 못하면 미완성으로 본다.

---

### 0.4 기능 요구 사항 (필수)

#### 4. 기능 요구 사항 (원문)

다음 요구사항을 **모두** 만족해야 한다.

#### R1. 프로젝트 기본 구성

- [ ] **R1-1** 프로젝트 폴더 구조가 최소한 다음 역할을 분리한다.
  ```
  index.html    (메인 페이지)
  css/          (스타일시트)
  js/           (JavaScript 파일)
  images/       (이미지 파일)
  ```
- [ ] **R1-2** 외부 스타일시트와 JavaScript 파일을 HTML에 올바르게 연결한다.
- [ ] **R1-3** VS Code + Live Server로 실시간 개발 환경을 구성한다.

#### R2. HTML 구조 (시맨틱 마크업)

- [ ] **R2-1** 전체 레이아웃을 `div` 로만 감싸지 않고, 시맨틱 태그를 사용한다.
  - `<header>` , `<nav>` , `<main>` , `<section>` , `<article>` , `<footer>`
- [ ] **R2-2** 페이지에 다음 섹션이 포함되어야 한다.

  | 섹션 | 포함 내용 (원문) |
  | --- | --- |
  | Hero | 인사말, CTA 버튼 |
  | About | 자기소개, 프로필 이미지 |
  | Skills | 기술 스택 목록 |
  | Projects | GitHub API 연동 카드 |
  | Contact | 문의 폼 |
  | Footer | 저작권, 소셜 링크 |

- [ ] **R2-3** 네비게이션에 각 섹션으로 이동하는 앵커 링크가 존재한다.
- [ ] **R2-4** 모든 이미지에 의미있는 `alt` 속성이 있다.
- [ ] **R2-5** 폼 요소에 `<label>` 이 올바르게 연결되어 있다. (for-id 매칭)

#### R3. CSS 스타일링 (레이아웃 & 반응형)

- [ ] **R3-1** 외부 스타일시트( `css/style.css` )를 사용한다.
- [ ] **R3-2** CSS 변수( `:root` )로 **색상, 폰트, 간격**을 정의한다.
- [ ] **R3-3** 다크 모드용 CSS 변수를 별도로 정의한다. ( `[data-theme="dark"]` )
- [ ] **R3-4** 레이아웃 구현 — 네비게이션: **Flexbox** 사용 (로고 왼쪽, 메뉴 오른쪽)
- [ ] **R3-5** 레이아웃 구현 — Projects 카드: **Grid** 사용 ( `auto-fit` , `minmax` 로 반응형)
- [ ] **R3-6** 반응형 디자인 — **모바일 퍼스트**로 작성한다.
- [ ] **R3-7** 반응형 디자인 — 브레이크포인트: **768px(태블릿), 1024px(데스크톱)**
- [ ] **R3-8** 반응형 디자인 — 모바일에서 네비게이션이 숨겨지고 햄버거 버튼이 나타난다.
- [ ] **R3-9** 시각 효과 — 버튼, 카드에 `hover` 효과 + `transition` 적용
- [ ] **R3-10** 시각 효과 — 카드에 `box-shadow` 적용

#### R4. JavaScript 기초 (DOM & 이벤트)

- [ ] **R4-1** JavaScript 파일을 `defer` 속성으로 연결한다.
- [ ] **R4-2** `var` 대신 `const` , `let` 만 사용한다.
- [ ] **R4-3** HTML에 `onclick` 속성을 쓰지 않고, `addEventListener` 로 이벤트를 연결한다.
- [ ] **R4-4** DOM 조작 — `querySelector` , `querySelectorAll` 로 요소를 선택한다.
- [ ] **R4-5** DOM 조작 — `textContent` , `innerHTML` 로 내용을 변경한다.
- [ ] **R4-6** DOM 조작 — `classList.add` , `remove` , `toggle` 로 클래스를 조작한다.
- [ ] **R4-7** 이벤트 처리 — `click` , `submit` , `scroll` , `input` 이벤트를 다룬다.
- [ ] **R4-8** 이벤트 처리 — `event.preventDefault()` 로 기본 동작을 방지한다.

#### R5. 인터랙션 구현

다음 인터랙션이 **모두** 동작해야 한다.

- [ ] **R5-1** (원문 a) **햄버거 메뉴 토글**
  - 모바일에서 햄버거 버튼 클릭 시 메뉴가 나타난다.
  - 다시 클릭하면 메뉴가 사라진다.
  - `classList.toggle('active')` 활용
- [ ] **R5-2** (원문 b) **부드러운 스크롤**
  - 네비게이션 메뉴 클릭 시 해당 섹션으로 부드럽게 이동한다.
- [ ] **R5-3** (원문 c) **스크롤 탑 버튼**
  - 스크롤 **300px 이상**에서 버튼이 나타난다. *(기준값은 자유 변경 가능하나 README에 명시)*
  - 클릭 시 페이지 맨 위로 이동한다.
- [ ] **R5-4** (원문 d) **네비게이션 스타일 변경**
  - 스크롤 **60px 이상**에서 네비게이션 배경색이 변경된다. *(기준값은 자유 변경 가능하나 README에 명시)*
- [ ] **R5-5** (원문 e) **다크 모드**
  - 토글 버튼 클릭 시 테마가 전환된다.
  - 설정이 로컬스토리지에 저장되어 새로고침 후에도 유지된다.
- [ ] **R5-6** (원문 f) **스크롤 애니메이션**
  - Intersection Observer 임계값(threshold)은 **0.2 이상**을 권장한다. *(자유 변경 가능하나 README에 명시)*

> 💡 R5-3 / R5-4 / R5-6 의 세 임계값(**300px / 60px / 0.2**)은 "바꿔도 되지만 **바꾸든 안 바꾸든 README에 명시**"가 조건이다. 값 자체보다 *내가 정한 수치를 문서화했는가*가 채점 대상이다.

#### R6. 폼 UX

- [ ] **R6-1** Contact 섹션에 문의 폼이 존재한다. (**이름, 이메일, 메시지**)
- [ ] **R6-2** 필수값 검증이 존재한다. (빈 필드 제출 불가)
- [ ] **R6-3** 이메일 형식 검증이 존재한다.
- [ ] **R6-4** 에러 메시지가 **입력 필드 근처**에 표시된다.
- [ ] **R6-5** 제출 시 `event.preventDefault()` 로 기본 동작을 방지하고, **성공 메시지를 표시**한다.

> 💡 R6-4 의 "입력 필드 근처"는 `alert()` 나 페이지 상단 배너로는 만족하지 않는다는 뜻으로 읽는 것이 안전하다. 각 input 바로 아래에 에러 슬롯을 두는 구현이 의도에 맞다.

#### R7. ES6+ 문법 & 배열 메서드

- [ ] **R7-1** 화살표 함수를 적절히 활용한다.
- [ ] **R7-2** 템플릿 리터럴로 HTML을 동적으로 생성한다.
- [ ] **R7-3** 구조분해 할당으로 객체/배열에서 값을 추출한다.
- [ ] **R7-4** 배열 메서드 `map` : GitHub 데이터를 HTML 카드로 변환
- [ ] **R7-5** 배열 메서드 `filter` : 특정 조건의 프로젝트만 표시 **(선택)**
- [ ] **R7-6** 배열 메서드 `forEach` : 배열 순회

#### R8. 비동기 처리 & API 연동

- [ ] **R8-1** `fetch` 와 `async/await` 로 GitHub API를 호출한다.
- [ ] **R8-2** 엔드포인트: `https://api.github.com/users/{본인아이디}/repos`
- [ ] **R8-3** **로딩 상태**: 데이터 요청 중 스피너 또는 `"로딩 중..."` 텍스트
- [ ] **R8-4** **성공 상태**: 카드 리스트 렌더링
- [ ] **R8-5** **에러 상태**: `"프로젝트를 불러올 수 없습니다"` 메시지 + **재시도 버튼**
- [ ] **R8-6** **빈 상태**: `"표시할 프로젝트가 없습니다"` 메시지
- [ ] **R8-7** `try/catch` 로 에러를 처리한다.

#### R9. 상태 관리 패턴

- [ ] **R9-1** "사용자 이벤트 → 상태 변경 → 화면 업데이트" 흐름이 명확해야 한다.
- [ ] **R9-2** 다음 **3가지 이상**의 "상태 → 렌더링" 흐름이 존재해야 한다.

  | # | 원문 예시 |
  | --- | --- |
  | 예시 1 | 다크 모드 토글 → 테마 상태 변경 → 전체 화면 스타일 변경 |
  | 예시 2 | API 호출 → 로딩/성공/에러 상태 변경 → Projects 섹션 렌더링 변경 |
  | 예시 3 | 폼 입력 → 유효성 상태 변경 → 에러 메시지 표시/숨김 |
  | 예시 4 | 필터 버튼 클릭 → 필터 상태 변경 → 프로젝트 목록 변경 **(선택)** |

#### R10. 배포

- [ ] **R10-1** GitHub Pages로 배포한다.
- [ ] **R10-2** 배포된 URL에서 **모든 기능이 정상 동작**해야 한다.
  - 반응형 레이아웃
  - 인터랙션 (햄버거 메뉴, 다크 모드, 스크롤 등)
  - GitHub API 연동
  - 폼 유효성 검사
- [ ] **R10-3** README에 **프로젝트 설명, 사용 기술, 배포 URL, 스크린샷**이 포함되어야 한다.

---

### 0.5 보너스 과제 (선택)

#### 5. 보너스 과제 (선택) (원문)

- [ ] **B1. 프로젝트 필터링**
  - GitHub 프로젝트를 언어별로 필터링하는 버튼을 만든다.
  - `array.filter()` 활용
- [ ] **B2. 타이핑 효과**
  - Hero 섹션에 타자기처럼 한 글자씩 나타나는 효과를 구현한다.
- [ ] **B3. 폼 실제 전송**
  - Formspree 또는 EmailJS를 연동하여 실제 이메일을 전송한다.
- [ ] **B4. 시스템 다크 모드 감지**
  - `prefers-color-scheme` 미디어 쿼리로 시스템 설정을 감지한다.

> 💡 B1 을 구현하면 R7-5(`filter`)와 R9-2 예시 4를 동시에 채운다. 가성비가 가장 좋은 보너스다.
> 💡 B3 의 Formspree/EmailJS 는 보너스 절에서 **명시적으로 허용**된 예외다. R-개발환경의 "외부 라이브러리 금지"와 충돌하지 않는다.

---

### 0.6 개발 환경 · 제약 사항

#### 6. 개발 환경 (원문)

> ### ❌ 사용 금지
> - **React, Vue, jQuery, Bootstrap, Tailwind CSS 등 외부 라이브러리 사용 금지**
> - **순수 HTML, CSS, JavaScript만 사용**
>
> ### ✅ 허용
> - 아이콘(Font Awesome), 웹 폰트(Google Fonts)는 허용

#### 7. 제약 사항 (원문)

**핵심 목표:**
- UI 고퀄리티보다 **"이벤트 → 상태 → 렌더링" 흐름 이해 우선**
- React 학습 전 필수 개념(DOM 조작, 이벤트, 비동기)을 체득하는 것이 목적

**코드 스타일:**
- `var` 대신 `const` , `let` 사용
- HTML에 `onclick` 대신 `addEventListener` 사용
- **인라인 스타일( `style="..."` ) 사용 금지**

**브라우저:**
- 최신 Chrome 브라우저에서 정상 동작

**제출물:**
- GitHub 저장소 URL
- 배포된 사이트 URL (GitHub Pages)
- 데스크톱/모바일/다크모드 스크린샷

**GitHub API 주의사항:**
- 인증 없이 호출 시 **시간당 60회 제한(레이트 리밋)** 이 있으므로, 짧은 시간 내 반복 새로고침을 피한다.
- **레이트 리밋 발생 시(403 응답) 에러 상태 UI가 표시되도록 처리한다.**

> 💡 "인라인 스타일 금지"는 CSS 셀렉터뿐 아니라 **JS에서의 `element.style.xxx = ...` 직접 조작**까지 포함해 읽는 것이 과제 의도에 맞다. 스타일 변경은 `classList` / `data-theme` 속성 토글로 하고, 실제 색은 CSS 변수가 결정하게 한다. (단, 원문이 명시적으로 금지한 것은 HTML 속성 `style="..."` 이다 — 이 확장 해석은 추론이다.)
>
> 💡 레이트 리밋(403)은 "에러 상태 UI가 표시되도록 처리한다"가 **필수 처리 조건**이다. `fetch` 는 4xx/5xx 에서도 reject 하지 않으므로 `try/catch` 만으로는 403이 잡히지 않는다 → `response.ok` 를 직접 검사해야 R8-5/R8-7 을 실제로 만족한다.

---

### 0.7 결과/출력 예시

#### 8. 결과 예시 (원문)

> 아래는 정답이 아니라 참고 예시다. 디자인은 본인의 개성에 맞게 자유롭게 구성한다.

```
[데스크톱 화면]
+------------------------------------------------------------------+
| Logo                           Menu                         [D]  |  <- Header (Flex)
+------------------------------------------------------------------+
|                                                                  |
|                          Hello!                                  |
|                       I am [NAME].                               |  <- Hero
|                                                                  |
|                 [ View Projects ]   [ Contact ]                  |
|                                                                  |
+------------------------------------------------------------------+
| About Me                                                         |
|  +----------+  Intro text...                                     |
|  |  PHOTO   |  (skills / interests / short bio)                  |  <- About
|  +----------+                                                    |
+------------------------------------------------------------------+
| Projects (GitHub API)                                            |
|                                                                  |
|  +--------------+  +--------------+  +--------------+            |
|  | Repo 1        |  | Repo 2     |  | Repo 3        |            |
|  | Stars: 5      |  | Stars: 3   |  | Stars: 2      |            |
|  +--------------+  +--------------+  +--------------+            |
|                                                                  |
+------------------------------------------------------------------+
| Contact                                                          |
|  +------------------------------------------------------------+  |
|  | Name:    [____________________]                            |  |
|  | Email:   [____________________]                            |  |
|  | Message: [______________________________]                  |  |
|  |                          [ Send ]                          |  |
|  +------------------------------------------------------------+  |
+------------------------------------------------------------------+
| (C) 2026 [NAME]   |  GitHub  |  LinkedIn                         |
+------------------------------------------------------------------+
```

#### 상태별 UI 예시 (원문)

```
[상태별 UI 예시]
로딩 중:   Projects 섹션에 스피너가 보인다.
성공:      카드 리스트가 보인다.
에러:      "프로젝트를 불러올 수 없습니다. [다시 시도]" 버튼이 보인다.
빈 데이터: "표시할 프로젝트가 없습니다."가 보인다.
```

> 💡 (PDF 텍스트 추출 순서 주의) 원본 PDF 9페이지에서는 `[상태별 UI 예시]` 블록이 데스크톱 ASCII 레이아웃의 마지막 몇 줄(`[ Send ]` ~ 푸터)보다 앞에 추출된다. 위에서는 읽기 쉽도록 레이아웃을 이어 붙이고 상태 예시를 뒤로 옮겼다. **내용은 원문 그대로다.**
>
> 💡 예시 ASCII 에서 읽어낼 수 있는 구조 힌트: 헤더는 `Logo / Menu / [D](다크모드 토글)` 3요소의 Flex 배치, Projects 는 3열 카드 그리드이며 카드에 **레포 이름 + Stars 수**가 들어간다(= `name`, `stargazers_count` 필드 사용).

---

### 0.8 📚 이 과제가 공부하길 원하는 것 (학습 지도)

> 💡 아래 표는 전부 (해설)이다. 왼쪽 두 칸은 원문 요구사항에서 왔고, 오른쪽 두 칸은 "왜 이걸 시키는가"에 대한 해석 + 평가 체크리스트(`responsive_web_javascript.md`)의 질문을 녹인 것이다.

| 요구사항 | 표면적으로 시키는 일 | 실제로 학습시키려는 개념 | 스스로 답해볼 질문 |
| --- | --- | --- | --- |
| **R1-1, R1-2** | 폴더를 `css/ js/ images/` 로 나눠라 | **관심사의 분리(Separation of Concerns)**. 구조(HTML)·표현(CSS)·행위(JS)를 물리적으로 갈라놓아야 각각을 독립적으로 바꾸고 캐시할 수 있다. 이것이 나중에 컴포넌트 분리로 확장된다 | HTML/CSS/JS를 굳이 파일로 나눈 이유는? 한 파일에 다 넣으면 구체적으로 무엇이 곤란해지는가? 각 파일의 책임을 한 문장으로 말하면? |
| **R1-3** | Live Server를 쓴다 | `file://` 과 `http://` 의 차이 — **오리진(origin)과 CORS**. `file://` 로 열면 fetch·모듈·쿠키가 막힌다. 로컬 개발 서버가 왜 필요한지 몸으로 알게 하려는 장치 | `index.html` 을 더블클릭해서 열면 GitHub API 호출이 왜 실패할 수 있는가? Live Server가 실제로 하는 일은 무엇인가? |
| **R2-1, R2-2** | `div` 말고 `header/nav/main/section/article/footer` 를 써라 | **문서의 의미 구조(semantics)와 접근성 트리**. 스크린 리더·검색엔진·브라우저 리더모드는 태그 이름으로 문서를 이해한다. `section` 과 `article` 의 구분 기준(독립적으로 배포 가능한가)까지 | 내 페이지에서 `section` 과 `article` 을 어떤 기준으로 갈랐는가? `div` 로 다 해도 화면은 같은데 왜 안 되는가? |
| **R2-4, R2-5** | 모든 img에 alt, label은 for-id로 | **웹 접근성(a11y)**. `alt` 는 이미지가 없을 때의 대체 텍스트이자 스크린 리더의 유일한 단서. `label[for]` 은 클릭 영역 확대 + 스크린 리더가 입력칸의 이름을 읽게 해준다 | 장식용 이미지의 `alt` 는 뭐라고 써야 하는가? `label` 을 연결하면 마우스 사용자에게도 생기는 이득은? |
| **R3-2, R3-3** | `:root` 변수 + `[data-theme="dark"]` | **디자인 토큰과 단일 진실 공급원(SSOT)**. 색을 200군데에 흩어 쓰지 않고 변수 한 곳에서 정의하면, 테마 전환이 "변수 값 교체" 한 번으로 끝난다. 속성 셀렉터가 CSS 명시도와 캐스케이드를 통해 값을 덮어쓰는 원리 | CSS 변수로 관리하면 얻는 이점을 다크 모드 구현과 연결해 설명할 수 있는가? 다크 모드를 변수 없이 만들면 CSS가 몇 배로 늘어나는가? |
| **R3-4 vs R3-5** | 네비는 Flex, 카드 그리드는 Grid | **1차원 배치 vs 2차원 배치**. Flexbox는 한 축(주축)을 따라 아이템을 분배하는 도구, Grid는 행·열을 동시에 정의하는 도구. `auto-fit` + `minmax()` 는 미디어 쿼리 없이 열 개수를 자동 조절하는 *내재적 반응형* | 네비게이션을 Grid로, 카드를 Flex로 만들면 무엇이 불편해지는가? `auto-fit` 과 `auto-fill` 의 차이는? |
| **R3-6, R3-7** | 모바일 퍼스트 + 768/1024 | **점진적 향상(Progressive Enhancement)과 `min-width` 쿼리의 캐스케이드**. 작은 화면 스타일을 기본값으로 두면 덮어쓰기가 한 방향으로만 흘러 CSS가 단순해지고, 저사양 기기가 불필요한 스타일을 파싱하지 않는다 | 모바일 퍼스트로 쓴 이유는? `max-width` 쿼리로 반대로 쓰면 코드가 어떻게 복잡해지는가? |
| **R4-1** | `<script defer>` | **HTML 파싱과 스크립트 실행 순서**. 기본 `<script>` 는 파서를 멈추고, `defer` 는 파싱과 병렬로 내려받아 DOM 완성 후 실행한다. `defer` 없이 head에 넣으면 `querySelector` 가 `null` 을 반환하는 이유 | `defer` 를 빼면 왜 `Cannot read properties of null` 이 나는가? `async` 와 `defer` 의 차이는? |
| **R4-2** | `var` 금지, `const/let` | **스코프와 호이스팅, TDZ**. `var` 의 함수 스코프 + 호이스팅이 만드는 버그(반복문 클로저 문제)를 블록 스코프가 어떻게 제거하는지 | 반복문 안에서 `var i` 와 `let i` 로 이벤트를 걸면 결과가 왜 다른가? `const` 객체의 속성은 왜 바꿀 수 있는가? |
| **R4-3** | `onclick` 금지, `addEventListener` | **관심사 분리 + 다중 핸들러 + 이벤트 객체**. `onclick` 은 핸들러가 1개만 붙고 마크업에 로직이 섞인다. `addEventListener` 는 여러 개 등록·해제(`removeEventListener`)·캡처/버블 단계 선택이 가능하다 | 두 방식의 차이를 3가지 이상 들 수 있는가? 이벤트 위임(delegation)이 왜 동적 생성된 카드에 필요한가? |
| **R4-6, R5-1** | `classList.toggle('active')` | **상태를 클래스에 담는 패턴**. JS는 "상태 플래그"만 바꾸고 *어떻게 보일지*는 CSS가 결정한다 — 이것이 React의 `className={isOpen ? 'active' : ''}` 의 원형이다 | 햄버거 메뉴를 `style.display` 로 직접 제어하는 것과 클래스 토글의 차이는? 애니메이션을 붙이기 쉬운 쪽은? |
| **R4-7, R5-3, R5-4** | `scroll` 이벤트로 임계값 감시 | **고빈도 이벤트와 성능**. scroll은 초당 수십~수백 번 발생한다. 매번 DOM을 만지면 리플로우가 쌓인다 → 스로틀/디바운스, `requestAnimationFrame`, 그리고 애초에 scroll을 쓰지 않는 대안(IntersectionObserver) | 내 scroll 핸들러는 1초에 몇 번 실행되는가? 클래스가 이미 붙어 있는데도 매번 `add` 를 호출하고 있지 않은가? |
| **R5-6** | IntersectionObserver, threshold 0.2 | **브라우저가 대신 해주는 관찰**. 요소의 가시성 판정을 메인 스레드 계산(`getBoundingClientRect` 반복)에서 브라우저 내부로 넘기는 API. `threshold` 가 "요소의 몇 %가 보이면 콜백"인지의 의미 | threshold 0 / 0.2 / 1.0 은 각각 언제 발동하는가? 한 번 나타난 요소를 `unobserve` 해야 하는 이유는? |
| **R5-5 + R8** | 다크모드 저장 / API 호출 | **상태의 출처와 수명**. 상태는 (1)사용자 입력 (2)영속 저장소(localStorage) (3)원격 서버(fetch) 세 곳에서 온다. 셋의 신뢰도·지연·실패 가능성이 다르다는 감각 | 페이지 로드 직후 저장된 테마를 적용하기 전에 화면이 번쩍이는(FOUC) 현상은 왜 생기고 어떻게 막는가? localStorage에 값이 없는 첫 방문자는 어떤 테마가 되는가? |
| **R7-2, R7-4** | 템플릿 리터럴 + `map` 으로 카드 생성 | **데이터 → 뷰의 순수 변환**. `배열.map(데이터 => 마크업)` 은 정확히 React의 렌더 함수가 하는 일이다. 명령형 `createElement` 나열이 아니라 *선언적 매핑*으로 사고 전환 | GitHub 응답 배열이 카드 HTML 문자열이 되기까지의 단계를 순서대로 말할 수 있는가? `innerHTML` 로 외부 데이터를 넣을 때의 XSS 위험은? |
| **R7-3** | 구조분해 할당 | **필요한 필드만 꺼내 쓰는 인터페이스 축소**. `const { name, html_url, stargazers_count } = repo` 는 "이 함수가 쓰는 데이터는 이 3개뿐"이라는 계약을 코드로 선언하는 행위 | 구조분해를 쓰면 GitHub 응답 스키마가 바뀌었을 때 어디를 고치면 되는지가 왜 명확해지는가? 기본값(`= 0`)은 언제 필요한가? |
| **R8-1, R8-7** | `fetch` + `async/await` + `try/catch` | **비동기와 에러 경계**. 이벤트 루프·프라미스, 그리고 `fetch` 는 HTTP 에러(403/404)에 대해 reject 하지 않는다는 함정. `response.ok` 검사와 `throw` 로 에러 경로를 스스로 만들어야 한다 | 403 레이트 리밋이 떴을 때 내 `catch` 블록에 실제로 들어오는가? `await` 를 빼먹으면 화면에 무엇이 렌더되는가? |
| **R8-3 ~ R8-6** | 로딩/성공/에러/빈 4상태 UI | **유한 상태 기계(FSM)로서의 UI**. `isLoading` boolean 하나로는 "로딩 끝났는데 결과가 0개"와 "에러"를 구분할 수 없다. 상태를 `'idle'\|'loading'\|'success'\|'error'\|'empty'` 로 모델링하는 사고 | 로딩과 에러가 동시에 참이 되는 버그가 내 코드에서 가능한가? 재시도 버튼은 어떤 상태로 되돌리는가? |
| **R9-1, R9-2** | 3가지 이상 상태→렌더링 흐름 | **단방향 데이터 흐름(one-way data flow)**. `STATE` 객체를 단일 소스로 두고, 모든 이벤트는 STATE만 고치고, 모든 화면 갱신은 `render()` 만 한다. DOM을 상태 저장소로 쓰지 않는 규율 = React의 핵심 철학 | STATE 객체를 따로 둔 이유는? 그냥 전역 변수 여러 개로 하면 무엇이 무너지는가? 현재 테마를 알고 싶을 때 DOM을 읽고 있지는 않은가? |
| **R10-1, R10-2** | GitHub Pages 배포 | **개발 환경과 운영 환경의 차이**. 정적 호스팅의 경로 해석(서브디렉터리 base path), 대소문자 구분 파일시스템, HTTPS 혼합 콘텐츠, 브라우저 캐시 | 로컬에서 되던 `/css/style.css` 가 Pages에서 404 나는 이유는? 배포 후 변경이 반영 안 될 때 먼저 의심할 것은? |
| **개발환경 제약** | React/Bootstrap 금지 | **추상화 아래를 먼저 보게 하는 교육 설계**. 프레임워크가 제공하는 편의(상태 바인딩, 그리드 시스템)를 직접 구현해 봐야 그 프레임워크가 *무슨 문제를 푸는 도구인지* 알 수 있다 | 내가 손으로 만든 `render()` 함수와 React의 재렌더링은 무엇이 같고 무엇이 다른가? Bootstrap 없이 그리드를 짜보니 Bootstrap이 대신 해주던 일은 무엇이었나? |

---

### 0.9 자주 놓치는 함정

> 💡 이 절 전체는 (해설)이다. 명세를 빠르게 읽으면 놓치기 쉬운 조건들을 모았다.

1. **"기준값은 자유 변경 가능하나 README에 명시"** — R5-3(300px), R5-4(60px), R5-6(threshold 0.2)은 *값을 바꿀 자유*가 아니라 *문서화 의무*가 핵심 조건이다. 기본값을 그대로 썼더라도 README에 세 수치를 적어야 요구를 만족한다.

2. **에러 상태에는 "재시도 버튼"이 같이 요구된다** — R8-5 원문은 `"프로젝트를 불러올 수 없습니다"` 메시지 **+ 재시도 버튼**이다. 메시지만 띄우고 끝내면 절반만 한 것이다. 결과 예시에도 `[다시 시도]` 가 명시돼 있다.

3. **빈 상태(R8-6)와 에러 상태(R8-5)는 다른 상태다** — 레포가 0개인 계정과 API가 실패한 경우는 화면 문구가 다르다(`"표시할 프로젝트가 없습니다"` vs `"프로젝트를 불러올 수 없습니다"`). 4상태를 전부 만들지 않으면 R8은 미충족이다. 원문 문구를 그대로 쓰는 것이 가장 안전하다.

4. **`fetch` 는 403에서 예외를 던지지 않는다** — 제약 사항이 "레이트 리밋 발생 시(403 응답) 에러 상태 UI가 표시되도록 처리한다"를 못 박아 두었다. `try/catch` 만 있고 `if (!response.ok) throw ...` 가 없으면, 403이 왔을 때 JSON 파싱 결과가 배열이 아니어서 엉뚱한 빈 화면이나 런타임 에러가 난다.

5. **인라인 스타일 금지의 범위** — 금지 대상은 HTML의 `style="..."` 속성이다. 다크 모드를 `body.style.backgroundColor = '#000'` 처럼 JS로 직접 칠하는 것도 이 조항의 정신(R3-3의 `[data-theme="dark"]` 변수 방식)에 어긋난다. 테마 전환은 **`data-theme` 속성 토글 + CSS 변수 교체**로 하는 것이 의도된 구현이다.

6. **`filter` 는 "(선택)"이지만 `map`·`forEach` 는 필수** — R7-4/R7-6은 필수, R7-5만 선택이다. 반대로 읽어서 `filter` 만 구현하고 `forEach` 를 빠뜨리는 실수가 나온다.

7. **스크린샷은 3종, 그리고 README에 들어가야 한다** — 제출물 조항(데스크톱/모바일/다크모드)과 R10-3(README에 스크린샷 포함)은 별개 문장이지만 실질적으로 "README 안에 3장"을 요구한다.

8. **`article` 태그** — R2-1이 나열한 시맨틱 태그 목록에 `<article>` 이 포함돼 있다. `header/nav/main/section/footer` 만 쓰고 `article` 을 한 번도 안 쓰면 목록을 다 채우지 못한 것이다. GitHub 레포 카드 하나하나가 `<article>` 의 자연스러운 후보다.

9. **`input` 이벤트도 다뤄야 한다** — R4-7은 `click`, `submit`, `scroll`, `input` 네 가지를 명시한다. 폼을 submit 시점에만 검증하면 `input` 이벤트를 쓰지 않게 된다. 실시간 검증(입력 중 에러 해제)을 넣으면 R4-7과 R9-2 예시 3을 동시에 만족한다.

10. **"모든 기능이 정상 동작"은 배포 URL 기준이다(R10-2)** — 로컬에서만 검증하고 끝내면 안 된다. 배포 후 모바일 폭·다크모드·API 호출·폼 검증을 실제 Pages URL에서 다시 한 번 확인해야 한다.

### 0.10 ✅ 과제 수행 점검 (명세 대조)

> 점검 방식: 저장소의 실제 소스를 명세의 요구사항 ID 와 1:1 대조. 판정 근거는 파일 경로로 명시.
> 대상 저장소: `/home/coder/volume/codyssey_B4-1` (브랜치 `master`, HEAD `97c312a`) — 읽기 전용으로만 점검했다.

**종합 판정: 대체로 충족** — 필수 65개 중 충족 57 / 부분 5 / 미충족 0 / 로컬검증불가 3

핵심만 먼저: **코드 요구(R2~R9)는 사실상 전부 구현돼 있다.** 남은 격차는 전부 "제출물/자산" 쪽이다 —
① README 스크린샷 3장이 실제 파일로 존재하지 않아 링크가 깨진다, ② About 의 "프로필 이미지"가 `<img>` 가 아니라 Font Awesome 아이콘이라 페이지에 `<img>` 태그가 0개다, ③ 배포는 워크플로/URL 기재까지만 확인 가능하다.

#### R1. 프로젝트 기본 구성

| ID | 요구사항 (요약) | 판정 | 근거 / 비고 |
| --- | --- | --- | --- |
| R1 | 프로젝트 기본 구성 (묶음) | ✅ 충족 | 하위 항목 근거 참조 |
| R1-1 | `index.html` / `css/` / `js/` / `images/` 역할 분리 | ✅ 충족 | 루트 `index.html`, `css/` 14개, `js/` 11개, `images/` 존재. 단 `images/`에는 자리표시 문서만 있음(`images/README.md:1-3`) |
| R1-2 | 외부 CSS·JS 를 HTML 에 올바르게 연결 | ✅ 충족 | `index.html:39`(`css/style.css`), `index.html:47-67`(11개 스크립트). 참조 경로 12건 전부 실재 확인(실행 검증 기록 참조) |
| R1-3 | VS Code + Live Server 개발 환경 구성 | ⬜ 로컬 검증 불가 | 저장소에 `.vscode/` 설정 없음. 대체 증거는 `README.md:707-122` 절차 문서뿐 → **증거 충분성: 보통**. 같은 절에 "`index.html` 을 그대로 브라우저로 열어도 됩니다"(`README.md:712`)가 있어, `file://` 과 `http://` 차이를 묻는 과제 의도(0.8 학습지도)와는 다소 어긋남 |

#### R2. HTML 구조 (시맨틱 마크업)

| ID | 요구사항 (요약) | 판정 | 근거 / 비고 |
| --- | --- | --- | --- |
| R2 | 시맨틱 마크업 (묶음) | 🟡 부분 충족 | R2-2(프로필 이미지)·R2-4(img 부재)로 감점 |
| R2-1 | `header/nav/main/section/article/footer` 사용 | ✅ 충족 | 파싱 결과 header 5 · nav 1 · main 1 · section 5 · article 1 · footer 1. `index.html:72`(header) `:74`(nav) `:125`(main) `:128,167,215,230,254`(section) `:175`(article) `:335`(footer). 동적 카드도 `<article>`: `js/projects.js:183` |
| R2-2 | Hero/About/Skills/Projects/Contact/Footer 섹션 + 각 포함 내용 | 🟡 부분 충족 | Hero 인사말·CTA `index.html:132,148-157`, Skills `:222`, Projects `:246`, Contact 폼 `:266`, Footer 저작권+소셜 `:338-369` 모두 있음. **About 의 "프로필 이미지"만 미구현** — 실제 사진 대신 아이콘 아바타(`index.html:177-182`, `css/about.css:23-33`) |
| R2-3 | 네비게이션 앵커 링크 | ✅ 충족 | `index.html:85-89` 5개 링크 → 섹션 id(`hero/about/skills/projects/contact`)와 전부 매칭됨(파싱 확인) |
| R2-4 | 모든 이미지에 의미있는 `alt` | 🟡 부분 충족 | 페이지에 `<img>` 가 **0개**라 검증 대상 자체가 없음(파싱 확인). 반면 `README.md:751` 의 스크린샷 3장은 파일 부재로 깨진 이미지. `css/base.css:42-45` 에 img 반응형 기본값만 준비돼 있음 |
| R2-5 | `<label for>` ↔ input id 연결 | ✅ 충족 | `index.html:269/272`, `:285/287`, `:300/302` — for(`name`,`email`,`message`) 3쌍 모두 id 와 매칭됨(파싱 확인) |

#### R3. CSS 스타일링 (레이아웃 & 반응형)

| ID | 요구사항 (요약) | 판정 | 근거 / 비고 |
| --- | --- | --- | --- |
| R3 | CSS 스타일링 (묶음) | ✅ 충족 | 하위 10개 전부 충족 |
| R3-1 | 외부 스타일시트 `css/style.css` | ✅ 충족 | `index.html:39` → `css/style.css:22-46` 이 13개 파일을 `@import`(전부 실재 확인) |
| R3-2 | `:root` 변수로 색상·폰트·간격 정의 | ✅ 충족 | `css/tokens.css:11-59` — 색 `:13-28`, 간격 `:31-39`, 폰트 `:49-52` |
| R3-3 | 다크 모드 변수 `[data-theme="dark"]` | ✅ 충족 | `css/tokens.css:63-78` (색 토큰만 재정의, 간격·타입은 상속) |
| R3-4 | 네비게이션 Flexbox (로고 좌 / 메뉴 우) | ✅ 충족 | `css/header.css:33-38` (`display:flex; justify-content:space-between`), 액션 묶음 `:106-110` |
| R3-5 | Projects 카드 Grid `auto-fit` + `minmax` | ✅ 충족 | `css/projects.css:45-46` `repeat(auto-fit, minmax(280px, 1fr))`. Skills 도 동일 기법 `css/skills.css:10` |
| R3-6 | 모바일 퍼스트 | ✅ 충족 | 미디어쿼리가 전부 `min-width` — `css/responsive.css:11,53` (`max-width` 쿼리 0건, grep 확인). 기본값이 모바일: `css/header.css:64-67`, `css/about.css:10-14` |
| R3-7 | 브레이크포인트 768 / 1024 | ✅ 충족 | `css/responsive.css:11`(768) `:53`(1024) — 명세 수치와 정확히 일치 |
| R3-8 | 모바일에서 네비 숨김 + 햄버거 노출 | ✅ 충족 | 기본 `.nav__menu{display:none}` `css/header.css:64-67`, 768px↑ 에서 메뉴 노출·햄버거 숨김 `css/responsive.css:18-38`, 열림 패널 `css/header.css:168-181` |
| R3-9 | 버튼·카드 hover + transition | ✅ 충족 | 버튼 `css/buttons.css:17,30,42`, 카드 `css/projects.css:60-70`, 스킬 `css/skills.css:22,28`, 푸터 소셜 `css/footer.css:42,48` (전 CSS hover 11건 / transition 16건) |
| R3-10 | 카드 `box-shadow` | ✅ 충족 | `css/projects.css:59`(기본) `:68`(hover 강화), 토큰 `css/tokens.css:24-26` |

#### R4. JavaScript 기초 (DOM & 이벤트)

| ID | 요구사항 (요약) | 판정 | 근거 / 비고 |
| --- | --- | --- | --- |
| R4 | JS 기초 (묶음) | ✅ 충족 | 하위 8개 전부 충족 |
| R4-1 | `defer` 로 JS 연결 | ✅ 충족 | `index.html:47-67` — `<script>` 11개 **전부** `defer`(파싱: defer 11 / script 11) |
| R4-2 | `var` 금지, `const`/`let` 만 | ✅ 충족 | `grep -rnE '(^\|[^a-zA-Z_.$])var\s+' js/` → **0건**. 모든 파일 `'use strict'` 선언(예: `js/config.js:12`) |
| R4-3 | `onclick` 금지, `addEventListener` | ✅ 충족 | HTML 인라인 핸들러 0건(grep `on(click\|submit\|change\|input\|load)=`), `addEventListener` 12건 — `js/menu.js:19`, `js/scroll.js:20,36,43`, `js/contact.js:39,44,52`, `js/theme.js:30`, `js/projects.js:108,149`, `js/main.js:19` |
| R4-4 | `querySelector` / `querySelectorAll` | ✅ 충족 | 래퍼 정의 `js/config.js:35-37`, 사용처 `js/projects.js:33-34`, `js/navspy.js:18-19`, `js/contact.js:33,35,38` 등 |
| R4-5 | `textContent` / `innerHTML` 로 내용 변경 | ✅ 충족 | textContent `js/main.js:21`, `js/typing.js:21,27`, `js/contact.js:157` / innerHTML `js/projects.js:90,100,114,137,174`, `js/skills.js:30` |
| R4-6 | `classList.add/remove/toggle` | ✅ 충족 | toggle `js/menu.js:20-21`·`js/scroll.js:24-28`·`js/navspy.js:28-31`·`js/contact.js:156`, add `js/reveal.js:25`·`js/main.js:26`, remove `js/menu.js:30-31` |
| R4-7 | `click` · `submit` · `scroll` · `input` 이벤트 | ✅ 충족 | click `js/menu.js:19`, submit `js/contact.js:52`, scroll `js/scroll.js:20`, input `js/contact.js:44` (+ blur `:39` 로 실시간 검증까지) |
| R4-8 | `event.preventDefault()` | ✅ 충족 | `js/contact.js:53`(폼 새로고침 방지), `js/scroll.js:48`(앵커 점프 방지 후 smooth) |

#### R5. 인터랙션 구현

| ID | 요구사항 (요약) | 판정 | 근거 / 비고 |
| --- | --- | --- | --- |
| R5 | 인터랙션 (묶음) | ✅ 충족 | 6종 전부 구현 + 임계값 3종 README 명시 |
| R5-1 | 햄버거 토글 (`classList.toggle`) | ✅ 충족 | `js/menu.js:19-24` — 토글 + `aria-expanded`/`aria-label` 갱신, 링크 클릭 시 자동 닫힘 `:27-35`. 클래스명은 명세 예시 `active` 대신 `is-open`(기법은 동일, `README.md:631` 에 명시) |
| R5-2 | 부드러운 스크롤 | ✅ 충족 | JS `js/scroll.js:42-50`(`scrollIntoView({behavior:'smooth'})`) + CSS `css/base.css:18-19`(`scroll-behavior:smooth`, `scroll-padding-top`) |
| R5-3 | 스크롤 300px↑ 에서 탑 버튼 노출 + README 명시 | ✅ 충족 | 값 `js/config.js:24`(300) → `js/scroll.js:25-28`, 노출 CSS `css/widgets.css:20-34`, 클릭 `js/scroll.js:36-38`. README 명시 `README.md:633`, `README.md:762` |
| R5-4 | 스크롤 60px↑ 에서 네비 배경 변경 + README 명시 | ✅ 충족 | 값 `js/config.js:26`(60) → `js/scroll.js:24`, 스타일 `css/header.css:26-30`. README 명시 `README.md:634`, `README.md:763` |
| R5-5 | 다크 모드 토글 + localStorage 유지 | ✅ 충족 | `js/theme.js:40-44`(토글·저장), `:23,28`(복원), `:49`(`html[data-theme]` 반영), 키 `js/config.js:30` |
| R5-6 | Intersection Observer threshold 0.2 + README 명시 | ✅ 충족 | `js/config.js:28`(0.2) → `js/reveal.js:30`, 1회 노출 후 `unobserve` `:26`. README 명시 `README.md:636`, `README.md:764` |

#### R6. 폼 UX

| ID | 요구사항 (요약) | 판정 | 근거 / 비고 |
| --- | --- | --- | --- |
| R6 | 폼 UX (묶음) | ✅ 충족 | 하위 5개 전부 충족 |
| R6-1 | 이름·이메일·메시지 문의 폼 | ✅ 충족 | `index.html:266-310` (`name`/`email`/`message`, `novalidate` 로 직접 검증) |
| R6-2 | 필수값 검증 | ✅ 충족 | `js/contact.js:129-131` + 전체 검증 `:68-79` |
| R6-3 | 이메일 형식 검증 | ✅ 충족 | `js/contact.js:132-134`, 정규식 `:141-143` |
| R6-4 | 에러 메시지를 입력 필드 근처에 표시 | ✅ 충족 | 필드별 슬롯 `index.html:280,295,309`(`<small data-error-for>`), 렌더 `js/contact.js:151-158`, 스타일 `css/form.css:48-58`. `alert()` 미사용 |
| R6-5 | `preventDefault()` + 성공 메시지 | ✅ 충족 | `js/contact.js:53` + 성공 배너 `index.html:318-321` / `js/contact.js:161-162`, 성공 처리 `:114-123`(리셋·5초 후 자동 숨김) |

#### R7. ES6+ 문법 & 배열 메서드

| ID | 요구사항 (요약) | 판정 | 근거 / 비고 |
| --- | --- | --- | --- |
| R7 | ES6+ (묶음) | ✅ 충족 | 하위 6개 전부 충족(R7-5 선택 포함) |
| R7-1 | 화살표 함수 | ✅ 충족 | `js/config.js:35-37`, `js/main.js:19,24`, `js/projects.js:68,134,162`, `js/contact.js:72,74` |
| R7-2 | 템플릿 리터럴로 HTML 생성 | ✅ 충족 | `js/projects.js:182-204`(카드), `:90-94`(로딩) `:100-107`(에러) `:114-118`(빈), `js/skills.js:32-36` |
| R7-3 | 구조분해 할당 | ✅ 충족 | `js/projects.js:175-182`(name·description·html_url·stargazers_count·forks_count·language), `js/theme.js:48`, `js/contact.js:148`, `js/skills.js:32` |
| R7-4 | `map` 으로 GitHub 데이터 → 카드 | ✅ 충족 | `js/projects.js:174-205`, 필터 버튼 `:137-146` |
| R7-5 | `filter` (선택) | ✅ 충족 | `js/projects.js:68`(fork 제외), `:134`(언어 null 제거), `:162`(언어 필터) |
| R7-6 | `forEach` | ✅ 충족 | `js/main.js:24`, `js/menu.js:27`, `js/contact.js:72,151`, `js/reveal.js:38`, `js/navspy.js:24,27` |

#### R8. 비동기 처리 & API 연동

| ID | 요구사항 (요약) | 판정 | 근거 / 비고 |
| --- | --- | --- | --- |
| R8 | 비동기·API (묶음) | ✅ 충족 | 4상태 + 403 처리까지 구현 |
| R8-1 | `fetch` + `async/await` | ✅ 충족 | `js/projects.js:45`(async) `:50`(await fetch) `:64`(await json) |
| R8-2 | `https://api.github.com/users/{id}/repos` | ✅ 충족 | `js/projects.js:49` — `…/users/${CONFIG.GITHUB_USERNAME}/repos?sort=updated&per_page=100`, 계정명 `js/config.js:17`(`ashofrondol`) |
| R8-3 | 로딩 상태(스피너/문구) | ✅ 충족 | `js/projects.js:88-95` 스피너 + "프로젝트를 불러오는 중입니다...", 스피너 CSS `css/projects.css:171` |
| R8-4 | 성공 상태(카드 리스트) | ✅ 충족 | `js/projects.js:122-125` → `renderCards()` `:156-208` |
| R8-5 | 에러 문구 + **재시도 버튼** | ✅ 충족 | `js/projects.js:98-109` — "프로젝트를 불러올 수 없습니다." + `#retryBtn` 생성, 클릭 시 `fetchRepos()` 재호출 `:108` |
| R8-6 | 빈 상태 "표시할 프로젝트가 없습니다" | ✅ 충족 | `js/projects.js:71-74`(상태 전환) `:112-119`(문구). 명세 문구와 동일 |
| R8-7 | `try/catch` 에러 처리 | ✅ 충족 | `js/projects.js:48,77-80`. **`res.ok` 직접 검사**로 403/404 를 `throw` 하여 catch 로 유도 `:54-62` — 명세 0.9-4 함정 회피 확인. 403 전용 문구 `:56`, README 설명 `README.md:768-184` |

#### R9. 상태 관리 패턴

| ID | 요구사항 (요약) | 판정 | 근거 / 비고 |
| --- | --- | --- | --- |
| R9 | 상태 관리 (묶음) | ✅ 충족 | 3개 모듈이 동일 패턴으로 통일됨 |
| R9-1 | 이벤트 → 상태 → 화면 흐름이 명확 | ✅ 충족 | 세 모듈 모두 `state` + `setState()`(유일 통로) + `render()`: `js/theme.js:16-58`, `js/projects.js:21-126`, `js/contact.js:23-175`. DOM 을 상태 저장소로 쓰지 않음 |
| R9-2 | "상태 → 렌더링" 흐름 3가지 이상 | ✅ 충족 | ① 테마 `js/theme.js:40-49` ② API 4상태 `js/projects.js:45-126` ③ 폼 검증 `js/contact.js:39-49,147-174` ④(선택) 언어 필터 `js/projects.js:148-152,159-162`. README 표 `README.md:655-70` |

#### R10. 배포

| ID | 요구사항 (요약) | 판정 | 근거 / 비고 |
| --- | --- | --- | --- |
| R10 | 배포 (묶음) | 🟡 부분 충족 | 배포 경로는 갖췄으나 스크린샷 자산 부재 |
| R10-1 | GitHub Pages 배포 | ⬜ 로컬 검증 불가 | 대체 증거: `.github/workflows/static.yml:1-43`(Actions 기반 Pages 배포, `on.push.branches: ["master"]` 이고 저장소 현재 브랜치도 `master` → 트리거 일치), README URL `README.md:602`. **증거 충분성: 양호**(워크플로 + URL). 실제 Pages 활성화/응답은 네트워크 없이 확인 불가 |
| R10-2 | 배포 URL 에서 모든 기능 정상 동작 | ⬜ 로컬 검증 불가 | 정적 경로는 안전: 절대경로(`href="/…"`) 0건, 모든 참조가 상대경로라 `/<repo>/` 서브경로 배포에서도 깨지지 않음(`index.html:39,47-67`, `css/style.css:22-46`). 다만 **배포본에서 동작을 확인했다는 증거(스크린샷·기록)가 저장소에 없음** → 증거 충분성: 부족 |
| R10-3 | README 에 설명·기술·URL·스크린샷 | 🟡 부분 충족 | 설명 `README.md:1-4`, 사용 기술 `README.md:607-27`, 배포 URL `README.md:598-13`(단 백틱 코드 표기라 클릭 가능한 링크 아님), **스크린샷 `README.md:745-161` 은 `images/screenshot-{desktop,mobile,dark}.png` 를 참조하지만 3개 모두 파일 부재**(실행 검증으로 확인). `images/` 에는 자리표시 `README.md` 만 존재 |

#### 제출물 체크리스트 (명세 0.2)

| 항목 | 판정 | 근거 / 비고 |
| --- | --- | --- |
| GitHub 저장소 URL | ✅ 충족 | `README.md:603` / `git remote -v` → `https://github.com/ashofrondol/codyssey_B4-1.git` |
| 배포 사이트 URL (Pages) | ⬜ 로컬 검증 불가 | `README.md:602` 기재(`https://ashofrondol.github.io/codyssey_B4-1/`), 접속 확인 불가 |
| 데스크톱/모바일/다크모드 스크린샷 3종 | ❌ 미충족 | `images/` 에 이미지 파일 0개(`ls images/` → `README.md` 뿐), README 링크 3건 모두 깨짐 |

#### 보너스 과제

| ID | 요구사항 (요약) | 판정 | 근거 / 비고 |
| --- | --- | --- | --- |
| B1 | 언어별 프로젝트 필터 (`filter`) | ✅ 충족 | 버튼 렌더 `js/projects.js:129-153`(`Set` 으로 언어 중복 제거), 필터링 `:159-162`, 필터 결과 0건 안내 `:164-171`, 스타일 `css/projects.css:19-41`. R7-5·R9-2 예시4 를 동시에 채움 |
| B2 | Hero 타이핑 효과 | ✅ 충족 | `js/typing.js:16-33`(90ms 간격 재귀 `setTimeout`), 대상 `index.html:137`, 커서 `index.html:139` + `css/hero.css` 깜빡임 |
| B3 | 폼 실제 전송 (Formspree/EmailJS) | ✅ 충족 | 엔드포인트 `js/config.js:22`(`https://formspree.io/f/xykarqqq` — 플레이스홀더 아님), POST `js/contact.js:96-110`, 미설정 시 데모 모드 폴백 `:82-91`. 실제 메일 도달 여부는 네트워크 없이 검증 불가 |
| B4 | 시스템 다크 모드 감지 (`prefers-color-scheme`) | ✅ 충족 | `js/theme.js:24-28` — `matchMedia('(prefers-color-scheme: dark)')` 로 저장값 없을 때 시스템 설정 적용. 다만 CSS 쪽 `@media (prefers-color-scheme: dark)` 는 없고, 시스템 설정이 런타임에 바뀔 때의 `change` 리스너도 없음(최초 1회 판정) |

#### 🔍 발견된 격차와 보완 제안

1. **[중요] README 스크린샷 3장이 실제로 없다 (R10-3 · 제출물 체크리스트)**
   - 무엇이 부족한가: `README.md:751` 이 `images/screenshot-desktop.png` / `-mobile.png` / `-dark.png` 를 참조하는데 `images/` 에는 `README.md` 자리표시 문서만 있다. GitHub 에서 보면 깨진 이미지 3개로 표시된다. 명세는 "데스크톱/모바일/다크모드" 3종을 명시적으로 요구한다.
   - 어떻게 고치는가: 배포 URL 을 열어 (a) 데스크톱 폭, (b) 개발자도구 모바일 폭(예: 390×844), (c) 다크 모드 상태를 각각 캡처해 정확히 그 3개 파일명으로 `images/` 에 넣는다. 파일을 넣고 나면 `images/README.md` 자리표시 문서는 지워도 된다.

2. **[중요] About 의 "프로필 이미지"가 `<img>` 가 아니다 (R2-2 · R2-4)**
   - 무엇이 부족한가: `index.html:177-182` 는 Font Awesome 아이콘 아바타다. 페이지 전체에 `<img>` 태그가 0개라, "프로필 이미지"(R2-2)와 "모든 이미지에 의미있는 alt"(R2-4)를 코드로 증명할 수단이 없다. 저장소 자체 자가점검 문서도 같은 지적을 하고 있다(`docs/evaluation-answers.html` 부록 4번).
   - 어떻게 고치는가: `images/profile.jpg` 를 추가하고 `.about__photo` 안에 `<img src="images/profile.jpg" alt="JeongSeYoung 프로필 사진" width="180" height="180" class="about__avatar-img">` 를 넣는다. 아이콘 아바타는 이미지 로드 실패 시의 폴백으로 남겨도 된다. `css/base.css:42-45` 에 img 기본값이 이미 있으니 CSS 추가는 최소면 충분하다.

3. **[중요] 배포본에서의 동작 확인 증거가 없다 (R10-2)**
   - 무엇이 부족한가: 경로는 전부 상대경로라 서브경로 배포에서 깨질 위험은 낮지만, "배포 URL 에서 모든 기능이 정상 동작"했다는 확인 기록이 저장소에 없다. 위 1번 스크린샷이 사실상 이 증거를 겸한다.
   - 어떻게 고치는가: Pages URL 에서 ① 햄버거 메뉴 ② 다크 모드 새로고침 유지 ③ GitHub API 카드 ④ 폼 검증 4가지를 확인한 스크린샷을 README 에 넣고, 확인 날짜를 한 줄 적는다.

4. **[경미] 배포 URL 이 링크가 아니라 코드 표기다 (R10-3)**
   - `README.md:602-13` 이 백틱으로 감싸여 있어 클릭이 안 된다. `[https://ashofrondol.github.io/codyssey_B4-1/](https://ashofrondol.github.io/codyssey_B4-1/)` 형태의 마크다운 링크로 바꾸면 채점자가 바로 열 수 있다.

5. **[경미] Live Server 요구(R1-3)의 증거가 문서 한 곳뿐이고, 설명이 과제 의도와 어긋난다**
   - `README.md:712` 의 "`index.html` 을 그대로 브라우저로 열어도 됩니다"는 `file://` 과 `http://` 의 차이(CORS·오리진)를 체감시키려는 과제 의도(명세 0.8 R1-3 행)와 반대 방향의 안내다. `.vscode/settings.json`(예: `liveServer.settings.port`)을 커밋하고, README 에 "`file://` 로 열면 fetch 가 막힐 수 있어 Live Server 를 권장한다" 한 줄을 덧붙이면 요구와 의도를 모두 만족한다.

6. **[경미] 보조 문서 `docs/code-guide.html` 에 인라인 `style="…"` 이 다수 있다**
   - 제약 "인라인 스타일 금지"의 대상인 **제출물 `index.html` 에는 인라인 style 이 0건**이고 JS 의 `element.style.*` 직접 조작도 0건이라 본 요구는 지켜졌다. 다만 워크플로가 저장소 전체(`path: '.'`)를 배포하므로 `docs/code-guide.html:169,171,217-233,254-294` 등도 함께 게시된다. 채점자가 저장소 전체를 grep 하면 걸릴 수 있으니, 해당 인라인 스타일을 그 문서의 `<style>` 블록으로 옮겨두면 오해의 소지가 사라진다.

7. **[경미] 코드 품질상 눈에 띈 것 2가지 (요구사항 위반은 아님)**
   - `js/projects.js:197` — 카드 링크의 `href="${html_url}"` 만 `escapeHtml()` 을 거치지 않는다(이름·설명·언어는 `:186,189,194` 에서 이스케이프됨). GitHub 이 주는 값이라 실제 위험은 낮지만, 일관성을 위해 동일하게 감싸는 편이 낫다.
   - `docs/evaluation-answers.html:232` 가 `index.html` 의 줄 번호(header 28 · nav 29 · main 68 …)를 인용하는데, 이후 주석이 대량 추가되면서 실제 줄 번호(header 72 · nav 74 · main 125 …)와 어긋났다. 구술 평가에서 줄 번호를 짚어 설명하라는 게 과제 목표(명세 0.3)이므로 갱신해두는 편이 안전하다.

#### 🧪 실행 검증 기록

실행한 것 (모두 읽기 전용, 네트워크·설치 없음, 저장소 무변경):

1. 구조 파악 — `find /home/coder/volume/codyssey_B4-1 -not -path '*/.git/*'`, `wc -l` (파일 31개: HTML 1 · CSS 14 · JS 11 · 문서 3 · 워크플로 1)
2. 제약 위반 grep
   - `grep -rnE '(^|[^a-zA-Z_.$])var\s+[a-zA-Z_$]' js/` → **0건** (R4-2 통과)
   - `grep -rniE 'on(click|submit|change|input|load)\s*=' index.html` → **0건** (R4-3 통과)
   - `grep -rn 'style="' index.html js/` → **0건** / `grep -rn '\.style\.' js/` → **0건** (인라인 스타일 금지 통과). `docs/code-guide.html` 에서만 다수 검출
   - `grep -rn '@media' css/` → `min-width:768`, `min-width:1024`, `prefers-reduced-motion` 3건뿐, `max-width` 쿼리 0건 (R3-6/R3-7 통과)
   - 외부 라이브러리: `index.html` 의 외부 로드는 Google Fonts(`:22-29`)와 Font Awesome CSS(`:33-36`) 뿐 — 명세가 허용한 두 예외에 해당. React/Vue/jQuery/Bootstrap/Tailwind 로드 0건
3. HTML 구조 파싱 — `python3` 표준 라이브러리 `html.parser` 로 `index.html` 파싱 (스크립트: 스크래치패드 `work/check.py`)
   - 결과: `{'header': 5, 'nav': 1, 'main': 1, 'section': 5, 'article': 1, 'footer': 1}` / `label for = ['name','email','message'] → 모두 id 와 매칭 True` / `img 태그 = []` / `script defer 11 / script 총 11` / 섹션 id `['hero','about','skills','projects','contact']` 와 앵커 href 일치
4. 참조 무결성 검사 — `python3` 로 HTML·CSS·README 의 로컬 참조 경로 존재 여부 확인
   - HTML 참조 12건 전부 존재(True), `css/style.css` 의 `@import` 13건 전부 존재(True)
   - **README 이미지 3건 전부 부재(False)**: `images/screenshot-desktop.png`, `images/screenshot-mobile.png`, `images/screenshot-dark.png`
5. 배포 설정 대조 — `git branch -a` → 현재 `master`, `.github/workflows/static.yml:7` 트리거 `["master"]` 로 **일치**. `git status --short` → 변경 없음(점검 중 저장소를 수정하지 않았음을 확인)

실행하지 않은 것과 이유:

- **JS 문법 검사(`node --check`) 미실행** — 이 환경에 `node` 가 설치돼 있지 않고(`which node` 실패), 설치는 금지돼 있다. 대신 전 파일을 눈으로 읽어 구조를 확인했다.
- **브라우저 동작 검증 미실행** — 헤드리스 브라우저가 없어 햄버거 토글·다크 모드·스크롤 애니메이션·IntersectionObserver 동작은 코드 판독으로만 판정했다.
- **GitHub API / Formspree / Pages URL 호출 미실행** — 네트워크 사용 금지. R10-1·R10-2·B3 의 실제 동작을 ⬜ 로 둔 이유다.
- **테스트 코드 실행 없음** — 저장소에 테스트가 존재하지 않는다(과제 요구사항에도 없음).

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
