<template>
    <div>
        <Header v-bind="{left:1,centerValue:'我的',center:2}"></Header>
        <!-- <div class="mine">
                <yd-cell-group>
                    <yd-cell-item>
                        <span slot="left">头像</span>
                        <span slot="right" class="avatar">
                      <img :src="userInfo.avatar" alt="" style="background-size: 100% 100% " v-if="userInfo.avatar">
                      <img src="../../assets/default_avatar_male.jpg" alt="" style="background-size: 100% 100% " v-else>
                    </span>
                    </yd-cell-item>
                    <yd-cell-item>
                        <span slot="left">昵称</span>
                        <span slot="right">{{userInfo.name}}</span>
                    </yd-cell-item>
                    <yd-cell-item arrow @click.native="$router.replace({path:'/updateUserInfo',query:{type:'phone',val:userInfo.phone}})">
                        <span slot="left">手机号码</span>
                        <span slot="right">{{userInfo.phone}}</span>
                    </yd-cell-item>
                    <yd-cell-item>
                        <span slot="left">积分</span>
                        <span slot="right">{{userInfo.jifen}}</span>
                    </yd-cell-item>
                    <yd-cell-item arrow @click.native="$router.replace({path:'/updateUserInfo',query:{type:'sex',val:userInfo.xingbie==1?'男':'女'}})">
                        <span slot="left">性别</span>
                        <span slot="right" v-if="userInfo.xingbie">{{userInfo.xingbie===1?'男':'女'}}</span>
                    </yd-cell-item>
                </yd-cell-group>
            </div> -->
        <main class="container main1">
            <div class="myIndex myInfo">
                <div>
                    <a href="javascript:void(0);" class="links avatar border1px">
                        <!-- <input type="file" id="upload" name="image"> -->
                        <div class="disLeft">
                            <span>
                                    头像
                                </span>
                        </div>
                        <div class="disRight">
                            <span>
                                     <img :src="userInfo.avatar" alt="" style="background-size: 100% 100% " v-if="userInfo.avatar">
                                    <img src="../../assets/default_avatar_male.jpg" alt="" style="background-size: 100% 100% " v-else>
                                </span>
                        </div>
                    </a>
                    <div class="loading" style="display:none;">
                        <div class="mask"></div>
                        <div class="content">
                            <i></i>
                            <p>图片上传中</p>
                        </div>
                    </div>
                    <a class="links border1px">
                        <div class="disLeft">
                            <span>
                                    昵称
                                </span>
                        </div>
                        <div class="disRight">
                            <span>
                                    {{userInfo.name}}
                                </span>
                            <span class="iconfont icon-arrow02">
                                </span>
                        </div>
                    </a>
                    <a class="links border1px" @click="$router.replace({path:'/updateUserInfo',query:{type:'sex',val:userInfo.xingbie==1?'男':'女'}})">
                        <div class="disLeft">
                            <span>
                                    性别
                                </span>
                        </div>
                        <div class="disRight">
                            <span>
                                    {{userInfo.xingbie===1?'男':'女'}}
                                </span>
                            <span class="iconfont icon-arrow02">
                                </span>
                        </div>
                    </a>
                    <a class="links">
                        <div class="disLeft">
                            <span>
                                    积分
                                </span>
                        </div>
                        <div class="disRight">
                            <span>
                                    {{userInfo.jifen}}
                                </span>
                        </div>
                    </a>
                </div>
                <div>
                </div>
                <div>
                    <a class="links border1px" @click="$router.replace({path:'/updateUserInfo',query:{type:'phone',val:userInfo.phone}})">
                        <div class="disLeft">
                            <span>
                                    手机
                                </span>
                        </div>
                        <div class="disRight">
                            <span>
                                    {{userInfo.phone}}
                                </span>
                            <span class="iconfont icon-arrow02">
                                </span>
                        </div>
                    </a>
                    <a  class="links">
                            <div class="disLeft">
                                <span>
                                    地址
                                </span>
                            </div>
                            <div class="disRight">
                                <span>
                                    {{lastAddr}}
                                </span>
                                <span class="iconfont icon-arrow02">
                                </span>
                            </div>
                        </a>
                </div>
            </div>
        </main>
    </div>
</template>

<script>
    import {
        mapGetters
    } from "vuex"
    import * as types from "../../store/mutations-type"
    export default {
        name: "personMessage",
        data(){
            return {
                lastAddr:''
            }
        },
        computed: {
            ...mapGetters(['userInfo'])
        },
        mounted(){
            this.getLastAddr()
        },
        methods: {
            //最近使用地址
            getLastAddr() {
                this.$store.dispatch(types.USER_GETLASTADDR).then(res => {
                    if (res.code !== 0) return
                    console.log(res)
                    this.lastAddr = res.data.detail
                })
            }
        }
    }
</script>

<style scoped>
    .yd-cell-item {
        height: .9rem !important;
    }
</style>
