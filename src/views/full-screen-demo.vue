<template>
  <div id="fulldemo">
    <full-screen ref="fullscreen" @change="fullscreenChange">
      <div style="color: #000000;">
        <h1>This is full screen content!</h1>
        组件方式实现全屏
      </div>
    </full-screen>
    <button type="button" @click="toggle">Fullscreen</button>
    <div class="example" style="color: red;">
      <h1>This is full screen content!</h1>
      服务方式实现全屏
    </div>
    <button type="button" @click="toggle1">Fullscreen</button>
  </div>
</template>
<script>
import FullScreen from '../components/full-screen/FullScreen.vue'
import fullScreenService from '../components/full-screen/service.js'
export default {
  components: {
    FullScreen
  },
  methods: {
    toggle () {
      this.$refs['fullscreen'].toggle() // recommended
      // this.fullscreen = !this.fullscreen // deprecated
    },
    toggle1 () {
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
