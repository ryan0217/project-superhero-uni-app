<template name="BaseScore">
  <view class="score">
    <image
      class="icon-star"
      v-for="(item, index) in 5"
      :key="index"
      :src="'/static/images/index/star-' + (index < starNum ? 'yellow' : 'gray') + '.png'"></image>
    <view v-if="showNumber">{{score}}</view>
  </view>
</template>

<script>
  export default {
    name: "BaseScore",
    props: {
      score: {
        type: Number,
        required: true
      },
      showNumber: {
        type: Boolean,
        default: false
      }
    },
    computed: {
      starNum() {
        return Math.floor(this.score / 2)
      }
    }
  }
</script>

<style lang="scss">
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

    &:last-of-type {
      margin-right: 8upx;
    }
  }
</style>
