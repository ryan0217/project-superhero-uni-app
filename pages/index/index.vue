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

    <!-- 热门超英 start -->
    <view class="page-block hot-super-container">
      <view class="title-container">
        <image class="title-icon" src="../../static/images/index/icon-hot-super.png"></image>
        <view class="title-text">热门超英</view>
      </view>
      <scroll-view class="hot-super-scroll-container" scroll-x="true">
        <view class="hot-super-scroll-item" v-for="item in hotMovieList" :key="item.id">
          <image class="poster" :src="item.cover"></image>
          <view class="title">{{item.name}}</view>
          <view class="score">
            <image
              class="icon-star"
              v-for="(sItem, sIndex) in Math.floor(item.score / 2)"
              :key="'yellow-' + sIndex"
              src="../../static/images/index/star-yellow.png"></image>
            <image
              class="icon-star"
              v-for="(sItem, sIndex) in (5 - Math.floor(item.score / 2))"
              :key="'gray-' + sIndex"
              src="../../static/images/index/star-gray.png"></image>
            {{item.score}}
          </view>
        </view>
      </scroll-view>
    </view>
    <!-- 热门超英 end -->
  </view>
</template>

<script>
  import { getQQ, post } from '@/request/request.js'

  export default {
    name: "Index",
    data() {
      return {
        carouselList: [],
        hotMovieList: []
      }
    },
    async onLoad () {
      await getQQ()
      this.getCarouselList()
      this.getHotMovies()
    },
    methods: {
      getCarouselList() {
        post({
          url: "/index/carousel/list",
          success: data => {
            this.carouselList = data
          }
        })
      },
      getHotMovies() {
        post({
          url: "/index/movie/hot",
          data: { type: "superhero" },
          success: data => {
            console.log("getHotMovies", data)
            this.hotMovieList = data
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

  .page-block {
    margin-top: 12upx;
    padding: 20upx;
    background-color: #fff;
  }
  .title-container {
    display: flex;
    align-items: center;
    line-height: 52upx;

    .title-icon {
      width: 30upx;
      height: 30upx;
    }
    .title-text {
      margin-left: 20upx;
      font-size: 20px;
      font-weight: bold;
    }
  }

  .hot-super-container {
    padding: 20upx 0 2upx;

    .title-container {
      padding-right: 20upx;
      padding-left: 20upx;
    }
  }
  .hot-super-scroll-container {
    margin-top: 20upx;
    white-space: nowrap;
  }
  .hot-super-scroll-item {
    display: inline-block;
    margin-left: 20upx;
    margin-bottom: 18upx;
    width: 200upx;

    &:last-child {
      margin-right: 20upx;
    }
    .poster {
      width: 100%;
      height: 270upx;
    }
    .title {
      width: 100%;
      font-size: 14px;
      font-weight: bold;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
    }
    .score {
      display: flex;
      align-items: center;
      height: 32upx;
      font-size: 12px;
      color: grey;
    }
    .icon-star {
      width: 20upx;
      height: 20upx;

      &:last-child {
        margin-right: 8upx;
      }
    }
  }
</style>
