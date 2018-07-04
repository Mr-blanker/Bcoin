<template>
  <div>
    <Header v-bind="{right:1,center:2,centerValue:'社群'}"></Header>
    <div class="community-box pt">
      <ul class="community-list ">
        <!--<li class="community-item" v-for="item in 5">{{item}}</li>-->
        <li class="build-community padlr02">
          <div class="build-community-left">
            <span class="add-box">
            <i class="icon iconfont icon-tianjia" ></i>
            </span>
            <span>创建社群</span>
          </div>
          <i class="icon iconfont icon-gengduo"></i>
        </li>
      </ul>
      <ul class="recommend-list">
        <span>推荐</span>
        <li class="recommend-item" v-for="item in 5">{{item}}</li>
      </ul>
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