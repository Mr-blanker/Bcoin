<template>
    <div>
        <div class="market-tab ">
            <i class="icon iconfont icon-fanhui" @click="$router.go(-1)"></i>
            <div class="tab-contianer">
                <div>订单详情</div>
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
                    <span>收货地址:</span>
                    <span>{{order.user_addr}}</span>
                </div>
            </div>
            <div class="commodity-item">
                <div class="order-header">
                    <div>{{formatTime(order.createTime)}}</div>
                    <div>{{order.status_name}}</div>
                </div>
                <div class="order-main" v-for="(item,index) in order.items" :key="index">
                    <div><img :src="item.prd_img" alt=""></div>
                    <div>{{item.prd_name}}</div>
                    <div>x{{item.num}}</div>
                    <div>{{item.prd_point}}</div>
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
                <div class="order-footer" v-show="order.status==0">
                    <div class="cancle-btn" @click="cancleOrder(item.id)">取消订单</div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import utils from 'utility'
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
            formatTime(time) {
                return utils.YYYYMMDDHHmmss(time)
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
    .address-info {
        background-color: #fff;
        padding: 5px;
        font-size: 15px;
        .user-base {
            display: flex;
            justify-content: space-between;
            align-items: center;
            height: 30px;
        }
        .user-address {
            display: flex;
            justify-content: flex-start;
            align-items: center;
            height: 30px;
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
    .order-price {
        border-top: 1px solid #f3f3f3;
        &>div {
            display: flex;
            justify-content: space-between;
            height: 25px;
            align-items: center;
        }
    }
</style>