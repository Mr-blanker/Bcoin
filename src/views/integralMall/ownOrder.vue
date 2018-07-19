<template>
  <div>
    <div class="mall-header clear-fixed">
      <div class="market-tab ">
        <i class="icon iconfont icon-fanhui" @click="$router.go(-1)"></i>
        <div class="tab-contianer">
          <div>我的订单</div>
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
    <div class="pullScroll" :style="{'padding-top':activeTab==1?'75px':'47px','padding-bottom':'50px'}">
      <div id="orderScroll">
        <div>
          <div class="commodity-item" v-for="(item,index) in prdList" :key="index"
               @click="$router.push(`/orderDetail?order=${JSON.stringify(item)}`)">
            <div class="order-header">
              <div>{{formatTime(item.createTime)}}</div>
              <div>{{item.status_name}}</div>
            </div>
            <div class="order-main" v-for="(item,index) in item.items" :key="index">
              <div><img src="../../assets/Penguins.jpg" alt=""></div>
              <div>{{item.prd_name}}</div>
              <div>x{{item.num}}</div>
              <div>{{item.prd_point}}</div>
            </div>
            <div class="order-footer" v-show="item.status==0">
              <div class="cancle-btn" @click="cancleOrder(item.id)">取消订单</div>
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
  import utils from 'utility'

  export default {
    name: 'component_name',
    data() {
      return {
        imageURL: require('../../assets/logo.png'),
        tabName: ['竞拍', '换购'],
        status: ['全部', '等待发货', '已完成', '用户取消', '管理员取消'],
        reqParam: {
          status: '',
          len: 20
        },
        prdList: [],
        scroll: '',
        active: '',
        activeTab: 1,
        totalCount: -1,
        param: {
          len: 0
        }
      }
    },
    components: {
      'vanTabs': tabs,
      'vanTab': tab
    },
    mounted() {
      let that = this;
      this.scroll = new MeScroll("orderScroll", {
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
      ...mapActions(['USER_ORDER_LIST', 'CANCLE_ORDER']),
      formatTime(time) {
        return utils.YYYYMMDDHHmmss(time)
      },
      getData() {
        this.param = this.reqParam
        this.USER_ORDER_LIST(this.param).then(res => {
          this.prdList = res.data.data
          this.totalCount = res.data.data.length
           this.scroll.endSuccess(res.data.data.length, this.totalCount >= this.param.len);
          if (this.totalCount < this.param.len)
            this.scroll.endUpScroll(true)
        })

      },
      vantTabClick(index) {
        this.reqParam.status = index - 1
        if (index == 0) {
          delete this.reqParam.status
        }
        this.scroll.setPageNum(1);
        this.scroll.triggerDownScroll()
      },
      loadList(page, mescroll) {
        this.reqParam.len = 20*page.num
        this.getData()
      },
      cancleOrder(id) {
        this.CANCLE_ORDER({
          id
        }).then(res => {
          if (res.data.code == 0) {
            this.$dialog.toast({
              mes: '换购成功！',
              timeout: 1500,
              icon: 'success',
              callback: () => {
                this.getData()
              }
            });
          }
        })
      }
    }
  }
</script>
<style lang="scss" scoped>
  $fcolor: #8a8d99;
  $bg: #208de3; //header   背景颜色   主色调
  .market-tab {
    width: 100%;
    height: 45px;
    padding: 0 10px;
    background-color: $bg;
    display: flex;
    align-items: center;
    justify-content: space-between;
    color: #fff;
    .save-text {
      color: #fff;
      font-size: 16px;
    }
  }

  .commodity-item {
    background-color: #fff;
    min-height: 80px;
    margin: 5px 2px;
    border-radius: 2px;
    padding: 5px;
    .order-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 2px 0;
      border-bottom: 1px solid #f3f3f3;
    }
    .order-main {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 5px 0;
      img {
        display: inline-block;
        width: 70px;
        height: 70px;
      }
    }
    .order-footer {
      border-top: 1px solid #f3f3f3;
      height: 30px;
      display: flex;
      justify-content: flex-end;
      align-items: center;
      .cancle-btn {
        border: 1px solid #eaeaea;
        padding: 2px 4px;
        border-radius: 3px;
      }
    }
  }

  .mall-header {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 999;
    font-size: 16px;
  }

  .clear-fixed:before, .clear-fixed:after {
    content: "";
    display: block;
    clear: both;
  }

  .prd-box {
    padding: 75px 0 0 0;
  }

  .tab-active {
    background-color: #1464cc;
  }
</style>
