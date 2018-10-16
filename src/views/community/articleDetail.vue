<template>
    <div>
        <Header v-bind="{left:1,center:2,centerValue:'社群'}"></Header>
        <yd-popup v-model="show4" position="right">
            <div class="zl-header">
                <i class="icon iconfont icon-fanhui" @click="show4=false"></i>
                <span>{{list.likes.num}}人赞过</span>
            </div>
            <div class="zl-list mescroll">
                <div id="scroll">
                    <div>
                        <div v-for="item in dianzanList" class="zl-item" @click.stop="forbid">
                            <img src='../../assets/default_avatar_male.jpg' alt="" v-if="!item.pic">
                            <img :src='item.pic' alt="" v-if="item.pic">
                            <span>{{item.name}}</span>
                        </div>
                    </div>
                </div>
            </div>
        </yd-popup>
        <div>
            <ul class="cd-dynamic">
                <li class="cd-dynamic-item">
                    <div class="cd-dynamic-user">
                        <img :src="list.u_pic" alt="">
                        <!--i是否置顶-->
                        <div class="cd-dynamic-user-info">
                            <span class="cd-dynamic-title">{{list.u_name}}<i v-if="list.isTop">置顶</i></span>
                            <span class="cd-dynamic-time">{{list.createTime|moment('YYYY-MM-DD HH:mm')}}</span>
                        </div>
                    </div>
                    <div class="cd-dynamic-content" style="padding-left: 0;text-align: left;">
                        <span class="cd-dynamic-text">{{list.content}}</span>
                        <img :src="attr" alt="" v-for="attr in list.imgs"
                             style="width: 30%;height: 2.3rem;margin-right: .1rem;margin-bottom: .1rem;">
                    </div>
                    <div class="cd-dynamic-zan" style="padding-left: 0;">
                        <i class="icon iconfont icon-dianzan dianzan zan"></i>
                        <span style="padding-left: .1rem;">{{list.likes.items.slice(0,2).toString()}} <span
                            @click="getDianzanList"
                            style="color:#000;font-size: .25rem">{{list.likes.num}}人赞过<i
                            class="icon iconfont icon-gengduo" style="font-size: .2rem"></i>
                        </span>
                        </span>
                    </div>
                </li>
            </ul>

            <main class="container main2">
                <div class="newsitembox">
                    <section class="newsitem">
                        <div class="newsitem_head">
                            <h3 class="title">{{list.content}}</h3>
                            <div class="other">
                                <img :src="list.u_pic"/>
                                <div class="text">
                                    <div class="companyname">
                                        <span>{{list.u_name}} </span>
                                    </div>
                                    <div class="releasedate">
                                        <span>{{list.createTime|moment('YYYY-MM-DD HH:mm')}}</span>
                                        <!--<span class="iconfont icon-pageviews01">986</span>-->
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="newsitem_body">
                            <div class="newsinformation">
                                <p>{{list.content}}</p>
                                <img :src="attr" alt="" v-for="attr in list.imgs" style="margin: 0;"/>

                            </div>
                        </div>
                        <div class="cd-dynamic-zan" style="padding-left: 0;">
                            <i class="icon iconfont icon-dianzan dianzan zan"></i>
                            <span style="padding-left: .1rem;">{{list.likes.items.slice(0,2).toString()}}
                                <span @click="getDianzanList" style="color:#000;font-size: .25rem">{{list.likes.num}}人赞过<i
                                    class="icon iconfont icon-gengduo" style="font-size: .2rem"></i>
                                </span>
                            </span>
                        </div>
                    </section>

                    <section class="comment-wrap ">
                        <div class="title">评论专区</div>
                        <div class="mescroll " id="scroll1">
                            <div id="list">
                                <div class="box border1px" v-for="attr in commentList">
                                    <img class="avatar" :src="attr.pic" alt=""/>
                                    <div class="content">
                                        <div class="main">
                                            <div class="txt">
                                                <div class="user">{{attr.name}}</div>
                                                <div class="message">{{attr.content}}</div>
                                            </div>
                                        </div>
                                        <div class="info">
                                            <i @click="forbid(attr.uid)" v-if="userInfo.uid===list.uid">禁言</i>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </main>
            <footer class="commentInput">
                <div class="sb">
                    <form @click.stop="newComment" class="submit-form">
                        <input type="text" name="comment" id="comment" placeholder="说说你的看法" disabled="disabled"
                               class="editbox">
                        <button type="button" class="iconfont icon-submit01 subbtns"></button>
                    </form>
                    <i class="icon iconfont icon-dianzan submit-zan" :class="{'is-dianzan':list.isLike}"
                       @click.stop="dianzan()"></i>
                </div>
            </footer>
        </div>
    </div>
