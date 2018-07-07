<template>
    <div class="trend-box">
        <div class="market-tab ">
            <i class="icon iconfont icon-fanhui" @click="$router.go(-1)"></i>
            <div class="tab-contianer">
                <div>{{coin.name}}</div>
                <div>{{coin.dui}}</div>
            </div>
            <yd-icon name="refresh" size="20px" color="#fff" @click.native="getTrends"></yd-icon>
        </div>
        <div class="coin-info">
            <div>
                <div class="left-coin">
                    <div>
                        <div>市场价:</div>
                        <div>成交量:</div>
                    </div>
                    <div>
                        <div><span>$</span>{{coin.price_usd}}</div>
                        <div><span>$</span>{{coin.cheng_usd||coin['24h_volume_usd']}}</div>
                    </div>
                </div>
            </div>
            <div>
                <div>￥{{coin.price||coin.price_cny}}</div>
                <div>￥{{coin.cheng||coin['24h_volume_cny']}}</div>
            </div>
        </div>
        <div class="date-check">
            <div class="start-time">
                <span>范围:</span>
                <yd-datetime type="datetime" v-model="beginTime" ></yd-datetime>
            </div>
            <div>
                <span>至:</span>
                <yd-datetime type="datetime" v-model="endTime" :callback="endCB"></yd-datetime>
            </div>
        </div>
        <div id="myChart" :style="{width: '100%', height: '600px'}"></div>
    </div>
</template>
<script>
    import {
        mapActions
    } from 'vuex'
    export default {
        name: 'trend',
        data() {
            return {
                beginTime: '',
                endTime: '',
                trendParam: {
                    coin: '',
                    start: '',
                    end: ''
                },
                dates: [],
                market_cap: [],
                volume: [],
                price: [],
                coin: ''
            }
        },
        watch: {
            beginTime(val) {
                this.trendParam.start = Date.parse(new Date(val))
            },
            endTime(val) {
                this.trendParam.end = Date.parse(new Date(val))
            }
        },
        methods: {
            ...mapActions(['TREND']),
            getTrends() {
                this.TREND({
                    coin: 'bitcoin',
                    start: 1527782400000,
                    end: 1527785674000
                }).then(res => {
                    this.formatterRes(res.data)
                    console.log(this.dates)
                    this.initCharts()
                })
            },
            formatterRes(data) {
                this.dates.length = 0
                this.price.length = 0
                this.market_cap.length = 0
                this.volume.length = 0
                for (let item of data.price) {
                    this.dates.push(this.stampToDate(item[0]))
                    this.price.push(item[1])
                }
                for (let item of data.market_cap) {
                    this.market_cap.push(item[1])
                }
                for (let item of data.volume) {
                    this.volume.push(item[1])
                }
            },
            getTimeStamp(day = 0) {
                let timeStamp = Date.parse(new Date())
                return (timeStamp - 86400 * day)
            },
            startCB() {
                console.log('start')
            },
            endCB() {
                console.log('end')
                this.getTrends()
            },
            stampToDate(stamp) {
                let d = new Date(stamp);
                let scMonth = (d.getMonth() + 1) < 10 ? `0${d.getMonth()+1}` : (d.getMonth() + 1),
                    scDate = d.getDate() < 10 ? '0' + d.getDate() : d.getDate(),
                    scHours = d.getHours() < 10 ? '0' + d.getHours() : d.getHours(),
                    scMinutes = d.getMinutes() < 10 ? '0' + d.getMinutes() : d.getMinutes(),
                    scSeconds = d.getSeconds() < 10 ? '0' + d.getSeconds() : d.getSeconds()
                let selectTime = `${d.getFullYear()}-${scMonth}-${scDate} ${scHours}:${scMinutes}:${scSeconds} `
                return selectTime
            },
            initCharts() {
                let colorList = ['#c23531', '#2f4554', '#61a0a8', '#d48265', '#91c7ae', '#749f83', '#ca8622', '#bda29a', '#6e7074', '#546570', '#c4ccd3'];
                let labelFont = 'bold 12px Sans-serif';
                let option = {
                    animation: false,
                    color: colorList,
                    legend: {
                        top: 30,
                        data: ['市值', '价格']
                    },
                    tooltip: {
                        triggerOn: 'none',
                        transitionDuration: 0,
                        confine: true,
                        bordeRadius: 4,
                        borderWidth: 1,
                        borderColor: '#333',
                        backgroundColor: 'rgba(255,255,255,0.9)',
                        textStyle: {
                            fontSize: 12,
                            color: '#333'
                        },
                        position: function(pos, params, el, elRect, size) {
                            var obj = {
                                top: 60
                            };
                            obj[['left', 'right'][+(pos[0] < size.viewSize[0] / 2)]] = 5;
                            return obj;
                        }
                    },
                    axisPointer: {
                        link: [{
                            xAxisIndex: [0, 1]
                        }]
                    },
                    dataZoom: [{
                        type: 'slider',
                        xAxisIndex: [0, 1],
                        realtime: false,
                        start: 20,
                        end: 70,
                        top: 65,
                        height: 20,
                        handleIcon: 'M10.7,11.9H9.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4h1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z',
                        handleSize: '120%'
                    }, {
                        type: 'inside',
                        xAxisIndex: [0, 1],
                        start: 40,
                        end: 70,
                        top: 30,
                        height: 20
                    }],
                    xAxis: [{
                        type: 'category',
                        data: this.dates,
                        boundaryGap: false,
                        axisLine: {
                            lineStyle: {
                                color: '#777'
                            }
                        },
                        min: 'dataMin',
                        max: 'dataMax',
                        axisPointer: {
                            show: true
                        }
                    }, {
                        type: 'category',
                        gridIndex: 1,
                        data: this.dates,
                        scale: true,
                        boundaryGap: false,
                        splitLine: {
                            show: false
                        },
                        axisLabel: {
                            show: false
                        },
                        axisTick: {
                            show: false
                        },
                        axisLine: {
                            lineStyle: {
                                color: '#777'
                            }
                        },
                        splitNumber: 20,
                        min: 'dataMin',
                        max: 'dataMax',
                        axisPointer: {
                            type: 'shadow',
                            label: {
                                show: false
                            },
                            triggerTooltip: true,
                            handle: {
                                show: true,
                                margin: 30,
                                color: '#B80C00'
                            }
                        }
                    }],
                    yAxis: [{
                        scale: true,
                        splitNumber: 2,
                        axisLine: {
                            lineStyle: {
                                color: '#777'
                            }
                        },
                        splitLine: {
                            show: true
                        },
                        axisTick: {
                            show: false
                        },
                        axisLabel: {
                            inside: true,
                            formatter: '{value}\n'
                        }
                    }, {
                        scale: true,
                        gridIndex: 1,
                        splitNumber: 2,
                        axisLabel: {
                            show: false
                        },
                        axisLine: {
                            show: false
                        },
                        axisTick: {
                            show: false
                        },
                        splitLine: {
                            show: false
                        }
                    }],
                    grid: [{
                        left: 20,
                        right: 20,
                        top: 110,
                        height: 120
                    }, {
                        left: 20,
                        right: 20,
                        height: 40,
                        top: 260
                    }],
                    graphic: [{
                        type: 'group',
                        left: 'center',
                        top: 70,
                        width: 300,
                        bounding: 'raw',
                        children: [{
                            id: '市值',
                            type: 'text',
                            style: {
                                fill: colorList[1],
                                font: labelFont
                            },
                            left: 0
                        }, {
                            id: '价格',
                            type: 'text',
                            style: {
                                fill: colorList[2],
                                font: labelFont
                            },
                            left: 'center'
                        }]
                    }],
                    series: [{
                        name: '成交量',
                        type: 'bar',
                        xAxisIndex: 1,
                        yAxisIndex: 1,
                        itemStyle: {
                            normal: {
                                color: '#7fbe9e'
                            },
                            emphasis: {
                                color: '#140'
                            }
                        },
                        data: this.volume
                    }, {
                        name: '市值',
                        type: 'line',
                        data: this.market_cap,
                        smooth: true,
                        showSymbol: false,
                        lineStyle: {
                            normal: {
                                width: 1
                            }
                        }
                    }, {
                        name: '价格',
                        type: 'line',
                        data: this.price,
                        smooth: true,
                        showSymbol: false,
                        lineStyle: {
                            normal: {
                                width: 1
                            }
                        }
                    }]
                }
                let myChart = this.$echarts.init(document.getElementById('myChart'))
                myChart.setOption(option)
            }
        },
        mounted() {
            this.coin = JSON.parse(this.$route.query.coin)
            this.trendParam.coin = this.coin.name
            console.log(this.coin)
            this.trendParam.start = this.getTimeStamp()
            this.trendParam.end = this.getTimeStamp(1000)
            this.getTrends()
        }
    }
