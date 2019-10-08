<template>
  <div class="order">
    <nav-bar
      title="订单详情"
      @onLeft="goBack"
    />
    <!-- 已经生成订单之后显示 -->
    <div v-if="from === 'orderlist'" class="order-info">
      <div class="info-left">
        <p>
          <span>下单时间：</span>
          <span>{{ createdDate | formateDate }}</span>
        </p>
        <p>
          <span>订单编号：</span>
          <span>{{ serialNumber }}</span>
        </p>
      </div>
      <div class="info-right">待付款</div>
    </div>

    <!-- 地址信息，如果是从购物车跳转来，还要提供进入地址栏选择按钮 -->
    <div v-if="address.name" class="address-info">
      <div class="address-main">
        <div class="name-tel">
          <p>
            <span class="iconfont icon-common">&#xe61f;</span>
            <span>{{ address.name }}</span>
          </p>
          <p>
            <span class="iconfont icon-common">&#xe61d;</span>
            <span>{{ address.tel }}</span>
          </p>
        </div>
        <div class="address">{{ address.address }}</div>
      </div>
      <div @click="goAddress" class="iconfont icon-right">&#xe74b;</div>
    </div>
    <!-- 如果用户还没有创建过地址 -->
    <div @click="addAddress" v-else class="address-no">
      <span class="add">添加地址</span>
      <span class="iconfont icon-add">&#xe646;</span>
    </div>

    <!-- 订单商品信息 -->
    <ul class="products-list">
      <li class="list-item" v-for="item of products" :key="item.id">
        <div class="image">
          <img :src="`${publicPath}${item.image}`" />
        </div>
        <p class="item-info">
          <span>{{ item.name }}</span>
          <span>￥{{ item.price }}</span>
        </p>
        <p class="item-count">x{{ item.counts }}</p>
      </li>
    </ul>

    <div class="bottom">
      <div class="order-account">
        <span class="account-info">付款合计: </span>
        <span class="account-num">￥{{ account }}</span>
      </div>
      <input
        :class="[ products.length ? '' : 'disabled' ]"
        @click="goPay"
        class="go-pay"
        type="button"
        value="去付款"
      />
    </div>
  </div>
</template>

<script>
import NavBar from '../components/NavBar'
import { formateDate } from '../filter/filter'

import Shopcar from '../model/shopcar'
import Address from '../model/address'
import Order from '../model/order'
const shopcar = new Shopcar()
const address = new Address()
const order = new Order()

export default {
  name: 'order',
  data () {
    return {
      products: null,
      from: null,
      publicPath: process.env.BASE_URL,
      address: {},
      account: 0,
      serialNumber: null,
      createdDate: null,
      id: null
    }
  },
  components: {
    NavBar
  },
  filters: {
    formateDate: formateDate
  },
  methods: {
    // 获取默认地址
    getDefalutAddress () {
      address.getAddress(true)
        .then((res) => {
          if (res) {
            this.address = res
          }
        })
    },
    // 去地址页面选择地址
    goAddress () {
      this.$router.push({name: 'addresses', params: { from: 'order' }})
    },
    // 去添加地址路由添加地址
    addAddress () {
      this.$router.push({name: 'addaddress', params: { from: 'order' }})
    },
    goBack () {
      this.$router.go(-1)
    },
    goPay () {
      if (!this.address.name) {
        this.$toast('请添加地址！')
        return
      }
      if (!this.products.length) {
        this.$toast('暂无待付款商品')
        return
      }
      if (this.from === 'orderlist') {
        this.$dialog.confirm({
          title: '付款',
          message: '立即支付'
        }).then(() => {
          order.payment(this.id)
          .then(() => {
            this.$toast.success('付款成功')
            this.$router.push({ name: 'orderlist' })
          })
        }).catch(() => {
          this.$toast.fail('未支付')
          this.$router.push({ name: 'orderlist' })
        })
      } else {
        this.$dialog.confirm({
          title: '付款',
          message: '确认提交付款'
        }).then(() => {
          this.$toast('正在创建订单...')
          let data = {
            username: localStorage.getItem('username'),
            receiver: this.address.name,
            address: this.address.address,
            tel: this.address.tel,
            account: this.account,
            allCount: shopcar.calcProductCount(this.products),
            products: this.products
          }
          order.generateOrder(data)
            .then((res) => {
              this.id = res.id
              // 订单创建成功，清空购物车
              shopcar.removeOrderProduct()
              this.$toast(res.message)
              this.$toast('订单创建成功')
              this.$dialog.confirm({
                title: '付款',
                message: '立即支付'
              }).then(() => {
                order.payment(this.id)
                  .then(() => {
                    this.$toast.success('付款成功')
                    this.$router.push({ name: 'orderlist' })
                  })
              }).catch(() => {
                this.$toast.fail('未支付')
                this.$router.push({ name: 'orderlist' })
              })
            })
            .catch(() => {
              this.$toast('订单创建失败，请重试')
            })
        }).catch(() => {
          this.$toast('未创建订单')
        })
      }
    },
    /**
     * 根据从哪个页面来，对地址作不同的操作
     * 如果直接从购物车页面来，向服务器请求地址
     * 如果是从地址列表页面来，根据传过来的地址参数
     * 如果是从订单页面的待付款而来，根据订单的信息
     */
    changeAddress () {
      this.from = null || this.$route.params.from
      if (this.from === 'addresses') {
        this.address = this.$route.params.address
      } else if (this.from === 'orderlist') {
        const val = this.$route.params.val
        this.address = {
          name: val.receiver,
          tel: val.tel,
          address: val.address
        }
        this.serialNumber = val.serialNumber
        this.createdDate = val.created_at
        this.account = val.account
        this.products = JSON.parse(val.products)
        this.id = val.id
      } else {
        this.getDefalutAddress()
      }
    }
  },
  created () {
    this.products = shopcar.getDataFromLocal(true)
    this.account = shopcar.calcProductAccount(this.products)
    this.changeAddress()
  }
}
</script>

