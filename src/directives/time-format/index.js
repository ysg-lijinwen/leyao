const timeFormat = {
  bind: function (el, binding) {//这里只在bind生命周期函数中进行定义和操作，大家也可以在其他自定义指令的生命周期函数中尝试进行扩展和修改。

    let initTime = (num) => {//判断数字是否大于10
      return num < 10 ? '0' + num : num;
    }

    let checkTime = (timeStamp) => {//格式化时间戳函数，大家也可以根据实际需求进行扩展和改写
      let time = new Date(timeStamp);
      let year = time.getFullYear();
      let month = time.getMonth() + 1;
      let day = time.getDate();
      let hour = time.getHours();
      let minute = time.getMinutes();
      let second = time.getSeconds();
      if (binding.modifiers.date) {//判断修饰符是否存在，存在即返回指定时间格式
        return year + '-' + initTime(month) + '-' + initTime(day);
      } else if (binding.modifiers.datetime) {
        return year + '-' + initTime(month) + '-' + initTime(day) + ' ' + initTime(hour) + ':' + initTime(minute) + ':' + initTime(second);
      } else {
        return year + '-' + initTime(month) + '-' + initTime(day) + ' ' + initTime(hour) + ':' + initTime(minute) + ':' + initTime(second);
      }
    }

    el.innerHTML = checkTime(binding.value);//格式化之后的时间信息插入到当前元素中
    binding.arg === '' ? el.style.color = '#333' : el.style.color = binding.arg;//通过传递参数来改变元素字体颜色
  }
}
export default timeFormat
