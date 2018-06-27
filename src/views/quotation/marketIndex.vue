<template>
  <div>
    <common-header :activeTab.sync="activeTab" :active.sync="active" :tabList="tabData" :tabKey="tabIndex" :tabClick="tabChange"></common-header>
    <div class="market-container">
      <scroll :mescroll.sync="meInstance" :scrollData="scrollList" :downCb="getData" :upCb="getData" :scrollBoxShow="activeTab" ref="scroller">
      </scroll>
    </div>
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
        active: 0,
        scrollList: '',
        len: 0,
        cid: 1,
        meInstance: '',
        tabData: '',
        tabIndex: 'symbol',
        eid: ''
      }
    },
    watch: {
      activeTab(index) {
        if (index == 3) {
          this.getPlatform()
        } else {
          this.getCoin()
        }
      },
      active(index) {
        if (index > 0 && this.activeTab != 3 && this.activeTab != 2) {
          this.activeTab = 2
        }
        if (this.activeTab == 3) {
          this.eid = this.tabData[index].eid
        } else {
          this.cid = this.tabData[index].cid
        }
        this.initScroll()
      }
    },
    mounted() {
      this.getCoin()
    },
    components: {
      scroll,
      commonHeader
    },
    methods: {
      ...mapActions(['TICKER_LIST', 'PLATFORM_LIST', 'LIST_BY_CID', 'COIN_LIST', 'LIST_BY_PLAT']),
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
      getListByCID() {
        let param = {
          cid: this.cid,
          len: this.len
        }
        this.LIST_BY_CID(param).then(res => {
          this.scrollList = res.data.data
          this.meInstance.endSuccess()
        }).catch(err => {
          this.meInstance.endErr()
        })
      },
      getTicker() {
        this.TICKER_LIST({
          len: this.len
        }).then(res => {
          this.scrollList = res.data.data
          this.meInstance.endSuccess()
        }).catch(err => {
          this.meInstance.endErr()
        })
      },
      getPlatform() {
        this.PLATFORM_LIST({
          len: this.len
        }).then(res => {
          this.tabData = res.data.data
          this.tabIndex = 'eid'
        })
      },
      getListByPlat() {
        this.LIST_BY_PLAT({
          len: this.len,
          eid: this.eid
        }).then(res => {
          this.scrollList = res.data.data
          this.meInstance.endSuccess()
        }).catch(err => {
          this.meInstance.endErr()
        })
      },
      getData(increase = false, len) {
        if (increase) {
          this.len = len
        }
        if (this.activeTab == 1) {
          this.getTicker()
        } else if (this.activeTab == 2) {
          this.getListByCID()
        } else if (this.activeTab == 3) {
          this.getListByPlat()
        }
      },
      tabChange(index) {
        this.activeTab = index
        this.len = 0
        this.initScroll()
      },
      initScroll() {
        this.meInstance.resetUpScroll()
        // this.meInstance.scrollTo(0, 0)
        this.meInstance.triggerDownScroll()
      }
    }
  }
</script>
<style lang="scss" scoped>
  $fcolor:#8a8d99;
  $bg: #208de3; //header   背景颜色   主色调
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
    height: calc(100vh - 45px - 28px - 40px);
    overflow: auto;
  }
  .market-container::-webkit-scrollbar {
    display: none;
  }
</style>