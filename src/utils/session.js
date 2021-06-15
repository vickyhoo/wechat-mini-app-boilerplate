export function saveToken(token) {
  wx.setStorageSync('token', token)
}
export function saveAccessToken(accessToken) {
  wx.setStorageSync('accessToken', accessToken)
}
export function saveUserId(userId) {
  wx.setStorageSync('userId', userId)
}
export function saveOpenId(openId) {
  wx.setStorageSync('openId', openId)
}
export function getToken() {
  return wx.getStorageSync('token')
}
export function getAccessToken() {
  return wx.getStorageSync('accessToken')
}
export function getUserId() {
  return wx.getStorageSync('userId')
}
export function getOpenId() {
  return wx.getStorageSync('openId')
}
export function saveUserInfo(user) {
  wx.setStorageSync('user', JSON.stringify(user))
}
export function getUserInfo() {
  let user = wx.getStorageSync('user')
  if (!user) {
    return null
  }
  return JSON.parse(user)
}

export function hasLogin() {
  let token = getToken()
  let user = getUserInfo()
  return Boolean(token) && Boolean(user) && user.phoneNumber
}
export function hasCompleteRegister() {
  if (!hasLogin()) {
    return false
  }
  let user = getUserInfo()
  return Boolean(user.phoneNumber)
}

export function checkAuth() {
  if (!hasCompleteRegister()) {
    // wx.showToast({
    //   title: '请先注册登录',
    //   icon: 'none',
    //   duration: 2000
    // })
    // eslint-disable-next-line
    let pages = getCurrentPages()
    let vm = pages[pages.length - 1].$vm
    console.log(vm)
    vm.$authPopup(vm)
    return false
  }
  return true
}
export function showFish() {
  if (!hasCompleteRegister()) {
    // eslint-disable-next-line
    let pages = getCurrentPages()
    let vm = pages[pages.length - 1].$vm
    console.log(vm)
    vm.$fishPopup(vm)
    return false
  }
  return true
}
