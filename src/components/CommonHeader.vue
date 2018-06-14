<template>
    <div>
        <div class="market-tab ">
            <yd-icon :name="leftIcon" size="20px" color="#fff" @click.native="show=true"></yd-icon>
            <div class="tab-contianer">
                <span v-for="(item,index) in tabName" :class="{'tab-active':activeTab==index+1}" :key="index" @click="tabChange(index+1)">{{item}}</span>
            </div>
            <yd-icon :name="rightIcon" size="20px" color="#fff"></yd-icon>
        </div>
        <yd-popup v-model="show" position="left" width="80%">
            <yd-button type="danger" style="margin: 30px;" @click.native="show = false">Close Left Popup</yd-button>
        </yd-popup>
    </div>
</template>
<script>
    export default {
        name: 'CommonHeader',
        data() {
            return {
                activeTab: 1,
                show: false
            }
        },
        methods: {
            tabChange(index) {
                this.activeTab = index
                this.tabClick(index)
            }
        },
        props: {
            tabName: {
                type: Array,
                default: () => ['综合', '币种', '平台']
            },
            leftIcon:{
                type:String,
                default:'type'
            },
            rightIcon:{
                type:String,
                default:'search'
            },
            tabClick:{
                type:Function,
                default:(index)=>{
                    console.log(index+'被点击')
                }
            }
        }
    }
</script>
<style lang="scss" scoped>
    $bg: #208de3; //header   背景颜色   主色调
    .market-tab {
        width: 100%;
        height: 45px;
        padding: 0 10px;
        background-color: $bg;
        display: flex;
        align-items: center;
        justify-content: space-between;
        .tab-contianer {
            height: 25px;
            display: flex;
            align-items: center;
            border: 1px solid #1464cc;
            color: #fff;
            border-radius: 5px;
            span {
                display: inline-block;
                display: flex;
                align-items: center;
                justify-content: center;
                width: 50px;
                height: 23px;
                cursor: pointer;
            }
            span:nth-child(2n) {
                border-left: 1px solid #1464cc;
                border-right: 1px solid #1464cc;
            }
        }
    }
    .tab-active {
        background-color: #1464cc;
    }
</style>