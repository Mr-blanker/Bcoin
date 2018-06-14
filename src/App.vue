<template>
  <div id="app">
    <header></header>
    <router-view></router-view>
    <Foot></Foot>
  </div>
</template>

<script>
  import Foot from "./components/Footer"
  import header from "./components/Header.vue"
  
  export default {
    name: 'App',
    components: {
      Foot,
      header
    },
    mounted() {
      console.log(1)
      console.log(this.$store.state)

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
    background:#f2f5f7;
  }
</style>
