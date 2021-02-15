<template>
  <div class="magnifier">
    <!-- 小图 -->
    <div
      class="small-box"
      @mouseover="handOver"
      @mousemove="handMove"
      @mouseout="handOut"
    >
      <img class="smallPic" :src="`${src}?x-oss-process=image/resize,l_836`" />
      <div
        class="magnifier-zoom"
        v-show="true"
        :style="{
          background: configs.maskColor,
          height: configs.maskWidth + 'px',
          width: configs.maskHeight + 'px',
          opacity: configs.maskOpacity,
          transform: transformMask,
          position: 'absolute',
          top: 0,
          left: 0
        }"
      ></div>
    </div>
    <!-- 大图, 注意误差 -->
    <div
      class="magnifier-layer"
      v-show="showMagnifier"
      :style="{
        width: configs.width + 'px',
        height: configs.height + 'px',
        left: configs.width + 20 + 'px',
      }"
    >
      <div
        class="big-box"
        :style="{
          width: bigWidth + 'px',
          height: bigHeight + 'px',
          left: moveLeft,
          top: moveTop,
        }"
      >
        <div
          class="big-box-img"
          :style="{
            width: bigWidth - 2 + 'px',
            height: bigHeight - 2 + 'px',
          }"
        >
          <img
            :src="bigSrc"
            :style="{
              maxWidth: bigWidth - 2 + 'px',
              maxHeight: bigHeight - 2 + 'px',
            }"
          />
        </div>
      </div>
    </div>
  </div>
</template>


<script>
export default {
  data() {
    return {
      imgObj: {},
      moveLeft: 0,
      moveTop: 0,
      transformMask: `translate(0px, 0px)`,
      showMagnifier: false,
      showMask: false,
      init: false,
    };
  },
  props: {
    // 小图地址
    src: {
      type: String,
    },
    // 大图地址
    bigSrc: {
      type: String,
    },
    // 配置项
    configs: {
      type: Object,
      default() {
        return {
          width: 420, //放大区域
          height: 420, //放大区域
          maskWidth: 210, //遮罩
          maskHeight: 210, //遮罩
          maskColor: "rgba(25,122,255,0.5)", //遮罩样式
          maskOpacity: 0.6,
          scale: 2, //放大比例
        };
      },
    },
  },
  computed: {
    bigWidth() {
      return this.configs.scale * this.configs.width;
    },
    bigHeight() {
      return this.configs.scale * this.configs.height;
    },
  },
  methods: {
    handMove(e) {
      // 动态获取小图的位置（或者监听 scroll ）
      let imgRectNow = this.imgObj.getBoundingClientRect();
      let objX = e.clientX - imgRectNow.left;
      let objY = e.clientY - imgRectNow.top;

      // 计算初始的遮罩左上角的坐标
      let maskX = objX - this.configs.maskWidth / 2;
      let maskY = objY - this.configs.maskHeight / 2;

      // 判断是否超出界限,并纠正
      maskY = maskY < 0 ? 0 : maskY;
      maskX = maskX < 0 ? 0 : maskX;
      if (maskY + this.configs.maskHeight >= imgRectNow.height) {
        maskY = imgRectNow.height - this.configs.maskHeight;
      }
      if (maskX + this.configs.maskWidth >= imgRectNow.width) {
        maskX = imgRectNow.width - this.configs.maskWidth;
      }

      // 遮罩移动
      this.transformMask = `translate(${maskX}px, ${maskY}px)`;

      // 背景图移动
      this.moveLeft = -maskX * this.configs.scale + "px";
      this.moveTop = -maskY * this.configs.scale + "px";
    },
    handOut() {
      this.showMagnifier = false;
      this.showMask = false;
    },
    handOver() {
      if (!this.init) {
        this.init = true;
        this.imgObj = this.$el.getElementsByClassName("small-box")[0];
      }
      this.showMagnifier = true;
      this.showMask = true;
    },
  },
};
</script>
