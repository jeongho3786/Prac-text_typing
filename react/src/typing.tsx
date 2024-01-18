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
    async (tag: HTMLSpanElement, slicedText: string) => {
      return new Promise((resolve) => {
        let count = 0;

        const interval = setInterval(() => {
          if (slicedText.length === count) {
            clearInterval(interval);
            resolve(null);
            return;
          }

          tag.textContent += slicedText[count];

          count++;
        });
      });
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
