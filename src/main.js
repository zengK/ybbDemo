// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import VueRouter from 'vue-router'
import Routers from './router.js'
import axios from 'axios'
import VueAxios from 'vue-axios'
import iView from 'iview'
import VueResource from 'vue-resource'
import 'iview/dist/styles/iview.css'
 Vue.prototype.$http = axios
Vue.use(VueAxios, axios)
Vue.use(VueResource)
Vue.use(VueRouter)
Vue.use(iView)
Vue.config.productionTip = false

const RouterConfig = {
	mode: 'history',
  routes: Routers
};
const router = new VueRouter(RouterConfig);
/* eslint-disable no-new */
new Vue({
    el: '#app',
    router: router,
    render: h => h(App)
});
