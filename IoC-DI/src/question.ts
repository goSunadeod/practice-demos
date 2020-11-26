/*
// b.ts
class B {
  p: number;
  constructor(p: number) {
    this.p = p;
  }
}

// a.ts
class A {
  b: B;
  constructor(p: number) {
    this.b = new B(p);
  }
}

// main.ts
const a = new A(10); // 代码耦合
console.log(a);
*/