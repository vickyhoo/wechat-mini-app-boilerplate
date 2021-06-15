function formatNumber(n) {
  const str = n.toString()
  return str[1] ? str : `0${str}`
}

export function formatSeconds(s) {
  let t = ''
  s = parseInt(s)
  if (s >= 0) {
    const hour = Math.floor(s / 3600)
    const min = Math.floor(s / 60) % 60
    const sec = s % 60
    if (hour > 0) {
      if (hour < 10) {
        t = '0' + hour + ':'
      } else {
        t = hour + ':'
      }
    }

    if (min < 10) {
      t += '0'
    }
    t += min + ':'
    if (sec < 10) {
      t += '0'
    }
    t += sec
  }
  return t
}

export function formatTime(date) {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()

  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  const t1 = [year, month, day].map(formatNumber).join('/')
  const t2 = [hour, minute, second].map(formatNumber).join(':')

  return `${t1} ${t2}`
}

// 转换wx自带函数为Promise
export function promisify(original) {
  return function (opt) {
    return new Promise((resolve, reject) => {
      opt = Object.assign(
        {
          success: resolve,
          fail: reject
        },
        opt
      )
      if (original) {
        original(opt)
      }
    })
  }
}

// 显示toast弹窗
export function showToast(content = '', icon = 'none') {
  uni.showToast({
    title: content,
    icon
  })
}

export function show(title = '加载中', mask = true) {
  uni.showLoading({ title, mask })
}

export function hide() {
  uni.hideLoading()
  uni.hideToast()
}

export function showModal(message, title = '提示') {
  uni.showModal({
    title,
    content: message,
    showCancel: false
  })
}

export function timeout(time = 1000) {
  return new Promise((resolve) => {
    setTimeout(resolve, time)
  })
}

// 颜色转换
function componentToHex(c) {
  var hex = c.toString(16)
  return hex.length === 1 ? '0' + hex : hex
}

export function rgbToHex(r, g, b) {
  return '#' + componentToHex(r) + componentToHex(g) + componentToHex(b)
}

// 整数补0
export function pad(num, n = 2) {
  var len = num.toString().length
  while (len < n) {
    num = '0' + num
    len++
  }
  return num
}

export function debounce(func, wait, immediate) {
  // immediate默认为false
  var timeout, args, context, timestamp, result

  var later = function () {
    var last = Date.now() - timestamp
    if (last < wait && last >= 0) {
      timeout = setTimeout(later, wait - last)
    } else {
      timeout = null
      if (!immediate) {
        result = func.apply(context, args)
        if (!timeout) context = args = null
      }
    }
  }

  return function () {
    context = this
    args = arguments
    timestamp = Date.now()
    // 第一次调用该方法时，且immediate为true，则调用func函数
    var callNow = immediate && !timeout
    // 在wait指定的时间间隔内首次调用该方法，则启动计时器定时调用func函数
    if (!timeout) timeout = setTimeout(later, wait)
    if (callNow) {
      result = func.apply(context, args)
      context = args = null
    }

    return result
  }
}

export function checkMobile(phone) {
  return /^1[3456789]\d{9}$/.test(phone)
}

// 根据key获取图片缓存信息
export function getImageCache(key) {
  const saved = uni.getStorageSync(key)
  if (saved) {
    return JSON.parse(saved)
  }
}

// 删除缓存图片
export function deleteImageCache(key) {
  console.log(`deleteImageCache ${key}`)
  uni.removeStorage({ key })
}

export function financial(x, n = 2) {
  if (isNaN(x)) {
    return ''
  }
  return `￥${Number.parseFloat(x).toFixed(n)}`
}
export function deFinancial(x) {
  return Number(x.substr(1))
}

export function getLocation() {
  return new Promise((resolve) => {
    let latitude = ''
    let longitude = ''
    wx.getLocation({
      type: 'gcj02',
      success(res) {
        latitude = res.latitude
        longitude = res.longitude
      },
      complete() {
        resolve({ latitude, longitude })
      }
    })
  })
}
