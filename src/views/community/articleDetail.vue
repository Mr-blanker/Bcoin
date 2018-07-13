<template>
  <div>
    <Header v-bind="{left:1,center:2,centerValue:'详情'}"></Header>
    <div>
      <ul class="cd-dynamic">
        <li class="cd-dynamic-item">
          <div class="cd-dynamic-user">
            <img :src="list.u_pic" alt="">
            <!--i是否置顶-->
            <div class="cd-dynamic-user-info">
              <span class="cd-dynamic-title">{{list.u_name}}<i v-if="list.isTop">置顶</i></span>
              <span class="cd-dynamic-time">{{list.createTime|moment('YYYY-MM-DD HH:mm')}}</span>
            </div>
          </div>

          <div class="cd-dynamic-content" style="padding-left: 0;">
            <span class="cd-dynamic-text">{{list.content}}</span>
            <img :src="attr" alt="" v-for="attr in list.imgs">
          </div>
          <div class="cd-dynamic-zan" style="padding-left: 0;">
            <i class="icon iconfont icon-dianzan dianzan zan"></i>
            <span style="padding-left: .1rem;">{{list.likes.items.toString()}} <span v-if="list.likes.num>20">等{{list.likes.num}}人点赞</span></span>
          </div>

        </li>
      </ul>
      <ul class="cd-dynamic-comment ad-dynamic-comment">
        <span class="ad-comment-title">评论</span>
        <li v-for="attr in list.comments.items" class="ad-comment-item">
          <img src="../../assets/default_avatar_male.jpg" alt="">
          <div class="ad-comment-content">
            <a>{{attr.u_name}}：</a>
            <span> {{attr.content}}</span>
            <i>20182810</i>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  import * as types from "../../store/mutations-type"

  export default {
    name: "articleDetail",
    data() {
      return {
        list: JSON.parse(this.$route.query.item)

      }
    },
    mounted() {
      console.log(this.list)
      this.getArticleList()
    },
    methods: {
      getArticleList() {
        this.$store.dispatch(types.COMMUNITY_PINGLUN_LIST, {
          aid: this.list.id
        }).then(res => {
          console.log(res)
        })
      }
    }
  }
</script>

<style scoped>

</style>