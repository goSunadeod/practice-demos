<template>
  <div :style="{height: `${size}px`, border: '1px solid'}">{{item.value}}</div>
</template>

<script>
export default {
  props: {
    item: Object,
    size: Number
  }
}
</script>