<script>
import Vue from 'vue'
import { getOpenId } from '@/utils/session'
// import api from '@/api/user'
import { login } from '@/utils/wx'

export default {
  onLaunch: function () {
    console.log('App Launch')
    uni.getSystemInfo({
      success: function (e) {
        console.log(e)
        Vue.prototype.StatusBar = e.statusBarHeight
        let custom = wx.getMenuButtonBoundingClientRect()
        Vue.prototype.Custom = custom
        Vue.prototype.CustomBar = custom.bottom + custom.top - e.statusBarHeight
      }
    })
    let openid = getOpenId()
    if (!openid) {
      // login(api, 'getOpenId', true)
    }
  },
  onShow: function () {
    console.log('App Show')
  },
  onHide: function () {
    console.log('App Hide')
  }
}
</script>

<style lang="scss">
@import 'uview-ui/index.scss';
/*每个页面公共css */
</style>
