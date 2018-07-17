import * as types from '../mutations-type'
import http from '../../plugins/http'

const state = {}


const actions = {

  //获取拍卖商品列表
  [types.PRD_LIST]({},params) {
      return http.get('/api/prd.lists',{params})
  },
  //获取拍卖商品详情
  [types.PRD_DETAIL]({},params) {
    return http.get('/api/prd.info',{params})
  },
  //竞拍
  [types.PRD_AUCTION]({},params) {
    return http.post('/api/user/prd.auction',params)
  },
  //获取用户参与竞拍的商品列表
  [types.USER_PRD_AUCTION]({},params) {
    return http.get('/api/user/prd.auction.lists',{params})
  },
  //换购商品
  [types.PRD_EXCHANGE]({},params) {
    return http.post('/api/user/prd.exchange',params)
  },
  //获取用户的订单
  [types.USER_ORDER_LIST]({},params) {
    return http.get('/api/user/orders',{params})
  },
  //取消订单
  [types.CANCLE_ORDER]({},params) {
    return http.post('/api/user/order.cancel',params)
  },


}

const mutations = {}

export default {
  state,
  actions,
  mutations,
  getters: {}
}
