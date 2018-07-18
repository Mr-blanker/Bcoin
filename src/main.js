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
import {Slider, SliderItem} from 'vue-ydui/dist/lib.rem/slider';
import "./assets/css/base.scss"
import "./assets/css/font/iconfont.css"
import "./assets/css/public.scss"
// import "./assets/css/style.scss"
import Header from "./components/Header"
import moment from 'moment'
import filters from './filters/index'
Vue.prototype.$echarts = echarts 
Vue.mixin(mixins)
Vue.use(YDUI)
Vue.component('Header', Header)
Vue.config.productionTip = false
Vue.component(Slider.name, Slider);
Vue.component(SliderItem.name, SliderItem);

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
