<template>
    <div>
        <Header v-bind="{left:1,right:1,center:2,centerValue:'名人库'}"></Header>
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
                person: {personLen: 0, personCount: -1},
            }
        },
        activated() {
            let scrollTop  =window.sessionStorage.getItem('heightScrollTop_famousLibrary')
            console.log(scrollTop)
            if (this.scroll) this.scroll.scrollTo(scrollTop,0);
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
            initDataList(page, mescroll) {
                this.person = {personLen: 0, personCount: -1}
                this.loadDataList(page, mescroll);
            },
            loadDataList() {
                this.person.personLen += 20
                this.$store.dispatch(types.PERSON_LIST, {
                    len: this.person.personLen
                }).then(res => {
                    if (res.code !== 0) return
                    console.log(res)
                    this.personList = res.data
                    this.person.personCount = res.data.length
                    this.scroll.endSuccess(res.data.length, this.person.personCount >= this.person.personLen);
                    if (this.person.personCount < this.person.personLen)
                        this.scroll.endUpScroll(true)
                })
            },
            goPersonDetail(item) {
                this.$router.push({path: 'InformationDetail', query: {id: item.aid}})
                let top = this.scroll.getScrollTop()
                this.SET_SCROLL_TOP(top)
                this.SET_SCROLL_BOX('newsScroll')
            },
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