import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

/**
 * vuex 生命周期函数，页面一刷新数据就会变成初始状态
 */

export default new Vuex.Store({
  state: {
    /**
     * 默认地址的存储，刚进入应用或者页面书刷新的时候去服务器请求数据
     * 默认地址改变的时候，重新请求数据
     * 结算订单的时候，从vuex中取地址
     */
    num: 1
  },
  mutations: {
    add (state) {
      state.num ++
    },
    reduce (state) {
      state.num --
    }
  },
  actions: {

  }
})
