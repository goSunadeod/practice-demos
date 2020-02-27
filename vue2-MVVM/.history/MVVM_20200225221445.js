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

  // 用来编译内存中的dom节点
  compile(node) {
    let childNodes = node.childNodes;
    [...childNodes].forEach(child => {
      console.log(child)
      return
      if (this.isElementNode(child)){
        console.log('element', child)
      } else {
        console.log('text', child)
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