<template>
    <div>
        <div class="market-tab ">
            <i class="icon iconfont icon-fanhui" @click="$router.go(-1)"></i>
              <yd-search class="search-text" v-model="searchValue" :on-submit="submitHandler"  cancel-text="搜索" :on-cancel="submitHandler"> </yd-search>
        </div>
        <div class="tag-container">
            <div class="tag-list">
             <div class="tag-item" v-for="(item,index) in searchData" :key="index" @click="addChoice(item)">
                    {{item.coin_name}}
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import {
        mapActions
    } from 'vuex'
    import {
        Search
    } from 'vant';
    import * as storage from '@/utils/storage'
    export default {
        name: 'addChoice',
        data() {
            return {
                searchValue: '',
                searchData:[]
            }
        },
        mounted() {},
        components: {
            'vanSearch': Search
        },
        methods: {
            ...mapActions(['SEARCH_CHOICE','ADD_CHOICE']),
            submitHandler(){
                this.SEARCH_CHOICE({key:this.searchValue}).then(res=>{
                    this.searchData = res.data.data
                })
            },
            addChoice(item){
                this.ADD_CHOICE({id:item.id,t_code:item.t_code}).then(res=>{
                    if(res.data.code==0){
                        this.$router.push('/manageUserChoice')
                    }
                })
            }

        }
    }
</script>
<style lang="scss" scoped>
    $fcolor:#8a8d99;
    $bg: #208de3; //header   背景颜色   主色调
    .market-tab {
        width: 100%;
        height: 1rem;
        padding: 0 .2rem;
        background-color: $bg;
        overflow:hidden;
        display: flex;
        align-items: center;
        justify-content: space-between;
        color: #fff;
        .tab-contianer {
            height: .9rem;
            display: flex;
            align-items: center;
            flex-direction: column;
            justify-content: center;
            color: #fff;
            font-size: .32rem;
        }
        .save-text {
            color: #fff;
            font-size: .32rem;
        }
    }
    .tag-list {
        padding: 0 0 .6rem 0;
        &>div {
            padding: .2rem;
            display: flex;
            flex-wrap: wrap;
        }
    }
    .tag-container {
        height: calc(100vh - .9rem);
        background-color: #fff;
        overflow: auto;
        .tag-title {
            width: 100%;
            text-align: left;
            line-height: .7rem;
            font-size: .28rem;
            padding: 0 .2rem;
            border-bottom: 1px solid #e5e5e5;
        }
        .tag-item {
            min-width: 1.7rem;
            height: .7rem;
            border-bottom: 1px solid #d5d5d5;
            position: relative;
            margin: .14rem;
            .add-tag {
                width: 1.7rem;
                height: .7rem;
                text-align: center;
                line-height: .7rem;
                color: #dfdfdf;
                font-size: .9rem;
            }
            .tag-content {
                width: 1.7rem;
                height: .7rem;
                text-align: center;
                line-height: .7rem;
                color: #000;
                font-size: .32rem;
            }
        }
    }
    .active-tag {
        background-color: $bg !important;
        border-color: $bg !important;
        .tag-content {
            color: #fff !important;
        }
    }
</style>