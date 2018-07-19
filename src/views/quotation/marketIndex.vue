<template>
  <div>
    <common-header :currentTab.sync="activeTab" :tabClick="tabIndexChange"></common-header>
    <scroll :mescroll.sync="meInstance" :scrollData="scrollList" :isChoiceType="isChoice" :downCb="getData" :upCb="getData" :scrollBoxShow="activeTab" ref="scroller">
    </scroll>
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
        activeIndex:0
      }
    },
    mounted() {},
    components: {
      scroll,
      commonHeader
    },
    methods: {
      ...mapActions(['TICKER_LIST', 'PLATFORM_LIST', 'LIST_BY_CID', 'COIN_LIST', 'LIST_BY_PLAT','CHOICE_LIST']),
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
          this.scrollList = res.data.data
          this.meInstance.finish(false);
        })
      },
      getUserChoice(){
        this.CHOICE_LIST({
          len: this.len
        }).then(res => {
          this.scrollList = res.data.data
          this.meInstance.finish(false);
        })
      },
      //获取所有货币的综合行情
      getTicker() {
        this.TICKER_LIST({
          len: this.len
        }).then(res => {
          this.scrollList = res.data.data
          this.meInstance.finish(false);
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
          this.scrollList = res.data.data
          this.meInstance.finish(false);
        })
      },
      //滚动容器获取数据方法
      getData(increase = false, len) {
        if (increase) {
          this.len = len
        }
        if (this.activeTab == 1) {
          if (this.isChoice) {
            this.getUserChoice()
          } else {
            this.getTicker()
          }
        } else if (this.activeTab == 2) {
          this.getListByCID()
        } else if (this.activeTab == 3) {
          this.getListByPlat()
        }
      },
      //初始化滚动条
      initScroll() {
        this.meInstance.triggerRefresh()
      },
      tabIndexChange(obj, isChoice = false, isTicker = false) {
        if (!isTicker) {
          if (obj.cid) {
            this.cid = obj.cid
          } else if (obj.eid) {
            this.eid = obj.eid
          }
        }
        if (isChoice) {
          console.log(1111111111)
        }
        this.isChoice = isChoice
        setTimeout(() => {
          this.initScroll()
        }, 10)
      }
    }
  }
</script>
<style lang="scss" scoped>
  $fcolor:#8a8d99;
  $bg: #208de3; //header   背景颜色   主色
  .market-tab {
    width: 100%;
    height: 45px;
    padding: 0 10px;
    background-color: $bg;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .tab-contianer {
      height: 25px;
      display: flex;
      align-items: center;
      border: 1px solid #1464cc;
      color: #fff;
      border-radius: 5px;
      span {
        display: inline-block;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 50px;
        height: 23px;
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
    height: calc(100vh - 45px - 28px - 75px);
    overflow: auto;
  }
  .market-container::-webkit-scrollbar {
    display: none;
  }
</style>