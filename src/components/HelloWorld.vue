<template>
  <div style='height: 100%;'>
    <ul class="tab"></ul>
    <div class="swiper-container">
      <div class="swiper-wrapper">
        <div class="swiper-slide" data-history="slide1">Slide 1</div>
        <div class="swiper-slide" data-history="slide2">Slide 2</div>
        <div class="swiper-slide" data-history="slide3">Slide 3</div>
      </div>
    </div>

  </div>
</template>
<script>

  export default {
    mounted() {
      var mySwiper = new Swiper('.swiper-container', {
        autoplay: true,//可选选项，自动滑动
        history: true,
      })
    }
  }
</script>
<style scoped>

  .swiper-slide{
    height: 100%;
    background: red;
  }
</style>