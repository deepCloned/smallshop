import Base from './base'

class Theme extends Base {
  constructor () {
    super()
  }

  getProductByTheme (theme) {
    return this.getAxios({
      url: '/product/theme/' + theme
    })
  }
}

export default Theme
