<template>
    <div>
        <div class="market-tab ">
            <i class="icon iconfont icon-fanhui" @click="$router.go(-1)"></i>
            <div class="tab-contianer">
                <div>{{titleName[titleIndex]}}-栏目添加</div>
            </div>
            <div class="save-text" @click="$router.go(-1)">确定</div>
        </div>
        <div class="tag-container">
            <div class="tag-list">
                <yd-infinitescroll :callback="loadList" ref="infinitescroll">
                    <div slot="list" :class="{'tag-item':true,'active-tag':isActive(item)}" v-for="(item,index) in tabList" :key="index" @click="addBase(item)">
                        <div class="tag-content">{{item[tabKey]}}</div>
                    </div>
                </yd-infinitescroll>
            </div>
            <div v-show="titleIndex==0">综合模块，当前不支持添加</div>
        </div>
    </div>
</template>
<script>
    import {
        mapActions
    } from 'vuex'
    import * as storage from '@/utils/storage'
    export default {
        name: 'addTag',
        data() {
            return {
                titleName: ['综合', '币种', '平台'],
                titleIndex: '',
                tabKey: '',
                tabList: '',
                len: 40,
                activeTab: '',
                coinList: [],
                platformList: []
            }
        },
        mounted() {
            this.titleIndex = this.$route.query._index
            this.init()
            this.getData()
        },
        methods: {
            ...mapActions(['PLATFORM_LIST', 'COIN_LIST']),
            isActive(item) {
                if (this.titleIndex == 1) {
                    let _index = this.coinList.findIndex(com => {
                        return com.cid == item.cid
                    })
                    if (_index == -1) {
                        return false
                    } else {
                        return true
                    }
                }
                if (this.titleIndex == 2) {
                    let _index = this.platformList.findIndex(com => {
                        return com.id == item.id
                    })
                    if (_index == -1) {
                        return false
                    } else {
                        return true
                    }
                }
            },
            addBase(item) {
                if (this.titleIndex == 1) {
                    let _index = this.coinList.findIndex(com => {
                        return com.cid == item.cid
                    })
                    if (_index == -1) {
                        this.coinList.push(item)
                        storage.setStore('coinTabList', this.coinList)
                    } else {
                        this.coinList.splice(_index, 1)
                        storage.setStore('coinTabList', this.coinList)
                    }
                }
                if (this.titleIndex == 2) {
                    let _index = this.platformList.findIndex(com => {
                        return com.id == item.id
                    })
                    if (_index == -1) {
                        this.platformList.push(item)
                        storage.setStore('platformList', this.platformList)
                    } else {
                        this.platformList.splice(_index, 1)
                        storage.setStore('platformList', this.platformList)
                    }
                }
            },
            init() {
                let coin = JSON.parse(storage.getStore('coinTabList'))
                let platform = JSON.parse(storage.getStore('platformList'))
                if (coin && this.titleIndex == 1) {
                    this.coinList = coin
                }
                if (platform && this.titleIndex == 2) {
                    this.platformList = platform
                }
            },
            getData() {
                console.log(this.titleIndex)
                if (this.titleIndex == 1) {
                    this.getCoin()
                }
                if (this.titleIndex == 2) {
                    this.getPlatform()
                }
            },
            //获取币种
            getCoin() {
                this.COIN_LIST({
                    len: this.len
                }).then(res => {
                    this.tabKey = 'symbol'
                    let tempArr = res.data.data
                    this.tabList = tempArr
                    this.$refs.infinitescroll.$emit('ydui.infinitescroll.finishLoad');
                })
            },
            //获取所有交易平台
            getPlatform() {
                this.PLATFORM_LIST({
                    len: this.len
                }).then(res => {
                    this.tabKey = 'eid'
                    this.tabList = res.data.data
                    this.$refs.infinitescroll.$emit('ydui.infinitescroll.finishLoad');
                })
            },
            loadList() {
                this.len += 20
                this.getData()
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
    .tag-list {
        padding: 0 0 30px 0;
        &>div {
            padding: 10px;
            display: flex;
            flex-wrap: wrap;
        }
    }
    .tag-container {
        height: calc(100vh - 45px);
        background-color: #fff;
        overflow: auto;
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
    .active-tag {
        background-color: $bg !important;
        border-color: $bg !important;
        .tag-content {
            color: #fff !important;
        }
    }
</style>