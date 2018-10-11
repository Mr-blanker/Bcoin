<template>
    <div class="acView-box">
        <Header v-bind="{left:1,right:1,center:2,centerValue:'专栏'}"></Header>
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
                <ul class="zldetails_list clearfix">
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
    import Header from "@/components/Header"
    import * as types from "../../store/mutations-type"

    export default {
        name: "acView",
        data() {
            return {
                columnInfo: '',
                columnList: [],
                params: {pid: ''},
                totalCount: -1
            }
        },

        created() {
            console.log(2)
            this.columnInfo = JSON.parse(this.$route.query.val)
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
            console.log(this.columnInfo)
        },
        methods: {
            initDataList() {
                this.params = {
                    pid: this.columnInfo.id
                }
                this.columnList = []
                this.totalCount = -1
                this.loadDataList()
            },
            loadDataList() {
                this.$store.dispatch(types.COLUMN_LIST, this.params).then(res => {
                    console.log(res)
                    if (res.code !== 0) return
                    let data = res.data
                    this.columnList = this.columnList.concat(data)
                    this.totalCount = data.length
                    this.scroll.endSuccess(this.totalCount, 20);
                    // if (this.person.personCount < this.person.personLen)
                    //     this.scroll.endUpScroll(true)
                    console.log(data)
                    this.params.minID = data[this.totalCount - 1].aid
                })
            },

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
    }

    .mescroll {
        position: fixed;
        top: .9rem;
        bottom: .9rem;
        height: auto;
    }

</style>