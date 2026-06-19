/* ================================================================
   typing.js — Hero 이름 타이핑 효과
   #typed 의 텍스트를 비운 뒤 한 글자씩 setTimeout 으로 채워
   타자기처럼 나타나게 합니다.
   ================================================================ */

'use strict';

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
