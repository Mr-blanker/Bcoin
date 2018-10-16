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
    //登录判断
    if (to.meta.requireAuth && !store.getters.userSid) {
        router.push({name: 'login'});
    }
    setTimeout(() => {
        let heightScrollTop = store.state.quotation.scrollTop //滚动高度
        console.log(heightScrollTop)
        window.sessionStorage.setItem('heightScrollTop_' + from.name, heightScrollTop);
    }, 200)
    next()

})
export default router
