class Shopcar {
  constructor () {
    this.storageKey = 'shopcar'
  }
  
  /**
   * 商品加入购物车
   * 如果购物车中暂无加入的商品，直接加入
   * 如果购物车中已经存在，直接增加数量
   * item -- 商品 count -- 增加数量
   */
  addCount (item, count) {
    let cartData = this.getDataFromLocal()
    let index = this.getIndex(item.id, cartData)
    if (index === -1) {
      item.counts = count
      item.selected = true
      cartData.push(item)
    } else {
      cartData[index].selected = true
      cartData[index].counts += count
    }
    localStorage.setItem(this.storageKey, JSON.stringify(cartData))
  }

  /**
   * 获取购物车中的数量之和，用来显示购物车角标
   * 传参表示是否考虑选中状态
   * 购物车角标显示的所有数量的总和
   * 结算页面显示的是选中商品数量的总和计算
   */
  getCount (flag) {
    let counts = 0
    let cartData = this.getDataFromLocal()
    cartData.forEach(function (ele) {
      if (flag) {
        if (ele.selected) {
          counts += ele.counts
        }
      } else {
        counts += ele.counts
      }
    })
    return counts
  }

  /**
   * 根据 id 号移除商品
   */
  removeGoods (_id) {
    let cartData = this.getDataFromLocal()
    const newData = cartData.filter(function (ele) {
      return ele.id !== _id
    })
    localStorage.setItem(this.storageKey, JSON.stringify(newData))
  }

  /**
   * 根据id号修改选中状态
   */
  changeGoodsSelected (id) {
    let cartData = this.getDataFromLocal()
    const index = this.getIndex(id, cartData)
    cartData[index].selected = !cartData[index].selected
    this.setLocalStorage(cartData)
  }

  /**
   * 用户点击全选按钮和取消全选按钮时，修改全部商品的选中状态
   */
  toggleAllSeleted (flag) {
    let cartData = this.getDataFromLocal()
    for(let item of cartData) {
      if (flag) {
        item.selected = false
      } else {
        item.selected = true
      }
    }
    this.setLocalStorage(cartData)
  }

  /**
   * 根据key值从缓存中取值
   * 结算的时候也是从缓存中获取数据，但是要排除没选中的商品
   */
  getDataFromLocal (flag) {
    const cartData = localStorage.getItem(this.storageKey)
    if (!cartData) {
      return []
    }
    let data = JSON.parse(cartData)
    if (flag) {
      return data.filter(function (ele) {
        return ele.selected === true
      })
    }
    return data
  }

  /**
   * 设置缓存
   */
  setLocalStorage (data) {
    localStorage.setItem(this.storageKey, JSON.stringify(data))
  }

  /**
   * 传入商品id，查看是否存在购物车
   * 如果存在，返回索引值
   * 如果不存在，返回 -1
   * 循环数组，如果存在立即返回
   */
  getIndex (id, arr) {
    // 设置初始值，如果不存在，返回这个值，一旦找到了，就可以终止循环
    for (let i = 0; i < arr.length; i ++) {
      if (arr[i].id === id) {
        return i
      }
    }
    return -1
  }

  /**
   * 计算所有选中商品的价格
   * 在付款页面使用
   * 传入选中商品列表
   */
  calcProductAccount (arr) {
    let account = 0
    // 商品价格结算的时候先乘以一百，防止浮点数计算不准确
    let mutiply = 100
    arr.forEach(function (ele) {
      account += ele.price * mutiply * ele.counts
    })
    return account / mutiply
  }

  /**
   * 计算选中商品的总数量
   */
  calcProductCount (arr) {
    let count = 0
    arr.forEach(function (ele) {
      count += ele.counts
    })
    return count
  }

  /**
   * 订单创建成功，不管有没有支付，都清空购物车中的在订单中的商品
   */
  removeOrderProduct () {
    let products = this.getDataFromLocal()
    let filterProducts = products.filter(function (ele) {
      return ele.selected === false
    })
    this.setLocalStorage(filterProducts)
  }
}

export default Shopcar
