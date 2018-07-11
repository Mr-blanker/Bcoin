<template>
  <div class="re-box">
    <div class="re-header">
      <a href="javascript:history.back(-1);">取消</a>
      <div class="re-header-center">
        <span>发布至</span>
        <p>{{name}}</p>
      </div>
      <span @click="release">发布</span>
    </div>
    <div class="re-text">
      <textarea name="" id="" cols="30" rows="10" placeholder="写下你的观点" ref="searchInput"
                v-model="info.content" autofocus="autofocus"></textarea>

    </div>
    <li class="build-community padlr02" onclick="f.click()">
      <div class="build-community-left">
            <span class="add-box">
            <i class="icon iconfont icon-tianjia">
               <form id="form1">
                <input type="button" />
                <p>
                  <input type="file" id="f" name="f" @change="upload_img($event);" style="display:none"/>
                </p>
                </form>
            </i>
            </span>
      </div>
      <i class="icon iconfont icon-gengduo"></i>
    </li>

  </div>
</template>

<script>
  import * as types from "../../store/mutations-type"

  export default {
    name: "Release",
    data() {
      return {
        info: {
          gid: '',
          content: '',
          imgs: []
        },
        name:this.$route.query.name
      }
    },
    mounted() {
      this.$refs.searchInput.focus();

    },
    methods: {
      //上传图片
      upload_img(event) {
        let that = this
        console.log(event)
        var data = new FormData($('#form1')[0]);
        $.ajax({
          url: "http://ssl.pandawork.vip/api/upload",
          type: 'POST',
          data: data,
          headers: {
            sid: that.userSid
          },
          dataType: 'JSON',
          cache: false,
          processData: false,
          contentType: false
        }).done(function (res) {
          console.log(res)
          if (res.code == 0) {
            console.log(res.path)
            that.info.imgs.push(res.file)
          }
        });
        return false;
      },
      release() {
        if (this.info.content == '') {
          this.fail('请输入文章内容')
          return
        }
        this.info.gid = this.$route.query.gid
        console.log(this.info)
        this.$store.dispatch(types.COMMUNITY_PUBLISH,this.info).then(res=>{
          console.log(res)
          if(res.code===0){
            this.success('发布成功')
            this.$router.go(-1)
          }else{
            this.fail('发布失败')
          }
        })
      }
    }
  }
</script>

<style scoped>
.build-community{
  background: rgb(245, 245, 245);
  border-top: 1px solid rgb(244, 244, 244);
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
}
</style>