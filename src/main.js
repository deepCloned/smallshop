import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import './assets/styles/reset.scss'
import './assets/styles/iconfont.scss'

import {
  Button,
  Row,
  Col,
  Toast,
  Swipe,
  SwipeItem,
  Lazyload,
  Popup,
  Picker,
  Tab,
  Tabs,
  AddressEdit,
  AddressList,
  NavBar,
  Dialog,
  Field,
  Cell,
  CellGroup,
  PullRefresh
} from 'vant'

Vue.use(Button)
    .use(Row).use(Col)
    .use(Toast).use(Dialog)
    .use(Swipe).use(SwipeItem)
    .use(Lazyload)
    .use(Popup).use(Picker)
    .use(Tab).use(Tabs)
    .use(AddressList).use(AddressEdit)
    .use(NavBar)
    .use(Field)
    .use(Cell).use(CellGroup)
    .use(PullRefresh)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
