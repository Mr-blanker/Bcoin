//路由判断
import Vue from 'vue'
import Router from 'vue-router'
import routes from './routes.config'
import store from '../store'

Vue.use(Router)

const router = new Router({
  routes,
  // scrollBehavior(to, from, savedPosition) {
  //     console.log('savedPosition=>')
  //     console.dir(savedPosition)
  //   if (savedPosition) {
  //     document.body.scrollTop = savedPosition.y
  //     console.log('document.body.scrollTop')
  //     console.log(savedPosition.y)
  //     console.log(document.body.scrollTop)
  //     return savedPosition
  //   } else {
  //     return {x: 0, y: 0}
  //   }
  // }
})

router.beforeEach((to, from, next) => {
  next()
})
export default router
