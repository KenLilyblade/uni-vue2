import Vue from 'vue'
import App from './App'
import store from '@/store'
import * as $tool from './common/utils/utils'
import { router, RouterMount } from '@/router'
import uView from '@/uni_modules/uview-ui'
import 'windi.css'
Vue.use(router)
Vue.prototype.$tool = $tool
Vue.prototype.$store = store
Vue.config.productionTip = false
App.mpType = 'app'
const app = new Vue({
  ...App
})
// #ifdef H5
RouterMount(app, router, '#app')
// #endif
Vue.use(uView)
// #ifndef H5
app.$mount() //为了兼容小程序及app端必须这样写才有效果
// #endif
