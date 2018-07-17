<template>
  <div>
    <Header v-bind="{right:1,center:2,centerValue:'社群'}"></Header>
    <ul class="community-list pt">
      <!--<li class="community-item" v-for="item in 5">{{item}}</li>-->
      <li class="build-community padlr02" @click="$router.push({path:'/communityAdd'})">
        <div class="build-community-left">
            <span class="add-box">
            <i class="icon iconfont icon-tianjia"></i>
            </span>
          <span>创建社群</span>
        </div>
        <i class="icon iconfont icon-gengduo"></i>
      </li>
    </ul>
    <div class="community-box  pullScroll" id="scroll">
      <div>
        <div class="recommend-box">
          <span class="recommend-text">推荐</span>
          <ul class="recommend-list ">
            <div>
              <li class="recommend-item" v-for="item in communityList"
                  @click="$router.push({path:'/communityDynamic',query:{id:item.id}})">
                <!--<img src="../../assets/default_avatar_male.jpg" alt="">-->
                <img :src="item.logo" alt="">
                <div class="recommend-content">
                  <h4>{{item.name}}</h4>
                  <span>{{item.descs}}</span>
                </div>
                <span class="recommend-member">成员{{item.member}}</span>
              </li>
            </div>

          </ul>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
  import * as types from "../../store/mutations-type"

  export default {
    name: "community",
    data() {
      return {
        communityList: [],
        len: 0,
        listCount: 1
      }
    },
    mounted() {
      let that = this
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
        this.len = 0
        this.loadDataList(pullScroll);
      },
      loadDataList(pullScroll) {
        //获取社群列表
        if (this.len !== 0) {
          pullScroll.finish(this.listCount < this.commentLen);
        }
        this.len += 20
        this.$store.dispatch(types.COMMUNITY_LIST, {len: this.len}).then(res => {
          if (res.code !== 0) return
          console.log(res)
          this.communityList = res.data
          this.listCount = res.data.length
          pullScroll.finish(this.listCount < this.len);

        })
      },
    },
  }
</script>

<style scoped>

</style>