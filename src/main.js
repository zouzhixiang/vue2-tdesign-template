import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import TDesign from 'tdesign-vue'
import 'normalize.css/normalize.css'
import './style/index.scss'
import 'tdesign-vue/es/style/index.css'

import '../mock'

Vue.use(TDesign)
Vue.config.productionTip = false;

(() => {
  axios.get('./env.json').then(res => {
    Vue.prototype.baseUrl = res.data.baseUrl

    new Vue({
      router,
      store,
      render: h => h(App)
    }).$mount('#app')
  })
})()
