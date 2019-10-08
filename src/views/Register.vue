<template>
  <section class="register">
    <div class="logo">
      <div class="logo-img">
        <img src="../assets/logo.png" alt="logo" />
      </div>
      <p class="title">小商铺</p>
    </div>
    <div class="register-box">
      <van-cell-group>
        <van-field
          label="用户名"
          v-model="username"
          placeholder="请输入用户名"
          required
          :error-message="usernameError"
        />
        <van-field
          type="password"
          label="密码"
          v-model="password"
          placeholder="请输入密码"
          required
          :error-message="passwordError"
        />
      </van-cell-group>
      <van-button
        @click="handleSubmit"
        :loading="loading" 
        class="submit"
        type="primary"
        size="large"
        loading-text="注册中..."
      >
        注册
      </van-button>
      <router-link class="go-login" to="/login" tag="div">已有账号？立即登录</router-link>
    </div>
  </section>
</template>

<script>
import { Toast } from 'vant'

import Register from '../model/register'
import Validator from '../model/validator'
const register = new Register()
const validator = new Validator()

export default {
  name: 'register',
  data () {
    return {
      username: '',
      password: '',
      loading: false,
      usernameError: '',
      passwordError: '',
      canSubmit: false
    }
  },
  methods: {
    // 提交注册请求
    handleSubmit () {
      // 发送请求之前验证输入
      this.validate()
      if (!this.canSubmit) {
        return
      }
      this.loading = true
      register.getRegister(this.username, this.password)
        .then((res) => {
          this.loading = false
          Toast(res.message)
          this.$router.push({ name: 'login' })
        })
        .catch(() => {
          this.loading = false
        })
    },
    // 验证输入字符是否合法
    validate () {
      this.usernameError = validator.validateUsername(this.username)
      this.passwordError = validator.validatePassword(this.password)
      if (!this.usernameError && !this.passwordError) {
        this.canSubmit = true
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../assets/styles/common.scss';
  .register{
    .logo{
      @include flex(column);
      justify-content: center;
      align-items: center;
      width: 100%;
      height: 200px;
      position: relative;
      &:after{
        @include after(100%);
        top: 200px;
        left: 0;
      }
      .logo-img{
        width: 60px;
        height: 60px;
        img{
          width: 100%;
          height: 100%;
          border-radius: 50%;
        }
      }
      .title{
        color: #666;
        margin-top: 10px;
      }
    }
    .register-box{
      .submit{
        width: 345px;
        height: 40px;
        background-color: #ab956d;
        border-radius: 40px;
        line-height: 40px;
        margin-top: 50px;
        margin-left: 15px;
      }
      .go-login{
        width: 100%;
        height: 20px;
        margin-top: 10px;
        text-align: center;
        line-height: 20px;
        color: #666;
        font-size: 14px;
      }
    }
  }
</style>
