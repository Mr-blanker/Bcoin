<template>
    <div>
        <Header v-bind="{left:1,center:2,centerValue:'名人库'}"></Header>
        <div id="newsScroll" class=" container main1 mescroll">
            <ul class="mlk_list">
                <li class="item" v-for="item in personList" @click="goPersonDetail(item)">
                    <a>
                        <div class="pic">
                            <img :src="item.thumbnail"/>
                        </div>
                        <div class="text">
                            <div class="title limit">{{item.title}}</div>
                            <div class="subtitle limit">{{item.description}}</div>
                        </div>
                    </a>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
    import * as types from "../../store/mutations-type"
    import {mapMutations} from 'vuex'

    export default {
        name: "famousLibrary",
        data() {
            return {
                personList: [],
                params: {},
                totalCount: -1,
                setLen: 20,  //设置加载条数  最多20
            }
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
                    htmlNodata: '<p class="upwarp-nodata">没有更多数据了</p>'
                }
            });
        },
        methods: {
            ...mapMutations(['SET_SCROLL_TOP', 'SET_SCROLL_BOX']),
            initDataList(page, mescroll) {
                this.params = {len: this.setLen}
                this.totalCount = -1
                this.personList = []
                this.loadDataList(page, mescroll);
            },
            loadDataList() {
                this.$store.dispatch(types.PERSON_LIST, this.params).then(res => {
                    if (res.code !== 0) return
                    console.log(res)
                    let data = res.data
                    this.personList = this.personList.concat(data)
                    this.totalCount = data.length
                    this.scroll.endSuccess(this.totalCount, this.totalCount >= this.setLen);
                    if (this.totalCount < this.setLen) this.scroll.endUpScroll(true)
                    if (this.totalCount) this.params.minID = data[this.totalCount - 1].aid

                })
            },
            goPersonDetail(item) {
                this.$router.push({path: 'InformationDetail', query: {id: item.aid}})
            },
        },
        beforeRouteLeave(from, to, next) {
            this.SET_SCROLL_TOP(this.scroll.getScrollTop())
            next()
        }
    }
</script>

<style scoped>
    .mescroll {
        position: fixed;
        top: .9rem;
        bottom: 0;
        left: 0;
        right: 0;
        height: auto;
    }

    .text {
        text-align: left !important;
    }

</style>