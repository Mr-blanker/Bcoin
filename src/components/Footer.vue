<template>
  <div class="footer" v-if="showFooterNav">
    <ul class="footer-box">
      <li class="footer-item" :class="{'footer-active':$route.path=='/Home'}">
        <i class="icon iconfont icon-home1"></i>
        <span>首页</span>
      </li>
      <li class="footer-item" :class="{'footer-active':$route.path=='/Home'}">
        <i class="icon iconfont icon-gupiao1"></i>
        <span>行情</span>
      </li>
      <li class="footer-item" @click="$router.push({path:'Information'})" :class="{'footer-active':$route.path=='/Information'}">
        <i class="icon iconfont icon-wanggediqiu"></i>
        <span>资讯</span>
      </li>
      <li class="footer-item" :class="{'footer-active':$route.path=='/Home'}">
        <i class="icon iconfont icon-yonghu1"></i>
        <span>个人</span>
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    data() {
      return {}
    },
    props: ['showFooterNav'],
    computed: {}
  }
</script>

<style scoped>

</style>