<template>
  <view class="goods">
    <view class="goods-type-box flex-h-center">
      <view class="box-item" @tap="search(item)" :class="{ active: item.id === currtype }" v-for="item in typeList" :key="item.id">{{ item.title }}</view>
    </view>
    <view class="goods-search">
      <uni-easyinput
        @confirm="onfilter"
        :inputBorder="true"
        :styles="{ borderColor: '#eee', color: '#333', background: '#fff' }"
        v-model="query.name"
        placeholder="查询"
        style="flex: 1"
      ></uni-easyinput>
    </view>

    <view class="goods-list flex">
      <view class="goods-list-item" v-for="item in goodsList" :key="item.id">
        <view class="flex-v-center">
          <image :src="item.pic" mode="widthFix" />
        </view>
        <view class="list-item-info">
          <view class="list-item-name"> {{ item.name }} </view>
          <view class="item-exchange"> 快速兑换 </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  name: 'not',
  data() {
    return {
      query: {
        typeId: '',
        name: ''
      },
      typeList: [],
      goodsList: [],
      currtype: 0
    }
  },
  onLoad() {
    this.getList()
    this.getListType()
  },
  methods: {
    onfilter() {
      this.getList()
    },
    search(item) {
      this.currtype = item.id
      this.query.typeId = item.id
      this.getList()
    },
    getList() {
      uni.request({
        url: 'http://192.168.2.233:8080/goods',
        data: this.query,
        success: res => {
          this.goodsList = res.data.obj
          console.log(res)
        }
      })
    },
    getListType() {
      uni.request({
        url: 'http://192.168.2.233:8080/goodsType',
        success: res => {
          this.typeList = res.data.obj
        }
      })
    }
  }
}
</script>

<style scoped lang="scss">
.goods {
  min-height: 100vh;
  background-color: #f6f4f5;
  padding: 0 20rpx;
  .goods-type-box {
    .box-item {
      margin: 30rpx 0;
      margin-right: 20rpx;
      border-radius: 40rpx;
      padding: 8rpx 24rpx;
      background-color: #fff;
      font-size: 28rpx;
      &.active {
        color: #1a7caf;
      }
    }
  }
  .goods-list {
    flex-wrap: wrap;
    font-size: 28rpx;
    display: flex;
    justify-content: space-between;
    .goods-list-item {
      width: 48%;
      margin-top: 30rpx;
      border-radius: 10rpx;
      &:nth-of-type(1n) {
        // margin-right: 30rpx;
      }
      background-color: #fff;
      image {
        width: 200rpx;
        height: 200rpx;
        margin: auto;
      }
      .list-item-info {
        border-top: 1px solid #eee;
        padding: 20rpx 20rpx;
        .list-item-name {
          overflow: hidden;

          -webkit-line-clamp: 2;

          text-overflow: ellipsis;

          display: -webkit-box;

          -webkit-box-orient: vertical;
        }
      }
      .item-exchange {
        border-radius: 40rpx;
        border: 1px solid #1a7caf;
        width: 150rpx;
        padding: 6rpx;
        margin: auto;
        margin-top: 20rpx;
        text-align: center;
        color: #1a7caf;
      }
    }
  }
}
</style>
