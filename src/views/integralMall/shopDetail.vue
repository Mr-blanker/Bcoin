<template>
    <div>
        <div class="shop-header">
            <div class="market-tab" style="position: relative;">
                <i class="icon iconfont icon-fanhui" @click="$router.go(-1)"></i>
                <div class="tab-contianer">
                    <div>{{detailData.name}}</div>
                </div>
                <yd-icon name="" size="20px" color="#fff" style="visibility:hidden;"></yd-icon>
            </div>
        </div>
        <div>
            <div class="shop-box">
                <div class="shop-img">
                    <img :src="detailData.img" alt="">
                </div>
                <div class="shop-base" v-if="type==1">
                    <div class="info-base">
                        <div class="shop-prices">当前拍得价格:<span>{{detailData.cur_point}}</span></div>
                        <div class="shop-state">当前状态:<span>{{detailData.status|formatStatus}}</span></div>
                    </div>
                </div>
                <div class="spec-info">
                    <div>
                        <span>规格:</span>
                        <span>{{detailData.spec}}</span>
                    </div>
                    <div>
                        <span>详情:</span>
                        <div v-html="detailData.descs" class="shop-desc"></div>
                    </div>
                </div>
                <div class="shop-detail" style="margin:.1rem 0 0 0;" v-if="type==1">
                    <yd-cell-group>
                        <yd-cell-item arrow>
                            <span slot="left">拍卖开始时间</span>
                            <span slot="right">{{formatTime(detailData.begin_time)}}</span>
                        </yd-cell-item>
                        <yd-cell-item arrow>
                            <span slot="left">拍卖结束时间</span>
                            <span slot="right">{{formatTime(detailData.end_time)}}</span>
                        </yd-cell-item>
                        <yd-cell-item arrow>
                            <span slot="left">当前拍得用户名称</span>
                            <span slot="right">{{detailData.cur_name}}</span>
                        </yd-cell-item>
                        <yd-cell-item arrow>
                            <span slot="left">拍卖积分递增步进</span>
                            <span slot="right">{{detailData.point_step}}</span>
                        </yd-cell-item>
                    </yd-cell-group>
                </div>
                <div class="footer" v-if="type==1 &&detailId!=3">
                    <div style="font-size: .28rem">
                        <span>加价幅度:</span>
                        <yd-spinner :min="detailData.point_step" :unit="detailData.point_step"
                                    v-model="point"></yd-spinner>
                    </div>
                    <div @click="auction">竞拍</div>
                </div>
                <div class="hg-footer" v-if="type==2">
                    <div @click="$router.push(`/createOrder?id=${detailData.id}&name=${detailData.name}`)">换购</div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import {
        mapGetters,
        mapMutations,
        mapActions
    } from 'vuex'
    import utils from 'utility'

    export default {
        name: 'shopDetail',
        data() {
            return {
                detailData: '',
                auctionParam: {
                    id: '',
                    point: ''
                },
                point: 50,
                id: '',
                type: 1,
                detailId: this.$route.query.detailId
            }
        },
        mounted() {
            console.log(this.detailId)
            this.id = this.$route.query.id
            this.type = this.$route.query.type
            this.auctionParam.id = this.$route.query.id
            this.init()
        },
        methods: {
            ...mapActions(['PRD_DETAIL', 'PRD_AUCTION',]),
            init() {
                this.PRD_DETAIL({
                    id: this.id
                }).then(res => {
                    this.detailData = res.data.data
                })
            },
            formatTime(time) {
                return utils.YYYYMMDDHHmmss(time)
            },
            auction() {
                this.auctionParam.point = this.point + this.detailData.cur_point
                this.PRD_AUCTION(this.auctionParam).then(res => {
                    this.$dialog.notify({
                        mes: res.data.msg || '竞拍成功',
                        timeout: 3000,
                        callback: () => {
                            this.init()
                        }
                    });
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
        height: .9rem;
        padding: 0 .2rem;
        background-color: $bg;
        display: flex;
        align-items: center;
        justify-content: space-between;
        color: #fff;
        .tab-contianer {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            height: .9rem;
            display: flex;
            align-items: center;
            flex-direction: column;
            justify-content: center;
            color: #fff;
            font-size: .35rem;
        }
        .save-text {
            color: #fff;
            font-size: .32rem;
        }
    }

    .shop-header {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
    }

    .shop-box {
        padding: .9rem 0 1.1rem 0;
        overflow: auto;
        .shop-img {
            background-color: #fff;
            img {
                display: inline-block;
                width: 100%;
                height: 4rem;
            }
        }
        .shop-base {
            background-color: #fff;
            padding: .1rem .26rem;
            text-align: left;
            .info-base {
                display: flex;
                justify-content: space-between;
                font-size: .3rem;
                .shop-prices,
                .shop-state {
                    & > span {
                        color: #a09f9f;
                    }
                }
            }
        }
    }

    .spec-info {
        font-size: .28rem;
        display: flex;
        flex-direction: column;
        background-color: #fff;
        margin: .1rem 0 0 0;
        padding: .1rem .26rem;
        align-items: flex-start;
        & > div {
            display: flex;
            height: .8rem;
            width: 100%;
            border-bottom: 1px solid #e4e4e4;
            align-items: center;
            &:last-child {
                border-bottom: 0;
            }
        }
    }

    .hg-footer {
        position: fixed;
        bottom: 0;
        left: 0;
        right: 0;
        z-index: 9999;
        display: flex;
        height: .9rem;
        background-color: #fff;
        justify-content: flex-end;
        align-items: center;
        border-top: 1px solid #eae8e8;
        & > div:first-child {
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
        & > div:first-child {
            display: flex;
            justify-content: space-between;
            align-items: center;
            & > span {
                margin: 0 .2rem 0 0;
            }
        }
        & > div:last-child {
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
</style>