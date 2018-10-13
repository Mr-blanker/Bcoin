import moment from "moment"
const mixin = {
    data() {
        return {
            hh: 123,
            themeColor: '#06adf7'
        }
    },
    mounted() {

    },
    methods: {
        haha() {
            console.log('我是mixin!!!!!')
        },
        //克隆
        clone(obj) {
            var buf;
            if (obj instanceof Array) {
                buf = [];
                var i = obj.length;
                while (i--) {
                    buf[i] = this.clone(obj[i]);
                }
                return buf;
            }
            else if (obj instanceof Object) {
                buf = {};
                for (var k in obj) {
                    buf[k] = this.clone(obj[k]);
                }
                return buf;
            }
            else {
                return obj;
            }
        },

        //成功提示
        success(msg, path, duration = 500) {
            console.log(msg, duration)
            this.$dialog.toast({
                mes: msg,
                timeout: duration,
                icon: 'success',
                callback: () => {
                    console.log(123)
                    this.$router.push({path: path})
                }
            })
        },

        //失败提示
        fail(msg, duration = 500) {
            this.$dialog.toast({
                mes: msg,
                timeout: duration,
                icon: 'error'
            })
        },
        //时间转换
        mo(val) {
            return moment(moment(val).format('YYYYMMDDHHmmss'), "YYYYMMDD-HH:mm:ss").fromNow()
        },

    }
}
export default mixin
