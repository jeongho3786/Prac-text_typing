import { useCallback, useEffect, useRef } from "react";
import { TypingEventController } from "./class/typing-event-controller";

interface TypingProps {
  text: string;
  speed?: number;
}

const TypingController = new TypingEventController();

const Typing = ({ text, speed = 100 }: TypingProps) => {
  const prevTextLengthRef = useRef<null | number>(null);
  const textTagRef = useRef<HTMLSpanElement>(null);

  const handlePaintText = useCallback(
    async (tag: HTMLSpanElement, slicedText: string, speed: number) => {
      return new Promise((resolve) => {
        let count = 0;

        const interval = setInterval(() => {
          if (count === slicedText.length) {
            clearInterval(interval);
            resolve(null);
            return;
          }

          tag.textContent += slicedText[count];

          count++;
        }, speed);
      });
    },
    []
  );

  useEffect(() => {
    const textTag = textTagRef.current;

    if (!textTag) return;

    const prevTextLength = prevTextLengthRef.current;
    const printText = text.slice(prevTextLength ?? 0, text.length);

    prevTextLengthRef.current = text.length;

    TypingController.putInData({
      handler: () => handlePaintText(textTag, printText, speed),
      textData: printText,
    });
  }, [text, speed, handlePaintText]);

  return <span ref={textTagRef} />;
};

export default Typing;
