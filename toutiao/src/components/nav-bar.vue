<template>
    <section :class="b('')">
        <div :class="b('wrapper')" ref="wrap" :style="trans">
            <a
                v-for="(title, i) of titles"
                :key="title"
                :ref="`wrap${i}`"
                :class="{ active: active === i }"
                @click="hanlderNav(i)"
            >{{title}}</a>
        </div>
        <router-view />
    </section>
</template>

<script>
import create from '@/utils/create';

export default create({
    name: 'navbar',
    data() {
        return {
            active: 0,
            titles: [
                '军事',
                '娱乐',
                '视频',
                '影视',
                '愉快',
                '你你',
                '是谁',
                '事实',
                '与人'
            ],
            trans: {
                transform: ''
            }
        };
    },
    created() {
        this.prevOffset = 0; // 保存上次滚动的偏移
    },
    methods: {
        hanlderNav(i) {
            this.active = i;
            this.animate(i);
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
        }
    }
});
</script>

<style lang="scss">
@import 'assets/scss/variable.scss';
@import 'assets/scss/mixins.scss';

.tt-navbar {
    overflow: hidden;
    &__wrapper {
        display: inline-block;
        transition: 0.2s cubic-bezier(0.445, 0.05, 0.55, 0.95);
        @include no-wrap;
        a {
            white-space: nowrap;
            display: inline-block;
            padding-left: 10px;
            padding-right: 10px;
            color: #505050;
            text-decoration: none;
            font-size: 17px;
            line-height: 26px;
            height: 26px;
            margin-left: 5px;
            margin-top: 5px;
            margin-bottom: 5px;
            -webkit-tap-highlight-color: rgba(0, 0, 0, 0.3);
        }
        & > .active {
            color: $color-theme;
        }
    }
}
</style>
