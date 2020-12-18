import Vue from 'vue'
import App from './App'
import router from './router'
import Axios from "axios"
import api from "./api"
import store from '../static/store/index'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import host from "./api/httpurl";

import MetaInfo from 'vue-meta-info'
Vue.use(MetaInfo)

// import less from 'less';
// import './style/iconfont.css';
import './assets/font/iconfont.css'
Vue.use(ElementUI);

import _ from 'lodash'
Vue.prototype._ = _

import echarts from 'echarts'
Vue.prototype.$echarts = echarts

import {
  inHTMLData,
  uriInUnQuotedAttr
} from "xss-filters-es6";
const xssFilters = require('xss-filters');
Vue.prototype.$inHTMLData = inHTMLData;

// Vue.use(less);
Vue.prototype.JuheHOST = host
// Vue.prototype.JuheHOST = "http://dev.6789zbz.com"
Vue.prototype.$api = api;
Vue.prototype.$axios = Axios;
Vue.config.productionTip = false

import * as filter from './filter/index'
Object.keys(filter).forEach(keys => {
  Vue.filter(keys, filter[keys])
})



Vue.directive('preventReClick', {
  inserted(el, binding) {
    el.addEventListener('click', () => {
      if (!el.disabled) {
        el.disabled = true
        setTimeout(() => {
          el.disabled = false
        }, binding.value || 3000)
      }
    })
  }
})

// import * as directive from "./page/storage.js/index"
// Object.keys (directive).forEach(keys=>{
//   Vue.prototype.directive(keys,directive[keys])
// })
// 全局前置守卫
router.beforeEach((to, from, next) => {
  if (to.matched.some((item) => item.meta.requireAuth)) {
    // let token = true
    let token = localStorage.getItem("token");
    // console.log(token);
    if (token) {
      next();
    } else {
      Vue.prototype.$message({
        type: 'warning',
        message: "请先登录再进行操作"
      })
      // next({
      //     path: "/"
      // })
    }
  } else {
    // 不需要登陆
    next();
  }
})


new Vue({
  el: '#app',
  router,
  store,
  components: {
    App
  },
  template: '<App/>',
  mounted() {
    document.dispatchEvent(new Event('render-event'))
  }
})
