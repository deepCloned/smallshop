class Validator {
  constructor () {
    /**
     * 定义验证用户登录合法性规则
     * 用户名
     * 邮箱
     * 密码
     * 验证码
     */
    this.usernameReg = /[A-Za-z0-9_\-\u4e00-\u9fa5]{6,32}/
    this.emailReg = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/
    this.passwordReg = /(?!^[0-9]+$)(?!^[A-z]+$)(?!^[^A-z0-9]+$)^[^\s\u4e00-\u9fa5]{8,16}$/
    // ^(?![0-9]+$)(?![a-zA-Z]+$)[0-9a-zA-Z]

    /**
     * 定义错误消息
     */
    this.usernameNotNull = '用户名不能为空'
    this.usernameNotLegal = '用户名不得少于6个字符'
    this.passwordNotNull = '密码不能为空'
    this.passwordNotLegal = '密码包含数字、字母、符号中的两种，不少于8位'
  }
  
  /**
   * 目的：检测所传用户名，返回错误信息，如果没有错误，直接返回空字符串
   */
  validateUsername (username) {
    if (!username) {
      return this.usernameNotNull
    }
    if (!this.usernameReg.test(username)) {
      return this.usernameNotLegal
    }
    return ''
  }

  /**
   * 检测用户名的合法性
   */
  validatePassword (password) {
    if (!password) {
      return this.passwordNotNull
    }
    if (!this.passwordReg.test(password)) {
      return this.passwordNotLegal
    }
    return ''
  }
}

export default Validator
