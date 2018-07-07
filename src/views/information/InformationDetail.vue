<template>
  <div class="informationDetail-box">
    <Header v-bind="{left:1,center:2,centerValue:'资讯'}"></Header>
    <div class="informationDetail-list">
      <div class="informationDetail-title">
        {{dataList.title}}
      </div>
      <div class="informationDetail-message">
      <span class="informationDetail-message-source" v-if="dataList.befrom">
        文章来源：{{dataList.befrom}}
      </span>
        <span class="informationDetail-message-time" v-if="a">
        <i class="icon iconfont icon-clock"></i>{{dataList.t*1000|moment('MM-DD:HH:mm')}}
      </span>
      </div>
      <ul class="informationDetail-keywords">
        <li v-for="item in keywords">{{item}}</li>
      </ul>
      <div class="informationDetail-images" v-if="dataList.thumbnail">
        <img :src="dataList.thumbnail" alt="">
      </div>
      <p class="informationDetail-content" v-if="dataList.description">
        {{dataList.description}}
      </p>
      <!--<p  v-html="dataList.content" v-if="id"></p>-->
      <div v-html="dataList.content" style="width: 100%;" class="v-html"></div>
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
        keywords: [],
        aid: '',
        id: '',
        a:''
      }
    },
    components: {
      Header
    },
    mounted() {
      this.aid = this.$route.query.aid
      console.log(this.aid)
      this.id = this.$route.query.id
      this.wid = this.$route.query.wid
      if (this.aid) {
        this.$store.dispatch(types.INFORMATION_DETAIL, this.aid).then(res => {
          console.log(res)
          if (res.code !== 0) return
          this.keywords = res.data.keywords.split(',')
          console.log(this.keywords)
          this.dataList = res.data
          this.a =1
        })
      } else if (this.id) {
        this.$store.dispatch(types.PERSON_CONTENT, this.id).then(res => {
          console.log(res)
          if (res.code !== 0) return
          if (res.data !== null) {
            this.keywords = res.data.keywords.split(',')
            console.log(this.keywords)
            this.dataList = res.data
            this.a = 1
          }
        })
      } else {
        this.$store.dispatch(types.COLUMN_CONTENT, this.wid).then(res => {
          console.log(res)
          if (res.code !== 0) return
          if (res.data !== null) {
            this.keywords = res.data.keywords.split(',')
            console.log(this.keywords)
            this.dataList = res.data
            this.a = 1
          }
        })
      }

    }
  }
</script>

<style scoped>
  p img {
    width: 100%;
  }
</style>