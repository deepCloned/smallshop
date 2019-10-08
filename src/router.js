import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/detail/:id',
      name: 'detail',
      component: () => import(/* webpackChunkName: "detail" */ './views/Detail.vue')
    },
    {
      path: '/category',
      name: 'category',
      component: () => import(/* webpackChunkName: "category" */ './views/Category.vue')
    },
    {
      path: '/shopcar',
      name: 'shopcar',
      component: () => import(/* webpackChunkName: "shopcar" */ './views/Shopcar.vue')
    },
    {
      path: '/my',
      name: 'my',
      component: () => import(/* webpackChunkName: "my" */ './views/My.vue')
    },
    {
      path: '/theme/:theme',
      name: 'theme',
      component: () => import(/* webpackChunkName: "theme" */ './views/Theme.vue')
    },
    {
      path: '/addresses',
      name: 'addresses',
      component: () => import (/* webpackChunkName: "address" */ './views/Addresses.vue')
    },
    {
      path: '/order',
      name: 'order',
      component: () => import (/* webpackChunkName: "order" */ './views/Order.vue')
    },
    {
      path: '/addaddress',
      name: 'addaddress',
      component: () => import (/* webpackChunkName: "addaddress"*/ './views/AddAddress.vue')
    },
    {
      path: '/change',
      name: 'changeaddress',
      component: () => import (/* webpackChunkName: "changeaddress" */ './views/ChangeAddress.vue')
    },
    {
      path: '/register',
      name: 'register',
      component: () => import (/* webpackChunkName: "register" */ './views/Register.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import (/* webpackChunkName: "login" */ './views/Login.vue')
    },
    {
      path: '/orderlist',
      name: 'orderlist',
      component: () => import (/* webpackChunkName: "OrderList" */ './views/OrderList.vue')
    }
  ],
  scrollBehavior () {
    return { x: 0, y: 0 }
  }
})
