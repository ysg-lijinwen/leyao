import copy from '@/directives/copy'
import longPress from "@/directives/long-press";
import debounce from "@/directives/debounce";
import emoji from '@/directives/emoji'
import permission from "@/directives/premission";
// import LazyLoad from "@/directives/lazy-load";
import imageLazyLoad from "@/directives/image";
import waterMarker from "@/directives/water-marker";
import draggable from "@/directives/draggable";
import timeFormat from "@/directives/time-format";
// 自定义指令
const directives = {
  copy,
  longPress,
  debounce,
  emoji,
  permission,
  waterMarker,
  draggable,
  timeFormat,
  // LazyLoad,//此图片懒加载方式有问题，暂时作废
  imageLazyLoad
}

export default {
  install(Vue) {
    Object.keys(directives).forEach((key) => {
      Vue.directive(key, directives[key])
    })
  },
}
