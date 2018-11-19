<template>
    <div>
        <Header v-bind="{center:2,centerValue:'快讯'}"></Header>
        <div>
            <!--<div class="flash-list mescroll" id="newsScroll">-->
            <!--<div>-->
            <!--<div class="flash-item" v-for="(item,key) in flashList">-->
            <!--<p class="flash-time">{{item.k_time*1000|moment('MM-DD HH:mm')}}</p>-->
            <!--<span style="font-size: .35rem;font-weight: bold;display: block;">{{item.k_title}}</span>-->
            <!--<span class="flash-content" v-html="item.k_content" style="font-size:.3rem"></span>-->
            <!--<div class="flash-comment">-->
            <!--<div>-->
            <!--<span class="flash-duo" @click="comment(item,'duo',key)">看多（{{item.duo}}）</span>-->
            <!--<span class="flash-kong" @click="comment(item,'kong',key)">看空（{{item.kong}}）</span>-->
            <!--</div>-->
            <!--<span style='color: #208de3'>分享</span>-->
            <!--</div>-->
            <!--</div>-->
            <!--</div>-->
            <!--</div>-->
            <main class="container main1 mescroll" id="newsScroll">
                <ul class="lives_list">
                    <li class="item" v-for="(item,key) in flashList" :key="key">
                        <div class="date">{{item.k_time*1000|moment('MM-DD HH:mm')}}</div>
                        <div class="title limit">{{item.k_title}}</div>
                        <div class="subtitle" v-html="item.k_content" :id="'content_'+key"></div>
                        <div class="other">
                            <a class="many current" @click="comment(item,'duo',key)">
                                <span class="iconfont icon-tubiaoshangshengqushi"></span>看多{{item.duo}}
                            </a>
                            <a class="air" @click="comment(item,'kong',key)">
                                <span class="iconfont icon-tubiaoshangshengqushi"></span> 看空{{item.kong}}
                            </a>
                            <a class="share" @click="share(item,key)">
                                <span class="iconfont icon-share01"></span> 分享
                            </a>
                        </div>
                    </li>
                </ul>
            </main>
            <yd-popup v-model="shareChooseModal" position="bottom" height="15%">
                <yd-cell-group>
                    <yd-cell-item arrow type="a" @click.native="shareFriendCircle">
                        <span slot="left">分享微信朋友圈</span>
                        <span slot="right"></span>
                    </yd-cell-item>
                    <yd-cell-item arrow type="a" @click.native="shareToFriend">
                        <span slot="left">分享给微信好友</span>
                        <span slot="right"></span>
                    </yd-cell-item>
                </yd-cell-group>
            </yd-popup>
            <yd-popup v-model="shareImgModal" position="center" height="80%">
                <div class="share-box" id="shareImg">
                    <div class="logo-box">
                        <img src="../../../static/images/logo.png" alt="">
                        <div class="logo-text">7x24区块链实时信息</div>
                    </div>
                    <div class="share-content" id="shareHtml"></div>
                    <div class="code-box">
                        <img src="../../../static/images/qrcode.png" alt="">
                        <div>扫二维码关注我们</div>
                    </div>
                </div>
            </yd-popup>
        </div>
        
    </div>
</template>

