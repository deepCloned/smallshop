<template>
  <ul class="list">
    <li
      @click="handleClick(item.productId)"
      class="list-item"
      v-for="item of listArray"
      :key="item.productId"
    >
      <img :src="[ item.image ? `${publicPath}${item.image}` : `${publicPath}product-rice@1.png`]" />
      <div class="product-info">
        <p class="name">{{ item.title }}</p>
        <p class="price">￥{{ item.price }}</p>
      </div>
    </li>
  </ul>
</template>

<script>
export default {
  name: 'list',
  data () {
    return {
      publicPath: process.env.BASE_URL
    }
  },
  props: {
    listArray: {
      type: Array,
      default () {
        return []
      }
    }
  },
  methods: {
    handleClick (id) {
      this.$emit('clickProduct', id)
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../assets/styles/common.scss';
  .list{
    @include flex();
    flex-wrap: wrap;
    .list-item{
      width: 175px;
      height: 190px;
      background-color: #f5f5f5;
      @include flex(column);
      justify-content: center;
      align-items: center;
      margin-left: 8px;
      &:nth-of-type(n+3) {
        margin-top: 8px;
      }
      >img{
        width: 138px;
        height: 138px;
      }
      .product-info{
        width: 138px;
        height: 40px;
        color: #333;
        p{
          line-height: 20px;
          text-align: center;
        }
        .name{
          font-size: 14px;
        }
        .price{
          font-size: 12px;
        }
      }
    }
  }

</style>