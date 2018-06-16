import Vue from 'vue'
import Vuex from 'vuex'
import actions from './actions'
import getters from './getters'
import mutations from './mutations'
import state from './state'
import information from './modules/information'
import quotation from './modules/quotation'
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
    quotation
  }
});
