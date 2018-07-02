<template>
  <div>
    <Header v-bind="{left:1,centerValue:'地址',center:2}"></Header>
    <div class="address-box pt">
      <ul class="address-list">
        <li class="address-item" v-for="item in addressList">
          <div class="address-main">
            <div class="main-top">
              <span class="name">{{item.name}}</span>
              <span class="tel">{{item.phone}}</span>
            </div>
            <p class="main-text">
              地址：{{item.detail}}</p>
          </div>
          <div class="address-operate">
            <div class="recent" v-if="item.id===lastAddr">最近使用</div>
            <div class="recent" v-else></div>
            <div class="operate-box">
              <span class="edit" @click="$router.push({path:'addressDetail',query:{info:JSON.stringify(item)}})"><i
                class="icon iconfont icon-edit"></i>编辑</span>
              <span class="del" @click="delAddress(item.id)"><i class="icon iconfont icon-delete"></i>删除</span>
            </div>
          </div>
        </li>
      </ul>
      <div class="btn_box addAddress-btn">
        <a style="display:inline-block;width:100%" @click="$router.push({path:'addressDetail'})">新增</a>
      </div>
    </div>
  </div>
</template>

<script>
  import * as types from "../../store/mutations-type"

  export default {
    name: "addressList",
    data() {
      return {
        addressList: [],
        lastAddr:''
      }
    },
    mounted() {
      this.getAddressList()
      this.getLastAddr()
    },
    methods: {
      //最近使用地址
      getLastAddr() {
        this.$store.dispatch(types.USER_GETLASTADDR).then(res => {
          if(res.code!==0)return
          console.log(res)
          this.lastAddr = res.data.id

        })
      },
      //地址列表
      getAddressList() {
        this.$store.dispatch(types.USER_ADDRESSLIST).then(res => {
          console.log(res)
          if (res.code !== 0) return
          this.addressList = res.data
        })
      },
      delAddress(id) {
        this.$dialog.confirm({
          title: '',
          mes: '确定要删除该地址吗？',
          opts: () => {
            this.$store.dispatch(types.USER_DELRESSLIST, {id: id}).then(res => {
              console.log(res)
              if (res.code !== 0) {
                this.fail('删除失败')
              } else {
                this.success('删除成功')
                this.getAddressList()
              }
            })
          }
        });
      }


    }
  }
</script>

<style scoped>

</style>