<style lang="scss" scoped>
@import '../assets/styles/common.scss';
  .order{
    background-color: #f8f8f8;
    font-size: 13px;
    color: #333;
    .order-info{
      @include flex();
      justify-content: space-between;
      box-sizing: border-box;
      padding: 10px 15px;
      width: 100%;
      height: 60px;
      background-color: #fff;
      border-bottom: 1px solid #ddd;
      font-size: 13px;
      color: #333;
      .info-left{
        p{
          height: 20px;
          line-height: 20px;
          span{
            &:nth-of-type(1){
              color: #ab956d;
            }
          }
        }
      }
      .info-right{}
    }
    .address-no{
      @include flex(column);
      justify-content: center;
      align-items: center;
      width: 100%;
      height: 70px;
      color: #666;
      background-color: #fff;
      .icon-add{
        margin-top: 4px;
      }
    }
    .address-info{
      @include flex();
      justify-content: space-between;
      box-sizing: border-box;
      padding: 10px 15px;
      width: 100%;
      height: 70px;
      font-size: 13px;
      color: #333;
      background-color: #fff;
      .address-main{
        width: 90%;
        .name-tel{
          @include flex();
          justify-content: space-between;
          height: 25px;
          line-height: 25px;
          p{
            min-width: 120px;
            .icon-common{
              color: #666;
              margin-right: 2px;
            }
          }
        }
        .address{
          height: 25px;
          line-height: 25px;
          color: #666;
        }
      }
      .icon-right{
        line-height: 50px;
      }
    }
    .products-list{
      width: 100%;
      box-sizing: border-box;
      margin-top: 8px;
      background-color: #fff;
      color: #333;
      .list-item{
        @include flex();
        width: 100%;
        height: 96px;
        box-sizing: border-box;
        justify-content: space-between;
        padding: 6px;
        padding-right: 20px;
        font-size: 13px;
        &:nth-of-type(n+2) {
          border-top: 1px solid #ddd;
        }
        .image{
          width: 80px;
          height: 80px;
          background-color: #f8f8f8;
          img{
            width: 100%;
            height: 100%;
          }
        }
        .item-info{
          @include flex(column);
          flex: 1;
          margin-left: 10px;
          span{
            &:nth-of-type(1){
              margin-top: 4px;
              color: #666;
            }
            &:nth-of-type(2){
              margin-top: 10px;
            }
          }
        }
        .item-count{
          height: 50px;
          margin-top: 4px;
        }
      }
    }
    .bottom{
      @include flex();
      position: fixed;
      left: 0;
      bottom: 0;
      width: 100%;
      height: 40px;
      border-top: 1px solid #ddd;
      .order-account{
        width: 300px;
        height: 40px;
        box-sizing: border-box;
        padding-left: 20px;
        line-height: 40px;
        .account-info{
          color: #ab956d;
        }
        .account-num{
        }
      }
      .go-pay{
        width: 74px;
        background-color: #ab956d;
        color: #fff;
        border: none;
        outline: none;
        transition: all .2s linear;
      }
      .disabled{
        opacity: .5;
      }
    }
  }
</style>
