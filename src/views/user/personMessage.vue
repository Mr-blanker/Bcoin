<template>
  <div>
    <Header v-bind="{left:1,centerValue:'个人信息',center:2}"></Header>
    <div class="mine">
      <yd-cell-group >
        <yd-cell-item arrow type="a" href="tel:400-888-8888">
          <span slot="left">这里是一个A链接</span>
          <span slot="right">href不会解析</span>
        </yd-cell-item>
        <yd-cell-item arrow type="link" href="#">
          <span slot="left">这里是一个Router-Link链接</span>
          <span slot="right">href会解析为路由</span>
        </yd-cell-item>
        <yd-cell-item arrow type="label">
          <span slot="left">这里是一个Label</span>
        </yd-cell-item>
        <yd-cell-item arrow>
          <span slot="left">这里是一个普通DIV</span>
        </yd-cell-item>
      </yd-cell-group>
      <yd-button class="btn-submit" size="large" shape="circle" bgcolor="#06adf7" @click.native="submit">退出登录</yd-button>


    </div>

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
      submit() {
        console.log(12)
      }
    }
  }
</script>

<style scoped>

</style>