<template>
  <div class="viewport" ref="viewport" @scroll="handleScroll">
    <!-- 滚动条 -->
    <div class="scroll-bar" ref="scrollbar"></div>
    <!-- 真实渲染内容 padding也可以代替-->
    <div class="scroll-list" :style="{transform: `translate3d(0, ${offset}px, 0)`}">
      <div v-for="item in visibleData" :key="item.id">
      <slot :item="item"></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    size: Number,// 每项高度
    remain: Number, //可见个数
    items: Array
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
  mounted() {
    this.$refs.viewport.style.height = this.size * this.remain + 'px'
    this.$refs.scrollbar.style.height = this.items.length * this.size + 'px'
  },
  methods: {
    handleScroll(e) {
      // 计算
      let scrollTop = this.$refs.viewport.scrollTop
      this.start = Math.floor(scrollTop / this.size)
      this.end = this.start + this.remain
      // 注意减上屏
      this.offset = this.start * this.size - this.size * this.prevCount
    }
  }
}
</script>
<style lang="stylus" scoped>
.viewport {
  overflow-y: scroll;
  position: relative;
}
.scroll-list {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
}
</style>