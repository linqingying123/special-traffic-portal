<template>
  <a-card :bordered="false">

    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form-model :model="queryParam" layout="inline" @keyup.enter.native="searchQuery">
        <a-row :gutter="24">
          <a-col :md="6" :sm="8">
            <a-form-model-item label="规则名称" prop="ruleName">
              <a-input v-model="queryParam.ruleName" placeholder="请输入规则名称"></a-input>
            </a-form-model-item>
          </a-col>
          <a-col :md="6" :sm="8">
            <a-form-model-item label="规则Code" prop="ruleCode">
              <a-input v-model="queryParam.ruleCode" placeholder="请输入规则Code"></a-input>
            </a-form-model-item>
          </a-col>
          <a-col :md="6" :sm="8">
            <span class="table-page-search-submitButtons" style="float: left;overflow: hidden;">
              <a-button icon="search" type="primary" @click="searchQuery">查询</a-button>
              <a-button icon="reload" style="margin-left: 8px" type="primary" @click="searchReset">重置</a-button>
            </span>
          </a-col>
        </a-row>
      </a-form-model>
    </div>

    <!-- 操作按钮区域 -->
    <div class="table-operator">
      <a-button icon="plus" type="primary" @click="handleAdd">新增</a-button>
      <a-button icon="download" type="primary" @click="handleExportXls('填值规则')">导出</a-button>
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
        <template slot="ruleClassText" slot-scope="text">
          <j-ellipsis :length="30" :value="text"></j-ellipsis>
        </template>
        <template slot="ruleParamsText" slot-scope="text,record">
          <j-ellipsis :length="30" :value="text"></j-ellipsis>
        </template>
        <span slot="action" slot-scope="text, record">
          <a @click="handleEdit(record)">编辑</a>
          <a-divider type="vertical"/>
          <a-dropdown>
            <a class="ant-dropdown-link">更多 <a-icon type="down"/></a>
            <a-menu slot="overlay">
              <a-menu-item @click="handleTest(record)">
                功能测试
              </a-menu-item>
              <a-menu-item>
                <a-popconfirm title="确定删除吗?" @confirm="() => handleDelete(record.id)">
                  <a>删除</a>
                </a-popconfirm>
              </a-menu-item>
            </a-menu>
          </a-dropdown>
        </span>

    </a-table>
    <!-- table区域-end -->

    <!-- 表单区域 -->
    <sys-fill-rule-modal ref="modalForm" @ok="modalFormOk"/>
  </a-card>
</template>

<script>
  import { getAction } from '@/api/manage'
  import SysFillRuleModal from './modules/SysFillRuleModal'
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'

  export default {
    name: 'SysFillRuleList',
    mixins: [JeecgListMixin],
    components: { SysFillRuleModal },
    data() {
      return {
        description: '填值规则管理页面',
        // 表头
        columns: [
          {
            title: '#',
            dataIndex: '',
            key: 'rowIndex',
            width: 60,
            align: 'center',
            customRender: (t, r, index) => 1 + index
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
            title: '规则实现类',
            align: 'center',
            dataIndex: 'ruleClass',
            scopedSlots: {customRender: "ruleClassText"}
          },
          {
            title: '规则参数',
            align: 'center',
            dataIndex: 'ruleParams',
            scopedSlots: {customRender: "ruleParamsText"}
          },
          {
            title: '操作',
            dataIndex: 'action',
            align: 'center',
            scopedSlots: { customRender: 'action' },
          }
        ],
        url: {
          list: '/sys/fillRule/list',
          test: '/sys/fillRule/testFillRule',
          delete: '/sys/fillRule/delete',
          deleteBatch: '/sys/fillRule/deleteBatch',
          exportXlsUrl: '/sys/fillRule/exportXls',
          importExcelUrl: '/sys/fillRule/importExcel',
        },
      }
    },
    computed: {
      importExcelUrl() {
        return `${window._CONFIG['domianURL']}${this.url.importExcelUrl}`
      }
    },
    methods: {
      handleTest(record) {
        let closeLoading = this.$message.loading('生成中...', 0)

        getAction(this.url.test, {
          ruleCode: record.ruleCode
        }).then(res => {
          if (res.success) {
            this.$info({
              title: '填值规则功能测试',
              content: '生成结果：' + res.result
            })
          } else {
            this.$message.warn(res.message)
          }
        }).finally(() => {
          closeLoading()
        })
      }
    }
  }
</script>
<style scoped>
  @import '~@assets/less/common.less'
</style>
