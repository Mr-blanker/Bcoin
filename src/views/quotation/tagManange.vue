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
        height: .9rem;
        padding: 0 .2rem;
        background-color: $bg;
        display: flex;
        align-items: center;
        justify-content: space-between;
        color: #fff;
        .tab-contianer {
            height: .9rem;
            display: flex;
            align-items: center;
            flex-direction: column;
            justify-content: center;
            color: #fff;
            font-size: .32rem;
        }
        .save-text {
            color: #fff;
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
            width: 1.7rem;
            height: .7rem;
            background-color: #f7f7f7;
            border: 1px solid #d5d5d5;
            position: relative;
            margin:.14rem;
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
                width: 1.7rem;
                height: .7rem;
                text-align: center;
                line-height: .7rem;
                color: #000;
                font-size: .32rem;
            }
        }
    }
    .is-hidden {
        visibility:hidden;
    }
</style>