<template>
  <div>
    <div class="pullScroll">
      <div id="scroll">
        <div class="stock-list">
          <div class="item" v-for="(item,index) in 10" :key="index">
            <span style="height: 100px;border-bottom:1px solid #000;width: 100%;background: red;display: block;">{{item}}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data(){
      return{

      }
    },
    mounted() {
      let that = this;
      this.scroll = new PullScroll("scroll", {
        refresh: function (pullScroll) {
          that.initDataList(pullScroll)
        },
        loading: function (pullScroll) {
          that.loadDataList(pullScroll);
        }
      });
      this.scroll.triggerRefresh();
    },
    methods: {
      initDataList(pullScroll) {
        // 重复请求处理
        this.page = 1;
        this.list = [];
        this.totalPage = -1;
        this.loadDataList(pullScroll);

      },
      //入库列表
      loadDataList(pullScroll) {
        console.log(123)
        // pullScroll.finish(true);
      },

    }
  }
</script>
<style scoped>
  .swiper-slide {
    height: 100%;
    background: red;
  }
</style>