<template>
  <a-card :bordered="false">
    <a-tabs defaultActiveKey="1">
      <!-- 柱状图 -->
      <a-tab-pane key="1" tab="柱状图">
        <bar :dataSource="barData" :height="height" title="销售额排行"/>
      </a-tab-pane>
      <!-- 多列柱状图 -->
      <a-tab-pane key="2" tab="多列柱状图">
        <bar-multid :height="height" title="多列柱状图"/>
      </a-tab-pane>
      <!-- 迷你柱状图 -->
      <a-tab-pane key="3" tab="迷你柱状图">
        <mini-bar :dataSource="barData" :height="200" :width="400"/>
      </a-tab-pane>
      <!-- 面积图 -->
      <a-tab-pane key="4" tab="面积图">
        <area-chart-ty :dataSource="areaData" :height="height" title="销售额排行" x="月份" y="销售额"/>
      </a-tab-pane>
      <!-- 迷你面积图 -->
      <a-tab-pane key="5" tab="迷你面积图">
        <div style="padding-top: 100px;width:600px;height:200px">
          <mini-area :dataSource="areaData" :height="height" x="月份" y="销售额"/>
        </div>
      </a-tab-pane>
      <!-- 多行折线图 -->
      <a-tab-pane key="6" tab="多行折线图">
        <line-chart-multid :height="height" title="多行折线图"/>
      </a-tab-pane>
      <!-- 饼图 -->
      <a-tab-pane key="7" tab="饼图">
        <pie :height="height" title="饼图"/>
      </a-tab-pane>
      <!-- 雷达图 -->
      <a-tab-pane key="8" tab="雷达图">
        <radar :height="height" title="雷达图"/>
      </a-tab-pane>
      <!-- 仪表盘 -->
      <a-tab-pane key="9" tab="仪表盘">
        <dash-chart-demo :height="height" :value="9" title="仪表盘"/>
      </a-tab-pane>
      <!-- 进度条 -->
      <a-tab-pane key="10" tab="进度条">
        <mini-progress :height="30" :percentage="30" :target="40"/>
        <mini-progress :height="30" :percentage="51" :target="60" color="#FFA500"/>
        <mini-progress :height="30" :percentage="66" :target="80" color="#1E90FF"/>
        <mini-progress :height="30" :percentage="74" :target="70" color="#FF4500"/>
        <mini-progress :height="30" :percentage="92" :target="100" color="#49CC49"/>
      </a-tab-pane>
      <!-- 排名列表 -->
      <a-tab-pane key="11" tab="排名列表">
        <rank-list :list="rankList" style="width: 600px;margin: 0 auto;" title="门店销售排行榜"/>
      </a-tab-pane>
      <!-- TransferBar -->
      <a-tab-pane key="12" tab="TransferBar">
        <transfer-bar :data="barData" :height="height" title="年度消耗流量一览表" x="月份" y="流量(Mb)"/>
      </a-tab-pane>
      <!-- Trend -->
      <a-tab-pane key="13" tab="Trend">
        <trend :percentage="30" term="Trend：" title="Trend"/>
      </a-tab-pane>
      <!-- Liquid -->
      <a-tab-pane key="14" tab="Liquid">
        <liquid :height="height"/>
      </a-tab-pane>
      <!-- BarAndLine -->
      <a-tab-pane key="15" tab="BarAndLine">
        <bar-and-line :height="height"/>
      </a-tab-pane>
    </a-tabs>
  </a-card>
</template>

<script>
  import AreaChartTy from '@/components/chart/AreaChartTy'
  import Bar from '@/components/chart/Bar'
  import BarMultid from '@/components/chart/BarMultid'
  import DashChartDemo from '@/components/chart/DashChartDemo'
  import LineChartMultid from '@/components/chart/LineChartMultid'
  import Liquid from '@/components/chart/Liquid'
  import MiniBar from '@/components/chart/MiniBar'
  import MiniArea from '@/components/chart/MiniArea'
  import MiniProgress from '@/components/chart/MiniProgress'
  import Pie from '@/components/chart/Pie'
  import Radar from '@/components/chart/Radar'
  import RankList from '@/components/chart/RankList'
  import TransferBar from '@/components/chart/TransferBar'
  import Trend from '@/components/chart/Trend'
  import BarAndLine from '@/components/chart/BarAndLine'

  export default {
    name: 'ViserChartDemo',
    components: {
      Bar, MiniBar, BarMultid, AreaChartTy, LineChartMultid,
      Pie, Radar, DashChartDemo, MiniProgress, RankList,
      TransferBar, Trend, Liquid, MiniArea, BarAndLine
    },
    data() {
      return {
        height: 420,
        rankList: [],
        barData: [],
        areaData: []
      }
    },
    created() {
      setTimeout(() => {
        this.loadBarData()
        this.loadAreaData()
        this.loadRankListData()
      }, 100)
    },
    methods: {
      loadData(x, y, max, min, before = '', after = '月') {
        let data = []
        for (let i = 0; i < 12; i += 1) {
          data.push({
            [x]: `${before}${i + 1}${after}`,
            [y]: Math.floor(Math.random() * max) + min
          })
        }
        return data
      },
      // 加载柱状图数据
      loadBarData() {
        this.barData = this.loadData('x', 'y', 1000, 200)
      },
      // 加载AreaChartTy的数据
      loadAreaData() {
        this.areaData = this.loadData('x', 'y', 500, 100)
      },
      loadRankListData() {
        this.rankList = this.loadData('name', 'total', 2000, 100, '北京朝阳 ', ' 号店')
      }
    }
  }
</script>

<style scoped>

</style>
