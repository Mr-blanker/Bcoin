<template>
  <div>
    <Header v-bind="{left:1,centerValue:'地址',center:2}"></Header>
    <div class="address-box pt">
      <ul class="address-list">
        <li class="address-item">
          <div class="address-main">
            <div class="main-top">
              <span class="name">ggg</span>
              <span class="tel">12111111111</span>
            </div>
            <p class="main-text">地址：哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈</p>
          </div>
          <div class="address-operate">
            <div class="recent">最近使用</div>
            <div class="operate-box">
              <span class="edit" @click="$router.push({path:'addressDetail'})"><i class="icon iconfont icon-edit"></i>编辑</span>
              <span class="del"><i class="icon iconfont icon-delete"></i>删除</span>
            </div>
          </div>
        </li>
        <li class="address-item">
          <div class="address-main">
            <div class="main-top">
              <span class="name">ggg</span>
              <span class="tel">12111111111</span>
            </div>
            <p class="main-text">地址：哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈</p>
          </div>
          <div class="address-operate">
            <div class="recent">最近使用</div>
            <div class="operate-box">
              <span class="edit"><i class="icon iconfont icon-edit"></i>编辑</span>
              <span class="del"><i class="icon iconfont icon-delete"></i>删除</span>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  import Header from "@/components/Header"

  export default {
    name: "addressList",
    components: {
      Header
    }
  }
</script>

<style scoped>

</style>