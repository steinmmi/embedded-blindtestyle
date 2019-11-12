<template>
<div class="container">
    <img src="@/assets/fullscreen.png" class="fullscreen" @click="goFullScreen()" v-if="!isFullScreen">
      <div class="top">
          <h1>Vous êtes {{player.name}}</h1>
          <leaderboard></leaderboard>
      </div>
      <div class="bottom">
          <div v-if="currentSong" class="song">
              <h2 class="title">{{currentSong.title}}</h2>
              <h3 class="artist">{{currentSong.artist}}</h3>
          </div>
          <div class="buttons-container">
              <div class="button green" @click="pushGreen()"></div>
              <div class="button red" @click="pushRed()"></div>
          </div>
          
      </div>
  </div>
</template>

<script>
import Leaderboard from '../components/Leaderboard'
export default {
    name: 'Gamemaster',
    components: {Leaderboard},
    data () {
        return {
            isFullScreen: false
        }
    },
    computed: {
        player () {
            return this.$store.getters.player;
        },
        currentSong () {
            return this.$store.getters.currentSong
        },
    },
    methods: {
        pushRed() {
            this.$socket.sendObj({type:'setResponse', data: 'incorrect'})
        },
        pushGreen() {
            this.$socket.sendObj({type:'setResponse', data: 'correct'})
        },
        goFullScreen() {
            document.documentElement.requestFullscreen()
        }
    },
    mounted () {
        document.onfullscreenchange = (val) => {
            this.isFullScreen = !this.isFullScreen;
        }
    }
}
</script>

<style scoped>
h1 {
    text-align: center;
    margin: 0;
    margin-top: 10px;
}
.container {
    height: 100%;
    width: 100%;
}
.fullscreen {
    position: absolute;
    bottom: 0;
    right: 0;
    width: 50px;
    max-width: 10%;
    height: auto;
}
.top {
    overflow-y:scroll;
    height: 50%;
}
.song {
    flex-basis: 100%;
    text-align: center;
}
.red {
    background-color: red;
}

.green {
    background-color: green;
}
.bottom {
    height: 50%;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
}
.buttons-container {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-around;
}
.button {
    position: relative;
border-radius: 50%;
width: 40%;
max-width: 200px;
height: 200px;
}

@media (max-width: 500px) {
    .button {
        width: 130px;
        height: 130px;
    }   
}
</style>