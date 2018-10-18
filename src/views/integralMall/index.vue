<template>
    <div>
        <div class="mall-header">
            <div class="integer-tab " style="position:relative;">
                <i class="icon iconfont icon-fanhui" @click="$router.go(-1)"></i>
                <div class="tab-contianer" style="position: absolute;top: 50%;left: 50%;transform: translate(-50%,-50%)">
                    <span v-for="(item,index) in tabName" :class="{'tab-active':activeTab==index+1}" :key="index" @click="tabChange(index+1)">{{item}}</span>
                </div>
                <yd-icon name="" size="20px" color="#fff" style="visibility:hidden;"></yd-icon>
            </div>
            <div class="tab-box">
                <van-tabs v-model="active" @click="vantTabClick" v-show="activeTab==1">
                    <van-tab v-for="(item,index) in status" :title="item" :key="index">
                    </van-tab>
                </van-tabs>
            </div>
        </div>
        <div class="pullScroll">
            <div id="scrollBox" class="mescroll" :style="{'top':activeTab==1?'1.6rem':'.94rem'}">
                <div style="margin-top: .02rem;">
                    <div class="commodity-item" v-for="(item,index) in prdList" :key="index" @click="$router.push(`/shopDetail?id=${item.id}&type=1&detailId=${detailId}`)" v-if="activeTab==1">
                        <div class="commodity-img">
                            <img :src="item.img" alt="">
                        </div>
                        <div class="commodity-name">
                            <p style="padding-right: 1rem;">{{item.name}}</p>
                            <div class="commodity-inter">
                                <div>当前积分：{{item.cur_point}}</div>
                            </div>
                        </div>
                        <i class="status" :class="{'status-ing':item.status===2}">{{item.status===1?'拍卖中':'已结束'}}</i>
                    </div>
                    <div class="commodity-item" v-for="(item,index) in prdList" :key="index" @click="$router.push(`/shopDetail?id=${item.id}&type=2`)" v-if="activeTab==2">
                        <div class="commodity-img">
                            <img :src="item.img" alt="">
                        </div>
                        <div class="commodity-name">
                            <p>{{item.name}}</p>
                            <div class="commodity-inter">
                                <div>换购积分：{{item.points}}</div>
                            </div>
                            <div class="commodity-inter">
                                <div>库存：{{item.stock}}</div>
                            </div>
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
                detailId: 0,
                imageURL: require('../../assets/logo.png'),
                tabName: ['竞拍', '换购'],
                status: ['全部', '未开始', '拍卖中', '已结束'],
                reqParam: {
                    type: 'auction',
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
                    console.log(res)
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
                console.log(index)
                this.detailId = index
                this.reqParam.status = index - 1                
                if (index == 0) {
                    delete this.reqParam.status
                    console.log(this.reqParam)
                }
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
    $fcolor: #acacac;
    $bg: #fff; //header   背景颜色   主色调
    .integer-tab {
        width: 100%;
        height: .9rem;
        padding: 0 .2rem;
        background-color: $bg;
        display: flex;
        align-items: center;
        justify-content: space-between;
        color: #acacac;
        .tab-contianer {
            height: .6rem;
            display: flex;
            align-items: center;
            color: #acacac;
            border-radius: .1rem;
            position: relative;
            font-size: .32rem;
            span {
                display: inline-block;
                display: flex;
                align-items: center;
                justify-content: center;
                color:#696772;
                width: 1.2rem;
                height: .56rem;
                cursor: pointer;
                font-size: .32rem;
            }
            &>span:after{
              content: "";
              width: 0.4rem;
              height: 4px;
              background:transparent;
              position: absolute;
              bottom: -0.22em;
        }
        }
        .save-text {
            color: #fff;
            font-size: .32rem;
        }
    }
    .commodity-item {
        position: relative;
        display: flex;
        background-color: #fff;
        justify-content: space-between;
        height: 1.8rem;
        padding: .2rem; // align-items: center;
        align-items: center;
        flex: 1;
        margin:.2rem;
        .commodity-img {
            img {
                width: 1.4rem;
                height: 1.4rem;
                display: flex;
                align-items: center;
                justify-content: center;
            }
        }
        .commodity-name {
            display: flex;
            flex-direction: column;
            align-items: start;
            flex: 1;
            padding-left: .2rem;
            color: #333;
            font-size: .32rem;
            overflow: hidden;
            height: 1.4rem;
            justify-content: space-between;
            p {
                line-height: 0.4rem;
                overflow: hidden;
                height: .35rem;
            }
        }
        .commodity-inter {
            font-size: .25rem;
            &>div:last-child {
                /*margin: .2rem 0 0 0;*/
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
      font-weight: bold;
      color: #333;
      &::after{
              content: "";
              width: 0.4rem;
              height: 4px;
              background: #208eda !important;
              position: absolute;
              bottom: -0.22em;
        }
  }
    .mescroll {
        position: fixed;
        top: 1.6rem;
        bottom: .9rem;
        height: auto;
    }
    .status {
        position: absolute;
        top: .2rem;
        right: .2rem;
        font-size: .28rem;
        color: #a09f9f;
    }
    .status-ing {
        color: #208de3 !important;
    }
</style>
