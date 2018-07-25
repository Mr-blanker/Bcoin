<template>
    <div class="footer" v-if="isShowFooterNav">
        <ul class="footer-box">

            <li class="footer-item" @click="$router.push({path:'Information'})"
                :class="{'footer-active':$route.name=='Information'}">
                <i class="icon iconfont icon-wanggediqiu icon-big" style="font-size: .48rem"></i>
                <span>资讯</span>
            </li>

            <li class="footer-item" @click="$router.push({path:'flashMsg'})"
                :class="{'footer-active':$route.name=='flashMsg'}">
                <i class="icon iconfont icon-calendar"></i>
                <span>快讯</span>
            </li>
            <li class="footer-item" @click="$router.push({path:'marketIndex'})"
                :class="{'footer-active':$route.name=='marketIndex'}">
                <i class="icon iconfont icon-gupiao1 icon-big"></i>
                <span>行情</span>
            </li>
            <li class="footer-item" @click="$router.push({path:'community'})"
                :class="{'footer-active':$route.name=='community'}">
                <i class="icon iconfont icon-zixun"></i>
                <span>社群</span>
            </li>
            <li class="footer-item" @click="$router.push({path:'Person'})"
                :class="{'footer-active':$route.name=='person'}">
                <i class="icon iconfont icon-yonghu1 icon-big"></i>
                <span>个人</span>
            </li>
        </ul>
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
    .footer-box li {
        font-size: .25rem !important;
    }

    .icon-big {
        font-size: .5rem !important;
    }
</style>