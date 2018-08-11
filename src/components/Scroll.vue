<template>
  <div id="quotationScroll" class="mescroll">
    <div>
      <div class="scroll-item flex flex-b" v-for="(item,index) in scrollData" :key="index" v-if="scrollBoxShow==1" @click="goTrend(item,1)">
        <div class="box-left">
          <div>
            <span class="coin-symbol">{{item.symbol}}</span>
            <span class="coin-name">{{item.name}}</span>
            <span class="coin-name" v-if="item.coin_name">{{item.coin_name}}</span>
          </div>
          <div class="coin-issue" v-if="item.name">
            <span>量/值:</span>
            <span>{{item['24h_volume_cny']|formatMoney}}/{{item.market_cap_cny|formatMoney}}</span>
          </div>
          <div class="coin-issue" v-if="item.cheng">
            <span>成交量:</span>
            <span>{{item.cheng|formatMoney}}</span>
          </div>
        </div>
        <div class="box-right flex flex-between">
          <div class="tr mark-box">
            <div class="mark-sum " v-if="item.price_cny">{{item.price_cny?item.price_cny.toPrecision(7):'-'}}</div>
            <div class="mark-sum " v-if="item.price">{{item.price?item.price.toPrecision(7):'-'}}</div>
            <div class="mark-percent">${{item.price_usd}}</div>
          </div>
          <div class="tr circulation-box">
            <div :class="{'percent-box':true,'percentrise-color':item.percent_change_24h>0,'percentfall-color':item.percent_change_24h<0}" v-if="item.percent_change_24h||item.percent_change_24h==0">{{item.percent_change_24h}}%
            </div>
            <div :class="{'percent-box':true,'percentrise-color':item.zhan>0,'percentfall-color':item.zhan<0}" v-if="item.zhan||item.zhan==0">{{item.zhan}}%
            </div>
          </div>
        </div>
      </div>
      <div class="scroll-item flex flex-b" v-for="(item,index) in scrollData" :key="index" v-if="scrollBoxShow==2" @click="goTrend(item,2)">
        <div class="box-left">
          <div>
            <span class="coin-symbol">{{item.name}}</span>
            <span class="coin-name">{{item.dui}}</span>
          </div>
          <div class="coin-issue" style="font-size: .26rem">
            <span>成交量:</span>
            <span>{{item.cheng|formatMoney}}</span>
          </div>
        </div>
        <div class="box-right flex flex-between">
          <div class="tr mark-box">
            <div class="mark-sum ">{{item.price?item.price.toPrecision(7):'-'}}</div>
            <div class="mark-percent">${{item.price_usd}}</div>
          </div>
          <div class="tr circulation-box">
            <div :class="{'percent-box':true,'percentrise-color':item.zhan>0,'percentfall-color':item.zhan<0}" style="font-size: .28rem !important;">{{item.zhan?item.zhan:'-'}}%
            </div>
          </div>
        </div>
      </div>
      <div class="scroll-item flex flex-b" v-for="(item,index) in scrollData" :key="index" v-if="scrollBoxShow==3" @click="goTrend(item,3)">
        <div class="box-left">
          <div>
            <span class="coin-symbol">{{item.name}}</span>
            <span class="coin-name">{{item.dui}}</span>
          </div>
          <div class="coin-issue">
            <span>成交量:</span>
            <span>{{item.cheng|formatMoney}}</span>
          </div>
        </div>
        <div class="box-right flex flex-between">
          <div class="tr mark-box">
            <div class="mark-sum ">{{item.price?item.price.toPrecision(7):'-'}}</div>
            <div class="mark-percent">${{item.price_usd}}</div>
          </div>
          <div class="tr circulation-box">
            <div :class="{'percent-box':true,'percentrise-color':item.zhang>0,'percentfall-color':item.zhang<0}">
              {{item.zhang?item.zhang:'-'}}%
            </div>
          </div>
        </div>
      </div>
      <!--  <div v-show="scrollData.length==0&&scrollBoxShow==1" class="add-choice" @click="userInfo.name? $router.push({path:'manageUserChoice'}): $router.push({path:'login'})">
                    <span> <i class="icon iconfont icon-tianjia"></i></span>
                    <div>点击添加自选</div>
            </div>-->
    </div>
  </div>
