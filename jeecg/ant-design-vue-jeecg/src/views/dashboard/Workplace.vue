<template>
  <page-layout :avatar="avatar">
    <div slot="headerContent">
      <div class="title">{{ timeFix }}，{{ nickname() }}<span class="welcome-text">，{{ welcome() }}</span></div>
      <div>前端工程师 | 蚂蚁金服 - 某某某事业群 - VUE平台</div>
    </div>
    <div slot="extra">
      <a-row class="more-info">
        <a-col :span="8">
          <head-info :bordered="false" :center="false" content="56" title="项目数"/>
        </a-col>
        <a-col :span="8">
          <head-info :bordered="false" :center="false" content="8/24" title="团队排名"/>
        </a-col>
        <a-col :span="8">
          <head-info :center="false" content="2,223" title="项目访问" />
        </a-col>
      </a-row>
    </div>

    <div>
      <a-row :gutter="24">
        <a-col :lg="24" :md="24" :sm="24" :xl="16" :xs="24">
          <a-card
            :body-style="{ padding: 0 }"
            :bordered="false"
            :loading="loading"
            class="project-list"
            style="margin-bottom: 24px;"
            title="进行中的项目">
            <a slot="extra">全部项目</a>
            <div>
              <a-card-grid v-for="(item, i) in projects" :key="i" class="project-card-grid">
                <a-card :body-style="{ padding: 0 }" :bordered="false">
                  <a-card-meta>
                    <div slot="title" class="card-title">
                      <a-avatar :src="item.cover" size="small"/>
                      <a>{{ item.title }}</a>
                    </div>
                    <div slot="description" class="card-description">
                      {{ item.description }}
                    </div>
                  </a-card-meta>
                  <div class="project-item">
                    <a href="/#/">科学搬砖组</a>
                    <span class="datetime">9小时前</span>
                  </div>
                </a-card>
              </a-card-grid>
            </div>
          </a-card>

          <a-card :bordered="false" :loading="loading" title="动态">
            <a-list>
              <a-list-item v-for="(item, index) in activities" :key="index">
                <a-list-item-meta>
                  <a-avatar slot="avatar" :src="item.user.avatar" />
                  <div slot="title">
                    <span>{{ item.user.nickname }}</span>&nbsp;
                    在&nbsp;<a href="#">{{ item.project.name }}</a>&nbsp;
                    <span>{{ item.project.action }}</span>&nbsp;
                    <a href="#">{{ item.project.event }}</a>
                  </div>
                  <div slot="description">{{ item.time }}</div>
                </a-list-item-meta>
              </a-list-item>
            </a-list>
          </a-card>
        </a-col>
        <a-col
          :lg="24"
          :md="24"
          :sm="24"
          :xl="8"
          :xs="24"
          style="padding: 0 12px">
          <a-card :body-style="{padding: 0}" :bordered="false" style="margin-bottom: 24px" title="快速开始 / 便捷导航">
            <div class="item-group">
              <a>操作一</a>
              <a>操作二</a>
              <a>操作三</a>
              <a>操作四</a>
              <a>操作五</a>
              <a>操作六</a>
              <a-button ghost icon="plus" size="small" type="primary">添加</a-button>
            </div>
          </a-card>
          <a-card :body-style="{ padding: 0 }" :bordered="false" :loading="radarLoading" style="margin-bottom: 24px" title="XX 指数">
            <div style="min-height: 400px;">
              <!-- :scale="scale" :axis1Opts="axis1Opts" :axis2Opts="axis2Opts"  -->
              <radar :data="radarData" />
            </div>
          </a-card>
          <a-card :bordered="false" :loading="loading" title="团队">
            <div class="members">
              <a-row>
                <a-col v-for="(item, index) in teams" :key="index" :span="12">
                  <a>
                    <a-avatar :src="item.avatar" size="small" />
                    <span class="member">{{ item.name }}</span>
                  </a>
                </a-col>
              </a-row>
            </div>
          </a-card>
        </a-col>
      </a-row>
    </div>
  </page-layout>
</template>

