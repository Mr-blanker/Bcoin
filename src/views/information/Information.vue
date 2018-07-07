<template>
  <div >
    <Header v-bind="{left:1,right:1,center:3,list:titleList,liKey:index}" @clickItem="clickItem"></Header>
    <div style="padding-top: 45px;padding-bottom:50px" class="pullScroll" >
      <div class="new-box" v-if="index===0">
        <ul class="new-bar">
          <li class="new-bar-item " :class="{'new-bar-item-active':newCateId===0}" @click="chooseNewCate(0)">全部</li>
          <li class="new-bar-item" v-for="item in newCateList" :class="{'new-bar-item-active':newCateId===item.id}"
              @click="chooseNewCate(item.id)">
            <span class="new-bar-item-content">{{item.name}}</span>
          </li>
        </ul>
      </div>
      <div id="scroll" :class="{newTop:index===0}">
        <yd-slider autoplay="3000" v-if="index==0">
          <yd-slider-item v-for="(item,index) in broadcastAdList" :key="index">
            <!--<a :href="item.url" class="slider-img">-->
              <a :href="item.url" style="height: 3.5rem;">
              <img :src="item.pic" style="height: 100%;">
            </a>
          </yd-slider-item>
        </yd-slider>

        <!--新闻资讯-->
        <div v-if="index===0">
          <ul class="information-list">
            <li class="information-item" v-for="(item,key) in list" @click="informationDetail(item.aid)">
              <img :src="item.thumbnail" alt="">
              <div class="information-text">
                <span>{{item.title}}</span>
                <p>{{mo(item.t*1000)}}</p>
              </div>
            </li>
          </ul>
        </div>
        <!--快讯-->
        <div class=" flash-list" v-if="index===1">
          <div>
            <div class="flash-item" v-for="(item,key) in flashList">
              <p class="flash-time">{{item.k_time*1000|moment('MM-DD HH:mm')}}</p>
              <p class="flash-content" v-html="item.k_content"></p>
              <div class="flash-comment">
                <span class="flash-duo" @click="comment(item,'duo',key)">看多（{{item.duo}}）</span>
                <span class="flash-kong" @click="comment(item,'kong',key)">看空（{{item.kong}}）</span>
              </div>
            </div>
          </div>

        </div>
        <!--名人库-->
        <div class="person-list" v-if="index===3">
          <div class="person-item" v-for="item in personList"
               @click="$router.push({path:'InformationDetail',query:{id: item.aid}})">
            <div class="person-item-box">

              <div class="person-img"><img :src="item.thumbnail" alt=""></div>
              <span class="person-title">{{item.title}}</span>
              <span class="person-content">{{item.description}}</span>
            </div>
          </div>
        </div>
        <!--专栏-->
        <yd-accordion>
          <yd-accordion-item :title="item.name" v-for="item in columnList">
            <div style="padding: .24rem;" class="c-list">
              <ul class="c-list-box" style="width: 100%;">
                <yd-grids-group :rows="3"  item-height="2rem">
                  <yd-grids-item v-for="n in item.items" class="ccc" @click.native="$router.push({path:'acView',query:{val:JSON.stringify(n)}})">
                    <span slot="text">{{n.title}}</span>
                    <img slot="icon" :src="n.thumbnail" alt="">
                  </yd-grids-item>
                </yd-grids-group>
              </ul>
            </div>
          </yd-accordion-item>
        </yd-accordion>
      </div>
    </div>
  </div>
</template>

