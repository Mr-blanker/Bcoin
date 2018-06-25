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
      console.log('我是mixin')
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

    //工作流
    workFlow(id) {
      switch (id) {
        case 0:
          this.title = "请假单";
          break;
        case 1:
          this.title = "加班";
          break;
        case 2:
          this.title = "出差";
          break;
        case 3:
          this.title = "物品领用";
          break;
        case 4:
          this.title = "资质申请";
          break;
        case 5:
          this.title = "用印申请";
          break;
        case 6:
          this.title = "合同申请";
          break;
        case 7:
          this.title = "费用报销";
          this.isSubject = true;
          break;
        case 8:
          this.title = "差旅报销";
          break;
        case 9:
          this.title = "收款收据";
          break;
        case 10:
          this.title = "收入凭证";
          this.isSubject = true;
          break;
        case 11:
          this.title = "借支单";
          this.isSubject = true;
          break;
        case 12:
          this.title = "付款申请";
          break;
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
    }

  }
}
export default mixin
