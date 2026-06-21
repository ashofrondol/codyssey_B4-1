/* ================================================================
   contact.js — Contact 폼  (객체형 state + setState + render)
   상태(state): errors = { name, email, message }  // 각 필드 에러 메시지('' = 정상)
               status = 'idle' | 'sending' | 'success' | 'error'  // 제출 상태
   흐름:
     - blur   : 해당 필드 검증 → setState(errors) → render
     - input  : 해당 필드 에러 제거 + 결과메시지 숨김 → setState → render
     - submit : 전체 검증 → 실패면 errors 표시
                통과 시 CONFIG.CONTACT_ENDPOINT(Formspree) 로 fetch POST
                → 전송 중 status='sending' / 성공 'success' / 실패 'error'
   render() 가 state 를 읽어 .has-error 클래스 · 에러 텍스트 · 성공/실패 배너 ·
   전송 중 버튼 상태를 DOM 에 반영합니다. (DOM 이 아니라 state 가 단일 출처)

   ※ 실제 메일 전송은 CONFIG.CONTACT_ENDPOINT(Formspree) 로 이뤄집니다.
     엔드포인트가 아직 'YOUR_FORM_ID' 플레이스홀더면 데모 모드(실전송 없이
     성공 표시 + 콘솔 경고)로 동작하므로, config.js 에 폼 ID 를 넣어 주세요.
   ================================================================ */

'use strict'; // 엄격 모드: 선언 안 한 변수 사용 등 흔한 실수를 에러로 잡아줌

