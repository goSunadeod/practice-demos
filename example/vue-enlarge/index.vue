<template>
<div>
  <enlarge :src="require('./assets/前端体系.png')" :bigSrc="require('./assets/前端体系.png')"></enlarge>
</div>
</template>

<script>
import enlarge from './enlarge.vue';
export default {
  components: { enlarge }
}
</script>