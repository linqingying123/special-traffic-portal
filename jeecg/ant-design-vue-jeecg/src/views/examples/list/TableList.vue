<template>
  <a-card :bordered="false">
    <div class="table-page-search-wrapper">
      <a-form layout="inline">
        <a-row :gutter="48">
          <a-col :md="8" :sm="24">
            <a-form-item label="规则编号">
              <a-input v-model="queryParam.id" placeholder=""/>
            </a-form-item>
          </a-col>
          <a-col :md="8" :sm="24">
            <a-form-item label="使用状态">
              <a-select v-model="queryParam.status" default-value="0" placeholder="请选择">
                <a-select-option value="0">全部</a-select-option>
                <a-select-option value="1">关闭</a-select-option>
                <a-select-option value="2">运行中</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <template v-if="advanced">
            <a-col :md="8" :sm="24">
              <a-form-item label="调用次数">
                <a-input-number v-model="queryParam.callNo" style="width: 100%"/>
              </a-form-item>
            </a-col>
            <a-col :md="8" :sm="24">
              <a-form-item label="更新日期">
                <a-date-picker v-model="queryParam.date" placeholder="请输入更新日期" style="width: 100%"/>
              </a-form-item>
            </a-col>
            <a-col :md="8" :sm="24">
              <a-form-item label="使用状态">
                <a-select v-model="queryParam.useStatus" default-value="0" placeholder="请选择">
                  <a-select-option value="0">全部</a-select-option>
                  <a-select-option value="1">关闭</a-select-option>
                  <a-select-option value="2">运行中</a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
            <a-col :md="8" :sm="24">
              <a-form-item label="使用状态">
                <a-select default-value="0" placeholder="请选择">
                  <a-select-option value="0">全部</a-select-option>
                  <a-select-option value="1">关闭</a-select-option>
                  <a-select-option value="2">运行中</a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
          </template>
          <a-col :md="!advanced && 8 || 24" :sm="24">
            <span :style="advanced && { float: 'right', overflow: 'hidden' } || {} " class="table-page-search-submitButtons">
              <a-button type="primary">查询</a-button>
              <a-button style="margin-left: 8px" @click="resetSearchForm">重置</a-button>
              <a style="margin-left: 8px" @click="toggleAdvanced">
                {{ advanced ? '收起' : '展开' }}
                <a-icon :type="advanced ? 'up' : 'down'"/>
              </a>
            </span>
          </a-col>
        </a-row>
      </a-form>
    </div>

    <div class="table-operator">
      <a-button icon="plus" type="primary" @click="() => this.handleModalVisible(true)">新建</a-button>
      <a-dropdown v-if="selectedRowKeys.length > 0">
        <a-menu slot="overlay">
          <a-menu-item key="1"><a-icon type="delete" />删除</a-menu-item>
          <!-- lock | unlock -->
          <a-menu-item key="2"><a-icon type="lock" />锁定</a-menu-item>
        </a-menu>
        <a-button style="margin-left: 8px">
          批量操作 <a-icon type="down" />
        </a-button>
      </a-dropdown>
    </div>

    <s-table
      ref="table"
      :columns="columns"
      :data="loadData"
      :showAlertInfo="true"
      size="default"
      @onSelect="onChange"
    >
      <span slot="action" slot-scope="text, record">
        <a @click="handleEdit(record)">编辑</a>
        <a-divider type="vertical" />
        <a-dropdown>
          <a class="ant-dropdown-link">
            更多 <a-icon type="down" />
          </a>
          <a-menu slot="overlay">
            <a-menu-item>
              <a href="javascript:;">详情</a>
            </a-menu-item>
            <a-menu-item>
              <a href="javascript:;">禁用</a>
            </a-menu-item>
            <a-menu-item>
              <a href="javascript:;">删除</a>
            </a-menu-item>
          </a-menu>
        </a-dropdown>
      </span>
    </s-table>

    <a-modal
      v-model="visible"
      :width="800"
      title="操作"
      @ok="handleOk"
    >
      <a-form :autoFormCreate="(form)=>{this.form = form}">

        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          hasFeedback
          label="规则编号"
          validateStatus="success"
        >
          <a-input id="no" v-model="mdl.no" placeholder="规则编号" />
        </a-form-item>

        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          hasFeedback
          label="服务调用次数"
          validateStatus="success"
        >
          <a-input-number id="callNo" v-model="mdl.callNo" :min="1" style="width: 100%" />
        </a-form-item>

        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          hasFeedback
          label="状态"
          validateStatus="warning"
        >
          <a-select v-model="mdl.status" defaultValue="1">
            <a-select-option value="1">Option 1</a-select-option>
            <a-select-option value="2">Option 2</a-select-option>
            <a-select-option value="3">Option 3</a-select-option>
          </a-select>
        </a-form-item>

        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          hasFeedback
          help="请填写一段描述"
          label="描述"
        >
          <a-textarea id="description" v-model="mdl.description" :rows="5" placeholder="..."/>
        </a-form-item>

        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          hasFeedback
          label="更新时间"
          validateStatus="error"
        >
          <a-date-picker
            format="YYYY-MM-DD HH:mm:ss"
            placeholder="Select Time"
            showTime
            style="width: 100%"
          />
        </a-form-item>

      </a-form>
    </a-modal>

    <a-modal :visible="visibleCreateModal" destroyOnClose title="新建规则" @cancel="handleCreateModalCancel" @ok="handleCreateModalOk">
      <!---->
      <a-form :autoFormCreate="(form)=>{this.createForm = form}" style="margin-top: 8px">
        <a-form-item :fieldDecoratorOptions="{rules: [{ required: true, message: '请输入至少五个字符的规则描述！', min: 5 }]}" :labelCol="{ span: 5 }" :wrapperCol="{ span: 15 }" fieldDecoratorId="description" label="描述">
          <a-input placeholder="请输入" />
        </a-form-item>
      </a-form>
    </a-modal>

  </a-card>
