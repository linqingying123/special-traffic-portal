<template>
  <div class="page-header-index-wide">
    <a-row :gutter="24">
      <a-col :md="12" :sm="24" :style="{ marginBottom: '24px' }" :xl="6">
        <chart-card :loading="loading" title="总销售额" total="￥126,560">
          <a-tooltip slot="action" title="指标说明">
            <a-icon type="info-circle-o" />
          </a-tooltip>
          <div>
            <trend flag="up" style="margin-right: 16px;">
              <span slot="term">周同比</span>
              12%
            </trend>
            <trend flag="down">
              <span slot="term">日同比</span>
              11%
            </trend>
          </div>
          <template slot="footer">日均销售额<span>￥ 234.56</span></template>
        </chart-card>
      </a-col>
      <a-col :md="12" :sm="24" :style="{ marginBottom: '24px' }" :xl="6">
        <chart-card :loading="loading" :total="8846 | NumberFormat" title="订单量">
          <a-tooltip slot="action" title="指标说明">
            <a-icon type="info-circle-o" />
          </a-tooltip>
          <div>
            <mini-area />
          </div>
          <template slot="footer">日订单量<span> {{ '1234' | NumberFormat }}</span></template>
        </chart-card>
      </a-col>
      <a-col :md="12" :sm="24" :style="{ marginBottom: '24px' }" :xl="6">
        <chart-card :loading="loading" :total="6560 | NumberFormat" title="支付笔数">
          <a-tooltip slot="action" title="指标说明">
            <a-icon type="info-circle-o" />
          </a-tooltip>
          <div>
            <mini-bar :height="40" />
          </div>
          <template slot="footer">转化率 <span>60%</span></template>
        </chart-card>
      </a-col>
      <a-col :md="12" :sm="24" :style="{ marginBottom: '24px' }" :xl="6">
        <chart-card :loading="loading" title="运营活动效果" total="78%">
          <a-tooltip slot="action" title="指标说明">
            <a-icon type="info-circle-o" />
          </a-tooltip>
          <div>
            <mini-progress :height="8" :percentage="78" :target="80" color="rgb(19, 194, 194)" />
          </div>
          <template slot="footer">
            <trend flag="down" style="margin-right: 16px;">
              <span slot="term">同周比</span>
              12%
            </trend>
            <trend flag="up">
              <span slot="term">日环比</span>
              80%
            </trend>
          </template>
        </chart-card>
      </a-col>
    </a-row>

    <a-card :body-style="{padding: '0'}" :bordered="false" :loading="loading">
      <div class="salesCard">
        <a-tabs :tab-bar-style="{marginBottom: '24px', paddingLeft: '16px'}" default-active-key="1" size="large">
          <div slot="tabBarExtraContent" class="extra-wrapper">
            <div class="extra-item">
              <a>今日</a>
              <a>本周</a>
              <a>本月</a>
              <a>本年</a>
            </div>
            <a-range-picker :style="{width: '256px'}" />
          </div>
          <a-tab-pane key="1" loading="true" tab="销售额">
            <a-row>
              <a-col :lg="12" :md="12" :sm="24" :xl="16" :xs="24">
                <bar :dataSource="barData" title="销售额排行"/>
              </a-col>
              <a-col :lg="12" :md="12" :sm="24" :xl="8" :xs="24">
                <rank-list :list="rankList" title="门店销售排行榜"/>
              </a-col>
            </a-row>
          </a-tab-pane>
          <a-tab-pane key="2" tab="销售趋势">
            <a-row>
              <a-col :lg="12" :md="12" :sm="24" :xl="16" :xs="24">
                <bar :dataSource="barData" title="销售额趋势"/>
              </a-col>
              <a-col :lg="12" :md="12" :sm="24" :xl="8" :xs="24">
                <rank-list :list="rankList" title="门店销售排行榜"/>
              </a-col>
            </a-row>
          </a-tab-pane>
        </a-tabs>
      </div>
    </a-card>

    <a-row>
      <a-col :span="24">
        <a-card :bordered="false" :loading="loading" :style="{ marginTop: '24px' }" title="最近一周访问量统计">
          <a-row>
            <a-col :span="6">
              <head-info :content="loginfo.todayIp" title="今日IP"></head-info>
            </a-col>
            <a-col :span="2">
              <a-spin class='circle-cust'>
                <a-icon slot="indicator" style="font-size: 24px" type="environment"  />
              </a-spin>
            </a-col>
            <a-col :span="6">
              <head-info :content="loginfo.todayVisitCount" title="今日访问"></head-info>
            </a-col>
            <a-col :span="2">
              <a-spin class='circle-cust'>
                <a-icon slot="indicator" style="font-size: 24px" type="team"  />
              </a-spin>
            </a-col>
            <a-col :span="6">
              <head-info :content="loginfo.totalVisitCount" title="总访问量"></head-info>
            </a-col>
            <a-col :span="2">
              <a-spin class='circle-cust'>
                <a-icon slot="indicator" style="font-size: 24px" type="rise"  />
              </a-spin>
            </a-col>
          </a-row>
          <line-chart-multid :dataSource="visitInfo" :fields="visitFields"></line-chart-multid>
        </a-card>
      </a-col>
    </a-row>
  </div>
