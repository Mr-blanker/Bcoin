<template>
    <div style="display: flex;flex-direction: column;height: 100%;">
        <Header v-bind="{left:1,center:2,centerValue:'社群'}" @leftClick="clickItem"></Header>
        <!--介绍-->
        <main class="container main2" v-show="index==1">
            <div class="newsitembox">
                <section class="newsitem">
                    <div class="newsitem_head">
                        <div class="other" style="margin-top:0;text-align: left">
                            <img :src="detailInfo.logo"/>
                            <div class="text">
                                <div class="companyname">
                                    <span>{{detailInfo.name}}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="newsitem_body">
                        <div class="newsinformation">
                            <p>{{detailInfo.descs}}</p>
                        </div>
                    </div>
                </section>
            </div>
        </main>
        <!--动态-->
        <main class="container main1" v-show="index!==1">
            <div class="community_summary" @click="index=1">
                <div class="pic">
                    <img :src="detailInfo.logo"/>
                </div>
                <div class="text">
                    <span class="name">{{detailInfo.name}}</span>
                    <span class="summary limit">{{detailInfo.descs}}</span>
                </div>
                <div class="other">
                    <a class="iconfont icon-arrow02"></a>
                </div>
            </div>
            <div class="mescroll" id="dynamicScroll">
                <div class="community_basic">
                    <ul class="community_topping">
                        <li v-for="item in isTopList"
                            @click.stop="$router.push({path:'/articleDetail',query:{item:JSON.stringify(item),communityId:id}})">
                            <a class="links border1px">
                                <div class="disLeft">
                                    <span class="icons">置顶</span>
                                    <span>{{item.title}}</span>
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
                        @click.stop="$router.push({path:'/articleDetail',query:{item:JSON.stringify(item),communityId:id}})">
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
                                <div class="title limit">{{item.title}}</div>
                                <div class="subtitle limit">{{item.content}}</div>
                                <div class="pic">
                                    <img :src="attr" alt="" v-for="attr in item.imgs"/>
                                </div>
                            </a>
                        </div>
                        <!--<div class="cd-dynamic-user-info">-->
                        <!--<i class="istop" v-if="!item.isTop&&userInfo.uid==detailInfo.ownerID"-->
                        <!--@click.stop="isTop(1,item.id)">置顶</i>-->
                        <!--<i class="istop" v-if="item.isTop&&userInfo.uid==detailInfo.ownerID"-->
                        <!--@click.stop="isTop(0,item.id)">取消置顶</i>-->
                        <!--</div>-->
                    </li>
                </ul>
            </div>
        </main>
        <!--<div class="cd-dynamic mescroll" v-show="index!==1">-->
        <!--<div class="cd-dynamic mescroll" v-show="false">-->
        <!--<div class="">-->
        <!--<div id="">-->
        <!--<div>-->
        <!--<div class="cd-dynamic-item" v-for="(item,index) in articleList"-->
        <!--@click.stop="$router.push({path:'/articleDetail',query:{item:JSON.stringify(item)}})">-->
        <!--<div class="cd-dynamic-user">-->
        <!--<img :src="item.u_pic" alt="">-->
        <!--&lt;!&ndash;i是否置顶&ndash;&gt;-->
        <!--<div class="cd-dynamic-user-info">-->
        <!--<span class="cd-dynamic-title">{{item.u_name}}<i v-if="item.isTop">置顶</i></span>-->
        <!--<i class="istop" v-if="!item.isTop&&userInfo.uid==detailInfo.ownerID"-->
        <!--@click.stop="isTop(1,item.id)">置顶</i>-->
        <!--<i class="istop" v-if="item.isTop&&userInfo.uid==detailInfo.ownerID"-->
        <!--@click.stop="isTop(0,item.id)">取消置顶</i>-->
        <!--<span class="cd-dynamic-time">{{item.createTime|moment('YYYY-MM-DD HH:mm')}}</span>-->
        <!--</div>-->
        <!--</div>-->
        <!--<div class="cd-dynamic-content" style="text-align: left ;">-->
        <!--<span class="cd-dynamic-text">{{item.content}}</span>-->
        <!--<img :src="attr" alt="" v-for="attr in item.imgs"-->
        <!--style="width: 30%;height: 2.3rem;margin-right: .1rem;margin-bottom: .1rem;">-->
        <!--<div class="cd-dynamic-icon">-->
        <!--<i class="icon iconfont icon-dianzan dianzan " @click.stop="dianzan(item,index)"-->
        <!--:class="{'is-dianzan':item.isLike}"></i>-->
        <!--<i class="icon iconfont icon-web-icon- pinglun" @click.stop="comment(item.id)"></i>-->
        <!--</div>-->
        <!--</div>-->
        <!--<div class="cd-dynamic-zan">-->
        <!--<i class="icon iconfont icon-dianzan dianzan zan"></i>-->
        <!--<span style="padding-left: .1rem;">{{item.likes.items.toString()}} <span-->
        <!--v-if="item.likes.num>20">等{{item.likes.num}}人点赞</span></span>-->
        <!--</div>-->
        <!--<ul class="cd-dynamic-comment">-->
        <!--<li v-for="attr in item.comments.items">-->
        <!--<span> <a style="color: #208de3;">{{attr.u_name}}</a>：{{attr.content}}</span>-->
        <!--</li>-->
        <!--</ul>-->
        <!--</div>-->
        <!--</div>-->
        <!--</div>-->
        <!--</div>-->
        <!--</div>-->
        <div class="cd-add" v-if="!detailInfo.isIn" @click="add">
            <span v-if="detailInfo.charge">{{detailInfo.charge}}积分加入本群</span>
            <span v-else>免费加入本群</span>
        </div>
        <div class="release_btns" @click="$router.push({name:'Release',params:{gid:id,name:detailInfo.name}})">
            <a class="iconfont icon-edit">
            </a>
        </div>
    </div>
