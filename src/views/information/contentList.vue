<template>
    <div style="display: flex; flex-direction: column;height:100%">
        <Header v-bind="{left:1,right:1,centerValue:'推荐专栏',center:2}"></Header>
        <ul class="content-list">
            <li class="content-item" v-for="item in list">
                <div class="item-top">
                    <div class="item-top-img">
                        <img :src="item.thumbnail" alt="">
                    </div>
                    <span class="item-top-title">{{item.title}}</span>
                </div>
                <span class="item-text">查看</span>
            </li>
        </ul>
    </div>
</template>

<script>
    import Header from "@/components/Header"
    import * as types from "../../store/mutations-type"

    export default {
        name: "contentList",
        data() {
            return {
                list: []
            }
        },
        components: {
            Header
        },
        mounted() {
            let pid = this.$route.query.pid
            this.$store.dispatch(types.COLUMN_CATESECOND, pid).then(res => {
                console.log(res)
                if (res.code !== 0) return;
                this.list = res.data
            })
        },
        methods: {}

    }
</script>

<style scoped>

</style>