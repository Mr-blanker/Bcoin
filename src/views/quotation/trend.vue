<template>
    <div class="trend-box">
        <div class="market-tab ">
            <i class="icon iconfont icon-fanhui" @click="$router.go(-1)"></i>
            <div class="tab-contianer" v-if="false">
                <div>{{coin.name}}</div>
                <div>{{coin.dui}}</div>
            </div>
            <div style="font-size:0.32rem">行情</div>
            <i class="iconfont icon-refresh refresh_icon" style="color:#909090;font-size:.3rem" @click="getTrends"></i>
        </div>
        <!-- <div class="coin-info">
                <div>
                    <div class="left-coin">
                        <div>
                            <div>市场价:<span style="margin:0 0 0 .1rem">$</span>{{coin.price_usd}}</div>
                            <div>成交量:<span style="margin:0 0 0 .1rem">$</span>{{coin.cheng_usd||coin['24h_volume_usd']}}
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <div>￥{{coin.price||coin.price_cny}}</div>
                    <div>￥{{coin.cheng||coin['24h_volume_cny']}}</div>
                </div>
            </div> -->
        <main class="coin-box main1">
            <div class="quoteitem">
                <div class="quoteitem_head">
                    <div class="quoteitem_head_title">
                        <span class="price tl">
                                市场价
                            </span>
                        <span class="volume">
                                成交量
                            </span>
                    </div>
                    <div class="quoteitem_head_sales">
                        <div class="dollarMarket">
                            <span class="price limit tl">
                                    ${{coin.price_usd}}
                                </span>
                            <span class="volume limit">
                                    ${{coin.cheng_usd||coin['24h_volume_usd']}}
                                </span>
                        </div>
                        <div class="rmbMarket">
                            <span class="price limit tl">
                                    ￥{{coin.price||coin.price_cny}}
                                </span>
                            <span class="volume limit" style="width:2.1rem">
                                    ￥{{coin.cheng||coin['24h_volume_cny']}}
                                </span>
                        </div>
                    </div>
                </div>
            </div>
        </main>
        <div class="date-check">
            <div class="start-time">
                <span>范围:</span>
                <yd-datetime type="datetime" v-model="beginTime" :callback="startCB"></yd-datetime>
            </div>
            <div>
                <span>至:</span>
                <yd-datetime type="datetime" v-model="endTime" :callback="endCB"></yd-datetime>
            </div>
        </div>
        <div class="chart-box">
            <div v-show="market_cap.length==0&&volume.length==0&&price.length==0" class="none-tip">暂无走势数据</div>
            <div id="myChartPie" :style="{width: '100%', height: '2.5rem',background:'#fff'}"></div>
            <div id="myChart" :style="{width: '100%', height: '8rem'}"></div>
        </div>
        <footer class="shopping user-operation">
            <div>
                <a class="buybtns" @click="goBuyCoin">
                        立即购买
                    </a>
                <a class="sellbtns" @click="goSaleCoin">
                        出售
                    </a>
            </div>
        </footer>
    </div>
</template>

