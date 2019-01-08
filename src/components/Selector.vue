<template>
    <div class="select">
        <div :class="show ? 'shade':''" @click.stop="close"></div>
        <div class="wrapper" :class=" show ? 'animate':''">
            <div class="header">
                <div class="header-left" @click="close">
                    <span class="icon-close"></span>
                </div>
                <div class="header-title"><span>{{title}}</span></div>
                <div class="header-right" @click="confirm">确定</div>
            </div>

            <div class="chosen">
                <ul style="text-align: left">
                    <li v-for="(item, index) in chosenList"
                        @click="rollback(index)">{{item.name}}
                    </li>
                    <li class="active" v-if="showTips">请选择</li>
                </ul>
            </div>

            <div class="content" v-for="(data, index) in choiceList">
                <div
                    :class="{'item': true, 'on': chosenList[index] && item.id == chosenList[index].id}"
                    @click="choiceItem(item, index)"
                    v-for="(item, key) in data">
                    {{ item.name }}
                </div>
            </div>

            <div class="loading" v-if="isLoading">
                <div class="loading__box">
                    <div class="loading__icon">
                        <img src="http://img.alicdn.com/tps/i3/T1jBamXj4fXXXXXXXX-16-16.gif">
                    </div>
                    <span class="loading__text">加载中，请稍候...</span>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import http from './http'

    export default {
        name: 'selector',

        model: {
            prop: 'show',
            event: 'change'
        },

        props: {
            show: {
                type: Boolean,
                default: false
            },
            data: {
                type: Array
            },
            title: {
                type: String,
                default: "请选择"
            },

            api: {
                type: String,
                default: ""
            },

            level: {
                type: Number,
                default: 4
            },

            autoChoice: {
                type: Boolean,
                default: true,
            }
        },

        watch: {
            show: function (b) {
                if (this.isFirst) this.init();
            }
        },

        data() {
            return {
                isFirst: true,
                choiceList: [], // 选择列表
                chosenList: [], // 已选择列表
                defaultTmp: [], // 默认选中临时数组
                cachedData: {}, // 数据缓存
                showTips: false, // 显示 "请选择"
                isLoading: false,
            }
        },

        methods: {
            init(initVal) {
                this.isFirst = false;
                this.chosenList = [];
                this.choiceList = [];
                if (initVal) this.defaultTmp = (String)(initVal).split(",");
                this.defaultTmp.forEach((item, key) => {
                    if (Number(item) === 0) this.defaultTmp.splice(key)
                });
                this.loadDataRequest(0)
            },

            // 加载数据
            loadDataRequest(id, level) {
                if (this.isLoading) return;
                this.showTips = false;
                this.isLoading = true;
                http(this.api + id, {
                    onSuccess: (res) => {
                        this.isLoading = false;
                        this.showTips = res.data.length;
                        if (this.showTips) this.choiceList.push(res.data);
                        this.defaultChoiceDetect(res.data);
                    },
                    onError: () => {
                        this.isLoading = false;
                    }
                });
            },

            // 点击选择
            choiceItem(item, level) {
                console.log(item)
                let start = level + 1;
                this.choiceList.splice(start);
                this.chosenList.splice(level);
                this.chosenList.push(item);
                this.showTips = false;
                this.isLoading = false;
                if (item.id <= 0) return this.confirm();
                console.log(this.autoChoice)
                if (this.choiceList.length < this.level) return this.loadDataRequest(item.id, level);
                if (this.autoChoice) this.confirm();
            },

            // 回滚选项
            rollback(level) {
                let start = level + 1;
                this.choiceList.splice(start);
                this.chosenList.splice(level);
                this.showTips = true;
            },

            // 确认
            confirm() {
                this.close();
                if (!this.chosenList.length) return;
                let id = [];
                let name = [];
                let chosenList = [];
                this.chosenList.forEach((item) => {
                    id.push(item.id);
                    name.push(item.name);
                    chosenList.push({id: item.id, name: item.name});
                });
                this.$emit("on-choice", chosenList, id, name);
            },

            // 关闭
            close() {
                this.$emit("change", false);
                this.$emit("update:show", false);
                console.log(123)
            },

            // 默认选中检测
            defaultChoiceDetect(data) {

                if (!this.defaultTmp.length) return;

                let chosenOb = {};
                let chosenId = this.defaultTmp.shift();
                for (let i in data) {
                    if (Number(data[i].id) === Number(chosenId)) {
                        chosenOb = data[i];
                        break;
                    }
                }

                if (typeof chosenOb.id === 'undefined') return this.confirm();
                this.choiceItem(chosenOb, this.chosenList.length);
                if (!this.defaultTmp.length) this.confirm();
            },
        }
    }
