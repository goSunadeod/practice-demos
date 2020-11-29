// import { B } from './b';
// import { A } from './a';
// import { container } from './container'
// import { load } from './load';


// const b = new B(10);
// const a = new A(b);
// console.log(a); // A { b: B { p: 10 } }


// container.bind('a', A, []);
// container.bind('b', B, [10])
// const a = container.get('a');
// console.log(a); // A => { b: B { p: 10 } }


import './b';
import './a';
import { Container } from './container'
import { load } from './load';
const container = new Container();
load(container);

load(container);
console.log(container.get('a')); // A => { b: B { p: 10 } }



