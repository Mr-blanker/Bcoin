<template>
    <div>
        <div class="market-tab ">
            <i class="icon iconfont icon-fanhui" @click="$router.push('/marketIndex')"></i>
            <div class="tab-contianer">
                <div>自选管理</div>
            </div>
            <div :class="{'save-text':true,'is-hidden':true}" @click="$router.go(-2)">保存</div>
        </div>
        <div class="tag-container">
            <div class="tag-list">
                <div class="tag-item" v-for="(item,index) in choiceList" :key="index">
                    <span @click="delTag(item)">X</span>
                    <div class="tag-content">{{item.coin_name}}</div>
                </div>
                <div class="tag-item" @click="$router.push('/addChoice')">
                    <div class="add-tag">+</div>
                </div>
            </div>
        </div>
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
            }
        },
        methods: {
            ...mapActions(['CHOICE_LIST', 'DEL_CHOICE']),
            init() {
                this.CHOICE_LIST().then(res => {
                    this.userChoice = res.data.data
                })
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
    .tag-list {
        padding: 10px;
        display: flex;
        flex-wrap: wrap;
    }
    .tag-container {
        height: calc(100vh - 45px);
        background-color: #fff;
        .tag-title {
            width: 100%;
            text-align: left;
            line-height: 35px;
            font-size: 14px;
            padding: 0 10px;
            border-bottom: 1px solid #e5e5e5;
        }
        .tag-item {
            min-width: 85px;
            height: 35px;
            background-color: #f7f7f7;
            border: 1px solid #d5d5d5;
            position: relative;
            margin: 7px;
            span {
                display: inline-block;
                position: absolute;
                top: -10px;
                left: -10px;
                width: 20px;
                height: 20px;
                line-height: 20px;
                text-align: center;
                border-radius: 10px;
                color: #fff;
                background-color: #dfdfdf;
            }
            .add-tag {
                width: 85px;
                height: 35px;
                text-align: center;
                line-height: 35px;
                color: #dfdfdf;
                font-size: 45px;
            }
            .tag-content {
                min-width: 85px;
                height: 35px;
                text-align: center;
                line-height: 35px;
                padding: 0 3px;
                color: #000;
                font-size: 16px;
            }
        }
    }
    .is-hidden {
        visibility: hidden;
    }
</style>