</script>
<style scoped="">
    .clearfix:after {
        display: block;
        clear: both;
        content: "";
        visibility: hidden;
        height: 0
    }

    .clearfix {
        zoom: 1
    }

    .select {
        font-size: 16px
    }

    .select .shade {
        background: rgba(0, 0, 0, .6);
        position: fixed;
        z-index: 1000;
        top: 0;
        right: 0;
        left: 0;
        bottom: 0;
    }

    .select .wrapper {
        position: fixed;
        left: 0;
        bottom: 0;
        transform: translateY(100%);
        /*backface-visibility: hidden;*/
        z-index: 1001;
        width: 100%;
        transition: transform .3s;
        height: 70%;
        overflow: auto;
        background: #FFF;
        -webkit-transform: translateY(100%);
        -moz-transform: translateY(100%);
        -o-transform: translateY(100%);
        -webkit-transition: -webkit-transform .3s;
    }

    .select .wrapper.animate {
        transform: translate(0);
        -webkit-transform: translateY(0);
        -moz-transform: translateY(0);
        -o-transform: translateY(0);
    }

    .select .chosen {
        position: relative;
        width: 100%;
        border-bottom: 1px solid #DDD;
    }

    .select .chosen ul {
        white-space: nowrap;
        overflow: hidden;
        margin: 0 1em;
        overflow-x: auto
    }

    .select .chosen li {
        color: #222;;
        height: 3em;
        line-height: 3;
        position: relative;
        list-style: none;
        display: inline-block;
        margin-right: 16px;
        padding: 0 10px;
    }

    .select .chosen li.active:after {
        content: "";
        width: 100%;
        height: 2px;
        /*background-color: #f23030;*/
        background-color: #13B7F6;
        position: absolute;
        bottom: 0;
        left: 0;
        z-index: 2;
    }

    .select .header {
        width: 100%;
        position: relative;
        left: 0;
        top: 0;
        font-size: 1em;
        background: #FFF;
        height: 3.2em;
        border-bottom: 1px solid #DDD;
    }

    .select .header-left, .select .header-right {
        height: 100%;
        min-width: 3em;
        display: block;
        z-index: 2;
        line-height: 3.2;
        position: absolute;
    }

    .select .header-left {
        text-indent: 1em;
        left: 0;
        float: left;
        line-height: 3.2
    }

    .select .icon-close {
        position: absolute;
        display: inline-block;
        width: 1.2em;
        height: 1.2em;
        overflow: hidden;
        top: 50%;
        margin-top: -0.4em;
        color: #666
    }

    .select .icon-close:before, .select .icon-close:after {
        content: '';
        position: absolute;
        height: 1px;
        width: 100%;
        top: 50%;
        left: 0;
        margin-top: -1px;
        background: #444;
    }

    .select .icon-close:before {
        -webkit-transform: rotate(45deg);
        -moz-transform: rotate(45deg);
        -ms-transform: rotate(45deg);
        -o-transform: rotate(45deg);
        transform: rotate(45deg);
    }

    .select .icon-close:after {
        -webkit-transform: rotate(-45deg);
        -moz-transform: rotate(-45deg);
        -ms-transform: rotate(-45deg);
        -o-transform: rotate(-45deg);
        transform: rotate(-45deg);
    }

    .select .header-right {
        right: 0;
        top: 0;
        float: right;
        text-align: center
    }

    .select .header-title {
        height: 100%;
        text-align: center;
        background: inherit;
        width: auto;
        top: 0;
        margin: 0 88px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }

    .select .header-title span {
        color: #333;
        line-height: 3.2;
        font-size: 1em;
        display: inline-block
    }

    .select .content {
        position: absolute;
        top: 6.4em;
        right: 0;
        bottom: 0;
        left: 0;
        overflow: auto;
        padding: 0 1em;
        background: #FFF
    }

    .select .item {
        height: 2.875em;
        width: 100%;
        line-height: 3;
    }

    .select .item.on {
        color: #2DA3E1
    }

    .loading {
        background: rgba(255, 255, 255, .8);
        filter: alpha(opacity=80);
        border: 1px snow;
        width: 100%;
        z-index: 13;
        top: 6.4em;
        position: absolute;
        right: 0;
        bottom: 0;
        left: 0;
    }

    .loading .loading__box {
        position: relative;
        width: 150px;
        height: 21px;
        top: 50%;
        margin-top: -10px;
        left: 50%;
        margin-left: -75px
    }

    .loading .loading__icon {
        float: left;
        margin-right: 5px;
    }

    .loading .loading__text {
        font-size: .75em;
        display: block;
        float: left;
        margin-left: 5px;
        padding-top: 0;
        /*color: #f60;*/
        color: #13B7F6;
    }

    .content {
        text-align: left;
    }

    .header-title {
        position: absolute;
        left: 50%;
        transform: translate(-50%);
        margin: 0 !important;
    }

    /*.select{*/
    /*visibility: initial;*/
    /*position: initial;*/
    /*}*/
</style>
