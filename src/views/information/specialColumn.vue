<template>
    <div>
        <Header v-bind="{left:1,right:1,center:2,centerValue:'专栏'}"></Header>
        <main class="container main1">
            <section class="zlcategory">
                <div>
                    <div class="zlcategory_name">
                        <a class="" :class="{current:item.id===choiceId}" v-for="item in dataList"
                           @click="choiceSLevelList(item.id)">{{item.name}}</a>
                    </div>
                    <div class="zlcategory_list">
                        <a v-for="item in sLevelDataList" @click="$router.push({path:'acView',query:{val:JSON.stringify(item)}})">
                            <img :src="item.thumbnail"/>
                            <span class="limit">{{item.title}}</span>
                        </a>
                    </div>
                </div>
            </section>
        </main>
    </div>
</template>

<script>
    import * as types from "../../store/mutations-type"

    export default {
        name: "specialColumn",
        data() {
            return {
                dataList: [],
                choiceId: '',
                sLevelDataList: [], //二级分类列表
                sLevelChoiceId: '',
            }
        },
        created() {
            console.log(1)
            this.getSpecialList()
        },
        methods: {
            getSpecialList() {
                this.$store.dispatch(types.COLUMN_CATE).then(res => {
                    if (res.code !== 0) return
                    this.dataList = res.data
                    if (!this.dataList.length) return
                    this.choiceId = this.dataList[0].id
                    if (this.dataList[0].items) this.sLevelDataList = this.dataList[0].items
                })
            },
            choiceSLevelList(id) {
                this.choiceId = id
                this.sLevelDataList = []
                this.dataList.forEach(item => {
                    if (item.id == id) return this.sLevelDataList = item.items
                })

            }
        }
    }
</script>

<style scoped>
    .container.main1 {
        bottom: 0;
    }
</style>