</template>

<script>
    import * as types from "../../store/mutations-type"
    import {
        mapGetters
    } from 'vuex'

    export default {
        name: "articleDetail",
        data() {
            return {
                list: JSON.parse(this.$route.query.item),
                commentList: [],
                dianzanList: [],
                show4: false,
                zanLen: 0,
                commentLen: 0,
                commentCount: 1,
                zanCount: 1,
                params: {},
                params1: {aid: ''},
                totalCount1: -1,
                totalCount: -1,
                setLen1: 20,
                setLen: 20
            }
        },
        computed: {
            ...mapGetters(['userSid', 'userInfo'])
        },
        mounted() {
            console.log(this.list)
            let that = this
            this.scroll = new MeScroll("scroll", {
                down: {
                    callback: that.refresh,
                },
                up: {
                    callback: that.loadDataList,
                    auto: false, //初始化不进行加载
                    htmlNodata: '<p class="upwarp-nodata">没有更多了</p>'
                }
            });
            this.scroll1 = new MeScroll("scroll1", {
                down: {
                    callback: that.refresh1,
                },
                up: {
                    callback: that.loadDataList1,
                    auto: false, //初始化不进行加载
                    htmlNodata: '<p class="upwarp-nodata">没有更多了</p>'
                }
            });
        },
        methods: {
            refresh() {
                this.params = {aid: this.list.id, len: this.setLen}
                this.dianzanList = []
                this.loadDataList()
            },
            refresh1() {
                this.params1 = {aid: this.list.id, len: this.setLen1}
                this.commentList = []
                this.loadDataList1()
            },
            //获取文章评论列表
            loadDataList1() {
                console.log(this.params1)
                this.$store.dispatch(types.COMMUNITY_PINGLUN_LIST, this.params1).then(res => {
                    console.log(res)
                    if (res.code !== 0) return
                    let data = res.data
                    this.commentList = this.commentList.concat(data)
                    this.totalCount1 = data.length
                    this.scroll1.endSuccess(this.totalCount1, this.setLen1);
                    if (this.totalCount1 < this.setLen1) this.scroll1.endUpScroll(true)
                    if (this.totalCount1) this.params1.maxID = data[this.totalCount1 - 1].id
                })
            },
            //点赞列表
            loadDataList() {
                this.zanLen += 20
                this.$store.dispatch(types.COMMUNITY_DIANZAN_LIST, this.params).then(res => {
                    console.log(res)
                    if (res.code !== 0) return
                    let data = res.data
                    this.dianzanList = this.dianzanList.concat(data)
                    this.totalCount = data.length
                    this.scroll.endSuccess(this.totalCount, this.setLen);
                    if (this.totalCount < this.setLen) this.scroll.endUpScroll(true)
                    if (this.totalCount) this.params1.maxID = data[this.totalCount - 1].id

                })
            },
            //获取文章点赞列表
            getDianzanList() {
                if (this.list.likes.num) this.show4 = true

            },
            //禁言
            forbid(id) {
                let that = this
                let info = {
                    uid: id,
                    gid: this.list.id,
                    isForbid: true,
                    duration: 0
                }
                utils.dialog.prompt('禁言时长（h）', (value) => {
                    if (value !== '') info.duration = Number(value)
                    $.ajax({
                        contentType: 'application/json',
                        url: "http://ssl.pandawork.vip/api/user/group.forbid",
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
                            if (res.code === 401) {
                                that.$router.push({
                                    path: 'Login'
                                })
                            }
                            that.scroll1.triggerRefresh();
                        }
                    })
                })
            },
            //评论
            newComment() {
                console.log(this.id)
                let that = this
                utils.dialog.prompt('写下你的观点', (value) => {
                    if (value == '') return
                    let info = {
                        aid: that.list.id,
                        content: value
                    }
                    console.log(info)
                    $.ajax({
                        contentType: 'application/json',
                        url: "http://ssl.pandawork.vip/api/user/group.comment",
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
                            if (res.code === 401) {
                                that.$router.push({
                                    path: 'Login'
                                })
                            }
                            that.scroll1.triggerDownScroll();
                        }
                    })
                });
            },
            //文章点赞
            dianzan() {
                let like = true
                if (this.list.isLike) {
                    like = false
                }
                let that = this
                let info = {
                    aid: that.list.id,
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
                            that.list.isLike = !that.list.isLike
                            if (like) {
                                that.list.likes.items.push(that.userInfo.name)
                                that.list.likes.num++
                            } else {
                                let str
                                str = that.list.likes.items.toString().replace(that.userInfo.name, '')
                                that.list.likes.items = str.split(',')
                                for (let i in that.list.likes.items) {
                                    if (that.list.likes.items[i] == '') {
                                        that.list.likes.items.splice(i, 1)
                                    }
                                }
                                that.list.likes.num--
                            }
                            that.scroll.triggerDownScroll()
                        } else if (res.code === 401) {
                            that.$router.push({
                                path: 'Login'
                            })
                        }
                    }
                })
                return false;
            },
        }
    }
