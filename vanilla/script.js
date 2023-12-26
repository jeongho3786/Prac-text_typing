const typing = (text, speed = 80) => {
  const textElement = document.querySelector(".input-text");
  const cursorElement = document.querySelector(".blinking-text");
  let count = 0;

  setInterval(() => {
    if (text.length === count) {
      cursorElement.classList.add("blink-cursor");
      return;
    }

    textElement.textContent += text[count];

    count++;
  }, speed);
};

const init = () => {
  window.addEventListener("load", () =>
    typing("안녕하세요. 저는 냉면을 좋아합니다.")
  );
};

init();
