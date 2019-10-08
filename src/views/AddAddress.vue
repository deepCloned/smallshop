<template>
  <div class="add-ress">
    <nav-bar
      title="新增地址"
      @onLeft="goBack"
    />
    <van-address-edit
      :area-list="areaList"
      show-set-default
      @save="onSave"
    />
  </div>
</template>

<script>
import NavBar from '../components/NavBar'
import areaList from '../model/areaList'

import Address from '../model/address'
const address = new Address()

export default {
  name: 'addAddress',
  components: {
    NavBar
  },
  data() {
    return {
      areaList: areaList,
      searchResult: []
    }
  },
  methods: {
    onSave (val) {
      // 结构赋值
      let { name, country, province, city, county, addressDetail, tel, postalCode, isDefault } = val
      const data = {
        user: localStorage.getItem('username'),
        name,
        country,
        province,
        city,
        county,
        addressDetail,
        tel,
        postalCode,
        isDefault
      }
      address.addAddress(data)
        .then((res) => {
          this.$toast(res.message)
          // 添加地址成功，返回上一级
          // this.$router.go(-1)
        })
    },
    goBack () {
      this.$router.go(-1)
    }
  }
}
</script>

<style>
  .van-button--danger{
    background-color: #ab956d;
    border: 1px solid #ab956d;
  }
</style>