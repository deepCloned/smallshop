import Base from './base'

class Order extends Base {
  constructor () {
    super()
  }

  // 生成订单
  generateOrder (data) {
    return this.getAxios({
      url: '/product/order',
      method: 'POST',
      data: data
    })
  }


  // 去付款
  payment (id) {
    return this.getAxios({
      url: '/product/order/ordering',
      method: 'POST',
      data: {
        id
      }
    })
  }

  // 获取所有订单
  getOrderList (username) {
    return this.getAxios({
      url: '/product/order/all',
      method: 'POST',
      data: {
        username
      }
    })
  }
}

export default Order
