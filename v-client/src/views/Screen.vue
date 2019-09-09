!<template>
  <div class="container">
      <div class="left">
            <div class="leaderboardContainer">
                <leaderboard></leaderboard>
            </div>
      </div>
      <div class="right">
          <h1>Blindtestylé</h1>
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
                    // TODO: remove comment
                    // this.audio.play();
                    break;
            }
        }
    },
    computed: {
        config () {
            return this.$store.getters.config
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