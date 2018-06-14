<template>
  <div>
    <div>
      <scroll></scroll>
    </div>
  </div>
</template>
<script>
  import {
    mapGetters,
    mapMutations,
    mapActions
  } from 'vuex'
  import scroll from '@/components/Scroll'
  export default {
    name: 'marketIndex',
    data() {
      return {
      }
    },
    mounted() {
      // this.getCoinLists()
    },
    components: {
      scroll
    },
    methods: {
      ...mapActions(['getCoinLists']),
 
    }
  }
</script>
<style lang="scss" scoped>

</style>