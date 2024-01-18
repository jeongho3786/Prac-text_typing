import { useCallback, useEffect, useRef } from "react";
import { TypingEventController } from "./class/typing-event-controller";

interface TypingProps {
  text: string;
}

const TypingController = new TypingEventController();

const Typing = ({ text }: TypingProps) => {
  const prevTextLengthRef = useRef<null | number>(null);
  const textTagRef = useRef<HTMLSpanElement>(null);

  const handlePaintText = useCallback(
    (tag: HTMLSpanElement, slicedText: string) => {
      let count = 0;

      const interval = setInterval(() => {
        if (slicedText.length === count) {
          clearInterval(interval);
          return;
        }

        tag.textContent += slicedText[count];

        count++;
      }, 100);
    },
    []
  );

  useEffect(() => {
    const textTag = textTagRef.current;
    const prevTextLength = prevTextLengthRef.current;

    if (!textTag) return;

    const printText = text.slice(prevTextLength ?? 0, text.length);

    prevTextLengthRef.current = text.length;

    TypingController.putInData({
      handler: () => handlePaintText(textTag, printText),
      textData: printText,
    });
  }, [text, handlePaintText]);

  return <span ref={textTagRef} />;
};

export default Typing;
