import {reroute} from './reroute'

export const routingEventsListeningTo = ['hashchange', 'popstate']

function urlReroute() {
  reroute([], arguments)
}

const capture = {
  hashchange: [],
  popstate: []
}

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
}

window.removeEventListener = function(eventName, fn) {
  if(routingEventsListeningTo.includes(eventName)) {
    capture[eventName] = capture[eventName].filter(l => l !== fn)
    return 
  }
  return originalRemove.apply(this, arguments)
}

// history路由切换 不触发popstate
function patchedUpdateState(updateState, mthName) {
  return function() {
    const urlBefore = window.location.href;
    updateState.apply(this, arguments)
    const urlAfter =  window.location.href;
    if (urlBefore !== urlAfter) {
      urlReroute(new PopStateEvent('popstate'))
    }
  }
}

window.history.pushState = patchedUpdateState(window.history.pushState, 'pushState')
window.history.replaceState = patchedUpdateState(window.history.replaceState, 'replaceState')