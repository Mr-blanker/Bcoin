//路由

import HelloWorld from '@/components/HelloWorld'

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
]