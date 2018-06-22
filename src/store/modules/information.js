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
      http.get('/api/news.flash.comment', {params: view}).then(res => {
        return resolve(res.data)
      })
    })
  },
  /*名人库*/
  //列表
  [types.PERSON_LIST]({}) {
    return new Promise((resolve) => {
      http.get('/api/person.lists').then(res => {
        return resolve(res.data)
      })
    })
  },
  //文章内容
  [types.PERSON_CONTENT]({}, id) {
    return new Promise((resolve) => {
      http.get('/api/person.content', {params:{id}}).then(res => {
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
      http.get('/api/column.cate2nd', {params:{pid}}).then(res => {
        return resolve(res.data)
      })
    })
  },
  //专栏文章列表
  [types.PERSON_CONTENT]({}, id) {
    return new Promise((resolve) => {
      http.get('/api/column.lists', {params:{id}}).then(res => {
        return resolve(res.data)
      })
    })
  },
  //专栏文章内容
  [types.PERSON_CONTENT]({}, id) {
    return new Promise((resolve) => {
      http.get('/api/column.content', {params:{id}}).then(res => {
        return resolve(res.data)
      })
    })
  },

}

const mutations = {}

export default {
  state,
  actions,
  mutations,
  getters: {}
}