</template>

<script>
    import * as types from "../../store/mutations-type"
    import {
        mapGetters
    } from "vuex"

    export default {
        name: "communityDynamic",
        data() {
            return {
                titleList: ['动态', '介绍'],
                index: 0,
                detailInfo: {},
                id: '',
                params: {gid: ''},
                articleList: [],
                dianzanList: "",
                show2: false,
                totalCount: -1,
                isTopList: [],
                setLen: 20
            }
        },
        computed: {
            ...mapGetters(['userSid', 'userInfo'])
        },
        beforeRouteEnter(to, from, next) {
            next(vm => {
                vm.id = vm.$route.params.id
                console.log(vm.id)
                if (from.name == 'community' || from.name == 'Release' || from.name == 'articleDetail') {
                    vm.refresh()
                    vm.getDetail()
                } else {
                    let scrollTop = parseInt(window.sessionStorage.getItem('heightScrollTop_' + to.name));
                    vm.scroll && vm.scroll.scrollTo(scrollTop, 0)
                }
            })
        },
        mounted() {
            let that = this
            this.scroll = new MeScroll("dynamicScroll", {
                down: {
                    callback: that.refresh,
                },
                up: {
                    callback: that.loadDataList,
                    auto: false,
                    htmlNodata: '<p class="upwarp-nodata">没有更多了</p>'

                }
            });
        },
        methods: {
            refresh() {
                this.isTopList = []
                this.params = {gid: this.id}
                this.totalCount = -1
                this.articleList = []
                console.log(this.isTopList)
                this.$nextTick(()=>{
                    this.loadDataList()
                })
            },
            loadDataList() {
                this.$store.dispatch(types.COMMUNITY_ARTICLE_LIST, this.params).then(res => {
                    console.log(res)
                    if (res.code !== 0) return
                    let data = res.data
                    let list = []
                    console.log(this.isTopList)

                    data.forEach(item => {
                        if (item.isTop) {
                            this.isTopList.push(item)
                        } else {
                            list.push(item)
                        }
                    })
                    console.log(this.isTopList)
                    this.articleList = this.articleList.concat(list)
                    this.totalCount = data.length
                    this.scroll.endSuccess(this.totalCount, this.setLen);
                    if (this.totalCount < this.setLen) this.scroll.endUpScroll(true)
                    if (this.totalCount && this.totalCount == this.setLen) this.params.minID = data[this.totalCount - 1].id
                })
            },
            getDetail() {
                this.$store.dispatch(types.COMMUNITY_DETAIL, {id: this.id}).then(res => {
                    console.log(res)
                    if (res.code !== 0) return
                    this.detailInfo = res.data
                })
            },
            //获取社群文章列表
            getArticleList() {
                this.$store.dispatch(types.COMMUNITY_ARTICLE_LIST, {
                    gid: this.id
                }).then(res => {
                    console.log(res)
                    if (res.code !== 0) return
                    this.articleList = res.data
                })
            },
            clickItem() {
                if (this.index == 1) return this.index = 0
                this.$router.go(-1)
            },
            //文章点赞
            dianzan(item, index) {
                if (!this.detailInfo.isIn) {
                    this.fail('请先加入本群')
                    return
                }
                let like = true
                console.log(item)
                if (item.isLike) {
                    like = false
                }
                let that = this
                let info = {
                    aid: item.id,
                    like: like
                }
                $.ajax({
                    contentType: 'application/json',
                    url: "http://ssl.pandawork.vip/api/user/group.like",
                    type: 'POST',
                    data: JSON.stringify(info),
                    headers: {
                        sid: that.userSid
                    },
                    dataType: 'JSON',
                    cache: false,
                    processData: false,
                    success: (res) => {
                        console.log(res)
                        if (res.code === 0) {
                            item.isLike = !item.isLike
                            if (like) {
                                console.log(item.u_name)
                                that.articleList[index].likes.items.push(that.userInfo.name)
                                that.articleList[index].likes.num++

                            } else {
                                let str
                                str = that.articleList[index].likes.items.toString().replace(that.userInfo.name, '')
                                that.articleList[index].likes.items = str.split(',')
                                for (let i in that.articleList[index].likes.items) {
                                    if (that.articleList[index].likes.items[i] == '') {
                                        that.articleList[index].likes.items.splice(i, 1)
                                    }
                                }
                                that.articleList[index].likes.num--

                            }
                            // that.scroll.triggerDownScroll()
                        } else if (res.code === 401) {
                            that.$router.push({
                                path: 'Login'
                            })
                        }
                    }
                })
                return false;
            },
            //文章评论
            comment(id) {
                let that = this
                if (!this.detailInfo.isIn) return this.fail('请先加入本群')
                utils.dialog.prompt('写下你的观点', (value) => {
                    if (value == '') return
                    let info = {aid: id, content: value}
                    $.ajax({
                        contentType: 'application/json',
                        url: "http://ssl.pandawork.vip/api/user/group.comment",
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
                });
            },
            //加入社群
            add() {
                this.$store.dispatch(types.COMMUNITY_ADD, {gid: this.detailInfo.id}).then(res => {
                    if (res.code === 0) {
                        this.success('加入成功')
                        this.getDetail()
                    } else {
                        this.fail(res.msg)
                    }
                })
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
        beforeRouteLeave(from, to, next) {
            this.$store.commit('SET_SCROLL_TOP', this.scroll.getScrollTop())
            next()
        }
    }
</script>

<style scoped lang="scss">
    .add-box {
        width: .9rem;
        height: .9rem;
        background: #208de3;
        position: fixed;
        bottom: 2rem;
        right: .5rem;
        border: 0;
        border-radius: .8rem;
        i {
            color: #fff;
        }
    }

    .is-dianzan {
        color: #208de3;
    }

    .cd-dynamic-comment {
        display: flex;
        flex-wrap: wrap;
        padding: .2rem 0 0 .8rem;
        background: #fff;
        font-size: .3rem;
        li {
            display: flex;
            width: 100%;
            padding-bottom: .1rem;
            overflow: hidden;
            span {
                text-align: left;
            }
        }
    }

    .text {
        text-align: left;
    }

    .item_body {
        text-align: left;
    }

    .cd-dynamic-user-info {
        position: absolute;
        top: 0rem;
        right: .3rem;
        font-size: .2rem;
        color: #208eda;
    }

    .container {
        display: flex;
        flex-direction: column;
        bottom: 0;
    }

    .mescroll {
        position: fixed;
        top: 2.5rem;
        bottom: 0rem;
        height: auto;
    }

    .release_btns a {
        font-size: .42rem;
    }

</style>