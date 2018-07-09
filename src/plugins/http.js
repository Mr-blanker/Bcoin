import axios from 'axios'
import qs from 'qs'
// import config from './config'
import store from '../store'
import * as types from '../store/mutations-type'
import router from '../router'
import {Loading, Confirm} from 'vue-ydui/dist/lib.rem/dialog';

// axios 配置
axios.defaults.timeout = 5000;
//配置请求的地址
axios.defaults.baseURL = "http://ssl.pandawork.vip";
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';
axios.defaults.headers.post['Content-Type'] = 'multipart/form-data; charset=UTF-8';

// http request 拦截器
let notLoading = ['/api/news.lists','/api/flash.lists','/api/news.flash',
                  '/api/column.cate','/api/person.lists','/api/coin.lists',
                  '/api/coin.ticker','api/platform.lists','/api/platform.ticker',
                  '/api/coin.plat']
axios.interceptors.request.use(
  config => {
    if (store.getters.userSid) {
      config.headers['sid'] = store.getters.userSid
    }
    config.data = qs.stringify(config.data);
    if (notLoading.includes(config.url)) {
      return config;
    }
    Loading.open('加载中');
    return config;
  },
  error => {
    console.log(error)
    Loading.close();

    return Promise.reject(error);
  }
);
// http response 拦截器
axios.interceptors.response.use(
  response => {
    switch (response.data.code) {
      case 401:
        //如果token过期则清空本地缓存
        window.localStorage.clear();
        store.dispatch(types.USER_LOGOUT).then(() => {
          // utils.dialog.confirm({
          //   content: "登录过期，是否跳转到登陆页？",
          //   confirm: function () {
          //     router.push({
          //       name: 'login'
          //     });
          //   }
          // });
          Confirm({
            title: '登录过期',
            mes: '是否跳转到登录？',
            opts: () => {
              this.$router.push({path: 'Login'})
            }
          })
        });
        break;
    }
    ;
    Loading.close();
    return response;
  },

  error => {
    console.log(error)
    if (typeof error == "undefined") {
      error = {code: '-1', message: 'no network'}
    }
    else if (error.toString() && error.toString().indexOf('timeout') > 0) {
      error = {code: '-2', message: '请求超时，请稍后再试'}
    }
    else if (error.toString() && error.toString().indexOf('Network') > 0) {
      error = {code: '-3', message: '访问错误!'}
    }
    else if (error.toString() && error.toString().indexOf('500') > 0) {
      error = {code: '-4', message: '服务器内容错误!'}
    }

    console.log(error);

    Loading.close();
    return Promise.rejects(error)
  }
)


export default axios;
