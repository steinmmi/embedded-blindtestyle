import Vue from 'vue'
import App from './App.vue'
import store from './store/'
import router from './router'
import VueNativeSock from 'vue-native-websocket'


screen.orientation.lock('portrait')
fetch('/config.json').then(res => res.json()).then(config => {
    store.state.config = config;
    console.log(store.state, ' d');
    
    Vue.config.productionTip = false
    Vue.use(VueNativeSock, config.ws, {store: store, format: 'json'})

    new Vue({
    store,
    router,
    render: h => h(App)
    }).$mount('#app')
});