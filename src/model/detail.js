import Base from './base'

class Detail extends Base {
  constructor () {
    super()
  }

  getDetailById (id) {
    return this.getAxios({
      url: `/product/detail/${id}`
    })
  }
}

export default Detail
