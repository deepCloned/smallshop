import Base from './base'

class Login extends Base {
  constructor () {
    super()
  }

  getLogin (username, password) {
    return this.getAxios({
      url: '/user/token',
      method: 'POST',
      data: {
        username,
        password
      }
    })
  }

  // 验证token
  verifyToken () {
    return this.getAxios({
      url: '/user/token/verify'
    })
  }
}

export default Login
