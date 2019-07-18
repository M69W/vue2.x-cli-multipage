import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import FastClick from 'fastclick'
import axios from 'axios'
import VueAxios from 'vue-axios'
import storage from '../../utils/storage'
import vConsole from 'vconsole'

FastClick.attach(document.body)
Vue.config.productionTip = false
// Vue.prototype.$http = api
Vue.use(VueAxios, axios)
Vue.prototype.$storage = storage

// eslint-disable-next-line new-cap
Vue.prototype.$vConsole = new vConsole()

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
