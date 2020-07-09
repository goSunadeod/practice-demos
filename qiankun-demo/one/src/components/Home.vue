<template>
  <div>
    <div class="home">this is one home</div>
    <button @click="testFn">测试变量</button>
  </div>
</template>

<script>
export default {
  name: "Home",
  methods: {
    testFn() {
      console.log(this.$test);
    }
  }
};
</script>

<style scoped></style>