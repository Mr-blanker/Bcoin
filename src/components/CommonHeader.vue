<template>
    <div>
        <div class="market-tab ">
            <yd-icon :name="leftIcon" size="20px" color="#fff" @click.native="show=true"></yd-icon>
            <div class="tab-contianer">
                <span v-for="(item,index) in tabName" :class="{'tab-active':activeTab==index+1}" :key="index" @click="tabChange(index+1)">{{item}}</span>
            </div>
            <yd-icon :name="rightIcon" size="20px" color="#fff"></yd-icon>
        </div>
        <van-tabs v-model="active" @click="onClick" v-show="activeTab==1||activeTab==2">
            <van-tab v-for="(item,index) in tabList" :title="item.symbol" :key="index">
            </van-tab>
        </van-tabs>
        <div class="coin-header flex flex-between" v-show="activeTab==1||activeTab==2">
            <div class="header-left">名称</div>
            <div class="header-right flex flex-between">
                <div>最新价(￥)</div>
                <div v-show="activeTab==1">24H涨幅</div>
                <div v-show="activeTab==2">占比</div>
            </div>
        </div>
        <div class="coin-header flex flex-between" v-show="activeTab==3">
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
            }
        },
        mounted() {},
        watch: {
            activeTab(val) {
                this.$emit('update:activeTab', val)
            }
        },
        methods: {
            tabChange(index) {
                this.activeTab = index
                this.tabClick(index)
                if (index == 1) {
                    this.active = 0
                }
                if (index == 2) {
                    this.onClick(1)
                }
            },
            onClick(index) {
                this.active = index
                this.scrollTabClick(index)
                if (index > 0) {
                    this.activeTab = 2
                } 
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
            },
            tabList: {
                type: Array,
                default: () => []
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
</style>