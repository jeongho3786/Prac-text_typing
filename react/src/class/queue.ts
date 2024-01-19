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
    delete this.storage[this.front];
    this.front++;
  }

  getDelTarget() {
    return this.storage[this.front];
  }
}
