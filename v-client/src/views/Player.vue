<template>
  <div class="container">
      <div class="top">
          <h1>Vous êtes {{player.name}}</h1>
          <leaderboard></leaderboard>
      </div>
      <div class="bottom">
          <div class="button-container">
              <div class="button" @click="push()" :style="{backgroundColor: player.color}"></div>
          </div>
          
      </div>
  </div>
</template>

<script>
import Leaderboard from '../components/Leaderboard'
export default {
    name: 'player',
    components: {Leaderboard},
    computed: {
        player () {
            return this.$store.getters.player;
        }
    },
    methods: {
        push() {
            this.$socket.sendObj({type:'pushedButton'})
        }
    },
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
.top {
    overflow-y:scroll;
    height: 65%;
}
.bottom {
    height: 35%;
    display: flex;
    justify-content: center;
}
.button-container {
    width: 100%;
    display: flex;
    align-items: center;
}
.button {
    margin: auto;
    width: 200px;
    height: 200px;
    border-radius: 50%;
    background-color: red;
}
</style>