
// 在new Promise是需要传递一个执行器函数，executor 这个函数默认会被立即执行
// 每个promise有三个状态 pending fulfilled rejected
// 默认创建一个promise是等待状态 默认提供给你两个函数 resolve和reject
// 每个promise实例都具备一个then方法 then方法参数 ：成功回掉 与 失败回掉
// 如何让promise 变成失败态 reject  可以抛出一个错误
// 如果每次调用成功或失败 只会执行第一次 除pending外状态不可逆

const Promise = require('./promise')
// let p = new Promise((resolve, reject) => {
//   setTimeout(() => {
//     resolve(1)
//   })
// })


let fs = require('fs');
let path = require('path')

function getName(name) {
  return __dirname+ '/' + name
}


function read(...args) {
  return new Promise((resolve, reject) => {
    fs.readFile(...args, (err, data) => {
      if (err) reject(err)
      resolve(data)
    })
  })
}

// 1 如果返回promise 则会让promise执行 并且采用他的状态，将结果传给外层的下一个then
// 2 如果返回普通值，则会将这个值传递到外层的下一个rhen成功回掉
// 3 抛出异常
// read(getName('name.txt'), 'utf8').then((data) => {
//   return read(getName(data), 'utf-8')
// }).then((data) => {
//   console.log(data);
// })

let promise = new Promise((resolve, reject) => {
  resolve('hello')
})

// let promise2 = promise.then((data) => {
//   return new Promise((resolve, reject) => {
//     resolve(new Promise((resolve, reject) => {
//       setTimeout(() => {
//         resolve('hel1lo')
//       }, 1000)
//     }))
//   })
// })

// promise2.then(data => {
//   console.log(data, '121111')
// }, err => {
//   console.log('---', err)
// })


promise.then().then().then((data) => {
  console.log(data)
})