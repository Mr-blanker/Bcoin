<template>
  <div class="header-box">
    <div class="market-tab " style="position:relative;">
      <div class="tab-contianer" style="position: absolute;top: 50%;left: 50%;transform: translate(-50%,-50%)">
        <span v-for="(item,index) in tabName" :class="{'tab-active':activeTab==index+1}" :key="index" @click="tabChange(index+1)">{{item}}</span>
      </div>
      <yd-icon :name="rightIcon" size="20px" color="#fff" style="visibility:hidden;"></yd-icon>
      <i class="icon iconfont icon-search" style="color:#696772" @click="$router.push('/searchCoin')"></i>
    </div>
    <div class="flex flex-m tab-box">
      <div style="width:92%">
        <van-tabs v-model="active" @click="vantTabClick">
          <van-tab v-for="(item,index) in tabList" :title="item[tabKey]" :key="index">
          </van-tab>
        </van-tabs>
      </div>
      <div style="width:8%" class="add-tab" @click="goTagManange">
        <i class="icon iconfont icon-round01"></i>
      </div>
    </div>
    <div class="coin-header flex flex-between">
      <div class="header-left">币种名称</div>
      <div class="header-right flex flex-between">
        <div class="new-price">
          <div class="price-tip">最新价(￥)</div>
          <div class="orderby-icon" v-if="activeTab==1&&active!=0" @click="sortByPrice('price')">
            <i class="icon iconfont icon-top" :class="{'active-color':!priceSortFlag&&priceSortActive}"></i>
            <i class="icon iconfont icon-down" :class="{'active-color':priceSortFlag&&priceSortActive}"></i>
          </div>
          <div class="orderby-icon" v-if="activeTab==2" @click="sortByPlat('price')">
            <i class="icon iconfont icon-top" :class="{'active-color':!platSortFlag&&platSortActive}"></i>
            <i class="icon iconfont icon-down" :class="{'active-color':platSortFlag&&platSortActive}"></i>
          </div>
        </div>
        <div v-show="activeTab==1" class="zhan-box">
          <div class="zhan-tip">24h涨幅</div>
          <div class="zhanorder-icon" v-if="active!=0" @click="sortByPrice('market')">
            <i class="icon iconfont icon-top" :class="{'active-color':!priceSortFlag&&priceSortActiveMarket}"></i>
            <i class="icon iconfont icon-down" :class="{'active-color':priceSortFlag&&priceSortActiveMarket}"></i>
          </div>
        </div>
        <div v-show="activeTab==2||activeTab==3" class="zhanbi-box">
          <div class="zhanbi-tip">占比</div>
          <div class="zhanobiorder-icon"  v-if="activeTab!==3" @click="sortByPlat('zhan')">
            <i class="icon iconfont icon-top" :class="{'active-color':!platSortFlag&&platSortActiveZhan}"></i>
            <i class="icon iconfont icon-down" :class="{'active-color':platSortFlag&&platSortActiveZhan}"></i>
          </div>
        </div>
      </div>
    </div>
    <div class="coin-header flex flex-between" v-show="false">
      <div>名称</div>
      <div>成交量</div>
    </div>
  </div>
