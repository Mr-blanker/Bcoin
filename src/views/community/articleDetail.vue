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
      <div class="cd-dynamic-comment ad-dynamic-comment pullScroll" style="padding-bottom:30px">
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
      <div class="id-comment" @click.stop="newComment">
        <input type="text" placeholder="写评论..." disabled="disabled">
        <i class="icon iconfont icon-dianzan" style="font-size: .5rem;" :class="{'is-dianzan':list.isLike}"
           @click.stop="dianzan()"></i>
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

      //评论列表（评论加载）
      getCommentList() {
        this.$store.dispatch(types.COMMUNITY_PINGLUN_LIST, {
          aid: this.list.id,
          len: this.commentLen
        }).then(res => {
          console.log(res)
          this.commentList = res.data
        })
      },

      //点赞列表
      initDataList(pullScroll) {
        console.log(this.index)
        this.loadDataList(pullScroll);
      },
      loadDataList(pullScroll) {

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
      },
      //评论
      newComment() {
        console.log(this.id)
        let that = this
        utils.dialog.prompt('写下你的观点', (value) => {
          if (value == '') return
          let info = {
            aid: that.list.id,
            content: value
          }
          console.log(info)
          $.ajax({
            contentType: 'application/json',
            url: "http://ssl.pandawork.vip/api/user/group.comment",
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
              // that.scroll1.triggerRefresh();
              that.getCommentList()

            }
          })
        });
      },
      //文章点赞
      dianzan() {
        let like = true
        if (this.list.isLike) {
          like = false
        }
        let that = this
        let info = {aid: that.list.id, like: like}
        $.ajax({
          contentType: 'application/json',
          url: "http://ssl.pandawork.vip/api/user/group.like",
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
            if (res.code === 0) {
              that.list.isLike = !that.list.isLike
              if (like) {
                that.list.likes.items.push(that.userInfo.name)
                that.list.likes.num++
              } else {
                let str
                str = that.list.likes.items.toString().replace(that.userInfo.name, '')
                that.list.likes.items = str.split(',')
                for (let i in that.list.likes.items) {
                  if (that.list.likes.items[i] == '') {
                    that.list.likes.items.splice(i, 1)
                  }
                }
                that.list.likes.num--

              }
              that.scroll.triggerRefresh()
            } else if (res.code === 401) {
              that.$router.push({path: 'Login'})
            }
          }
        })
        return false;

      },
    }
  }
</script>

<style scoped lang="scss">
  @import "../../assets/css/public";

  .ad-comment-item {
    min-height: 1rem;
    padding: .3rem 0 !important;
    border-bottom: 1px solid #dadada;
    flex-wrap: wrap;
    &:last-child {
      border: 0;
    }
    img {
      height: .8rem;
      width: .8rem;
      border-radius: 100%;
    }
  }

  .cd-dynamic-comment {
    display: flex;
    flex-wrap: wrap;
    padding: 10px 0 0 .8rem;
    background: #fff;
    font-size: .3rem;
    li {
      display: flex;
      width: 100%;
      padding-bottom: .1rem;
      overflow: hidden;
      span {
        text-align: left;
      }
    }
  }

  .ad-dynamic-comment {
    padding: 10px;
    margin-top: 10px;
    .ad-comment-title {
      display: flex;
      align-items: center;
      height: 40px;
      width: 100%;
      border-bottom: 1px solid #dadada;
    }
  }

  .cd-dynamic-item {
    padding: 10px 0;
    border-bottom: 1px solid $fbb;
    &:last-child {
      border-bottom: 0;
    }
  }

  .cd-dynamic-user {
    position: relative;
    display: flex;
    height: .8rem;
    img {
      height: 100%;
      border-radius: 100%;
      width: .8rem;
    }
  }

  .cd-dynamic-user-info {
    display: flex;
    flex-direction: column;
    align-items: self-start;
    padding-left: 5px;
  }

  .cd-dynamic-title {
    font-size: .32rem;
    color: $bg;
    i {
      display: inline-flex;
      font-size: .2rem;
      border: 1px solid $bg;
      height: .3rem;
      align-items: center;
      margin-left: 1rem;
      color: $bg;
    }
  }

  .cd-dynamic-time {
    font-size: .25rem;
    color: #666;
  }

  .istop {
    position: absolute;
    right: 0;
    top: 0;
    color: $bg;
  }

  .cd-dynamic-content {
    padding: 10px 0 0 .8rem;
    .cd-dynamic-text {
      display: flex;
      text-align: left;
      font-size: .32rem;
    }
    img {
      display: inline-flex;
      width: 32%;
    }
  }

  .cd-dynamic-icon {
    display: flex;
    align-items: center;
    i {
      font-size: .5rem;
      margin-right: 20px;
    }
  }

  .cd-dynamic-zan {
    padding: 10px 0 0 .8rem;
    font-size: .3rem;
    display: flex;
    align-items: center;
    color: $bg;
    i {
      font-size: .35rem;

    }
  }

  .zl-header {
    position: relative;
    height: .9rem;
    background: #fff;
    color: #000;
    border-bottom: 1px solid $fbb;
    font-size: .35rem;
    i {
      position: absolute;
      top: 50%;
      left: .2rem;
      transform: translate(0, -50%);
      font-size: .4rem;

    }
    span {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  }

  .zl-item {
    display: flex;
    align-items: center;
    height: 1.2rem;
    padding-left: .2rem;
    img {
      height: .8rem;
      width: .8rem;
      border-radius: 100%;
    }
    span {
      position: relative;
      flex: 1;
      display: flex;
      align-items: center;
      height: 100%;
      border-bottom: 1px solid $fbb;
      padding-left: .1rem;
      padding-right: .2rem;
      font-size: .3rem;
      i {
        position: absolute;
        right: .2rem;
        top: 50%;
        transform: translate(0, -50%);
        font-size: .25rem;
      }
    }
  }

  .id-comment {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    display: flex;
    align-items: center;
    text-align: left;
    padding: 0 .2rem;
    height: 35px;
    background: #fff;
    border-top: 1px solid #efefef;
    input {
      width: 85%;
      height: 90%;
      border: 0;
      background: #f3f3f3;
      border-radius: 15px;
      padding-left: 20px;
      font-size: .3rem;
    }
    i {
      padding-left: .3rem;
    }
  }

  .is-dianzan {
    color: #208de3;
  }
</style>