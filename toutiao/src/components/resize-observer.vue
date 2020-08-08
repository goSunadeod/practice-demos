<template>
  <div ref="observe" class="resize-observer" tabindex="-1" />
</template>

<script>
import { getInternetExplorerVersion } from "../utils/compatibility";
import { onMounted, onBeforeUnmount, ref, nextTick } from "vue";

let isIE;
function initCompat() {
  if (!initCompat.init) {
    initCompat.init = true;
    isIE = getInternetExplorerVersion() !== -1;
  }
}
export default {
  name: "ResizeObserver",
  setup(props, context) {
    const observe = ref(null);
    let _w, _h, _resizeObject;
    function compareAndNotify() {
      if (
        _w !== observe.value.offsetWidth ||
        _h !== observe.value.offsetHeight
      ) {
        _w = observe.value.offsetWidth;
        _h = observe.value.offsetHeight;
        context.emit("notify", {
          width: _w,
          height: _h,
        });
      }
    }
    function addResizeHandlers() {
      _resizeObject.contentDocument.defaultView.addEventListener(
        "resize",
        compareAndNotify
      );
      compareAndNotify();
    }
    function removeResizeHandlers() {
      if (_resizeObject && _resizeObject.onload) {
        if (!isIE && _resizeObject.contentDocument) {
          _resizeObject.contentDocument.defaultView.removeEventListener(
            "resize",
            compareAndNotify
          );
        }
        observe.value.removeChild(_resizeObject);
        _resizeObject.onload = null;
        _resizeObject = null;
      }
    }
    onMounted(() => {
      initCompat();
      nextTick(() => {
        _w = observe.value.offsetWidth;
        _h = observe.value.offsetHeight;
      });
      const object = document.createElement("object");
      _resizeObject = object;
      object.setAttribute("aria-hidden", "true");
      object.setAttribute("tabindex", -1);
      object.onload = addResizeHandlers;
      object.type = "text/html";
      if (isIE) {
        observe.value.appendChild(object);
      }
      object.data = "about:blank";
      if (!isIE) {
        observe.value.appendChild(object);
      }
    });
    onBeforeUnmount(() => {
      removeResizeHandlers();
    });
    return {
      observe,
    };
  },
};
</script>

<style scoped>
.resize-observer {
  position: absolute;
  top: 0;
  left: 0;
  z-index: -1;
  width: 100%;
  height: 100%;
  border: none;
  background-color: transparent;
  pointer-events: none;
  display: block;
  overflow: hidden;
  opacity: 0;
}
.resize-observer >>> object {
  display: block;
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  overflow: hidden;
  pointer-events: none;
  z-index: -1;
}
</style>