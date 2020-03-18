const PENDING = 'PENDING'
const FULFILLED = 'FULFILLED'
const REJECTED = 'REJECTED'
console.log('----my----')
class Promise{
  constructor(executor) {
    if(typeof executor !== 'function') {
      throw new TypeError('Promise...')
    }

    this.initValue()

    try {
       // 箭头函数保证this指向
      const resolve = (value) => {
        if(this.status === PENDING) {
          this.status = FULFILLED;
          this.value = value;
          this.onFulfilledCallBacks.forEach(fn => fn(this.value))
        }
      }
      const reject = (reason) => {
        if(this.status === PENDING) {
          this.status = REJECTED;
          this.reason = reason;
          this.onRejectedCallBacks.forEach(fn => fn(this.reason))
        }
      }
      executor(resolve, reject)
    } catch (error) {
      reject(error)
    }
  }

  initValue() {
    this.value = undefined;
    this.reason = undefined;
    this.status = PENDING;
    this.onFulfilledCallBacks = [];
    this.onRejectedCallBacks = [];
  }

  then(onFulfilled, onRejected) {

    // 判断是否函数

    if(this.status === FULFILLED) {
      onFulfilled(this.value)
    }

    if(this.status === REJECTED) {
      onRejected(this.reason)
    }
    if(this.status === PENDING) {
      this.onFulfilledCallBacks.push(() => {
        onFulfilled(this.value)
      })
      this.onRejectedCallBacks.push(() => {
        onRejected(this.reason)
      })
    }
  }

}


module.exports = Promise