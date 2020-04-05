<template>
  <section :class="b('')">
    <div :class="b('wrapper')" ref="nav">
      <a
        v-for="(title, i) of titles"
        :key="title"
        ref="titles"
        :class="{ active: active === i }"
        @click="hanlderNav(i)"
        >{{ title }}</a
      >
    </div>
    <router-view />
  </section>
</template>

<script>
import create from "@/utils/create";
import { scrollLeftTo } from "@/utils";

export default create({
  name: "navbar1",
  data() {
    return {
      active: 0,
      titles: [
        "军事",
        "娱乐",
        "视频",
        "影视",
        "愉快",
        "你你",
        "是谁",
        "事实",
        "与人",
      ],
    };
  },
  created() {
    this.prevOffset = 0; // 保存上次滚动的偏移
  },
  methods: {
    hanlderNav(i) {
      this.active = i;
      //   this.animate(i);
      this.scrollIntoView();
    },
    scrollIntoView(immediate) {
      const { titles, nav } = this.$refs;
      const title = titles[this.active];
      const to = title.offsetLeft - (nav.offsetWidth - title.offsetWidth) / 2;
     
      scrollLeftTo(nav, to, immediate ? 0 : +0.3);
    },
    animate(i) {
      const el = this.$refs[`wrap${i}`][0];
      const elWith = el.offsetWidth;
      const elLeftDistance = el.getBoundingClientRect().left; // 动态获取元素距离浏览器左边的距离
      const viewport = window.innerWidth;
      const terminal = (viewport - elWith) / 2; // 中间到达浏览器边框的距离
      const wrapWidth = this.$refs.wrap.offsetWidth;
      const limit = wrapWidth - viewport; // 向左滚动的最大距离，限制为limit 向右限制为0
      let prefix = elLeftDistance - terminal; // 需要滚动的距离
      prefix += this.prevOffset;
      if (prefix >= 0) {
        prefix = Math.min(prefix, limit);
        this.trans.transform = `translateX(${-prefix}px)`;
      } else {
        prefix = Math.min(-prefix, 0);
        this.trans.transform = `translateX(${prefix}px)`;
      }
      this.prevOffset = Math.abs(prefix);
    },
  },
});
</script>

<style lang="scss">
@import "assets/scss/variable.scss";
@import "assets/scss/mixins.scss";

.tt-navbar1 {
  overflow: hidden;
  &__wrapper {
    position: relative;
    display: flex;
    box-sizing: content-box;
    height: 100%;
    background-color: #fff;
    user-select: none;
    @include no-wrap;
    a {
      display: block;
      -webkit-box-flex: 0;
      -webkit-flex: 0 0 16%;
      flex: 0 0 16%;
      box-sizing: border-box;
      min-width: 0;
      padding: 0 5px;
      font-size: 17px;
      line-height: 44px;
      text-align: center;
      cursor: pointer;
      color: #505050;
      text-decoration: none;
      -webkit-tap-highlight-color: rgba(0, 0, 0, 0.3);
      @include no-wrap;
    }
    & > .active {
      color: $color-theme;
    }
  }
}
</style>
