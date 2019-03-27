// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import './utils/common'
import './styles/scss/index.scss'
import vueLazy from 'vue-lazyload'
import store from './store/index.js'
Vue.config.productionTip = false
Vue.use(vueLazy, {
    loading: require('../static/img/default.png')
})
// Vue.prototype.$http=Axios;
/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    store,
    components: { App },
    template: '<App/>'
})
