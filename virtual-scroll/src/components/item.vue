<template>
  <div :style="{padding: '20px', border: '1px solid'}">{{item.value}}</div>
</template>

<script>
export default {
  props: {
    item: Object,
    size: Number
  }
}
</script>