import 'babel-polyfill'
import Vue from 'vue'
import env from './env'
import store from './store'
import './human'
import App from './app'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import './sass/style.scss'

Vue.config.productionTip = false

Vue.use(ElementUI)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  env,
  store,
  router,
  render: h => h(App)
})
