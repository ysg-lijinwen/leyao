const debounce = {
  inserted: function (el, binding) {
    let timer
    let millisecond = 1000 //默认一秒内多次点击无效
    /**
     * 判断是不是一个正整数
     */
    let isPositiveInteger = (value) => {
      if (value === undefined || value === null || value === '') {
        return false
      }

      if (typeof (value) === 'string') {
        //正整数
        let reNumber = /^\d+$/
        return reNumber.test(value);
      } else return typeof (value) === 'number';
    }
    if (isPositiveInteger(binding.arg)) {
      millisecond = binding.arg
    }
    el.addEventListener('click', () => {
      if (!timer) {
        timer = setTimeout(() => {
          clearTimeout(timer)
          timer = null
        }, millisecond)
        if (typeof binding.value === 'function') {
          binding.value()
        } else {
          binding.value
        }
      }
    })
  },
}

export default debounce
