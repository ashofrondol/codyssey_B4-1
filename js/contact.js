/* ================================================================
   contact.js — Contact 폼  (객체형 state + setState + render)
   상태(state): errors = { name, email, message }  // 각 필드 에러 메시지('' = 정상)
               status = 'idle' | 'success'         // 제출 결과
   흐름:
     - blur   : 해당 필드 검증 → setState(errors) → render
     - input  : 해당 필드 에러 제거 + 성공메시지 숨김 → setState → render
     - submit : 전체 검증 → 실패면 errors 표시 / 성공이면 status='success'
   render() 가 state 를 읽어 .has-error 클래스 · 에러 텍스트 · 성공 메시지를
   DOM 에 반영합니다. (DOM 을 직접 상태원으로 쓰지 않고 state 를 단일 출처로 사용)

   ※ 실제 메일 전송은 연동되어 있지 않습니다(데모). 입력값 검증/구성까지만
     수행하며, Formspree·EmailJS 등을 붙이는 지점만 표시해 두었습니다.
   ================================================================ */

'use strict';

const ContactForm = {
  state: {
    errors: { name: '', email: '', message: '' },
    status: 'idle', // 'idle' | 'success'
  },

  form: null,

  init() {
    this.form = $('#contactForm');
    if (!this.form) return;

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

  submit() {
    const fields = $$('input, textarea', this.form);

    // 모든 필드를 검증해 errors 객체를 새로 구성
    const errors = {};
    fields.forEach((f) => { errors[f.id] = this.validate(f); });

    const isValid = Object.values(errors).every((msg) => msg === '');

    if (!isValid) {
      this.setState({ errors, status: 'idle' });
      return;
    }

    // 실제 전송은 하지 않지만 데이터는 구성 (Formspree 등 추후 연동 지점)
    const payload = Object.fromEntries(new FormData(this.form).entries());
    console.log('[Contact] 검증 통과 — 전송 대상 데이터:', payload);

    this.form.reset();
    this.setState({
      errors: { name: '', email: '', message: '' },
      status: 'success',
    });

    // 5초 후 자동으로 성공 메시지 숨김
    setTimeout(() => this.setState({ status: 'idle' }), 5000);
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

    // 성공 메시지 표시 여부
    const successEl = $('#formSuccess');
    if (successEl) successEl.hidden = status !== 'success';
  },
};
