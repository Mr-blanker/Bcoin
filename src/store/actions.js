import http from '../plugins/http'
import * as types from './mutations-type'
export default {
    getCoinLists({ commit }){
        http.get('/api/coin.lists').then(res=>{
            console.log(res)
        })
    }
}