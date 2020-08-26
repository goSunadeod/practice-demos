import { started } from '../start';
import { geyAppChanges } from '../applications/app';
import { toLoadPromise } from '../lifecycles/load';
import { toUnmountPromise } from '../lifecycles/unmount';
import { toMountPromise } from '../lifecycles/mount';
import { toBootstrapPromise } from '../lifecycles/bootstrap';
// 核心应用处理方法
export function reroute() {
  //  需要获取要加载的应用
  //  需要获取要被挂载的应用
  //  哪些应用需要被卸载
  const {
    appsToLoad, // 获取要去加载的app
    appsToMount,
    appsToUnmount
  } = geyAppChanges();
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
      app = await toMountPromise(app);
      return await toMountPromise(app);
    })
  }
}