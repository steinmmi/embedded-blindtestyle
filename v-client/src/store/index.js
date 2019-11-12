import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import getters from './getters'
import actions from './actions'
Vue.use(Vuex)

export default new Vuex.Store({
    config: {},
    state: {
        playersList: [],
        socket: {
            isConnected: false
        },
        responseState: null,
        route: null,
        player: {
            name: 'Mathieu',
            score: 14,
            color: 'red'
        },
        currentPlayer: null,
        currentSong: {},
        isPlaying: true
    },
    getters,
    mutations,
    actions,
})
