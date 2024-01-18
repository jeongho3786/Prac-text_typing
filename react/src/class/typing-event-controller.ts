import type { PaintText } from "../type";
import { Queue } from "./queue";

interface PutInDataProps {
  handler: (textData: PaintText) => Promise<unknown>;
  textData: PaintText;
}

export class TypingEventController extends Queue<PaintText> {
  private handlePaintingText:
    | ((textData: PaintText) => Promise<unknown>)
    | null;

  constructor() {
    super();
    this.handlePaintingText = null;
  }

  putInData({ handler, textData }: PutInDataProps) {
    this.handlePaintingText = handler;

    if (!super.isEmpty()) {
      super.enqueue(textData);
      return;
    }

    super.enqueue(textData);
    this.repeatTakeOutData();
  }

  private async repeatTakeOutData() {
    if (!this.handlePaintingText) return;

    const deleteData = super.dequeue();

    await this.handlePaintingText(deleteData);

    if (super.isEmpty()) {
      return;
    }

    this.repeatTakeOutData();
  }
}