</template>
<script>
  import {
    tabs,
    tab
  } from 'vant';
  import {
    mapActions
  } from 'vuex'
  import * as storage from '@/utils/storage'
  export default {
    name: 'CommonHeader',
    data() {
      return {
        activeTab: 1,
        show: false,
        active: 5,
        tabList: '',
        tabKey: '',
        priceSortFlag:false,
        platSortFlag:false,
        priceSortActive:false,
        platSortActive:false,
        priceSortActiveMarket:false,
        platSortActiveZhan:false,
        mult: [{
          "cid": -1,
          "id": "choice",
          "name": "自选",
          "symbol": "自选"
        }, {
          "cid": -2,
          "id": "all",
          "name": "全部",
          "symbol": "全部"
        }],
        plus: ''
      }
    },
    components: {
      'vanTabs': tabs,
      'vanTab': tab
    },
    props: {
      tabName: {
        type: Array,
        default: () => ['综合', '币种', '平台']
      },
      leftIcon: {
        type: String,
        default: 'icon iconfont icon-fanhui'
      },

      rightIcon: {
        type: String,
        default: 'search'
      },
      tabClick: {
        type: Function,
        default: (index) => {
          console.log(index + '被点击了！')
        }
      },
      currency: {
        type: Function,
        default: (id) => {
          console.log(id + 'id')
        }
      },
      scrollTabClick: {
        type: Function,
        default: (index) => {
          console.log(index + '被点击了！')
        }
      },
      priceSort:{
        type:Function,
        default:(type,isAsc,isfromClick)=>{
          console.log(type,isAsc,isfromClick)
        }
      },
      sortPlatForm:{
        type:Function,
        default:(type,isAsc,isfromClick)=>{
          console.log(type,isAsc,isfromClick)
        }
      }
    },
    mounted() {
      this.tabChange(1)
      let that = this
    },
    methods: {
      ...mapActions(['PLATFORM_LIST', 'COIN_LIST', 'CHOICE_LIST']),
      sortByPlat(type){
        console.log(111111111)
        this.sortPlatForm(type,this.platSortFlag,true)
        this.platSortFlag = !this.platSortFlag
      },
      sortByPrice(type){
        console.log(222)
        this.priceSort(type,this.priceSortFlag,true)
        this.priceSortFlag = !this.priceSortFlag        
      },
      goTagManange() {
        this.$router.push({
          path: '/tagManange',
          query: {
            index: this.activeTab,
          }
        })
      },
      vantTabClick(index) {
        this.active = index
        if ((index == 0 || index == 1) && this.activeTab != 3) {
          this.activeTab = 1
          this.$emit('update:currentTab', 1)
        } else if (index >= 2 && this.activeTab != 3) {
          this.activeTab = 2
          this.$emit('update:currentTab', 2)
        }
        if (this.activeTab == 1 && this.active == 0) {
          this.tabClick(this.tabList[index], true, false)
        } else if (this.activeTab == 1 && this.active == 1) {
          this.tabClick(this.tabList[index], false, true)
        } else {
          this.tabClick(this.tabList[index])
        }
        if (this.activeTab == 2) {
          this.currency(this.tabList[index])
        }
        console.log(' asdadadclick')
        console.log(this.active)
      },
      tabChange(index) {
        this.activeTab = index
        this.$emit('update:currentTab', index)
        if (index == 1) {
          this.getMult()
        } else if (index == 2) {
          this.getCoin()
        } else {
          this.getPlatform()
        }
      },
      //获取综合
      getMult() {
        let coin = JSON.parse(storage.getStore('coinTabList'))
        if (coin && this.activeTab == 1) {
          let tempArr = this.mult
          this.tabKey = 'symbol'
          tempArr.push(...coin)
          this.tabList = tempArr
          if (this.activeTab == 2) {
            this.active = 2
            this.vantTabClick(2)
          } else {
            this.active = 0
            this.vantTabClick(0)
          }
        } else {
          this.COIN_LIST({
            len: 20
          }).then(res => {
            this.tabKey = 'symbol'
            let tempArr = res.data.data
            tempArr.unshift(...this.mult)
            this.tabList = tempArr
            if (this.activeTab == 2) {
              this.active = 2
              this.vantTabClick(2)
            } else {
              this.active = 0
              this.vantTabClick(0)
            }
          })
        }
      },
      //获取币种
      getCoin() {
        let coin = JSON.parse(storage.getStore('coinTabList'))
        if (coin && this.activeTab == 2) {
          let tempArr = coin
          this.tabKey = 'symbol'
          tempArr.unshift(...this.mult)
          this.tabList = tempArr
          if (this.activeTab == 2) {
            this.active = 2
            this.vantTabClick(2)
          } else {
            this.active = 0
            this.vantTabClick(0)
          }
        } else {
          this.COIN_LIST({
            len: 20
          }).then(res => {
            this.tabKey = 'symbol'
            let tempArr = res.data.data
            tempArr.unshift(...this.mult)
            this.tabList = tempArr
            if (this.activeTab == 2) {
              this.active = 2
              this.vantTabClick(2)
            } else {
              this.active = 0
              this.vantTabClick(0)
            }
          })
        }
      },
      //获取所有交易平台
      getPlatform() {
        let platform = JSON.parse(storage.getStore('platformList'))
        if (platform && this.activeTab == 3) {
          this.tabKey = 'eid'
          this.tabList = platform
          this.active = 0
          this.vantTabClick(0)
        } else {
          this.PLATFORM_LIST({
            len: 20
          }).then(res => {
            this.tabKey = 'eid'
            this.tabList = res.data.data
            this.active = 0
            this.vantTabClick(0)
          })
        }
      }
    }
  }
