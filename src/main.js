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
import 'moment/locale/zh-cn'
import filters from './filters/index'
import FastClick from 'fastclick'
import touch from 'vue-directive-touch';
FastClick.attach(document.body);

Vue.prototype.$echarts = echarts
Vue.mixin(mixins)
Vue.use(touch);
Vue.use(YDUI)
Vue.component('Header', Header)
Vue.config.productionTip = false
Vue.component(Slider.name, Slider);
Vue.component(SliderItem.name, SliderItem);

for (let key in filters[0]) {
  Vue.filter(key, filters[0][key])
}

Vue.config.errorHandler = function (err, vm, info) {
  let componentName = vm.$options.name
  console.log(`%c 组件:${componentName},在${info}发生了异常,信息如下:`,"color:red")
  console.log(err)
}

Vue.filter('moment', function (value, formatString) {
  formatString = formatString || 'YYYY-MM-DD HH:mm:ss';
  return moment(value).format(formatString);
});
//重写alert,解决ios下出现url的情况
window.alert = function(name){
  　　var iframe = document.createElement("IFRAME");
 　　iframe.style.display="none";
 　　iframe.setAttribute("src", 'data:text/plain,');
 　　document.documentElement.appendChild(iframe);
 　　window.frames[0].window.alert(name);
 　　iframe.parentNode.removeChild(iframe);
 }
  
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: {App},
  template: '<App/>'
})
