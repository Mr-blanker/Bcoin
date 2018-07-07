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

//行情
import marketIndex from '@/views/quotation/marketIndex'
//走势
import trend from '@/views/quotation/trend'

//搜索
import search from '@/views/search'
//社群
import community from '@/views/community/community'
import communityAdd from '@/views/community/communityAdd'


export default [
  {
    path: '/',
    redirect: '/marketIndex',
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
    name: 'marketIndex',
    path: '/marketIndex',
    component: marketIndex,
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
    component: marketIndex
  },
  { name: 'Information',
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
    component: addressDetail
  },{
    name: 'Information',
    path: '/Information',
    component: Information,
    meta:{
      keepalive:true
    }
  },
  {
    name: 'InformationDetail',
    path: '/InformationDetail',
    component: InformationDetail
  },
  {
    name: 'marketIndex',
    path: '/marketIndex',
    component: marketIndex
  }, 
  {
    name: 'trend',
    path: '/trend',
    component: trend,
  },{
    name: 'community',
    path: '/community',
    component: community,
  },{
    name: 'communityAdd',
    path: '/communityAdd',
    component: communityAdd,
  }

]