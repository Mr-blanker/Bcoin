import http from '../plugins/http'
import * as types from './mutations-type'
export default {
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