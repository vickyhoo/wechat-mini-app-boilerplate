import Vue from 'vue'
import App from './App'
import uView from 'uview-ui'
import mixin from './utils/mixin'

console.log(process.env.NODE_ENV)

Vue.mixin(mixin)
Vue.use(uView)
Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
  ...App
})
app.$mount()
