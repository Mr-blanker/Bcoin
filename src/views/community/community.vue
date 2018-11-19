<template>
    <div>
        <Header v-bind="{center:3,list:titleList,liKey:index}" @clickItem="clickItem"></Header>
        <main class="container main1">
            <div class="mescroll" id="communityScroll">
                <ul class="community-list" v-if="index==1">
                    <li class="build-community padlr02" @click="buildCommunity()">
                        <div class="build-community-left">
                            <span class="add-box">
                                <i class="icon iconfont icon-tianjia"></i>
                            </span>
                            <span>创建社群</span>
                        </div>
                        <i class="icon iconfont icon-gengduo"></i>
                    </li>
                </ul>
                <ul class="community" v-show="index!==0">
                    <li class="item borderTop1px" v-for="item in dataList"
                        @click="$router.push({name:'communityDynamic',params:{id:item.id}})">
                        <div class="item_pic">
                            <a><img :src="item.logo"/></a>
                        </div>
                        <div class="item_text">
                            <a>
                                <span class="name">{{item.name}}</span>
                                <span class="summary limit">{{item.descs}}</span>
                            </a>
                        </div>
                        <div class="item_other">
                            <span class="quantity">
                            {{item.member}}人加入
                        </span>
                        </div>
                    </li>
                </ul>
                <div v-show="index==0">
                    <div class="community_basic">
                        <ul class="community_topping">
                            <li v-for="item in isTopList"
                                @click.stop="$router.push({path:'/articleDetail',query:{item:JSON.stringify(item)}})">
                                <a class="links border1px">
                                    <div class="disLeft">
                                        <span class="icons">置顶</span>
                                        <span>{{item.content}}</span>
                                    </div>
                                    <div class="disRight">
                        <span class="iconfont icon-arrow02">
                        </span>
                                    </div>
                                </a>
                            </li>
                        </ul>
                    </div>
                    <ul class="community_list">
                        <li class="item" style="position: relative;" v-for="(item,index) in articleList"
                            @click.stop="$router.push({path:'/articleDetail',query:{item:JSON.stringify(item)}})">
                            <div class="item_head">
                                <a class="disLeft">
                                    <div class="pic">
                                        <img :src="item.u_pic"/>
                                        <!--i是否置顶-->
                                    </div>
                                    <div class="text">
                                        <span>{{item.u_name}}</span>
                                        <span>{{item.createTime|moment('YYYY-MM-DD HH:mm')}}</span>
                                    </div>
                                </a>
                                <a class="disRight">
                                    <span class="iconfont icon-comment01"></span>
                                    <span>{{item.comments.num}}</span>
                                </a>
                            </div>
                            <div class="item_body">
                                <a>
                                    <div class="title limit">{{item.content}}</div>
                                    <div class="subtitle limit">{{item.content}}</div>
                                    <div class="pic">
                                        <img :src="attr" alt="" v-for="attr in item.imgs"/>
                                    </div>
                                </a>
                            </div>
                            <div class="cd-dynamic-user-info">
                                <i class="istop" v-if="!item.isTop&&userInfo.uid==detailInfo.ownerID"
                                   @click.stop="isTop(1,item.id)">置顶</i>
                                <i class="istop" v-if="item.isTop&&userInfo.uid==detailInfo.ownerID"
                                   @click.stop="isTop(0,item.id)">取消置顶</i>
                            </div>
                        </li>
                    </ul>
                </div>

            </div>
        </main>
    </div>
</template>

