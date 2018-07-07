import http from '../plugins/http'
import * as types from './mutations-type'
export default {
    getCoinLists({ commit }){
        http.get('/api/coin.lists').then(res=>{
            console.log(res)
        })
    },
    getTickers({commit}){
        http.get('/api/coin.ticker').then(res=>{
            
        })
    },

  //上传图片
  [types.UPLOAD_IMAGE]({},imageInfo){
      console.log(imageInfo)
    return new Promise((resolve) => {
      http.post('/api/upload', imageInfo).then(res => {
        return resolve(res.data)
      })
    })
  }
}