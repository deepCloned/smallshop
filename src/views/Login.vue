<template>
  <section class="login">
    <div class="logo">
      <div class="logo-img">
        <img src="../assets/logo.png" alt="logo" />
      </div>
      <p class="title">小商铺</p>
    </div>

    <div class="login-box">
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
        loading-text="登录中..."
      >
        登录
      </van-button>
      <router-link class="go-register" to="/register" tag="div">没有账号？立即注册</router-link>
    </div>
  </section>
</template>

<script>
import Login from '../model/login'
import Validator from '../model/validator'
const login = new Login()
const validator = new Validator()

export default {
  name: 'login',
  data () {
    return {
      username: '',
      password: '',
      usernameError: '',
      passwordError: '',
      loading: false
    }
  },
  methods: {
    handleSubmit () {
      this.validate()
      if (!this.canSubmit) {
        return
      }
      this.loading = true
      login.getLogin(this.username, this.password)
        .then((res) => {
          this.loading = false
          this.$toast('登录成功')
          this.$router.push({ name: 'home' })
          // 把用户名和token写入缓存
          localStorage.setItem('token', res.token)
          localStorage.setItem('username', res.username)
        })
        .catch(() => {
          this.loading = false
        })
    },
    // 验证参数
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
  .login{
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
    .login-box{
      .submit{
        width: 345px;
        height: 40px;
        background-color: #ab956d;
        border-radius: 40px;
        line-height: 40px;
        margin-top: 50px;
        margin-left: 15px;
      }
      .go-register{
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