<script>
    import * as types from "../../store/mutations-type"
    import {mapGetters} from "vuex"

    export default {
        name: "community",
        data() {
            return {
                titleList: ['最新', '我的', '热门', '全部'],
                index: 0,
                dataList: [],
                params: {},
                totalCount: -1,
                setLen: 20,
                type: 1,
                articleList: [],
                totalCount1: -1,
                params1: {},
                setLen1: 20,
                isTopList: [],
                detailInfo: {},


            }
        },
        computed: {
            ...mapGetters(['userSid', 'userInfo'])
        },
        mounted() {
            let that = this
            this.scroll = new MeScroll("communityScroll", {
                down: {
                    callback: that.initDataList,
                },
                up: {
                    callback: that.loadDataList,
                    auto: false, //初始化不进行加载
                    htmlNodata: '<p class="upwarp-nodata">没有更多了</p>'
                }
            });
        },
        methods: {
            //tab选择
            clickItem(key) {
                console.log(key)
                this.index = key
                if (key == 1) {
                    this.type = 1
                } else if (key == 2) {
                    this.type = 2
                } else if (key == 3) {
                    this.type = 0
                }
                this.initDataList()
            },
            initDataList() {
                if (this.index !== 0) {
                    this.params = {len: this.setLen, type: this.type}
                    this.dataList = []
                    this.totalCount = -1
                } else {
                    this.params1 = {}
                    this.totalCount1 = -1
                    this.articleList = []
                    this.isTopList = []

                }
                this.loadDataList();
            },
            loadDataList() {
                //获取社群列表
                if (this.index !== 0) {
                    this.$store.dispatch(types.COMMUNITY_LIST, this.params).then(res => {
                        if (res.code !== 0) return
                        console.log(res)
                        let data = res.data
                        this.dataList = this.dataList.concat(data)
                        this.totalCount = data.length
                        this.scroll.endSuccess(this.totalCount, this.setLen);
                        if (this.totalCount < this.setLen) this.scroll.endUpScroll(true)
                        if (this.totalCount) this.params.maxID = data[this.totalCount - 1].id

                    })
                } else {
                    this.$store.dispatch(types.COMMUNITY_ARTICLE_LIST, this.params1).then(res => {
                        console.log(res)
                        if (res.code !== 0) return
                        let data = res.data
                        this.articleList = this.articleList.concat(data)
                        this.totalCount1 = data.length
                        this.scroll.endSuccess(this.totalCount1, this.setLen1);
                        if (this.totalCount1 < this.setLen1) this.scroll.endUpScroll(true)
                        if (this.totalCount1) this.params1.maxID = data[this.totalCount1 - 1].id
                        this.articleList.forEach(item => {
                            if (item.isTop) this.isTopList.push(item)
                        })
                    })
                }


            },
            getDetail() {
                this.$store.dispatch(types.COMMUNITY_DETAIL, {id: this.id}).then(res => {
                    console.log(res)
                    if (res.code !== 0) return
                    this.detailInfo = res.data
                })
            },
            buildCommunity() {
                if (!this.userSid) return this.$router.push({name: 'login'})
                this.$router.push({name: 'communityAdd'})
            },
            //是否置顶
            isTop(id, aid) {
                let that = this
                let content = '确定取消置顶该文章吗？'
                let info = {aid: aid, isTop: false}
                if (id) {
                    info.isTop = true
                    content = '确定置顶该文章吗？'
                }
                utils.dialog.confirm(content, () => {
                    $.ajax({
                        contentType: 'application/json',
                        url: "http://ssl.pandawork.vip/api/user/group.top",
                        type: 'POST',
                        data: JSON.stringify(info),
                        headers: {sid: that.userSid},
                        dataType: 'JSON',
                        cache: false,
                        processData: false,
                        success: (res) => {
                            if (res.code === 401) return that.$router.push({path: 'Login'})
                            that.getArticleList()
                        }
                    })
                })
            }
        },
    }
</script>

<style scoped lang="scss">
    .mescroll {
        position: fixed;
        top: .9rem;
        bottom: .9rem;
        height: auto;
    }

    .all-list-box {
        display: flex;
        align-items: center;
        justify-content: space-between;
        height: .8rem;
        font-size: .28rem;
        background: #fff;
        color: #333;
        border-bottom: 1px solid #ddd;
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
        .active-li {
            color: #208de3;
        }
    }

    .item_text {
        text-align: left;
    }

    .build-community {
        font-size: .3rem;
    }

    .build-community-left {
        display: flex;
        align-items: center;
        width: 100%;
    }

    .community .item .item_pic {
        border: 0;
    }

    .text {
        text-align: left;
    }

    .item_body {
        text-align: left;
    }

</style>