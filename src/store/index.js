import Vue from 'vue'
import Vuex from 'vuex'
import song from './modules/song'
import getters from './getters'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
      song
  },
  getters
})

export default store
