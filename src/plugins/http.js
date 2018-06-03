import axios from 'axios'
import qs from 'qs'
// import config from './config'
import store from '../store'
import * as types from '../store/mutations-type'
import router from '../router'
// import {
//   Indicator
// } from 'mint-ui';

// axios 配置
axios.defaults.timeout = 5000;
//配置请求的地址
axios.defaults.baseURL = window._config && window._config.api;


// axios.defaults.baseURL = "http://192.168.1.2:8099";
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';

// http request 拦截器

axios.interceptors.request.use(
  config => {
    if (store.getters.token) {
      config.headers['token'] = store.getters.token
    }
    config.data = qs.stringify(config.data);
    // Indicator.open({
    //   text: '加载中...',
    //   spinnerType: 'fading-circle'
    // });
    console.log(123)

    return config;
  },
  error => {
    console.log(error)
    // Indicator.close();

    return Promise.reject(error);
  }
);
// http response 拦截器
axios.interceptors.response.use(
  response => {
    switch (response.data.code) {
      case 1000:
        //如果token过期则清空本地缓存
        window.localStorage.clear();
        store.dispatch(types.LOGIN_OUT).then(() => {
          utils.dialog.confirm({
            content: "登录过期，是否跳转到登陆页？",
            confirm: function() {
              router.push({
                name: 'login'
              });
            }
          });
        });

        break;
    };
    // Indicator.close();
    return response;
  },

  error => {
    if(typeof error=="undefined")
    {
      error = {code:'-1',message:'no network'}
    }
    else if(error.toString() && error.toString().indexOf('timeout')>0)
    {
      error = {code:'-2',message:'请求超时，请稍后再试'}
    }
    else if(error.toString()&&error.toString().indexOf('Network')>0)
    {
      error = {code:'-3',message:'访问错误!'}
    }
    else if(error.toString()&&error.toString().indexOf('500')>0)
    {
      error = {code:'-4',message:'服务器内容错误!'}
    }

    console.log(error);

    // Indicator.close();
    return Promise.rejects(error)
  }
)



export default axios;
