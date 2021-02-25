<template>
  <div>
    <full-screen ref="fullscreen" @change="fullscreenChange">
      <div style="color: #000000;">
        <h1>This is full screen content!</h1>
        组件方式实现全屏
      </div>
    </full-screen>
    <icon-full-screen @open-full-screen="toggle"></icon-full-screen>
    <!-- <div class="icon-full-screen-frame" @click="toggle">
      <div class="icon-full-screen">
      </div>
    </div> -->
    <br>
    <div class="example" style="color: red;">
      <h1>This is full screen content!</h1>
      服务方式实现全屏
    </div>
    <button type="button" @click="toggle1" >Fullscreen</button>
    <div class="icon-layout">
      <span class="span1">
        <span class="span2"></span>
      </span>
    </div>
    <div class="icon-layout">
      <div class="img-box">
        <img class="code"
          src="https://image-static.segmentfault.com/149/570/149570997-5b987cc928d69_articlex">
      </div>
    </div>
  </div>
</template>
<script>
import FullScreen from '../components/full-screen/FullScreen.vue'
import fullScreenService from '../components/full-screen/service.js'
import IconFullScreen from '../components/le-icon/Icon-full-screen.vue'
export default {
  components: {
    FullScreen,
    IconFullScreen
  },
  methods: {
    toggle () {
      this.$refs['fullscreen'].toggle() // recommended
      // this.fullscreen = !this.fullscreen // deprecated
    },
    toggle1 () {
      console.log("asdfa ")
      fullScreenService.toggle(this.$el.querySelector('.example'), {
        wrap: false,
        callback: this.fullscreenChange
      })
    },
    fullscreenChange (fullscreen) {
      this.fullscreen = fullscreen
    }
  },
  data () {
    return {
      fullscreen: false
    }
  }
}
</script>
<style type="text/css">
.page-layout {
  position: fixed;
  left: 0;
  right: 0;
  margin: 0 auto;
}
.icon-layout {
  width: 100%;
  position: relative;
  margin: 20px;
}
.span1 {
  width: 36px;
  height: 36px;
  border: red solid;
  border-width: 0 0 4px 4px;
  display: block;
}
.span1::before {
  content: "";
  height: 4px;
  width: 18px;
  display: block;
  background: #333;
  position: absolute;
  top: 24px;
  left: 0;
  transform: rotate(-55deg);
  box-shadow: 15px 10px 0 #333; /* 这里第二条向上的折线就是用这个box-shadow实现的，向右平移了15像素，向上平移了10像素，0为不模糊，颜色为#333 */
}
.span1::after {
  content: "";
  height: 4px;
  width: 13px;
  display: block;
  background: #333;
  position: absolute;
  top: 21px;
  left: 11px;
  transform: rotate(39deg);
}
.span2::before {
  content: "";
  height: 0;
  width: 0;
  display: block;
  border: 10px solid transparent;
  border-right-width: 0; /* 这里右边框的宽度设置为0可以使上边框（三角形）失去右边的一半，以达到想要的效果 */
  border-top-color: #333;
  position: absolute;
  top: 8px;
  left: 25px;
}
.img-box {
  background: linear-gradient(#ae0000, #ae0000) left top,
    linear-gradient(#ae0000, #ae0000) left top,
    linear-gradient(#ae0000, #ae0000) right top,
    linear-gradient(#ae0000, #ae0000) right top,
    linear-gradient(#ae0000, #ae0000) right bottom,
    linear-gradient(#ae0000, #ae0000) right bottom,
    linear-gradient(#ae0000, #ae0000) left bottom,
    linear-gradient(#ae0000, #ae0000) left bottom;
  background-repeat: no-repeat;
  background-size: 2px 20px, 20px 2px;
  height: 118px;
  width: 120px;
}
.code {
  height: 110px;
  width: 110px;
  margin-top: 2px;
  margin-left: 2px;
  border: 1px solid green;
}
</style>
