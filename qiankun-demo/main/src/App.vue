<template>
  <div id="main">
    这是主应用文字
    <br />
    <button @click="changeView('/one')">子应用one</button>
    &nbsp;
    <button @click="changeView('/two')">子应用two</button>
    <br />
    <br />
    <!--增加修改state的按钮-->
    <button @click="changeState('1')">修改state = 1</button>
    &nbsp;
    <button @click="changeState('2')">修改state = 2</button>
    <hr />
    <!--这里的 micro-view 对应的是上面 main.js 里面的子应用配置的 container: '#micro-view' -->
    <div id="micro-view"></div>
  </div>
</template>

<script>
export default {
  name: "App",
  methods: {
    changeView(who) {
      window.history.pushState(null, who, who);
    },
    changeState(value) {
      // ------ 修改state
      this.$actions.setGlobalState({
        mt: value
      });
    }
  }
};
</script>

<style>
#main {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>