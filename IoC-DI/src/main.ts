import { B } from './b';
import { A } from './a';
import { container } from './container'


// const b = new B(10);
// const a = new A(b);
// console.log(a); // A { b: B { p: 10 } }


container.bind('a', A, []);
container.bind('b', B, [10])


const a = container.get('a');

console.log(a); // A => { b: B { p: 10 } }




