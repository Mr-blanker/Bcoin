<template>
  <div id="app">
    <router-view></router-view>
    <Footer :showFooterNav="isShowFooterNav"></Footer>
  </div>
</template>

<script>
  import Footer from "./components/Footer"

  export default {
    name: 'App',
    data() {
      return {
        isShowFooterNav: true
      }
    },
    components: {
      Footer
    },
    watch: {
      $route(to) {
        console.log(to)
        if (to.name == 'Information') {
          this.isShowFooterNav = true
        } else {
          this.isShowFooterNav = false
        }
      }
    },
  }
</script>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    /*margin-top: 60px;*/
    height: 100%;
    background: #f2f5f7;
  }
</style>
