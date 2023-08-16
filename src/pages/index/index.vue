<template>
  <view class="content">
    <!-- <view class="echarts-wrap">
      <my-echarts id="main" ref="mapChart" :echarts="echarts" :onInit="initChart" />
    </view> -->
    <image src="https://img2.baidu.com/it/u=3329909248,3799019568&fm=253&app=138&size=w931&n=0&f=JPEG&fmt=auto?sec=1690390800&t=f85453bc68a938c36a6d4e07851d717b" class="aaa"></image>
  </view>
</template>
<script>
import request from '@/common/utils/request'
import api from '@/common/api/api'
import * as echarts from '@/assets/js/echarts.js'
import myEcharts from '@/common/components/mpvue-echarts/src/echarts.vue'

// let chart = null
// let option = {
//   xAxis: {
//     type: 'category',
//     data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
//   },
//   yAxis: {
//     type: 'value'
//   },
//   series: [
//     {
//       data: [150, 230, 224, 218, 135, 147, 260],
//       type: 'line'
//     }
//   ]
// }
export default {
  components: {
    myEcharts
  },
  data() {
    return {
      echarts,
      chartData: [150, 230, 224, 218, 135, 147, 260, 280],
      option: {
        xAxis: {
          type: 'category',
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            data: [150, 230, 224, 218, 135, 147, 260, 400, 500, 1],
            type: 'line'
          }
        ]
      }
    }
  },
  onLoad() { },
  onReady() {
    uni.createSelectorQuery().select('.aaa').boundingClientRect(e => {
      console.log(e);
    }).exec()

    // this.$refs.mapChart.chart.setOption(this.option)
  },
  methods: {
    initChart(canvas, width, height) {
      const chart = echarts.init(canvas, null, {
        width: width,
        height: height
      })
      canvas.setChart(chart)
      const option = {
        xAxis: {
          type: 'category',
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            data: [150, 230, 224, 218, 135, 147, 260, 280],
            type: 'line'
          }
        ]
      }
      chart.setOption(option)
      return chart
    }
  }
}
</script>

<style lang="scss">
.echarts-wrap {
  width: 100%;
  height: 300px;
}
</style>
