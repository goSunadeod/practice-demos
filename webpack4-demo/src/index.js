//
// let str = require('./a.js')
//
// console.log(str)
//
// require('./index.css');
// require('./test.less');
//
//
// let fn = () => {
//     console.log('es6')
// }
// fn()
//
// @log
// class A {
//     a = 1
// }
// let a = new A()
// console.log(a.a)
//
// function log(target) {
//     console.log(target, '23')
// }

// import $ from 'expose-loader?$!jquery'
// import $ from 'jquery';
// console.log($)
import logo from './logo.png';
let image = new Image();
image.src = logo;
image.style.background = 'rebeccapurple';
document.body.appendChild(image);
