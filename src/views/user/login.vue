<template>
  <div>
    <Header v-bind="{left:1,right:1,centerValue:'登录',center:2}"></Header>
    <yd-cell-group class="login-box">
      <yd-cell-item>
        <span slot="left">账号：</span>
        <yd-input slot="right" required v-model="input1" max="20" placeholder="请输入用户名"></yd-input>
      </yd-cell-item>
      <yd-cell-item>
        <span slot="left">密码：</span>
        <yd-input slot="right" type="password" v-model="input2" placeholder="请输入密码"></yd-input>
      </yd-cell-item>
    </yd-cell-group>
    <div class="register-forget">
      <span>注册</span>
      <span>忘记密码？</span>
    </div>
    <yd-button class="btn-submit" size="large" shape="circle" bgcolor="#06adf7" @click.native="submit">登录</yd-button>
  </div>
</template>
<script>
  import Header from "@/components/Header"

  export default {
    name: "login",
    data() {
      return {
        input1: "",
        input2: ""
      }
    },
    components: {
      Header
    },
    methods: {
      submit(){
        console.log(12)
      }
    }
  }
</script>

<style scoped>

</style>