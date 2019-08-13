import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')

import("./example.worker.js").then(({ default: ExampleWorker }) => {
  const worker = new ExampleWorker();
  console.log("MAIN: Worker instantiated.");

  worker.onmessage = function(event) {
    console.log("MAIN: Received message from worker", event);
  };

  const message = { message: "ping" };
  console.log("MAIN: Sending message to worker", message);
  worker.postMessage(message);
});
