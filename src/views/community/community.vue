<template>
    <div>
        <Header v-bind="{center:2,centerValue:'社群'}"></Header>
        <div class="pt">
            <ul class="all-list-box ">
                <li @click="type=1,initDataList()" :class="{'active-li':type===1}">已加入</li>
                <li @click="type=2,initDataList()" :class="{'active-li':type===2}">热门</li>
                <li @click="type=0,initDataList()" :class="{'active-li':type===0}">全部</li>
            </ul>
        </div>
        <ul class="community-list ">
            <!--<li class="community-item" v-for="item in 5">{{item}}</li>-->
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
        <div class="community-box mescroll" id="communityScroll">
            <div>
                <div class="recommend-box">
                    <span class="recommend-text">推荐</span>
                    <ul class="recommend-list ">
                        <div>
                            <li class="recommend-item" v-for="item in communityList"
                                @click="$router.push({path:'/communityDynamic',query:{id:item.id}})">
                                <!--<img src="../../assets/default_avatar_male.jpg" alt="">-->
                                <img :src="item.logo" alt="">
                                <div class="recommend-content">
                                    <h4>{{item.name}}</h4>
                                    <span>{{item.descs}}</span>
                                </div>
                                <span class="recommend-member">成员{{item.member}}</span>
                            </li>
                        </div>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import * as types from "../../store/mutations-type"

    export default {
        name: "community",
        data() {
            return {
                communityList: [],
                len: 0,
                listCount: 1,
                type: 1
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
                    page: {
                        num: 0,
                        size: 10,
                        time: null
                    },
                    htmlNodata: '<p class="upwarp-nodata">-- 没有更多推荐了 --</p>'
                }
            });
            // this.scroll.triggerDownScroll();
        },
        methods: {
            initDataList() {
                this.len = 0
                this.loadDataList();
            },
            loadDataList() {
                //获取社群列表
                // if (this.len !== 0) {
                //   this.scroll.endUpScroll(this.listCount < this.commentLen);
                // }
                this.len += 20
                this.$store.dispatch(types.COMMUNITY_LIST, {
                    len: this.len,
                    type: this.type
                }).then(res => {
                    if (res.code !== 0) return
                    console.log(res)
                    this.communityList = res.data
                    this.listCount = res.data.length
                    this.scroll.endSuccess(res.data.length, this.listCount >= this.len);
                    if (this.listCount < this.len)
                        this.scroll.endUpScroll(true)
                })
            },
        },
    }
</script>

<style scoped lang="scss">
    .mescroll {
        position: fixed;
        top: 3.3rem;
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
</style>