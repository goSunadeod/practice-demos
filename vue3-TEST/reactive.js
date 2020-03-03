// vue3 响应式
// 2.0 会递归， 数组改变length是无效，对象不存在的属性不能被拦截
let toProxy = new WeakMap(); // 原对象->代理过的对象
let toRaw = new WeakMap(); // 被代理过的对象->原对象

function isObject(val) {
  return typeof val === 'object' && val !== null;
}

function hasOwn(target, key) {
  return target.hasOwnProperty(key)
}

function reactive(target) {
  // 创建响应式
  return createReactiveObject(target)
}

function createReactiveObject(target) {
  if(!isObject(target)) return target;
  let proxy = toProxy.get(target);
  if (proxy) return proxy;
  if (toRaw.has(target)) return target;
  let baseHandler = {
    get(target, key) {
      // proxy + reflect 反射
      let result = Reflect.get(target, key)

      // 收集依赖
      track(target, key)

      return isObject(result) ? reactive(result) :result
    },
    set(target, key, value, receiver) {
      // 如何识别改属性 或 新增属性
      let hadKey = hasOwn(target, key)
      let oldValue = target[key]
      let res = Reflect.set(target, key, value, receiver)
      if (!hadKey) {
        // add
        trigger(target, 'add', key)
      } else if (oldValue !== value) {
        // update
        trigger(target, 'set', key)
      }
      // 返回是否设置成功
      return res;
    },
    deleteProperty() {
      return Reflect.deleteProperty(target, key)
    }
  }
  let observed = new Proxy(target, baseHandler);
  toProxy.set(target, observed)
  toRaw.set(observed, target)

  return observed
}

// 栈 先进后出
let activeEffectStacks = []

let targetsMap = new WeakMap()
function track(target, key) {
  let effect = activeEffectStacks[activeEffectStacks.length - 1];
  if (effect) { // 有对应关系 才创建关联
    let depsMap = targetsMap.get(target);
    if (!depsMap) {
      targetsMap.set(target, depsMap = new Map())
    }
    let deps = depsMap.get(key)
    if (!deps) {
      depsMap.set(key,  deps = new Set())
    }
    if(!deps.has(effect)) {
      deps.add(effect)
    }
  }
}

function trigger(target, type, key) {
  let depsMap = targetsMap.get(target)
  if (depsMap) {
    let deps = depsMap.get(key);
    if (deps) {
      deps.forEach(effect => { // 将当前key 对应的effect一次执行
        effect()
      })
    }
  }
}

// 响应式
function effect(fn) {
  let effect = createReactiveEffect(fn)
  effect() // 默认先执行一次
}

function createReactiveEffect(fn) {
  let effect = function() {
    return run(effect, fn);
  }
  return effect;
}

function run(effect, fn) { // 运行fn effect存起来
  try {
    activeEffectStacks.push(effect)
    fn();
  } finally {
    activeEffectStacks.pop()
  }
}

// 依赖收集 发布订阅
let obj = reactive({name: 'demo'})
effect(() => {
  console.log(obj.name)
})

obj.name = '哈哈'