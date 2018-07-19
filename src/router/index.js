//路由判断
import Vue from 'vue'
import Router from 'vue-router'
import routes from './routes.config'
import store from '../store'

Vue.use(Router)

const router = new Router({
  routes,
})

router.beforeEach((to, from, next) => {
  let informationId = window.sessionStorage.getItem('informationActive')
  let scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
  if (from.name == 'Information') {
    window.sessionStorage.setItem('scrollTop_' + from.name + '_' + informationId, scrollTop);
    next();
  }else{
    window.sessionStorage.setItem('scrollTop_' + from.name, scrollTop);
    next();
  }
})
export default router
