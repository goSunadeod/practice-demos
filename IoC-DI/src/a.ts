import { B } from './b'
import { container } from './container'
export class A {
  private b: B;
  // constructor(b: B) {
  //   this.b = b;
  // }

  constructor() {
    this.b = container.get('b');
  }
}