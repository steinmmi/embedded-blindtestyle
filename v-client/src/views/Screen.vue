<template>
  <div class="container"
    :class="{anim: currentPlayer}"
    :style="{color: currentPlayer ? currentPlayer.color : null}">
      <div class="left">
            <div class="leaderboardContainer">
                <leaderboard></leaderboard>
            </div>
      </div>
      <div class="right">
          <h1>Blindtestylé</h1>
          <p v-if="currentPlayer">Au tour de {{currentPlayer.name}}</p>
          <div v-if="currentSong && !isPlaying" class="song">
              <h2 class="title">{{currentSong.title}}</h2>
              <h3 class="artist">{{currentSong.artist}}</h3>
          </div>
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
            audio: new Audio('')
        }
    },
    mounted() {
        this.audio.addEventListener('canplay', () => {
        })
        this.$options.sockets.onmessage = (socket_message) => {
            let socket_json = JSON.parse(socket_message.data)
            if(socket_json.type) {
                this.socketHandler(socket_json)
            }
        }
    },
    methods: {
        socketHandler(msg) {
            switch (msg.type) {
                case 'setMusic':
                    if (!msg.data) throw new Error('Audio src required in setMusic socket data, found : ' + msg.data)
                    this.audio.src = `${this.config.url}/song/get/${msg.data}`
                    this.audio.id = 'test';
                    // TODO: remove comment
                    this.audio.play();
                    break;
            }
        },
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
        }
    },
    watch: {
        currentSong () {
            this.audio.src = `${this.config.url}/song/get/${this.currentSong._id}`
            this.audio.play();
        },
        currentPlayer (val) {
            if(val) {
                this.fade(0, .2, 10)
            } else {
                this.audio.play();
                this.fade(1)
                setTimeout(() => {
                    this.$socket.sendObj({type: 'getSong'})
                },5000)
            }
            
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
    animation: blink 1.2s infinite;
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
        box-shadow: 2px 2px 5px inset, -2px -2px 5px inset;
    }
    50% {
        box-shadow: 20px 20px 25px inset, -20px -20px 25px inset;
    }
    80% {
        box-shadow: 20px 20px 25px inset, -20px -20px 25px inset;
    }
    100% {
        box-shadow: 2px 2px 5px inset, -2px -2px 5px inset;
    }
}
</style>