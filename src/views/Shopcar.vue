<template>
  <div class="shop-car">
    <!-- 头部 -->
    <nav-bar
      title="购物车"
      @onLeft="goBack"
    />
    
    <div v-show="products.length === 0" class="shopcar-no">您的购物车空空如也</div>
    <!-- 购物车商品 -->
    <ul class="shop-goods">
      <li v-for="item of products" class="goods-item" :key="item.productId">
        <div @click="changeItemSelected(item)" class="select">
          <span v-if="item.selected" class="iconfont icon-selected">&#xe645;</span>
          <span v-else class="circle"></span>
        </div>
        <div class="goods-detail">
          <div class="image">
            <img class="goods-image" :src="`${publicPath}${item.image}`" />
          </div>
          <div class="goods-info">
            <p class="goods-name">{{ item.name }}</p>
            <p class="add-reduce">
              <span @click="handleReduce(item)" class="iconfont">&#xe711;</span>
              <span class="goods-count">{{ item.counts }}</span>
              <span @click="handleAdd(item)" class="iconfont">&#xe646;</span>
            </p>
          </div>
          <div class="item-total">
            <span class="item-money">￥{{ item.price }}</span>
            <span @click="removeGoods(item.id)" class="iconfont">&#xe62e;</span>
          </div>
        </div>
      </li>
    </ul>

    <!-- 底栏结算 -->
    <div v-show="products.length > 0" :class="[selectedType === 0 ? 'disabled' : null]" class="account">
      <div
        @click="toggleAllSeleted"
        class="circle"
      >
        <span v-show="allSelected" class="iconfont icon-selected">&#xe62a;</span>
      </div>
      <span class="all-select">全选({{ selectedCount }})</span>
      <span @click="goOrder" class="go-buy">下单</span>
      <span class="line"></span>
      <span class="all-money">￥{{ account }}</span>
      <span @click="goOrder" class="iconfont icon-go">&#xe76a;</span>
    </div>
    <Tab />
  </div>
</template>

<script>
import Tab from '../components/Tab'
import NavBar from '../components/NavBar'
import { Dialog, Toast } from 'vant'

import Shopcar from '../model/shopcar'
const shopcar = new Shopcar()

export default {
  name: 'shopcar',
  data () {
    return {
      account: 0,
      selectedType: 0,
      selectedCount: 0,
      publicPath: process.env.BASE_URL,
      products: null
    }
  },
  components: {
    Tab,
    NavBar
  },
  computed: {
    allSelected () {
      if (this.products.length === 0) {
        return false
      } else {
        return this.selectedType === this.products.length
      }
    }
  },
  methods: {
    goBack () {
      this.$router.go(-1)
    },
    changeItemSelected (item) {
      shopcar.changeGoodsSelected(item.id)
      item.selected = !item.selected
      this.updateAccount()
    },
    getAllGoods () {
      this.products = shopcar.getDataFromLocal()
    },
    // 单个商品数量减一
    handleReduce (item) {
      if (item.counts === 1) {
        this.removeGoods(item.id)
      } else {
        item.counts --
        shopcar.addCount(item, -1)
        this.updateAccount()
      }
    },
    // 单个商品数量加一
    handleAdd (item) {
      item.counts ++
      shopcar.addCount(item, 1)
      this.updateAccount()
    },
    // 移除某一商品
    removeGoods (id) {
      // shopcar.removeGoods(id)
      Dialog.confirm({
        title: '提示框',
        message: '是否确认从购物车中移除该商品？'
      }).then(() => {
        shopcar.removeGoods(id)
        Toast('成功移除')
        this.getAllGoods()
        this.updateAccount()
      }).catch(() => {
        Toast('取消移除')
      })
    },
    // 更新数据计算
    updateAccount () {
      this.calcAllGoods(this.products)
    },
    // 全选 / 取消全选
    toggleAllSeleted () {
      if (this.products.length === 0) {
        return
      }
      shopcar.toggleAllSeleted(this.allSelected)
      this.getAllGoods()
      this.updateAccount()
    },
    /**
     * 选中商品，去下单
     */
    goOrder () {
      if (this.account === 0) {
        return
      }
      this.$router.push({name: 'order', params: {from: 'shopcar'}})
    },
    // 定义计算商品总价格的函数
    calcAllGoods (data) {
      // 商品价格计算，排除未选中的
      let account = 0
      // 定义选中的商品类型，判断是否为全部选中状态
      // 计算选择的数量
      let selectedCount = 0
      let selectedType = 0
      // 浮点数js计算会有误差，先让他乘一百再计算，最后除以一百
      let mutiply = 100
      data.forEach(function (ele) {
        if (ele.selected) {
          selectedType += 1
          selectedCount += ele.counts
          account += (ele.price * mutiply) * ele.counts
        }
      })
      account = account / 100
      this.account = account
      this.selectedCount = selectedCount
      this.selectedType = selectedType
    }
  },
  created () {
    this.getAllGoods()
    this.updateAccount()
  }
}
</script>

