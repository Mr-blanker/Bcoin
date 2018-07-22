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
//标签管理
import tagManange from '@/views/quotation/tagManange'
//标签添加
import addTag from '@/views/quotation/addTag'
//用户自选
import manageUserChoice from '@/views/quotation/manageUserChoice'
import addChoice from '@/views/quotation/addChoice'

//搜索
import search from '@/views/search'
//社群
import community from '@/views/community/community'
import communityAdd from '@/views/community/communityAdd'
import communityDynamic from '@/views/community/communityDynamic'
import Release from '@/views/community/Release'
import articleDetail from '@/views/community/articleDetail'

//积分商城
import mallIndex from '@/views/integralMall/index'
import shopDetail from '@/views/integralMall/shopDetail'
import ownAuction from '@/views/integralMall/ownAuction'
import ownOrder from '@/views/integralMall/ownOrder'
import createOrder from '@/views/integralMall/createOrder'
import userAddressList from '@/views/integralMall/userAddressList'
import orderDetail from '@/views/integralMall/orderDetail'

export default [
  {
    path: '/',
    redirect: '/Information',
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
    meta:{
      keepalive:true
    }
  },
  {
   name:'manageUserChoice',
   path:'/manageUserChoice',
   component:manageUserChoice 
  },
  {
    name:'addChoice',
    path:'/addChoice',
    component:addChoice 
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

  },
  {
    name:'mallIndex',
    path:'/mallIndex',
    component: mallIndex,
  },
  {
    name: 'tagManange',
    path: '/tagManange',
    component: tagManange
  },
  {
    name: 'createOrder',
    path: '/createOrder',
    component: createOrder
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
  },
  {
    name: 'addTag',
    path: '/addTag',
    component: addTag,
  },{
    name: 'community',
    path: '/community',
    component: community,
    meta:{
      keepalive:true
    }
  },{
    name: 'communityAdd',
    path: '/communityAdd',
    component: communityAdd,
  },
  {
    name: 'shopDetail',
    path: '/shopDetail',
    component: shopDetail,
  },
  {
    name: 'ownAuction',
    path: '/ownAuction',
    component: ownAuction,
  }, 
  {
    name: 'ownOrder',
    path: '/ownOrder',
    component: ownOrder,
  },
  {
    name: 'userAddressList',
    path: '/userAddressList',
    component: userAddressList,
  },
  {
    name: 'orderDetail',
    path: '/orderDetail',
    component: orderDetail,
  },
  ,{
    name: 'upload',
    path: '/upload',
    component: ()=>import('../components/upload/Upload'),
  },{
    name: 'communityDynamic',
    path: '/communityDynamic',
    component: communityDynamic,
  },{
    name: 'Release',
    path: '/Release',
    component: Release,
  },{
    name: 'articleDetail',
    path: '/articleDetail',
    component: articleDetail,
  }

]