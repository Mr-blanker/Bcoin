import * as types from '../mutations-type'
import http from '../../plugins/http'

const state = {
  informationActive: ''
}


const actions = {
  //用户登录
  [types.USER_LOGIN]({},userInfo) {
    return new Promise((resolve) => {
      http.get('/api/user.login',userInfo).then(res => {
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
      console.log(window.sessionStorage.getItem('informationActive'))
      if (!state.informationActive && window.sessionStorage) {
        state.informationActive = window.sessionStorage.getItem('informationActive')
      }
      return state.informationActive ? state.informationActive : 0
    },
  }
}
