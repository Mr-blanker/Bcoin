<template>
    <div>
        <div class="market-tab ">
            <i class="icon iconfont icon-fanhui" @click="$router.push('/marketIndex')"></i>
            <div class="tab-contianer">
                <div>自选管理</div>
            </div>
            <div :class="{'save-text':true,'is-hidden':true}" style="color:#208eda" @click="$router.go(-2)">保存</div>
        </div>
        <div class="tag-container">
            <div class="tag-list">
                <!-- <div class="tag-item" v-for="(item,index) in choiceList" :key="index">
                    <span @click="delTag(item)">X</span>
                    <div class="tag-content">{{item.coin_name}}</div>
                </div> -->
                <main class="container main1">
                    <div class="quoteEdit">
                        <ul class="quoteEdit_list clearfix">
                            <li class="item current" v-for="(item,index) in choiceList" :key="index">
                                <span class="name limit">
                                    {{item.coin_name}}
                                </span>
                                <span class="delete-tip" @click="delTag(item)">
                                </span>
                            </li>
                        </ul>
                    </div>
                </main>
                <!-- <div class="tag-item" @click="userInfo.name?$router.push('/addChoice'):$router.push('/login')">
                    <div class="add-tag">+</div>
                </div> -->
            </div>
        </div>
        <footer class="addCurrency">
                    <div @click="userInfo.name?$router.push('/addChoice'):$router.push('/login')">
                        <a class="btns" @click="goAddTag">
                            添加币种
                        </a>
                    </div>
                </footer>
    </div>
</template>
<script>
    import * as storage from '@/utils/storage'
    import {
        mapGetters,
        mapMutations,
        mapActions
    } from 'vuex'
    export default {
        name: 'manangeUserChoice',
        data() {
            return {
                userChoice: []
            }
        },
        computed: {
            choiceList() {
                return this.userChoice
            },
            ...mapGetters(['userInfo'])
        },
        methods: {
            ...mapActions(['CHOICE_LIST', 'DEL_CHOICE']),
            init() {
                if (this.userInfo.name) {
                    this.CHOICE_LIST().then(res => {
                        this.userChoice = res.data.data
                    })
                }
            },
            delTag(item) {
                this.DEL_CHOICE({
                    id: item.id
                }).then(res => {
                    this.init()
                })
            },
            goAddTag() {}
        },
        mounted() {
            this.init()
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
        color: $fcolor;
        .tab-contianer {
            height: .9rem;
            display: flex;
            align-items: center;
            flex-direction: column;
            justify-content: center;
            color: #333;
            font-size: .32rem;
        }
        .save-text {
            color: $fcolor;
            font-size: .32rem;
        }
    }
    .tag-list {
        padding: .2rem;
        display: flex;
        flex-wrap: wrap;
    }
    .tag-container {
        height: calc(100vh - .9rem);
        background-color: #fff;
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
            background-color: #f7f7f7;
            border: 1px solid #d5d5d5;
            position: relative;
            margin: .14rem;
            span {
                display: inline-block;
                position: absolute;
                top: -.2rem;
                left: -.2rem;
                width: .4rem;
                height: .4rem;
                line-height: .4rem;
                text-align: center;
                border-radius: .2rem;
                color: #fff;
                background-color: #dfdfdf;
            }
            .add-tag {
                width: 1.7rem;
                height: .7rem;
                text-align: center;
                line-height: .7rem;
                color: #dfdfdf;
                font-size: .9rem;
            }
            .tag-content {
                min-width: 1.7rem;
                height: .7rem;
                text-align: center;
                line-height: .7rem;
                padding: 0 .06rem;
                color: #000;
                font-size: .32rem;
            }
        }
    }
    .is-hidden {
        visibility: hidden;
    }
    .delete-tip {
        display: inline-block;
        width: .32rem;
        height: .32rem;
        line-height: .32rem;
        text-align: center;
        background-color: #d0031a;
        color:#fff;
        position: absolute;
        top: -0.15rem;
        left: -0.15rem;
        border-radius: 50%;
        font-size: 0.36rem;
    }
</style>