<template>
    <div>
        <div class="market-tab ">
            <i class="icon iconfont icon-fanhui" @click="$router.go(-1)"></i>
            <div class="tab-contianer">
                <div>{{titleName[titleIndex]}}-栏目管理</div>
            </div>
            <div :class="{'save-text':true,'is-hidden':titleIndex==0}" @click="$router.go(-1)">保存</div>
        </div>
        <div class="tag-container">
            <div class="tag-title">已选栏目</div>
            <div class="tag-list">
                <div class="tag-item" v-for="(item,index) in tabList" :key="index">
                    <span @click="delTag(item)" v-show="titleIndex!=0">X</span>
                    <div class="tag-content">{{item.symbol||item.eid}}</div>
                </div>
                <div class="tag-item" @click="goAddTag" v-show="titleIndex!=0">
                    <div class="add-tag">+</div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import * as storage from '@/utils/storage'
    export default {
        name: 'tagManange',
        data() {
            return {
                titleName: ['综合', '币种', '平台'],
                titleIndex: '',
                tabList: '',
                mult: [{
                    "cid": -2,
                    "id": "all",
                    "name": "全部",
                    "symbol": "全部"
                }]
            }
        },
        methods: {
            init() {
                let coin = JSON.parse(storage.getStore('coinTabList'))
                let platform = JSON.parse(storage.getStore('platformList'))
                if (this.titleIndex == 0) {
                    this.tabList = this.mult
                }
                if (coin && this.titleIndex == 1) {
                    this.tabList = coin
                }
                if (platform && this.titleIndex == 2) {
                    this.tabList = platform
                }
            },
            delTag(item) {
                if (this.titleIndex == 1) {
                    let _index = this.tabList.findIndex(com => {
                        return com.cid == item.cid
                    })
                    if (_index != -1) {
                        this.tabList.splice(_index, 1)
                        storage.setStore('coinTabList', this.tabList)
                    } else {
                        return false
                    }
                }
                if (this.titleIndex == 2) {
                    let _index = this.tabList.findIndex(com => {
                        return com.id == item.id
                    })
                    if (_index != -1) {
                        this.tabList.splice(_index, 1)
                        storage.setStore('platformList', this.tabList)
                    } else {
                        return false
                    }
                }
            },
            goAddTag() {
                this.$router.push({
                    path: '/addTag',
                    query: {
                        _index: this.titleIndex
                    }
                })
            }
        },
        mounted() {
            this.titleIndex = this.$route.query.index - 1
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
            width: 85px;
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
                width: 85px;
                height: 35px;
                text-align: center;
                line-height: 35px;
                color: #000;
                font-size: 16px;
            }
        }
    }
    .is-hidden {
        visibility:hidden;
    }
</style>