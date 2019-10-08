<template>
  <div class="nav-bar">
    <header>
      <van-row>
        <van-col class="col" span="3">
          <span @click="handleClick" class="iconfont icon-arrow">&#xe640;</span>
        </van-col>
        <van-col class="col" span="8" offset="5">{{ title }}</van-col>
        <van-col class="col" span="4" offset="4">
          <span class="iconfont icon-dot">&#xe64f;</span>
        </van-col>
      </van-row>
    </header>
  </div>
</template>

<script>
export default {
  name: 'navbar',
  props: {
    title: {
      type: String,
      default: '小商铺'
    }
  },
  methods: {
    handleClick () {
      this.$emit('onLeft')
    } 
  }
}
</script>

<style lang="scss" scoped>
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
      .icon-arrow{
        font-size: 18px;
      }
    }
  }
</style>
