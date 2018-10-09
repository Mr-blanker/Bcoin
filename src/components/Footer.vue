<template>
    <div v-if="isShowFooterNav">
        <footer class="footer1">
            <div>
                <a @click="$router.push({path:'Information'})" :class="{current:$route.name=='Information'}">
                    <span class="iconfont icon-news01 icon"></span>
                    <span class="name">资讯</span>
                </a>
                <a class="" @click="$router.push({path:'flashMsg'})" :class="{current:$route.name=='flashMsg'}">
                    <span class="iconfont icon-24H01 icon"></span>
                    <span class="name">快讯</span>
                </a>
                <a class="" @click="$router.push({path:'marketIndex'})" :class="{current:$route.name=='marketIndex'}">
                    <span class="iconfont icon-stock01 icon"></span>
                    <span class="name">行情</span>
                </a>
                <a class="" @click="$router.push({path:'community'})" :class="{current:$route.name=='community'}">
                    <span class="iconfont icon-group01 icon"></span>
                    <span class="name">社群</span>
                </a>
                <a class="" @click="$router.push({path:'Person'})" :class="{current:$route.name=='person'}">
                    <span class="iconfont icon-member01 icon"></span>
                    <span class="name">我的</span>
                </a>
            </div>
        </footer>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                isShowFooterNav: true,
                showURL: ['Information', 'person', 'marketIndex', 'community', 'flashMsg']
            }
        },
        watch: {
            '$route'(to) {
                if (this.showURL.includes(to.name)) {
                    this.isShowFooterNav = true
                } else {
                    this.isShowFooterNav = false
                }
            }
        },
        mounted() {
        }
    }
</script>

<style scoped>
    .footer1 > div a span.icon-member01 {
        line-height: .62rem !important;
    }

    .footer1 > div a span.icon {
        padding-top: 0 !important;
    }
</style>