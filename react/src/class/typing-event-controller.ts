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

    if (super.isEmpty()) {
      super.enqueue(textData);
      this.repeatTakeOutData();
      return;
    }

    super.enqueue(textData);
  }

  private async repeatTakeOutData() {
    if (!this.handlePaintingText) return;

    const deleteData = super.getDelTarget();

    await this.handlePaintingText(deleteData);
    super.dequeue();

    if (super.isEmpty()) return;

    this.repeatTakeOutData();
  }
}
