const copy = {
  /**
   * @param value {string|Object} 可以直接传入字符串，也可以传入对象；当为对象时，必须按指定的格式要求传入。
   * @param value.content {Object} 无特定格式要求
   * @param value.complete {function} 必须为函数，复制完成时回调，成功回调参数为0，复制失败回调参数为-1。当没有回调函数时，会使用alert进行提示；
   */
  bind(el, {value}) {
    el.$value = value
    el.handler = () => {
      if (!el.$value) {
        // 值为空的时候，给出提示。可根据项目UI仔细设计
        console.log('无复制内容')
        return
      }

      // 动态创建 textarea 标签
      const textarea = document.createElement('textarea')
      // 将该 textarea 设为 readonly 防止 iOS 下自动唤起键盘，同时将 textarea 移出可视区域
      textarea.readOnly = 'readonly'
      textarea.style.position = 'absolute'
      textarea.style.left = '-9999px'
      // 将要 copy 的值赋给 textarea 标签的 value 属性
      textarea.value = typeof el.$value === 'string' || !el.$value.content ? el.$value : el.$value.content
      // 将 textarea 插入到 body 中
      document.body.appendChild(textarea)
      // 选中值并复制
      textarea.select()
      const result = document.execCommand('Copy')
      if (result) {
        if (el.$value.complete && typeof el.$value.complete === 'function') {
          // 值为空的时候，给出提示。可根据项目UI仔细设计
          el.$value.complete(0)
        } else {
          alert('复制成功')
        }
      } else {
        if (el.$value.complete && typeof el.$value.complete === 'function') {
          // 值为空的时候，给出提示。可根据项目UI仔细设计
          el.$value.complete(-1)
        } else {
          alert('复制失败')
        }
      }
      document.body.removeChild(textarea)
    }
    // 绑定点击事件，就是所谓的一键 copy 啦
    el.addEventListener('click', el.handler)
  },
  // 当传进来的值更新的时候触发
  componentUpdated(el, {value}) {
    el.$value = value
  },
  // 指令与元素解绑的时候，移除事件绑定
  unbind(el) {
    el.removeEventListener('click', el.handler)
  },
}

export default copy
