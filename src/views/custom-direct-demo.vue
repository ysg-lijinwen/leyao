<template>
  <div class="base-layer" v-waterMarker="{text:'乐心瑶版权所有',textColor:'rgba(180, 180, 180, 0.4)'}">
    <div class="node-info">
      使用指令时，指令参数如果时函数，只能传入函数名，不可带括号，否则会立即执行函数体。
    </div>
    <div>
      复制内容：<br>
      <button v-copy="copyText">指定绑定对象的value为一个对象</button>
      <button v-copy="copyText2">指定绑定对象的value为一个字符串</button>
    </div>
    <br>
    <div>
      长按2秒后执行操作：<br>
      <button v-longPress="longPress">长按</button>
    </div>
    <br>
    <div>
      防抖：(默认一秒内多次点击，只会执行一次)<br>
      <button v-debounce="debounceClick">防抖</button>
      <button v-debounce:5000="debounceClick">防抖(5秒内多次点击无效)</button>
    </div>
    <br>
    <div>
      输入过滤：（默认规则为过滤表情）<br>
      <input placeholder="只能输入数字" type="text" v-model="note" v-emoji="/\D/g"/>
      <!--    自定义验证规则-->
      <input placeholder="输入表情之外的文字" type="text" v-model="note2" v-emoji/>
    </div>
    <div>
      权限判断：<br>
      <!-- 显示 -->
      <button v-permission="'1'">权限按钮1</button>
      <!-- 不显示 -->
      <button v-permission="'10'">权限按钮2</button>
    </div>
    <!--    more-operations-->
    <div class="more-operations" v-draggable>任意拖动</div>
    <div>
      图片懒加载：<br>
      <div class="img-layer" v-for="(item, index) in imgSrc" :key="index">
        <img class="lazy-load-img" v-imageLazyLoad="item"/>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: "CustomDirectDemo",
  components: {},
  data() {
    return {
      copyText: {
        content: 'A new content!',
        complete: (resCode) => {
          if (resCode === 0) {
            alert('复制成功回调')
          } else {
            alert('复制失败回调')
          }
        }
      },
      copyText2: 'a copy directives222',
      note: '',
      note2: '',
      imgSrc: [
        "http://img.lexinyao.com/1.jpeg",
        "http://img.lexinyao.com/2.jpeg",
        "http://img.lexinyao.com/3.jpeg",
        "http://img.lexinyao.com/4.jpeg",
        "http://img.lexinyao.com/5.jpeg",
        "http://img.lexinyao.com/6.jpeg",
        "http://img.lexinyao.com/7.jpeg",
      ],
    }
  },
  mounted() {
  },
  methods: {
    longPress() {
      alert('长按指令生效')
    },
    debounceClick() {
      console.log('只触发一次')
    }
  }
}
</script>

<style scoped>
.base-layer {
  min-height: 100vh;
}

.node-info {
  color: crimson;
  margin-top: 10px;
  margin-bottom: 10px;
  border-bottom: dotted brown 1px;
}

.img-layer {
  background-color: rgba(180, 180, 180, 0.1);
}

.lazy-load-img {
  width: 80%;
  height: 500px;
  object-fit: fill;
}

.more-operations {
  background-color: rgba(0, 195, 255, 0.5);
  /*必须设置固定宽度，否者拖动会变形。*/
  width: 100px;
  height: auto;
  padding: 5px 20px;
  border-radius: 50%;
  /*fixed总是以body为定位时的对象，总是根据浏览器的窗口来进行元素的定位，通过"left"、 "top"、 "right"、 "bottom" 属性进行定位。*/
  position: fixed;
  right: 0;
  top: 50px;
  z-index: 2;
}
</style>
