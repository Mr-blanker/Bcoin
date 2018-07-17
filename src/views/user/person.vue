<template>
  <div>
    <Header v-bind="{centerValue:'个人',center:2}"></Header>
    <div class="mine">
      <div class="head"  @click="userInfo.name? $router.push({path:'personMessage'}): $router.push({path:'login'})">
        <div class="head-left">
          <img :src="userInfo.avatar" alt="" v-if="userInfo.avatar">
          <img src="../../assets/default_avatar_male.jpg" alt="" v-else>
          <span>{{userInfo.name?userInfo.name:'点击登录'}}</span>
        </div>
        <i class="icon iconfont icon-gengduo"></i>
      </div>
      <yd-cell-group style="margin-top:10px;border: 0;">
        <yd-cell-item arrow type="a" @click.native="userInfo.name?$router.push({path:'addressList'}):$router.push({path:'login'})">
          <span slot="left">地址</span>
          <span slot="right"></span>
        </yd-cell-item>
        <yd-cell-item arrow type="a" @click.native="userInfo.name? $router.push({path:'personMessage'}): $router.push({path:'login'})">
          <span slot="left">个人信息</span>
          <span slot="right"></span>
        </yd-cell-item>
        <yd-cell-item arrow type="a" @click.native="userInfo.name? $router.push({path:'mallIndex'}): $router.push({path:'login'})">
          <span slot="left">积分商城</span>
          <span slot="right"></span>
        </yd-cell-item>
        <yd-cell-item arrow type="a" @click.native="userInfo.name? $router.push({path:'ownAuction'}): $router.push({path:'login'})">
          <span slot="left">我的竞拍</span>
          <span slot="right"></span>
        </yd-cell-item>
        <yd-cell-item arrow type="a" @click.native="userInfo.name? $router.push({path:'ownOrder'}): $router.push({path:'login'})">
          <span slot="left">我的订单</span>
          <span slot="right"></span>
        </yd-cell-item>

      </yd-cell-group>
    </div>
  </div>
</template>
<script>
  import {mapGetters} from "vuex"
  export default {
    name: "person",
    computed: {
      ...mapGetters(['userInfo'])
    },
    mounted(){
      console.log(this.userInfo)
      if(this.userInfo.name){
        console.log(1)
      }else{
        console.log(2)
      }
    }
  }
</script>

<style scoped>
</style>