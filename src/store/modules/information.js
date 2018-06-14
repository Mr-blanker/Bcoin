import * as types from '../mutations-type'
import http from '../../plugins/http'

const state = {}


const actions = {

  /*资讯*/
  /*新闻*/
  //列表
  [types.INFORMATION_LIST]({}) {
    return new Promise((resolve) => {
      http.post('/api/news.lists').then(res => {
        return resolve(res.data)
      })
    })
  },
  //详情
  [types.INFORMATION_DETAIL]({}, aid) {
    return new Promise((resolve) => {
      http.post('/api/news.detail', {aid}).then(res => {
        return resolve(res.data)
      })
    })
  },
  /*快讯*/
  //列表
  [types.FLASH_LIST]({}) {
    return new Promise((resolve) => {
      http.post('/api/news.flash').then(res => {
        return resolve(res.data)
      })
    })
  },
  //点评快讯
  [types.FLASH_COMMENT]({}, view) {
    return new Promise((resolve) => {
      http.get('/news.flash.comment', {params:view}).then(res => {
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
