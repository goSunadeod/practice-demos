(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.singleSpa = {}));
}(this, (function (exports) { 'use strict';

  const NOT_LOADED = "NOT_LOADED";// 没有加载过
  const LOADING_SOURCE_CODE = "LOADING_SOURCE_CODE";// 加载原代码
  const NOT_BOOTSTRAPPED = "NOT_BOOTSTRAPPED";// 没有启动
  const BOOTSTRAPPING = "BOOTSTRAPPING";// 启动中
  const NOT_MOUNTED = "NOT_MOUNTED";// 没有挂载
  const MOUNTING = "MOUNTING";// 挂载中
  const MOUNTED = "MOUNTED";// 挂载完毕
  const UNMOUNTING = "UNMOUNTING";// 卸载中
  function shouldBeActive(app) { // 当前app是否应该激活
    return app.activeWhen(window.location);
  }

  let started = false;
  function start() {
    started = true;
    reroute();
  }

  function flattenFnArray(fns) {
    fns = Array.isArray(fns) ? fns : [fns];
    // 通过promise链来链式调用  多个方法组合成一个方法
    return (props) => fns.reduce((p, fn) => p.then(() => fn(props)), Promise.resolve());
  }


  async function toLoadPromise(app) {
    if (app.loadPromise) {
      return app.loadPromise; //缓存机制
    }
    return (app.loadPromise = Promise.resolve().then(async () => {
      app.status = LOADING_SOURCE_CODE;
      let { bootstrap, mount, unmount } = await app.loadApp(app.customProps);
      app.status = NOT_BOOTSTRAPPED; // 没有调用bootstrap方法
      // 我希望将多个promise组合在一起 compose
      app.bootstrap = flattenFnArray(bootstrap);
      app.mount = flattenFnArray(mount);
      app.unmount = flattenFnArray(unmount);
      delete app.loadPromise;
      return app;
    }))
  }

  async function toUnmountPromise(app) {
    // 当前应用没有被挂载直接什么都不做了
    if (app.status != MOUNTED) {
      return app;
    }
    app.status = UNMOUNTING;
    await app.unmount(app.customProps);
    app.status = NOT_MOUNTED;
    return app;
  }

  async function toMountPromise(app) {
    if (app.status !== NOT_MOUNTED) {
      return app;
    }
    app.status = MOUNTING;
    await app.mount(app.customProps);
    app.status = MOUNTED;
    return app;
  }

  async function toBootstrapPromise(app) {
    if (app.status !== NOT_BOOTSTRAPPED) {
      return app;
    }
    app.status = BOOTSTRAPPING;
    await app.bootstrap(app.customProps);
    app.status = NOT_MOUNTED;
    return app;
  }

  const routingEventsListeningTo = ['hashchange', 'popstate'];

  function urlReroute() {
    reroute();
  }

  const capture = {
    hashchange: [],
    popstate: []
  };

  window.addEventListener('hashchange', urlReroute);
  window.addEventListener('popstate', urlReroute);


  const originalAdd = window.addEventListener;
  const originalRemove = window.removeEventListener;

  window.addEventListener = function(eventName, fn) {
    if(routingEventsListeningTo.includes(eventName) && !capture[eventName].some(l => l=== fn)) {
      capture[eventName].push(fn);
      return;
    }
    return originalAdd.apply(this, arguments)
  };

  window.removeEventListener = function(eventName, fn) {
    if(routingEventsListeningTo.includes(eventName)) {
      capture[eventName] = capture[eventName].filter(l => l !== fn);
      return 
    }
    return originalRemove.apply(this, arguments)
  };

  // history路由切换 不触发popstate
  function patchedUpdateState(updateState, mthName) {
    return function() {
      const urlBefore = window.location.href;
      updateState.apply(this, arguments);
      const urlAfter =  window.location.href;
      if (urlBefore !== urlAfter) {
        urlReroute(new PopStateEvent('popstate'));
      }
    }
  }

  window.history.pushState = patchedUpdateState(window.history.pushState);
  window.history.replaceState = patchedUpdateState(window.history.replaceState);

  // 核心应用处理方法
  function reroute() {
    //  需要获取要加载的应用
    //  需要获取要被挂载的应用
    //  哪些应用需要被卸载
    const {
      appsToLoad, // 获取要去加载的app
      appsToMount,
      appsToUnmount
    } = geyAppChanges();
    // start 方法同步其内部加载promise流程是异步
    if (started) {
      // app装载
      return performAppChanges();
    } else {
      // 注册应用时 需要预先加载
      return loadApps();
    }
    async function loadApps() { // 预加载应用
      let apps = await Promise.all(appsToLoad.map(toLoadPromise)); // 就是获取到bootstrap,mount和unmount方法放到app上
    }
    async function performAppChanges() {
      // 先卸载不需要的应用 去加载需要的应用
      let unmountPromises = appsToUnmount.map(toUnmountPromise);

      appsToLoad.map(async (app) => {
        app = await toLoadPromise(app);
        app = await toBootstrapPromise(app);
        return await toMountPromise(app);
      });

      // 到这一步 loadApp已经执行完毕
      appsToMount.map(async (app) => {
        app = await toBootstrapPromise(app);
        return await toMountPromise(app);
      });
    }
  }

  const apps = [];
  function registerApplication(appName, loadApp, activeWhen, customProps) {
    apps.push({
      name: appName,
      loadApp,
      activeWhen,
      customProps,
      status: NOT_LOADED
    });
    reroute();
  }



  function geyAppChanges() {
    const appsToUnmount = [];
    const appsToLoad = [];
    const appsToMount = [];
    apps.forEach(app => {
      const appShouldBeActive = shouldBeActive(app);
      switch (app.status) {// toLoad
        case NOT_LOADED:
        case LOADING_SOURCE_CODE:
          if (appShouldBeActive) {
            appsToLoad.push(app);
          }
          break;
        case NOT_BOOTSTRAPPED: // toMount
        case NOT_BOOTSTRAPPED:// toMount
        case NOT_MOUNTED:
          if (appShouldBeActive) {
            appsToMount.push(app);
          }
          break;
        case MOUNTED:// toUnmount
          if (!appShouldBeActive) {
            appsToUnmount.push(app);
          }
      }
    });
    return { appsToUnmount, appsToLoad, appsToMount }
  }

  exports.registerApplication = registerApplication;
  exports.start = start;

  Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=single-spa.js.map
