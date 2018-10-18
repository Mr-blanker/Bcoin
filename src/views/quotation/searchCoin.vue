<template>
    <div>
        <div class="market-tab ">
            <i class="icon iconfont icon-fanhui" @click="$router.go(-1)" style="color:#acacac;"></i>
            <yd-search class="search-text" v-model="searchValue" @input="submitHandler" :on-submit="submitHandler" cancel-text="取消" :on-cancel="submitHandler"> </yd-search>
        </div>
        <div class="tag-container" id="searchScroll">
            <div class="tag-list">
                <!-- <div class="tag-item" v-for="(item,index) in searchData" :key="index" @click="addChoice(item)">
                                <div>平台:{{item.plt_name}}</div>
                                <div>币名:{{item.coin_name}}</div>
                        </div>-->
                <div class="scroll-item flex flex-between" v-for="(item,index) in searchData" :key="index" @click="goTrend(item)">
                    <div class="box-left">
                        <div>
                            <span class="coin-symbol">{{item.coin_name}}</span>
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
            </div>
            <div class="none-tip" v-if="searchData.length==0">
                <img class="tip-icon" :src="require('../../../static/images/blank.png')" alt="">
                <div>
                    您输入的关键字未能搜索到相关信息
                </div>
                <div>请重新搜索
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {
        mapActions,
        mapMutations
    } from 'vuex'
    import {
        Search
    } from 'vant';
    import * as storage from '@/utils/storage'
    export default {
        name: 'searchCoin',
        data() {
            return {
                searchValue: '',
                searchData: []
            }
        },
        mounted() {
            this.SET_SCROLL_BOX('searchScroll')
        },
        components: {
            'vanSearch': Search
        },
        methods: {
            ...mapActions(['SEARCH_CHOICE', 'ADD_CHOICE']),
            ...mapMutations(['SET_SCROLL_TOP', 'SET_SCROLL_BOX']),
            submitHandler() {
                this.SEARCH_CHOICE({
                    key: this.searchValue
                }).then(res => {
                    this.searchData = res.data.data
                })
            },
            goTrend(item) {
                this.SET_SCROLL_BOX('searchScroll')
                let top = document.getElementById('searchScroll').scrollTop
                this.SET_SCROLL_TOP(top)
                this.$router.push(`/trend?coin=${JSON.stringify(item)}&from=200`)
            }
        }
    }
</script>

<style lang="scss" scoped>
    $fcolor:#999;
    $bg: #fff; //header   背景颜色   主色调
    .market-tab {
        width: 100%;
        height: 1rem;
        padding: 0 .2rem;
        background-color: $bg;
        overflow: hidden;
        display: flex;
        align-items: center;
        justify-content: space-between;
        color: #acacac;
        .tab-contianer {
            height: .9rem;
            display: flex;
            align-items: center;
            flex-direction: column;
            justify-content: center;
            color: #acacac;
            font-size: .32rem;
        }
        .save-text {
            color: #acacac;
            font-size: .32rem;
        }
    }
    .tag-list {
        padding: 0 0 .6rem 0;
        &>div {
            padding: .2rem;
            display: flex;
            flex-wrap: wrap;
            margin:.2rem;
        }
    }
    .tag-container {
        height: calc(100vh - .9rem);
        background-color: #f8f8f8;
        overflow: auto;
        .tag-title {
            width: 100%;
            text-align: left;
            line-height: .7rem;
            font-size: .28rem;
            padding: 0 .2rem;
            border-bottom: 1px solid #e5e5e5;
        }
        .tag-item {
            min-width: 1.7rem;
            height: .7rem;
            border-bottom: 1px solid #d5d5d5;
            position: relative;
            margin: .14rem;
            .add-tag {
                width: 1.7rem;
                height: .7rem;
                text-align: center;
                line-height: .7rem;
                color: #dfdfdf;
                font-size: .9rem;
            }
            .tag-content {
                width: 1.7rem;
                height: .7rem;
                text-align: center;
                line-height: .7rem;
                color: #000;
                font-size: .32rem;
            }
        }
    }
    .active-tag {
        background-color: $bg !important;
        border-color: $bg !important;
        .tag-content {
            color: #fff !important;
        }
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
                font-size: .24rem;
                color: #333;
            }
            .coin-name {
                font-size: .2rem;
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
                font-size: .24rem;
                font-weight: 500;
                color: #333;
            }
            .circulation-percent,
            .mark-percent {
                font-size: .2rem;
                color: $fcolor;
            }
        }
    }
    .none-tip {
        margin: 40% 0 0;
    }
    .tip-icon {
        width: 4.2rem;
        height: 2.6rem;
        margin:0 auto;
    }
    .flex {
        display: flex;
    }
    .flex-between {
        justify-content: space-between;
    }
    .rise-color {
        color: #eb4236 !important;
    }
    .fall-color {
        color: #32a853 !important;
    }
    .percentrise-color {
        color:#eb4236 !important;
    }
    .percentfall-color {
         color: #32a853 !important;
    }
    .percent-box {
        width: 1.3rem;
        height: .5rem;
        display: flex;
        justify-content: center;
        font-size:.24rem;
        align-items: center;
        border-radius: 3px;
        color: #666;
    }
</style>