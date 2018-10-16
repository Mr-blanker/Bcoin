<template>
    <div>
        <Header v-bind="{center:3,list:titleList,liKey:index,left:1}" @clickItem="clickItem"></Header>
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
    import {mapMutations, mapGetters} from "vuex"

    export default {
        name: "informationList",
        data() {
            return {
                titleList: ['头条', '推荐', '行情'],
                index: 0,
                list: [],
                params: {},
                totalCount: -1,
                setLen: 20,  //设置加载条数  最多20
                choiceCateId: ''  //专栏分类id

            }
        },
        computed: {
            ...mapGetters(['scrollTop'])
        },
        beforeRouteEnter(to, from, next) {
            next(vm => {
                let scrollTop = parseInt(window.sessionStorage.getItem('heightScrollTop_' + to.name));
                vm.scroll && vm.scroll.scrollTo(scrollTop, 0)
            })
        },
        mounted() {
            this.getSpecialList()

            let that = this
            this.scroll = new MeScroll("newsScroll", {
                down: {
                    callback: that.initDataList,
                },
                up: {
                    callback: that.loadDataList,
                    auto: false,
                    htmlNodata: '<p class="upwarp-nodata">没有更多数据了</p>'
                }
            });
        },
        methods: {
            ...mapMutations(['SET_SCROLL_TOP', 'SET_SCROLL_BOX']),
            //获取专栏类别
            getSpecialList() {
                this.$store.dispatch(types.COLUMN_CATE).then(res => {
                    if (res.code !== 0) return
                    let data = res.data
                    if (data.length && data[0].items.length) this.choiceCateId = data[0].items[0].id
                })
            },
            initDataList() {
                this.params = {len: this.setLen}
                this.list = []
                this.totalCount = -1
                if (this.sIndex == 0) this.params.cateID = 0
                this.loadDataList();
            },
            loadDataList() {
                if (this.index == 0) {
                    //获取新闻资讯列表
                    this.$store.dispatch(types.INFORMATION_LIST, this.params).then(res => {
                        if (res.code !== 0) return
                        let data = res.data
                        this.list = this.list.concat(data)
                        this.totalCount = data.length
                        this.scroll.endSuccess(this.totalCount, this.totalCount >= this.setLen);
                        if (this.totalCount < this.setLen) this.scroll.endUpScroll(true)
                        if (this.totalCount) this.params.minID = data[this.totalCount - 1].aid


                    })
                } else if (this.index == 1) {
                    //专栏文章(推荐)
                    let obj = this.params
                    obj.pid = this.choiceCateId
                    this.$store.dispatch(types.COLUMN_LIST, obj).then(res => {
                        if (res.code !== 0) return
                        let data = res.data
                        this.list = this.list.concat(data)
                        this.totalCount = data.length
                        this.scroll.endSuccess(this.totalCount, this.totalCount >= this.setLen);
                        if (this.totalCount < this.setLen) this.scroll.endUpScroll(true)
                        if (this.totalCount) this.params.minID = data[this.totalCount - 1].aid

                    })
                } else {
                    //行情分析
                    this.$store.dispatch(types.COLUMN_MARKET, this.params).then(res => {
                        if (res.code !== 0) return
                        let data = res.data
                        this.list = this.list.concat(data)
                        this.totalCount = data.length
                        this.scroll.endSuccess(this.totalCount, this.totalCount >= this.setLen);
                        if (this.totalCount < this.setLen) this.scroll.endUpScroll(true)
                        if (this.totalCount) this.params.minID = data[this.totalCount - 1].aid

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
                this.SET_SCROLL_BOX('newsScroll')
            },
        },
        beforeRouteLeave(from, to, next) {
            this.SET_SCROLL_TOP(this.scroll.getScrollTop())
            next()
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