<template>
  <div class="footer" v-if="isShowFooterNav">
    <ul class="footer-box">

      <li class="footer-item" @click="$router.push({path:'Information'})" :class="{'footer-active':$route.name=='Information'}">
        <i class="icon iconfont icon-wanggediqiu"></i>
        <span>资讯</span>
      </li>
      <li class="footer-item" @click="$router.push({path:'marketIndex'})"  :class="{'footer-active':$route.name=='marketIndex'}">
        <i class="icon iconfont icon-gupiao1"></i>
        <span>行情</span>
      </li>
      <li class="footer-item" @click="$router.push({path:'community'})" :class="{'footer-active':$route.name=='community'}">
        <i class="icon iconfont icon-zixun"></i>
        <span>社群</span>
      </li>
      <li class="footer-item" @click="$router.push({path:'Person'})" :class="{'footer-active':$route.name=='person'}">
        <i class="icon iconfont icon-yonghu1"></i>
        <span>个人</span>
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        isShowFooterNav: true,
      }
    },
    watch: {
      '$route' (to) {
        console.log(to)
        if (to.name == 'Information' || to.name == 'person' ||to.name == 'marketIndex') {
          this.isShowFooterNav = true
        } else {
          this.isShowFooterNav = false
        }
      }
    },
    mounted() {}
  }
</script>

<style scoped>
.footer-box li{
  font-size: .25rem !important;
}
</style>