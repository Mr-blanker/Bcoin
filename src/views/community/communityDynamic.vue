<template>
  <div style="display: flex;flex-direction: column;height: 100%;">
    <Header v-bind="{left:1,right:1,center:3,list:titleList,liKey:index}" @clickItem="clickItem"></Header>
    <!--介绍-->
    <div class="cd-box pt" v-show="false">
      <div class="cd-header">
        <div class="cd-header-top"></div>
        <div class="cd-header-info">
          <h3 class="cd-header-title">币快报</h3>
          <span class="cd-header-author">hhh</span>
          <ul>
            <li class="cd-header-item ">
              <i class="icon iconfont icon-zixun zhuti"></i>
              <span>主题1000</span>
            </li>
            <li class="cd-header-item ">
              <i class="icon iconfont icon-dianzan dianzan"></i>
              <span>点赞1000</span>
            </li>
            <li class="cd-header-item ">
              <i class="icon iconfont icon-web-icon- pinglun"></i>
              <span>评论1000</span>
            </li>
          </ul>
        </div>
        <div class="cd-header-logo">
          <img src="" alt="">
        </div>
      </div>
      <div class="cd-ind">
        <h3>社群介绍</h3>
        <span>社群介绍社群介绍社群介绍社群介绍社群介绍社群介绍群介绍社群介绍群介绍社群介绍群介绍社群介绍群介绍社群介绍群介绍社群介绍群介绍社群介绍群介绍社群介绍群介绍社群介绍群介绍社群介绍群介绍社群介绍群介绍社群介绍群介绍社群介绍群介绍社群介绍群介绍社群介绍群介绍社群介绍群介绍社群介绍群介绍社群介绍群介绍社群介绍群介绍社群介绍群介绍社群介绍群介绍社群介绍群介绍社群介绍群介绍社群介绍群介绍社群介绍群介绍社群介绍群介绍社群介绍群介绍社群介绍群介绍社群介绍群介绍社群介绍群介绍社群介绍群介绍社群介绍群介绍社群介绍群介绍社群介绍群介绍社群介绍群介绍社群介绍群介绍社群介绍群介绍社群介绍群介绍社群介绍群介绍社群介绍群介绍社群介绍群介绍社群介绍群介绍社群介绍群介绍社群介绍群介绍社群介绍群介绍社群介绍群介绍社群介绍群介绍社群介绍群介绍社群介绍群介绍社群介绍群介绍社群介绍群介绍社群介绍群介绍社群介绍群介绍社群介绍群介绍社群介绍群介绍社群介绍群介绍社群介绍群介绍社群介绍群介绍社群介绍群介绍社群介绍群介绍社群介绍群介绍社群介绍群介绍社群介绍群介绍社群介绍群介绍社群介绍群介绍社群介绍社群介绍社群介绍社群介绍社群介绍社群介绍社群介绍社群介绍社群介绍社群介绍社群介绍社群介绍社群介绍社群介绍社群介绍社群介绍社群介绍社群介绍社群介绍社群介绍社群介绍社群介绍社群介绍社群介绍社群介绍社群介绍社群介绍社群介绍社群介绍</span>
      </div>
      <div class="cd-ind cd-men">
        <h3>社群成员</h3>
        <span>(1000)</span>
      </div>
      <div class="cd-add">
        <span>免费加群</span>
      </div>
    </div>
    <!--动态-->
    <ul class="cd-dynamic">
      <li class="cd-dynamic-item" v-for="item in 5">
        <div class="cd-dynamic-user">
          <img src="../../assets/default_avatar_male.jpg" alt="">
          <!--i是否置顶-->
          <div class="cd-dynamic-user-info">
            <span class="cd-dynamic-title">币券飞跃<i>置顶</i></span>
            <span class="cd-dynamic-time">2018-01-01 10：11</span>
          </div>
        </div>
        <div class="cd-dynamic-content">
          <span class="cd-dynamic-text">币券飞跃币券飞跃币券飞跃币券飞跃币券飞跃币券飞跃币券飞跃币券飞跃币券飞跃币券飞跃币券飞跃币券飞跃币券飞跃币券飞跃币券飞跃币券飞跃币券飞跃币券飞跃币券飞跃币券飞跃币券飞跃币券飞跃币券飞跃币券飞跃币券飞跃</span>
          <img src="../../assets/default_avatar_male.jpg" alt="">
          <img src="../../assets/default_avatar_male.jpg" alt="">
          <img src="../../assets/default_avatar_male.jpg" alt="">
          <div class="cd-dynamic-icon">
            <i class="icon iconfont icon-dianzan dianzan"></i>
            <i class="icon iconfont icon-web-icon- pinglun"></i>
          </div>
        </div>
        <div class="cd-dynamic-zan">
          <i class="icon iconfont icon-dianzan dianzan"></i>
          <span>hhh,fff</span>
        </div>
        <div class="cd-dynamic-comment">
          <span>币券飞跃币券飞跃币券飞跃币券飞跃</span>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    name: "communityDynamic",
    data() {
      return {
        titleList: ['动态', '介绍'],
        index: 0
      }
    },
    methods: {
      clickItem(key) {
        console.log(key)
        this.index = key
      },
    }
  }
</script>

<style scoped>

</style>