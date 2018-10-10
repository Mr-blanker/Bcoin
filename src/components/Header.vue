<template>
    <div class="header pageheader tabheader">
        <div class="left">
            <!--<i class="icon iconfont icon-fanhui" @click="leftClick" v-if="left===1" style="font-size: .45rem"></i>-->
            <!--<i class="icon iconfont icon-gengduo-" @click="leftClick" v-if="left===2" style="font-size:.55rem"></i>-->
            <a class="iconfont icon-arrow01 return_icon" @click="leftClick"></a>

        </div>
        <div class="tabheader_cate">
            <div class="center">
            <span class="center-input" v-if="center===1">
            <i class="icon iconfont icon-search"
               style="font-size: 0.3rem;margin-right: -5px;"></i>{{centerValue}}</span>
                <!--标题-->
                <span class="column_target limit" v-if="center===2">{{centerValue}}</span>
                <ul v-if="center===3">
                    <a v-for="(item,key) in list" @click="clickItem(key)" :class="{'current':liKey ===key}">{{item}}</a>
                </ul>
            </div>
        </div>

        <div class="right">
            <!--搜索-->
            <a class="iconfont icon-search01 search_icon" @click="rightClick" v-if="right===1"></a>
            <!--<i class="icon iconfont icon-search" @click="rightClick" style="font-size: 0.4rem;" v-if="right===1"></i>-->
            <i class="icon iconfont icon-shezhi2" @click="rightClick" v-if="right===2"></i>
            <i class="icon iconfont icon-viewgallery" @click="rightClick" style="font-size: .4rem" v-if="right===3"></i>
            <i class="icon iconfont icon-fanhui" @click="rightClick" v-if="right===4 "></i>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Header",
        data() {
            return {}
        },
        props: [
            "left",
            "right",
            'center',
            'centerValue',
            'list',
            'liKey'
        ],
        methods: {
            leftClick() {
                // console.log('left')
                this.$router.go(-1)
                if (this.$route.name == 'personMessage') {
                }
            },
            rightClick() {
                console.log('right')
            },
            clickItem(key) {
                this.$emit('clickItem', key)
            }
        }
    }
</script>

<style scoped lang="scss">

</style>
