<template>
  <div>
    <Header v-bind="{center:3,list:titleList,liKey:index}" @clickItem="clickItem"></Header>
    <div style="padding-top: 32px;padding-bottom:50px">
      <div class="new-box" v-if="index===0&&sIndex===0">
        <!--<ul class="new-bar">-->
        <!--<li class="new-bar-item " :class="{'new-bar-item-active':newCateId===0}"-->
        <!--@click="sIndex=0,chooseNewCate(0)">-->
        <!--全部-->
        <!--</li>-->
        <!--<li class="new-bar-item" v-for="item in newCateList"-->
        <!--:class="{'new-bar-item-active':newCateId===item.id}"-->
        <!--@click="sIndex=0,chooseNewCate(item.id)">-->
        <!--<span class="new-bar-item-content">{{item.name}}</span>-->
        <!--</li>-->
        <!--</ul>-->
      </div>
      <div id="newsScroll" class="mescroll">
        <div>
          <yd-slider autoplay="3000" v-if="index==0">
            <yd-slider-item v-for="(item,index) in broadcastAdList" :key="index">
              <!--<a :href="item.url" class="slider-img">-->
              <div style="height: 3.5rem;">
                <img :src="item.pic" style="height: 100%;" @click="sliderRouter(item.url)">
              </div>
            </yd-slider-item>
          </yd-slider>
          <div v-if="index===0&&newCateId===0">
            <ul class="all-list-box">
              <li @click="sIndex=0,chooseNewCate(0)" :class="{'all-list-box-active':sIndex===0}">头条</li>
              <li @click="sIndex=1,chooseNewCate(0)" :class="{'all-list-box-active':sIndex===1}">推荐</li>
              <li @click="sIndex=2,chooseNewCate(0)" :class="{'all-list-box-active':sIndex===2}">行情分析</li>
            </ul>
          </div>
          <!--新闻资讯-->
          <div v-if="index===0">
            <ul class="information-list">
              <li class="information-item" v-for="(item,key) in list" :key="key"
                  @click="informationDetail(item.aid)">
                <img :src="item.thumbnail" alt="">
                <div class="information-text">
                  <span>{{item.title}}</span>
                  <div class="bbb" v-if="sIndex===0">
                    <p>{{mo(item.t*1000)}}</p>
                    <p style="padding-left: .1rem;">{{item.befrom}}</p>
                    <p class="amount">{{item.n}}次浏览</p>
                  </div>
                  <div class="bbb" v-if="sIndex!==0">
                    <p class="amount" style="justify-content: start;">{{item.n}}次浏览</p>
                    <p class="amount">{{item.t*1000|moment('YYYY-MM-DD')}}</p>
                  </div>
                </div>
              </li>
            </ul>
          </div>
          <!--快讯-->
          <div class=" flash-list" v-if="index===1">
            <!--<div>-->
            <!--<div class="flash-item" v-for="(item,key) in flashList">-->
            <!--<p class="flash-time">{{item.k_time*1000|moment('MM-DD HH:mm')}}</p>-->
            <!--<p class="flash-content" v-html="item.k_content" @click="lookAllArt(key)" ref="artContent"></p>-->
            <!--<div class="flash-comment">-->
            <!--<span class="flash-duo" @click="comment(item,'duo',key)">看多（{{item.duo}}）</span>-->
            <!--<span class="flash-kong" @click="comment(item,'kong',key)">看空（{{item.kong}}）</span>-->
            <!--</div>-->
            <!--</div>-->
            <!--</div>-->
          </div>
          <!--名人库-->
          <div class="person-list" v-if="index===2">
            <div class="person-item" v-for="item in personList"
                 @click="goPersonDetail(item)">
              <div class="person-item-box">
                <div class="person-img"><img :src="item.thumbnail" alt=""></div>
                <span class="person-title">{{item.title}}</span>
                <span class="person-content">{{item.description}}</span>
              </div>
            </div>
          </div>
          <!--专栏-->
          <yd-accordion v-if="index===1">
            <yd-accordion-item :title="item.name" v-for="(item,index) in columnList" :key="index">
              <div class="c-list">
                <!-- <ul class="c-list-box" style="width: 100%;">
                        <yd-grids-group :rows="3" item-height="2.2rem">
                          <yd-grids-item v-for="(n,key) in item.items" :key="key" class="ccc" @click.native="$router.push({path:'acView',query:{val:JSON.stringify(n)}})">
                            <span slot="text">{{n.title}}</span>
                            <img slot="icon" :src="n.thumbnail" alt="">
                          </yd-grids-item>
                        </yd-grids-group>
                      </ul>-->
                <div class="special-item">
                  <div v-for="(n,key) in item.items" :key="key"
                       @click="$router.push({path:'acView',query:{val:JSON.stringify(n)}})">
                    <img :src="n.thumbnail" alt="">
                    <span
                      style="font-size: .25rem;height:.28rem;line-height: .3rem;overflow: hidden;">{{n.title}}</span>
                  </div>
                </div>
              </div>
            </yd-accordion-item>
          </yd-accordion>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import * as types from "../../store/mutations-type"
  import moment from 'moment'
  import {
    mapGetters,
    mapMutations
  } from "vuex"

  export default {
    name: "Information",
    data() {
      return {
        titleList: ['新闻资讯', '专栏', '名人库'],
        list: [],
        flashList: [],
        personList: [],
        columnList: [],
        columnCateList: [],
        index: 0,
        broadcastAdList: [],
        len: 1,
        flash: {
          flashLen: 0,
          flashCount: -1,
        },
        new: {
          newLen: 0,
          newCount: -1
        },
        person: {
          personLen: 0,
          personCount: -1
        },
        newCateList: [],
        newCateId: 0,
        plus: '',
        sIndex: 0
      }
    },
    computed: {
      ...mapGetters(['informationActive'])
    },
    updated() {
      console.log(this.sIndex)
    },
    mounted() {
      this.SET_SCROLL_BOX('newsScroll')
      let that = this;
      document.addEventListener('plusready', function () {
        that.plus = plus
      })
      this.getNewCate()
      if (this.informationActive) {
        this.index = parseInt(this.informationActive)
      }
      if (this.index == 0 && !this.broadcastAdList.length) {
        this.getBroadcastAd()
      }
      this.scroll = new MeScroll("newsScroll", {
        down: {
          callback: that.initDataList,
        },
        up: {
          callback: that.loadDataList,
          auto: false,
          page: {
            num: 0,
            size: 10,
            time: null
          },
          htmlNodata: '<p class="upwarp-nodata">-- 没有更多数据了 --</p>'
        }
      });
    },
    methods: {
      ...mapMutations(['SET_SCROLL_TOP', 'SET_SCROLL_BOX']),
      goPersonDetail(item) {
        this.$router.push({path: 'InformationDetail', query: {id: item.aid}})
        let top = this.scroll.getScrollTop()
        this.SET_SCROLL_TOP(top)
        this.SET_SCROLL_BOX('newsScroll')
      },
      sliderRouter(url) {
        console.log(url)
        this.plus.runtime.openURL(url, function (err) {
          console.log(err)
        })
      },
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
        this.scroll.scrollTo(0);
        this.newCateId = id
        this.scroll.triggerDownScroll();
      },
      initDataList(page, mescroll) {
        console.log(this.index)
        // // 重复请求处理
        // if (this.index === 1) {
        //   this.flashLen = 0
        // } else if (this.index === 0) {
        //   this.new.newLen = 0
        // } else if (this.index === 3) {
        //   this.personLen = 0
        // }
        if (this.index === 0) {
          this.new.newLen = 0
        }
        this.loadDataList(page, mescroll);
      },
      loadDataList(page, mescroll) {
        //快讯列表

        if (this.index === 0) {
          this.new.newLen += 20

          if (this.sIndex == 0) {
            //获取新闻资讯列表
            this.$store.dispatch(types.INFORMATION_LIST, {
              len: this.new.newLen,
              cateID: this.newCateId
            }).then(res => {
              console.log(res)
              if (res.code !== 0) return
              this.list = res.data
              this.new.newCount = res.data.length
              this.scroll.endSuccess(res.data.length, this.new.newCount >= this.new.newLen);
              if (this.new.newCount < this.new.newLen)
                this.scroll.endUpScroll(true)
            })
          } else if (this.sIndex == 1) {
            //专栏文章
            this.$store.dispatch(types.COLUMN_LIST, {len: this.new.newLen}).then(res => {
              console.log(res)
              if (res.code !== 0) return
              this.list = res.data
              this.new.newCount = res.data.length
              this.scroll.endSuccess(res.data.length, this.new.newCount >= this.new.newLen);
              if (this.new.newCount < this.new.newLen)
                this.scroll.endUpScroll(true)
            })
          } else {
            //行情分析
            this.$store.dispatch(types.COLUMN_MARKET, {
              len: this.new.newLen
            }).then(res => {
              console.log(res)
              if (res.code !== 0) return
              this.list = res.data
              this.new.newCount = res.data.length
              this.scroll.endSuccess(res.data.length, this.new.newCount >= this.new.newLen);
              if (this.new.newCount < this.new.newLen)
                this.scroll.endUpScroll(true)
            })
          }

        } else if (this.index === 2) {
          //名人库列表
          this.person.personLen += 20
          this.$store.dispatch(types.PERSON_LIST, {
            len: this.person.personLen
          }).then(res => {
            if (res.code !== 0) return
            this.personList = res.data
            this.person.personCount = res.data.length
            console.log(this.personLen, '名人')
            this.scroll.endSuccess(res.data.length, this.person.personCount >= this.person.personLen);
            if (this.person.personCount < this.person.personLen)
              this.scroll.endUpScroll(true)
          })
        } else if (this.index === 1) {
          this.$store.dispatch(types.COLUMN_CATE).then(res => {
            if (res.code !== 0) return
            this.columnList = res.data
            console.log('res')
            console.log(res)
            this.scroll.endSuccess()
            this.scroll.endUpScroll(true)
          })
        }
      },
      //选择bar
      clickItem(key) {
        console.log(key)
        this.$store.commit('SET_INFORMATION_ACTIVE', key)
        this.index = key
        if (key == 0 && !this.broadcastAdList.length) {
          this.getBroadcastAd()
        }
        console.log(1)
        this.scroll.scrollTo(0);
        this.scroll.triggerDownScroll();
      },
      //轮播图
      getBroadcastAd() {
        this.$store.dispatch(types.BROADCAST_AD).then(res => {
          this.broadcastAdList = res
        })
      },
      //新闻详情
      informationDetail(aid) {
        console.log(aid)
        if (this.sIndex === 0) {
          this.$router.push({
            path: 'InformationDetail',
            query: {
              aid: aid
            }
          })
        } else if (this.sIndex === 1) {
          this.$router.push({
            path: 'InformationDetail',
            query: {
              wid: aid
            }
          })
        } else {
          this.$router.push({
            path: 'InformationDetail',
            query: {
              wid: aid
            }
          })
        }

        let top = this.scroll.getScrollTop()
        this.SET_SCROLL_TOP(top)
        this.SET_SCROLL_BOX('newsScroll')
      },

      //时间转换
      mo(val) {
        return moment(moment(val).format('YYYYMMDDHHmmss'), "YYYYMMDD-HH:mm:ss").fromNow()
      },
      //查看全部
      lookAllArt(key) {
        if (this.$refs.artContent[key].style.display == '' || this.$refs.artContent[key].style.display == '-webkit-box') {
          this.$refs.artContent[key].style.display = 'flex'
        } else {
          this.$refs.artContent[key].style.display = '-webkit-box'
        }
      }
    }
  }
