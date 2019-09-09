<template>
  <div id="app">
    <router-view/>
  </div>
</template>
<script>
export default {
    mounted() {
        this.$options.sockets.onopen = () => {
        if(this.$route.name === 'screen') {
            this.$socket.sendObj({type: 'setRole', data: 'screen'})
        }
        else this.$socket.sendObj({type: 'setRole', data: 'test'})
        }

        
        
    },
}
</script>
<style>
#app {
    --font-color: #fefefe;
    --bg-color: #444;
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    color: var(--font-color);
    height: 100%;
    background-color: var(--bg-color);
}

a {
    color: var(--font-color);
}
</style>