</template>
<script>
  import {
    mapGetters,
    mapMutations
  } from "vuex"
  export default {
    name: 'Scroll',
    data() {
      return {
        mescroll: '',
        len: 0,
        currencyItem: ''
      }
    },
    watch: {
      mescroll(val) {
        this.$emit('update:mescroll', val)
      }
    },
    computed: {
      ...mapGetters(['userInfo', 'scrollTop'])
    },
    mounted() {
      this.SET_SCROLL_BOX('quotationScroll')
      let that = this;
      this.mescroll = new MeScroll("quotationScroll", {
        down: {
          callback: that.downCallback,
          auto: false
        },
        up: {
          callback: that.upCallback,
          auto: false,
          htmlNodata: '<p class="upwarp-nodata">-- 没有更多数据了 --</p>'
        }
      });
      console.log(`this.scrollTop`)
      console.log(this.scrollTop)
      this.mescroll.scrollTo(this.scrollTop)
    },
    methods: {
      ...mapMutations(['SET_SCROLL_TOP', 'SET_SCROLL_BOX']),
      upCallback(page, mescroll) {
        console.log('page')
        console.log(page)
        this.len += 20
        this.upCb(true, this.len)
      },
      downCallback(page, mescroll) {
        this.len = 20
        this.upCb(true, this.len,true)
      },
      goTrend(item, index) {
        if (this.scrollBoxShow == 2) {
          console.log('this.currencyItem=>9999')
          console.log(this.currItem)
          console.log('this.currencyItem=>999')
          this.$router.push(`/trend?coin=${JSON.stringify(item)}&active=${index}&currencyItem=${JSON.stringify(this.currItem)}`)
        } else {
          this.$router.push(`/trend?coin=${JSON.stringify(item)}&active=${index}`)
        }
        let top = this.mescroll.getScrollTop()
        this.SET_SCROLL_TOP(top)
        this.SET_SCROLL_BOX('quotationScroll')
      }
    },
    props: {
      scrollData: {
        type: Array,
        default: () => []
      },
      isChoiceType: {
        type: Boolean,
        default: false
      },
      downCb: {
        type: Function
      },
      upCb: {
        type: Function
      },
      scrollBoxShow: {
        type: Number,
        default: 1
      },
      currItem:{
        type:Array,
        default:[]
      }
    }
  }
</script>
<style lang="scss" scoped>
  $fcolor: #8a8d99;
  @mixin small-font {
    font-size: .24rem;
    transform: scale(0.90);
    transform-origin: 0 0;
    -ms-transform: scale(0.90);
    /* IE 9 */
    -ms-transform-origin: 0 0;
    /* IE 9 */
    -webkit-transform: scale(0.90);
    /* Safari 和 Chrome */
    -webkit-transform-origin: 0 0;
    /* Safari 和 Chrome */
    -moz-transform: scale(0.90);
    /* Firefox */
    -moz-transform-origin: 0 0;
    /* Firefox */
    -o-transform: scale(0.90);
    /* Opera */
    -o-transform-origin: 0 0;
    /* Opera */
  }
  .scroll-item {
    height: 1.1rem;
    background-color: #fff;
    margin: 1px 0;
    padding: 0 .2rem;
    align-items: center;
    .box-left {
      width: 49%;
      align-items: center;
      margin: 0 1% 0 0;
      text-align: left;
      .coin-symbol {
        font-size: .32rem;
        color: #323232;
        font-weight: 700;
      }
      .coin-name {
        font-size: .26rem;
        color: $fcolor; //@include small-font;
      }
      .coin-issue {
        color: $fcolor; //@include small-font;
        font-size: .24rem;
      }
    }
    .box-right {
      width: 50%;
      text-align: right;
      .circulation-box,
      .mark-box {
        display: flex;
        width: 50%;
        justify-content: space-around;
        align-items: flex-end;
        flex-direction: column;
      }
      .circulation-sum,
      .mark-sum {
        font-size: .32rem;
        font-weight: bolder;
        color: #4a4a4a;
      }
      .circulation-percent,
      .mark-percent {
        color: $fcolor;
      }
    }
  }
  .platform-icon {
    display: inline-block;
    width: .64rem;
    vertical-align: middle;
  }
  .percent-box {
    width: 1.3rem;
    height: .5rem;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 3px;
    color: #fff;
    background-color: $fcolor;
  }
  .flex {
    display: flex;
  }
  .flex-between {
    justify-content: space-between;
  }
  .flex-c {
    justify-content: center;
  }
  .flex-col {
    flex-direction: column;
  }
  .flex-m {
    align-items: center;
  }
  .tr {
    text-align: right;
  }
  .mescroll::-webkit-scrollbar {
    display: none;
  }
  .rise-color {
    color: #eb4236 !important;
  }
  .fall-color {
    color: #32a853 !important;
  }
  .percentrise-color {
    background-color: #eb4236 !important;
    font-size: .28rem !important;
  }
  .percentfall-color {
    background-color: #32a853 !important;
  }
  #scroll::-webkit-scrollbar {
    display: none;
  }
  .add-choice {
    text-align: center;
    span {
      display: inline-block;
      margin: 2rem 0 .2rem 0;
      width: 2rem;
      height: 2rem;
      line-height: 2rem;
      border: 1px solid #b0d2ec;
      i {
        color: #208de3;
        font-size: .9rem;
      }
    }
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
  }
  .mescroll {
    position: fixed;
    top: 2.1rem;
    bottom: 1rem;
    height: auto;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
  }
</style>