<script>
  import * as types from "../../store/mutations-type"
  import moment from 'moment'
  import {mapGetters} from "vuex"

  export default {
    name: "Information",
    data() {
      return {
        titleList: ['新闻资讯', '快讯', '专栏', '名人库'],
        list: [],
        flashList: [],
        personList: [],
        columnList: [],
        columnCateList: [],
        index: 0,
        broadcastAdList: [],
        len: 1,
        flashLen: 0,
        newLen: 0,
        personLen: 0,
        newCateList: [],
        newCateId: 0
      }
    },
    computed: {
      ...mapGetters(['informationActive'])
    },
    mounted() {
      this.getNewCate()
      if (this.informationActive) {
        this.index = parseInt(this.informationActive)
      }
      let that = this;
        this.scroll = new PullScroll("scroll", {
          refresh: function (pullScroll) {
            that.initDataList(pullScroll)
            console.log('pullScroll=>')
            console.log(pullScroll)
          },
          loading: function (pullScroll) {
            that.loadDataList(pullScroll);
          }
        });
        this.scroll.triggerRefresh();
      this.clickItem(this.index)
    },
    methods: {
      //获取新闻分类
      getNewCate() {
        this.$store.dispatch(types.INFORMATION_CATES).then(res => {
          console.log(res)
          if (res.code !== 0) return
          this.newCateList = res.data
        })
      },
      //选择新闻分类
      chooseNewCate(id) {
        console.log(id)
        this.newCateId = id
        this.scroll.triggerRefresh();
      },
      initDataList(pullScroll) {
        console.log(this.index)
        // 重复请求处理
        if (this.index === 1) {
          this.flashLen = 0
        } else if (this.index === 0) {
          this.newLen = 0
        } else if (this.index === 3) {
          this.personLen = 0
        }
        this.loadDataList(pullScroll);
      },
      loadDataList(pullScroll) {
        //快讯列表
        if (this.index === 1) {
          this.flashLen += 20
          this.$store.dispatch(types.FLASH_LIST, {len: this.flashLen}).then(res => {
            this.flashList = res
            pullScroll.finish(false);
          })
        } else if (this.index === 0) {
          //获取新闻资讯列表
          this.newLen += 20
          this.$store.dispatch(types.INFORMATION_LIST, {len: this.newLen, cateID: this.newCateId}).then(res => {
            if (res.code !== 0) return
            this.list = res.data
            pullScroll.finish(false);
          })
        } else if (this.index === 3) {
          //名人库列表
          this.personLen += 20
          this.$store.dispatch(types.PERSON_LIST, {len: this.personLen}).then(res => {
            if (res.code !== 0) return
            this.personList = res.data
            pullScroll.finish(false);
          })
        }
        else if (this.index === 2) {
          //专栏
          this.$store.dispatch(types.COLUMN_CATE).then(res => {
            if (res.code !== 0) return
            this.columnList = res.data
            pullScroll.finish(true);
          })
        }
      },
      //选择bar
      clickItem(key) {
        console.log(key)
        this.$store.commit('SET_INFORMATION_ACTIVE', key)
        this.index = key
        this.$store.dispatch(types.COLUMN_CATE).then(res => {
          if (res.code !== 0) return
          this.columnList = res.data
          console.log(res)
          // pullScroll.finish(true);
        })
        if (key == 0) {
          this.getBroadcastAd()
        }
          this.scroll.triggerRefresh();
      },
      //轮播图
      getBroadcastAd() {
        this.$store.dispatch(types.BROADCAST_AD).then(res => {
          console.log(res)
          this.broadcastAdList = res
        })
      },
      //新闻详情
      informationDetail(aid) {
        console.log(aid)
        this.$router.push({path: 'InformationDetail', query: {aid: aid}})
      },

      //快讯点评
      comment(item, val, key) {
        this.$store.dispatch(types.FLASH_COMMENT, {k_id: item.k_id, view: val}).then(res => {
          if (res.code !== 0) return
          if (val == 'duo') {
            this.flashList[key].duo = res.num
          } else {
            this.flashList[key].kong = res.num
          }
        })
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

  .swiper-pagination {
    top: 85%;
    left: 50%;
    transform: translate(-50%);
  }

  ::-webkit-scrollbar {
    display: none
  }

  .newTop {
    padding-top: 30px;
  }
  @media screen and (min-width: 415px) {
    .slider-img {
      height: 220px !important;
    }
    .c-list .c-list-box .c-item{
      width: 24%;
      height: 93px;
    }
  }
  @media screen and (max-width: 414px) {
    .slider-img {
      height: 220px;
    }
    .c-list .c-list-box .c-item{
      width: 93px;
      height: 93px;
    }
  }
  @media screen and (max-width: 413px)and (min-width: 375px){
    .c-list .c-list-box .c-item{
      width: 24%;
      height: 88px;
    }
  }


  @media screen and (max-width: 375px) {
    .slider-img {
      height: 198px;
    }
    .c-list .c-list-box .c-item{
      width: 32%;
      height: 110px;
    }
  }

  @media screen and (max-width: 350px) {
    .slider-img {
      height: 180px;
    }
    .c-list .c-list-box .c-item{
      width: 32%;
      height: 105px;
    }
  }
  @media screen and (max-width: 330px) {

    .c-list .c-list-box .c-item{
      width: 32%;
      height: 95px;
    }
  }
</style>