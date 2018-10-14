<template>
    <div>
        <header class="header indexheader">
            <div>
                <div class="center">
                    <a class="logo_icon" >
                    </a>
                </div>
                <div class="right">
                    <a class="iconfont icon-search01 search_icon">
                    </a>
                </div>
            </div>
        </header>
        <div class="container main1">
            <div id="newsScroll" class="mescroll">
                <div>
                    <yd-slider autoplay="3000">
                        <yd-slider-item v-for="(item,index) in broadcastAdList" :key="index">
                            <!--<a :href="item.url" class="slider-img">-->
                            <div style="height: 3.5rem;">
                                <img :src="item.pic" style="height: 100%;" @click="sliderRouter(item.url)">
                            </div>
                        </yd-slider-item>
                    </yd-slider>
                    <nav class="topnav">
                        <div>
                            <a v-for="(item,index) in titleList" :key="index" @click="clickItem(index)">
                                <img :src="'../../../static/images/'+item.icon"/>
                                <span>{{item.title}}</span>
                            </a>

                        </div>
                    </nav>
                    <div class="news">
                        <div class="newstitle">
                            <a @click="sIndex=0,chooseNewCate(0)" :class="{'current':sIndex===0}">头条</a>
                            <a @click="sIndex=1,chooseNewCate(0)" :class="{'current':sIndex===1}">推荐</a>
                            <a @click="sIndex=2,chooseNewCate(0)" :class="{'current':sIndex===2}">行情</a>
                        </div>
                        <!--新闻资讯-->
                        <div v-if="index==0">
                            <ul class="newslist">
                                <li v-for="(item,key) in list" :key="key" @click="informationDetail(item.aid)">
                                    <a class="newsitem">
                                        <div class="newsinfo">
                                            <div class="title limit">{{item.title}}</div>
                                            <div class="other" v-if="sIndex===0">
                                                <span class="date">{{mo(item.t*1000)}}</span>
                                                <span class="point">·</span>
                                                <span class="author">{{item.befrom}}</span>
                                                <span
                                                    class="iconfont icon-pageviews01 pageviews">&nbsp;{{item.n}}</span>
                                            </div>
                                            <div class="other" v-if="sIndex!==0">
                                                <p class="iconfont icon-pageviews01 pageviews">&nbsp;{{item.n}}</p>
                                                <p class="date">{{item.t*1000|moment('YYYY-MM-DD')}}</p>
                                            </div>
                                        </div>
                                        <div class="newspic">
                                            <img :src="item.thumbnail" alt="">
                                        </div>
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import * as types from "../../store/mutations-type"
    import {
        mapGetters,
        mapMutations
    } from "vuex"

    export default {
        name: "Information",
        data() {
            return {
                titleList: [{title: '资讯', icon: 'top_newsicon.png'},
                    {title: '专栏', icon: 'top_zlicon.png'},
                    {title: '名人库', icon: 'top_mrkicon.png'}],
                list: [],
                index: 0,
                broadcastAdList: [],
                len: 1,
                new: {newLen: 0, newCount: -1},
                newCateList: [],
                newCateId: 0,
                plus: '',
                sIndex: 0
            }
        },
        computed: {
            ...mapGetters(['informationActive'])
        },
        mounted() {
            console.log('mounted')
            this.SET_SCROLL_BOX('newsScroll')
            let that = this;
            document.addEventListener('plusready', function () {
                that.plus = plus
            })
            this.getNewCate()
            // if (this.informationActive) {
            //     this.index = parseInt(this.informationActive)
            // }
            if (this.index == 0 && !this.broadcastAdList.length) {
                this.getBroadcastAd()
            }
            this.scroll = new MeScroll("newsScroll", {
                down: {
                    callback: that.initDataList,
                },
                up: {
                    callback: that.loadDataList,
                    auto: false,
                    htmlNodata: '<p class="upwarp-nodata">-- 没有更多数据了 --</p>'
                }
            });
        },
        methods: {
            ...mapMutations(['SET_SCROLL_TOP', 'SET_SCROLL_BOX']),
            goPersonDetail(item) {
                this.$router.push({path: 'InformationDetail', query: {id: item.aid}})
                let top = this.scroll.getScrollTop()
                this.SET_SCROLL_TOP(top)
                this.SET_SCROLL_BOX('newsScroll')
            },
            sliderRouter(url) {
                console.log(url)
                this.plus.runtime.openURL(url, function (err) {
                    console.log(err)
                })
            },
            //获取新闻分类
            getNewCate() {
                this.$store.dispatch(types.INFORMATION_CATES).then(res => {
                    console.log(res)
                    if (res.code !== 0) return
                    this.newCateList = res.data
                })
            },
            //选择新闻分类
            chooseNewCate(id) {
                this.scroll.scrollTo(0);
                this.newCateId = id
                this.scroll.triggerDownScroll();
            },
            initDataList(page, mescroll) {
                if (this.index === 0) {
                    this.new.newLen = 0
                }
                this.loadDataList(page, mescroll);
            },
            loadDataList(page, mescroll) {
                console.log('load')
                //快讯列表
                if (this.index === 0) {
                    this.new.newLen += 20

                    if (this.sIndex == 0) {
                        //获取新闻资讯列表
                        this.$store.dispatch(types.INFORMATION_LIST, {
                            len: this.new.newLen,
                            cateID: this.newCateId
                        }).then(res => {
                            if (res.code !== 0) return
                            this.list = res.data
                            this.new.newCount = res.data.length
                            this.scroll.endSuccess(res.data.length, this.new.newCount >= this.new.newLen);
                            if (this.new.newCount < this.new.newLen)
                                this.scroll.endUpScroll(true)
                        })
                    } else if (this.sIndex == 1) {
                        //专栏文章
                        this.$store.dispatch(types.COLUMN_LIST, {len: this.new.newLen}).then(res => {
                            if (res.code !== 0) return
                            this.list = res.data
                            this.new.newCount = res.data.length
                            this.scroll.endSuccess(res.data.length, this.new.newCount >= this.new.newLen);
                            if (this.new.newCount < this.new.newLen)
                                this.scroll.endUpScroll(true)
                        })
                    } else {
                        //行情分析
                        this.$store.dispatch(types.COLUMN_MARKET, {
                            len: this.new.newLen
                        }).then(res => {
                            if (res.code !== 0) return
                            this.list = res.data
                            this.new.newCount = res.data.length
                            this.scroll.endSuccess(res.data.length, this.new.newCount >= this.new.newLen);
                            if (this.new.newCount < this.new.newLen)
                                this.scroll.endUpScroll(true)
                        })
                    }
                }
            },
            //选择bar
            clickItem(key) {
                console.log(key)
                if (key == 2) {
                    this.$router.push({name: 'famousLibrary'})
                } else if (key === 0) {
                    this.$router.push({name: 'informationList'})
                } else {
                    console.log('专栏')
                    this.$router.push({name: 'specialColumn'})

                }
                // this.$store.commit('SET_INFORMATION_ACTIVE', key)
                this.index = key
                if (key == 0 && !this.broadcastAdList.length) {
                    this.getBroadcastAd()
                }
                this.scroll.scrollTo(0);
                this.scroll.triggerDownScroll();
            },
            //轮播图
            getBroadcastAd() {
                this.$store.dispatch(types.BROADCAST_AD).then(res => {
                    console.log(res)
                    this.broadcastAdList = res
                })
            },
            //新闻详情
            informationDetail(aid) {
                if (this.sIndex === 0) {
                    this.$router.push({path: 'InformationDetail', query: {aid: aid}})
                } else if (this.sIndex === 1) {
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

<style scoped lang="scss">
    ::-webkit-scrollbar {
        display: none
    }

    .ccc {
        display: flex;
        justify-content: center;
        flex-direction: column;
        align-items: center;
        span {
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 1;
            overflow: hidden;
        }
        img {
            height: 1rem;
            width: 1rem;
            border-radius: 1rem;
        }
    }

    .mescroll {
        position: fixed;
        top: .9rem;
        bottom: .9rem;
        height: auto;
    }

    .special-item {
        display: flex;
        flex-wrap: wrap;
        border-left: 1px solid #d9d9d9;
        & > div {
            display: flex;
            width: 33.3333%;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            border-bottom: 1px solid #d9d9d9;
            border-right: 1px solid #d9d9d9;
            height: 2.2rem;
            img {
                width: 1rem;
                height: 1rem;
                border-radius: 100%;
                margin: 0 0 .3rem 0;
            }
        }

    }

    .amount {
        flex: 1;
        display: flex;
        justify-content: flex-end;
    }

    .bbb {
        color: #a2a2a2;
        display: flex !important;
        flex-direction: row !important;
        justify-content: start !important;
        align-items: flex-end;
    }

    .all-list-box {
        display: flex;
        align-items: center;
        justify-content: space-between;
        height: .8rem;
        font-size: .28rem;
        background: #fff;
        color: #333;
        margin-bottom: .2rem;
        li {
            flex: 1;
            display: flex;
            align-items: center;
            justify-content: center;
            height: 100%;
            border-right: 1px solid #ddd;
            &:last-child {
                border-right: 0;
            }
        }
    }

    .all-list-box-active {
        color: #208de3;

    }

    .ipt {
        padding-top: .72rem;
    }

    .header {
        div {
            margin: auto !important;
        }
        background: #fff !important;
    }

    .yd-slider-item > div {
        height: 4.5rem !important;
    }

    .newsinfo {
        .title {
            font-size: .28rem !important;
        }
        text-align: left !important;
    }
</style>
