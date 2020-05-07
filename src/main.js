import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import myUi from './index.js'
import   '../package/theme-chalk/src/index.scss'

Vue.use(myUi)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
