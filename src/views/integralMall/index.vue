<template>
    <div>
        <div class="mall-header">
            <div class="market-tab ">
                <i class="icon iconfont icon-fanhui" @click="$router.go(-1)"></i>
                <div class="tab-contianer">
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
        <div class="pullScroll" :style="{'padding-top':activeTab==1?'75px':'47px','padding-bottom':'50px'}">
            <div id="scrollBox">
                <div class="commodity-item" v-for="(item,index) in prdList" :key="index" @click="$router.push(`/shopDetail?id=${item.id}&type=1`)" v-if="activeTab==1">
                    <div class="commodity-img">
                        <img src="../../assets/logo.png" alt="">
                    </div>
                    <div class="commodity-name">{{item.name}}</div>
                    <div class="commodity-inter">
                        <div>当前积分</div>
                        <div>{{item.cur_point}}</div>
                    </div>
                </div>
                <div class="commodity-item" v-for="(item,index) in prdList" :key="index" @click="$router.push(`/shopDetail?id=${item.id}&type=2`)" v-if="activeTab==2">
                    <div class="commodity-img">
                        <img src="../../assets/logo.png" alt="">
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
                activeTab: 1
            }
        },
        components: {
            'vanTabs': tabs,
            'vanTab': tab
        },
        mounted() {
            let that = this;
            this.shopScroll = new PullScroll("scrollBox", {
                refresh: function(pullScroll) {
                    that.getData(pullScroll)
                },
                loading: function(pullScroll) {
                    console.log('我被触发了')
                    that.loadMore(pullScroll);
                }
            });
            this.vantTabClick(0)
        },
        methods: {
            ...mapActions(['PRD_LIST']),
            getData(pullScroll) {
                let param
                if (this.activeTab == 1) {
                    param = this.reqParam
                } else if (this.activeTab == 2) {
                    param = this.hgParam
                }
                this.PRD_LIST(param).then(res => {
                    this.prdList = res.data.data
                    pullScroll.finish(false);
                })
            },
            tabChange(index) {
                this.activeTab = index
                this.shopScroll.triggerRefresh()
            },
            vantTabClick(index) {
                console.log(12345678)
                if (index == 0) {
                    delete this.reqParam.status
                }
                this.reqParam.status = index - 1
                this.shopScroll.triggerRefresh()
            },
            loadMore() {
                if (this.activeTab == 1) {
                    this.reqParam.len += 20
                } else if (this.activeTab == 2) {
                    this.hgParam.len += 20
                }
                this.getData()
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
        color: #fff;
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
        .save-text {
            color: #fff;
            font-size: 16px;
        }
    }
    .commodity-item {
        display: flex;
        background-color: #fff;
        justify-content: space-between;
        margin: 5px 0;
        height:60px;
        padding: 5px; // align-items: center;
        .commodity-img {
            img {
                display: block;
                width: 50px;
                height: 50px;
            }
        }
        .commodity-name {
            color: #333;
            width: 50%;
            font-size: 16px;
            max-height: 40px;
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
        }
        .commodity-inter {
            width: 30%;
            font-size: 16px;
            &>div:last-child {
                margin: 10px 0 0 0;
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
        padding: 75px 0 0 0;
    }
    .tab-active {
        background-color: #1464cc;
    }
</style>
