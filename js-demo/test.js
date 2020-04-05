// // 1 
// 'a', 'b', 'c', 'd'
// // 2  
// const arr = ['1', '2', '3', 6, 4, -99, -101]
// let sum = arr.filter(i => typeof i === 'number' && Math.abs(i%2) === 1).reduce((prev, next) => prev + next, 0)
// console.log(sum)
// // 3
// const fn1 = (a, b, c, d) => a- b * c + d
// function bindLeft(fn, ...args) {
//   var length = fn.length;
//   var args = args || [];
//   return function(){
//       newArgs = args.concat(Array.prototype.slice.call(arguments));
//       if (newArgs.length < length) {
//           return curry.call(this,fn,newArgs);
//       }else{
//           return fn.apply(this,newArgs);
//       }
//   }
// }
// const fn2 = bindLeft(fn1, 1, 2)
// console.log(fn2(3, 4))  // -1
// // 4 
// const arr = [11, -1, 6, 5, -4, -7, 9, 8]

// function bubbleSort(arr) {
//   let len = arr.length;
//   for(let i = 0; i< len - 1; i++) {
//       for(let j = 0; j< len - 1 - i; j++) {
//           if (arr[j] < 0) break
//           if (arr[j]> arr[j+1]) {
//             let k = j;
//             while (arr[j+1] && arr[j+1] < 0) {
//               j++;
//             }
//             if (arr[k] > arr[j+1]) {
//               [arr[k], arr[j+1]] = [arr[j+1], arr[k]];
//             }
//           }
//       }
//   }
//   return arr
// }
// console.log(bubbleSort(arr))

 


function deepCopy(obj){
  if(typeof obj == 'object' && obj !== null){
      let result = obj.constructor == Array ? [] : {};
      for(let i in obj){
          result[i] = typeof obj[i] == 'object' ? deepCopy(obj[i]) : obj[i];
      }
  }else {
      let result = obj;
  }
  return result;
}

parseQuery(‘?a=1&b=2&c=3&b=4’)  { a: 1, b: [2, 4], c: 3 }
function parseQuery(str) {
  let arr = str.indexOf('?') !== -1 ? (str.split('?'))[1] : str
  const resultArr = arr.split('&');
  let result = {}
  resultArr.forEach(item => {
    const keyArr = item.split('=')
    if (!result[keyArr[0]]) {
      result[keyArr[0]] = [keyArr[1]
    } else {

    }
  })
  // let resultArr = arr[1]
}

// parseQuery('?a=1&b=2&c=3&b=4')

function Foo() {  
    var i = 0;  
    return function() {  
//        console.log(i++);  
    }  
 }  

 var f1 = Foo(),  f2 = Foo();  
 f1();

 var bb = 1;  
function aa(bb) {  
    bb = 2;  
    alert(bb);  
};  
console.log(bb); 