import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Screen from './views/Screen.vue'
import Player from './views/Player.vue'
import Gamemaster from './views/Gamemaster.vue'
import AddMusc from './views/AddMusic.vue'
import viewMusics from './views/ViewMusics.vue'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/screen',
      name: 'screen',
      component: Screen
    },
    {
        path: '/play',
        name: 'player',
        component: Player
    },
    {
      path: '/musics',
      name: 'musics',
      component: viewMusics
  },
    {
      path: '/gamemaster',
      name: 'gamemaster',
      component: Gamemaster
  },
  {
    path: '/addMusic',
    name: 'addMusic',
    component: AddMusc
  }
  ]
})
