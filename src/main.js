// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue"
import App from "./App"
import router from "./router"
import store from "./store"
import mixins from "./mixins"
import YDUI from "vue-ydui"
import "vue-ydui/dist/ydui.rem.css";
import "./assets/css/base.scss"
import "./assets/css/font/iconfont.css"
import "./assets/css/public.scss"
import "./assets/css/style.scss"
import Header from "./components/Header"
import moment from 'moment'

Vue.mixin(mixins)
Vue.use(YDUI)
Vue.use(Header)
Vue.config.productionTip = false


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
