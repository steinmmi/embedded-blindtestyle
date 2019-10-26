<template>
<div class="container">
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
              <div class="button green"></div>
              <div class="button red"></div>
          </div>
          
      </div>
  </div>
</template>

<script>
import Leaderboard from '../components/Leaderboard'
export default {
    name: 'Gamemaster',
    components: {Leaderboard},
    computed: {
        player () {
            return this.$store.getters.player;
        },
        currentSong () {
            return this.$store.getters.currentSong
        },
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