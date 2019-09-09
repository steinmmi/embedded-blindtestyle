import Vue from 'vue'
import App from './App.vue'
import store from './store/'
import router from './router'
import VueNativeSock from 'vue-native-websocket'

Vue.config.productionTip = false
Vue.use(VueNativeSock, 'ws://localhost:9700/', {store: store, format: 'json'})
new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')
