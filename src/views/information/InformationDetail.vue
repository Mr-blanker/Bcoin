<template>
    <div class="informationDetail-box">
        <Header v-bind="{left:1,center:2,centerValue:titleName}"></Header>
        <main class="container main1">
            <div class="newsitembox">
                <section class="newsitem">
                    <div class="newsitem_head">
                        <h3 class="title">
                            {{dataList.title}}
                        </h3>
                        <div class="other">
                            <div class="text">
                                <div class="releasedate">
                                    <span class="informationDetail-message-source" v-if="dataList.befrom">文章来源：{{dataList.befrom}}</span>
                                    <span v-if="a">{{dataList.t*1000|moment('MM-DD:HH:mm')}}</span>
                                    <span class="iconfont icon-pageviews01" v-if="id">&nbsp;{{dataList.n}}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="newsitem_body">
                        <p class="informationDetail-content v-html" v-html="dataList.description">
                        </p>
                        <div v-html="dataList.content" style="width: 100%;" class="v-html"></div>
                    </div>
                </section>
            </div>
            <section class="comment-wrap " v-show="titleName=='新闻'">
                <div class="title">评论专区</div>
                <div class="mescroll " id="informationDetailScroll">
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
                                    <span class="time">{{attr.createTim|moment('MM-DD HH:mm')}}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
        <footer class="commentInput" @click="newComment" v-if="titleName=='新闻'">
            <div>
                <form>
                    <input type="text" name="comment" id="comment" placeholder="说说你的看法" class="editbox"
                           disabled="disabled">
                    <button type="button" class="iconfont icon-submit01 subbtns"></button>
                </form>
            </div>
        </footer>
    </div>
</template>

<script>
    import Header from "@/components/Header"
    import * as types from "../../store/mutations-type"
    import {mapGetters} from "vuex"

    export default {
        name: "InformationDetail",
        data() {
            return {
                dataList: {},
                keywords: [],
                aid: '',
                id: '',
                a: '',
                commentList: [],
                commentTotal: '',
                titleName: '新闻'
            }
        },
        computed: {
            ...mapGetters(['userSid'])
        },
        beforeRouteEnter(to, from, next) {
            next(vm => {
                if (from.name == 'acView') return vm.titleName = '专栏'
                if (from.name == 'famousLibrary') return vm.titleName = '名人库'
            })
        },
        mounted() {
            this.aid = this.$route.query.aid
            this.id = this.$route.query.id
            this.wid = this.$route.query.wid
            let that = this
            this.$nextTick(() => {
                this.scroll = new MeScroll("informationDetailScroll", {
                    down: {
                        callback: that.loadDataList,
                        htmlNodata: '<p class="upwarp-nodata">没有更多了</p>'
                    }
                });

                if (this.aid) {
                    this.scroll.triggerDownScroll();
                }
            }, 200)
            if (this.aid) {
                this.$store.dispatch(types.INFORMATION_DETAIL, this.aid).then(res => {
                    console.log(res)
                    if (res.code !== 0) return
                    this.keywords = res.data.keywords.split(',')
                    console.log(this.keywords)
                    this.dataList = res.data
                    this.a = 1
                })
            } else if (this.id) {
                this.$store.dispatch(types.PERSON_CONTENT, this.id).then(res => {
                    console.log(res)
                    if (res.code !== 0) return
                    if (res.data !== null) {
                        this.keywords = res.data.keywords.split(',')
                        console.log(this.keywords)
                        this.dataList = res.data
                        this.a = 1
                    }
                })
            } else {
                this.$store.dispatch(types.COLUMN_CONTENT, this.wid).then(res => {
                    console.log(res)
                    if (res.code !== 0) return
                    if (res.data !== null) {
                        this.keywords = res.data.keywords.split(',')
                        console.log(this.keywords)
                        this.dataList = res.data
                        this.a = 1
                    }
                })
            }

        },
        methods: {
            //新闻评论列表
            loadDataList() {
                let id = this.aid ? this.aid : this.wid
                this.$store.dispatch(types.NEWS_LIST, {newID: id}).then(res => {
                    console.log(res)
                    if (res.code !== 0) return
                    this.commentList = res.data
                    this.scroll.endSuccess();
                    this.scroll.endUpScroll(true)
                })
            },
            //新闻评论
            newComment() {
                let that = this
                let id = this.aid ? this.aid : this.wid

                utils.dialog.prompt('写下你的观点', (value) => {
                    if (value == '') return
                    let info = {
                        newID: id,
                        content: value
                    }
                    console.log(info)
                    $.ajax({
                        contentType: 'application/json',
                        url: "http://ssl.pandawork.vip/api/user/new.comment",
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
                                that.$router.push({path: 'Login'})
                            }
                            that.scroll.triggerDownScroll();
                        }
                    })
                });
            }

        }
    }
</script>

<style scoped lang="scss">
    p img {
        width: 100%;
    }

    .id-comment {
        position: fixed;
        bottom: -2px;
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
            padding-left: .2rem;
        }
    }

    .ad-dynamic-comment {
        padding: .2rem;
        margin-top: .2rem;
        padding-bottom: 2.1rem;

        .ad-comment-title {
            display: flex;
            align-items: center;
            height: .8rem;
            width: 100%;
            border-bottom: 1px solid #dadada;
        }
    }

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
        display: block !important;
    }

    .informationDetail-content p {
        width: 100%;
    }

    .informationDetail-list {
        overflow-y: scroll;
    }

    .newsitem_head {
        text-align: left;
    }

    .container.main1 {
        bottom: 0;
    }

    .border1px {
        text-align: left !important;
    }

    .comment-wrap {
        padding-bottom: 1rem;
        margin-bottom: .88rem;
    }
</style>