<script>
    import * as types from '../../store/mutations-type'
    import {mapGetters} from "vuex"
    import html2canvas from 'html2canvas'
    var FileSaver = require('file-saver');
    import {Loading, Confirm} from 'vue-ydui/dist/lib.rem/dialog';
    export default {
        name: "flashMsg",
        data() {
            return {
                flashList: [],
                flash: {
                    flashLen: 0,
                    flashCount: -1,
                },
                shareChooseModal: false,
                shareImgModal:false,
                shareNew: '',
                shareHtml:'',
                shareType:''
            }
        },
        computed: {
            ...mapGetters(['scrollTop'])
        },
        beforeRouteEnter(to, from, next) {
            next(vm => {
                let scrollTop = parseInt(window.sessionStorage.getItem('heightScrollTop_' + to.name));
                vm.scroll && vm.scroll.scrollTo(scrollTop, 0)
            })
        },
        mounted() {
            let that = this
            $(document.body).append('<div class="modal-wx" id="wxModal"></div>')
            this.scroll = new MeScroll("newsScroll", {
                down: {
                    callback: that.initDataList,
                },
                up: {
                    callback: that.loadDataList,
                    auto: false,
                    htmlNodata: '<p class="upwarp-nodata">没有更多了</p>'
                }
            });
        },
        methods: {
            initDataList() {
                this.flash.flashLen = 0
                this.loadDataList()
            },
            loadDataList() {
                this.flash.flashLen += 20
                this.$store.dispatch(types.FLASH_LIST, {
                    len: this.flash.flashLen
                }).then(res => {
                    console.log(res)
                    this.flashList = res
                    this.flash.flashCount = res.length
                    this.scroll.endSuccess(res.length, this.flash.flashCount >= this.flash.flashLen);
                    if (this.flash.flashCount < this.flash.flashLen)
                        this.scroll.endUpScroll(true)
                })
            },
            //快讯点评
            comment(item, val, key) {
                alert(JSON.stringify($plusBus))
                this.$store.dispatch(types.FLASH_COMMENT, {
                    k_id: item.k_id,
                    view: val
                }).then(res => {
                    if (res.code !== 0) return
                    if (val == 'duo') {
                        this.flashList[key].duo = res.num
                    } else {
                        this.flashList[key].kong = res.num
                    }
                })
            },
            share(item,key){
                let el = $('#content_'+key).clone()
                this.shareNew=item
                $('#shareHtml').empty()
                $('#shareHtml').append(el)
                // this.shareImgModal = true
                this.shareChooseModal=true;

            },
            shareFriendCircle() {
                try {
                    //$plusBus已挂载全局
                    //第一个参数shares为分享服务的类型数据列表，当前仅有微信分享服务所以share[0]即可,且share已挂载全局
                    //第二个参数为具体分享信息:
                    // -------------------type:WXSceneTimeline(分享到微信朋友圈)，WXSceneSession(分享给微信好友)
                    // -------------------msg:分享的信息,可为文章的title
                    // -------------------href:分享后，朋友点击后跳转的页面地址
                    // -------------------imgUrl:缩略图路径,可为网络或本地路径，不要超过20k
                    //分享到朋友圈示例
                    Loading.open('分享图片生成中!');
                    this.shareChooseModal = false;
                    $('#wxModal').css({'visibility':'visible'})
                    this.shareType = 2
                    this.createImg()
                } catch (err) {
                    console.log(err)
                }
            },
            shareToFriend(item) {
                try {
                    //分享给好友示例
                    Loading.open('分享图片生成中!');
                    $('#wxModal').css({'visibility':'visible'})
                    this.shareChooseModal = false;
                    this.shareType = 1
                    this.createImg()
                    
                } catch (err) {
                    console.log(err)
                }
            },
            createImg() {
                let that = this
                return html2canvas(document.querySelector('#shareImg')).then((canvas)=>{
                    // var imgUri = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream")
                    var type = 'png';
                    var imgData = canvas.toDataURL(type);
                    var _fixType = function(type) {
                        type = type.toLowerCase().replace(/jpg/i, 'jpeg');
                        var r = type.match(/png|jpeg|bmp|gif/)[0];
                        return 'image/' + r;
                    };
                    imgData = imgData.replace(_fixType(type),'image/octet-stream');
                    let fileImg = this.base64ToBlob(imgData)
                    var fd = new FormData()
                    fd.append('file', fileImg,"share.jpg")
                    $.ajax({
                        url: "http://ssl.pandawork.vip/api/upload",
                        type: 'POST',
                        data: fd,
                        headers: {
                            sid: that.userSid
                        },
                        dataType: 'JSON',
                        cache: false,
                        processData: false,
                        contentType: false
                    }).done(function (res) {
                        console.log(res)
                        Loading.close()
                        let type = ''
                        if(that.shareType==1){
                            type = 'WXSceneSession'
                        }else if(that.shareType==2){
                            type = 'WXSceneTimeline'
                        }
                        $plusBus.share.shareAction(shares[0], {
                                type,
                                msg: that.shareNew.k_title,
                                imgPic:res.path
                            }, (status) => {
                                that.shareChooseModal = false;
                                $('#wxModal').css({'visibility':'hidden'})
                        })
                        setTimeout(()=>{
                            $('#wxModal').css({'visibility':'hidden'})
                        },6000)
                         
                    }).fail(function(err){
                         Loading.close()
                         $('#wxModal').css({'visibility':'hidden'})
                    })
                    });
            },
            base64ToBlob(urlData) {
                var arr = urlData.split(',');
                var mime = arr[0].match(/:(.*?);/)[1] || 'image/png';
                // 去掉url的头，并转化为byte
                var bytes = window.atob(arr[1]);
                // 处理异常,将ascii码小于0的转换为大于0
                var ab = new ArrayBuffer(bytes.length);
                // 生成视图（直接针对内存）：8位无符号整数，长度1个字节
                var ia = new Uint8Array(ab);

                for (var i = 0; i < bytes.length; i++) {
                    ia[i] = bytes.charCodeAt(i);
                }

                return new Blob([ab], {
                    type: mime
                });
            }
        },
        beforeRouteLeave(from, to, next) {
            this.$store.commit('SET_SCROLL_TOP', this.scroll.getScrollTop())
            next()
        }
    }
</script>

<style lang="scss" scoped>
    .mescroll {
        position: fixed;
        top: .9rem;
        bottom: 1.1rem;
        height: auto;
    }
    .flash-comment {
        display: flex;
        justify-content: space-between;
    }
    .container {
        text-align: left;
    }
    .lives_list {
        background: #fff;
    }
    .current .icon-tubiaoshangshengqushi {
        display: inline-flex !important;
        align-items: center;
        justify-content: center;
        font-size: .2rem !important;
        background: #d0031a;
        color: #fff;
        height: .3rem;
        width: .3rem;
        border-radius: 100%;
    }
    .air .icon-tubiaoshangshengqushi {
        display: inline-flex !important;
        align-items: center;
        justify-content: center;
        font-size: .2rem !important;
        background: #acacac;
        color: #fff;
        height: .3rem;
        width: .3rem;
        border-radius: 100%;
    }
    .share-box {
        width: 6rem;
        background: #fff;
        padding:5px;
    }
    .logo-box {
        width: 100%;
        height: 2.4rem;
        &>img {
            margin: .4rem 0 0;
        }
        .logo-text {
            font-size: .44rem;
        }
    }
    .code-box {
        display: flex;
        align-items: center;
        justify-content: space-around;
        &>img {
            width: 2rem;
            height: 2rem;
        }
        &>div {
            font-size:.35rem
        }
    }
    .share-content {
        text-align: left;
        padding: 5px;
    }
    
</style>
