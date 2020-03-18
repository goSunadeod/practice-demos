// 观察者模式 内部是基于发布订阅的 又一个观察者 被观察者 有关联

class Subject {
  constructor(name) {
    this.name = name;
    this.arr = [];
    this.state = 'happy'
  }

  attach(observer) {
    this.arr.push(observer)
  }

  setState(newState) {
    this.state = newState;
    this.arr.forEach(o => o.update(this))
  }
}

class Observer {
 constructor(name) {
    this.name = name
  }

  update(s) {
    console.log(s.name + ' is ' + s.state)
  }
}

let s = new Subject('baby')
let o1 = new Observer('father')
let o2 = new Observer('mother')

//注册

s.attach(o1)
s.attach(o2)

s.setState('sad')