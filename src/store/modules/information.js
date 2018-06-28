import * as types from '../mutations-type'
import http from '../../plugins/http'

const state = {
  informationActive: ''
}


const actions = {

  /*资讯*/
  /*新闻*/
  //列表
  [types.INFORMATION_LIST]({}, len) {
    return new Promise((resolve) => {
      http.get('/api/news.lists', {params: len}).then(res => {
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
  [types.FLASH_LIST]({}, len) {
    return new Promise((resolve) => {
      http.get('/api/news.flash', {params: len}).then(res => {
        return resolve(res.data)
      })
    })
  },
  //点评快讯
  [types.FLASH_COMMENT]({}, view) {
    return new Promise((resolve) => {
      http.get('/api/news.flash.comment', {params: view}).then(res => {
        return resolve(res.data)
      })
    })
  },
  /*名人库*/
  //列表
  [types.PERSON_LIST]({}, len) {
    return new Promise((resolve) => {
      http.get('/api/person.lists', {params: len}).then(res => {
        return resolve(res.data)
      })
    })
  },
  //文章内容
  [types.PERSON_CONTENT]({}, id) {
    return new Promise((resolve) => {
      http.get('/api/person.content', {params: {id}}).then(res => {
        return resolve(res.data)
      })
    })
  },
  /*专栏*/
  //一级分类
  [types.COLUMN_CATE]({}) {
    return new Promise((resolve) => {
      http.get('/api/column.cate').then(res => {
        return resolve(res.data)
      })
    })
  },
  //二级分类
  [types.COLUMN_CATESECOND]({}, pid) {
    return new Promise((resolve) => {
      http.get('/api/column.cate2nd', {params: {pid}}).then(res => {
        return resolve(res.data)
      })
    })
  },
  //专栏文章列表
  [types.COLUMN_LIST]({}, pid) {
    return new Promise((resolve) => {
      http.get('/api/column.lists', {params: {pid}}).then(res => {
        return resolve(res.data)
      })
    })
  },
  //专栏文章内容
  [types.COLUMN_CONTENT]({}, id) {
    return new Promise((resolve) => {
      http.get('/api/column.content', {params: {id}}).then(res => {
        return resolve(res.data)
      })
    })
  },
  //轮播
  [types.BROADCAST_AD]({}) {
    return new Promise((resolve) => {
      http.get('/api/flash.lists').then(res => {
        return resolve(res.data)
      })
    })
  },

}

const mutations = {
  [types.SET_INFORMATION_ACTIVE](state, index) {
    state.informationActive = index
    window.sessionStorage.setItem('informationActive', index)
  }
}

export default {
  state,
  actions,
  mutations,
  getters: {
    informationActive(state) {
      if (!state.informationActive && window.sessionStorage) {
        state.informationActive = window.sessionStorage.getItem('informationActive')
      }
      return state.informationActive ? state.informationActive : 0
    },
  }
}
