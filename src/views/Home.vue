<template>
  <div class="home">
    <!-- 头部 -->
    <header>
      <van-row>
        <van-col class="col" span="8" offset="8">小商铺</van-col>
        <van-col class="col" span="4" offset="4">
          <span @click="goLogin" class="iconfont icon-dot">&#xe64f;</span>
        </van-col>
      </van-row>
    </header>

    <van-pull-refresh
      v-model="isRefreshing"
      @refresh="onRefresh"
      success-text="刷新成功"
    >
       <!-- 轮播图 -->
      <section class="banner">
        <van-swipe class="banner-wrap" :loop="true">
          <van-swipe-item
            @click="goDetail(item.productId)"
            class="banner-item"
            v-for="(item,index) of banner"
            :key="index"
          >
          <!-- <img :src="`${publicPath}${item.image}`" /> -->
           <img v-lazy="`${publicPath}${item.image}`" />
          </van-swipe-item>
        </van-swipe>
      </section>

      <!-- 主题区域 -->
      <section class="topic">
        <h2 class="topic-head">精选主题</h2>
        <ul class="topic-list">
          <li
            @click="goTheme(item.theme)"
            v-for="item of theme"
            :key="item.id"
            class="list-item"
          >
            <img :src="`${publicPath}${item.image}`" />
          </li>
        </ul>
      </section>

      <!-- 新品 -->
      <section class="new-product">
        <h2 class="new-head">新品上市</h2>
        <List :listArray="newProduct" @clickProduct="goDetail"></List>
      </section>
    </van-pull-refresh>
    <Loading v-show="isLoading" />
    <Tab />
  </div>
</template>

<script>
import List from '../components/List'
import Tab from '../components/Tab'
import Loading from '../components/Loading'

import Home from '../model/home'
import Login from '../model/login'
const login = new Login()
const home = new Home()
export default {
  name: 'home',
  data () {
    return {
      publicPath: process.env.BASE_URL,
      banner: null,
      newProduct: null,
      theme: null,
      isLoading: true,
      isRefreshing: false
    }
  },
  components: {
    List,
    Tab,
    Loading
  },
  methods: {
    goLogin () {
      this.$router.push({name: 'login'})
    },
    getData () {
      home.getAll()
        .then((res) => {
          this.banner = res.data.banner
          this.newProduct = res.data.newProduct
          this.theme = res.data.theme
          this.isLoading = false
          this.isRefreshing = false
        })
    },
    getVerify () {
      login.verifyToken()
        .catch(() => {
          this.$router.push({name: 'login'})
        })
    },
    goDetail (id) {
      this.$router.push({name: 'detail', params: {id}})
    },
    goTheme (theme) {
      this.$router.push({ name: 'theme', params: { theme } })
    },
    onRefresh () {
      this.getData()
    }
  },
  created () {
    this.getVerify()
    this.getData()
  }
}
</script>

<style lang="scss" scoped>
@import '../assets/styles/common.scss';
  .home{
    margin-bottom: 50px;
    background: #f8f8f8;
    header{
      width: 100%;
      height: 40px;
      background: #ab956d;
      color: #fff;
      font-size: 16px;
      .col{
        height: 40px;
        text-align: center;
        line-height: 40px;
        .icon-dot{
          font-size: 24px;
        }
      }
    }
    .banner{
      height: 200px;
      .banner-wrap{
        width: 100%;
        height: 100%;
        .banner-item{
          width: 375px;
          height: 100%;
          img{
            width: 100%;
            height: 100%;
          }
        }
      }
    }
    .topic{
      .topic-head{
        width: 100%;
        height: 40px;
        line-height: 40px;
        text-align: center;
        margin: 0;
        color: #ab956d;
        font-size: 16px;
        font-weight: 600;
      }
      .topic-list{
        @include flex();
        width: 100%;
        height: 375px;
        .list-item{
          width: 186px;
          height: 186px;
          &:nth-of-type(2){
            margin-left: 3px;
          }
          &:nth-of-type(3){
            width: 375px;
            margin-top: 3px;
          }
          img{
            width: 100%;
            height: 100%;
          }
        }
      }
    }
    .new-product{
      .new-head{
        width: 100%;
        height: 40px;
        line-height: 40px;
        text-align: center;
        margin: 0;
        color: #ab956d;
        font-size: 16px;
        font-weight: 600;
      }
    }
  }
</style>
