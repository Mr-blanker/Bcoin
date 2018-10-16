<template>
    <div>
        <Header v-bind="{center:2,centerValue:'创建社群',left:1}"></Header>
        <div class="communityAdd-box pt">
            <yd-cell-group>
                <div class="community-logo-box">
                    <div class="community-logo-main">
                        <span slot="left">社群名称：</span>
                        <input slot="right" type="text" placeholder="请输入社群名称" v-model="communityInfo.name"
                               style="text-align: right;flex: 1;height: 100%;border: 0;">
                    </div>
                </div>
                <div class="community-logo-box">
                    <div class="community-logo-main">
                        <span>社群logo</span>
                        <img v-if="imgUrl" :src="imgUrl" alt="">
                        <div v-else class="add-icon">
                            <i class="icon iconfont icon-tianjia">
                            </i>
                            <form id="form1">
                                <input type="button" onclick="f.click()"/>
                                <br>
                                <p>
                                    <input type="file" id="f" name="f" @change="upload_img($event);"
                                           style="display:none"/>
                                </p>
                            </form>
                        </div>

                    </div>
                </div>
                <yd-cell-item style="height: 2.5rem;">
                    <yd-textarea slot="right" placeholder="请输入社群描述"
                                 style="height: 100% !important;text-align: right"
                                 v-model="communityInfo.desc"></yd-textarea>
                </yd-cell-item>
                <div type="label" class="community-logo-box">
                    <div class="community-logo-main" :class="{'clm-active':!communityInfo.charge}">
                        <div slot="left">是否收费</div>
                        <yd-switch slot="right" v-model="communityInfo.charge"></yd-switch>
                    </div>
                </div>
                <div class="community-logo-box" v-if="communityInfo.charge">
                    <div class="community-logo-main" style="border-bottom: 0;">
                        <span slot="left">入群积分：</span>
                        <input slot="right" type="text" placeholder="请输入入群积分" v-model="point"
                               style="text-align: right;flex: 1;height: 100%;border: 0;">
                    </div>
                </div>
            </yd-cell-group>
        </div>
        <div class="btn_box">
            <a style="display:inline-block;width:100%" @click="add">创建</a>
        </div>
    </div>
</template>

<script>
    import Upload from "../../components/upload/Upload"
    import * as types from "../../store/mutations-type"
    import {mapGetters} from "vuex"

    export default {
        name: "communityAdd",
        data() {
            return {
                communityInfo: {
                    name: '',
                    logo: '',
                    desc: '',
                    charge: false
                },
                point: 1,
                file: '',
                imgUrl: ''
            }
        },
        components: {
            Upload
        },
        computed: {
            ...mapGetters(['userSid'])
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
                        that.communityInfo.logo = res.file
                        that.imgUrl = res.path
                    }
                });
                return false;
            },

            add() {
                if (this.communityInfo.name == '') {
                    this.fail('请输入社群名称')
                    return
                }
                if (this.communityInfo.logo == '') {
                    this.fail('请选择社群logo')
                    return
                }
                if (this.communityInfo.desc == '') {
                    this.fail('请输入社群描述')
                    return
                }
                this.submit()
            },
            submit() {
                if (this.communityInfo.charge) {
                    this.communityInfo.charge = this.point
                } else {
                    this.communityInfo.charge = 0
                }
                this.$store.dispatch(types.COMMUNITY_CREATE, this.communityInfo).then(res => {
                    console.log(res)
                    console.log(res.code)
                    if (res.code == 0) {
                        this.success('创建成功', 'community')
                    } else {
                        this.fail(res.msg)
                    }
                })
            },
        }
    }
</script>

<style scoped lang="scss">
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

    .clm-active {
        border-bottom: 0 !important;
    }
</style>