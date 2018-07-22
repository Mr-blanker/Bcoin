<template>
  <div>
    <Header v-bind="{left:1,centerValue:'个人信息',center:2}"></Header>
    <div class="mine">
      <yd-cell-group>
        <yd-cell-item arrow>
          <span slot="left">头像</span>
          <span slot="right" class="avatar">
              <img :src="userInfo.avatar" alt="" style="background-size: 100% 100% " v-if="userInfo.avatar">
              <img src="../../assets/default_avatar_male.jpg" alt="" style="background-size: 100% 100% " v-else>
            </span>
        </yd-cell-item>
        <yd-cell-item arrow>
          <span slot="left">昵称</span>
          <span slot="right">{{userInfo.name}}</span>
        </yd-cell-item>
        <yd-cell-item arrow>
          <span slot="left">手机号码</span>
          <span slot="right">{{userInfo.phone}}</span>
        </yd-cell-item>
        <yd-cell-item arrow>
          <span slot="left">积分</span>
          <span slot="right">{{userInfo.jifen}}</span>
        </yd-cell-item>
        <yd-cell-item arrow>
          <span slot="left">性别</span>
          <span slot="right" v-if="userInfo.xingbie">{{userInfo.xingbie===0?'男':'女'}}</span>
        </yd-cell-item>
      </yd-cell-group>
      <yd-button class="btn-submit" size="large" shape="circle" bgcolor="#06adf7" @click.native="submit">退出登录
      </yd-button>
    </div>
  </div>
</template>
<script>
  import {
    mapGetters
  } from "vuex"
  import * as types from "../../store/mutations-type"
  export default {
    name: "personMessage",
    computed: {
      ...mapGetters(['userInfo'])
    },
    methods: {
      submit() {
        this.$store.dispatch(types.USER_LOGOUT).then(res => {
          if (res.code === 0) {
            this.success('登出成功', '/person')
          }
        })
      }
    }
  }
</script>

<style scoped>
  .yd-cell-item{
    height: .9rem !important;
  }
</style>