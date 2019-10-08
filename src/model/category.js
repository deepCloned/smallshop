import Base from './base'

class Category extends Base {
  constructor () {
    super()
  }

  getCategoryList () {
    return this.getAxios({
      url: '/product/category'
    })
  }
}

export default Category
