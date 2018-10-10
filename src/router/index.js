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
        // this.fail("请先登录");
        router.push({name: 'login'});
    }
    // let informationId = window.sessionStorage.getItem('informationActive')
    // let scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
    setTimeout(() => {
        console.log(store.getters.scrollTop, 'index')
        let heightScrollTop = store.state.quotation.scrollTop //滚动高度
        window.sessionStorage.setItem('heightScrollTop_' + from.name, heightScrollTop);
    }, 200)
    next()

})
export default router
