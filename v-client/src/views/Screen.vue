<template>
  <div class="container" @click="start()"
    :class="{anim: currentPlayer}"
    :style="{color: currentPlayer ? currentPlayer.color : null}">
    <div class="correct" :class="{show: responseState === 'correct'}"><img src="@/assets/check.png" alt=""></div>
    <div class="incorrect" :class="{show: responseState === 'incorrect'}"><img src="@/assets/cross.png" alt=""></div>
      <div class="left">
            <div class="leaderboardContainer">
                <leaderboard></leaderboard>
            </div>
      </div>
      <div class="right">
          <h1>Blindtestylé</h1>
          <h2 v-if="currentPlayer">{{currentPlayer.name}}</h2>
          <div v-if="currentSong && !isPlaying" class="song">
              <h2 class="title">{{currentSong.title}}</h2>
              <h3 class="artist">{{currentSong.artist}}</h3>
              <img :src="currentSong.cover" height="200" alt="">
          </div>
          <button v-if="showBtn" @click="start()">START</button>
      </div>
      
  </div>
</template>

<script>
import Leaderboard from '../components/Leaderboard';

export default {
    name: 'screen',
    components: {Leaderboard},
    data () {
        return {
            audio: new Audio(''),
            notifAudio: new Audio(''),
            showBtn: true
        }
    },
    methods: {
        fade(volume, VOLCHANGE = .1, MILLIS = 200) {
            try {
                if(this.audio.volume > volume) {
                    this.audio.volume -= VOLCHANGE
                    setTimeout(() => {
                        this.fade(volume)
                    }, MILLIS)
                } else if (this.audio.volume < volume) {
                    this.audio.volume += VOLCHANGE
                    setTimeout(() => {
                        this.fade(volume)
                    }, MILLIS)
                } else {
                    if(this.audio.volume == 0) this.audio.pause();
                }
            } catch {
                
            }
        },
        start() {
            if(!this.showBtn)return;
            this.$socket.sendObj({type: 'getSong'})
            this.showBtn = false
        }
    },
    watch: {
        responseState (val) {
            if(val === 'correct' || val === 'incorrect') {
                this.audio.play();
                if(val === 'correct') {
                    setTimeout(() => {
                    this.$socket.sendObj({type: 'getSong'})
                    },15000)
                }
                this.notifAudio.src = require(`@/assets/${val}.mp3`)
                this.notifAudio.play()
                setTimeout(() => {
                    this.$store.commit('setResponse', {response: null})
                },1000)
            }
        },
        currentSong () {
            this.audio.src = `${this.config.url}/song/get/${this.currentSong._id}`
            this.audio.play();
        },
        currentPlayer (val) {
            if(val) this.audio.pause()
        }
    },
    computed: {
        config () {
            return this.$store.getters.config
        },
        currentSong () {
            return this.$store.getters.currentSong
        },
        isPlaying () {
            return this.$store.getters.isPlaying
        },
        currentPlayer () {
            return this.$store.getters.currentPlayer
        },
        responseState () {
            return this.$store.getters.responseState
        }
    },
    mounted () {
        this.audio.onended = () => {
            this.$socket.sendObj({type: 'getSong'})
        }
    }
}
</script>

<style scoped>
.container {
    display: flex;
    height: 100%;
}
.container.anim {
    box-shadow: inset 50px 50px 50px, inset -50px -50px 50px;
    z-index: 50;
}
.container > * {
    color: white;
}
.left {
    width: 40%;
    margin: 30px;
    background-color: #4A4A4A;
    text-align: center;
    border-radius: 10px;
    box-shadow: 0px 0px 5px inset #2A2A2A;
}

.right {
    width: 60%;
    margin: 30px;
    background-color: #4A4A4A;
    text-align: center;
    border-radius: 10px;
    box-shadow: 0px 0px 5px inset #2A2A2A;
}

@keyframes blink {
    0% {
        box-shadow: none;
    }
    50% {
        box-shadow: 20px 20px 250px inset, -20px -20px 250px inset;
    }
    80% {
        box-shadow: 20px 20px 250px inset, -20px -20px 250px inset;
    }
    100% {
        box-shadow: none
    }
}
.correct, .incorrect {
    position: absolute;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    opacity: 0;
    transition: all .5s ease-in-out;
}
.correct img, .incorrect img{
    position: absolute;
    height: 70%;
    width: auto;
}

.correct.show, .incorrect.show {
    opacity: 1;
}
</style>