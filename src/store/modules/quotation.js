import * as types from '../mutations-type'
import http from '../../plugins/http'

const state = {
  scrollTop:0,
  scrollBox:''
}


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
  [types.COIN_LIST]({},params) {
    return http.get('/api/coin.lists',{params})
  },
  //指定货币的各平台行情
  [types.LIST_BY_CID]({},params) {
    return http.get('/api/coin.plat',{params})
  },
  //指定平台交易列表
  [types.LIST_BY_PLAT]({},params){
    return http.get('/api/platform.ticker',{params})
  },
  //指定平台交易列表
  [types.TREND]({},params){
    return http.get('/api/coin.trend',{params})
  },
  //获取用户自选列表
  [types.CHOICE_LIST]({}){
    return http.get('/api/user/choice.lists')
  },
  //删除用户自选
  [types.DEL_CHOICE]({},params){
    return http.post('/api/user/choice.del',params)
  },
  //新增用户自选
  [types.ADD_CHOICE]({},params){
    return http.post('/api/user/choice.add',params)
  },
  //搜索指定关键字对应的币种
  [types.SEARCH_CHOICE]({},params){
    return http.get('/api/coin.search',{params})
  },
  //综合行情排序
  [types.SORT_TICKER]({},params){
    return http.get('/api/coin.ticker2',{params})
  },
  //指定货币的各平台行情排序
  [types.SORT_PLAT]({},params){
    return http.get('/api/coin.plat2',{params})
  },
  //购买货币
  [types.BUY_COIN]({},params){
    return http.post('/api/user/coin.buy',params)
  },
  //出售货币
  [types.SALE_COIN]({},params){
    return http.post('/api/user/coin.sell',params)
  },
  //个人购买货币列表
  [types.MY_COIN]({},params){
    return http.post('/api/user/coin.myCoins',params)
  }
  
}

const mutations = {
  [types.SET_SCROLL_TOP](state, top) {
    console.log(top)
    window.localStorage.setItem('scrollTop', top)
    state.scrollTop = top
  },
  [types.SET_SCROLL_BOX](state, Id) {
    console.log(Id)
    window.localStorage.setItem('scrollBox', Id)
    state.scrollBox = Id
  }
}
const getters = {
  scrollTop(state) {
    if (!state.scrollTop && window.localStorage.scrollTop) {
      state.scrollTop = window.localStorage.getItem('scrollTop')
    }
    return state.scrollTop ? state.scrollTop : 0
  },
  scrollBox(state) {
    if (!state.scrollBox && window.localStorage.scrollBox) {
      state.scrollBox = window.localStorage.getItem('scrollBox')
    }
    return state.scrollBox ? state.scrollBox : ''
  }
}
export default {
  state,
  actions,
  mutations,
  getters
}
