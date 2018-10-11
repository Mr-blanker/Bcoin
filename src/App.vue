<template>
    <div id="app">
        <keep-alive>
            <router-view v-if="$route.meta.keepalive"></router-view>
        </keep-alive>
        <router-view v-if="!$route.meta.keepalive"></router-view>
        <Footer></Footer>
    </div>
</template>

<script>
    import Footer from "./components/Footer"
    import * as types from "./store/mutations-type"

    export default {
        name: 'App',
        data() {
            return {
                isShowFooterNav: true,
                includeComponents: ['Information', 'marketIndex', 'community', 'searchCoin', 'famousLibrary', 'specialColumn']
            }
        },
        components: {
            Footer
        },
        watch: {},
        mounted() {
            // console.log(window.localStorage.userInfo)
            // this.$store.dispatch(types.USER_USERINFO)

        },
        updated() {
            let informationId = window.sessionStorage.getItem('informationActive')
            let scrollTop
            if (this.$route.name == 'Information') {
                scrollTop = window.sessionStorage.getItem('scrollTop_' + this.$route.name + '_' + informationId)
            } else {
                scrollTop = window.sessionStorage.getItem('scrollTop_' + this.$route.name);
            }
            // document.body.scrollTop = scrollTop;
            // document.documentElement.scrollTop = scrollTop;
        },
    }
</script>

<style>
    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
        /*margin-top: 60px;*/
        height: 100%;
        background: #f2f5f7;
    }
</style>
