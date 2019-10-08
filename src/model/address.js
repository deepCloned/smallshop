import Base from './base'

class Address extends Base {
  constructor () {
    super()
  }

  // 获取地址/默认地址
  getAddress (flag) {
    let username = localStorage.getItem('username')
    return this.getAxios({
      url: '/user/address/get',
      data: {
        user: username
      },
      method: 'POST'
    }).then((res) => {
      /**
       * 获取到地址信息
       * 如果用户没有添加地址，返回一个空对象
       * 通过flag标识决定返回一个默认地址还是地址列表
       */
      const address = res.addresses
      if (address.length === 0) {
        // 用户还未添加地址，直接返回false，在组件中调用接收
        return false
      } else {
        if (flag) {
          for (let item of address) {
            if (item.isDefault === true) {
              return item
            }
          }
        } else {
          return address
        }
      }
    })
  }

  // 新增地址
  addAddress (data) {
    return this.getAxios({
      url: '/user/address/add',
      method: 'POST',
      data: data
    })
  }

  // 更改原有地址，根据 id 号
  changeAddress (id, data) {
    return this.getAxios({
      url: `/user/address/change/${id}`,
      method: 'POST',
      data: data
    })
  }

  // 删除地址，根据 id号
  deleteAddress (id) {
    return this.getAxios({
      url: `/user/address/delete/${id}`
    })
  }
}

export default Address
