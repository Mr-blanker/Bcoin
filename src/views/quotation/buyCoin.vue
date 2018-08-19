<template>
    <div class="trend-box">
        <div class="market-tab ">
            <i class="icon iconfont icon-fanhui" @click="$router.go(-1)"></i>
            <div class="tab-contianer">
                <div>{{$route.query.coin_name}}</div>
            </div>
            <span style="visibility:hidden">刷新</span>
        </div>
        <div class="coin-desc">
            <yd-cell-group>
                <yd-cell-item>
                    <span slot="left">当前价格</span>
                    <span slot="right">{{$route.query.coin_price}}</span>
                </yd-cell-item>
                <yd-cell-item>
                    <span slot="left">购买数量</span>
                    <span slot="right">{{buyCount}}</span>
                </yd-cell-item>
            </yd-cell-group>
        </div>
        <div class="footer">
            <div style="font-size: .28rem">
                <span>数量:</span>
                <yd-spinner v-model="buyCount"></yd-spinner>
            </div>
            <div @click="buy">购买</div>
        </div>
    </div>
</template>
<script>
    import {
        mapActions
    } from 'vuex'
    import utils from 'utility'
    export default {
        name: 'buyCoin',
        data() {
            return {
                cid:this.$route.query.cid,
                buyCount:1,
                price:this.$route.query.coin_price
            }
        },
        mounted() {},
        methods: {
            ...mapActions(['BUY_COIN']),
            buy(){
                this.BUY_COIN({cid:this.cid,num:this.buyCount,price:this.price}).then(res=>{
                    if(res.data.code==0){
                        this.$dialog.toast({
                            mes: '购买成功！',
                            timeout: 1500,
                            icon: 'success',
                            callback: () => {
                                this.$router.go(-1)
                            }
                        });
                    }else {
                        this.$dialog.toast({
                            mes: '购买失败！',
                            timeout: 1500,
                            icon: 'error'
                        });
                    }
                })
            }
        }
    }
</script>
<style lang="scss" scoped>
    $fcolor:#8a8d99;
    $bg: #208de3; //header   背景颜色   主色调
    #myChart {
        background-color: #fff;
        margin: 1px 0 0 0;
    }
    @mixin small-font {
        font-size: .24rem;
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
    @mixin flex-center {
        display: flex;
        justify-content: center;
        align-items: center;
    }
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
            height: .9rem;
            display: flex;
            align-items: center;
            flex-direction: column;
            justify-content: center;
            color: #fff;
        }
    }
    .coin-info {
        width: 100%;
        height: 1.2rem;
        background-color: rgb(18, 123, 206);
        @include flex-center;
        color: #fff;
        font-size: .26rem;
        &>div {
            width: 50%;
            height: .8rem;
            display: flex;
            justify-content: space-around;
            align-items: flex-start;
            flex-direction: column;
            padding: 0 0 0 .2rem;
            .left-coin {
                display: flex;
                justify-content: flex-start;
                align-items: center;
                &>div {
                    display: flex;
                    justify-content: center;
                    align-items: flex-start;
                    flex-direction: column;
                    &>div:first-child {
                        margin: 0 .2rem 0 0;
                    }
                }
            }
        }
        &>div:first-child {
            border-right: 1px solid #d0d0fa;
        }
        &>div:last-child {
            flex-direction: row;
            &>div:first-child {
                display: flex;
                flex-direction: column;
                justify-content: flex-start;
                align-items: flex-start;
            }
        }
    }
    .date-check {
        display: flex;
        justify-content: space-between;
        align-items: center;
        &>div {
            background-color: #fff;
            height: .6rem;
            width: 50%;
            @include flex-center;
            span {
                width: 1rem;
            }
        }
    }
    .trend-box {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
    }
    .none-tip {
        background-color: #fff;
        font-size: .44rem;
        height: 20rem;
        padding: 2.5rem 0;
    }
    .sale-operation {
        &>div {
            width: 1rem;
            height: .4rem;
        }
    }
    .footer {
        position: fixed;
        bottom: 0;
        left: 0;
        right: 0;
        z-index: 9999;
        display: flex;
        height: 1rem;
        background-color: #fff;
        justify-content: space-between;
        padding: 0 0 0 .4rem;
        align-items: center;
        border-top: 1px solid #eae8e8;
        &>div:first-child {
            display: flex;
            justify-content: space-between;
            align-items: center;
            &>span {
                margin: 0 .2rem 0 0;
            }
        }
        &>div:last-child {
            width: 2.2rem;
            height: 100%;
            text-align: center;
            line-height: 1rem;
            border-radius: 0;
            font-size: .32rem;
            color: #fff;
            background-color: #f44;
        }
    }
    .coin-desc {
    }
</style>