</template>

<script>
  import ChartCard from '@/components/ChartCard'
  import ACol from "ant-design-vue/es/grid/Col"
  import ATooltip from "ant-design-vue/es/tooltip/Tooltip"
  import MiniArea from '@/components/chart/MiniArea'
  import MiniBar from '@/components/chart/MiniBar'
  import MiniProgress from '@/components/chart/MiniProgress'
  import RankList from '@/components/chart/RankList'
  import Bar from '@/components/chart/Bar'
  import LineChartMultid from '@/components/chart/LineChartMultid'
  import HeadInfo from '@/components/tools/HeadInfo.vue'

  import Trend from '@/components/Trend'
  import { getLoginfo,getVisitInfo } from '@/api/api'

  const rankList = []
  for (let i = 0; i < 7; i++) {
    rankList.push({
      name: '白鹭岛 ' + (i+1) + ' 号店',
      total: 1234.56 - i * 100
    })
  }
  const barData = []
  for (let i = 0; i < 12; i += 1) {
    barData.push({
      x: `${i + 1}月`,
      y: Math.floor(Math.random() * 1000) + 200
    })
  }
  export default {
    name: "IndexChart",
    components: {
      ATooltip,
      ACol,
      ChartCard,
      MiniArea,
      MiniBar,
      MiniProgress,
      RankList,
      Bar,
      Trend,
      LineChartMultid,
      HeadInfo
    },
    data() {
      return {
        loading: true,
        center: null,
        rankList,
        barData,
        loginfo:{},
        visitFields:['ip','visit'],
        visitInfo:[],
        indicator: <a-icon type="loading" style="font-size: 24px" spin />
      }
    },
    created() {
      setTimeout(() => {
        this.loading = !this.loading
      }, 1000)
      this.initLogInfo();
    },
    methods: {
      initLogInfo () {
        getLoginfo(null).then((res)=>{
          if(res.success){
            Object.keys(res.result).forEach(key=>{
              res.result[key] =res.result[key]+""
            })
            this.loginfo = res.result;
          }
        })
        getVisitInfo().then(res=>{
          if(res.success){
             this.visitInfo = res.result;
           }
         })
      },
    }
  }
</script>

<style lang="less" scoped>
  .circle-cust{
    position: relative;
    top: 28px;
    left: -100%;
  }
  .extra-wrapper {
    line-height: 55px;
    padding-right: 24px;

    .extra-item {
      display: inline-block;
      margin-right: 24px;

      a {
        margin-left: 24px;
      }
    }
  }

  /* 首页访问量统计 */
  .head-info {
    position: relative;
    text-align: left;
    padding: 0 32px 0 0;
    min-width: 125px;

    &.center {
      text-align: center;
      padding: 0 32px;
    }

    span {
      color: rgba(0, 0, 0, .45);
      display: inline-block;
      font-size: .95rem;
      line-height: 42px;
      margin-bottom: 4px;
    }
    p {
      line-height: 42px;
      margin: 0;
      a {
        font-weight: 600;
        font-size: 1rem;
      }
    }
  }
</style>
