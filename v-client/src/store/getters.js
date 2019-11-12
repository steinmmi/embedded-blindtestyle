export default {
    playersList: (state) => {
        return state.playersList;
    },
    player: (state) => {
        return state.player;
    },
    config: (state) => {
        return state.config;
    },
    currentSong: (state) => {
        return state.currentSong
    },
    isPlaying: (state) => {
        return state.isPlaying
    },
    currentPlayer: (state) => {
        return state.currentPlayer
    },
    getRoute: (state) => {
        return state.route
    },
    responseState: (state) => {
        return state.responseState
    }
}