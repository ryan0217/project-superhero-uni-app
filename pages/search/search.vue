<template>
  <view class="page-search">
    <!-- 搜索框 start -->
    <view class="search-box">
      <i class="iconfont icon-sousuo"></i>
      <input
        class="input"
        type="text"
        placeholder="请输入搜索片名"
        placeholder-class="placeholder"
        :maxlength="20">
    </view>
    <!-- 搜索框 end -->
    
    <!-- 电影列表 start -->
    <view class="movie-wrap">
      <view class="movie-item" v-for="item in movieList" :key="item.id">
        <image class="img" :src="item.cover"></image>
      </view>
    </view>
    <!-- 电影列表 end -->
  </view>
</template>

<script>
  import { getQQ, post } from '@/request/request.js'

  export default {
    name: "Search",
    data() {
      return {
        searchObj: {
          keywords: "",
          page: "",
          pageSize: "15"
        },
        movieList: []
      }
    },
    async onLoad () {
      await getQQ()
      this.searchMovies()
    },
    methods: {
      searchMovies() {
        post({
          url: "/search/list",
          data: this.searchObj,
          success: data => {
            this.movieList = data.rows
          }
        })
      }
    }
  }
</script>

<style lang="scss">
  $search-height: 68upx;

  page, .page-search {
    height: 100%;
    overflow: hidden;
  }
  
  // 搜索框
  .search-box {
    display: flex;
    align-items: center;
    margin: 0 20upx 20upx;
    padding: 0 20upx;
    height: $search-height;
    background-color: #eaeaea;

    .icon-sousuo {
      margin-right: 20upx;
      font-weight: bold;
      color: #9c9c9c;
    }
    .input {
      flex: 1;
      height: 100%;
      font-size: 14px;
    }
    .placeholder {
      line-height: $search-height;
    }
  }
  
  // 电影列表
  .movie-wrap {
    box-sizing: border-box;
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
    padding: 20upx;
    max-height: calc(100% - 88upx);
    background-color: #fff;
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
  }
  .movie-item {
    padding: 10upx 0;
    width: 210upx;
    height: 284upx;
    
    .img {
      width: 100%;
      height: 100%;
    }
  }
</style>