<script>
  import { timeFix } from "@/utils/util"
  import {mapGetters} from "vuex"

  import PageLayout from '@/components/page/PageLayout'
  import HeadInfo from '@/components/tools/HeadInfo'
  import Radar from '@/components/chart/Radar'
  import { getRoleList, getServiceList, getFileAccessHttpUrl } from "@/api/manage"

  const DataSet = require('@antv/data-set')

  export default {
    name: "Workplace",
    components: {
      PageLayout,
      HeadInfo,
      Radar
    },
    data() {
      return {
        timeFix: timeFix(),
        avatar: '',
        user: {},

        projects: [],
        loading: true,
        radarLoading: true,
        activities: [],
        teams: [],

        // data
        axis1Opts: {
          dataKey: 'item',
          line: null,
          tickLine: null,
          grid: {
            lineStyle: {
              lineDash: null
            },
            hideFirstLine: false
          }
        },
        axis2Opts: {
          dataKey: 'score',
          line: null,
          tickLine: null,
          grid: {
            type: 'polygon',
            lineStyle: {
              lineDash: null
            }
          }
        },
        scale: [{
          dataKey: 'score',
          min: 0,
          max: 80
        }],
        axisData: [
          { item: '引用', a: 70, b: 30, c: 40 },
          { item: '口碑', a: 60, b: 70, c: 40 },
          { item: '产量', a: 50, b: 60, c: 40 },
          { item: '贡献', a: 40, b: 50, c: 40 },
          { item: '热度', a: 60, b: 70, c: 40 },
          { item: '引用', a: 70, b: 50, c: 40 }
        ],
        radarData: []
      }
    },
    computed: {
      userInfo() {
        return this.$store.getters.userInfo
      }
    },
    created() {
      this.user = this.userInfo
      this.avatar = getFileAccessHttpUrl(this.userInfo.avatar)
      console.log('this.avatar :'+ this.avatar)

      getRoleList().then(res => {
        console.log('workplace -> call getRoleList()', res)
      })

      getServiceList().then(res => {
        console.log('workplace -> call getServiceList()', res)
      })
    },
    mounted() {
      this.getProjects()
      this.getActivity()
      this.getTeams()
      this.initRadar()
    },
    methods: {
      ...mapGetters(["nickname", "welcome"]),
      getProjects() {
        this.$http.get('/mock/api/list/search/projects')
          .then(res => {
            this.projects = res.result && res.result.data
            this.loading = false
          })
      },
      getActivity() {
        this.$http.get('/mock/api/workplace/activity')
          .then(res => {
            this.activities = res.result
          })
      },
      getTeams() {
        this.$http.get('/mock/api/workplace/teams')
          .then(res => {
            this.teams = res.result
          })
      },
      initRadar() {
        this.radarLoading = true

        this.$http.get('/mock/api/workplace/radar')
          .then(res => {

            const dv = new DataSet.View().source(res.result)
            dv.transform({
              type: 'fold',
              fields: ['个人', '团队', '部门'],
              key: 'user',
              value: 'score'
            })

            this.radarData = dv.rows
            this.radarLoading = false
          })
      }
    }
  }
</script>

<style lang="less" scoped>
  .project-list {

    .card-title {
      font-size: 0;

      a {
        color: rgba(0, 0, 0, 0.85);
        margin-left: 12px;
        line-height: 24px;
        height: 24px;
        display: inline-block;
        vertical-align: top;
        font-size: 14px;

        &:hover {
          color: #1890ff;
        }
      }
    }
    .card-description {
      color: rgba(0, 0, 0, 0.45);
      height: 44px;
      line-height: 22px;
      overflow: hidden;
    }
    .project-item {
      display: flex;
      margin-top: 8px;
      overflow: hidden;
      font-size: 12px;
      height: 20px;
      line-height: 20px;
      a {
        color: rgba(0, 0, 0, 0.45);
        display: inline-block;
        flex: 1 1 0;

        &:hover {
          color: #1890ff;
        }
      }
      .datetime {
        color: rgba(0, 0, 0, 0.25);
        flex: 0 0 auto;
        float: right;
      }
    }
    .ant-card-meta-description {
      color: rgba(0, 0, 0, 0.45);
      height: 44px;
      line-height: 22px;
      overflow: hidden;
    }
  }

  .item-group {
    padding: 20px 0 8px 24px;
    font-size: 0;
    a {
      color: rgba(0, 0, 0, 0.65);
      display: inline-block;
      font-size: 14px;
      margin-bottom: 13px;
      width: 25%;
    }
  }

  .members {
    a {
      display: block;
      margin: 12px 0;
      line-height: 24px;
      height: 24px;
      .member {
        font-size: 14px;
        color: rgba(0, 0, 0, .65);
        line-height: 24px;
        max-width: 100px;
        vertical-align: top;
        margin-left: 12px;
        transition: all 0.3s;
        display: inline-block;
      }
      &:hover {
        span {
          color: #1890ff;
        }
      }
    }
  }

  .mobile {

    .project-list {

      .project-card-grid {
        width: 100%;
      }
    }

    .more-info {
      border: 0;
      padding-top: 16px;
      margin: 16px 0 16px;
    }

    .headerContent .title .welcome-text {
      display: none;
    }
  }

</style>
