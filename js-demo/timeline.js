// 黄轶老师的分享
let DEFAULT_INTERVAL = 1000 / 60

/// 状态
let STATE_INITIAL = 0;
let STATE_START = 1;
let STATE_STOP = 2;

let requestAnimationFrame = (function() {
return window.requestAnimationFrame ||
window.webkitRTCPeerConnection ||
window.mozRequestAnimationFrame ||
window.oRequestAnimationFrame ||
function (callback) {
  return window.setTimeout(callback, callback.interval || DEFAULT_INTERVAL)
}
})()

let cancelAnimationFrame = (function() {
  return window.cancelAnimationFrame ||
  window.webkitCancelAnimationFrame ||
  window.mozCancelAnimationFrame ||
  window.oCancelAnimationFrame ||
  function (id) {
    return window.clearTimeout(id)
  }
  })()

  /**
   * TimeLine 时间轴类
   */
  function Timeline() {
    this.animationHandler = 0;
    this.state = STATE_INITIAL;
  }

  Timeline.prototype.onenterframe = function(time) {

  }

  Timeline.prototype.start = function(interval) {
    if(this.state === STATE_START) return
    this.state = STATE_START;
    this.interval = interval || DEFAULT_INTERVAL
    startTimeline(this, +new Date())
  }

  Timeline.prototype.stop = function() {
    if(this.state !== STATE_START) return
    this.state = STATE_STOP
    // 记录动画开始到现在所经历的时间
    if (this.startTime) {
      this.dur = +new Date() - this.startTime
    }
    cancelAnimationFrame(this.animationHandler)
  }

  Timeline.prototype.restart = function() {
    if(this.state === STATE_START) return
    this.state = STATE_START
    if(!this.dur || !this.interval) return
    this.state = STATE_START;
    // 无缝连接动画
    startTimeline(this, +new Date() - this.dur)
  }

  /**
   * 时间抽动画启动
   *
   * @param {*} timeline 时间轴实例
   * @param {*} startTime 东湖开始时间
   */
  function startTimeline(timeline, startTime) {
    timeline.startTime = startTime
    nextTick.interval = timeline.interval
    let lastTick = +new Date()
    nextTick();
    // 每一帧执行的函数
    function nextTick() {
      var now = +new Date()
      timeline.animationHandler = requestAnimationFrame(nextTick)

      if (now - lastTick >= timeline.interval) {
        timeline.onenterframe(now - startTime)
        lastTick = now;
      }
    }
  }

  module.exports = Timeline