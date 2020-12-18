/**
 * axios封装
 * 请求拦截、响应拦截、错误统一处理
 */

import axios from "axios"
import router from "../router"
import initStore from "../../static/store"
import qs from "querystring"
/**
 * 跳转登录页
 * 携带当前页面路由，以期在登录页面完成登录后返回当前页面
 */

const toLogin = () => {
    router.replace({
        path: '/login'
    })
}
const to500 = () => {
    // router.replace({
    //     path: '/500'
    // })
}
const to401 = () => {
    router.replace({
        path: '/401'
    })
}

/**
 * 请求失败后的错误统一处理
 * @param {Number} status 请求失败的状态码
 */

const errorHandler = (status, other) => {
    //状态码判断
    switch (status) {
        case 401:
            //跳转登录
            to401();
            break;
        case 403:
            /**
             * 清除掉token的存储
             *    1.本地，cookie
             *    2.vuex，remove
             */

            localStorage.removeItem("token");
            // store.dispatch("setTokenAction", null);
            setTimeout(() => {
                toLogin();
            }, 2000);
            break;
        case 404:
            console.log("请求的资源不存在");
            break;
        case 500:
            setTimeout(() => {
                // to500();
            }, 2000);
            break;
        default:
            console.log(other);
            break;
    }
}
//其他请求携带token
axios.defaults.headers.common['token'] = initStore.state.token;
axios.interceptors.request.use(
    config => {
            config.headers.client = 'web';
        if (initStore.state.token) {  // 判断是否存在token，如果存在的话，则每个http header都加上token
            config.headers.token = initStore.state.token;
        }
        return config;
    },
    err => {
        return Promise.reject(err);
    }
)
axios.interceptors.response.use(res => {
    // 对响应数据做些什么
    // console.log(res);
    if(res.status == 200){
        if(res.data.code == -1){
            //清除token
            localStorage.setItem('nick_name','');
            localStorage.setItem('user_name','');
            localStorage.setItem('user_pic','');
            localStorage.setItem("token",'');
            initStore.commit("token", ""); 
        }
    }
    return res
  }, err => {
    // 对响应错误做些什么
    // console.log('err', err.response)
    return Promise.resolve(err.response) // 可在组件内获取到服务器返回信息
  })
//创建axios实例

var instance = axios.create({ timeout: 2*60*1000 });
instance.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
instance.defaults.headers.post['enctype'] = 'multipart/form-data';
// instance.defaults.headers.common['Authorization'] = initStore.state.token;// token在vuex


instance.defaults.headers.token = initStore.state.token;// token在vuex

instance.interceptors.request.use(function(config) {
    // if (config.method == 'post') {
    //     config.data = qs.stringify(config.data);
    // }
    if (config.method == 'post' || config.method == 'put') {
        config.data = qs.stringify(config.data);
    }
    // console.log(initStore.state.token);
    config.headers.client = 'web';
    config.headers.token = initStore.state.token;
    const options = {
        headers:{
           ' Cache-Control' : "no-cache"
        }
    }
    // const token = store.state.token;
    // if(token){
    //     config.headers.Authorization = token;
    // }
    const client = axios.create(options)
    return config;
}, function(error) {
    return Promise.reject(error);
});
//响应拦截
instance.interceptors.response.use(
    // 请求成功
    
    // res => res.status === 200 ? Promise.resolve(res) : Promise.reject(res),
    res => {
        if(res.status === 200){
            // console.log(res)
            // console.log(initStore.state);
            if(res.data.code == -1){
                //清除token
                // console.log(res)
                localStorage.setItem("token",'');
                localStorage.setItem('nick_name','')
                localStorage.setItem('user_name','')
                localStorage.setItem('user_pic','')
                initStore.commit("token", "");
                // initStore.state.token = ""
                // console.log(initStore.state.token);            
            }
            return Promise.resolve(res);
        }else{
            return Promise.reject(res);
        }
        
    },
    // 请求失败
    error => {
        console.log(error);
        const { response } = error;
        if (response) {
            // 请求已发出，但是不在2xx的范围
            errorHandler(response.status, response.data.message);
            return Promise.reject(response);
        } else {
            // 处理断网的情况
            setTimeout(() => {
                to500();
            }, 2000);
        }
    }
);


export default instance