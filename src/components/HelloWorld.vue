<template>
  <div>

  </div>
</template>

<script>
  export default {
    mounted() {
      new Swiper('.swiper-container', {
        // autoplay: true,//可选选项，自动滑动
        history: {
          replaceState: true,
        },
      })
    }
  }
</script>
<style scoped>
  .swiper-slide {
    height: 100%;
    background: red;
  }
</style>