<script>
    import {
        mapActions
    } from 'vuex'
    import utils from 'utility'
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
                myChart: '',
                dates: [],
                market_cap: [],
                volume: [],
                price: [],
                coin: '',
                trendArr: '',
                active: '',
                myChartPie: '',
                pieData: [],
                pieLegend: []
            }
        },
        mounted() {
            this.init()
            this.initDateTime()
            this.getTrends()
            console.log(utils.timestamp())
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
            goBuyCoin() {
                this.$router.push({
                    path: '/buyCoin',
                    query: {
                        cid: this.trendArr.cid,
                        coin_price: this.trendArr.coin_price,
                        coin_name: this.coin.name
                    }
                })
            },
            goSaleCoin() {
                if (this.trendArr.num == 0) {
                    this.$dialog.toast({
                        mes: '没有持有货币！',
                        timeout: 1500,
                        icon: 'error'
                    });
                    return false;
                }
                let coin = {
                    cid: this.trendArr.cid,
                    coin_price: this.trendArr.coin_price,
                    coin_name: this.coin.name,
                    num: this.trendArr.num
                }
                this.$router.push({
                    path: '/saleCoin',
                    query: {
                        coin: JSON.stringify(coin)
                    }
                })
            },
            init() {
                this.active = this.$route.query.active
                let fromSearch = this.$route.query.from
                this.coin = JSON.parse(this.$route.query.coin)
                if (this.active == 1) {
                    if (this.coin.coin_id) {
                        this.trendParam.coin = this.coin.coin_id
                    } else {
                        this.trendParam.coin = this.coin.id
                    }
                } else if (this.active == 2) {
                    let currencyItem = JSON.parse(this.$route.query.currencyItem)
                    this.trendParam.coin = currencyItem.id
                } else if (fromSearch == 200) {
                    this.trendParam.coin = this.coin.id
                } else {
                    this.trendParam.coin = this.coin.name
                }
            },
            initDateTime() {
                let start = this.getTimeStamp(10)
                let end = this.getTimeStamp()
                this.beginTime = this.stampToDate(start),
                    this.endTime = this.stampToDate(end),
                    this.trendParam.start = start
                this.trendParam.end = end
            },
            getTrends() {
                this.TREND(this.trendParam).then(res => {
                    this.trendArr = res.data
                    if (res.data.code !== 0) {
                        this.$dialog.toast({
                            mes: res.data.msg,
                            timeout: 1500
                        });
                        return
                    }
                    if (res.data.price.length == 0 && res.data.market_cap.length == 0 && res.data.volume.length == 0) {
                        this.myChart.clear()
                    } else {
                        this.formatterRes(res.data)
                    }
                    this.pieLegend.length = 0
                    this.pieData.length = 0
                    for (let item of res.data.per) {
                        this.pieLegend.push(item.name)
                        this.pieData.push({
                            name: item.name,
                            value: item.y
                        })
                    }
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
                console.log(this.market_cap)
            },
            getTimeStamp(day = 0) {
                let timeStamp = new Date().valueOf()
                return (timeStamp - (86400000 * day))
            },
            startCB() {
                console.log('start')
                if (this.beginTime > this.endTime) {
                    let temp = this.beginTime
                    this.beginTime = this.endTime
                    this.endTime = temp
                }
                this.getTrends()
            },
            endCB() {
                console.log('end')
                if (this.beginTime > this.endTime) {
                    let temp = this.beginTime
                    this.beginTime = this.endTime
                    this.endTime = temp
                }
                this.getTrends()
            },
            stampToDate(stamp) {
                let d = new Date(stamp);
                let scMonth = (d.getMonth() + 1) < 10 ? `0${d.getMonth() + 1}` : (d.getMonth() + 1),
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
                let that = this
                let option = {
                    animation: false,
                    color: colorList,
                    legend: {
                        top: 0,
                        data: ['市值', '价格']
                    },
                    tooltip: {
                        trigger: 'axis',
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
                        type: 'shadow',
                        link: [{
                            xAxisIndex: [0, 1]
                        }],
                        snap: true
                    },
                    dataZoom: [{
                        type: 'slider',
                        xAxisIndex: [0, 1],
                        realtime: false,
                        start: 20,
                        end: 70,
                        top: 30,
                        height: 20,
                        handleIcon: 'M10.7,11.9H9.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4h1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z',
                        handleSize: '100%'
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
                        data: that.dates,
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
                        },
                        axisTick: {
                            inside: true,
                            alignWithLabel: true,
                        }
                    }, {
                        type: 'category',
                        gridIndex: 1,
                        data: that.dates,
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
                                color: '#208de3'
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
                        top: 80,
                        height: 120
                    }, {
                        left: 20,
                        right: 20,
                        height: 40,
                        top: 230
                    }],
                    graphic: [{
                        type: 'group',
                        left: 'center',
                        top: 30,
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
                        data: that.volume
                    }, {
                        name: '市值',
                        type: 'line',
                        data: that.market_cap,
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
                        data: that.price,
                        smooth: true,
                        showSymbol: false,
                        lineStyle: {
                            normal: {
                                width: 1
                            }
                        }
                    }]
                }
                let pieOption = {
                    title: {
                        x: 'center'
                    },
                    tooltip: {
                        trigger: 'item',
                        formatter: "{a} <br/>{b} : {c} ({d}%)"
                    },
                    legend: {
                        type: 'scroll',
                        orient: 'vertical',
                        right: 10,
                        top: 0,
                        bottom: 5,
                        data: that.pieLegend
                    },
                    series: [{
                        name: '成交占比',
                        type: 'pie',
                        radius: '80%',
                        center: ['30%', '50%'],
                        data: that.pieData,
                        itemStyle: {
                            normal: {
                                label: {
                                    show: false
                                },
                                labelLine: {
                                    show: false
                                }
                            },
                        },
                    }]
                };
                console.log(pieOption)
                this.myChart = this.$echarts.init(document.getElementById('myChart'))
                this.myChartPie = this.$echarts.init(document.getElementById('myChartPie'))
                this.myChart.setOption(option, true)
                this.myChartPie.setOption(pieOption, true)
            }
        }
    }
