<template>
  <div>
    <div class="mall-header">
      <div class="market-tab ">
        <i class="icon iconfont icon-fanhui" @click="$router.go(-1)"></i>
        <div class="tab-contianer">
          <div>我的竞拍</div>
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
    <div class="pullScroll" >
      <div id="auctionScroll" class="mescroll">
        <div>
          <div class="commodity-item" v-for="(item,index) in prdList" :key="index">
            <div class="commodity-img">
              <img src="../../assets/logo.png" alt="">
            </div>
            <div class="commodity-name">{{item.name}}</div>
            <div class="commodity-inter">
              <div>当前积分</div>
              <div>{{item.cur_point}}</div>
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
    name: 'component_name',
    data() {
      return {
        imageURL: require('../../assets/logo.png'),
        tabName: ['竞拍', '换购'],
        status: ['全部', '拍卖中', '已结束'],
        reqParam: {
          status: '',
          len: 20
        },
        hgParam: {
          type: 'exchange',
          len: 20
        },
        prdList: [],
        scroll: '',
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
      this.scroll = new MeScroll("auctionScroll", {
        down: {
          callback: that.getData,
          
        },
        up: {
          callback: that.loadList,
          page: {
            num: 0,
            size: 10,
            time: null
          }
        }
      });
      this.vantTabClick(0)
    },
    methods: {
      ...mapActions(['USER_PRD_AUCTION']),
      getData() {
        if (this.activeTab == 1) {
          this.param = this.reqParam
        } else if (this.activeTab == 2) {
          this.param = this.hgParam
        }

        this.USER_PRD_AUCTION(this.param).then(res => {
          console.log(res)
          this.prdList = res.data.data
          this.totalCount = res.data.data.length
          this.scroll.endSuccess(res.data.data.length, this.totalCount >= this.param.len);
          if (this.totalCount < this.param.len)
            this.scroll.endUpScroll(true)

        })
      },
      tabChange(index) {
        this.activeTab = index
        this.scroll.triggerDownScroll()
      },
      vantTabClick(index) {
        this.reqParam.status = index
        if (index == 0) {
          delete this.reqParam.status
        }
        this.scroll.setPageNum(1);        
        this.scroll.triggerDownScroll()
      },
      loadList(page, mescroll) {
        if (this.activeTab == 1) {
          this.reqParam.len = 20*page.num
        } else if (this.activeTab == 2) {
          this.hgParam.len = 20*page.num
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
      & > div:last-child {
        margin: .2rem 0 0 0;
      }
    }
  }

  .mall-header {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    font-size: .32rem;
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
