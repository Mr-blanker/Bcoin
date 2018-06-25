<template>
  <div>
    <Header v-bind="{left:1,centerValue:'地址',center:2}"></Header>
    <section class="content_main pt">
      <div class="address-box padt8 address-plz">
        <ul>
          <li>
            <span class="lab-tittle">收货人</span><input type="text" placeholder="请输入姓名"  /></li>
          <li>
            <span class="lab-tittle">联系方式</span><input type="tel" maxlength=11 onkeypress="return event.keyCode>=48&&event.keyCode<=57" ng-pattern="/[^a-zA-Z]/" placeholder="请输入11位手机号码"  /></li>
          <li class="detail" >
            <span class="lab-tittle">所在地区</span>
            <span class="fr mr detali-address "></span>
            <i class="icon icon-jiantou1"></i>
          </li>
          <li class="detail" style="height:83px;display: flex;justify-content: space-between;padding-right: 12px">
            <span class="lab-tittle">详细地址</span>
            <textarea class="detail_address" name="" rows="" cols="" placeholder="街道门牌信息" ></textarea>
          </li>
        </ul>
      </div>
      <div class="btn_box">
        <a  style="display:inline-block;width:100%">保存</a>
      </div>
    </section>
  </div>
</template>

<script>
  export default {
    name: "addressDetail",
    data() {
      return {
        input1: '',
        input2: '',
        input3: ''

      }
    }
  }
</script>

<style scoped>
  .yd-cell {
    padding: 0 10px !important;
  }
</style>