</script>

<style lang="scss" scoped>
    $fcolor: #333;
    $bg: #fff; //header   背景颜色   主色调
    #myChart {
        background-color: #fff;
        margin: 1px 0 0 0;
    }
    @mixin small-font {
        font-size: .24rem;
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
        height: .9rem;
        padding: 0 .2rem;
        background-color: $bg;
        display: flex;
        align-items: center;
        justify-content: space-between;
        color: #333;
        .tab-contianer {
            height: .9rem;
            display: flex;
            align-items: center;
            flex-direction: column;
            justify-content: center;
            color: #333;
            &>div:last-child {
                margin: 3px 0 0 0;
                @include small-font;
            }
        }
    }
    .coin-box {
        background-color: #fff;
        border-top: 1px solid #efefef;
        border-bottom: 1px solid #efefef;
    }
    .tl {
        text-align: left;
    }
    .chart-box {
        height: 8.5rem;
        overflow: auto;
    }
    .coin-info {
        width: 100%;
        height: .9rem;
        background-color: rgb(18, 123, 206);
        @include flex-center;
        color: #333;
        font-size: .26rem;
        &>div {
            width: 50%;
            height: .8rem;
            display: flex;
            justify-content: space-around;
            align-items: flex-start;
            flex-direction: column;
            padding: 0 0 0 .2rem;
            .left-coin {
                display: flex;
                height: .75rem;
                justify-content: flex-start;
                align-items: center;
                &>div {
                    display: flex;
                    height: 100%;
                    justify-content: center;
                    align-items: flex-start;
                    flex-direction: column;
                    &>div:first-child {
                        margin: 0 .2rem 0 0;
                    }
                }
            }
        }
        &>div:first-child {
            border-right: 1px solid #d0d0fa;
        }
    }
    .date-check {
        display: flex;
        justify-content: space-between;
        align-items: center;
        &>div {
            background-color: #fff;
            height: .6rem;
            width: 50%;
            @include flex-center;
            span {
                width: 1rem;
            }
        }
    }
    .trend-box {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
    }
    .none-tip {
        background-color: #fff;
        font-size: .44rem;
        height: 20rem;
        padding: 2.5rem 0;
    }
    .sale-operation {
        display: flex;
        align-items: center;
        height: 100%;
        justify-content: center;
        &>div {
            width: 1rem;
            height: .4rem;
        }
    }
    .user-operation {
        position: fixed;
        bottom: 0;
        left: 0;
        right: 0;
    }
</style>