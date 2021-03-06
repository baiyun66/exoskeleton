// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import vuetify from './plug-in/vuetify'
// import echarts from 'echarts'
import myecharts from './components/ecahrts/myecharts'
Vue.use(myecharts)
// import './mock'
Vue.config.productionTip = false

// require('./mock.js')

/* eslint-disable no-new */
new Vue({
  vuetify,
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
