<template>
  <div>
    <Header v-bind="{left:1,right:1,centerValue:'登录',center:3,list:titleList}" @clickItem="clickItem"></Header>
    <div>
      <!--新闻资讯-->
      <div v-if="index===0">
        <div class="swiper-container">
          <div class="swiper-wrapper">
            <div class="swiper-slide">slider1</div>
            <div class="swiper-slide">slider2</div>
            <div class="swiper-slide">slider3</div>
          </div>
        </div>
        <ul class="information-list">
          <li class="information-item" v-for="(item,key) in list" @click="informationDetail(item.aid)">
            <div class="information-text">
              <span>{{item.title}}</span>
              <p>{{mo(item.t*1000)}}</p>
            </div>
            <img :src="item.thumbnail" alt="">
          </li>
        </ul>
      </div>
      <!--快讯-->
      <div class="flash-list" v-if="index===1">
        <div class="flash-item" v-for="item in flashList">
          <p class="flash-time">{{item.k_time*1000|moment('MM-DD HH:mm')}}</p>
          <p class="flash-content">{{item.k_content}}</p>
          <div class="flash-comment">
            <span class="flash-duo" @click="comment(item.k_id,'duo')">看多（{{item.duo}}）</span>
            <span class="flash-kong" @click="comment(item.k_id,'kong')">看空（{{item.kong}}）</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Header from "@/components/Header"
  import * as types from "../../store/mutations-type"
  import moment from 'moment'

  export default {
    name: "Information",
    data() {
      return {
        titleList: ['新闻资讯', '快讯', '专栏', '名人库'],
        list: [],
        flashList: [],
        index: 0,
      }
    },
    components: {
      Header
    },
    fliters: {
      dataTime: function (el) {
        return moment(el).format('YYYY')
      }
    },
    mounted() {
      var mySwiper = new Swiper('.swiper-container', {
        autoplay: true,//可选选项，自动滑动
      })
      this.getInformationList()
    },
    methods: {
      //获取新闻快讯列表
      getInformationList() {
        this.$store.dispatch(types.INFORMATION_LIST).then(res => {
          if (res.code !== 0) return
          console.log(res)
          this.list = res.data
        })
      },
      getFlashList() {
        this.$store.dispatch(types.FLASH_LIST).then(res => {
          console.log(res)
          this.flashList = res
        })
      },
      //新闻详情
      informationDetail(aid) {
        console.log(aid)
        this.$router.push({path: 'InformationDetail', query: {aid: aid}})
      },
      clickItem(key) {
        console.log(key)
        this.index = key
        if (key == 1) {
          console.log(key)
          this.getFlashList()
        }
      },
      comment(id, val) {
        console.log(id, val)
        // this.$store.dispatch(types.FLASH_COMMENT, {k_id: id, view: val}).then(res => {
        //   if (res.code !== 0) return
        //   console.log(res)
        // })
      },

      //时间转换
      mo(val) {
        return moment(moment(val).format('YYYYMMDDHHmmss'), "YYYYMMDD-HH:mm:ss").fromNow()
      }
    }
  }
</script>

<style scoped>
  .swiper-slide {
    height: 180px;
    background: red;
  }
</style>