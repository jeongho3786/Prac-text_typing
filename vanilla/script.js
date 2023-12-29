const typing = (text, speed = 80, delay = 2000) => {
  const textElement = document.querySelector(".inputText");
  const cursorElement = document.querySelector(".blinkingText");
  let count = 0;

  setTimeout(() => {
    setInterval(() => {
      cursorElement.classList.remove("blinkCursor");

      if (text.length === count) {
        cursorElement.classList.add("blinkCursor");
        return;
      }

      textElement.textContent += text[count];

      count++;
    }, speed);
  }, delay);
};

const init = () => {
  typing("안녕하세요. 저는 냉면을 좋아합니다.");
};

init();

/*
  먼저 커서가 깜빡인다.
  글자가 들어가면 깜박임을 멈추고 글자 뒤에 붙는다.
  글자가 끝나면 다시 깜빡인다.
*/
