let fs = require("fs").promises;



function getName(name) {
  return __dirname + "/" + name;
}

const Promise = require("./promise");

const isPromise = value => {
  if ((typeof value === "object" && value !== null) || typeof value === "function") {
    return typeof value.then === 'function' 
  }
  return false
}
Promise.all = function(promises) {
  return new Promise((resolve, reject) => {
    let arr = []
    let i = 0;
    let processData = (index, data) => {
      arr[index] = data;
      if (++i === promises.length) {
        resolve(arr)
      }
    }
    for(let i = 0; i< promises.length; i++) {
      let current = promises[i]
      if (isPromise(current)) {
        current.then(data => {
        
          processData(i, data)
        }, reject)
      } else {
        processData(i, current) // 异步关系 不可以直接arr.push
      }
    }

  })
}

// Promise.all([
//   1,
//   2,
//   fs.readFile(getName("name.txt"), "utf8"),
//   fs.readFile(getName("age.txt"), "utf8")
// ]).then(
//   value => {
//   console.log(value)
//   },err => {console.log(err);
//   });




  Promise.race = (promises)=>{
    return new Promise((resolve,reject)=>{
        if(promises.length === 0){
            return 
        } else {
          for(let i = 0; i< promises.length; i++) {
            let current = promises[i]
            if (isPromise(current)) {
              current.then(data => {
                resolve(data)
              }, reject)
            } else {
              resolve(current)
            }
          }
        }
    })
}

Promise.race([
  fs.readFile(getName("name.txt"), "utf8"),
  fs.readFile(getName("age.txt"), "utf8")
]).then(
  value => {
  console.log(value)
  },err => {console.log(err);
  });