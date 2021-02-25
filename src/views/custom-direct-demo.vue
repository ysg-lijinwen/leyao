<template>
  <div class="base-layer" v-waterMarker="{text:'乐心瑶版权所有',textColor:'rgba(180, 180, 180, 0.4)'}">
    <div class="node-info">
      使用指令时，指令参数如果时函数，只能传入函数名，不可带括号，否则会立即执行函数体。
    </div>
    <div class="doc-info">
      一个指令定义对象可以提供如下几个钩子函数 (均为可选)：
      <ul>
        <li>
          bind：只调用一次，指令第一次绑定到元素时调用。在这里可以进行一次性的初始化设置。
        </li>
        <li>
          inserted：被绑定元素插入父节点时调用 (仅保证父节点存在，但不一定已被插入文档中)。
        </li>
        <li>
          update：所在组件的 VNode 更新时调用，但是可能发生在其子 VNode 更新之前。指令的值可能发生了改变，也可能没有。但是你可以通过比较更新前后的值来忽略不必要的模板更新
          (详细的钩子函数参数见下)。
        </li>
        <li>
          componentUpdated：指令所在组件的 VNode 及其子 VNode 全部更新后调用。
        </li>
        <li>
          unbind：只调用一次，指令与元素解绑时调用。
        </li>
      </ul>
    </div>
    <div class="doc-info">
      指令钩子函数会被传入以下参数：
      <ul>
        <li>
          el：指令所绑定的元素，可以用来直接操作 DOM 。
        </li>
        <li>
          binding：一个对象，包含以下属性：
          <ul>
            <li>
              name：指令名，不包括 v- 前缀。
            </li>
            <li>
              value：指令的绑定值，例如：v-my-directive="1 + 1" 中，绑定值为 2。
            </li>
            <li>
              oldValue：指令绑定的前一个值，仅在 update 和 componentUpdated 钩子中可用。无论值是否改变都可用。
            </li>
            <li>
              expression：字符串形式的指令表达式。例如 v-my-directive="1 + 1" 中，表达式为 "1 + 1"。
            </li>
            <li>
              arg：传给指令的参数，可选。例如 v-my-directive:foo 中，参数为 "foo"。
            </li>
            <li>
              modifiers：一个包含修饰符的对象。例如：v-my-directive.foo.bar 中，修饰符对象为 { foo: true, bar: true }。
            </li>
          </ul>
        </li>
        <li>
          vnode：Vue 编译生成的虚拟节点。移步 VNode API 来了解更多详情。
        </li>
        <li>
          oldVnode：上一个虚拟节点，仅在 update 和 componentUpdated 钩子中可用
        </li>
      </ul>
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
      <input placeholder="只能输入数字" type="text" v-model="note" v-emoji="/\D/g" />
      <!--    自定义验证规则-->
      <input placeholder="输入表情之外的文字" type="text" v-model="note2" v-emoji />
    </div>
    <br>
    <div>
      权限判断：<br>
      <!-- 显示 -->
      <button v-permission="'1'">权限按钮1</button>
      <!-- 不显示 -->
      <button v-permission="'10'">权限按钮2</button>
    </div>
    <br>
    <div>
      日期格式化:
      <div v-timeFormat:red="timeStamp"></div>
      <div v-timeFormat:orange.date="timeStamp"></div>
      <div v-timeFormat:orange.datetime="timeStamp"></div>
    </div>
    <br>
    <!--  任意拖动控件的指令  -->
    <div class="more-operations" v-draggable>任意拖动</div>
    <br>
    <div>
      图片懒加载：<br>
      <div class="img-layer" v-for="(item, index) in imgSrc" :key="index">
        <img class="lazy-load-img" :class="setImgId(index)" v-imageLazyLoad="item" />
        <br>
        <button type="button" @click="toggle1(index)">全屏查看</button>
      </div>
    </div>
  </div>
</template>

<script>
// import FullScreen from '../components/full-screen/FullScreen.vue'
import fullScreenService from '../components/full-screen/service.js'
export default {
  name: "CustomDirectDemo",
  // components: { FullScreen },
  data () {
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
      timeStamp: 1335562531231,
      imgSrc: [
        "http://img.lexinyao.com/1.jpeg",
        "http://img.lexinyao.com/2.jpeg",
        "http://img.lexinyao.com/3.jpeg",
        "http://img.lexinyao.com/4.jpeg",
        "http://img.lexinyao.com/5.jpeg",
        "http://img.lexinyao.com/6.jpeg",
        "http://img.lexinyao.com/7.jpeg",
      ],
      fullscreen: false
    }
  },
  mounted () {
  },
  methods: {
    longPress () {
      alert('长按指令生效')
    },
    debounceClick () {
      console.log('只触发一次')
    },
    setImgId (index) {
      return 'img-' + index
    },
    toggle () {
      this.$refs['fullscreen'].toggle() // recommended
    },
    toggle1 (index) {
      fullScreenService.toggle(this.$el.querySelector('.img-' + index), {
        wrap: false,
        callback: this.fullscreenChange
      })
    },
    fullscreenChange (fullscreen) {
      this.fullscreen = fullscreen
    }
  }
}
</script>

<style scoped>
.base-layer {
  min-height: 100vh;
}

.node-info {
  padding: 0 15%;
  text-align: left;
  color: crimson;
  margin-top: 10px;
  margin-bottom: 10px;
  border-bottom: dotted brown 1px;
}

.doc-info {
  padding: 0 15%;
  text-align: left;
  color: black;
  margin-top: 10px;
  margin-bottom: 10px;
  border-bottom: dotted gray 1px;
}

.img-layer {
  background-color: rgba(180, 180, 180, 0.1);
  margin-top: 20px;
}

.lazy-load-img {
  width: 70%;
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
