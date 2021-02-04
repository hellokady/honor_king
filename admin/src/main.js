import Vue from 'vue'
import http from './http'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/element.js'
import './main.css'

Vue.config.productionTip = false
Vue.prototype.$http = http
Vue.mixin({
  computed: {
    uploadUrl() {
      return `${this.$http.defaults.baseURL}upload`
    }
  },
  methods: {
    getAuthHeaders() {
      return {
        Authorization: `Bearer ${sessionStorage.getItem('token')}`
      }
    }
  }
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
