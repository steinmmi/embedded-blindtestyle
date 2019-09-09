import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import getters from './getters'
import actions from './actions'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
      playersList: [],
      socket: {
          isConnected: false
      },
      player: {
          name: 'Mathieu',
          score: 14,
          color: 'red'
      }
  },
  getters,
  mutations,
  actions,
})
