<template>
  <div class="container">
      <div class="left">
            <div class="leaderboardContainer">
                <leaderboard></leaderboard>
            </div>
      </div>
      <div class="right">
          <h1>Blindtestylé</h1>
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
            console.log('dqsd');
            
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
                    console.log(`${this.config.url}/song/get/${msg.data}`);
                    
                    if (!msg.data) throw new Error('Audio src required in setMusic socket data, found : ' + msg.data)
                    this.audio.src = `${this.config.url}/song/get/${msg.data}`
                    this.audio.id = 'test';
                    // TODO: remove comment
                    this.audio.play();
                    break;
            }
        }
    },
    watch: {
        currentSong () {
            this.audio.src = `${this.config.url}/song/get/${this.currentSong._id}`
            this.audio.play();
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
        }
    }
}
</script>

<style scoped>
.container {
    display: flex;
    height: 100%;
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
</style>