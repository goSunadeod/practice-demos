<template>
  <div id="app">
    <!-- 定高 -->
    <VirtualList :size="40" :remain="8" :items="items">
      <Items slot-scope="{item}" :item="item" :size="40"></Items>
    </VirtualList>
  </div>
</template>
<script>
import VirtualList from './components/virtaul-list'
import Items from './components/item'
const items = Array.from(Array(1000), (v,k) => ({id: k, value: k}))
export default {
  name: 'App',
  data() {
    return {items}
  },
  components: {
    VirtualList,
    Items
  }
}
</script>

<style lang="stylus">
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
</style>