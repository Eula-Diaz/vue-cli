<template>
  <div ref="echart"></div>
</template>

<script>
import * as echarts from 'echarts'
export default {
  props: {
    chartData: {
      type: Object,
      default () {
        return {
          xData: [],
          series,
        }
      }
    },
    isAxisChart: {
      type: Boolean,
      default: true
    }
  },
  watch: {
    chartData: {
      handler: function () {
        this.initChart()
      },
      deep: true
    }
  },
  computed: {
    options() {
      return this.isAxisChart ? this.axisOption : this.nomalOption
    }
  },
  methods: {
    initChart () {
      this.initChartData()
      if (this.echart) {
        this.echart.setOption(this.options)
      } else {
        this.echart = echarts.init(this.$refs.echart)
        this.echart.setOption(this.options)
      }
    },
    initChartData () {
      if (this.isAxisChart) {
        this.axisOption.xAxis.data = this.chartData.xData
        this.axisOption.series = this.chartData.series
      } else {
        this.nomalOption.series = this.chartData.series
      }
    }
  },
  data () {
    return {
      axisOption: {
        legend: {
          textStyle: {
            color: '#333'
          }
        },
        grid: {
          left: "20%"
        },
        tooltip: {
          trigger: "axis"
        },
        xAxis: {
          type: 'category',
          data: [],
          axisLine: {
            lineStyle: {
              color: '#17b3a3'
            }
          },
          axisLabel: {
            interval: 0,
            color: '#333'
          }
        },
        yAxis: [
          {
            type: 'value',
            axisLine: {
              lineStyle: {
                color: '#17b3a3'
              }
            }
          }
        ],
        color: ['#2ec7c9', '#b6a2de', '#5ab1ef', '#ffb980', '#d87a80',
        '#8d98b3'],
        series: []
      },
      nomalOption: {
        tooltip: {
          trigger: 'item'
            },
          color: [
            '#0f78f4',
            '#dd536b',
            '#9462e5',
            '#a6a6a6',
            '#e1bb22',
            '#39c362',
            '#3ed1cf'
          ],
          series: []
      },
      echart: null
    }
  }
}
</script>