const ContactForm = {                                   // 문의 폼 기능 전체를 담는 단일 객체(모듈처럼 사용)
  // ── 상태(state): 화면이 의존하는 '단일 진실의 원천' ──
  state: {
    errors: { name: '', email: '', message: '' },       // 칸별 에러 메시지('' = 에러 없음/정상)
    status: 'idle', // 제출 상태: 'idle'(대기) | 'sending'(전송중) | 'success'(성공) | 'error'(실패)
  },

  form: null,                                           // <form id="contactForm"> 요소 캐시(init에서 채움)
  submitBtn: null,                                      // 제출 버튼 요소 캐시(전송 중 잠금/라벨 변경에 사용)

  // ── 초기화: main.js 의 DOMContentLoaded 시점에 1회 호출 ──
  init() {
    this.form = $('#contactForm');                      // 폼 요소를 찾아 보관
    if (!this.form) return;                             // 이 페이지에 폼이 없으면 즉시 종료(방어 코드)
    this.submitBtn = $('button[type="submit"]', this.form); // 폼 안의 제출 버튼만 한정해서 보관

    // 각 입력칸(input/textarea)에 실시간 검증 이벤트 연결
    $$('input, textarea', this.form).forEach((field) => { // 폼 내부의 모든 입력 요소를 순회
      field.addEventListener('blur', () => {            // 칸에서 포커스가 빠질 때(=다 적고 넘어갈 때)
        this.setState({                                 // 해당 칸만 검증해 errors 를 갱신
          errors: { ...this.state.errors, [field.id]: this.validate(field) }, // 기존 errors 복사 후 이 칸만 교체
        });
      });
      field.addEventListener('input', () => {           // 글자를 입력하는 동안(타이핑 중)
        this.setState({
          errors: { ...this.state.errors, [field.id]: '' }, // 고치는 중이므로 이 칸 에러는 일단 지움
          status: 'idle', // 다시 입력하면 이전 성공/실패 배너를 숨김(idle 로 되돌림)
        });
      });
    });

    this.form.addEventListener('submit', (event) => {   // 폼 제출(버튼 클릭 또는 Enter) 시
      event.preventDefault(); // 브라우저 기본 동작(페이지 새로고침 제출) 막기 — JS 로 직접 처리하려고
      this.submit();          // 우리가 정의한 제출 로직 실행
    });

    this.render(); // 초기 상태를 화면에 1회 반영(배너 숨김, 버튼 기본 라벨 등)
  },

  // ── 상태 변경의 유일한 통로: state 를 합치고 즉시 render ──
  setState(partial) {
    this.state = { ...this.state, ...partial };         // 기존 state 에 바뀐 부분(partial)만 덮어써 새 state 생성
    this.render();                                      // 상태가 바뀌었으니 화면을 다시 그림(단방향 흐름)
  },

  // ── 제출 처리(비동기): 검증 → 전송 → 결과 표시 ──
  async submit() {
    const fields = $$('input, textarea', this.form);    // 검증할 모든 입력 요소 수집

    // 모든 필드를 검증해 errors 객체를 새로 구성
    const errors = {};                                  // 이번 제출에서의 에러 모음(빈 객체로 시작)
    fields.forEach((f) => { errors[f.id] = this.validate(f); }); // 각 칸을 검증해 id별 에러 메시지 저장

    const isValid = Object.values(errors).every((msg) => msg === ''); // 모든 칸 에러가 ''이면 통과

    if (!isValid) {                                     // 하나라도 에러가 있으면
      this.setState({ errors, status: 'idle' });        // 에러들을 화면에 표시하고 전송은 중단
      return;                                           // 여기서 함수 종료
    }

    // 엔드포인트 미설정(플레이스홀더) 시: 데모 모드 — 실전송 없이 성공 표시
    if (!CONFIG.CONTACT_ENDPOINT || CONFIG.CONTACT_ENDPOINT.includes('YOUR_FORM_ID')) { // 폼 ID 미설정 여부 검사
      console.warn(                                     // 개발자에게 설정이 안 됐음을 콘솔로 경고
        '[Contact] CONFIG.CONTACT_ENDPOINT 가 설정되지 않아 데모 모드로 동작합니다. ' +
        'config.js 에 Formspree 폼 ID 를 넣어 주세요.'
      );
      const payload = Object.fromEntries(new FormData(this.form).entries()); // 폼 입력을 {name,email,message} 객체로
      console.log('[Contact] (데모) 전송 대상 데이터:', payload);            // 실제 전송 대신 콘솔로 데이터만 확인
      this.handleSuccess();                             // 데모지만 성공 UX(배너+리셋)는 동일하게 보여줌
      return;                                           // 데모 모드 종료(아래 실제 전송은 하지 않음)
    }

    // 실제 전송 (Formspree) — 전송 중 버튼 비활성화
    this.setState({ status: 'sending' });               // 'sending'으로 바꿔 버튼 잠금 + 스피너 표시
    try {                                               // 네트워크는 실패할 수 있으니 try/catch 로 감쌈
      const res = await fetch(CONFIG.CONTACT_ENDPOINT, {// Formspree 엔드포인트로 POST 전송하고 응답 대기
        method: 'POST',                                 // 데이터를 보내는 HTTP 메서드
        headers: { Accept: 'application/json' },        // JSON 형태 응답을 원한다고 알림(페이지 리다이렉트 대신)
        body: new FormData(this.form),                  // 폼 내용을 그대로 본문에 실어 전송
      });
      if (res.ok) {                                     // HTTP 상태가 2xx(성공)이면
        this.handleSuccess();                           // 성공 처리(배너 + 폼 리셋)
      } else {                                          // 4xx/5xx 등 서버가 실패를 응답하면
        console.error('[Contact] 전송 실패 — 응답 상태:', res.status); // 디버깅용 상태코드 로그
        this.setState({ status: 'error' });             // 실패 배너 표시
      }
    } catch (err) {                                     // 네트워크 자체가 끊김/차단된 경우
      console.error('[Contact] 전송 실패:', err);       // 에러 객체 로그
      this.setState({ status: 'error' });               // 동일하게 실패 배너 표시
    }
  },

  /** 전송 성공 처리: 폼 리셋 + 성공 배너 + 5초 후 자동 숨김 */
  handleSuccess() {
    this.form.reset();                                  // 입력칸 비우기(제출 완료 표시)
    this.setState({
      errors: { name: '', email: '', message: '' },     // 남아있던 에러도 초기화
      status: 'success',                                // 성공 배너 표시
    });
    setTimeout(() => {                                  // 5초 뒤에
      if (this.state.status === 'success') this.setState({ status: 'idle' }); // 여전히 성공 상태면 배너 자동 숨김
    }, 5000);                                           // 5000ms = 5초
  },

  /** 필드 하나를 검증해 에러 메시지를 반환('' = 정상) — 순수 함수 */
  validate(field) {
    const value = field.value.trim();                   // 앞뒤 공백을 제거한 입력값

    if (field.required && value === '') {               // 필수 칸인데 비어 있으면
      return '필수 입력 항목입니다.';
    }
    if (field.type === 'email' && value !== '' && !this.isValidEmail(value)) { // 이메일 칸이고 값이 있는데 형식이 틀리면
      return '올바른 이메일 형식이 아닙니다.';
    }
    if (field.id === 'message' && value !== '' && value.length < 5) { // 메시지 칸인데 5자 미만이면
      return '메시지는 5자 이상 입력해 주세요.';
    }
    return '';                                          // 위 조건에 안 걸리면 정상(에러 없음)
  },

  isValidEmail(email) {
    // 단순화한 RFC 5322 패턴: '@' 와 '.' 을 포함한 기본 형태만 확인
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);    // (공백·@ 없는 글자) @ (글자) . (글자) 구조면 true
  },

  /** state → DOM 렌더 */
  render() {
    const { errors, status } = this.state;              // 현재 state 에서 필요한 값 꺼내기(구조 분해 할당)

    // 필드별 에러 상태 반영
    Object.keys(errors).forEach((id) => {               // name/email/message 각각에 대해
      const errorEl = $(`[data-error-for="${id}"]`);    // 그 칸의 에러 표시용 <small> 찾기
      if (!errorEl) return;                             // 없으면 건너뜀(방어 코드)
      const wrapper = errorEl.closest('.form__field');  // 칸 전체를 감싸는 묶음 요소
      const message = errors[id];                       // 이 칸의 에러 메시지
      wrapper.classList.toggle('has-error', message !== ''); // 에러 있으면 has-error 켬(CSS 가 테두리 빨강)
      errorEl.textContent = message;                    // 에러 글자 출력(정상이면 빈 문자열)
    });

    // 성공 / 실패 배너 표시 여부 (상호 배타적)
    const successEl = $('#formSuccess');                // 성공 배너 요소
    if (successEl) successEl.hidden = status !== 'success'; // status 가 success 일 때만 보이게

    const errorBanner = $('#formError');                // 실패 배너 요소
    if (errorBanner) errorBanner.hidden = status !== 'error'; // status 가 error 일 때만 보이게

    // 전송 중에는 버튼 비활성화 + 라벨/스피너 전환
    if (this.submitBtn) {                               // 버튼이 있으면
      const sending = status === 'sending';             // 지금 전송 중인지 여부
      this.submitBtn.disabled = sending;                // 전송 중이면 버튼 잠금(중복 제출 방지)
      this.submitBtn.innerHTML = sending                // 버튼 내용도 상태에 맞게 교체
        ? '<i class="fa-solid fa-spinner fa-spin"></i> 전송 중…'   // 전송 중: 빙글빙글 도는 스피너
        : '<i class="fa-regular fa-paper-plane"></i> 메시지 보내기'; // 평상시: 종이비행기 아이콘
    }
  },
};
