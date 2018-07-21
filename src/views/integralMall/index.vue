<template>
  <div>
    <div class="mall-header">
      <div class="market-tab " style="position:relative;">
        <i class="icon iconfont icon-fanhui" @click="$router.go(-1)"></i>
        <div class="tab-contianer" style="position: absolute;top: 50%;left: 50%;transform: translate(-50%,-50%)">
          <span v-for="(item,index) in tabName" :class="{'tab-active':activeTab==index+1}" :key="index" @click="tabChange(index+1)">{{item}}</span>
        </div>
        <yd-icon name="" size="20px" color="#fff" style="visibility:hidden;"></yd-icon>
      </div>
      <div>
        <van-tabs v-model="active" @click="vantTabClick" v-show="activeTab==1">
          <van-tab v-for="(item,index) in status" :title="item" :key="index">
          </van-tab>
        </van-tabs>
      </div>
    </div>
    <div class="pullScroll">
      <div id="scrollBox" class="mescroll" :style="{'top':activeTab==1?'1.45rem':'.94rem'}">
        <div>
          <div class="commodity-item" v-for="(item,index) in prdList" :key="index" @click="$router.push(`/shopDetail?id=${item.id}&type=1`)" v-if="activeTab==1">
            <div class="commodity-img">
              <img :src="item.img" alt="">
            </div>
            <div class="commodity-name">{{item.name}}</div>
            <div class="commodity-inter">
              <div>当前积分</div>
              <div>{{item.cur_point}}</div>
            </div>
          </div>
          <div class="commodity-item" v-for="(item,index) in prdList" :key="index" @click="$router.push(`/shopDetail?id=${item.id}&type=2`)" v-if="activeTab==2">
            <div class="commodity-img">
              <img :src="item.img" alt="">
            </div>
            <div class="commodity-name">{{item.name}}</div>
            <div class="commodity-inter">
              <div>换购积分</div>
              <div>{{item.points}}</div>
            </div>
            <div class="commodity-inter">
              <div>库存</div>
              <div>x{{item.stock}}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import {
    tabs,
    tab
  } from 'vant';
  import {
    mapGetters,
    mapMutations,
    mapActions
  } from 'vuex'
  export default {
    name: 'index',
    data() {
      return {
        imageURL: require('../../assets/logo.png'),
        tabName: ['竞拍', '换购'],
        status: ['全部', '未开始', '拍卖中', '已结束'],
        reqParam: {
          type: 'auction',
          status: '',
          len: 20
        },
        hgParam: {
          type: 'exchange',
          len: 20
        },
        prdList: [],
        shopScroll: '',
        active: '',
        activeTab: 1,
        totalCount: -1,
        param: 0
      }
    },
    components: {
      'vanTabs': tabs,
      'vanTab': tab
    },
    mounted() {
      let that = this;
      this.shopScroll = new MeScroll("scrollBox", {
        down: {
          callback: that.getData
        },
        up: {
          callback: that.loadMore,
          page: {
            num: 0,
            size: 10,
            time: null
          }
        }
      });
      // this.vantTabClick(0)
    },
    methods: {
      ...mapActions(['PRD_LIST']),
      getData(page, mescroll) {
        if (this.activeTab == 1) {
          this.param = this.reqParam
        } else if (this.activeTab == 2) {
          this.param = this.hgParam
        }
        this.PRD_LIST(this.param).then(res => {
          this.prdList = res.data.data
          this.totalCount = res.data.data.length
          this.shopScroll.endSuccess(res.data.data.length, this.totalCount >= this.param.len);
          if (this.totalCount < this.param.len)
            this.shopScroll.endUpScroll(true)
        })
      },
      tabChange(index) {
        this.activeTab = index
        this.shopScroll.setPageNum(1);
        this.shopScroll.triggerDownScroll()
      },
      vantTabClick(index) {
        if (index == 0) {
          delete this.reqParam.status
        }
        this.reqParam.status = index - 1
        this.shopScroll.triggerDownScroll()
      },
      loadMore(page, mescroll) {
        if (this.activeTab == 1) {
          this.reqParam.len = page.num * 20
        } else if (this.activeTab == 2) {
          this.hgParam.len = page.num * 20
        }
        this.getData()
      }
    }
  }
</script>
<style lang="scss" scoped>
  $fcolor: #8a8d99;
  $bg: #208de3; //header   背景颜色   主色调
  .market-tab {
    width: 100%;
    height: .9rem;
    padding: 0 .2rem;
    background-color: $bg;
    display: flex;
    align-items: center;
    justify-content: space-between;
    color: #fff;
    .tab-contianer {
      height: .6rem;
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
        width: 1.2rem;
        height: .56rem;
        cursor: pointer;
        font-size: .28rem;
      }
      span:nth-child(2n) {
        border-left: 1px solid #1464cc;
        border-right: 1px solid #1464cc;
      }
    }
    .save-text {
      color: #fff;
      font-size: .32rem;
    }
  }
  .commodity-item {
    display: flex;
    background-color: #fff;
    justify-content: space-between;
    margin: .1rem 0;
    height: 1.2rem;
    padding: .1rem; // align-items: center;
    .commodity-img {
      img {
        display: block;
        width: 1rem;
        height: 1rem;
      }
    }
    .commodity-name {
      color: #333;
      width: 50%;
      font-size: .32rem;
      max-height: .8rem;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
    }
    .commodity-inter {
      width: 30%;
      font-size: .32rem;
      &>div:last-child {
        margin: .2rem 0 0 0;
      }
    }
  }
  .mall-header {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
  }
  .prd-box {
    padding: 1.5rem 0 0 0;
  }
  .tab-active {
    background-color: #1464cc;
  }
  .mescroll {
    position: fixed;
    top: 1.45rem;
    bottom: 1rem;
    height: auto;
  }
</style>
