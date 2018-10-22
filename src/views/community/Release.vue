<template>
    <div class="re-box">
        <div class="re-header">
            <a href="javascript:history.back(-1);">取消</a>
            <div class="re-header-center">
                <span>社群</span>
            </div>
            <span @click="releaseComment" style="color: #208eda;">发布</span>
        </div>
        <div class="re-text">
            <textarea name="" id="" cols="30" rows="5" placeholder="写下你的观点" ref="searchInput"
                      v-model="info.content" autofocus="autofocus"></textarea>
            <ul class="img-list">
                <li v-for="(item,index) in imgShowList" :key="index">
                    <img :src="item" alt="">
                    <i @click="delImg(index)">X</i>
                </li>
                <li onclick="f.click()">
                    <div class="build-community-left">
                        <span class="add-box">
                            <i class="icon iconfont icon-tianjia">
                                <form id="form1">
                                <input type="button"/>
                                <p>
                                    <input type="file" id="f" name="f" @change="upload_img($event);"
                                           style="display:none"/>
                                </p>
                                </form>
                            </i>
                        </span>
                    </div>
                </li>
            </ul>
        </div>


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
                    imgs: [],
                },
                imgShowList: [],
                name: ''
            }
        },
        created() {
            this.info.gid = this.$route.params.gid
            this.name = this.$route.params.name
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
                        that.imgShowList.push(res.path)
                        console.log(that.info.imgs)
                    }
                });
                return false;
            },
            //发布
            releaseComment() {
                if (this.info.content == '') return this.fail('请输入文章内容')
                this.$store.dispatch(types.COMMUNITY_PUBLISH, this.info).then(res => {
                    console.log(res)
                    if (res.code == 0) {
                        this.success('发布成功')
                        this.$router.go(-1)         
                        // this.$router.go(-1)
                        // this.$router.replace({path:'/communityDynamic',query:{id:this.info.gid}})
                        // console.log('window.location.href');
                        // console.log(window.location.href);
                        // let url  = window.location.href
                        // console.log(window.location.href);
                        //  setTimeout(()=>{
                        //        console.log('window.location.href');
                        //        window.location.href =url
                        // console.log(window.location.href);
                        // this.$router.go(-1)
                        //  },1000)
                    } else {
                        this.fail('发布失败')
                    }
                })
            },
            //删除照片
            delImg(key) {
                this.imgShowList.splice(key, 1);
                this.info.imgs.splice(key, 1);
                console.log(this.imgShowList)
                console.log(this.info.imgs)
            }
        }
    }
</script>

<style scoped lang="scss">
    @import "../../assets/css/public";

    .build-community {
        background: rgb(245, 245, 245);
        border-top: 1px solid rgb(244, 244, 244);
        position: fixed;
        left: 0;
        right: 0;
        bottom: 0;
    }

    .re-box {
        height: 100%;
        display: flex;
        flex-direction: column;
    }

    .re-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: .88rem;
        border-bottom: 1px solid $fbb;
        background: #fff;
        padding: 0 .2rem;
        font-size: .3rem;
        &-center {
            display: flex;
            flex-direction: column;
            align-items: center;
            p {
                color: #999;
                font-size: .28rem;
            }
        }
    }

    .re-text {
        display: flex;
        flex-direction: column;
        flex: 1;
        padding-bottom: 1.1rem;
        textarea {
            border: 0;
            font-size: .32rem;
            margin: .3rem;
            padding: .3rem;
            height: 2.5rem;
        }
        .img-list {
            display: flex;
            flex-wrap: wrap;
            padding: 0 .3rem;
            li {
                position: relative;
                width: 2rem;
                height: 2rem;
                margin-right: .2rem;
                margin-bottom: .15rem;
                img {
                    height: 100%;
                    width: 100%;
                }
                i {
                    position: absolute;
                    top: -.1rem;
                    right: -.1rem;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    width: .3rem;
                    height: .3rem;
                    border-radius: .2rem;
                    background: #b9b7b7;
                    color: #fff;
                }
            }
        }
    }

    .comment-box {
        width: 100%;
    }

    #form1 {
        width: .8rem;
        height: .8rem;
        position: absolute;
        opacity: 0;
        input {
            height: 100%;
            width: 100%;
        }
    }

    .add-box {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 100%;
        width: 100%;
        .icon-tianjia {
            position: inherit !important;
            font-size: 1rem;
            background: #f2f5f7 !important;
        }
    }

    .build-community-left {
        height: 100%;
        width: 100%;
    }

    #form1 {
        width: 100% !important;
        height: 100% !important;

    }
</style>