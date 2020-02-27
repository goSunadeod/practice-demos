// 编译
class Complier{
  constructor(el, vm) {
    // 判断el元素
    this.el = this.isElementNode(el) ? el : document.querySelector(el);
    // 把当前节点中的元素 获取 放到内存中

    let fragment = this.node2frgament(this.el)
  }

  node2frgament(node) {
    // 创建一个文档碎片
    let fragment = document.createDocumentFragment();
    let firstChild;
    console.log(node.firstChild)
    while(firstChild = node.firstChild) {
      fragment.appendChild(firstChild);
    }
    return fragment
  }
  isElementNode(node) {  // 元素节点
    return node.type === 1
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