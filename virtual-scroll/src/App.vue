<template>
  <div id="app">
    <!-- variable 不定高 -->
    <VirtualList :size="100" :remain="8" :items="items" :variable="true">
      <Items slot-scope="{item}" :item="item"></Items>
    </VirtualList>
  </div>
</template>
<script>
import VirtualList from './components/virtaul-list'
import Items from './components/item'
import Mock from 'mockjs'
const items = Array.from(Array(1000), (v,k) => ({id: k, value: Mock.Random.sentence(5, 50)}))
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