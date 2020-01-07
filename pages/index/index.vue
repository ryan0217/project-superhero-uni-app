<template>
  <view>
    <swiper
      class="swiper-carousel"
      :indicator-dots="true"
      indicator-color="rgba(255, 255, 255, .5)"
      indicator-active-color="red"
      :autoplay="true"
      :circular="true">
      <swiper-item v-for="item in carouselList" :key="item.movieId">
        <view class="swiper-item">
          <image class="swiper-image" :src="item.image"></image>
        </view>
      </swiper-item>
    </swiper>
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
    async onLoad() {
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
  .swiper-carousel {
    width: 100%;
    height: 440upx;
  }

  .swiper-item,
  .swiper-image {
    width: 100%;
    height: 100%;
  }
</style>
