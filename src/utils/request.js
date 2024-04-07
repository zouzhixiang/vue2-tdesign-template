import Vue from 'vue'
import axios from 'axios'
import store from '@/store'
import router from '@/router'
import { MessagePlugin } from 'tdesign-vue'

const service = axios.create({
  timeout: 60000
})

// 请求拦截
service.interceptors.request.use(
  config => {
    config.baseURL = Vue.prototype.baseUrl

    return config
  },
  error => {
    return Promise.reject(error)
  }
)

// 响应拦截
service.interceptors.response.use(
  response => {
    if (response.data.status !== undefined) {
      if (response.data.status) {
        return response.data
      } else {
        MessagePlugin.error(response.data.message)
        return Promise.reject(new Error(response.data.message || '系统异常'))
      }
    } else {
      return response
    }
  },
  error => {
    if (error.response) {
      switch (error.response.status) {
        // token失效
        case 401:
          MessagePlugin.error('用户登录已过期')
          store.dispatch('app/clearToken').then(() => {
            router.replace({ name: 'login' })
          })
          break
        // 后台异常
        case 500:
          MessagePlugin.error('系统异常')
          break
      }
    }

    return Promise.reject(error)
  }
)

export default service
