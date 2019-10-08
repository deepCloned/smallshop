import axios from 'axios'
import { Toast } from 'vant'
import { Base64 } from 'js-base64'

class Base {
  constructor () {
    this.tokenKey = 'token'
  }
  
  /**
   * 封装一层 axios，统一处理错误
   * 参数：url method data header
   * 设置请求头
   * 每次访问携带 token
   */
  getAxios ({url, method="GET", data}) {
    const token = this.getTokenFromLocal()
    const baseToken = this.encodeToken(token)
    return new Promise(function (resolve, reject) {
      axios({
        url: Base.baseUrl + url,
        method,
        data,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Basic ${baseToken}`
        }
      }).then((res) => {
        resolve(res.data)
      }).catch((err) => {
        Toast(err.response.data)
        reject(err)
      })
    })
  }

  /**
   * 尝试获取保存在本地的token
   * 携带此token向后端发送请求
   * token 有效可以正常访问其他页面
   * 如果没有 token 或者 token 失效，则提示用户重新登录获取 token
   * 把重新获取的token保存在本地
   */
  getTokenFromLocal () {
    return localStorage.getItem(this.tokenKey)
  }

  /**
   * 使用 base64 加密token
   */
  encodeToken (token) {
    return Base64.encode(token + ':')
  }

}

// 根据环境的不同设置不同的基础 url
Base.baseUrl = process.env.NODE_ENV === 'production' ? '/v2' : 'http://localhost:3000/v2'

export default Base
