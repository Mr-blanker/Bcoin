<template>
  <div class="informationDetail-box">
    <Header v-bind="{left:1,center:2,centerValue:'资讯'}"></Header>
    <div class="informationDetail-list">
      <div class="informationDetail-title">
        {{dataList.title}}
      </div>
      <div class="informationDetail-message">
      <span class="informationDetail-message-source">
        文章来源：{{dataList.befrom}}
      </span>
        <span class="informationDetail-message-time">
       <i class="icon iconfont icon-clock"></i>{{dataList.t*1000|moment('MM-DD:HH:mm')}}
      </span>
      </div>
      <ul class="informationDetail-keywords">
        <li v-for="item in keywords">{{item}}</li>
      </ul>
      <div class="informationDetail-images"><img src="" alt=""></div>
      <p class="informationDetail-content">
      {{dataList.description}}
      </p>
    </div>
  </div>
</template>

<script>
  import Header from "@/components/Header"
  import * as types from "../../store/mutations-type"

  export default {
    name: "InformationDetail",
    data() {
      return {
        dataList: {},
        keywords:[]
      }
    },
    components: {
      Header
    },
    mounted() {
      let aid = this.$route.query.aid
      this.$store.dispatch(types.INFORMATION_DETAIL, aid).then(res => {
        console.log(res)
        if (res.code != 0) return
        this.keywords = res.data.keywords.split(',')
        console.log(this.keywords)
        this.dataList = res.data

      })
    }
  }
</script>

<style scoped>

</style>