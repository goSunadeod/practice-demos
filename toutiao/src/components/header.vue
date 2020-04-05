<template>
    <header :class="b('')">
        <a :class="b('letter')" href="javascript:;">
        </a>
        <div :class="b('logo')">
            <a href="javascript:;"></a>
            <i></i>
        </div>
        <div :class="b('search')"></div>
    </header>
</template>

<script>
import create from '@/utils/create';

export default create({
    name: 'header',
    data() {
        return {};
    }
});
</script>

<style scoped lang='scss'>
@import '../assets/scss/variable.scss';

.tt-header {
    width: 100%;
    background-color: $color-theme;
    display: flex;
    height: 44px;
    align-items: center;
    justify-content: space-between;
    padding: 0 20px;
    &__letter {
        background: url(../assets/imgs/letter.png) center no-repeat;
        background-size: contain;
        width: 32px;
        height: 25px;
        margin-left: 12px;
        display: block;
        position: relative;
    }
    &__logo {
        display: table;
        a {
            display: inline-block;
            background: url(../assets/imgs/logo.png) no-repeat center;
            width: 83px;
            background-size: 83px !important;
            padding-left: 15px;
            height: 44px;
        }
        i {
            width: 25px;
            height: 44px;
            display: inline-block;
            background: url(../assets/imgs/refresh.png) no-repeat center center;
            background-size: 15px;
        }
    }
    &__search {
        width: 24px;
        height: 24px;
        background: url(../assets/imgs/search.png) no-repeat center;
        background-size: contain;
        margin-right: 12px;
    }
    &--a {
        font-size: 50px;
    }
}
</style>
