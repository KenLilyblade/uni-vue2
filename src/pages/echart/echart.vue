<template>
  <div>
    <buouyuEcharts ref="echart" :option="option" canvasId="buouyu" />
  </div>
</template>

<script>
import buouyuEcharts from 'buouyu-echarts'
export default {
  components: {
    buouyuEcharts
  },
  mounted() {
    let data1 = [10, 20, 30]
    let data2 = [46, 32, 37]
    setInterval(() => {
      data1.push(data[data.length - 1] + 10)
      data1.shift()
      data1.push(data[data.length - 1] + 15)
      data1.shift()
      this.$refs.echart.setOption({
        series: [
          {
            data1
          },
          {
            data2
          }
        ],
        xAxis: {
          data
        }
      })
    }, 1000)
  },
  data() {
    return {
      option: {
        xAxis: {
          type: 'category',
          data: [1, 2]
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            data: [1, 2],
            type: 'line'
          }
        ]
      }
    }
  }
}
</script>

<style lang="scss" scoped></style>
