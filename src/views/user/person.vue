<template>
  <div>
    <Header v-bind="{left:1,centerValue:'我的',center:2}"></Header>
    <div class="mine">
      <div class="head" @click="showDistrictChoice=true">
        <div class="head-left">
          <img :src="userInfo.avatar" alt="" v-if="userInfo.avatar">
          <span v-if="userInfo.name">{{userInfo.name}}</span>
        </div>
        <i class="icon iconfont icon-gengduo"></i>
      </div>
      <yd-cell-group style="margin-top:10px;border: 0;">
        <yd-cell-item arrow type="a" @click.native="$router.push({path:'addressList'})">
          <span slot="left">地址</span>
          <span slot="right"></span>
        </yd-cell-item>
        <!--<yd-cell-item arrow type="link" href="#">-->
        <!--<span slot="left">这里是一个Router-Link链接</span>-->
        <!--<span slot="right">href会解析为路由</span>-->
        <!--</yd-cell-item>-->
        <!--<yd-cell-item arrow type="label">-->
        <!--<span slot="left">这里是一个Label</span>-->
        <!--</yd-cell-item>-->
        <!--<yd-cell-item arrow>-->
        <!--<span slot="left">这里是一个普通DIV</span>-->
        <!--</yd-cell-item>-->
      </yd-cell-group>
    </div>
    <AddressSelector
      api="http://ssl.pandawork.vip/api/area.lists?pid="
      ref="district"
      v-model="showDistrictChoice"
      @on-choice="onChoiceDistrict"
      @on-cancel="">
    </AddressSelector>
  </div>
</template>
<script>
  import Header from "@/components/Header"
  import AddressSelector from "@/components/Selector"
  import {mapGetters} from "vuex"

  export default {
    name: "person",
    data() {
      return {
        input1: "",
        input2: "",
        showDistrictChoice: false
      }
    },
    components: {
      Header,
      AddressSelector
    },
    computed: {
      ...mapGetters(['userInfo'])
    },
    mounted() {
      console.log(this.userInfo)
    },
    methods: {
      submit() {
        console.log(12)
      },
      onChoiceDistrict(choice, id, name) {
        console.log(choice)
        // console.log("id = " + id + "name=" + name);
        // // ﻿join() 方法用于把数组中的所有元素放入一个字符串。用指定的符号分割
        // this.areaListName = name.join(" ");
        // console.log(this.areaListName);
        //
        // // id = 37,38,40name=河北省,石家庄市,长安区
        // this.form.province = id[0] ? id[0] : 0;
        // this.form.city = id[1] ? id[1] : 0;
        // this.form.area = id[2] ? id[2] : 0;
      },
    }
  }
</script>

<style scoped>
</style>