<template>
  <div>
    <Header v-bind="{right:1,center:2,centerValue:'社群'}"></Header>
    <div class="community-box pt">
      <ul class="community-list ">
        <!--<li class="community-item" v-for="item in 5">{{item}}</li>-->
        <li class="build-community padlr02">
          <div class="build-community-left">
            <span class="add-box">
            <i class="icon iconfont icon-tianjia"></i>
            </span>
            <span>创建社群</span>
          </div>
          <i class="icon iconfont icon-gengduo"></i>
        </li>
      </ul>
      <div class="recommend-box">
        <span class="recommend-text">推荐</span>
        <ul class="recommend-list">
          <li class="recommend-item" v-for="item in 5">
            <img src="../../assets/default_avatar_male.jpg" alt="">
            <div class="recommend-content">
              <h4>币快报</h4>
              <span>币快报</span>
            </div>
            <span class="recommend-member">成员1111</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "community"
  }
</script>

<style scoped>

</style>