</script>
<style lang="scss" scoped>
    $fcolor:#8a8d99;
    $bg: #208de3; //header   背景颜色   主色调
    #myChart {
        background-color: #fff;
        margin: 1px 0 0 0;
    }
    @mixin small-font {
        font-size: 12px;
        transform: scale(0.90);
        transform-origin: 0 0;
        -ms-transform: scale(0.90);
        /* IE 9 */
        -ms-transform-origin: 0 0;
        /* IE 9 */
        -webkit-transform: scale(0.90);
        /* Safari 和 Chrome */
        -webkit-transform-origin: 0 0;
        /* Safari 和 Chrome */
        -moz-transform: scale(0.90);
        /* Firefox */
        -moz-transform-origin: 0 0;
        /* Firefox */
        -o-transform: scale(0.90);
        /* Opera */
        -o-transform-origin: 0 0;
        /* Opera */
    }
    @mixin flex-center {
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .market-tab {
        width: 100%;
        height: 45px;
        padding: 0 10px;
        background-color: $bg;
        display: flex;
        align-items: center;
        justify-content: space-between;
        color: #fff;
        .tab-contianer {
            height: 45px;
            display: flex;
            align-items: center;
            flex-direction: column;
            justify-content: center;
            color: #fff;
            &>div:last-child {
                margin: 3px 0 0 0;
                @include small-font;
            }
        }
    }
    .coin-info {
        width: 100%;
        height: 60px;
        background-color: rgb(18, 123, 206);
        @include flex-center;
        color: #fff;
        font-size: 13px;
        &>div {
            width: 50%;
            height: 40px;
            display: flex;
            justify-content: space-around;
            align-items: flex-start;
            flex-direction: column;
            padding: 0 0 0 10px;
            .left-coin {
                display: flex;
                justify-content: flex-start;
                align-items: center;
                &>div {
                    display: flex;
                    justify-content: center;
                    align-items: flex-start;
                    flex-direction: column;
                    &>div:first-child {
                        margin: 0 10px 0 0;
                    }
                }
            }
        }
        &>div:first-child {
            border-right: 1px solid rgb(30, 28, 206);
        }
    }
    .date-check {
        display: flex;
        justify-content: space-between;
        align-items: center;
        &>div {
            background-color: #fff;
            height: 30px;
            width: 50%;
            @include flex-center;
            span {
                width: 50px;
            }
        }
    }
    .trend-box {
        position:fixed;
        top:0;
        left:0;
        right:0;
    }
</style>