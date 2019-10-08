<template>
  <div class="my">
    <!-- 顶部 -->
    <nav-bar
      title="我的"
      @onLeft="goBack"
    />

    <div class="user-info">
      <div class="user-avatar"></div>
      <div class="username">{{ username }}</div>
    </div>

    <div class="order" @click="goOrder">
      <div class="left">
        <span class="iconfont icon-order">&#xe60e;</span>
        <span class="order-all">我的订单</span>
      </div>
      <span class="iconfont icon-right">&#xe74b;</span>
    </div>

    <ul class="info">
      <li class="item" @click="goAddress">
        <div class="left">
          <span class="iconfont icon-common">&#xe60d;</span>
          <span class="item-name">我的地址</span>
        </div>
        <span class="iconfont icon-right">&#xe74b;</span>
      </li>
      <li class="item">
        <div class="left">
          <span class="iconfont icon-common">&#xe629;</span>
          <span class="item-name">关于</span>
        </div>
        <span class="iconfont icon-right">&#xe74b;</span>
      </li>
    </ul>

    <Tab />
  </div>
</template>

<script>
import Tab from '../components/Tab'
import NavBar from '../components/NavBar'

export default {
  name: 'my',
  data () {
    return {
      username: localStorage.getItem('username')
    }
  },
  components: {
    Tab,
    NavBar
  },
  methods: {
    goBack () {
      this.$router.go(-1)
    },
    goOrder () {
      this.$router.push({name: 'orderlist'})
    },
    goAddress () {
      this.$router.push({name: 'addresses'})
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../assets/styles/common.scss';
  .my{
    width: 100%;
    height: 100vh;
    background-color: #f8f8f8;
    .user-info{
      @include flex();
      align-items: center;
      box-sizing: border-box;
      justify-content: space-between;
      width: 100%;
      height: 60px;
      padding: 0px 10px;
      background-color: #fefefe;
      font-size: 14px;
      color: #333;
      border-bottom: 1px solid #ddd;
      .user-avatar{
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background-color: #ccc;
        img{
          width: 100%;
          height: 100%;
        }
      }
      .username{
        height: 20px;
        line-height: 20px;
      }
    }
    .order{
      @include flex();
      justify-content: space-between;
      align-items: center;
      box-sizing: border-box;
      padding: 0px 10px;
      width: 100%;
      height: 40px;
      line-height: 40px;
      background-color: #fefefe;
      font-size: 14px;
      color: #555;
      .icon-order{
        font-size: 18px;
        margin-right: 5px;
      }
      .icon-right{
        font-size: 18px;
      }
    }
    .info{
      width: 100%;
      height: 81px;
      margin-top: 14px;
      background-color: #fefefe;
      .item{
        @include flex();
        align-items: center;
        justify-content: space-between;
        box-sizing: border-box;
        position: relative;
        padding: 0px 10px;
        width: 100%;
        height: 40px;
        line-height: 40px;
        background-color: #fefefe;
        font-size: 14px;
        color: #555;
        .icon-common{
          font-size: 18px;
          margin-right: 5px;
        }
        .icon-right{
          font-size: 18px;
        }
      }
      .item:nth-of-type(1){
        &:after{
          position: absolute;
          display: block;
          content: "";
          width: 355px;
          height: 1px;
          background-color: #ccc;
          top: 40px;
          left: 10px;
        }
      }
    }
  }
</style>
