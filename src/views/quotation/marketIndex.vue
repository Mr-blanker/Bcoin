<template>
  <div>
    <sommonHeader></sommonHeader>
    <div class="coin-header flex flex-between">
      <div class="header-left">名称</div>
      <div class="header-right flex flex-between">
        <div>全球指数(￥)</div>
        <div>流通币值(￥)</div>
      </div>
    </div>
    <div class="market-container">
      <scroll></scroll>
    </div>
    <yd-popup v-model="show" position="left" width="80%">
            <yd-button type="danger" style="margin: 30px;" @click.native="show3 = false">Close Left Popup</yd-button>
        </yd-popup>
  </div>
</template>
<script>
  import {
    mapGetters,
    mapMutations,
    mapActions
  } from 'vuex'
  import scroll from '@/components/Scroll'
  import sommonHeader from '@/components/CommonHeader'
  export default {
    name: 'marketIndex',
    data() {
      return {
        activeTab: 1,
        tabName: ['综合', '币种', '平台'],
        show:false
      }
    },
    mounted() {
      // this.getCoinLists()
    },
    components: {
      scroll,
      sommonHeader
    },
    methods: {
      ...mapActions(['getCoinLists']),
      tabChange(index) {
        this.activeTab = index
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
  .coin-header {
    width: 100%;
    height: 28px;
    background-color: #fff;
    align-items: center;
    color: $fcolor;
    padding: 0 10px;
    .header-left {
      width: 40%;
      text-align: left;
    }
    .header-right {
      width: 60%;
      text-align: right;
    }
  }
  .flex {
    display: flex;
  }
  .flex-between {
    justify-content: space-between;
  }
  .tab-active {
    background-color: #1464cc;
  }
  .market-container {
    height: calc(100vh - 45px - 28px - 40px);
    overflow: auto;
  }
  .market-container::-webkit-scrollbar {
    display: none;
}
</style>