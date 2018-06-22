import * as types from '../mutations-type'
import http from '../../plugins/http'

const state = {}


const actions = {

  //综合行情
  [types.TICKER_LIST]({},params) {
      return http.get('/api/coin.ticker',{params})
  },
  //获取平台
  [types.PLATFORM_LIST]({},params) {
    return http.get('/api/platform.lists',{params})
  },
  //获取币种
  [types.COIN_LIST]({}) {
    return http.get('/api/coin.lists',)
  },
  //指定货币的各平台行情
  [types.LIST_BY_CID]({},params) {
    return http.get('/api/coin.plat',{params})
  },
}

const mutations = {}

export default {
  state,
  actions,
  mutations,
  getters: {}
}
