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
  methods: {
    hanlderNav(i) {
      this.active = i;
      this.scrollIntoView();
    },
    scrollIntoView(immediate) {
      const { titles, nav } = this.$refs;
      const title = titles[this.active];
      const to = title.offsetLeft - (nav.offsetWidth - title.offsetWidth) / 2;
     
      scrollLeftTo(nav, to, immediate ? 0 : +0.3);
    }
  },
});
</script>

<style lang="scss">
@import "assets/scss/variable.scss";
@import "assets/scss/mixins.scss";

::-webkit-scrollbar {
    width: 0;
    background: transparent;
}
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
    overflow-x: auto;
    &::-webkit-scrollbar {
          display: none;
      }
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
