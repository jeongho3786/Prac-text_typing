import { useState } from "react";
import Typing from "./typing";

function App() {
  const [text, setText] = useState("초기값");

  const handleClickButton = () => {
    setText((prev) => prev + "값추가");
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
