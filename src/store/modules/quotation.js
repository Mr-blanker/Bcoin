import * as types from '../mutations-type'
import http from '../../plugins/http'

const state = {}


const actions = {

  //综合行情
  [types.TICKER_LIST]({}) {
    return new Promise((resolve) => {
      http.post('/api/coin.ticker').then(res => {
        return resolve(res.data)
      })
    })
  }
}

const mutations = {}

export default {
  state,
  actions,
  mutations,
  getters: {}
}
