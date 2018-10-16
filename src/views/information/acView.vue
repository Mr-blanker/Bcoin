<template>
    <div class="acView-box">
        <Header v-bind="{left:1,center:2,centerValue:'专栏'}"></Header>
        <section class="container main1 mescroll" id="newsScroll">
            <div class="zldetails">
                <div class="zldetails_basic">
                    <div class="head">
                        <img :src="columnInfo.thumbnail"/>
                        <div class="text">
                            <div class="companyname">{{columnInfo.title}}</div>
                            <div class="iconfont icon-url01 companyurl">{{columnInfo.link}}</div>
                            <div class="iconfont icon-qq01 companyqq">{{columnInfo.contact}}</div>
                        </div>
                    </div>
                    <div class="body limit">{{columnInfo.description}}</div>
                </div>
                <ul class="zldetails_list clearfix" :class="{'zldetails_list_length':!columnList.length}">
                    <li class="item" v-for="item in columnList"
                        @click="$router.push({path:'InformationDetail',query:{wid:item.aid}})">
                        <a>
                            <div class="pic">
                                <img :src="item.thumbnail"/>
                            </div>
                            <div class="name limit">{{item.title}}</div>
                        </a>
                    </li>
                </ul>
            </div>
        </section>

    </div>
</template>

<script>
    import * as types from "../../store/mutations-type"
    import {mapGetters} from "vuex"

    export default {
        name: "acView",
        data() {
            return {
                columnInfo: '',
                columnList: [],
                params: {pid: ''},
                totalCount: -1,
                setLen: 20,  //设置加载条数  最多20

            }
        },
        computed: {
            ...mapGetters(['scrollTop'])
        },
        beforeRouteEnter(to, from, next) {
            next(vm => {
                vm.columnInfo = JSON.parse(vm.$route.query.val)
                if (from.name == 'specialColumn') {
                    vm.initDataList()
                } else {
                    let scrollTop = parseInt(window.sessionStorage.getItem('heightScrollTop_' + to.name));
                    vm.scroll && vm.scroll.scrollTo(scrollTop, 0)
                }
            })
        },

        mounted() {
            let that = this
            this.scroll = new MeScroll("newsScroll", {
                down: {callback: that.initDataList,},
                up: {
                    callback: that.loadDataList,
                    auto: false,
                    htmlNodata: '<p class="upwarp-nodata">没有更多了</p>'
                }
            });
        },

        methods: {
            initDataList() {
                this.params = {pid: this.columnInfo.id}
                this.columnList = []
                this.totalCount = -1
                this.loadDataList()
            },
            loadDataList() {
                this.$store.dispatch(types.COLUMN_LIST, this.params).then(res => {
                    if (res.code !== 0) return
                    let data = res.data
                    this.columnList = this.columnList.concat(data)
                    this.totalCount = data.length
                    this.scroll.endSuccess(this.totalCount, this.totalCount >= this.setLen);
                    if (this.totalCount < this.setLen) this.scroll.endUpScroll(true)
                    if (this.totalCount) this.params.minID = data[this.totalCount - 1].aid

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
    .container.main1 {
        bottom: 0;
    }

    .name {
        text-align: left;
    }

    .zldetails_list {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        padding-bottom: 0 !important;
    }

    .mescroll {
        position: fixed;
        top: .9rem;
        bottom: .9rem;
        height: auto;
    }

    .zldetails_list_length {
        padding: 0;
    }

    .head {
        text-align: left !important;
    }
</style>