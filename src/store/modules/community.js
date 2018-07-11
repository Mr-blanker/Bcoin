import * as types from '../mutations-type'
import http from '../../plugins/http'

const state = {
  informationActive: ''
}


const actions = {
  /*社群*/
  [types.COMMUNITY_CREATE]({}, info) {
    return new Promise((resolve) => {
      http.get('/api/user/group.create', {params: info}).then(res => {
        return resolve(res.data)
      })
    })
  },
  // 社群列表
  [types.COMMUNITY_LIST]({}, info) {
    return new Promise((resolve) => {
      http.get('/api/group.lists', {params: info}).then(res => {
        return resolve(res.data)
      })
    })
  },
  // 社群详细信息
  [types.COMMUNITY_DETAIL]({}, id) {
    return new Promise((resolve) => {
      http.get('/api/group.info', {params: id}).then(res => {
        return resolve(res.data)
      })
    })
  },
  // 加入社群
  [types.COMMUNITY_ADD]({}, gid) {
    return new Promise((resolve) => {
      http.get('/api/user/group.jion', {params: gid}).then(res => {
        return resolve(res.data)
      })
    })
  },
  // 发布文章
  [types.COMMUNITY_PUBLISH]({}, info) {
    return new Promise((resolve) => {
      http.get('/api/user/group.publish', {params: info}).then(res => {
        return resolve(res.data)
      })
    })
  },
  // 获取社群文章列表
  [types.COMMUNITY_ARTICLE_LIST]({}, info) {
    return new Promise((resolve) => {
      http.get('/api/group.article', {params: info}).then(res => {
        return resolve(res.data)
      })
    })
  },
  // 社群文章点赞
  [types.COMMUNITY_DIANZAN]({}, info) {
    let inf = JSON.stringify(info)
    console.log(inf)
    let ii = {
      aid: 1,
      like: false
    }

    return new Promise((resolve) => {
      http.post('/api/user/group.like', JSON.stringify(inf)).then(res => {
        return resolve(res.data)
      })
    })
  },
  // 社群文章评论
  [types.COMMUNITY_PINGLUN]({}, info) {
    let inf = JSON.stringify(info)
    console.log(inf)
    return new Promise((resolve) => {
      http.get('/api/user/group.comment', {params: inf}).then(res => {
        return resolve(res.data)
      })
    })
  },
}

const mutations = {
  // [types.SET_INFORMATION_ACTIVE](state, index) {
  //   state.informationActive = index
  //   window.sessionStorage.setItem('informationActive', index)
  // }
}
export default {
  state,
  actions,
  mutations,
  getters: {
    // informationActive(state) {
    //   if (!state.informationActive && window.sessionStorage) {
    //     state.informationActive = window.sessionStorage.getItem('informationActive')
    //   }
    //   return state.informationActive ? state.informationActive : 0
    // },
  }
}
