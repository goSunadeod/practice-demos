// 例1
function* myGenerator1() {
  yield Promise.resolve(1);
  yield Promise.resolve(2);
  yield Promise.resolve(3);
}

const gen1 = myGenerator1()
gen1.next().value.then(val => {
  console.log(val)
  gen1.next().value.then(val => {
    console.log(val)
    gen1.next().value.then(val => {
      console.log(val)
    })
  })
})
// 输出123

// 例2
function* myGenerator2() {
  console.log(yield Promise.resolve(1))   //1
  console.log(yield Promise.resolve(2))   //2
  console.log(yield Promise.resolve(3))   //3
}

const gen2 = myGenerator2()
gen2.next().value.then(val => {
  // console.log(val)
  gen2.next(val).value.then(val => {
    // console.log(val)
    gen2.next(val).value.then(val => {
      // console.log(val)
      gen2.next(val)
    })
  })
})

// 总结
function run1(gen) {
  var g = gen()                     //由于每次gen()获取到的都是最新的迭代器,因此获取迭代器操作要放在step()之前,否则会进入死循环

  function step(val) {              //封装一个方法, 递归执行next()
    var res = g.next(val)           //获取迭代器对象，并返回resolve的值
    if(res.done) return res.value   //递归终止条件
    res.value.then(val => {         //Promise的then方法是实现自动迭代的前提
      step(val)                     //等待Promise完成就自动执行下一个next，并传入resolve的值
    })
  }
  step()  //第一次执行
}

function* myGenerator() {
  console.log(yield Promise.resolve(1))   //1
  console.log(yield Promise.resolve(2))   //2
  console.log(yield Promise.resolve(3))   //3
}

run1(myGenerator)



function run(gen) {
  //把返回值包装成promise
  return new Promise((resolve, reject) => {
    var g = gen()

    function step(val) {
      //错误处理
      try {
        var res = g.next(val) 
      } catch(err) {
        return reject(err); 
      }
      if(res.done) {
        return resolve(res.value);
      }
      //res.value包装为promise，以兼容yield后面跟基本类型的情况
      Promise.resolve(res.value).then(
        val => {
          step(val);
        }, 
        err => {
          //抛出错误
          g.throw(err)
        });
    }
    step();
  });
}
