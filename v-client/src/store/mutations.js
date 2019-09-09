import Vue from 'vue';
export default {
    SOCKET_ONOPEN (state, event)  {
        Vue.prototype.$socket = event.currentTarget
        state.socket.isConnected = true
    },
    SOCKET_ONCLOSE (state, event)  {
        state.socket.isConnected = false
    },
    SOCKET_ONERROR (state, event)  {
        console.error(state, event)
    },
    SOCKET_ONMESSAGE (state, message)  {

    },
    SOCKET_RECONNECT(state, count) {
        console.info(state, count)
    },
    SOCKET_RECONNECT_ERROR(state) {
        state.socket.reconnectError = true;
    },
    setConfig: (state, datas) => {
        datas.players.forEach(pl => {
            state.playersList.push(pl);
        })
    },
    setPlayer: (state, datas) => {
        state.player = datas.player;
    },
    addPlayer: (state, datas) => {
        state.playersList.push(datas.player)
    }
}