<template>
  <div class="address">
    <nav-bar
      title="地址列表"
      @onLeft="goBack"
    />
    <div v-if="addressList.length === 0" class="no-address">暂无可用地址</div>
    <van-address-list
      v-model="chosenAddressId"
      :list="addressList"
      @add="onAdd"
      @edit="onEdit"
      @select="onSelect"
    />
  </div>
</template>

<script>
import Address from '../model/address'
const address = new Address()

import NavBar from '../components/NavBar'
export default {
  name: 'addresses',
  components: {
    NavBar
  },
  data () {
    return {
      chosenAddressId: null,
      addressList: [],
      from: null
    }
  },
  methods: {
    // 获取所有地址列表
    getAddress () {
      address.getAddress()
        .then((res) => {
          if (!res) {
            return
          }
          this.addressList = res
          // 给默认地址标识
          res.forEach((ele) => {
            if (ele.isDefault === true) {
              this.chosenAddressId = ele.id
            }
          })
        })
    },
    goBack () {
      this.$router.go(-1)
    },
    onAdd () {
      this.$router.push({name: 'addaddress'})
    },
    onEdit (val) {
      this.$router.push({name: 'changeaddress', params: {val}})
    },
    onSelect (val) {
      if (this.from === 'order') {
        this.goBackToOrder(val)
      }
    },
    /**
     * 如果用户是从商品结算页面跳转过来选择地址
     * 选择完地址后跳转回结算页面，并携带地址信息，作为结算的地址
     */
    goBackToOrder (val) {
      const seletedAddress = {
        address: val.address,
        tel: val.tel,
        name: val.name,
        id: val.id
      }
      this.$router.push({ name: 'order' , params: {from: 'addresses', address: seletedAddress}})
    }
  },
  created () {
    this.getAddress()
    this.from = this.$route.params.from
  }
}
</script>

<style lang="scss" scoped>
@import '../assets/styles/common.scss';
  .address{
    .no-address{
      width: 100%;
      height: 30px;
      line-height: 30px;
      font-size: 13px;
      text-align: center;
      color: #666;
    }
  }
</style>

<style>
  .van-button--danger{
    background-color: #ab956d;
    border: 1px solid #ab956d;
  }
</style>
