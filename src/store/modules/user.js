import * as types from '../mutations-type'
import http from '../../plugins/http'

const state = {
  informationActive: '',
  userSid: '',
  userInfo: {}
}


const actions = {
  //用户注册
  [types.USER_REGISTER]({}, userInfo) {
    return new Promise((resolve) => {
      http.get('/api/user.register', {params: userInfo}).then(res => {
        return resolve(res.data)
      })
    })
  },

  //用户登录
  [types.USER_LOGIN]({commit, dispatch}, userInfo) {
    return new Promise((resolve) => {
      http.get('/api/user.login', {params: userInfo}).then(res => {
        if (res.data.code === 0) {
          commit(types.SET_USER_SID, res.data.data.sid)
          dispatch(types.USER_USERINFO)
        }
        return resolve(res.data)
      })
    })
  },

  //用户登出
  [types.USER_LOGOUT]({}) {
    return new Promise((resolve) => {
      http.get('/api/user/logout').then(res => {
        if (res.data.code === 0) {
          commit(types.SET_USER_SID, '')
        }
        return resolve(res.data)
      })
    })
  },

  //获取用户信息
  [types.USER_USERINFO]({commit}) {
    return new Promise((resolve) => {
      http.get('/api/user/info').then(res => {
        console.log(res.data)
        if (res.data.code === 0) {
          commit('SET_USER_USERINFO', res.data.data)
          console.log(res.data.data)
        }
        return resolve(res.data)
      })
    })
  },

}

const mutations = {
  [types.SET_USER_SID](state, sid) {
    console.log(sid)
    window.localStorage.setItem('userSid', sid)
    state.userSid = sid

  },
  [types.SET_USER_USERINFO](state, userInfo) {
    window.localStorage.setItem('userInfo', JSON.stringify(userInfo))
    state.userInfo = userInfo
  }
}

export default {
  state,
  actions,
  mutations,
  getters: {
    userSid(state) {
      if (!state.userSid && window.localStorage.userSid) {
        state.userSid = window.localStorage.getItem('userSid')
      }
      return state.userSid ? state.userSid : ''
    },
    userInfo(state) {
      if (!state.userInfo && window.localStorage.userInfo) {
        state.userInfo = JSON.parse(window.localStorage.getItem('userInfo'))
      }
      return state.userInfo ? state.userInfo : ''
    },

  }
}
