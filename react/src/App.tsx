import { useState } from "react";
import Typing from "./typing";

function App() {
  const [text, setText] = useState("초기값");

  const handleClickButton = () => {
    setText(
      (prev) =>
        prev +
        " " +
        "장문의 값을 추가하면 어떤 일이 발생할까 정말 기대가 되는 군요. 크라라라라라라라라"
    );
  };

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <Typing text={text} />
      <div>
        <button onClick={handleClickButton}>값추가버튼</button>
      </div>
    </div>
  );
}

export default App;
