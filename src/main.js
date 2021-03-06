// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
// import * as socket from './api/websocket'
import * as socket from './api/socket'
import ace from 'ace-builds'
import './assets/iconfont/iconfont.css'
import store from './store'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'
import axios from 'axios'
import VueAxios from 'vue-axios'
import element from './element'

Vue.prototype.socket = socket
Vue.use(element)
Vue.use(ace)
Vue.use(VueAwesomeSwiper)
Vue.use(VueAxios,axios);
Vue.config.productionTip = false



// 页面刷新时，重新赋值有没登录
// if (window.localStorage.getItem('isLogin')) {
//   store.commit('setIsLogin', window.localStorage.getItem('isLogin'));
// }
// 路由跳转验证，要写在实例创建之前才能防止直接修改URL可以跳转的问题
// 注册一个全局守卫，作用是在路由跳转前，对路由进行判断，防止未登录的用户跳转到其他需要登录的页面去
router.beforeEach((to, from, next) => {
  if(to.matched.some(r=>r.meta.requiresAuth)){
    if(localStorage.getItem('isLogin')){
      if(to.path=='/Login')
        next('/work'); 
      next();
    }
    else{
      next()
    }
  }
  else{
    next();
  }
  })


/* eslint-disable no-new */
 let vm = new Vue({
      el: '#app',
      router,
      store,
      components: { App },
      template: '<App/>',
    })
