<template>
    <div>
        <Header v-bind="{center:2,centerValue:'快讯'}"></Header>
        <div>
            <!--<div class="flash-list mescroll" id="newsScroll">-->
            <!--<div>-->
            <!--<div class="flash-item" v-for="(item,key) in flashList">-->
            <!--<p class="flash-time">{{item.k_time*1000|moment('MM-DD HH:mm')}}</p>-->
            <!--<span style="font-size: .35rem;font-weight: bold;display: block;">{{item.k_title}}</span>-->
            <!--<span class="flash-content" v-html="item.k_content" style="font-size:.3rem"></span>-->
            <!--<div class="flash-comment">-->
            <!--<div>-->
            <!--<span class="flash-duo" @click="comment(item,'duo',key)">看多（{{item.duo}}）</span>-->
            <!--<span class="flash-kong" @click="comment(item,'kong',key)">看空（{{item.kong}}）</span>-->
            <!--</div>-->
            <!--<span style='color: #208de3'>分享</span>-->
            <!--</div>-->
            <!--</div>-->
            <!--</div>-->
            <!--</div>-->
            <main class="container main1 mescroll" id="newsScroll">
                <ul class="lives_list">
                    <li class="item" v-for="(item,key) in flashList">
                        <div class="date">{{item.k_time*1000|moment('MM-DD HH:mm')}}</div>
                        <div class="title limit">{{item.k_title}}</div>
                        <div class="subtitle" v-html="item.k_content"></div>
                        <div class="other">
                            <a class="many current" @click="comment(item,'duo',key)">
                                <span class="iconfont icon-tubiaoshangshengqushi"></span>看多{{item.duo}}
                            </a>
                            <a class="air" @click="comment(item,'kong',key)">
                                <span class="iconfont icon-tubiaoshangshengqushi"></span>
                                看空{{item.kong}}
                            </a>
                            <a class="share">
                                <span class="iconfont icon-share01"></span>
                                分享
                            </a>
                        </div>
                    </li>
                </ul>
            </main>
        </div>
    </div>
</template>

<script>
    import * as types from '../../store/mutations-type'
    import {mapGetters} from "vuex"

    export default {
        name: "flashMsg",
        data() {
            return {
                flashList: [],
                flash: {
                    flashLen: 0,
                    flashCount: -1,
                }
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
            let that = this
            this.scroll = new MeScroll("newsScroll", {
                down: {
                    callback: that.initDataList,
                },
                up: {
                    callback: that.loadDataList,
                    auto: false,
                    htmlNodata: '<p class="upwarp-nodata">没有更多了</p>'
                }
            });
        },
        methods: {
            initDataList() {
                this.flash.flashLen = 0
                this.loadDataList()
            },
            loadDataList() {
                this.flash.flashLen += 20
                this.$store.dispatch(types.FLASH_LIST, {
                    len: this.flash.flashLen
                }).then(res => {
                    console.log(res)
                    this.flashList = res
                    this.flash.flashCount = res.length
                    this.scroll.endSuccess(res.length, this.flash.flashCount >= this.flash.flashLen);
                    if (this.flash.flashCount < this.flash.flashLen)
                        this.scroll.endUpScroll(true)
                })
            },
            //快讯点评
            comment(item, val, key) {
                this.$store.dispatch(types.FLASH_COMMENT, {
                    k_id: item.k_id,
                    view: val
                }).then(res => {
                    if (res.code !== 0) return
                    if (val == 'duo') {
                        this.flashList[key].duo = res.num
                    } else {
                        this.flashList[key].kong = res.num
                    }
                })
            },
        },
        beforeRouteLeave(from, to, next) {
            this.$store.commit('SET_SCROLL_TOP', this.scroll.getScrollTop())
            next()
        }
    }
</script>

<style scoped>
    .mescroll {
        position: fixed;
        top: .9rem;
        bottom: 1.1rem;
        height: auto;
    }

    .flash-comment {
        display: flex;
        justify-content: space-between;
    }

    .container {
        text-align: left;
    }

    .lives_list {
        background: #fff;
    }

    .current .icon-tubiaoshangshengqushi {
        display: inline-flex !important;
        align-items: center;
        justify-content: center;
        font-size: .2rem !important;
        background: #d0031a;
        color: #fff;
        height: .3rem;
        width: .3rem;
        border-radius: 100%;
    }

    .air .icon-tubiaoshangshengqushi {
        display: inline-flex !important;
        align-items: center;
        justify-content: center;
        font-size: .2rem !important;
        background: #acacac;
        color: #fff;
        height: .3rem;
        width: .3rem;
        border-radius: 100%;
    }
</style>
