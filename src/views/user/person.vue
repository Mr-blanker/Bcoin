<template>
  <div>
    <Header v-bind="{centerValue:'我的',center:2}"></Header>
    <div class="mine" style="padding-top: .85rem;">
      <!-- <div class="head" @click="$router.push({path:'personMessage'})">
              <div class="head-left">
                <img :src="userInfo.avatar" alt="" v-if="userInfo.avatar">
                <img src="../../assets/default_avatar_male.jpg" alt="" v-else>
                <span>{{userInfo.name?userInfo.name:'点击登录'}}</span>
              </div>
              <i class="icon iconfont icon-gengduo"></i>
            </div> -->
      <main class="main1">
        <div class="myIndex">
          <div>
            <a @click="$router.push({path:'personMessage'})" class="links avatar">
              <div class="disLeft">
                <span>
                                  <img width="1.1rem" height="1.1rem" :src="userInfo.avatar" alt="" v-if="userInfo.avatar">
                                  <img width="1.1rem" height="1.1rem" src="../../assets/default_avatar_male.jpg" alt="" v-else>  
                              </span>
                <span>
                                  {{userInfo.name?userInfo.name:'点击登录'}}
                              </span>
              </div>
              <div class="disRight">
                <span>
                                  个人信息
                              </span>
                <span class="iconfont icon-arrow02">
                              </span>
              </div>
            </a>
          </div>
        </div>
      </main>
      <yd-cell-group style="margin-top:.2rem;border: 0;">
        <yd-cell-item arrow type="a" @click.native="$router.push({path:'addressList'})">
          <span slot="left">收货地址</span>
          <span slot="right"></span>
        </yd-cell-item>
        <yd-cell-item arrow type="a" @click.native="$router.push({path:'mallIndex'})">
          <span slot="left">积分商城</span>
          <span slot="right"></span>
        </yd-cell-item>
        <yd-cell-item arrow type="a" @click.native="$router.push({path:'ownAuction'})">
          <span slot="left">我的竞拍</span>
          <span slot="right"></span>
        </yd-cell-item>
        <yd-cell-item arrow type="a" @click.native="$router.push({path:'ownOrder'})">
          <span slot="left">我的订单</span>
          <span slot="right"></span>
        </yd-cell-item>
        <yd-cell-item arrow type="a" @click.native="$router.push({path:'myCoin'})">
          <span slot="left">我的资产</span>
          <span slot="right"></span>
        </yd-cell-item>
        <yd-cell-item arrow type="a" @click.native="submit">
          <span slot="left">安全退出</span>
          <span slot="right"></span>
        </yd-cell-item>
        <yd-cell-item arrow type="a" @click.native="shareFriendCircle">
          <span slot="left">分享测试</span>
          <span slot="right"></span>
        </yd-cell-item>
        <yd-cell-item arrow type="a" @click.native="shareToFriend">
          <span slot="left">分享给好友测试</span>
          <span slot="right"></span>
        </yd-cell-item>
      </yd-cell-group>
    </div>
  </div>
</template>

<script>
  import {mapGetters} from "vuex";
  import * as types from "../../store/mutations-type";
  export default {
    name: "person",
    computed: {
      ...mapGetters(['userInfo'])
    },
    methods: {
      submit() {
        this.$store.dispatch(types.USER_LOGOUT).then(res => {
          if (res.code === 0) {
            this.success('登出成功')
            this.$router.go(-1)
          }
        })
      },
      shareFriendCircle() {
        //$plusBus已挂载全局
        //第一个参数shares为分享服务的类型数据列表，当前仅有微信分享服务所以share[0]即可,且share已挂载全局
        //第二个参数为具体分享信息:
        // -------------------type:WXSceneTimeline(分享到微信朋友圈)，WXSceneSession(分享给微信好友)
        // -------------------msg:分享的信息,可为文章的title
        // -------------------href:分享后，朋友点击后跳转的页面地址
        // -------------------imgUrl:缩略图路径,可为网络或本地路径，不要超过20k
        //分享到朋友圈示例
        $plusBus.share.shareAction(shares[0],{
          type:'WXSceneTimeline',
          msg: '分享朋友圈测试',
          url: 'http://www.baidu.com',
          imgUrl:'http://zhenghui.hc101.cn/image/IMG_1874.JPG'
        })
      },
      shareToFriend() {
        //分享给好友示例
        $plusBus.share.shareAction(shares[0], {
          type:'WXSceneSession',
          msg: '分享给好友测试',
          url: 'http://www.baidu.com',
          imgUrl:'http://zhenghui.hc101.cn/image/IMG_1874.JPG'
        })
      }
    },
    mounted() {
      console.log(this.userInfo)
      if (this.userInfo.name) {
        console.log(1)
      } else {
        console.log(2)
      }
    }
  }
</script>

<style scoped>

</style>
