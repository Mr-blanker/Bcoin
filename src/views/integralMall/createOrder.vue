<template>
    <div>
        <div class="market-tab ">
            <i class="icon iconfont icon-fanhui" @click="$router.go(-1)"></i>
            <div class="tab-contianer">
                <div>{{titleName}}</div>
            </div>
            <yd-icon name="" size="20px" color="#fff" style="visibility:hidden;"></yd-icon>
        </div>
        <div>
            <div class="address-box">
                <ul class="address-list">
                    <li class="address-item">
                        <div class="address-main">
                            <div class="main-top">
                                <span class="name">{{addressList.name}}</span>
                                <span class="tel">{{addressList.phone}}</span>
                            </div>
                            <p class="main-text">
                                地址：{{addressList.detail}}</p>
                        </div>
                        <div class="address-operate">
                            <div class="recent">最近使用</div>
                            <div @click="$router.push(`/userAddressList?orderId=${hgParam.id}`)">更换地址</div>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
        <!-- <div class="hg-footer">
                <div @click="createOrder">立即换购</div>
            </div> -->
        <footer class="addCurrency">
            <div @click="createOrder">
                <a class="btns" @click="goAddTag">
                                立即换购
                            </a>
            </div>
        </footer>
    </div>
</template>

<script>
    import * as types from "../../store/mutations-type"
    import {mapActions} from 'vuex'
    export default {
        name: 'createOrder',
        data() {
            return {
                addressList: '',
                hgParam: {
                    id: '',
                    addrID: ''
                },
                titleName: ''
            }
        },
        mounted() {
            this.getLastAddr()
            this.hgParam.id = this.$route.query.id
            this.titleName = this.$route.query.titleName
        },
        methods: {
            ...mapActions(['PRD_EXCHANGE']),
            //最近使用地址
            getLastAddr() {
                this.$store.dispatch(types.USER_GETLASTADDR).then(res => {
                    if (res.code !== 0) return
                    console.log(res)
                    this.addressList = res.data
                    if (this.$route.query.address) {
                        this.addressList = JSON.parse(this.$route.query.address)
                    }
                })
            },
            createOrder() {
                this.hgParam.addrID = this.addressList.id
                this.PRD_EXCHANGE(this.hgParam).then(res => {
                    if (res.data.code == 0) {
                        this.$dialog.toast({
                            mes: '换购成功！',
                            timeout: 1500,
                            icon: 'success',
                            callback: () => {
                                this.$router.replace('/mallIndex')
                            }
                        });
                    }
                })
            }
        }
    }
</script>

<style lang="scss" scoped>
    $fcolor:#acacac;
    $bg: #fff; //header   背景颜色   主色调
    .market-tab {
        width: 100%;
        height: .9rem;
        padding: 0 .2rem;
        background-color: $bg;
        display: flex;
        align-items: center;
        justify-content: space-between;
        color: #acacac;
        margin: 0 0 .2rem;
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
            color: #fff;
            font-size: .32rem;
        }
    }
    .hg-footer {
        position: fixed;
        bottom: 0;
        left: 0;
        right: 0;
        z-index: 9999;
        display: flex;
        height: 1rem;
        background-color: #fff;
        justify-content: flex-end;
        align-items: center;
        border-top: 1px solid #eae8e8;
        &>div:first-child {
            width: 100%;
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