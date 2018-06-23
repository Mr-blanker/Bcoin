<template>
  <div class="acView-box">
    <Header v-bind="{left:1,right:1,center:2,centerValue:'专栏列表'}"></Header>
    <div class="acView-list-box">
      <div class="acView-title">
        <div class="acView-title-top">
          <div class="acView-logo"><img :src="columnInfo.thumbnail" alt=""></div>
          <div class="acView-title-content">
            <p>{{columnInfo.title}}</p>
            <p>网址：{{columnInfo.link}}</p>
            <p>{{columnInfo.contact}}</p>
          </div>
        </div>
        <p class="acView-title-bottom">{{columnInfo.description}}</p>
      </div>
      <ul class="acView-list">
        <li class="acView-item" v-for="item in columnList"
            @click="$router.push({path:'InformationDetail',query:{wid:item.aid}})">
          <div class="acView-item-img"><img src="" alt="">
            <img :src="item.thumbnail" alt="">
          </div>
          <p class="acView-item-content">{{item.title}}</p>
          <span class="acView-item-time">{{item.t*1000|moment('YYYY-MM-DD')}}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  import Header from "@/components/Header"
  import * as types from "../../store/mutations-type"

  export default {
    name: "acView",
    data() {
      return {
        columnInfo: '',
        columnList: []
      }
    },
    components: {
      Header
    },
    mounted() {
      this.getColumnList()
      this.columnInfo = JSON.parse(this.$route.query.val)
      console.log(this.columnInfo)
    },
    methods: {
      getColumnList() {
        this.$store.dispatch(types.COLUMN_LIST, this.columnInfo.pid).then(res => {
          console.log(res)
          if (res.code !== 0) return
          if (res.data !== null) {
            this.columnList = res.data
          }
        })

      }
    }
  }
</script>

<style scoped>

</style>