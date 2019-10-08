<template>
  <section class="order-list">
    <nav-bar
      title="订单列表"
      @onLeft="goBack"
    />
    <dl class="list-wrap">
      <dt class="list-title">我的订单</dt>
      <dd v-for="item of orderList" class="list-item" :key="item.id">
        <div class="serial-number">订单编号：{{ item.serialNumber }}</div>
        <div class="order-main">
          <div class="cover-image">
            <img :src="`${publicPath}${item.coverImage}`" alt="订单缩略图" />
          </div>
          <div class="title-count">
            <p class="title">{{ item.title }}</p>
            <p class="count">{{ item.allCount }}件商品</p>
          </div>
          <div v-show="item.paymentStatus === false" class="is-pay">待付款</div>
        </div>
        <div class="account">
          <span class="account-pay">实付：￥{{ item.account }}</span>
          <span
            @click="goPayment(item)"
            v-if="item.paymentStatus === false"
            class="pending-pay"
          >
            去付款
          </span>
          <span v-else class="paid">已付款</span>
        </div>
      </dd>
    </dl>
  </section>
</template>

<script>
import NavBar from '../components/NavBar'

import Order from '../model/order'
const order = new Order()

export default {
  name: 'orderlist',
  data () {
    return {
      orderList: [],
      publicPath: process.env.BASE_URL
    }
  },
  components: {
    NavBar
  },
  methods: {
    getOrder () {
      const username = localStorage.getItem('username')
      order.getOrderList(username)
        .then((res) => {
          this.orderList = res.orderList
        })
    },
    // 未付款的订单去订单页面付款
    goPayment (val) {
      this.$router.push({ name: 'order', params: { val, from: 'orderlist' }})
    },
    goBack () {
      this.$router.push({ name: 'my' })
    }
  },
  created () {
    this.getOrder()
  }
}
</script>

<style lang="scss" scoped>
@import '../assets/styles/common.scss';
  .order-list{
    width: 100%;
    background-color: #f8f8f8;
    .list-wrap{
      width: 100%;
      box-sizing: border-box;
      padding: 0px 20px;
      font-size: 14px;
      color: #555;
      background-color: #fff;
      .list-title{
        width: 100%;
        height: 30px;
        border-bottom: 1px solid #eee;
        text-align: center;
        line-height: 30px;
      }
      .list-item{
        position: relative;
        margin-bottom: 8px;
        .serial-number{
          height: 30px;
          line-height: 30px;
          border-bottom: 1px solid #eee;
        }
        .order-main{
          @include flex();
          width: 100%;
          height: 76px;
          justify-content: space-between;
          align-items: center;
          border-bottom: 1px solid #eee;
          .cover-image{
            width: 60px;
            height: 60px;
            background-color: #ddd;
            img{
              width: 100%;
              height: 100%;
            }
          }
          .title-count{
            flex: 1;
            font-size: 13px;
            margin-left: 10px;
            .title{}
            .count{
              margin-top: 10px;
            }
          }
          .is-pay{
            font-size: 13px;
            color: #f50;
          }
        }
        .account{
          @include flex();
          justify-content: space-between;
          align-items: center;
          height: 40px;
          .account-pay{
            color: #333;
          }
          .pending-pay{
            width: 60px;
            height: 30px;
            text-align: center;
            line-height: 30px;
            color: #fff;
            background-color: #ff0000;
            border-radius: 2px;
          }
          .paid{}
        }
      }
      .list-item:nth-of-type(n+2){
        &::after{
          @include after(375px, 8px, #f8f8f8);
          top: -8px;
          left: -20px;
        }
      }
    }
  }
</style>
