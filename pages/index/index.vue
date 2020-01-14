<template>
  <view>
    <!-- 轮播图 start -->
    <swiper
      class="swiper-container"
      indicator-dots
      indicator-color="rgba(255, 255, 255, .5)"
      indicator-active-color="red"
      autoplay
      circular>
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
      <scroll-view class="hot-super-scroll-wrap" scroll-x>
        <view class="hot-super-scroll-item" v-for="item in hotMovieList" :key="item.id">
          <image class="poster" :src="item.cover"></image>
          <view class="title">{{item.name}}</view>
          <base-score :score="item.score" showNumber></base-score>
        </view>
      </scroll-view>
    </view>
    <!-- 热门超英 end -->

    <!-- 热门预告 start -->
    <view class="page-block hot-trailer-container">
      <view class="title-container">
        <image class="title-icon" src="../../static/images/index/icon-hot-trailer.png"></image>
        <view class="title-text">热门预告</view>
      </view>
      <view class="hot-trailer-video-wrap">
        <video
          class="hot-trailer-video-item"
          v-for="item in hotTrailerList"
          :key="item.id"
          :src="item.trailer"
          :poster="item.poster"
          controls></video>
      </view>
    </view>
    <!-- 热门预告 end -->

    <!-- 猜你喜欢 start -->
    <view class="page-block favorite-movie-container">
      <view class="title-container">
        <image class="title-icon" src="../../static/images/index/icon-favorite-movie.png"></image>
        <view class="title-text">猜你喜欢</view>
      </view>
      <view class="favorite-movie-wrap">
        <view class="favorite-movie-item" v-for="(item, index) in favoriteMovieList" :key="index">
          <image class="cover" :src="item.cover"></image>
          <view class="introduce-wrap">
            <view class="introduce-name">{{item.name}}</view>
            <base-score class="introduce-score" :score="item.score"></base-score>
            <view class="introduce-info">{{item.basicInfo}}</view>
            <view class="introduce-release">{{item.releaseDate}}</view>
          </view>
        </view>
      </view>
    </view>
    <!-- 猜你喜欢 end -->
  </view>
</template>

<script>
  import BaseScore from '@/components/BaseScore.vue'
  import { getQQ, post } from '@/request/request.js'

  export default {
    name: "Index",
    components: { BaseScore },
    data() {
      return {
        carouselList: [],
        hotMovieList: [],
        hotTrailerList: [],
        favoriteMovieList: []
      }
    },
    async onLoad () {
      await getQQ()
      this.getCarouselList()
      this.getHotMovies()
      this.getHotTrailers()
      this.getFavoriteMovies()
    },
    onPullDownRefresh() {
      uni.stopPullDownRefresh()
      uni.showLoading({
        title: "加载中...",
        mask: true
      })
      this.getFavoriteMovies()
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
            this.hotMovieList = data
          }
        })
      },
      getHotTrailers() {
        post({
          url: "/index/movie/hot",
          data: { type: "trailer" },
          success: data => {
            this.hotTrailerList = data
          }
        })
      },
      getFavoriteMovies() {
        post({
          url: "/index/guessULike",
          success: data => {
            this.favoriteMovieList = data
          },
          complete: () => {
            uni.hideLoading()
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

  .hot-super-scroll-wrap, .hot-trailer-video-wrap, .favorite-movie-wrap {
    margin-top: 20upx;
  }

  /* 热门超英 */
  .hot-super-container {
    padding: 20upx 0 2upx;

    .title-container {
      padding-right: 20upx;
      padding-left: 20upx;
    }
  }
  .hot-super-scroll-wrap {
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
  }

  /* 热门预告 */
  .hot-trailer-video-wrap {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
  }
  .hot-trailer-video-item {
    margin-bottom: 10upx;
    width: 350upx;
    height: 206upx;
  }

  /* 猜你喜欢 */
  .favorite-movie-wrap {
    font-size: 14px;
    color: grey;
  }
  .favorite-movie-item {
    display: flex;
    justify-content: space-around;
    padding-bottom: 30upx;

    &:last-of-type {
      padding-bottom: 10upx;
    }
    .cover {
      width: 150upx;
      height: 210upx;
      border-radius: 3%;
    }
    .introduce-wrap {
      display: flex;
      flex-direction: column;
      width: 480upx;
    }
    .introduce-name {
      font-size: 22px;
      color: #000;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
    }
    .introduce-score {
      height: 48upx;
    }
    .introduce-info, .introduce-release {
      line-height: 48upx;
    }
  }
</style>
