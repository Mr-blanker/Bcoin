<template>
  <div>
    <Header v-bind="{left:1,center:2,centerValue:'详情'}"></Header>
    <yd-popup v-model="show4" position="right">

      <div class="zl-header">
        <i class="icon iconfont icon-fanhui" @click="show4=false"></i>
        <span>{{list.likes.num}}人赞过</span>
      </div>
      <div class="zl-list pullScroll">
        <div id="scroll">
          <div>
            <div v-for="item in dianzanList" class="zl-item" @click.stop="forbid">
              <img src='../../assets/default_avatar_male.jpg' alt="" v-if="!item.pic">
              <img :src='item.pic' alt="" v-if="item.pic">
              <span>{{item.name}}</span>

            </div>
          </div>
        </div>

      </div>
    </yd-popup>
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
            <span style="padding-left: .1rem;">{{list.likes.items.slice(0,2).toString()}} <span @click="getDianzanList"
                                                                                                style="color:#000;font-size: .25rem">{{list.likes.num}}人赞过<i
              class="icon iconfont icon-gengduo" style="font-size: .2rem"></i>
 </span></span>
          </div>

        </li>
      </ul>
      <div class="cd-dynamic-comment ad-dynamic-comment pullScroll">
        <span class="ad-comment-title">评论</span>
        <div id="scroll1" style="width: 100%;">
          <ul>
            <li v-for="attr in commentList" class="ad-comment-item">
              <img src="../../assets/default_avatar_male.jpg" alt="" v-if="!attr.pic">
              <img :src="attr.pic" alt="" v-if="attr.pic">
              <div class="ad-comment-content">
                <a>{{attr.name}}：</a>
                <span> {{attr.content}}</span>
                <i @click="forbid(attr.uid)" v-if="userInfo.uid===list.uid">禁言</i>
              </div>
            </li>
          </ul>
        </div>

      </div>
    </div>

  </div>
</template>

<script>
  import * as types from "../../store/mutations-type"
  import {mapGetters} from 'vuex'

  export default {
    name: "articleDetail",
    data() {
      return {
        list: JSON.parse(this.$route.query.item),
        commentList: [],
        dianzanList: [],
        show4: false,
        zanLen: 0,
        commentLen: 0,
        commentCount: 1,
        zanCount: 1
      }
    },
    computed: {
      ...mapGetters(['userSid', 'userInfo'])
    },
    mounted() {
      console.log(this.list)
      let that = this
      this.scroll = new PullScroll("scroll", {
        refresh: function (pullScroll) {
          that.zanLen = 0
          that.dianzanList = []
          that.initDataList(pullScroll)
        },
        loading: function (pullScroll) {
          that.loadDataList(pullScroll);
        }
      });
      this.scroll1 = new PullScroll("scroll1", {
        refresh: function (pullScroll) {
          that.commentLen = 0
          that.commentList = []
          that.initDataList1(pullScroll)
        },
        loading: function (pullScroll) {
          that.loadDataList1(pullScroll);
        }
      });
      this.scroll1.triggerRefresh();
    },
    methods: {
      //获取文章评论列表
      initDataList1(pullScroll) {
        this.loadDataList1(pullScroll);
      },
      loadDataList1(pullScroll) {
        if (this.commentLen !== 0) {
          pullScroll.finish(this.commentCount < this.commentLen);
        }
        this.commentLen += 20
        this.$store.dispatch(types.COMMUNITY_PINGLUN_LIST, {
          aid: this.list.id,
          len: this.commentLen
        }).then(res => {
          console.log(res)
          if (res.code !== 0) return
          this.commentList = res.data
          this.commentCount = res.data.length
          pullScroll.finish(this.commentCount < this.commentLen);
        })
      },


      //点赞列表
      initDataList(pullScroll) {
        console.log(this.index)
        this.loadDataList(pullScroll);
      },
      loadDataList(pullScroll) {
        if (this.zanCount !== 0) {
          pullScroll.finish(this.zanCount < this.zanLen);
        }
        this.zanLen += 20
        this.$store.dispatch(types.COMMUNITY_DIANZAN_LIST, {aid: this.list.id, len: this.zanLen}).then(res => {
          console.log(res)
          if (res.code !== 0) return
          this.dianzanList = res.data
          this.zanCount = res.data.length
          pullScroll.finish(this.zanCount < this.zanLen);

        })
      },
      //获取文章点赞列表
      getDianzanList() {
        this.show4 = true
        this.scroll.triggerRefresh();

      },
      //禁言
      forbid(id) {
        let that = this
        let info = {
          uid: id,
          gid: this.list.id,
          isForbid: true,
          duration: 0

        }
        utils.dialog.prompt('禁言时长（h）', (value) => {
          if (value !== '') info.duration = Number(value)
          $.ajax({
            contentType: 'application/json',
            url: "http://ssl.pandawork.vip/api/user/group.forbid",
            type: 'POST',
            data: JSON.stringify(info),
            headers: {
              sid: that.userSid
            },
            dataType: 'JSON',
            cache: false,
            processData: false,
            success: (res) => {
              console.log(res)
              if (res.code === 401) {
                that.$router.push({path: 'Login'})
              }
              that.scroll1.triggerRefresh();

            }
          })
        })
      }
    }
  }
</script>

<style scoped>

</style>