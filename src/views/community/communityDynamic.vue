<template>
  <div style="display: flex;flex-direction: column;height: 100%;">
    <Header v-bind="{left:1,right:1,center:3,list:titleList,liKey:index}" @clickItem="clickItem"></Header>
    <!--介绍-->
    <div class="cd-box pt" v-if="index===1">
      <div class="cd-header">
        <div class="cd-header-top"></div>
        <div class="cd-header-info">
          <h3 class="cd-header-title">{{detailInfo.name}}</h3>
          <span class="cd-header-author">{{detailInfo.ownerID}}</span>
          <ul>
            <li class="cd-header-item ">
              <i class="icon iconfont icon-zixun zhuti"></i>
              <span>主题{{detailInfo.subject_num}}</span>
            </li>
            <li class="cd-header-item ">
              <i class="icon iconfont icon-dianzan dianzan"></i>
              <span>点赞{{detailInfo.like_num}}</span>
            </li>
            <li class="cd-header-item ">
              <i class="icon iconfont icon-web-icon- pinglun"></i>
              <span>评论{{detailInfo.comment_num}}</span>
            </li>
          </ul>
        </div>
        <div class="cd-header-logo">
          <img :src="detailInfo.logo" alt="">
        </div>
      </div>
      <div class="cd-ind">
        <h3>社群介绍</h3>
        <span>{{detailInfo.descs}}</span>
      </div>
      <div class="cd-ind cd-men">
        <h3>社群成员</h3>
        <span>({{detailInfo.member}})</span>
      </div>

    </div>
    <!--动态-->
    <ul class="cd-dynamic" v-else>
      <li class="cd-dynamic-item" v-for="item in articleList">
        <div class="cd-dynamic-user">
          <img :src="item.u_pic" alt="">
          <!--i是否置顶-->
          <div class="cd-dynamic-user-info">
            <span class="cd-dynamic-title">{{item.u_name}}<i v-if="item.isTop">置顶</i></span>
            <span class="cd-dynamic-time">{{item.createTime|moment('YYYY-MM-DD HH:mm')}}</span>
          </div>
        </div>

        <div class="cd-dynamic-content">
          <span class="cd-dynamic-text">{{item.content}}</span>
          <img :src="attr" alt="" v-for="attr in item.imgs">

          <div class="cd-dynamic-icon">
            <i class="icon iconfont icon-dianzan dianzan " @click="dianzan(item)"
               :class="{'is-dianzan':item.likes.items.toString().indexOf(item.u_name)!=-1}"></i>
            <i class="icon iconfont icon-web-icon- pinglun" @click="show2 = true"></i>
          </div>
        </div>
        <div class="cd-dynamic-zan">
          <i class="icon iconfont icon-dianzan dianzan zan"></i>
          <span style="padding-left: .1rem;">{{item.likes.items.toString()}} <span v-if="item.likes.num>20">等{{item.likes.num}}人点赞</span></span>
        </div>
        <div class="cd-dynamic-comment">
          <span>币券飞跃币券飞跃币券飞跃币券飞跃</span>
        </div>
      </li>
      <yd-button size="large" type="warning" @click.native="show2 = true">下部弹出</yd-button>

    </ul>
    <yd-popup v-model="show2" position="center" height="60%">
      <input type="text" autofocus="autofocus">
    </yd-popup>
    <!--<div class="cd-add" v-if="!detailInfo.isIn" @click="add">-->
      <!--<span v-if="detailInfo.charge">{{detailInfo.charge}}积分加入本群</span>-->
      <!--<span v-else>免费加入本群</span>-->
    <!--</div>-->
    <span class="add-box" @click="$router.push({path:'Release',query:{gid:id,name:detailInfo.name}})">
      <i class="icon iconfont icon-tianjia"></i>
    </span>
  </div>
</template>

<script>
  import * as types from "../../store/mutations-type"

  export default {
    name: "communityDynamic",
    data() {
      return {
        titleList: ['动态', '介绍'],
        index: 0,
        detailInfo: {},
        id: this.$route.query.id,
        articleList: [],
        dianzanList: "",
        show2: false,
      }
    },
    mounted() {
      this.getDetail()
      this.getArticleList()
    },
    methods: {
      getDetail() {
        this.$store.dispatch(types.COMMUNITY_DETAIL, {id: this.id}).then(res => {
          console.log(res)
          if (res.code === 0) {
            this.detailInfo = res.data
          }
        })
      },
      //获取社群文章列表
      getArticleList() {
        this.$store.dispatch(types.COMMUNITY_ARTICLE_LIST, {
          gid: this.id
        }).then(res => {
          console.log(res)
          if (res.code === 0) {
            this.articleList = res.data
            // this.dianzanList = res.data.likes.items.toString()
            // console.log(this.dianzanList)
          }
        })
      },
      clickItem(key) {
        console.log(key)
        this.index = key
        if (key === 1) {
        }
      },

      //文章点赞
      dianzan(item) {
        console.log(item.likes.items.toString().indexOf(item.u_name) != -1)
        let like = true
        if (item.likes.items.toString().indexOf(item.u_name) != -1) {
          like = false
        }
        this.$store.dispatch(types.COMMUNITY_DIANZAN, {aid: item.id, like: like}).then(res => {
          console.log(res)
          this.getArticleList()
        })
      },
      //文章评论
      comment(id) {
        this.$store.dispatch(types.COMMUNITY_DIANZAN, {aid: id}).then(res => {
          console.log(res)
        })
      },
      //加入社群
      add() {
        this.$store.dispatch(types.COMMUNITY_ADD, {gid: this.detailInfo.id}).then(res => {
          console.log(res)
          if (res.code === 0) {
            this.success('加入成功', 'community')
          }
        })
      }
    }
  }
</script>

<style scoped lang="scss">
  .add-box {
    width: 45px;
    height: 45px;
    background: #208de3;
    position: fixed;
    bottom: 2rem;
    right: .2rem;
    border: 0;
    border-radius: 40px;
    i {
      color: #fff;
    }
  }

  .is-dianzan {
    color: #208de3;
  }
</style>