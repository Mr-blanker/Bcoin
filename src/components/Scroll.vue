<template>
  <div id="mescroll" class="mescroll">
    <div>
      <slot>
        <!--<div class="scroll-item flex" v-for="(item,index) in scrollData" :key="index" v-if="false">
                                  <div class="box-left">
                                    <div>
                                      <span class="coin-symbol">{{item.symbol}}</span>
                                      <span class="coin-name">{{item.name}}</span>
                                    </div>
                                    <div class="coin-issue">
                                      <span>发行总量:</span>
                                      <span>{{item['24h_volume_usd']|formatMoney}}</span>
                                    </div>
                                  </div>
                                  <div class="box-right flex flex-between">
                                    <div class="tr mark-box">
                                      <div class="mark-sum rise-color">42445.22</div>
                                      <div class="mark-percent">+5.30%</div>
                                    </div>
                                    <div class="tr circulation-box">
                                      <div class="circulation-sum fall-color">{{item.market_cap_cny|formatMoney}}</div>
                                      <div class="circulation-percent">+372亿</div>
                                    </div>
                                  </div>
                                </div>-->
        <div class="scroll-item flex flex-b" v-for="(item,index) in scrollData" :key="index" v-if="scrollBoxShow==1">
          <div class="box-left">
            <div>
              <span class="coin-symbol">{{item.symbol}}</span>
              <span class="coin-name">{{item.name}}</span>
            </div>
            <div class="coin-issue">
              <span>量/值:</span>
              <span>{{item['24h_volume_cny']|formatMoney}}/{{item.market_cap_cny|formatMoney}}</span>
            </div>
          </div>
          <div class="box-right flex flex-between">
            <div class="tr mark-box">
              <div class="mark-sum ">{{item.price_cny?item.price_cny.toPrecision(7):'-'}}</div>
              <div class="mark-percent">${{item.price_usd}}</div>
            </div>
            <div class="tr circulation-box">
              <div :class="{'percent-box':true,'percentrise-color':item.percent_change_24h>0,'percentfall-color':item.percent_change_24h<0}">{{item.percent_change_24h}}%</div>
            </div>
          </div>
        </div>
        <div class="scroll-item flex flex-b" v-for="(item,index) in scrollData" :key="index" v-if="scrollBoxShow==2">
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
              <div :class="{'percent-box':true,'percentrise-color':item.zhan>0,'percentfall-color':item.zhan<0}">{{item.zhan?item.zhan:'-'}}%</div>
            </div>
          </div>
        </div>
        <div class="scroll-item flex flex-b" v-for="(item,index) in scrollData" :key="index" v-if="scrollBoxShow==3">
          <div class="box-left">
            <div class="flex flex-m">
              <img :src="item.plogo" class="platform-icon">
              <span class="coin-symbol ml20">{{item.pname?item.pname:'-'}}</span>
            </div>
          </div>
          <div class="box-right tr">
            <div class="mark-sum">{{item.cheng?item.cheng:0|formatMoney}}</div>
          </div>
        </div>
      </slot>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'Scroll',
    data() {
      return {
        mescroll: ''
      }
    },
    watch: {
      mescroll(val) {
        this.$emit('update:mescroll', val)
      }
    },
    mounted() {
      this.mescroll = new MeScroll("mescroll", { //第一个参数"mescroll"对应上面布局结构div的id
        //如果您的下拉刷新是重置列表数据,那么down完全可以不用配置,具体用法参考第一个基础案例
        //解析: down.callback默认调用mescroll.resetUpScroll(),而resetUpScroll会将page.num=1,再触发up.callback
        down: {
          // htmlContent: '加载中...',
          callback: this.downCallback //下拉刷新的回调,别写成downCallback(),多了括号就自动执行方法了
        },
        up: {
          htmlLoading: '<p class="upwarp-progress mescroll-rotate"></p><p class="upwarp-tip">加载中..</p>',
          callback: this.upCallback, //上拉加载的回调
          isBounce: false, //如果您的项目是在iOS的微信,QQ,Safari等浏览器访问的,建议配置此项.解析(必读)
          page: {
            num: 0,
            size: 20,
            time: null
          }
        }
      });
    },
    methods: {
      upCallback(page) {
        let len = 20 * page.num
        this.upCb(true, len)
      },
      downCallback() {
        this.downCb()
      },
    },
    props: {
      scrollData: {
        type: Array
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
      }
    }
  }
</script>
<style lang="scss" scoped>
  $fcolor:#8a8d99;
  @mixin small-font {
    font-size: 12px;
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
    height: 55px;
    background-color: #fff;
    margin: 1px 0;
    padding: 0 10px;
    align-items: center;
    .box-left {
      width: 49%;
      align-items: center;
      margin: 0 1% 0 0;
      text-align: left;
      .coin-symbol {
        font-size: 16px;
        color: #323232;
        font-weight: 700;
      }
      .coin-name {
        font-size: 12px;
        color: $fcolor;
        @include small-font;
      }
      .coin-issue {
        color: $fcolor;
        @include small-font;
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
        font-size: 16px;
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
    width: 32px;
    vertical-align: middle;
  }
  .percent-box {
    width: 65px;
    height: 25px;
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
  }
  .percentfall-color {
    background-color: #32a853 !important;
  }
</style>