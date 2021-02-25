<template>
  <div class="base-layer" v-waterMarker="{text:'乐心瑶版权所有',textColor:'rgba(180, 180, 180, 0.4)'}">
    <div class="demo-row">
      <!-- 使用指令时，指令参数如果时函数，只能传入函数名，不可带括号，否则会立即执行函数体。 -->
      <button v-debounce="goToCustomDirectDemo">自定义指令Demo</button>
      <br>
      <button style="margin-top: 20px;" v-debounce="goToFullScreenDemo">实现进入全屏</button>
    </div>
    <div class="more-operations" v-draggable>
      <a :href="'https://github.com/ysg-lijinwen/leyao'" target="_blank">示例代码</a>
    </div>
  </div>
</template>

<script>

export default {
  name: "index",
  components: {},
  data() {
    return {}
  },
  mounted() {
  },
  methods: {
    goToNextPage(path, params) {
      return this.$router.push({
        path: path,
        query: params
      })
    },
    goToCustomDirectDemo() {
      this.goToNextPage('/customDirect')
    },
    goToFullScreenDemo() {
      this.goToNextPage('/fullScreen')
    },
  }
}
</script>

<style scoped>
.base-layer {
  min-height: 100vh;
}

.demo-row {
  margin-top: 10px;
}

.more-operations {
  background-color: rgba(0, 195, 255, 0.5);
  /*必须设置固定宽度，否者拖动会变形。*/
  width: 100px;
  height: auto;
  padding: 10px 20px;
  border-radius: 10px;
  /*fixed总是以body为定位时的对象，总是根据浏览器的窗口来进行元素的定位，通过"left"、 "top"、 "right"、 "bottom" 属性进行定位。*/
  position: fixed;
  right: 0;
  top: 50px;
  z-index: 2;
}
</style>