</script>

<style scoped lang="scss">
    @import "../../assets/css/public";

    .ad-comment-item {
        min-height: 1rem;
        padding: .3rem 0 !important;
        border-bottom: 1px solid #dadada;
        flex-wrap: wrap;
        &:last-child {
            border: 0;
        }
        img {
            height: .8rem;
            width: .8rem;
            border-radius: 100%;
        }
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

    .ad-dynamic-comment {
        padding: .2rem;
        margin-top: .2rem;
        .ad-comment-title {
            display: flex;
            align-items: center;
            height: .8rem;
            width: 100%;
            border-bottom: 1px solid #dadada;
        }
    }

    .cd-dynamic-item {
        padding: .2rem 0;
        border-bottom: 1px solid $fbb;
        &:last-child {
            border-bottom: 0;
        }
    }

    .cd-dynamic-user {
        position: relative;
        display: flex;
        height: .8rem;
        img {
            height: 100%;
            border-radius: 100%;
            width: .8rem;
        }
    }

    .cd-dynamic-user-info {
        display: flex;
        flex-direction: column;
        align-items: self-start;
        padding-left: .1rem;
    }

    .cd-dynamic-title {
        font-size: .32rem;
        color: $bg;
        i {
            display: inline-flex;
            font-size: .2rem;
            border: 1px solid $bg;
            height: .3rem;
            align-items: center;
            margin-left: 1rem;
            color: $bg;
        }
    }

    .cd-dynamic-time {
        font-size: .25rem;
        color: #666;
    }

    .istop {
        position: absolute;
        right: 0;
        top: 0;
        color: $bg;
    }

    .cd-dynamic-content {
        padding: .2rem 0 0 .8rem;
        .cd-dynamic-text {
            display: flex;
            text-align: left;
            font-size: .32rem;
        }
        img {
            display: inline-flex;
            width: 32%;
        }
    }

    .cd-dynamic-icon {
        display: flex;
        align-items: center;
        i {
            font-size: .5rem;
            margin-right: .4rem;
        }
    }

    .cd-dynamic-zan {
        padding: .2rem 0 0 .8rem;
        font-size: .3rem;
        display: flex;
        align-items: center;
        color: $bg;
        i {
            font-size: .35rem;
        }
    }

    .zl-header {
        position: relative;
        height: .9rem;
        background: #fff;
        color: #000;
        border-bottom: 1px solid $fbb;
        font-size: .35rem;
        i {
            position: absolute;
            top: 50%;
            left: .2rem;
            transform: translate(0, -50%);
            font-size: .4rem;
        }
        span {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
        }
    }

    .zl-item {
        display: flex;
        align-items: center;
        height: 1.2rem;
        padding-left: .2rem;
        img {
            height: .8rem;
            width: .8rem;
            border-radius: 100%;
        }
        span {
            position: relative;
            flex: 1;
            display: flex;
            align-items: center;
            height: 100%;
            border-bottom: 1px solid $fbb;
            padding-left: .1rem;
            padding-right: .2rem;
            font-size: .3rem;
            i {
                position: absolute;
                right: .2rem;
                top: 50%;
                transform: translate(0, -50%);
                font-size: .25rem;
            }
        }
    }

    .id-comment {
        position: fixed;
        bottom: 0;
        left: 0;
        right: 0;
        display: flex;
        align-items: center;
        text-align: left;
        padding: 0 .2rem;
        height: .7rem;
        background: #fff;
        border-top: 1px solid #efefef;
        input {
            width: 85%;
            height: 90%;
            border: 0;
            background: #f3f3f3;
            border-radius: .3rem;
            padding-left: .4rem;
            font-size: .3rem;
        }
        i {
            padding-left: .3rem;
        }
    }

    .is-dianzan {
        color: #208de3;
    }

    .sb {
        position: relative;
    }

    .submit-form {
        width: 90%;
    }

    .submit-zan {
        position: absolute;
        top: 50%;
        right: 0;
        transform: translate(-50%, -50%) !important;
        font-size: .5rem;
    }

    .newsitembox {
        text-align: left;
    }

    .content {
        position: relative;
    }

    .info {
        position: absolute;
        top: 0;
        right: 0;
        color: #adadad;
    }
</style>