<template>
  <div class="footer">
    <ul class="footer-box">
      <router-link to="/Information" active-class="tab-active">
        <li class="footer-item">
          <i class="icon iconfont icon-home1"></i>
          <span>首页</span>
        </li>
      </router-link>
      <router-link to="/marketIndex" active-class="tab-active">
        <li class="footer-item">
          <i class="icon iconfont icon-gupiao1"></i>
          <span>行情</span>
        </li>
      </router-link>
      <router-link to="/login" active-class="tab-active">
        <li class="footer-item">
          <i class="icon iconfont icon-wanggediqiu"></i>
          <span>资讯</span>
        </li>
      </router-link>
      <router-link to="/person" active-class="tab-active">
        <li class="footer-item">
          <i class="icon iconfont icon-yonghu1"></i>
          <span>个人</span>
        </li>
      </router-link>
    </ul>
  </div>
</template>

<script>
  export default {}
</script>

<style lang="scss" scoped>
  $bg: #06adf7;
  .tab-active {
    color: $bg
  }
</style>