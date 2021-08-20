import Vue from 'vue'
import App from './App.vue'

import vuetify from './plugins/vuetify'
import axios from './plugins/axios';
import router from './router'

import store from './store/store'

Vue.prototype.$api = axios
Vue.config.productionTip = false

new Vue({
  axios,
  vuetify,
  router,
  store,
  render: h => h(App)
}).$mount('#app')