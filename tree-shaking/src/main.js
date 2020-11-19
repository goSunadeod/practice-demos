// import Menu from './menu.js'

// let baz = () => {
//   var x = 1
//   console.log(x)
//   function unused() {
//     return 5
//   }
//   return x
//   let c = x+3
//   return c
// }

// baz()



// import { cube } from './math.js';
// console.log(cube(5)); // 125


import { Apple } from './component.js'

const appleModel = new Apple({
  model: 'IphoneX'
}).getModel()

console.log(appleModel)