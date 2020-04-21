<template>
  <section class="tt-navbar1">
    <div class="tt-navbar1__wrapper" ref="nav">
      <a
        v-for="(title, i) of titleList"
        :key="title"
        :ref="el => { titles[i] = el }"
        :class="{ active: active === i }"
        @click="handlerNav(i)"
        >{{ title }}</a
      >
    </div>
    <router-view />
  </section>
</template>

<script>
// import create from "@/utils/create";
import { scrollLeftTo } from "@/utils";
import { ref } from 'vue'

export default {
  name: "navbar1",
  setup() {
    const titles = ref([])
    const nav = ref(null)
    const active = ref(0)
    const titleList = ref([
      "军事",
      "娱乐",
      "视频",
      "影视",
      "V3",
      "愉快",
      "你你",
      "是谁",
      "事实",
      "与人",
    ])

    const handlerNav = (i) => {
      active.value = i;
      scrollIntoView();
    }

    const scrollIntoView = (immediate) => {
      const title = titles.value[active.value];
      const to = title.offsetLeft - (nav.value.offsetWidth - title.offsetWidth) / 2;
      scrollLeftTo(nav.value, to, immediate ? 0 : 0.3);
    }

    // 把创建的引用 return 出去
    return {
      titles,
      nav,
      handlerNav,
      active,
      titleList
    }
  }
};
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
