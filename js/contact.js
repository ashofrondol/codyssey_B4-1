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

'use strict';

const ContactForm = {
  state: {
    errors: { name: '', email: '', message: '' },
    status: 'idle', // 'idle' | 'sending' | 'success' | 'error'
  },

  form: null,
  submitBtn: null,

  init() {
    this.form = $('#contactForm');
    if (!this.form) return;
    this.submitBtn = $('button[type="submit"]', this.form);

    // input/blur 시 개별 필드 실시간 검증
    $$('input, textarea', this.form).forEach((field) => {
      field.addEventListener('blur', () => {
        this.setState({
          errors: { ...this.state.errors, [field.id]: this.validate(field) },
        });
      });
      field.addEventListener('input', () => {
        this.setState({
          errors: { ...this.state.errors, [field.id]: '' },
          status: 'idle', // 다시 입력하면 성공 메시지 숨김
        });
      });
    });

    this.form.addEventListener('submit', (event) => {
      event.preventDefault(); // 기본 제출 동작 방지
      this.submit();
    });

    this.render();
  },

  setState(partial) {
    this.state = { ...this.state, ...partial };
    this.render();
  },

  async submit() {
    const fields = $$('input, textarea', this.form);

    // 모든 필드를 검증해 errors 객체를 새로 구성
    const errors = {};
    fields.forEach((f) => { errors[f.id] = this.validate(f); });

    const isValid = Object.values(errors).every((msg) => msg === '');

    if (!isValid) {
      this.setState({ errors, status: 'idle' });
      return;
    }

    // 엔드포인트 미설정(플레이스홀더) 시: 데모 모드 — 실전송 없이 성공 표시
    if (!CONFIG.CONTACT_ENDPOINT || CONFIG.CONTACT_ENDPOINT.includes('YOUR_FORM_ID')) {
      console.warn(
        '[Contact] CONFIG.CONTACT_ENDPOINT 가 설정되지 않아 데모 모드로 동작합니다. ' +
        'config.js 에 Formspree 폼 ID 를 넣어 주세요.'
      );
      const payload = Object.fromEntries(new FormData(this.form).entries());
      console.log('[Contact] (데모) 전송 대상 데이터:', payload);
      this.handleSuccess();
      return;
    }

    // 실제 전송 (Formspree) — 전송 중 버튼 비활성화
    this.setState({ status: 'sending' });
    try {
      const res = await fetch(CONFIG.CONTACT_ENDPOINT, {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: new FormData(this.form),
      });
      if (res.ok) {
        this.handleSuccess();
      } else {
        console.error('[Contact] 전송 실패 — 응답 상태:', res.status);
        this.setState({ status: 'error' });
      }
    } catch (err) {
      console.error('[Contact] 전송 실패:', err);
      this.setState({ status: 'error' });
    }
  },

  /** 전송 성공 처리: 폼 리셋 + 성공 배너 + 5초 후 자동 숨김 */
  handleSuccess() {
    this.form.reset();
    this.setState({
      errors: { name: '', email: '', message: '' },
      status: 'success',
    });
    setTimeout(() => {
      if (this.state.status === 'success') this.setState({ status: 'idle' });
    }, 5000);
  },

  /** 필드 하나를 검증해 에러 메시지를 반환('' = 정상) — 순수 함수 */
  validate(field) {
    const value = field.value.trim();

    if (field.required && value === '') {
      return '필수 입력 항목입니다.';
    }
    if (field.type === 'email' && value !== '' && !this.isValidEmail(value)) {
      return '올바른 이메일 형식이 아닙니다.';
    }
    if (field.id === 'message' && value !== '' && value.length < 5) {
      return '메시지는 5자 이상 입력해 주세요.';
    }
    return '';
  },

  isValidEmail(email) {
    // 단순화한 RFC 5322 패턴
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  },

  /** state → DOM 렌더 */
  render() {
    const { errors, status } = this.state;

    // 필드별 에러 상태 반영
    Object.keys(errors).forEach((id) => {
      const errorEl = $(`[data-error-for="${id}"]`);
      if (!errorEl) return;
      const wrapper = errorEl.closest('.form__field');
      const message = errors[id];
      wrapper.classList.toggle('has-error', message !== '');
      errorEl.textContent = message;
    });

    // 성공 / 실패 배너 표시 여부 (상호 배타적)
    const successEl = $('#formSuccess');
    if (successEl) successEl.hidden = status !== 'success';

    const errorBanner = $('#formError');
    if (errorBanner) errorBanner.hidden = status !== 'error';

    // 전송 중에는 버튼 비활성화 + 라벨/스피너 전환
    if (this.submitBtn) {
      const sending = status === 'sending';
      this.submitBtn.disabled = sending;
      this.submitBtn.innerHTML = sending
        ? '<i class="fa-solid fa-spinner fa-spin"></i> 전송 중…'
        : '<i class="fa-regular fa-paper-plane"></i> 메시지 보내기';
    }
  },
};
