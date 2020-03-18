// https://promisesaplus.com/
const PENDING = "PENDING";
const FULFILLED = "FULFILLED";
const REJECTED = "REJECTED";
// x 决定promise2的成功与失败
const resolvePromise = (promise2, x, resolve, reject) => {
  // 附加 可能你的promise 和别人的promise来混用，不同的promise库之间相互调用
  if (promise2 === x) {
    return reject(
      new TypeError('TypeError: Chaining cycle detected for promise #<Promise>')
    );
  }
  let called;
  // 判断x
  if ((typeof x === "object" && x !== null) || typeof x === "function") {
    try {
      // 取出then 如果then是object.definePreperty 定义的
      let then = x.then;
      if (typeof then === "function") {
        then.call(
          x,
          y => {
            if (called) return
            called = true
            resolvePromise(promise2, y, resolve, reject);
          },
          r => {
            if (called) return
            called = true
            reject(r);
          }
        );
      } else {
        // x: {then: '123'}
        resolve(x);
      }
    } catch (e) {
      if (called) return
      called = true
      reject(e);
    }
  } else {
    resolve(x);
  }
};
class Promise {
  constructor(executor) {
    if (typeof executor !== "function") {
      throw new TypeError("Promise...");
    }

    this.initValue();
    // 箭头函数保证this指向
    const resolve = value => {
      if (this.status === PENDING) {
        if(value instanceof Promise) {// 直到解析出普通值
          return value.then(resolve, reject)
        }
        this.status = FULFILLED;
        this.value = value;
        this.onFulfilledCallBacks.forEach(fn => fn(this.value));
      }
    };
    const reject = reason => {
      if (this.status === PENDING) {
        this.status = REJECTED;
        this.reason = reason;
        this.onRejectedCallBacks.forEach(fn => fn(this.reason));
      }
    };
    try {
      // 只能捕捉同步错误
      executor(resolve, reject);
    } catch (error) {
      console.log(error);
      reject(error);
    }
  }

  initValue() {
    this.value = undefined;
    this.reason = undefined;
    this.status = PENDING;
    this.onFulfilledCallBacks = [];
    this.onRejectedCallBacks = [];
  }

  // x普通值 下一个then就是成功态
  // x可能为promise
  then(onFulfilled, onRejected) {
   // 2.2.1 默认穿透
   onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : val => val
   onRejected = typeof onRejected === 'function' ? onRejected : err => {throw err}

    // 实现链式调用 且改变了后面then的值 必须通过新的实例
    // 递归

    let promise2 = new Promise((resolve, reject) => {
      if (this.status === FULFILLED) {
        setTimeout(() => {
          try {
            let x = onFulfilled(this.value);
            // new Promise 是立即执行的 promise2 还无返回值，所以放入setTimeOut
            resolvePromise(promise2, x, resolve, reject);
          } catch (e) {
            reject(e);
          }
        }, 0);
      }

      if (this.status === REJECTED) {
        setTimeout(() => {
          try {
            let x = onRejected(this.reason);
            resolvePromise(promise2, x, resolve, reject);
          } catch (e) {
            reject(e);
          }
        }, 0);
      }
      if (this.status === PENDING) {
        this.onFulfilledCallBacks.push(() => {
          setTimeout(() => {
            try {
              let x = onFulfilled(this.value);
              resolvePromise(promise2, x, resolve, reject);
            } catch (e) {
              reject(e);
            }
          }, 0);
        });
        this.onRejectedCallBacks.push(() => {
          setTimeout(() => {
            try {
              let x = onRejected(this.reason);
              resolvePromise(promise2, x, resolve, reject);
            } catch (e) {
              reject(e);
            }
          }, 0);
        });
      }
    });
    return promise2;
  }

  catch(errCallBack) {
    return this.then(null, errCallBack)
  }
}




// promises-aplus-tests promise.js 
Promise.deferred = function() {
  let dfd = {};
  dfd.promise = new Promise((resolve, reject) => {
    dfd.resolve = resolve
    dfd.reject = reject
  })
  return dfd;
}

module.exports = Promise;
