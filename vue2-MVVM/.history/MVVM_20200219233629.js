// 编译
class Complier{
  constructor(el, vm) {
    // 判断el元素
    this.el = ''
  }

  isElementNode(node) {

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