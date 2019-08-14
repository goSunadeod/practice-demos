<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <p>斐波那契求和40：{{number}}</p>
  </div>
</template>

<script>
import ExampleWorker from './example.worker.js'
export default {
  name: 'app',
  data() {
    return {
      number: '计算中。。。'
    }
  },
  methods: {
    initWork() {
      let self = this;
      this.worker = new ExampleWorker();
      console.log('主线： work实例化');

      this.worker.onmessage = function(event) {
        self.number = event.data;
        console.log('主线： 从work接收到数据', event);
      };

      const message = { message: 40 };
      console.log('主线： 向work发送数据', message);
      this.worker.postMessage(message);
    }
  },
  mounted() {
    this.initWork();
  },
  beforeDestroy() {
    if (this.worker) {
      this.worker.terminate()
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
