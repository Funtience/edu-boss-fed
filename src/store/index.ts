import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: JSON.parse(window.sessionStorage.user || 'null')
  },
  mutations: {
    setUser (state, payload) {
      state.user = JSON.parse(payload)
      window.sessionStorage.user = payload
    }
  },
  actions: {},
  modules: {}
})
