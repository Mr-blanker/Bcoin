<template>
    <div>
        <div style="position: fixed;top:-100px">
            <form id="filee">
                <canvas id="upload-canvas" style="display:none"></canvas>
                <!--<input type="file" name="file" multiple :id="'tgUploadFileInput' + domId" @change="changeHandle" v-if="maxSelect > 1" />-->
                <input type="file" name="f" id='f' @change="changeHandle" v-if="maxSelect <= 1"/>
            </form>
        </div>
    </div>
</template>

<script>
    import "./exif";
    import http from "./http";
    import MegaPixImage from "./megapix-image";
    import {mapGetters} from "vuex";

    export default {
        name: "upload",
        props: {
            multiple: {
                type: Boolean,
                default: false
            },
            showProgress: {
                type: Boolean,
                default: true
            },
            maxSelect: {
                type: Number,
                default: 9
            },
            onUploadSuccess: {
                type: Function,
                require: true
            },
            api: {
                type: String,
                default: "https://www.liansj.com:4433/api/user/upload"
            },
            base: {
                type: String,
                default: ""
            }
        },

        data() {
            return {
                el: null,
                files: [],
                doneCount: 0,
                option: {},
                domId: Math.random()
                    .toString()
                    .substring(2, 4)
            };
        },

        computed: {
            ...mapGetters(["token"])
        },
        mounted() {
            this.el = document.getElementById('f');

        },

        methods: {
            // 选择文件
            choiceFile() {
                // console.log(this.el.value);
                return this.el.click();
            },

            // 文本框内容改变
            changeHandle(e) {
                // console.log(e.target.files);
                // console.log(e.dataTransfer.files);
                console.log(e.path[0]);
                console.log(this.el)
                let files = e.target.files || e.dataTransfer.files;
                if (files.length === 0) return;
                for (let i in files) {
                    if (i === "length") return;
                    this.files.push({
                        name: files[i].name,
                        result: "准备上传",
                        percent: 0
                    });
                    this.startUpload(files[i], i);
                }
            },

            // 开始上传
            startUpload(file, index) {
                let that = this;
                EXIF.getData(file, function () {
                    let orient = EXIF.getTag(this, "Orientation");
                    let mpImg = new MegaPixImage(file);
                    let canvas = document.getElementById("upload-canvas");
                    mpImg.render(
                        canvas,
                        {maxWidth: 1000, maxHeight: 1000, orientation: orient},
                        () => {
                            that._httpUploadBase64(
                                canvas.toDataURL("image/jpg"),
                                index
                            );
                        }
                    );
                });
            },

            // 上传至服务器
            _httpUploadBase64(Base64, index) {
                let that = this;
                // console.log(Base64);
                console.log(this.el)
                this.$emit("base", Base64, this.el);
                //that.el.value = "";
                // http({
                //     url: that.api,
                //     data: {
                //         base: Base64,
                //         moduleName: "ck"
                //     },
                //     token: that.token,
                //     onSuccess: response => {
                //         response.url = response.data.url;
                //         that.$emit("on-upload-success", response);
                //         if (++this.doneCount == this.files.length) {
                //             this.files = [];
                //             this.doneCount = 0;
                //         }
                //     },

                //     onProgress: percent => {
                //         that.files[index].result = percent.toFixed(0) + "%";
                //         that.files[index].percent = percent.toFixed(0) + "%";
                //     },

                //     onError: e => {
                //         that.files[index].result = "上传失败";
                //         if (++this.doneCount == this.files.length) {
                //             this.files = [];
                //             this.doneCount = 0;
                //         }
                //     }
                // });
            },

            // 停止上传
            uploadCancel() {
            },

            // 上传成功
            uploadSuccess() {
            },

            // 上传失败
            uploadError() {
            }
        }
    };
</script>
<style>
    .upload-canvas {
        display: none;
    }
</style>

