import Vue from 'vue'
import Vuex from 'vuex'
import actions from './actions'
import getters from './getters'
import mutations from './mutations'
import state from './state'
import information from './modules/information'
import user from './modules/user'
import quotation from './modules/quotation'
import mall from './modules/mall'
// import message from './modules/message'
// import work from './modules/work'
// import equipment from './modules/equipment'


Vue.use(Vuex)


export default new Vuex.Store({
  state,
  getters,
  actions,
  mutations,
  modules: {
    information,
    user,
    quotation,
    mall
  }
});
