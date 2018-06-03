//路由判断
import Vue from 'vue'
import Router from 'vue-router'
import routes from './routes.config'

Vue.use(Router)

const router = new Router({
  routes
})

router.beforeEach((to, from, next) => {

})
export default router


