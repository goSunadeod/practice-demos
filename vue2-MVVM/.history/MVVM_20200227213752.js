//  观察者（发布订阅）
 class Watcher {
   constructor(vm, expr, cb) {
     this.vm = vm;
     this.expr = expr;
     this.cb = cb
     // 默认先存放一个老值
     this.oldValue = this.getValue()
   }
   getValue() {
     let value = CompileUtil.getValue(val, expr)
   }
 }

//vm.$watch(vm, 'school.name', (newVal) => {})

// 实现数据劫持
class Observer {
  constructor(data) {
    this.observer(data)
  }

  observer(data) {
    if(data && typeof data === 'object') {
      // 如果是对象 递归
      for(let key in data) {
        this.defineReactive(data, key, data[key])
      }
    }
  }

  defineReactive(obj, key, value) {
    this.observer(value)
    Object.defineProperty(obj, key, {
      get() {
        return value
      },
      set: (newVal) => {
        if(newVal !== value) {
          this.observer(newVal)
          value = newVal
        }
      }
    })
  }
}


// 编译
class Complier{
  constructor(el, vm) {
    // 判断el元素
    this.el = this.isElementNode(el) ? el : document.querySelector(el);
    // 把当前节点中的元素 获取 放到内存中
    this.vm = vm
    let fragment = this.node2frgament(this.el)

    // 编译模板 用数据编译
    this.compile(fragment)
    // 把内容塞到页面中


    this.el.appendChild(fragment)
  }

  // 是否有指令
  isDirective(attrName) {
    return attrName.startsWith('v-')
  }

  // 编译元素
  compileElement(node) {
    let attributes = node.attributes;
    [...attributes].forEach(attr => { // type="text"
      let {name, value: expr} = attr
      if (this.isDirective(name)) {
        let [, directive] = name.split('-')
        // 需要调用不同的指令来处理
        CompileUtil[directive](node, expr, this.vm)
      }
  })
  }

  // 编译文本
  compileText(node) { // 判断文本节点是否包含{{}}
    let content = node.textContent
    if(/\{\{(.+?)\}\}/.test(content)) {
      CompileUtil['text'](node, content, this.vm)
    }
  }

  // 用来编译内存中的dom节点
  compile(node) {
    let childNodes = node.childNodes;
    [...childNodes].forEach(child => {
      if (this.isElementNode(child)){
        this.compileElement(child)
        // 如果是元素的话 需要把自己穿进去 再遍历
        this.compile(child)
      } else {
        this.compileText(child)
      }
    })
  }

  node2frgament(node) {
    // 创建一个文档碎片
    let fragment = document.createDocumentFragment();
    let firstChild;
    let i = 0
    while(firstChild = node.firstChild) {
      fragment.appendChild(firstChild); // 插入碎片中，并会删除原节点
    }
    return fragment
  }
  isElementNode(node) {  // 元素节点
    return node.nodeType === 1
  }
}

CompileUtil = {
  // 根据表达式取得对应的数据
  getValue(vm, expr) {
   return expr.split('.').reduce((data, current) => {
     return data[current]
   }, vm.$data)
  },
  model(node, expr, vm) { //节点 表达式 实例
    let fn = this.updater['modelUpdater'];
    let value = this.getValue(vm, expr);
    fn(node, value)
  },
  html() {

  },
  text(node, expr, vm) {
    let fn = this.updater['textUpdater']
    let content = expr.replace(/\{\{(.+?)\}\}/g, (...args) => {
      return this.getValue(vm, args[1])
    })
    fn(node, content)
  },
  updater: {
    // 把数据插入节点
    modelUpdater(node, value) {
      node.value = value
    },
    // 处理文本节点
    textUpdater(node, content) {
      node.textContent = content
    }
  }
}

class Vue {
  constructor(options) {
    this.$el = options.el;
    this.$data = options.data;
   // 存在编译模板
    if(this.$el) {

      // 把数据 全部 defineProperty劫持
      new Observer(this.$data)
   console.log(this.$data)
      new Complier(this.$el, this)
    }
  }
}