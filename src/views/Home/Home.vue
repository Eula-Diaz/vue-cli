<template>
  <el-row class="home" :gutter="20">
    <el-col :span="8" style="margin-top: 20px;">
      <el-card shadow="hover">
        <div class="user">
          <img :src="userImg">
          <div class="userInfo">
            <p class="name">Admin</p>
            <p class="access">超级管理员</p>
          </div>
        </div>
        <div class="login-info">
          <p>上次登陆时间：<span>2020-12-4</span></p>
          <p>上次登陆地点：<span>南京</span></p>
        </div>
      </el-card>
      <el-card style="margin-top: 20px; height: 480px;">
        <el-table :data="tableData">
          <el-table-column
            show-overflow-tooltip
            v-for="(val, key) in tableLabel"
            :key="key"
            :prop="key"
            :label="val"
          >
          </el-table-column>
        </el-table>
      </el-card>
    </el-col>
    <el-col :span="16" style="margin-top: 20px;">
      <div class="num">
        <el-card
          shadow="hover"
          v-for="item in countData"
          :key="item.name"
          :body-style="{ display: 'flex', padding: 0 }"
        >
          <i
            class="icon"
            :class="`el-icon-${item.icon}`"
            :style="{ background: item.color }"
          ></i>
          <div class="detail">
            <p class="num">¥{{ item.value }}</p>
            <p class="txt">¥{{ item.name }}</p>
          </div>
        </el-card>
      </div>
      <el-card shadow="hover" style="height: 280px">
        <!-- <div style="height: 280px" ref="echart"></div> -->
        <echart :chartData="echartData.order" style="height: 280px" />
      </el-card>
      <div class="graph">
        <el-card shadow="hover" style="height: 280px">
          <!-- <div style="height: 240px" ref="userEchart"></div> -->
          <echart :chartData="echartData.user" style="height: 240px" />
        </el-card>
        <el-card shadow="hover" style="height: 280px">
          <!-- <div style="height: 240px" ref="videoEchart"></div> -->
          <echart :chartData="echartData.video" style="height: 240px" :isAxisChart="false"/>
        </el-card>
      </div>
    </el-col>
  </el-row>
</template>

<script>
import { getHome } from '../../api/data'
import Echart from '../../components/Echarts.vue'
export default {
  components: { Echart },
  data () {
    return {
      userImg: require('../../assets/images/user.jpg'),
      tableData: [],
      tableLabel: {
        name: '课程',
        todayBuy: '今日购买',
        monthBuy: '本月购买',
        totalBuy: '总购买'
      },
      countData: [
        {
          name: '今日已支付订单',
          value: 1234,
          icon: 'success',
          color: '#2ec7c9'
        },
        {
          name: '今日收藏订单',
          value: 210,
          icon: 'star-on',
          color: '#ffb980'
        },
        {
          name: '今日未支付订单',
          value: 1234,
          icon: 's-goods',
          color: '#5ab1ef'
        },
        {
          name: '本月支付订单',
          value: 1234,
          icon: 'success',
          color: '#2ec7c9'
        },
        {
          name: '本月收藏订单',
          value: 210,
          icon: 'star-on',
          color: '#ffb980'
        },
        {
          name: '本月未支付订单',
          value: 1234,
          icon: 's-goods',
          color: '#5ab1ef'
        }
      ],
      echartData: {
        order: {
          xData: [],
          series: []
        },
        user: {
          xData: [],
          series: []          
        },
        video: {
          series: []
        }
      }
    }
  },
  methods: {
    getTableData () {
      getHome().then((res) => {
        this.tableData = res.data.tableData
        const order = res.data.orderData
        let keyArray = Object.keys(order.data[0])

        this.echartData.order.xData = order.date
        keyArray.forEach((key) => {
          this.echartData.order.series.push({
            name: key,
            data: order.data.map((item) => item[key]),
            type: 'line'
          })
        })

        // const myEchartsOrder = echarts.init(this.$refs.echart)
        // myEchartsOrder.setOption(this.echartsData.order)

        this.echartData.user.xData = res.data.userData.map((item) => item.date)
        this.echartData.user.series.push({
          name: '新增用户',
          data: res.data.userData.map((item) => item.new),
          type: 'bar'
        })
        this.echartData.user.series.push({
          name: '活跃用户',
          data: res.data.userData.map((item) => item.active),
          type: 'bar'
        }) 
        // const myEchartsUser = echarts.init(this.$refs.userEchart)
        // myEchartsUser.setOption(this.echartsData.user)

        this.echartData.video.series.push({
          data: res.data.videoData,
          type: 'pie'
        })
        // const myEchartsVideo = echarts.init(this.$refs.videoEchart)
        // myEchartsVideo.setOption(this.echartsData.video)  
      })
    }
  },
  mounted () {
    this.getTableData()
  }
}
</script>

<style lang="scss" scoped>
@import '../../assets/scss/home'
</style>
