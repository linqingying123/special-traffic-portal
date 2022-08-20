<template>
  <a-card :bordered="false">
    <!--导航区域-->
    <div>
      <a-tabs defaultActiveKey="1" @change="callback">
        <a-tab-pane key="1" tab="登录日志"></a-tab-pane>
        <a-tab-pane key="2" tab="操作日志"></a-tab-pane>
      </a-tabs>
    </div>

    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline" @keyup.enter.native="searchQuery">
        <a-row :gutter="24">

          <a-col :md="6" :sm="8">
            <a-form-item label="搜索日志">
              <a-input v-model="queryParam.keyWord" placeholder="请输入搜索关键词"></a-input>
            </a-form-item>
          </a-col>

          <a-col :md="6" :sm="10">
            <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="创建时间">
              <a-range-picker
                v-model="queryParam.createTimeRange"
                :placeholder="['开始时间', '结束时间']"
                format="YYYY-MM-DD"
                style="width: 210px"
                @change="onDateChange"
                @ok="onDateOk"
              />
            </a-form-item>
          </a-col>
          <a-col v-if="tabKey === '2'" :md="5" :sm="8">
            <a-form-item label="操作类型" style="left: 10px">
              <j-dict-select-tag v-model="queryParam.operateType" dictCode="operate_type" placeholder="请选择操作类型"/>
            </a-form-item>
          </a-col>

          <span class="table-page-search-submitButtons" style="float: left;overflow: hidden;">
            <a-col :md="6" :sm="24" >
                <a-button icon="search"  style="left: 10px" type="primary" @click="searchQuery">查询</a-button>
                <a-button icon="reload"  style="margin-left: 8px;left: 10px" type="primary" @click="searchReset">重置</a-button>
            </a-col>
          </span>

        </a-row>
      </a-form>
    </div>

    <!-- table区域-begin -->
    <a-table
      ref="table"
      :columns="columns"
      :dataSource="dataSource"
      :loading="loading"
      :pagination="ipagination"
      rowKey="id"
      size="middle"
      @change="handleTableChange">

      <template v-if="queryParam.logType==='2'" #expandedRowRender="record">
        <div style="margin: 0">
          <div style="margin-bottom: 5px"><a-badge status="success" style="vertical-align: middle;"/><span style="vertical-align: middle;">请求方法:{{ record.method }}</span></div>
          <div><a-badge status="processing" style="vertical-align: middle;"/><span style="vertical-align: middle;">请求参数:{{ record.requestParam }}</span></div>
        </div>
      </template>

      <!-- 字符串超长截取省略号显示-->
      <span slot="logContent" slot-scope="text, record">
          <j-ellipsis :length="40" :value="text"/>
        </span>
    </a-table>
    <!-- table区域-end -->
  </a-card>
</template>

<script>
  import { filterObj } from '@/utils/util';
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'
  import JEllipsis from '@/components/jeecg/JEllipsis'

  export default {
    name: "LogList",
    mixins:[JeecgListMixin],
    components: {
      JEllipsis
    },
    data () {
      return {
        description: '这是日志管理页面',
        // 查询条件
        queryParam: {
          ipInfo:'',
          createTimeRange:[],
          logType:'1',
          keyWord:'',
        },
        tabKey: "1",
        // 表头
        columns: [
          {
            title: '#',
            dataIndex: '',
            key:'rowIndex',
            align:"center",
            customRender:function (t,r,index) {
              return parseInt(index)+1;
            }
          },
          {
            title: '日志内容',
            align:"left",
            dataIndex: 'logContent',
            scopedSlots: { customRender: 'logContent' },
            sorter: true
          },
          {
            title: '操作人ID',
            dataIndex: 'userid',
            align:"center",
            sorter: true
          },
          {
            title: '操作人名称',
            dataIndex: 'username',
            align:"center",
            sorter: true
          },
          {
            title: 'IP',
            dataIndex: 'ip',
            align:"center",
            sorter: true
          },
          {
            title: '耗时(毫秒)',
            dataIndex: 'costTime',
            align:"center",
            sorter: true
          },
          {
            title: '日志类型',
            dataIndex: 'logType_dictText',
            /*customRender:function (text) {
              if(text==1){
                return "登录日志";
              }else if(text==2){
                return "操作日志";
              }else{
                return text;
              }
            },*/
            align:"center",
          },
          {
            title: '创建时间',
            dataIndex: 'createTime',
            align:"center",
            sorter: true
          }
        ],
        operateColumn:
        {
          title: '操作类型',
          dataIndex: 'operateType_dictText',
          align:"center",
        },
        labelCol: {
          xs: { span: 1 },
          sm: { span: 2 },
        },
        wrapperCol: {
          xs: { span: 10 },
          sm: { span: 16 },
        },
        url: {
          list: "/sys/log/list",
        },
      }
    },
    methods: {
      getQueryParams(){
        var param = Object.assign({}, this.queryParam,this.isorter);
        param.field = this.getQueryField();
        param.pageNo = this.ipagination.current;
        param.pageSize = this.ipagination.pageSize;
        delete param.createTimeRange; // 时间参数不传递后台
        if (this.superQueryParams) {
          param['superQueryParams'] = encodeURI(this.superQueryParams)
          param['superQueryMatchType'] = this.superQueryMatchType
        }
        //登录日志没有操作类型
        if (this.tabKey === '1') {
          param.operateType = ''
        }
        return filterObj(param);
      },

      // 重置
      searchReset(){
        var that = this;
        var logType = that.queryParam.logType;
        that.queryParam = {}; //清空查询区域参数
        that.queryParam.logType = logType;
        that.loadData(this.ipagination.current);
      },
      // 日志类型
      callback(key){

        // 动态添加操作类型列
        if (key == 2) {
          this.tabKey = '2';
          this.columns.splice(7, 0, this.operateColumn);
        }else if(this.columns.length == 9)
        {
          this.tabKey = '1';
          this.columns.splice(7,1);
        }

        let that=this;
        that.queryParam.logType=key;
        that.loadData(1);
      },
      onDateChange: function (value, dateString) {
        console.log(dateString[0],dateString[1]);
        this.queryParam.createTime_begin=dateString[0];
        this.queryParam.createTime_end=dateString[1];
      },
      onDateOk(value) {
        console.log(value);
      },
    }
  }
</script>
<style scoped>
  @import '~@assets/less/common.less'
</style>
