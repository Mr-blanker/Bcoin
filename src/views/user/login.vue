<template>
    <div>
        <Header v-bind="{left:1,centerValue:'登录',center:2}"></Header>
        <yd-cell-group class="login-box">
            <yd-cell-item>
                <span slot="left">账号：</span>
                <yd-input slot="right" required v-model="userInfo.name" max="20" placeholder="请输入用户名"></yd-input>
            </yd-cell-item>
            <yd-cell-item>
                <span slot="left">密码：</span>
                <yd-input slot="right" type="password" v-model="userInfo.pwd" placeholder="请输入密码"></yd-input>
            </yd-cell-item>
        </yd-cell-group>
        <div class="register-forget">
            <span @click="$router.push({path:'register'})">注册</span>
            <!--<span>忘记密码？</span>-->
        </div>
        <yd-button class="btn-submit" size="large" shape="circle" bgcolor="#06adf7" @click.native="submit">登录
        </yd-button>
    </div>
</template>
<script>
    import Header from "@/components/Header"
    import * as types from '../../store/mutations-type'

    export default {
        name: "login",
        data() {
            return {
                userInfo: {
                    name: '',
                    pwd: ''
                }

            }
        },
        components: {
            Header
        },
        methods: {
            submit() {
                this.$store.dispatch(types.USER_LOGIN, this.userInfo).then(res => {
                    console.log(res)
                    if (res.code === 0) {
                        this.success('登录成功', 'Person')
                    } else {
                        this.fail(res.msg)
                    }
                })
            }
        }
    }
</script>

<style scoped>

</style>