<template>
    <div>
        <Header v-bind="{center:2,centerValue:'社群'}"></Header>
        <Header v-bind="{center:3,list:titleList,liKey:index}" @clickItem="clickItem"></Header>
        <main class="container main1">
            <div class=" mescroll" id="communityScroll">
                <ul class="community-list" v-if="index==0">
                    <li class="build-community padlr02" @click="$router.push({path:'/communityAdd'})">
                        <div class="build-community-left">
                            <span class="add-box">
                                <i class="icon iconfont icon-tianjia"></i>
                            </span>
                            <span>创建社群</span>
                        </div>
                        <i class="icon iconfont icon-gengduo"></i>
                    </li>
                </ul>
                <ul class="community">
                    <li class="item borderTop1px" v-for="item in dataList"
                        @click="$router.push({path:'/communityDynamic',query:{id:item.id}})">
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
            </div>
        </main>
    </div>
</template>

<script>
    import * as types from "../../store/mutations-type"

    export default {
        name: "community",
        data() {
            return {
                titleList: ['我的', '热门', '全部'],
                index: 0,
                dataList: [],
                params: {type: 1},
                totalCount: -1
            }
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
                if (key == 0) {
                    this.params = {type: 1}
                } else if (key == 1) {
                    this.params = {type: 2}
                } else if (key == 2) {
                    this.params = {type: 0}
                }
                this.initDataList()
            },

            initDataList() {
                this.dataList = []
                this.totalCount = -1
                this.loadDataList();
            },
            loadDataList() {
                console.log(1)

                //获取社群列表
                this.$store.dispatch(types.COMMUNITY_LIST, this.params).then(res => {
                    if (res.code !== 0) return
                    console.log(res)
                    let data = res.data
                    this.dataList = this.dataList.concat(data)
                    this.totalCount = data.length
                    this.scroll.endSuccess(this.totalCount, 20);
                    if (this.totalCount < 20) this.scroll.endUpScroll(true)
                    this.params.maxID = data[this.totalCount - 1].id

                })
            },
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
</style>