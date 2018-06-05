<template>
  <div class="search">
    <i class="icon iconfont icon-fanhui search-return" style="font-size:.5rem"></i>
    <yd-search class="search-text" v-model="value1" :on-submit="submitHandler" cancel-text="搜索" :on-cancel="submitHandler"> </yd-search>
  </div>
</template>

<script>
  export default {
    name: "search",
    data() {
      return {
        value1: ""
      }
    },
    methods: {
      submitHandler(value) {
        this.$dialog.toast({mes: `搜索：${value}`});
        console.log(1)
      }
    }
  }
</script>

<style scoped>

</style>