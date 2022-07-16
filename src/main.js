import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui'
import VueRouter from 'vue-router'
import router from './router'
import store from './store'


Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.use(VueRouter)

new Vue({
  render: h => h(App),
  store,
  router
}).$mount('#app')
