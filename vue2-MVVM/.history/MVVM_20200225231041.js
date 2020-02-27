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
      CompileUtil['text'](node, node, this.vm)
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
    let content = expr.replace(/\{\{(.+?)\}\}/g)
  },
  updater: {
    // 把数据插入节点
    modelUpdater(node, value) {
      node.value = value
    },
    // 处理文本节点
    textUpdater() {
      node.textContent = value
    }
  }
}

class Vue {
  constructor(options) {
    this.$el = options.el;
    this.$data = options.data;
   // 存在编译模板
    if(this.$el) {
      new Complier(this.$el, this)
    }
  }
}