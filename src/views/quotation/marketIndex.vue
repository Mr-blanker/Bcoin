<template>
  <div>
    <common-header :currentTab.sync="activeTab" :tabClick="tabIndexChange" :priceSort="sortTicker" :sortPlatForm="sortPlat" :currency="setCurrencyId" ref="commonHeader"></common-header>
    <scroll :mescroll.sync="meInstance" :scrollData="scrollList" :isChoiceType="isChoice" :downCb="getData" :upCb="getData" :currItem="currentItem" :scrollBoxShow="activeTab" ref="scroller">
    </scroll>
    <span class="add-box" @click="$router.push('manageUserChoice')" v-show="isChoice&&activeTab==1">
                          <i class="icon iconfont icon-tianjia"></i>
                </span>
  </div>
</template>
<script>
  import {
    mapGetters,
    mapMutations,
    mapActions
  } from 'vuex'
  import scroll from '@/components/Scroll'
  import commonHeader from '@/components/CommonHeader'
  import * as types from "../../store/mutations-type"
  export default {
    name: 'marketIndex',
    data() {
      return {
        activeTab: 1,
        scrollList: [],
        len: 0,
        cid: 1,
        eid: '',
        meInstance: '',
        isChoice: false,
        activeIndex: 0,
        totalCount: '',
        currentItem: [],
        asc: false,
        orderBy: '',
        isSortFlag: false,
        isTickerSort: false
      }
    },
    mounted() {},
    components: {
      scroll,
      commonHeader
    },
    computed: {
      ...mapGetters(['userInfo'])
    },
    methods: {
      ...mapActions(['TICKER_LIST', 'PLATFORM_LIST', 'LIST_BY_CID', 'COIN_LIST', 'LIST_BY_PLAT', 'CHOICE_LIST', 'SORT_TICKER', 'SORT_PLAT']),
      //综合排名排序
      sortTicker(orderBy = 'id', asc = true, isFromClick = false) {
        if (!this.isChoice) {
          if (isFromClick) {
            if (orderBy == 'market') {
              this.$refs.commonHeader.priceSortActiveMarket = true
              this.$refs.commonHeader.priceSortActive = false
            } else {
              this.$refs.commonHeader.priceSortActive = true
              this.$refs.commonHeader.priceSortActiveMarket = false
            }
            this.len = 20
            this.$refs.scroller.len = 20
            this.meInstance.scrollTo(0);
          }
          this.SORT_TICKER({
            len: (this.len / 20) - 1,
            asc,
            orderBy
          }).then(res => {
            if (this.len == 20) {
              this.scrollList = []
              this.scrollList = res.data.data
            } else {
              this.scrollList.push(...res.data.data)
            }
            this.totalCount = res.data.data.length
            this.meInstance.endSuccess(res.data.data.length, this.totalCount >= 20);
            if (this.totalCount < 20)
              this.meInstance.endUpScroll(true)
          })
        }
      },
      //综合排名排序
      sortPlat(orderBy = 'id', asc = true, isFromClick = false) {
        if (!this.isChoice) {
          if (isFromClick) {
            this.len = 20
            if (orderBy == 'zhan') {
              this.$refs.commonHeader.platSortActiveZhan = true
              this.$refs.commonHeader.platSortActive = false
            } else {
              this.$refs.commonHeader.platSortActiveZhan = false
              this.$refs.commonHeader.platSortActive = true
            }
            this.$refs.scroller.len = 20
            this.meInstance.scrollTo(0);
          }
          this.SORT_PLAT({
            len: (this.len / 20) - 1,
            cid: this.cid,
            asc,
            orderBy
          }).then(res => {
            if (this.len == 20) {
              this.scrollList = []
              this.scrollList = res.data.data
            } else {
              this.scrollList.push(...res.data.data)
            }
            this.totalCount = res.data.data.length
            this.meInstance.endSuccess(res.data.data.length, this.totalCount >= 20);
            if (this.totalCount < 20)
              this.meInstance.endUpScroll(true)
          })
        }
      },
      //获取币种
      getCoin() {
        this.COIN_LIST().then(res => {
          this.tabData = res.data.data
          this.tabIndex = 'symbol'
          this.tabData.unshift({
            "cid": -2,
            "id": "all",
            "name": "全部",
            "symbol": "全部"
          })
        })
      },
      //指定货币的各平台行情
      getListByCID() {
        let param = {
          cid: this.cid,
          len: this.len
        }
        this.LIST_BY_CID(param).then(res => {
          this.scrollList = []
          this.scrollList = res.data.data
          this.totalCount = res.data.data.length
          this.meInstance.endSuccess(res.data.data.length, this.totalCount >= this.len, 1000);
          if (this.totalCount < this.len)
            this.meInstance.endUpScroll(true)
        })
      },
      getUserChoice() {
        if (this.userInfo.name) {
          this.CHOICE_LIST({
            len: this.len
          }).then(res => {
            this.scrollList = []
            this.scrollList = res.data.data
            this.totalCount = res.data.data.length
            this.meInstance.endSuccess(res.data.data.length, this.totalCount >= this.len, 1000);
            if (this.totalCount < this.len)
              this.meInstance.endUpScroll(true)
          })
        } else {
          this.scrollList = []
          this.meInstance.endSuccess(0, true)
          this.meInstance.endUpScroll(true)
        }
      },
      //获取所有货币的综合行情
      getTicker() {
        this.TICKER_LIST({
          len: this.len
        }).then(res => {
          this.scrollList = []
          this.scrollList = res.data.data
          this.totalCount = res.data.data.length
          this.meInstance.endSuccess(res.data.data.length, this.totalCount >= this.len, 1000);
          if (this.totalCount < this.len)
            this.meInstance.endUpScroll(true)
        })
      },
      //获取所有交易平台
      getPlatform() {
        this.PLATFORM_LIST({
          len: this.len
        }).then(res => {
          this.tabData = res.data.data
          this.tabIndex = 'eid'
        })
      },
      //指定平台交易列表
      getListByPlat() {
        this.LIST_BY_PLAT({
          len: this.len,
          eid: this.eid
        }).then(res => {
          this.scrollList = []
          this.scrollList = res.data.data
          this.totalCount = res.data.data.length
          this.meInstance.endSuccess(res.data.data.length, this.totalCount >= this.len);
          if (this.totalCount < this.len)
            this.meInstance.endUpScroll(true)
        })
      },
      //滚动容器获取数据方法
      getData(increase = false, len, isdown = false) {
        if (increase) {
          this.len = len
        }
        if (isdown) {
          this.$refs.commonHeader.priceSortActive = false
          this.$refs.commonHeader.priceSortActiveMarket = false
          this.$refs.commonHeader.platSortActive = false
          this.$refs.commonHeader.platSortActiveZhan = false
        }
        if (this.activeTab == 1) {
          if (this.isChoice) {
            this.getUserChoice()
          } else {
            this.sortTicker()
          }
        } else if (this.activeTab == 2) {
          this.sortPlat()
        } else if (this.activeTab == 3) {
          this.getListByPlat()
        }
      },
      //初始化滚动条
      initScroll() {
        // this.meInstance.resetUpScroll()
        this.meInstance.setPageNum(1);
        this.meInstance.triggerDownScroll()
      },
      setCurrencyId(item) {
        console.log('this.currencyItem=>4444')
        console.log(item)
        console.log('this.currencyItem=>4444')
        this.currentItem = item
      },
      tabIndexChange(obj, isChoice = false, isTicker = false) {
        if (!isTicker) {
          if (obj.cid) {
            this.cid = obj.cid
          } else if (obj.eid) {
            this.eid = obj.eid
          }
        }
        console.log('isChoice')
        console.log(isChoice)
        this.isChoice = isChoice
        // document.documentElement.scrollTop = window.pageYOffset = document.body.scrollTop = 0
        this.meInstance.scrollTo(0);
        // setTimeout(() => {
        this.initScroll()
        // }, 1000)
      }
    }
  }
