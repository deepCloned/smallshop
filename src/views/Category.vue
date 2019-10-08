<template>
  <div class="category">
    <ul class="left">
      <li
        @click="changeIndex(index)"
        v-for="(item, index) of category"
        class="left-item"
        :class="[ index === active ? activeClass : '' ]"
        :key="item.id"
      >
        {{ item }}
      </li>
    </ul>
    <div class="right">
      <ul class="list" :style="{top: -(active * 100) + 'vh'}">
        <li
          v-for="item of categoryList"
          class="list-item"
          :key="item.id"
        >
          <img class="category-image" :src="`${publicPath}${item.image}`" />
          <h4 class="category-title">{{ item.name }}</h4>
          <ul class="goods-list">
            <li
              @click="goDetail(good.productId)"
              v-for="good of item.products"
              class="goods-item"
              :key="good.id"
            >
              <img class="goods-image" :src="`${publicPath}${good.image}`" />
              <p class="goods-info">{{ good.title }}</p>
            </li>
          </ul>
        </li>
      </ul>
    </div>
    <Loading v-show="isLoading" />
    <Tab />
  </div>
</template>

<script>
import Tab from '../components/Tab'
import Loading from '../components/Loading'

import Category from '../model/category'
const category = new Category()
export default {
  name: 'category',
  components: {
    Tab,
    Loading
  },
  data () {
    return {
      category: ['蔬菜', '水果', '淡饭', '粗茶', '点心', '炒货'],
      active: 0,
      activeClass: 'active',
      categoryList: null,
      publicPath: process.env.BASE_URL,
      isLoading: true
    }
  },
  methods: {
    getCategory () {
      category.getCategoryList()
        .then((res) => {
          this.isLoading = false
          this.categoryList = res.data
        })
    },
    changeIndex (index) {
      this.active = index
    },
    goDetail (id) {
      this.$router.push({name: 'detail', params: {id}})
    }
  },
  created () {
    this.changeIndex(0)
    this.getCategory()
  }
}
</script>

<style lang="scss" scoped>
@import '../assets/styles/common.scss';
  .category{
    @include flex();
    background-color: #f8f8f8;
    .left{
      box-sizing: border-box;
      width: 75px;
      height: 100vh;
      border-right: 1px solid #eee;
      .left-item{
        width: 75px;
        height: 45px;
        line-height: 45px;
        color: #333;
        text-align: center;
        box-sizing: border-box;
      }
      .active{
        color: #ab956d;
        position: relative;
        &:after{
          display: block;
          content: "";
          position: absolute;
          width: 2px;
          height: 100%;
          background-color: #ab956d;
          bottom: 0;
          left: 0;
        }
      }
    }
    .right{
      position: relative;
      width: 300px;
      height: 100vh;
      overflow: hidden;
      .list{
        position: absolute;
        left: 0;
        width: 100%;
        height: 100vh;
        transition: all .8s ease;
        .list-item{
          box-sizing: border-box;
          width: 300px;
          height: 100vh;
          padding: 20px;
          .category-image{
            width: 260px;
            height: 100px;
          }
          .category-title{
            position: relative;
            width: 260px;
            height: 30px;
            line-height: 30px;
            text-align: center;
            font-size: 12px;
            color: #ab956d;
            &:before{
              position: absolute;
              content: "";
              display: block;
              top: 15px;
              left: 60px;
              width: 36px;
              height: 1px;
              background-color: #ab956d;
            }
            &:after{
              position: absolute;
              content: "";
              display: block;
              top: 15px;
              right: 60px;
              width: 36px;
              height: 1px;
              background-color: #ab956d;
            }
          }
          .goods-list{
            @include flex();
            flex-wrap: wrap;
            .goods-item{
              width: 78px;
              height: 94px;
              margin-bottom: 12px;
              &:not(:nth-of-type(3n)) {
                margin-right: 12px;
              }
              .goods-image{
                width: 78px;
                height: 78px;
              }
              .goods-info{
                width: 78px;
                height: 16px;
                line-height: 16px;
                text-align: center;
                font-size: 12px;
                color: #333;
              }
            }
          }
        }
      }
    }
  }
</style>
