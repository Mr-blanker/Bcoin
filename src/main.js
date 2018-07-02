// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue"
import App from "./App"
import router from "./router"
import store from "./store"
import mixins from "./mixins"
import YDUI from "vue-ydui"
import echarts from 'echarts'
import "vue-ydui/dist/ydui.rem.css";
import "./assets/css/base.scss"
import "./assets/css/font/iconfont.css"
import "../static/mescroll.js/mescroll.min.css"
import mescrollJs from "../static/mescroll.js/mescroll.min.js"
import "./assets/css/public.scss"
import "./assets/css/style.scss"
import Header from "./components/Header"
import moment from 'moment'
import filters from './filters/index'
window.MeScroll = mescrollJs
Vue.prototype.$echarts = echarts 
Vue.mixin(mixins)
Vue.use(YDUI)
Vue.use(Header)
Vue.config.productionTip = false

for(let key in filters[0]){
    Vue.filter(key,filters[0][key])
}

Vue.filter('moment', function (value, formatString) {
  formatString = formatString || 'YYYY-MM-DD HH:mm:ss';
  return moment(value).format(formatString);
});
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: {App},
  template: '<App/>'
})