</script>

<style scoped lang="scss">
  ::-webkit-scrollbar {
    display: none
  }

  .ccc {
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    span {
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 1;
      overflow: hidden;
    }
    img {
      height: 1rem;
      width: 1rem;
      border-radius: 1rem;
    }
  }

  .mescroll {
    position: fixed;
    top: .9rem;
    bottom: .9rem;
    height: auto;
  }

  .special-item {
    display: flex;
    flex-wrap: wrap;
    border-left: 1px solid #d9d9d9;
    & > div {
      display: flex;
      width: 33.3333%;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      border-bottom: 1px solid #d9d9d9;
      border-right: 1px solid #d9d9d9;
      height: 2.2rem;
      img {
        width: 1rem;
        height: 1rem;
        border-radius: 100%;
        margin: 0 0 .3rem 0;
      }
    }

  }

  .amount {
    flex: 1;
    display: flex;
    justify-content: flex-end;
  }

  .bbb {
    color: #a2a2a2;
    display: flex !important;
    flex-direction: row !important;
    justify-content: start !important;
    align-items: flex-end;
  }

  .all-list-box {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: .8rem;
    font-size: .28rem;
    background: #fff;
    color: #333;
    margin-bottom: .2rem;
    li {
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: center;
      height: 100%;
      border-right: 1px solid #ddd;
      &:last-child {
        border-right: 0;
      }
    }
  }

  .all-list-box-active {
    color: #208de3;

  }

  .ipt {
    padding-top: .72rem;
  }
</style>
