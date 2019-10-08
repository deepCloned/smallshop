import Base from './base'

class Register extends Base {
  constructor () {
    super()
  }

  /**
   * 注册
   */
  getRegister (username, password) {
    return this.getAxios({
      url: '/user/register',
      method: 'POST',
      data: {
        username: username,
        password: password
      }
    })
  }
}

export default Register
