<template>
  <div class="viewport" ref="viewport" @scroll="handleScrollFn">
    <!-- 滚动条 -->
    <div class="scroll-bar" ref="scrollbar"></div>
    <!-- 真实渲染内容 padding也可以代替-->
    <div class="scroll-list" :style="{transform: `translate3d(0, ${offset}px, 0)`}">
      <div v-for="item in visibleData" :vid="item.id" :key="item.id" ref="items">
      <slot :item="item"></slot>
      </div>
    </div>
  </div>
</template>

<script>
import throttle from 'loadsh/throttle'
export default {
  props: {
    size: Number,// 每项高度
    remain: Number, //可见个数
    items: Array,
    variable: Boolean
  },
  data() {
    return {
      start: 0,
      end: this.remain,
      offset: 0
    }
  },
  computed: {
    // 三屏渲染
    prevCount() {
      return Math.min(this.start, this.remain);
    },
    nextCount() {
      return Math.min(this.remain, this.items.length - this.end);
    },
    // 可见数据
    visibleData() {
      let start = this.start - this.prevCount;
      let end = this.end + this.nextCount
      return this.items.slice(start, end)
    }
  },
  created() {
    this.handleScrollFn = throttle(this.handleScroll, 200, {leading: false})
  },
  mounted() {
    this.$refs.viewport.style.height = this.size * this.remain + 'px'
    this.$refs.scrollbar.style.height = this.items.length * this.size + 'px'
    if (this.variable) {
   this.cacheList()
    }
 
  },
  updated() {
    // 更新真实dom值
    this.$nextTick(() => {
      let nodes = this.$refs.items;
      if (!(nodes&&nodes.length > 0)) return
      nodes.forEach(node => {
        const {height} = node.getBoundingClientRect();
        let id = +node.getAttribute('vid')
        let oldHeight = this.positions[id].height;
        let value = oldHeight - height;
        if (value) {
          // 高度改变 top不变 bottom改变
          this.positions[id].height = height
          this.positions[id].bottom -= value
          // 底下全部改变 全部后移
          for(let i = id + 1; i<this.positions.length; i++) {
            this.positions[i].top = this.positions[i-1].bottom
            this.positions[i].bottom -= value
          }
        }
      })
     this.$refs.scrollbar.style.height = this.positions[this.positions.length - 1].bottom + 'px'

    })
  },
  methods: {
    // 缓存 height top bottom
    cacheList() {
      this.positions = this.items.map((item, index) => ({
        height: this.size,
        top: index * this.size,
        bottom: (index + 1) * this.size
      }))
    },
    getStartIndex(value) { // 查找当前滚动到的值
      let start = 0
      let end = this.positions.length - 1;
      let temp = null;
      while(start <= end) {
        let middleIndex = parseInt((start + end)/2)
        let middleValue = this.positions[middleIndex].bottom
        if (middleValue === value) {
          return middleIndex + 1
        } else if (middleValue < value) {
          start = middleIndex + 1
        } else {
          if (!temp || temp > middleIndex) {
            temp = middleIndex // 找到范围
          }
          end = middleIndex - 1
        }
      }
       return temp;
    },
    handleScroll(e) {
     let scrollTop = this.$refs.viewport.scrollTop
      if (this.variable) {
        this.start = this.getStartIndex(scrollTop)
        this.end = this.start + this.remain;
        const position = this.positions[this.start - this.prevCount]
        this.offset = position ? position.top : 0
      } else {
      this.start = Math.floor(scrollTop / this.size)
      this.end = this.start + this.remain
      // 注意减上屏
      this.offset = this.start * this.size - this.size * this.prevCount
      }
    }
  }
}
</script>
<style lang="stylus" scoped>
.viewport {
  overflow-y: scroll;
  position: relative;
  box-shadow: 0 0 10px orange;
}
.scroll-list {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
}
</style>