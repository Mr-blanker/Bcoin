<template>
    <div>
        <Header v-bind="{center:3,right:1,list:titleList,liKey:index}" @clickItem="clickItem"></Header>
        <section id="newsScroll" class=" container main1 mescroll">
            <ul class="news_list">
                <li v-for="(item,key) in list" :key="key" @click="informationDetail(item.aid)">
                    <a class="item">
                        <div class="info">
                            <div class="title limit">{{item.title}}</div>
                            <div class="other" v-if="index===0">
                                <span class="date">{{mo(item.t*1000)}}</span>
                                <span class="point">·</span>
                                <span class="author">{{item.befrom}}</span>
                                <span
                                    class="iconfont icon-pageviews01 pageviews">&nbsp;{{item.n}}</span>
                            </div>
                            <div class="other" v-if="index!==0">
                                <p class="iconfont icon-pageviews01 pageviews">&nbsp;{{item.n}}</p>
                                <p class="date">{{item.t*1000|moment('YYYY-MM-DD')}}</p>
                            </div>
                        </div>
                        <div class="pic">
                            <img :src="item.thumbnail" alt="">
                        </div>
                    </a>
                </li>
            </ul>
        </section>
    </div>
</template>

<script>
    import * as types from "../../store/mutations-type"
    import {mapMutations} from "vuex"

    export default {
        name: "informationList",
        data() {
            return {
                titleList: ['头条', '推荐', '行情'],
                index: 0,
                new: {newLen: 0, newCount: -1},
                list: []
            }
        },
        mounted() {
            let that = this
            this.scroll = new MeScroll("newsScroll", {
                down: {
                    callback: that.initDataList,
                },
                up: {
                    callback: that.loadDataList,
                    auto: false,
                    page: {
                        num: 0,
                        size: 10,
                        time: null
                    },
                    htmlNodata: '<p class="upwarp-nodata">-- 没有更多数据了 --</p>'
                }
            });
        },
        methods: {
            ...mapMutations(['SET_SCROLL_TOP', 'SET_SCROLL_BOX']),

            initDataList() {
                this.new = {newLen: 0, newCount: -1},
                    this.loadDataList()
            },
            loadDataList() {
                this.new.newLen += 20
                if (this.index == 0) {
                    //获取新闻资讯列表
                    this.$store.dispatch(types.INFORMATION_LIST, {len: this.new.newLen, cateID: 0}).then(res => {
                        console.log(res)
                        if (res.code !== 0) return
                        this.list = res.data
                        this.new.newCount = res.data.length
                        this.scroll.endSuccess(res.data.length, this.new.newCount >= this.new.newLen);
                        if (this.new.newCount < this.new.newLen)
                            this.scroll.endUpScroll(true)
                    })
                } else if (this.index == 1) {
                    //专栏文章
                    this.$store.dispatch(types.COLUMN_LIST, {len: this.new.newLen}).then(res => {
                        console.log(res)
                        if (res.code !== 0) return
                        this.list = res.data
                        this.new.newCount = res.data.length
                        this.scroll.endSuccess(res.data.length, this.new.newCount >= this.new.newLen);
                        if (this.new.newCount < this.new.newLen)
                            this.scroll.endUpScroll(true)
                    })
                } else {
                    //行情分析
                    this.$store.dispatch(types.COLUMN_MARKET, {len: this.new.newLen}).then(res => {
                        console.log(res)
                        if (res.code !== 0) return
                        this.list = res.data
                        this.new.newCount = res.data.length
                        this.scroll.endSuccess(res.data.length, this.new.newCount >= this.new.newLen);
                        if (this.new.newCount < this.new.newLen)
                            this.scroll.endUpScroll(true)
                    })
                }
            },
            clickItem(key) {
                this.index = key
                this.scroll.scrollTo(0, 0);
                this.scroll.triggerDownScroll();

            },
            informationDetail(aid) {
                console.log(aid)
                if (this.index === 0) {
                    this.$router.push({path: 'InformationDetail', query: {aid: aid}})
                } else if (this.index === 1) {
                    this.$router.push({path: 'InformationDetail', query: {wid: aid}})
                } else {
                    this.$router.push({path: 'InformationDetail', query: {wid: aid}})
                }
                let top = this.scroll.getScrollTop()
                this.SET_SCROLL_TOP(top)
                this.SET_SCROLL_BOX('newsScroll')
            },

        }
    }
</script>

<style scoped>
    .info {
        text-align: left !important;
    }

    .news_list li .item .info {
        font-size: .28rem !important;
    }
</style>