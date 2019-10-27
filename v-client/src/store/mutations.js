import Vue from 'vue';
/* eslint-disable no-console*/
export default {
    SOCKET_ONOPEN (state, event)  {
        Vue.prototype.$socket = event.currentTarget
        state.socket.isConnected = true
    },
    SOCKET_ONCLOSE (state, event)  {
        state.socket.isConnected = false
        console.log(event);
        
    },
    SOCKET_ONERROR (state, event)  {
        console.error(state, event)
    },
    SOCKET_ONMESSAGE (state, message)  {
        console.log(state, message);
        
    },
    SOCKET_RECONNECT(state, count) {
        console.info(state, count)
    },
    SOCKET_RECONNECT_ERROR(state) {
        state.socket.reconnectError = true;
    },
    setPlayers: (state, datas) => {
        datas.players.forEach(pl => {
            state.playersList.push(pl);
        })
    },
    setPlayer: (state, datas) => {
        state.player = datas.player;
    },
    addPlayer: (state, datas) => {
        state.playersList.push(datas.player)
    },
    setConfig: (state, datas) => {
        state.config = datas;
    },
    removePlayer: (state, datas) => {
        let index = state.playersList.indexOf(datas.player)
        state.playersList.forEach((el, index) => {
            if(el.name === datas.player.name) state.playersList.splice(index,1)
        })
    },
    setCurrentSong: (state, datas) => {
        state.currentSong = datas.song;
    },
    setPlayingState: (state, datas) => {
        state.isPlaying = datas.playing
    },
    setCurrentPlayer: (state, datas) => {
        state.currentPlayer = datas.player
        console.log(state.currentPlayer);
        
    }
}