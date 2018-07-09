import * as types from '../mutations-type'
import http from '../../plugins/http'

const state = {
  informationActive: ''
}


const actions = {
  /*社群*/
  [types.COMMUNITY_ADD]({}, info) {
    return new Promise((resolve) => {
      http.get('/api/user/group.create', {params: info}).then(res => {
        return resolve(res.data)
      })
    })
  }
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
