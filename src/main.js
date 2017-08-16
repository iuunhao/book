// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import infiniteScroll from 'vue-infinite-scroll'
import VueLazyload from 'vue-lazyload'
// import Vuex from 'vuex'
// Vue.use(Vuex)
// import store from './store/index'
Vue.use(infiniteScroll)
Vue.use(VueLazyload, {
  // loading: "../static/loading-spinning-bubbles.svg"
  loading: "http://www.wkun.com/book/images/six/m/loading.gif"
})

Vue.config.productionTip = false
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  // store,
  template: '<App/>',
  components: { App }
})