</script>
<style lang="scss" scoped>
  $fcolor: #8a8d99;
  $bg: #208de3; //header   背景颜色   主色
  .market-tab {
    width: 100%;
    height: .9rem;
    padding: 0 .2rem;
    background-color: $bg;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .tab-contianer {
      height: .5rem;
      display: flex;
      align-items: center;
      border: 1px solid #1464cc;
      color: #fff;
      border-radius: .1rem;
      span {
        display: inline-block;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 1rem;
        height: .46rem;
        cursor: pointer;
      }
      span:nth-child(2n) {
        border-left: 1px solid #1464cc;
        border-right: 1px solid #1464cc;
      }
    }
  }
  .flex {
    display: flex;
  }
  .flex-between {
    justify-content: space-between;
  }
  .market-container {
    height: calc(100vh - .9rem - .56rem - 1.5rem);
    overflow: auto;
  }
  .market-container::-webkit-scrollbar {
    display: none;
  }
  .add-box {
    width: .9rem;
    height: .9rem;
    background: #208de3;
    position: fixed;
    bottom: 2rem;
    right: .5rem;
    border: 0;
    border-radius: .8rem;
    i {
      color: #fff;
    }
    .van-tab {
      line-height: .72rem !important;
    }
    .van-tabs--line .van-tabs__wrap {
      height: .72rem !important;
    }
  }
  .mescroll {
    position: fixed;
    top: 2.1rem;
    bottom: .9rem !important;
    height: auto;
  }
</style>