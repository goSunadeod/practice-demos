import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false


// 导入qiankun所需方法
import {
  registerMicroApps, // 注册子应用
  runAfterFirstMounted, // 当地一个子应用装载完毕
  setDefaultMountApp, // 设置默认装载的子应用
  initGlobalState, // 微前端之间的通信
  start, // 启动
} from 'qiankun'

new Vue({
  render: h => h(App),
}).$mount('#container')

// 注册子应用
registerMicroApps([
  {
    name: 'one',
    entry: '//localhost:6661',
    container: '#micro-view',
    activeRule: '/one',
    props: {
      msg: {
        data: {
          mt: 'you are one'
        }
      },
      fn: {
        show(msg) {
          console.log('one:', msg);
        }
      }
    }
  },
  {
    name: 'two',
    entry: '//localhost:6662',
    container: '#micro-view',
    activeRule: '/two',
    // ----------------> 增加props参数
    props: {
      msg: {
        data: {
          mt: 'you are one'
        }
      },
      fn: {
        show(msg) {
          console.log('two:', msg);
        }
      }
    }
  },
],
  {
    beforeLoad: [
      app => {
        console.log('beforeLoad', app);
      }
    ],
    beforeMount: [
      app => {
        console.log('beforeMount');
      }
    ],
    beforeUnmount: [
      app => {
        console.log('beforeUnmount');
      }
    ],
    afterUnmount: [
      app => {
        console.log('afterUnmount');
      }
    ]
  })


// 通讯
const actions = initGlobalState({
  mt: 'init' // 初始化state
})

// 在项目中任何需要监听的地方进行监听，在这里监听是为了方便
actions.onGlobalStateChange((state, prev) => {
  console.log('main state change', state);
})

// 将action对象绑到Vue原型上，为了项目中其他地方使用方便
Vue.prototype.$actions = actions

setDefaultMountApp('one')

// 第一个子应用加载完毕后回调
runAfterFirstMounted(() => {
  console.log('第一个子应用加载完毕后的回调');
})

// 启动qiankun
start()