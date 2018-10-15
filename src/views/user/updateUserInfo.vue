<template>
    <div>
        <Header v-bind="{left:1,centerValue:type,center:2}"></Header>
        <div class="pt">
            <input class="input-update" type="tel" maxlength=11 onkeypress="return event.keyCode>=48&&event.keyCode<=57"
                   ng-pattern="/[^a-zA-Z]/" placeholder="请输入11位手机号码" v-model="val" v-if="type=='修改手机号码'">
            <yd-radio-group v-model="val" v-if="type=='修改性别'" class="input-update"
                            style="display: flex;align-items: center;" color="#208de3">
                <yd-radio val="男" style="padding-right: .5rem;"></yd-radio>
                <yd-radio val="女"></yd-radio>

            </yd-radio-group>
            <!-- <yd-button class="btn-submit" size="large" shape="circle" bgcolor="#06adf7" @click.native="submit">保存
            </yd-button> -->
            <footer class="addCurrency" style="position:relative;top:.2rem">
                <div @click="submit">
                    <a class="btns" >保存</a>
                </div>
            </footer>
        </div>
    </div>
</template>

<script>
    import * as types from "../../store/mutations-type"

    export default {
        name: "updateUserInfo",
        data() {
            return {
                type: this.$route.query.type == 'sex' ? '修改性别' : '修改手机号码',
                val: this.$route.query.val,
            }
        },
        updated() {
            console.log(this.val)
        },
        mounted() {
            console.log(this.val)
        },
        methods: {
            submit() {
                if (this.type == '修改性别') {
                    let sex = 1
                    if (this.val == '女') {
                        sex = 2
                    }
                    this.$store.dispatch(types.UPDATE_SEX, {sex: sex}).then(res => {
                        console.log(res)
                        if (res.code !== 0) {
                            this.fail(res.message)
                        } else {
                            this.success('修改成功')
                            this.$router.replace({path: 'personMessage'})
                        }
                    })
                } else {
                    if (this.val.length < 11) {
                        this.fail('请输入11位手机号码')
                        return
                    }
                    this.$store.dispatch(types.UPDATE_PHONE, {phone: this.val}).then(res => {
                        console.log(res)
                        if (res.code !== 0) {
                            this.fail(res.message)

                        } else {
                            this.success('修改成功')
                            this.$router.replace({path: 'personMessage'})

                        }
                    })

                }
                console.log(1)
            }
        }
    }
</script>

<style scoped lang="scss">
    .input-update {
        height: .9rem;
        width: 100%;
        margin-bottom: .3rem;
        border: 0;
        background: #fff;
        padding-left: .4rem;
        padding-right: .2rem;
        margin-top: .2rem;
        font-size: .32rem;
        color: #666;
    }
</style>