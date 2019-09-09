!<template>
    <div class="leaderboard">
        <h1>Scores</h1>
        <div class="players">
            <div v-for="(player,index) in orderredPlayers" :key="player.id" class="player" :style="{backgroundColor: player.color, color: contrast(player.color)}">
                <div class="infos">
                    <span class="crown" v-if="index === 0">👑</span>
                    <span class="player-name">
                        {{ player.name }}
                    </span>
                
                    <span class="player-score">
                        {{ player.score }}
                    </span>
                    
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import _ from 'lodash';
export default {
    name: 'leaderboard',
    computed: {
        players () {
            return this.$store.getters.playersList;
        },
        orderredPlayers () {
            return _.orderBy(this.players, 'score').reverse()
        }
    },
    methods: {
        contrast (hex) {
            let threshold = 130; /* about half of 256. Lower threshold equals more dark text on dark background  */
			
			let hRed = hexToR(hex);
			let hGreen = hexToG(hex);
			let hBlue = hexToB(hex);
			
      
			function hexToR(h) {return parseInt((cutHex(h)).substring(0,2),16)}
			function hexToG(h) {return parseInt((cutHex(h)).substring(2,4),16)}
			function hexToB(h) {return parseInt((cutHex(h)).substring(4,6),16)}
			function cutHex(h) {return (h.charAt(0)=="#") ? h.substring(1,7):h}

			let cBrightness = ((hRed * 299) + (hGreen * 587) + (hBlue * 114)) / 1000;
              if (cBrightness > threshold){return "#000000";} else { return "#ffffff";}	
        }
        }
    }
</script>

<style scoped>
.leaderboard {
    padding: 20px 0;
}
h1 {
    margin: 0;
    margin-bottom: 10px;
    text-align: center;
}
.players {
    display: flex;
    align-items: center;
    flex-direction: column;
}
.player {
    padding: 5px 0;
    display: flex;
    justify-content: center;
    width: 100%;
    margin: 5px;
}
.player > * {
    margin: 0 5px;
}
</style>