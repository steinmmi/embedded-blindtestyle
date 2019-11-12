<template>
<div class="container">
    <h1>TOTAL: {{musics.length}} musiques</h1>
    <div class="music" v-for="music of musics" v-bind:key="music.id">
        <div class="left">
            <h2>{{music.title}}</h2>
            <h3>{{music.artist}}</h3>
        </div>
            <img class="right" v-if="music.cover" :src='music.cover'>
    </div>
</div>

</template>

<script>
import config from '../../public/config.json'
export default {
    name:'viewMusic',
    data () {
        return {
            musics: []
        }
    },
    mounted () {
        const urlQuery = `${config.url}/song/getAll`;
        return fetch(urlQuery).then(res => {return res.json()}).then(res => {this.musics = res})
    }
}
</script>

<style>
.music {
    display: flex;
    justify-content: space-between;
    height: 100px;
}
img.right {
    right: 0;
    height: 100%;
}
</style>