<template>
  <view class="page-search">
    <!-- 搜索框 start -->
    <view class="search-box-container">
      <view class="search-box">
        <i class="iconfont icon-sousuo"></i>
        <input
          class="input"
          type="text"
          placeholder="请输入搜索片名"
          placeholder-class="placeholder"
          :maxlength="20"
          focus
          confirm-type="search"
          @input="inputKeywords"
          @confirm="searchMovies">
      </view>
    </view>
    <!-- 搜索框 end -->

    <!-- 电影列表 start -->
    <view class="movie-wrap" v-if="movieList.length > 0">
      <view class="movie-item" v-for="(item, index) in movieList" :key="index">
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
        isSearching: false,
        searchObj: {
          keywords: "",
          page: 1,
          pageSize: 15
        },
        records: null,
        movieList: []
      }
    },
    async onLoad () {
      await getQQ()
      this.searchMovies()
    },
    onReachBottom() {
      if (this.isSearching) return
      this.isSearching = true

      if (this.movieList.length < this.records) {
        this.searchObj.page += 1
        this.searchMovies({ page: this.searchObj.page })
      }
    },
    methods: {
      searchMovies(params = {}) {
        let { type, page = 1 } = params
        let isConfirm = params.type === "confirm"
        this.searchObj.page = isConfirm ? 1 : page

        uni.showLoading({
          title: "搜索中...",
          mask: true
        })
        post({
          url: "/search/list",
          data: { ...this.searchObj },
          success: ({ records, rows }) => {
            this.records = records
            this.movieList = this.searchObj.page === 1 ? rows : this.movieList.concat(rows)
          },
          complete: () => {
            this.isSearching = false
            uni.hideLoading()
          }
        })
      },
      inputKeywords(e) {
        this.searchObj.keywords = e.detail.value
      }
    }
  }
</script>

<style lang="scss">
  $search-box-height: 68upx;
  $search-box-container-height: $search-box-height + 20upx;

  // 搜索框
  .search-box-container {
    position: fixed;
    width: 100%;
    background-color: #f7f7f7;
    z-index: 1;
  }
  .search-box {
    display: flex;
    align-items: center;
    margin: 0 20upx 20upx;
    padding: 0 20upx;
    height: $search-box-height;
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
      line-height: $search-box-height;
    }
  }

  // 电影列表
  .movie-wrap {
    box-sizing: border-box;
    padding: calc(#{$search-box-container-height} + 20upx) 20upx 20upx;
    background-color: #fff;
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
  }
  .movie-item {
    display: inline-block;
    padding: 12upx;
    width: 212upx;
    height: 286upx;

    .img {
      width: 100%;
      height: 100%;
    }
  }
</style>
