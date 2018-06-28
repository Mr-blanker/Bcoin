<template>
  <div id="mescroll" class="mescroll">
    <div>
      <!--<slot>-->
        <div class="scroll-item" v-for="(item,index) in 30" :key="index">
          <div>{{index}}</div>
        </div>
      <!--</slot>-->
    </div>
  </div>
</template>
<script>
  export default {
    name: 'Scroll',
    data() {
      return {
        mescroll: ''
      }
    },
    mounted() {
      this.mescroll = new MeScroll("mescroll", { //第一个参数"mescroll"对应上面布局结构div的id
        //如果您的下拉刷新是重置列表数据,那么down完全可以不用配置,具体用法参考第一个基础案例
        //解析: down.callback默认调用mescroll.resetUpScroll(),而resetUpScroll会将page.num=1,再触发up.callback
        down: {
          htmlContent: '你好郑辉',
          callback: this.downCallback //下拉刷新的回调,别写成downCallback(),多了括号就自动执行方法了
        },
        up: {
        // <p class="upwarp-progress mescroll-rotate"></p><p class="upwarp-tip">加载中..</p>
          htmlContent: 'sss',
          callback: this.upCallback, //上拉加载的回调
          isBounce: false //如果您的项目是在iOS的微信,QQ,Safari等浏览器访问的,建议配置此项.解析(必读)
        }
      });
    },
    methods: {
      upCallback() {
        console.log(2123)

      },
      downCallback() {
        this.mescroll.endErr();
      }
    }
  }
</script>
<style lang="scss" scoped>
  .scroll-item {
    height: 45px;
    background-color: #fff;
    margin:1px 0;
  }
</style>