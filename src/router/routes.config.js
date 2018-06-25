//路由

//user
import HelloWorld from '@/components/HelloWorld'
import login from '@/views/user/login'
import register from '@/views/user/register'
import person from '@/views/user/person'
import personMessage from '@/views/user/personMessage'
import addressList from '@/views/user/addressList'
import addressDetail from '@/views/user/addressDetail'
import Information from '@/views/information/Information'
import InformationDetail from '@/views/information/InformationDetail'
import contentList from '@/views/information/contentList'
import acView from '@/views/information/acView'

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
    name: 'Information',
    path: '/Information',
    component: Information,
    meta: {
      // keepalive: true
    }
  }, {
    name: 'InformationDetail',
    path: '/InformationDetail',
    component: InformationDetail,
  }, {
    name: 'contentList',
    path: '/contentList',
    component: contentList,
  }, {
    name: 'acView',
    path: '/acView',
    component: acView,
  }, {
    name: 'addressList',
    path: '/addressList',
    component: addressList,
  }, {
    name: 'addressDetail',
    path: '/addressDetail',
    component: addressDetail,
  }
]