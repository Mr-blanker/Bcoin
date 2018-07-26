<template>
    <div>
        <Header v-bind="{left:1,centerValue:'选择地址',center:2}"></Header>
        <div class="address-box pt">
            <ul class="address-list">
                <li class="address-item" v-for="item in addressList" @click="checkAddress(item)">
                    <div class="address-main">
                        <div class="main-top">
                            <span class="name">{{item.name}}</span>
                            <span class="tel">{{item.phone}}</span>
                        </div>
                        <p class="main-text">
                            地址:{{item.detail}}</p>
                    </div>
                    <div class="address-operate">
                        <div class="recent" v-if="item.id===lastAddr">最近使用</div>
                        <div class="recent" v-else></div>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
    import * as types from "../../store/mutations-type"

    export default {
        name: "userAddressList",
        data() {
            return {
                addressList: [],
                lastAddr: '',
                orderId: ''
            }
        },
        mounted() {
            this.getAddressList()
            this.getLastAddr()
            this.orderId = this.$route.query.orderId
        },
        methods: {
            checkAddress(item) {
                this.$router.push(`/createOrder?address=${JSON.stringify(item)}&id=${this.orderId}`)
            },
            //最近使用地址
            getLastAddr() {
                this.$store.dispatch(types.USER_GETLASTADDR).then(res => {
                    if (res.code !== 0) return
                    console.log(res)
                    this.lastAddr = res.data.id
                })
            },
            //地址列表
            getAddressList() {
                this.$store.dispatch(types.USER_ADDRESSLIST).then(res => {
                    console.log(res)
                    if (res.code !== 0) return
                    this.addressList = res.data
                })
            }
        }
    }
</script>

<style scoped>

</style>