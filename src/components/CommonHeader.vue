<template>
    <div>
        <div class="market-tab ">
            <yd-icon :name="leftIcon" size="20px" color="#fff" @click.native="show=true"></yd-icon>
            <div class="tab-contianer">
                <span v-for="(item,index) in tabName" :class="{'tab-active':activeTab==index+1}" :key="index" @click="tabChange(index+1)">{{item}}</span>
            </div>
            <yd-icon :name="rightIcon" size="20px" color="#fff"></yd-icon>
        </div>
        <div class="flex flex-m tab-box">
            <div style="width:92%">
                <van-tabs v-model="active" @click="vantTabClick">
                    <van-tab v-for="(item,index) in tabList" :title="item[tabKey]" :key="index">
                    </van-tab>
                </van-tabs>
            </div>
            <div style="width:8%" class="add-tab">
                <i class="icon iconfont icon-tianjia"></i>
            </div>
        </div>
        <div class="coin-header flex flex-between">
            <div class="header-left">名称</div>
            <div class="header-right flex flex-between">
                <div>最新价(￥)</div>
                <div v-show="activeTab==1">24H涨幅</div>
                <div v-show="activeTab==2||activeTab==3">占比</div>
            </div>
        </div>
        <div class="coin-header flex flex-between" v-show="false">
            <div>名称</div>
            <div>成交量</div>
        </div>
        <yd-popup v-model="show" position="left" width="80%">
            <yd-button type="danger" style="margin: 30px;" @click.native="show = false">Close Left Popup</yd-button>
        </yd-popup>
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
    export default {
        name: 'CommonHeader',
        data() {
            return {
                activeTab: 1,
                show: false,
                active: 0,
                tabList: '',
                tabKey: ''
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
                default: 'type'
            },
            rightIcon: {
                type: String,
                default: 'search'
            },
            tabClick: {
                type: Function,
                default: (index) => {
                    console.log(index + '被点击')
                }
            },
            scrollTabClick: {
                type: Function,
                default: (index) => {
                    console.log(index + '被点击')
                }
            }
        },
        mounted() {
            this.tabChange(1)
        },
        methods: {
            ...mapActions(['PLATFORM_LIST', 'COIN_LIST']),
            vantTabClick(index) {
                if (index == 0 && this.activeTab != 3) {
                    this.activeTab = 1
                    this.$emit('update:currentTab', 1)
                } else if (index >= 1 && this.activeTab != 3) {
                    this.activeTab = 2
                    this.$emit('update:currentTab', 2)
                }
                console.log('vantTabClick=>comeHome')
                if (this.activeTab == 1) {
                    this.tabClick(this.tabList[index], true)
                } else {
                    this.tabClick(this.tabList[index])
                }
            },
            tabChange(index) {
                this.activeTab = index
                this.$emit('update:currentTab', index)
                if (index == 1 || index == 2) {
                    this.getCoin()
                } else {
                    this.getPlatform()
                }
            },
            //获取币种
            getCoin() {
                this.COIN_LIST({
                    len: 20
                }).then(res => {
                    this.tabKey = 'symbol'
                    let tempArr = res.data.data
                    tempArr.unshift({
                        "cid": -2,
                        "id": "all",
                        "name": "全部",
                        "symbol": "全部"
                    })
                    this.tabList = tempArr
                    console.log('getCoin=>comeHome')                                
                    if (this.activeTab == 2) {
                        this.active = 1
                        this.vantTabClick(1)
                    } else {
                        this.active = 0
                        this.vantTabClick(0)
                    }
                })
            },
            //获取所有交易平台
            getPlatform() {
                this.PLATFORM_LIST({
                    len: 20
                }).then(res => {
                    this.tabKey = 'eid'
                    this.tabList = res.data.data
                    console.log('getPlatform=>comeHome')
                    this.active = 0
                    this.vantTabClick(0)
                })
            },
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
    .tab-active {
        background-color: #1464cc;
    }
    .coin-header {
        width: 100%;
        height: 28px;
        background-color: #fff;
        align-items: center;
        color: $fcolor;
        padding: 0 10px;
        .header-left {
            width: 50%;
            text-align: left;
        }
        .header-right {
            width: 50%;
            text-align: right;
            div {
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
        padding: 0 5px;
    }
    .add-tab {
        line-height: 28px;
    }
</style>