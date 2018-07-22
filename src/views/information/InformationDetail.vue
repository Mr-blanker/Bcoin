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
      <p class="informationDetail-content v-html" v-html="dataList.description">
      </p>
      <!--<p  v-html="dataList.content" v-if="id"></p>-->
      <div v-html="dataList.content" style="width: 100%;" class="v-html"></div>

    </div>
    <div class="cd-dynamic-comment ad-dynamic-comment pullScroll" v-if="aid">
      <span class="ad-comment-title">评论</span>
      <div id="informationDetailScroll" style="width: 100%;">
        <ul>
          <li v-for="attr in commentList" class="ad-comment-item">
            <img src="../../assets/default_avatar_male.jpg" alt="" v-if="!attr.pic">
            <img :src="attr.pic" alt="" v-if="attr.pic">
            <div class="ad-comment-content">
              <a>{{attr.name}}：</a>
              <span> {{attr.content}}</span>
              <i>{{attr.createTim|moment('MM-DD HH:mm')}}</i>
            </div>
          </li>
        </ul>
      </div>

    </div>
    <div class="id-comment" @click="newComment" v-if="aid">
      <input type="text" placeholder="写评论..." disabled="disabled">
      <i class="icon iconfont icon-skip"></i>
    </div>
  </div>
</template>

<script>
  import Header from "@/components/Header"
  import * as types from "../../store/mutations-type"
  import {mapGetters} from "vuex"

  export default {
    name: "InformationDetail",
    data() {
      return {
        dataList: {},
        keywords: [],
        aid: '',
        id: '',
        a: '',
        commentList: [],
        commentTotal:''
      }
    },
    components: {
      Header
    },
    computed: {
      ...mapGetters(['userSid'])
    },
    mounted() {
      this.aid = this.$route.query.aid
      this.id = this.$route.query.id
      this.wid = this.$route.query.wid
      let that = this
      this.$nextTick(()=>{
        this.scroll = new MeScroll("informationDetailScroll", {
        down: {
          callback: that.loadDataList,
        }
      });
        
        if(this.aid){
          this.scroll.triggerDownScroll();
        }
      },200)


      if (this.aid) {
        this.$store.dispatch(types.INFORMATION_DETAIL, this.aid).then(res => {
          console.log(res)
          if (res.code !== 0) return
          this.keywords = res.data.keywords.split(',')
          console.log(this.keywords)
          this.dataList = res.data
          this.a = 1
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

    },
    methods: {
      //新闻评论列表
      loadDataList(page,mescroll) {
        this.$store.dispatch(types.NEWS_LIST, {newID: this.aid}).then(res => {
          console.log(res)
          if (res.code !== 0) return
          this.commentList = res.data
          this.scroll.endSuccess();
          this.scroll.endUpScroll(true)
        })
      },
      //新闻评论
      newComment() {
        let that = this
        utils.dialog.prompt('写下你的观点', (value) => {
          if (value == '') return
          let info = {
            newID: that.aid,
            content: value
          }
          console.log(info)
          $.ajax({
            contentType: 'application/json',
            url: "http://ssl.pandawork.vip/api/user/new.comment",
            type: 'POST',
            data: JSON.stringify(info),
            headers: {
              sid: that.userSid
            },
            dataType: 'JSON',
            cache: false,
            processData: false,
            success: (res) => {
              console.log(res)
              if (res.code === 401) {
                that.$router.push({path: 'Login'})
              }
              that.scroll.triggerDownScroll();
            }
          })
        });
      }

    }
  }
</script>

<style scoped lang="scss">
  p img {
    width: 100%;
  }

  .id-comment {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    display: flex;
    align-items: center;
    text-align: left;
    padding: 0 .2rem;
    height: .7rem;
    background: #fff;
    border-top: 1px solid #efefef;
    input {
      width: 85%;
      height: 90%;
      border: 0;
      background: #f3f3f3;
      border-radius: .3rem;
      padding-left: .4rem;
      font-size: .3rem;
    }
    i {
      padding-left: .2rem;
    }
  }
  .ad-dynamic-comment {
    padding: .2rem;
    margin-top: .2rem;
    padding-bottom: 1.1rem;

    .ad-comment-title {
      display: flex;
      align-items: center;
      height: .8rem;
      width: 100%;
      border-bottom: 1px solid #dadada;
    }
  }
  .ad-comment-item {
    min-height: 1rem;
    padding: .3rem 0 !important;
    border-bottom: 1px solid #dadada;
    flex-wrap: wrap;
    &:last-child {
      border: 0;
    }
    img {
      height: .8rem;
      width: .8rem;
      border-radius: 100%;
    }
  }
  .cd-dynamic-comment {
    display: block !important;
  }
</style>