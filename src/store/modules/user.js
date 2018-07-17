import * as types from '../mutations-type'
import http from '../../plugins/http'
import md5 from 'md5'

const state = {
  informationActive: '',
  userSid: '',
  userInfo: {}
}


const actions = {
  //用户注册
  [types.USER_REGISTER]({}, userInfo) {
    userInfo.pwd = md5(userInfo.pwd)
    return new Promise((resolve) => {
      http.get('/api/user.register', {params: userInfo}).then(res => {
        return resolve(res.data)
      })
    })
  },

  //用户登录
  [types.USER_LOGIN]({commit, dispatch}, userInfo) {
    userInfo.pwd = md5(userInfo.pwd)
    return new Promise((resolve) => {
      http.get('/api/user.login', {params: userInfo}).then(res => {
        if (res.data.code === 0) {
          console.log(res.data)
          commit(types.SET_USER_SID, res.data.data.sid)
          dispatch(types.USER_USERINFO)
        }
        return resolve(res.data)
      })
    })
  },

  //用户登出
  [types.USER_LOGOUT]({commit}) {
    return new Promise((resolve) => {
      http.post('/api/user/logout').then(res => {
        if (res.data.code === 0) {
          commit(types.SET_USER_SID, '')
          commit(types.SET_USER_USERINFO, '')
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
  //获取用户地址
  [types.USER_ADDRESSLIST]({}) {
    return new Promise((resolve) => {
      http.get('/api/user/addr.lists').then(res => {
        return resolve(res.data)
      })
    })
  },
  //添加用户地址
  [types.USER_ADDADDRESS]({}, addressInfo) {
    return new Promise((resolve) => {
      http.get('/api/user/addr.add', {params: addressInfo}).then(res => {
        return resolve(res.data)
      })
    })
  },
  //编辑用户地址
  [types.USER_EDITRESSLIST]({}, addressInfo) {
    return new Promise((resolve) => {
      http.get('/api/user/addr.edit', {params: addressInfo}).then(res => {
        return resolve(res.data)
      })
    })
  },
//删除用户地址
  [types.USER_DELRESSLIST]({}, id) {
    return new Promise((resolve) => {
      http.get('/api/user/addr.del', {params: id}).then(res => {
        return resolve(res.data)
      })
    })
  },
  //最近使用的地址
  [types.USER_GETLASTADDR]({}) {
    return new Promise((resolve) => {
      http.get('/api/user/addr.getLastAddr').then(res => {
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
      if (!state.userInfo.length && window.localStorage.userInfo) {
        state.userInfo = JSON.parse(window.localStorage.getItem('userInfo'))
      }
      return state.userInfo ? state.userInfo : ''
    },

  }
}
