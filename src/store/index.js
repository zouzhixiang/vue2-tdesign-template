import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import SecureLS from 'secure-ls'

import app from './app'
import bookmark from './bookmark'

Vue.use(Vuex)

const ls = new SecureLS({
  encodingType: 'aes',
  isCompression: false,
  encryptionSecret: 'supconit'
})

export default new Vuex.Store({
  state: {},
  getters: {},
  mutations: {},
  actions: {},
  modules: {
    app,
    bookmark
  },
  plugins: [
    createPersistedState({
      key: '__store',
      storage: {
        getItem: key => ls.get(key),
        setItem: (key, value) => ls.set(key, value),
        removeItem: key => ls.remove(key)
      },
      reducer (store) {
        return {
          app: {
            userInfo: store.app.userInfo,
            platformConfig: store.app.platformConfig,
            theme: store.app.theme,
            layout: store.app.layout
          }
        }
      }
    })
  ]
})
