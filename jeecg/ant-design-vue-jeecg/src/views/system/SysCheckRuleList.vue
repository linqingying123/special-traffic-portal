<template>
  <a-card :bordered="false">

    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form-model :model="queryParam" layout="inline" @keyup.enter.native="searchQuery">
        <a-row :gutter="24">

          <a-col :md="6" :sm="8">
            <a-form-model-item label="规则名称" prop="ruleName">
              <a-input v-model="queryParam.ruleName" placeholder="请输入规则名称"/>
            </a-form-model-item>
          </a-col>
          <a-col :md="6" :sm="8">
            <a-form-model-item label="规则Code" prop="ruleCode">
              <a-input v-model="queryParam.ruleCode" placeholder="请输入规则Code"/>
            </a-form-model-item>
          </a-col>
          <template v-if="toggleSearchStatus">
          </template>
          <a-col :md="6" :sm="8">
            <span class="table-page-search-submitButtons" style="float: left;overflow: hidden;">
              <a-button icon="search" type="primary" @click="searchQuery">查询</a-button>
              <a-button icon="reload" style="margin-left: 8px" type="primary" @click="searchReset">重置</a-button>
              <a style="margin-left: 8px" @click="handleToggleSearch">
                {{ toggleSearchStatus ? '收起' : '展开' }}
                <a-icon :type="toggleSearchStatus ? 'up' : 'down'"/>
              </a>
            </span>
          </a-col>

        </a-row>
      </a-form-model>
    </div>

    <!-- 操作按钮区域 -->
    <div class="table-operator">
      <a-button icon="plus" type="primary" @click="handleAdd">新增</a-button>
      <a-button icon="download" type="primary" @click="handleExportXls('编码校验规则')">导出</a-button>
      <a-upload :action="importExcelUrl" :headers="tokenHeader" :multiple="false" :showUploadList="false" name="file" @change="handleImportExcel">
        <a-button icon="import" type="primary">导入</a-button>
      </a-upload>
      <a-dropdown v-if="selectedRowKeys.length > 0">
        <a-menu slot="overlay">
          <a-menu-item key="1" @click="batchDel">
            <a-icon type="delete"/>
            删除
          </a-menu-item>
        </a-menu>
        <a-button style="margin-left: 8px"> 批量操作
          <a-icon type="down"/>
        </a-button>
      </a-dropdown>
    </div>

    <!-- table区域-begin -->
    <a-alert showIcon style="margin-bottom: 16px;" type="info">
      <template slot="message">
        <span>已选择</span>
        <a style="font-weight: 600;padding: 0 4px;">{{ selectedRowKeys.length }}</a>
        <span>项</span>
        <template v-if="selectedRowKeys.length>0">
          <a-divider type="vertical"/>
          <a @click="onClearSelected">清空</a>
        </template>
      </template>
    </a-alert>

    <a-table
      ref="table"
      :columns="columns"
      :dataSource="dataSource"
      :loading="loading"
      :pagination="ipagination"
      :rowSelection="{selectedRowKeys: selectedRowKeys, onChange: onSelectChange}"
      bordered
      rowKey="id"
      size="middle"
      @change="handleTableChange">

      <template slot="action" slot-scope="text, record">
        <a @click="handleEdit(record)">编辑</a>
        <a-divider type="vertical"/>
        <a @click="handleTest(record)">功能测试</a>
        <a-divider type="vertical"/>
        <a-dropdown>
          <a class="ant-dropdown-link">
            <span>更多</span>
            <a-icon type="down"/>
          </a>
          <a-menu slot="overlay">
            <a-menu-item>
              <a-popconfirm title="确定删除吗？" @confirm="handleDelete(record.id)">删除</a-popconfirm>
            </a-menu-item>
          </a-menu>
        </a-dropdown>
      </template>

    </a-table>
    <!-- table区域-end -->

    <!-- 表单区域 -->
    <sys-check-rule-modal ref="modalForm" @ok="modalFormOk"/>

    <sys-check-rule-test-modal ref="testModal"/>

  </a-card>
</template>

<script>
  import JEllipsis from '@/components/jeecg/JEllipsis'
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'
  import SysCheckRuleModal from './modules/SysCheckRuleModal'
  import SysCheckRuleTestModal from './modules/SysCheckRuleTestModal'

  export default {
    name: 'SysCheckRuleList',
    mixins: [JeecgListMixin],
    components: { SysCheckRuleModal, SysCheckRuleTestModal, JEllipsis },
    data() {
      return {
        description: '编码校验规则管理页面',
        // 表头
        columns: [
          {
            title: '#',
            key: 'rowIndex',
            width: 60,
            align: 'center',
            customRender: (t, r, i) => i + 1
          },
          {
            title: '规则名称',
            align: 'center',
            dataIndex: 'ruleName'
          },
          {
            title: '规则Code',
            align: 'center',
            dataIndex: 'ruleCode'
          },
          {
            title: '规则描述',
            align: 'center',
            dataIndex: 'ruleDescription',
            customRender: (t) => (<j-ellipsis value={t} length={48}/>)
          },
          {
            title: '操作',
            dataIndex: 'action',
            align: 'center',
            scopedSlots: { customRender: 'action' },
          }
        ],
        url: {
          list: '/sys/checkRule/list',
          delete: '/sys/checkRule/delete',
          deleteBatch: '/sys/checkRule/deleteBatch',
          exportXlsUrl: 'sys/checkRule/exportXls',
          importExcelUrl: 'sys/checkRule/importExcel',
        },
      }
    },
    computed: {
      importExcelUrl: function () {
        return `${window._CONFIG['domianURL']}/${this.url.importExcelUrl}`
      }
    },
    methods: {
      handleTest(record) {
        this.$refs.testModal.open(record.ruleCode)
      }
    }
  }
</script>
<style scoped>
  @import '~@assets/less/common.less';
</style>
