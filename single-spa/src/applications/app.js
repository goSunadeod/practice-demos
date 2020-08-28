import { NOT_LOADED, LOADING_SOURCE_CODE, NOT_BOOTSTRAPPED, NOT_MOUNTED, MOUNTED, shouldBeActive } from './app.helpers';
import { reroute } from '../navigation/reroute.js';

const apps = [];
export function registerApplication(appName, loadApp, activeWhen, customProps) {
  apps.push({
    name: appName,
    loadApp,
    activeWhen,
    customProps,
    status: NOT_LOADED
  })
  reroute();
}



export function geyAppChanges() {
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
  })
  return { appsToUnmount, appsToLoad, appsToMount }
};