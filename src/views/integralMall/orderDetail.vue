<template>
    <div>
        <div class="market-tab " style="position: relative;">
            <i class="icon iconfont icon-fanhui" @click="$router.go(-1)"></i>
            <div class="tab-contianer" style="position: absolute;top: 50%;left: 50%;transform: translate(-50%,-50%)">
                <div style="font-size: .35rem">订单详情</div>
            </div>
            <yd-icon name="" size="20px" color="#fff" style="visibility:hidden;"></yd-icon>
        </div>
        <div>
            <div class="address-info">
                <div class="user-base">
                    <div>
                        <span>收货人:</span>
                        <span>{{order.user_name}}</span>
                    </div>
                    <div>{{order.user_phone}}</div>
                </div>
                <div class="user-address">
                    <span>收货地址：</span>
                    <span>{{order.user_addr}}</span>
                </div>
            </div>
            <div class="commodity-item">
                <div class="order-header">
                    <div>{{formatTime(order.createTime)}}</div>
                    <div>{{order.status_name}}</div>
                </div>
                <div class="order-main" v-for="(item,index) in order.items" :key="index">
                    <div style="height: 100%;"><img style="height: 100%;" :src="item.prd_img" alt=""></div>
                    <div class="order-item-right">
                        <div>{{item.prd_name}}</div>
                        <div>x{{item.num}}</div>
                        <div>{{item.prd_point}}</div>
                    </div>

                </div>
                <div class="order-price">
                    <div>
                        <span>快递公司</span>
                        <span>{{order.express_name}}</span>
                    </div>
                    <div>
                        <span>快递单号</span>
                        <span>{{order.express_num}}</span>
                    </div>
                    <div>
                        <span>订单总积分</span>
                        <span>{{order.point}}</span>
                    </div>
                </div>
                <div class="order-footer" v-show="order.status==0&&order.types==0">
                    <div class="cancle-btn" @click="cancleOrder(order.id)">取消订单</div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import utils from 'utility'
    import  {mapActions} from 'vuex'
    export default {
        name: 'orderDetail',
        data() {
            return {
                order: ''
            }
        },
        mounted() {
            this.order = JSON.parse(this.$route.query.order)
            console.log('order=>')
            console.dir(this.order)
        },
        methods: {
            ...mapActions([ 'CANCLE_ORDER']),
            formatTime(time) {
                return utils.YYYYMMDDHHmmss(time)
            },
            cancleOrder(id) {
                this.CANCLE_ORDER({
                    id
                }).then(res => {
                    if (res.data.code == 0) {
                        this.$dialog.toast({
                            mes: '取消成功！',
                            timeout: 1500,
                            icon: 'success',
                            callback: () => {
                                this.order.status = 2
                            }
                        });
                    }
                })
            }
        }
    }
</script>
<style lang="scss" scoped>
    $fcolor: #acacac;
    $bg: #fff; //header   背景颜色   主色调
    .market-tab {
        width: 100%;
        height: .9rem;
        padding: 0 .2rem;
        background-color: $bg;
        display: flex;
        align-items: center;
        justify-content: space-between;
        color: $fcolor;
        margin:0 0 .2rem;
        .tab-contianer {
            height: .9rem;
            display: flex;
            align-items: center;
            flex-direction: column;
            justify-content: center;
            color: $fcolor;
            font-size: .32rem;
        }
        .save-text {
            color: #fff;
            font-size: .32rem;
        }
    }

    .address-info {
        background-color: #fff;
        padding: .2rem;
        font-size: .3rem;
        .user-base {
            display: flex;
            justify-content: space-between;
            align-items: center;
            height: .6rem;
        }
        .user-address {
            display: flex;
            justify-content: flex-start;
            align-items: center;
            height: .6rem;
        }
    }

    .commodity-item {
        background-color: #fff;
        min-height: 1.6rem;
        margin: .2rem 0;
        border-radius: .04rem;
        padding: 0 .2rem;
        font-size: .28rem;
        .order-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: .2rem 0;
            border-bottom: 1px solid #f3f3f3;
        }
        .order-main {
            display: flex;
            align-items: center;
            padding: .1rem 0;
            height: 1.68rem;
            img {
                display: inline-block;
                width: 1.4rem;
                height: 1.4rem;
            }
        }
        .order-footer {
            height: .8rem;
            display: flex;
            justify-content: flex-end;
            align-items: center;
            .cancle-btn {
                border: 1px solid #eaeaea;
                padding: .05rem .1rem;
                border-radius: 3px;
            }
        }
    }

    .order-price {
        border-top: 1px solid #f3f3f3;
        margin-top: .2rem;
        & > div {
            display: flex;
            justify-content: space-between;
            height: .8rem;
            align-items: center;
            border-bottom: 1px solid #e4e4e4;
            &:last-child {
                /*border-bottom: 0;*/
            }
        }
    }

    .order-item-right {
        height: 100%;
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: flex-start;
        padding-left: .2rem;
    }
</style>