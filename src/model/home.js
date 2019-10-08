import Base from './base.js'

class Home extends Base {
  constructor () {
    super()
  }
  
  getAll () {
    return this.getAxios({
      url: '/product/home'
    })
  }
}

export default Home;
