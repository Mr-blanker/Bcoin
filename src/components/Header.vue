<template>
  <div class="header">
    <div class="header-left">
      <i class="icon iconfont icon-fanhui" @click="leftClick" v-if="left===1" style="font-size: .45rem"></i>
      <i class="icon iconfont icon-gengduo-" @click="leftClick" v-if="left===2" style="font-size:.55rem"></i>
    </div>
    <div class="header-main">
      <span class="center-input" v-if="center===1"><i class="icon iconfont icon-search" style="font-size: 0.3rem;margin-right: -5px;"></i>{{centerValue}}</span>
      <span  class="center-title" v-if="center===2">{{centerValue}}</span>
    </div>
    <div class="header-right">
      <i class="icon iconfont icon-search" @click="rightClick" style="font-size: 0.4rem;" v-if="right===1"></i>
      <i class="icon iconfont icon-shezhi2" @click="rightClick" v-if="right===2"></i>
      <i class="icon iconfont icon-viewgallery" @click="rightClick" style="font-size: .4rem" v-if="right===3"></i>
      <i class="icon iconfont icon-fanhui" @click="rightClick" v-if="right===4 "></i>
    </div>
  </div>
</template>

<script>
  export default {
    name: "Header",
    props: [
      "left",
      "right",
      'center',
      'centerValue'
    ],
    methods: {
      leftClick() {
        console.log('left')
      },
      rightClick() {
        console.log('right')
      }

    }
  }
</script>

<style scoped lang="scss">

</style>