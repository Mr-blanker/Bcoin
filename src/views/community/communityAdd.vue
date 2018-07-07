<template>
  <div>
    <Header v-bind="{center:2,centerValue:'创建社群'}"></Header>
    <div class="communityAdd-box pt">
      <yd-cell-group>
        <yd-cell-item>
          <span slot="left">社群名称：</span>
          <input slot="right" type="text" placeholder="请输入社群名称" v-model="imgInfo.name" style="text-align: right">
        </yd-cell-item>
        <div  class="community-logo-box">
          <div class="community-logo-main">
            <span>社群logo</span>
            <img v-if="imgInfo.logo" :src="imgInfo.logo" alt="">
            <div v-else class="add-icon">
              <i class="icon iconfont icon-tianjia"></i>
            </div>
            <input type="file" name="avatar" accept="image/gif,image/jpeg,image/jpg,image/png"  @change="changeImage($event)" ref="avatarInput">
          </div>
        </div>
        <yd-cell-item style="height: 2.5rem;">
          <yd-textarea slot="right" placeholder="请输入社群描述"
                       style="height: 100% !important;text-align: right" v-model="imgInfo.desc"></yd-textarea>
        </yd-cell-item>
        <yd-cell-item type="label">
          <div slot="left">是否收费</div>
          <yd-switch slot="right" v-model="imgInfo.charge"></yd-switch>
        </yd-cell-item>
      </yd-cell-group>
    </div>
    <div class="btn_box">
      <a style="display:inline-block;width:100%" @click="add">创建</a>
    </div>
    <Upload ref="upload" class="file-uploader" :maxSelect="1" @base="uploadSuccess"></Upload>
  </div>
</template>

<script>
  import Upload from "../../components/upload/Upload"
  import * as types from "../../store/mutations-type"
  import http from '../../plugins/http'
  export default {
    name: "communityAdd",
    data() {
      return {
        imgInfo: {
          name: '',
          logo: '',
          desc: '',
          charge: true
        },
        imgUrl: {}
      }
    },
    components: {
      Upload
    },
    methods: {
      //上传图片转换base64
      uploadSuccess(res,file) {
        console.log(file)
        this.imgInfo.logo = res
        var fd = new FormData();
        console.log(fd)
        fd.append('f',file);
        this.$store.dispatch(types.UPLOAD_IMAGE,fd).then(res => {
          console.log(res)
        })
      },
      add() {
        console.log(this.imgInfo)
        console.log(this.imgUrl)
        // if (this.imgInfo.name == '') {
        //   this.fail('请输入社群名称')
        //   return
        // }
        // if (this.imgInfo.logo == '') {
        //   this.fail('请选择社群logo')
        //   return
        // }
        // if (this.imgInfo.desc == '') {
        //   this.fail('请输入社群描述')
        //   return
        // }
        this.submit()
      },
      submit() {
        console.log(this.$refs.avatarInput.files[0])
        var image = new FormData()
        console.log(this.imgInfo.logo)
        console.log(image)
        http.post('/api/upload',image).then(res=>{
          console.log(res.data)
        })
        // this.$store.dispatch(types.UPLOAD_IMAGE, {data:image}).then(res => {
        //   console.log(res)
        // })
      },
      changeImage(e){
        console.log(e)
        http.post('/api/upload',e.path[0]).then(res=>{
          console.log(res.data)
        })
      }
    }
  }
</script>

<style scoped>

</style>