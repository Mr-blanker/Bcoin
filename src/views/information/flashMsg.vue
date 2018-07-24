<template>
  <div>
    <Header v-bind="{centerValue:'快讯',center:2}"></Header>
    <div>
      <div class="flash-list mescroll" id="newsScroll" style="padding-top: .9rem;padding-bottom: .9rem;">
        <div>
          <div class="flash-item" v-for="(item,key) in flashList">
            <p class="flash-time">{{item.k_time*1000|moment('MM-DD HH:mm')}}</p>
            <p class="flash-content" v-html="item.k_content" ></p>
            <div class="flash-comment">
              <span class="flash-duo" @click="comment(item,'duo',key)">看多（{{item.duo}}）</span>
              <span class="flash-kong" @click="comment(item,'kong',key)">看空（{{item.kong}}）</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
    import * as types from '../../store/mutations-type'

    export default {
        name: "flashMsg",
        data() {
            return {
                flashList: [],
                flash: {
                    flashLen: 0,
                    flashCount: -1,
                }
            }
        },
        mounted() {
            let that = this
            this.scroll = new MeScroll("newsScroll", {
                down: {
                    callback: that.initDataList,
                },
                up: {
                    callback: that.loadDataList,
                    auto: false,
                    page: {
                        num: 0,
                        size: 10,
                        time: null
                    },
                    htmlNodata: '<p class="upwarp-nodata">-- 没有更多数据了 --</p>'
                }
            });
        },
        methods: {

            loadDataList() {
                this.flash.flashLen += 20
                this.$store.dispatch(types.FLASH_LIST, {
                    len: this.flash.flashLen
                }).then(res => {
                    this.flashList = res
                    this.flash.flashCount = res.length
                    console.log(this.flashLen, '快讯')
                    this.scroll.endSuccess(res.length, this.flash.flashCount >= this.flash.flashLen);
                    if (this.flash.flashCount < this.flash.flashLen)
                        this.scroll.endUpScroll(true)
                })
            }
        }
    }
</script>

<style scoped>

</style>