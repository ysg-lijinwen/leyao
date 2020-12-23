let findEle = (parent, type) => {
  return parent.tagName.toLowerCase() === type ? parent : parent.querySelector(type)
}

const trigger = (el, type) => {
  const e = document.createEvent('htmlEvents')
  e.initEvent(type, true, true)
  el.dispatchEvent(e)
}

const emoji = {
  /**
   *
   * @param el
   * @param value 自定义正则表达式，必须是有效的正则表达式，否则可能会达不到预期效果；如果自定义了表达式，那么将会覆盖默认的表达式。
   */
  bind: function (el, {value = /[^\u0020-\u007E\u00A0-\u00BE\u2E80-\uA4CF\uF900-\uFAFF\uFE30-\uFE4F\uFF00-\uFFEF\u0080-\u009F\u2000-\u201f\u2026\u2022\u20ac\r\n]/g}) {
    // 正则规则可根据需求自定义
    // let regRule = /[^u4E00-u9FA5|d|a-zA-Z|rns,.?!，。？！…—&$=()-+/*{}[]]|s/g
    let $inp = findEle(el, 'input')
    el.$inp = $inp
    $inp.handle = function () {
      let val = $inp.value
      $inp.value = val.replace(value, '')

      trigger($inp, 'input')
    }
    $inp.addEventListener('keyup', $inp.handle)
  },
  unbind: function (el) {
    el.$inp.removeEventListener('keyup', el.$inp.handle)
  },
}

export default emoji