</template>

<script>
  import STable from '@/components/table/'
  import ATextarea from "ant-design-vue/es/input/TextArea"
  import AInput from "ant-design-vue/es/input/Input"
  import moment from "moment"
  import axios from 'axios';
  import { getRoleList, getServiceList } from '@/api/manage'

  export default {
    name: "TableList",
    components: {
      AInput,
      ATextarea,
      STable
    },
    data () {
      return {
        visibleCreateModal:false,
        visible: false,
        labelCol: {
          xs: { span: 24 },
          sm: { span: 5 },
        },
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 12 },
        },
        form: null,
        mdl: {},

        // 高级搜索 展开/关闭
        advanced: true,
        // 查询参数
        queryParam: {},
        // 表头
        columns: [
          {
            title: '规则编号',
            dataIndex: 'no'
          },
          {
            title: '描述',
            dataIndex: 'description'
          },
          {
            title: '服务调用次数',
            dataIndex: 'callNo',
            sorter: true,
            needTotal: true,
            customRender: (text) => text + ' 次'
          },
          {
            title: '状态',
            dataIndex: 'status',
            needTotal: true
          },
          {
            title: '更新时间',
            dataIndex: 'updatedAt',
            sorter: true
          },
          {
            table: '操作',
            dataIndex: 'action',
            width: '150px',
            scopedSlots: { customRender: 'action' },
          }
        ],
        // 加载数据方法 必须为 Promise 对象
        loadData: parameter => {
          return getServiceList(Object.assign(parameter, this.queryParam))
            .then(res => {
              return res.result
            })
        },

        selectedRowKeys: [],
        selectedRows: []
      }
    },
    created () {
      getRoleList({ t: new Date()})
    },
    methods: {
      handleEdit (record) {
        this.mdl = Object.assign({}, record)
        console.log(this.mdl)
        this.visible = true
      },
      handleOk () {

      },

      //添加逻辑
      handleModalVisible(isVisible) {
        this.visibleCreateModal = isVisible;
      },
      handleCreateModalOk() {
        this.createForm.validateFields((err, fieldsValue) => {
          if (err) {
            return;
          }
          const description = this.createForm.getFieldValue('description');
          axios.post('/saveRule', {
            desc: description,
          }).then((res) => {
            this.createForm.resetFields();
            this.visibleCreateModal = false;
            this.loadRuleData();
          });
        });
      },
      handleCreateModalCancel() {
        this.visibleCreateModal = false;
      },

      onChange (row) {
        this.selectedRowKeys = row.selectedRowKeys
        this.selectedRows = row.selectedRows

        console.log(this.$refs.table)
      },
      toggleAdvanced () {
        this.advanced = !this.advanced
      },

      resetSearchForm () {
        this.queryParam = {
          date: moment(new Date())
        }
      }
    },
    watch: {
      /*
      'selectedRows': function (selectedRows) {
        this.needTotalList = this.needTotalList.map(item => {
          return {
            ...item,
            total: selectedRows.reduce( (sum, val) => {
              return sum + val[item.dataIndex]
            }, 0)
          }
        })
      }
      */
    }
  }
</script>
