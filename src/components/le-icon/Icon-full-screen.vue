<template>
  <div class="icon-full-screen-frame" @click="openFs()">
    <div class="icon-full-screen">
    </div>
  </div>
</template>

<script>
export default {
  name: 'IconFullScreen',
  props: {
  },
  methods: {
    openFs(){
      console.log("开启全屏")
      this.$emit('open-full-screen')
    }
  }
}
</script>

<style scoped>
.icon-full-screen-frame {
  position: fixed;
  left: 0;
  right: 0;
  margin: 0 auto;
  height: 30px;
  width: 30px;
  padding: 2px;
  border: 3px solid black;
}
.icon-full-screen {
  background: linear-gradient(black, black) left top,
    linear-gradient(black, black) left top,
    linear-gradient(black, black) right top,
    linear-gradient(black, black) right top,
    linear-gradient(black, black) right bottom,
    linear-gradient(black, black) right bottom,
    linear-gradient(black, black) left bottom,
    linear-gradient(black, black) left bottom;
  background-repeat: no-repeat;
  background-size: 2px 10px, 8px 2px;
  height: 100%;
  width: 100%;
}
</style>
