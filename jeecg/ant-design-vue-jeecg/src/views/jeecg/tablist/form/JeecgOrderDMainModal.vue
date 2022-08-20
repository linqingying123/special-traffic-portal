<template>
  <a-modal
    :confirmLoading="confirmLoading"
    :title="title"
    :visible="visible"
    :width="1000"
    @cancel="handleCancel"
    @ok="handleOk">

    <a-spin :spinning="confirmLoading">
      <a-form-model ref="form" :model="orderMainModel" :rules="validatorRules">
        <!-- 主表单区域 -->
        <a-form-model-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          hasFeedback
          label="订单号"
          prop="orderCode"
          required>
          <a-input v-model="orderMainModel.orderCode" placeholder="请输入订单号"  />
        </a-form-model-item>
        <a-form-model-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="订单类型">
          <a-select v-model="orderMainModel.ctype" placeholder="请输入订单类型">
            <a-select-option value="1">国内订单</a-select-option>
            <a-select-option value="2">国际订单</a-select-option>
          </a-select>
        </a-form-model-item>
        <a-form-model-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="订单日期">
          <a-date-picker v-model="orderMainModel.orderDate" showTime valueFormat='YYYY-MM-DD HH:mm:ss'/>
        </a-form-model-item>
        <a-form-model-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="订单金额">
          <a-input-number v-model="orderMainModel.orderMoney" style="width: 200px" />
        </a-form-model-item>
        <a-form-model-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="订单备注">
          <a-input v-model="orderMainModel.content" placeholder="请输入订单备注"/>
        </a-form-model-item>
      </a-form-model>
    </a-spin>
  </a-modal>
</template>

<script>
  import {httpAction} from '@/api/manage'
  import JDate from '@/components/jeecg/JDate'
  import pick from 'lodash.pick'
  import moment from "moment"

  export default {
    name: "JeecgOrderDMainModal",
    components: {
      JDate
    },
    data() {
      return {
        title: "操作",
        visible: false,
        orderMainModel: {
          jeecgOrderCustomerList: [{}],
          jeecgOrderTicketList: [{}]
        },
        labelCol: {
          xs: {span: 24},
          sm: {span: 5},
        },
        wrapperCol: {
          xs: {span: 24},
          sm: {span: 16},
        },
        confirmLoading: false,
        validatorRules: {
          orderCode: [
            { required: true, message: '请输入订单号!' }
          ]
        },
        url: {
          add: "/test/order/add",
          edit: "/test/order/edit",
          orderCustomerList: "/test/order/listOrderCustomerByMainId",
          orderTicketList: "/test/order/listOrderTicketByMainId",
        },
      }
    },
    methods: {
      add() {
        this.edit({});
      },
      edit(record) {
        this.orderMainModel = Object.assign({}, record);
        console.log(this.orderMainModel)
        //初始化明细表数据
        this.visible = true;
      },
      close() {
        this.$emit('close');
        this.visible = false;
        this.$refs.form.resetFields();
      },
      handleOk() {
        const that = this;
        // 触发表单验证
        this.$refs.form.validate(valid => {
          if (valid) {
            that.confirmLoading = true;
            let httpurl = '';
            let method = '';
            if (!this.orderMainModel.id) {
              httpurl += this.url.add;
              method = 'post';
            } else {
              httpurl += this.url.edit;
              method = 'put';
            }

            httpAction(httpurl, this.orderMainModel, method).then((res) => {
              if (res.success) {
                that.$message.success(res.message);
                that.$emit('ok');
              } else {
                that.$message.warning(res.message);
              }
            }).finally(() => {
              that.confirmLoading = false;
              that.close();
            })
          }else{
            return false;
          }
        })
      },
      handleCancel() {
        this.close()
      }
    }
  }
</script>

<style scoped>
  .ant-btn {
    padding: 0 10px;
    margin-left: 3px;
  }

  .ant-form-item-control {
    line-height: 0px;
  }

  /** 主表单行间距 */
  .ant-form .ant-form-item {
    margin-bottom: 10px;
  }

  /** Tab页面行间距 */
  .ant-tabs-content .ant-form-item {
    margin-bottom: 0px;
  }
</style>