</script>
<style lang="scss" scoped>
  $fcolor: #8a8d99;
  $bg: #fff; //header   背景颜色   主色�?
  .market-tab {
    width: 100%;
    height: .9rem;
    padding: 0 .2rem;
    background-color: $bg;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .tab-contianer {
      height: .6rem;
      display: flex;
      align-items: center;
      color: #696772;
      border-radius: 5px;
      span {
        display: inline-block;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 1.2rem;
        height: .56rem;
        cursor: pointer;
        font-size: .32rem;
        position: relative;
      }
      &>span:after{
              content: "";
              width: 0.4rem;
              height: 4px;
              background:transparent;
              position: absolute;
              left: 50%;
              bottom: -0.22em;
              margin-left: -0.2rem;
        }
    }
  }
  .tab-active {
      font-weight: bold;
      color: #333;
      &::after{
              content: "";
              width: 0.4rem;
              height: 4px;
              background: #208eda !important;
              position: absolute;
              left: 50%;
              bottom: -0.02em;
              margin-left: -0.2rem;
        }
  }
  .coin-header {
    width: 100%;
    padding: 0.15rem 0.4rem;
    margin:0.1rem 0 0;
    align-items: center;
    color: $fcolor;
    font-size: 0.2rem;
    .header-left {
      width: 50%;
      text-align: left;
    }
    .header-right {
      width: 50%;
      text-align: right;
      &>div {
        width: 50%;
      }
    }
  }
  .flex {
    display: flex;
  }
  .flex-between {
    justify-content: space-between;
  }
  .flex-m {
    align-items: center;
  }
  .tab-box {
    background-color: #fff;
    padding: 0 .1rem;
    border-bottom: 1px solid #e5e5e5;
  }
  .add-tab {
    line-height: .56rem;
  }
  .header-box {
    position: fixed;
    left: 0;
    top: 0;
    right: 0;
    z-index: 9999;
  }
  .van-tab {
    line-height: .72rem !important;
  }
  .van-tabs--line .van-tabs__wrap {
    height: .72rem !important;
  }
  .new-price {
    display: flex;
    height: .56rem;
    align-items: center;
    div[class="price-tip"] {
      width: 80%
    }
    .orderby-icon {
      width: 20%;
      &>i {
        display: block;
        line-height: .15rem;
        font-size:.34rem;
      }
    }
  }
  .zhan-box {
    display: flex;
    height: .56rem;
    align-items: center;
    div[class="zhan-tip"] {
      width: 80%
    }
    .zhanorder-icon {
      width: 20%;
      &>i {
        display: block;
        line-height: .15rem;
        font-size:.34rem;
      }
    }
  }
  .zhanbi-box {
    display: flex;
    height: .56rem;
    align-items: center;
    div[class="zhanbi-tip"] {
      width: 80%
    }
    .zhanobiorder-icon {
      width: 20%;
      &>i {
        display: block;
        line-height: .15rem;
      }
    }
  }
  .active-color {
    color:#208eda
  }
</style>