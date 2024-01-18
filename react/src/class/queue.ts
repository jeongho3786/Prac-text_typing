export class Queue<TData> {
  storage: { [key: number]: TData };
  front: number;
  rear: number;

  constructor() {
    this.storage = {};
    this.front = 0;
    this.rear = 0;
  }

  isEmpty() {
    return this.front === this.rear;
  }

  enqueue(data: TData) {
    this.storage[this.rear] = data;
    this.rear++;
  }

  dequeue() {
    const delData = this.storage[this.front];

    delete this.storage[this.front];
    this.front++;

    return delData;
  }
}
