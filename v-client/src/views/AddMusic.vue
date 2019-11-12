<template>
  <div class="container">
    <div class="left">
      <input type="file" v-on:change="handleFileChange($event)" />
      <input type="text" v-model="music.title" placeholder="Titre" @change="search()"/>
      <input type="text" v-model="music.artist" placeholder="Artiste" />
      <input type="text" v-model="music.year" placeholder="Année" />
      <img :src="music.cover" alt="Cover">
      <button @click="add()">send</button>
    </div>
    <div class="right">
        <div class="result" v-for="song in songs" v-bind:key="song.id" @click='selectResult(song)'>
            <div class="title">{{song.title}}</div>
            <div class="artist">{{song.artist}}</div>
            <div v-if="song.album" class="year">{{new Date(song.album.release_date).getFullYear()}}</div>
            <div class="plus">
                <img class='cover' v-if="song.album" :src="song.album.cover" alt="">
                <audio class="preview" :src="song.preview" controls></audio>
            </div>
        </div>
    </div>
  </div>
</template>

<script>
import config from "../../public/config.json";
export default {
  name: "AddMusic",
  data() {
    return {
      music: {},
      songs: []
    };
  },
  methods: {
    handleFileChange(evt) {
      this.music.file = evt.target.files[0];
    },
    selectResult(val) {
        this.music = {
            file: this.music.file,
            title: val.title,
            artist: val.artist,
            cover: val.album.cover_big,
            year: new Date(val.album.release_date).getFullYear()
        }
    },
    search() {
        this.searchTrack(this.music.title).then(res => {
            this.songs = res.map(el => {
                return {
                    title: el.title,
                    preview: el.preview,
                    albumId: el.album.id,
                    artist: el.artist.name
                }
            })
            let promises = []
            this.songs.forEach((el, index) => {
                promises.push(this.getAlbumInfos(el.albumId))
            })
            Promise.all(promises).then(res => {
                for( let song of this.songs ) {
                    for ( let album of res ) {
                        if(song.albumId === album.id) song.album = album
                        
                    }
                }
                this.$forceUpdate();
                
            })

            
            
        })
    },
    add() {
      if (
        this.music.file === undefined ||
        this.music.file === null ||
        this.music.artist === undefined ||
        this.music.artist.length === 0 ||
        this.music.title === undefined ||
        this.music.title.length === 0 ||
        this.music.year === undefined ||
        this.music.year.length === 0
      ) {
        throw Error('Missing something')
      }
      const formData = new FormData();
      formData.append("file", this.music.file);
      formData.append("artist", this.music.artist);
      formData.append("title", this.music.title);
      formData.append("year", this.music.year);
      if(this.music.cover)
        formData.append("cover", this.music.cover);

      fetch(`${config.url}/song/add`, {
        method: "POST",
        body: formData
      }).then(res => {
        return res.json()
      }).then(res => {
          console.log(this.music.title, res);
          
      })
    },
    searchTrack(q) {
        const urlQuery = `${config.url}/deezer/search?q=${q}`;
        return fetch(urlQuery).then(res => {return res.json()})
    },
    getAlbumInfos(id) {
        const urlQuery = `${config.url}/deezer/album/${id}`;
        return fetch(urlQuery).then(res => {return res.json()})
    }
  }
};
</script>

<style scoped>
.container {
    display: flex;
    justify-content: space-around;
}
.result {
    background-color: #333;
    border-radius: 5px;
    padding: 1em;
    margin: 1em;
}
.left, .right {
    width: 50%;
}
.left {
    display: flex;
    flex-direction: column;
    align-items: center;
}
.left > * {
    width: 80%;;
}
.title {
    font-weight: bold;
}
.artist {
    font-style: italic;
    font-size: 14px;
}
.cover {
    width: 100px;
    height: 100px;
}
.preview {
    height: 100px;
}
.plus {
    display: flex;
}
</style>