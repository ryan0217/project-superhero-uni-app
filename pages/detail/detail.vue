<template>
  <view v-if="JSON.stringify(info) !== '{}'">
    <video
      class="movie-trailer"
      :src="info.trailer"
      :poster="info.poster"
      controls></video>
    <view class="movie-info-container">
      <image class="movie-cover" :src="info.cover"></image>
      <view class="movie-info-wrap">
        <view class="movie-name">{{info.name}}</view>
        <view class="movie-info-item">{{info.basicInfo}}</view>
        <view class="movie-info-item">{{info.originalName}}</view>
        <view class="movie-info-item">{{info.totalTime}}</view>
        <view class="movie-info-item">{{info.releaseDate}}</view>
        <view class="movie-score-container">
          综合评分：
          <view class="movie-score-wrap">
            <view class="movie-score">{{info.score}}</view>
            <view>
              <base-score :score="info.score"></base-score>
              <view>{{info.prisedCounts}} 人点赞</view>
            </view>
          </view>
        </view>
      </view>
    </view>
    <view class="movie-info-secondary-wrap">
      <view class="movie-info-secondary-item">
        <view class="title">剧情介绍</view>
        <view class="movie-plot-desc">{{info.plotDesc}}</view>
      </view>
      <view class="movie-info-secondary-item">
        <view class="title">演职人员</view>
        <scroll-view class="movie-staff-scroll-wrap" scroll-x>
          <view
            class="movie-staff-scroll-item"
            v-for="(item, index) in staffs"
            :key="index">
            <image class="img" :src="item.photo"></image>
            <view class="name">{{item.name}}</view>
            <view class="role">{{item.actName}}</view>
          </view>
        </scroll-view>
      </view>
      <view class="movie-info-secondary-item">
        <view class="title">剧照</view>
        <scroll-view class="movie-still-scroll-wrap" scroll-x>
          <view
            class="movie-still-scroll-item"
            v-for="(item, index) in JSON.parse(info.plotPics)"
            :key="index">
            <image class="img" :src="item" mode="aspectFill"></image>
          </view>
        </scroll-view>
      </view>
    </view>
  </view>
</template>

<script>
  import BaseScore from "@/components/BaseScore.vue"
  import { getQQ, post } from "@/request/request.js"

  export default {
    name: "Detail",
    components: { BaseScore },
    data() {
      return {
        id: null,
        info: {},
        staffs: []
      }
    },
    async onLoad ({ id }) {
      this.id = id
      await getQQ()
      this.getMovieInfo()
      await this.getMovieDirectors()
      this.getMovieActors()
    },
    methods: {
      getMovieInfo() {
        post({
          url: `/search/trailer/${this.id}`,
          success: data => {
            this.info = data
          }
        })
      },
      async getMovieDirectors () {
        return new Promise(resolve => {
          post({
            url: `/search/staff/${this.id}/1`,
            success: data => {
              this.staffs = data
              resolve()
            },
          })
        })
      },
      getMovieActors() {
        post({
          url: `/search/staff/${this.id}/2`,
          success: data => {
            this.staffs = [...this.staffs, ...data]
            this.staffs.forEach(item => {
              if (item.actName !== "导演") {
                item.actName = `饰 ${item.actName}`
              }
            })
          }
        })
      }
    }
  }
</script>

<style lang="scss">
  page {
    background-color: #f7f4f9;
  }
  .movie-trailer {
    display: block;
    width: 100%;
    height: 440upx;
  }

  /* 电影主要信息 */
  .movie-info-container {
    display: flex;
    justify-content: space-between;
    margin: 0 20upx;
    padding: 40upx 0;
    border-bottom: 1px solid #dbdbda;
  }
  .movie-cover {
    width: 280upx;
    height: 380upx;
  }
  .movie-info-wrap {
    display: flex;
    flex-direction: column;
    position: relative;
    width: 400upx;
    height: 100%;
  }
  .movie-name {
    margin-bottom: 8upx;
    line-height: 68upx;
    font-size: 26px;
  }
  .movie-info-item {
    line-height: 36upx;
    font-size: 12px;
    color: #a9a9a9;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }
  .movie-score-container {
    margin-top: 20upx;
    padding: 20upx;
    height: 100upx;
    font-size: 12px;
    color: grey;
    background-color: #fff;
    border-radius: 6upx;
    box-shadow: 3px 2px 10px #dedede;
  }
  .movie-score-wrap {
    display: flex;
  }
  .movie-score {
    margin-right: 30upx;
    margin-left: 8upx;
    width: 120upx;
    font-size: 26px;
    font-weight: bold;
    color: #feab2a;
  }

  /* 电影次要信息 */
  .movie-info-secondary-wrap {
    padding: 0 40upx;
  }
  .movie-info-secondary-item {
    padding: 20upx 0;

    .title {
      margin-bottom: 20upx;
      font-size: 14px;
      color: #a9a9a9;
    }
  }
  .movie-plot-desc {
    margin-top: -10upx;
    font-size: 15px;
  }
  .movie-staff-scroll-wrap {
    white-space: nowrap;
  }
  .movie-staff-scroll-item {
    display: inline-block;
    margin-right: 10upx;
    width: 170upx;

    &:last-of-type {
      margin-right: 0;
    }
    .img {
      width: 100%;
      height: 240upx;
    }
    .name, .role {
      text-align: center;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
    }
    .name {
      font-size: 15px;
    }
    .role {
      font-size: 13px;
      color: #a9a9a9;
    }
  }
  .movie-still-scroll-wrap {
    white-space: nowrap;
  }
  .movie-still-scroll-item {
    display: inline-block;
    margin-right: 10upx;
    height: 240upx;
    
    &:last-of-type {
      margin-right: 0;
    }
    .img {
      width: 400upx;
      height: 100%;
    }
  }
</style>
