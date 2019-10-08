<template>
  <div class="theme">
    <van-pull-refresh
      v-model="isRefreshing"
      success-text="刷新成功"
      @refresh="onRefresh"
    >
      <img class="theme-head" :src="[ image ? `${publicPath}${image}` : `${publicPath}theme-head@1.png`]" />
      <List :listArray="products" @clickProduct="goDetail"></List>
    </van-pull-refresh>
    <Loading v-show="isLoading" />
  </div>
</template>

<script>
import Loading from '../components/Loading'
import List from '../components/List'

import Theme from '../model/theme'
const topic = new Theme()

export default {
  name: 'theme',
  data () {
    return {
      isLoading: true,
      isRefreshing: false,
      theme: null,
      image: null,
      products: null,
      publicPath: process.env.BASE_URL
    }
  },
  components: {
    Loading,
    List
  },
  methods: {
    getProduct (theme) {
      topic.getProductByTheme(theme)
        .then((res) => {
          this.image = res.data.image[0].headImage
          this.products = res.data.products
          this.isLoading = false
          this.isRefreshing = false
        })
    },
    goDetail (id) {
      this.$router.push({name: 'detail', params: {id}})
    },
    onRefresh () {
      this.getProduct(this.theme)
    }
  },
  created () {
    this.theme = this.$route.params.theme
    this.getProduct(this.theme)
  }
}
</script>

<style lang="scss" scoped>
@import '../assets/styles/common.scss';
  .theme{
    background-color: #f9f9f9;
    .theme-head{
      width: 375px;
      height: 200px;
      margin-bottom: 8px;
    }
  }
</style>
