<template>
  <div>
    <Header v-bind="{left:1,centerValue:'我的',center:2}"></Header>
    <div class="mine">
      <div class="head" >
        <div class="head-left">
          <img :src="userInfo.avatar" alt="" v-if="userInfo.avatar">
          <span v-if="userInfo.name">{{userInfo.name}}</span>
        </div>
        <i class="icon iconfont icon-gengduo"></i>
      </div>
      <yd-cell-group style="margin-top:10px;border: 0;">
        <yd-cell-item arrow type="a" @click.native="$router.push({path:'addressList'})">
          <span slot="left">地址</span>
          <span slot="right"></span>
        </yd-cell-item>
        <!--<yd-cell-item arrow type="link" href="#">-->
        <!--<span slot="left">这里是一个Router-Link链接</span>-->
        <!--<span slot="right">href会解析为路由</span>-->
        <!--</yd-cell-item>-->
        <!--<yd-cell-item arrow type="label">-->
        <!--<span slot="left">这里是一个Label</span>-->
        <!--</yd-cell-item>-->
        <!--<yd-cell-item arrow>-->
        <!--<span slot="left">这里是一个普通DIV</span>-->
        <!--</yd-cell-item>-->
      </yd-cell-group>
    </div>
  </div>
</template>
<script>
  import {mapGetters} from "vuex"

  export default {
    name: "person",
    data() {
      return {
        input1: "",
        input2: "",
      }
    },
    computed: {
      ...mapGetters(['userInfo'])
    },
  }
</script>

<style scoped>
</style>