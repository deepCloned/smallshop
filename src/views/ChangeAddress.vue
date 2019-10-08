<template>
  <div class="change-address">
    <nav-bar
      title="编辑地址"
      @onLeft="goBack"
    />
    <van-address-edit
      :area-list="areaList"
      :address-info="addressInfo"
      show-delete
      show-set-default
      @save="onSave"
      @delete="onDelete"
    />
  </div>
</template>

<script>
import NavBar from '../components/NavBar'
import areaList from '../model/areaList'

import Address from '../model/address'
const address = new Address()

export default {
  name: 'changeaddress',
  components: {
    NavBar
  },
  data() {
    return {
      areaList: areaList,
      addressInfo: {},
      searchResult: []
    }
  },
  methods: {
    onSave (val) {
      let { id, name, country, province, city, county, addressDetail, tel, postalCode, isDefault } = val
      let data = {
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
      address.changeAddress(id, data)
        .then((res) => {
          this.$toast(res.message)
          this.goBack()
        })
    },
    goBack () {
      this.$router.go(-1)
    },
    onDelete (val) {
      let { id } = val
      address.deleteAddress(id)
        .then((res) => {
          this.$toast(res.message)
          this.goBack()
        })
    }
  },
  created () {
    // 结构赋值
    const { name, tel, id } = this.$route.params.val
    this.addressInfo = {
      name,
      tel,
      id
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