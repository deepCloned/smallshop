<template>
  <div class="detail">
    <van-pull-refresh
      v-model="isRefreshing"
      @refresh="onRefresh"
      success-text="刷新成功"
    >
      <div class="cover-image">
        <img :src="[product.image ? `${publicPath}${product.image}` : `${publicPath}product-rice@1.png`]" />
        <router-link tag="div" to="/shopcar" class="shopcar">
          <span class="iconfont icon">&#xe641;</span>
          <span v-show="count>0" class="all-count">{{ count }}</span>
        </router-link>
      </div>

      <!-- 加入购物车区域 -->
      <div class="add">
        <div class="add-product">
          <div class="count">
            <span class="title">数量</span>
            <span class="num">{{ value }}</span>
            <span @click="changePicker" class="iconfont">&#xe65d;</span>
            <van-popup v-model="showPicker" position="bottom">
              <van-picker
                :title="title" 
                show-toolbar
                :columns="columns"
                @cancel="showPicker = false"
                @confirm="onConfirm"
              />
            </van-popup>
          </div>
          <div :class="[isNotEmpty ? '' : 'disabled']" @click="addGoods" class="add-shopcar">
            <span class="add-title">加入购物车</span>
            <span class="iconfont icon-car">&#xe641;</span>
          </div>
        </div>
      </div>

      <!-- 商品信息栏 -->
      <div class="goods-info">
        <p v-if="isNotEmpty" class="in-stock">有货</p>
        <p v-else class="in-stock">无货</p>
        <p class="name">{{ product.title }}</p>
        <p class="price">￥ {{ product.price }}</p>
      </div>

      <!-- 商品详细信息 -->
      <van-tabs class="goods-detail" v-model="active" animated>
        <van-tab title="商品详情">
          <div class="content">商品详情</div>
        </van-tab>
        <van-tab title="产品参数">
          <div class="content">产品参数</div>
        </van-tab>
        <van-tab title="售后保障">
          <div class="content">七天无理由退货</div>
        </van-tab>
      </van-tabs>
    </van-pull-refresh>

    <Loading v-show="isLoading" />
  </div>
</template>

<script>
import Loading from '../components/Loading'

import Detail from '../model/detail'
import Shopcar from '../model/shopcar'
const detail = new Detail()
const shopcar = new Shopcar()

export default {
  name: 'detail',
  data () {
    return {
      publicPath: process.env.BASE_URL,
      product: {},
      columns: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      showPicker: false,
      value: 1,
      count: 0,
      active: 1,
      title: '请选择数量',
      isLoading: true,
      isRefreshing: false
    }
  },
  components: {
    Loading
  },
  computed: {
    isNotEmpty () {
      return this.product.amount > 0
    }
  },
  methods: {
    getDetail (id) {
      detail.getDetailById(id)
        .then((res) => {
          this.isLoading = false
          this.product = res.data
          this.isRefreshing = false
        })
    },
    onConfirm(value) {
      this.value = value;
      this.showPicker = false;
    },
    changePicker () {
      this.showPicker = true
    },
    // 加入购物车
    addGoods () {
      let goods = {
        id: this.product.id,
        price: this.product.price,
        image: this.product.image,
        name: this.product.title
      }
      /**
       * 动态添加购物车
       * 如果无货，提示不能添加
       */
      if (!this.isNotEmpty) {
        this.$toast('该商品暂时无货')
        return
      }
      this.count += this.value
      shopcar.addCount(goods, this.value)
      
    },
    // 获取购物车总数量
    getAllCount () {
      this.count = shopcar.getCount()
    },
    onRefresh () {
      this.getDetail(this.$route.params.id)
      this.getAllCount()
    }
  },
  created () {
    this.getDetail(this.$route.params.id)
    this.getAllCount()
  }
}
</script>

<style lang="scss" scoped>
@import '../assets/styles/common.scss';
  .detail{
    background-color: #f8f8f8;
    .cover-image{
      position: relative;
      width: 375px;
      height: 300px;
      background-color: #fff;
      img{
        width: 300px;
        height: 300px;
        margin-left: 37px;
      }
      .shopcar{
        position: absolute;
        top: 50px;
        right: 20px;
        .icon{
          font-size: 40px;
          color: #666;
        }
        .all-count{
          position: absolute;
          display: inline-block;
          width: 16px;
          height: 16px;
          border-radius: 50%;
          text-align: center;
          line-height: 16px;
          background-color: #ab956d;
          font-size: 11px;
          color: #fff;
          top: 8px;
          left: -4px;
        }
      }
    }
    .add{
      width: 100%;
      height: 80px;
      background-color: #fff;
      overflow: hidden;
      .add-product{
        @include flex();
        width: 345px;
        height: 50px;
        margin: 15px;
        box-sizing: border-box;
        background-color: #ab956d;
        border-radius: 25px;
        font-size: 12px;
        color: #fff;
        .count{
          @include flex();
          align-items: center;
          justify-content: center;
          position: relative;
          width: 140px;
          height: 50px;
          margin-left: 30px;
          .num{
            margin: 0px 20px;
          }
          &::after{
            position: absolute;
            display: block;
            content: "";
            width: 1px;
            height: 20px;
            top: 15px;
            right: 0px;
            background-color: #fff;
          }
        }
        .add-shopcar{
          @include flex();
          align-items: center;
          justify-content: center;
          width: 140px;
          height: 50px;
          transition: all .2s linear;
          .add-title{
            margin-right: 10px;
          }
          .icon-car{
            font-size: 30px;
          }
        }
        .disabled{
          color: #ddd;
        }
      }
    }
    .goods-info{
      @include flex(column);
      align-items: center;
      width: 375px;
      height: 90px;
      padding: 8px 0px;
      background-color: #fff;
      color: #333;
      .in-stock{
        font-size: 12px;
        color: #666;
      }
      .name{
        font-size: 20px;
        margin-top: 10px;
      }
      .price{
        margin-top: 10px;
        font-size: 14px;
      }
    }
    .goods-detail{
      width: 100%;
      height: 200px;
      background-color: #fff;
      margin-top: 10px;
      .content{
        margin-top: 20px;
        width: 100%;
        text-align: cetner;
        font-size: 12px;
        text-align: center;
        line-height: 20px;
        color: #666;
      }
    }
  }
</style>

<style>
  .van-tabs__line{
    background-color: #ab956d;
  }
</style>
