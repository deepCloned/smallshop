<template>
  <ul id="nav">
    <router-link to="/" tag="li" class="nav-item">
      <span class="iconfont icon-common">&#xe6a9;</span>
      <span class="title">首页</span>
    </router-link>
    <router-link to="/category" tag="li" class="nav-item">
      <span class="iconfont icon-common">&#xe63b;</span>
      <span class="title">分类</span>
    </router-link>
    <router-link to="/shopcar" tag="li" class="nav-item">
      <span class="iconfont icon-common">&#xe605;</span>
      <span class="title">购物车</span>
    </router-link>
    <router-link to="/my" tag="li" class="nav-item">
      <span class="iconfont icon-common">&#xe61f;</span>
      <span class="title">我的</span>
    </router-link>
  </ul>
</template>

<script>
export default {
  name: 'tab'
}
</script>

<style lang="scss" scoped>
@import '../assets/styles/common.scss';
  #nav{
    @include flex();
    justify-content: center;
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    height: 50px;
    background: #f5f5f5;
    border-top: 1px solid #fff;
    color: rgb(153, 153, 153);
    .nav-item{
      width: 25%;
      height: 50px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      .title{
        font-size: 12px;
        margin-top: 2px;
      }
      .icon-common{
        font-size: 22px;
      }
    }
  }
</style>