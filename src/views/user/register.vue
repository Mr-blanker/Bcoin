<template>
  <div>
    <Header v-bind="{left:1,centerValue:'注册',center:2}"></Header>
    <yd-cell-group class="login-box">
      <yd-cell-item>
        <span slot="left">账号：</span>
        <yd-input slot="right" required v-model="userInfo.name" max="20" placeholder="请输入用户名"></yd-input>
      </yd-cell-item>
      <yd-cell-item>
        <span slot="left">密码：</span>
        <yd-input slot="right" type="password" v-model="userInfo.pwd" placeholder="请输入密码"></yd-input>
      </yd-cell-item>
    </yd-cell-group>

    <!-- <yd-button class="btn-submit" size="large" shape="circle" bgcolor="#06adf7" @click.native="submit">注册</yd-button> -->
    <footer class="addCurrency" style="position:relative;top:.2rem">
      <div @click="submit">
        <a class="btns" >注册</a>
      </div>
    </footer>
  </div>
</template>
<script>
  import Header from "@/components/Header"
  import * as types from "../../store/mutations-type"
  export default {
    name: "login",
    data() {
      return {
        userInfo: {
          name: "",
          pwd: ""
        },
      }
    },
    components: {
      Header
    },
    methods: {

      submit() {
        console.log(this.userInfo)
        this.$store.dispatch(types.USER_REGISTER, this.userInfo).then(res => {
          console.log(res)
          if (res.code === 0) {
            this.success('注册成功','Login')
          } else {
            if(res.msg){
              this.fail(res.msg)
            }

          }
        })
      }
    }
  }
</script>

<style scoped>

</style>