<style lang="scss" scoped>
@import '../assets/styles/common.scss';
  .shop-car{
    .shopcar-no{
      width: 100%;
      height: 30px;
      line-height: 30px;
      font-size: 12px;
      color: #888;
      text-align: center;
    }
    .shop-goods{
      align-items: center;
      box-sizing: border-box;
      width: 375px;
      .goods-item{
        @include flex();
        position: relative;
        width: 355px;
        height: 90px;
        padding: 10px;
        align-items: center;
        &:after{
          @include after(335px, 1px);
          top: 110px;
          left: 20px;
          transform: scaleY(0.9);
        }
        .select{
          @include flex();
          justify-content: center;
          align-items: center;
          position: relative;
          width: 40px;
          height: 90px;
          .circle{
            display: inline-block;
            box-sizing: border-box;
            width: 22px;
            height: 22px;
            border-radius: 50%;
            border: 1px solid #ab956d;
          }
          .icon-selected{
            font-size: 25px;
            color: #f50;
          }
        }
        .goods-detail{
          @include flex();
          .image{
            width: 90px;
            height: 90px;
            background: #f5f5f5;
            .goods-image{
              width: 100%;
              height: 100%;
            }
          }
          .goods-info{
            @include flex(column);
            justify-content: space-between;
            width: 120px;
            height: 90px;
            box-sizing: border-box;
            padding: 6px 0;
            margin-left: 8px;
            font-size: 14px;
            color: #333;
            .goods-name{
              width: 120px;
              height: 20px;
            }
            .add-reduce{
              @include flex();
              width: 120px;
              height: 20px;
              line-height: 20px;
              .goods-count{
                margin: 0px 20px;
                width: 20px;
              }
            }
          }
        }
        .item-total{
          @include flex(column);
          justify-content: space-between;
          box-sizing: border-box;
          width: 40px;
          height: 90px;
          padding-top: 6px;
          padding-bottom: 6px;
          margin-left: 20px;
          color: #333;
          font-size: 14px;
          .item-money{}
        }
      }
    }
    .account{
      @include flex();
      align-items: center;
      box-sizing: border-box;
      position: fixed;
      left: 0;
      bottom: 50px;
      width: 375px;
      height: 50px;
      padding-left: 10px;
      padding-right: 10px;
      background-color: #ab956d;
      color: #fff;
      font-size: 14px;
      transition: all .2s linear;
      .circle{
        @include flex();
        align-items: center;
        justify-content: center;
        width: 22px;
        height: 22px;
        border-radius: 50%;
        box-sizing: border-box;
        border: 1px solid #fff;
        .icon-selected{
          color: #fff;
          font-size: 18px;
        }
      }
      .all-select{
        margin-left: 20px;
        width: 60px;
      }
      .go-buy{
        margin-left: 80px;
      }
      .line{
        width: 1px;
        height: 20px;
        background-color: #fff;
        margin-left: 40px;
        margin-right: 15px;
      }
      .all-money{
        margin-right: 20px;
        width: 30px;
      }
      .icon-go{
        font-size: 20px;
      }
    }
    .disabled{
      color: #dddddd;
    }
  }
</style>
