//路由

//user
import HelloWorld from '@/components/HelloWorld'
import login from '@/views/user/login'
import register from '@/views/user/register'
import person from '@/views/user/person'
import personMessage from '@/views/user/personMessage'

//行情
import marketIndex from '@/views/quotation/marketIndex'

//搜索
import search from '@/views/search'


export default [
  {
    path: '/',
    redirect: '/HelloWorld',
  },
  {
    name: 'HelloWorld',
    path: '/HelloWorld',
    component: HelloWorld,
  },
  {
    name: 'login',
    path: '/login',
    component: login,
  },
  {
    name: 'register',
    path: '/register',
    component: register,
  },
  {
    name: 'person',
    path: '/person',
    component: person,
  },
  {
    name: 'personMessage',
    path: '/personMessage',
    component: personMessage,
  },
  {
    name: 'search',
    path: '/search',
    component: search,
  },
  {
    name: 'marketIndex',
    path: '/marketIndex',
    component: marketIndex,
  }
]