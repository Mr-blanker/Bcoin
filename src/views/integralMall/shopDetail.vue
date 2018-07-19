<template>
    <div>
        <div class="shop-header">
            <div class="market-tab ">
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
                <div class="shop-detail" style="margin:5px 0 0 0;" v-if="type==1">
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
                <div class="footer" v-if="type==1">
                    <div>
                        <span>加价幅度:</span>
                        <yd-spinner :min="detailData.point_step" :unit="detailData.point_step" v-model="point"></yd-spinner>
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
                type: 1
            }
        },
        mounted() {
            this.id = this.$route.query.id
            this.type = this.$route.query.type
            this.auctionParam.id = this.$route.query.id
            this.init()
        },
        methods: {
            ...mapActions(['PRD_DETAIL', 'PRD_AUCTION', ]),
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
            height: 45px;
            display: flex;
            align-items: center;
            flex-direction: column;
            justify-content: center;
            color: #fff;
            font-size: 16px;
        }
        .save-text {
            color: #fff;
            font-size: 16px;
        }
    }
    .shop-header {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
    }
    .shop-box {
        margin: 45px 0 0 0;
        padding: 0 0 55px 0;
        overflow: auto;
        .shop-img {
            background-color: #fff;
            img {
                display: inline-block;
                width: 100%;
                height: 200px;
            }
        }
        .shop-base {
            background-color: #fff;
            padding: 5px 13px;
            text-align: left;
            .info-base {
                display: flex;
                justify-content: space-between;
                font-size: 15px;
                .shop-prices,
                .shop-state {
                    &>span {
                        color: rgb(255, 80, 0);
                    }
                }
            }
        }
    }
    .spec-info {
        display: flex;
        flex-direction: column;
        background-color: #fff;
        margin: 5px 0 0 0;
        padding: 5px 13px;
        align-items: flex-start;
        &>div {
            display: flex;
        }
    }
    .hg-footer {
        position: fixed;
        bottom: 0;
        left: 0;
        right: 0;
        z-index: 9999;
        display: flex;
        height: 50px;
        background-color: #fff;
        justify-content: flex-end;
        align-items: center;
        border-top: 1px solid #eae8e8;
        &>div:first-child {
            width: 110px;
            height: 100%;
            text-align: center;
            line-height: 50px;
            border-radius: 0;
            font-size: 16px;
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
        height: 50px;
        background-color: #fff;
        justify-content: space-between;
        padding: 0 0 0 20px;
        align-items: center;
        border-top: 1px solid #eae8e8;
        &>div:first-child {
            display: flex;
            justify-content: space-between;
            align-items: center;
            &>span {
                margin: 0 10px 0 0;
            }
        }
        &>div:last-child {
            width: 110px;
            height: 100%;
            text-align: center;
            line-height: 50px;
            border-radius: 0;
            font-size: 16px;
            color: #fff;
            background-color: #f44;
        }
    }
</style>