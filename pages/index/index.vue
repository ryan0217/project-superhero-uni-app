<template>
  <view class="page-container">
    <!-- 轮播图 start -->
    <swiper
      class="swiper-container"
      :indicator-dots="true"
      indicator-color="rgba(255, 255, 255, .5)"
      indicator-active-color="red"
      :autoplay="true"
      :circular="true">
      <swiper-item v-for="item in carouselList" :key="item.movieId">
        <image class="swiper-item" :src="item.image"></image>
      </swiper-item>
    </swiper>
    <!-- 轮播图 end -->
  </view>
</template>

<script>
  import { getQQ, post } from '@/request/request.js'

  export default {
    data() {
      return {
        carouselList: []
      }
    },
    async onLoad () {
      await getQQ()
      this.getCarouselList()
    },
    methods: {
      getCarouselList() {
        post({
          url: "/index/carousel/list",
          success: data => {
            this.carouselList = data
          }
        })
      }
    }
  };
</script>

<style lang="scss">
  .swiper-container {
    width: 100%;
    height: 440upx;
  }
  .swiper-item {
    width: 100%;
    height: 100%;
  }
</style>
