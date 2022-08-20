<template>
  <a-modal
    :confirmLoading="confirmLoading"
    :title="title"
    :visible="visible"
    :width="1200"
    @cancel="handleCancel"
    @ok="handleOk">

    <a-spin :spinning="confirmLoading">
      <a-form-model ref="form" :label-col="labelCol" :model="orderMainModel"  :rules="validatorRules" :wrapper-col="wrapperCol">
        <!-- 主表单区域 -->
        <a-row :gutter="16" class="form-row">
          <a-col :lg="8">
            <a-form-model-item label="订单号" prop="orderCode" required>
              <a-input v-model="orderMainModel.orderCode"  placeholder="请输入订单号"/>
            </a-form-model-item>
          </a-col>
          <a-col :lg="8">
            <a-form-model-item label="订单类型" prop="ctype">
              <a-select v-model="orderMainModel.ctype" placeholder="请选择订单类型" >
                <a-select-option value="1">国内订单</a-select-option>
                <a-select-option value="2">国际订单</a-select-option>
              </a-select>
            </a-form-model-item>
          </a-col>
          <a-col :lg="8">
            <a-form-model-item label="订单日期" prop="orderDate">
              <a-date-picker v-model="orderMainModel.orderDate" showTime valueFormat="YYYY-MM-DD HH:mm:ss"/>
            </a-form-model-item>
          </a-col>
        </a-row>
        <a-row :gutter="16" class="form-row">
          <a-col :lg="8">
            <a-form-model-item label="订单金额" prop="orderMoney">
              <a-input-number v-model="orderMainModel.orderMoney" style="width: 200px"/>
            </a-form-model-item>
          </a-col>
          <a-col :lg="8">
            <a-form-model-item label="订单备注" prop="content">
              <a-input v-model="orderMainModel.content" placeholder="请输入订单备注"  />
            </a-form-model-item>
          </a-col>
        </a-row>

        <!-- 子表单区域 -->
        <a-tabs defaultActiveKey="1" >
          <a-tab-pane key="1" tab="客户信息">
            <div>
              <a-row :gutter="16" style="margin-bottom:10px" type="flex">
                <a-col :span="5">客户名</a-col>
                <a-col :span="5">性别</a-col>
                <a-col :span="6">身份证号码</a-col>
                <a-col :span="6">手机号</a-col>
                <a-col :span="2">操作</a-col>
              </a-row>

              <a-row v-for="(item, index) in orderMainModel.jeecgOrderCustomerList" :key="index" :gutter="16" style="margin-bottom:10px" type="flex">
                <a-col :span="6" style="display: none">
                  <a-form-model-item>
                    <a-input v-model="item.id" placeholder="id" />
                  </a-form-model-item>
                </a-col>
                <a-col :span="5">
                  <a-form-model-item>
                    <a-input v-model="item.name" placeholder="客户名" />
                  </a-form-model-item>
                </a-col>
                <a-col :span="5">
                  <a-form-model-item>
                    <a-select v-model="item.sex" placeholder="性别" >
                      <a-select-option value="1">男</a-select-option>
                      <a-select-option value="2">女</a-select-option>
                    </a-select>
                  </a-form-model-item>
                </a-col>
                <a-col :span="6">
                  <a-form-model-item :prop="'jeecgOrderCustomerList.' + index + '.idcard'" :rules="[{required: true,message: '请输入身份证号',trigger: 'blur'},{ pattern: rules.IDCard, message: '身份证号格式不对!' }]">
                    <a-input v-model="item.idcard" placeholder="身份证号" />
                  </a-form-model-item>
                </a-col>
                <a-col :span="6">
                  <a-form-model-item  :prop="'jeecgOrderCustomerList.' + index + '.telphone'" :rules="rules.mobile">
                    <a-input v-model="item.telphone" placeholder="手机号"/>
                  </a-form-model-item>
                </a-col>
                <a-col :span="2">
                  <a-form-model-item>
                    <a-icon  style="fontSize :20px" type="minus-circle"  @click="delRowCustom(index)"/>
                  </a-form-model-item>
                </a-col>
              </a-row>
              <a-button style="width: 98%;margin-top: 10px" type="dashed" @click="addRowCustom">
                <a-icon type="plus" /> 添加客户信息
              </a-button>
            </div>
          </a-tab-pane>

          <a-tab-pane key="2" forceRender tab="机票信息">
            <div>
              <a-row :gutter="16" style="margin-bottom:10px" type="flex">
                <a-col :span="6">航班号</a-col>
                <a-col :span="6">航班时间</a-col>
                <a-col :span="6">操作</a-col>
              </a-row>
              <a-row v-for="(item, index) in orderMainModel.jeecgOrderTicketList" :key="index" :gutter="16" style="margin-bottom:10px" type="flex">
                <a-col :span="6" style="display: none">
                  <a-form-model-item>
                    <a-input v-model="item.id" placeholder="id" />
                  </a-form-model-item>
                </a-col>
                <a-col :span="6">
                  <a-form-model-item  :prop="'jeecgOrderTicketList.' + index + '.ticketCode'" :rules="{required: true,message: '请输入航班号',trigger: 'blur'}">
                    <a-input v-model="item.ticketCode" placeholder="航班号"/>
                  </a-form-model-item>
                </a-col>
                <a-col :span="6">
                  <a-form-model-item>
                    <a-date-picker v-model="item.tickectDate" placeholder="航班时间"  valueFormat="YYYY-MM-DD" />
                  </a-form-model-item>
                </a-col>
                <a-col :span="6">
                  <a-form-model-item>
                    <a-icon   style="fontSize :20px" type="minus-circle"  @click="delRowTicket(index)"/>
                  </a-form-model-item>
                </a-col>
              </a-row>
              <a-button style="width: 98%;margin-top: 10px" type="dashed" @click="addRowTicket">
                <a-icon type="plus" /> 添加机票信息
              </a-button>
            </div>
          </a-tab-pane>
        </a-tabs>

      </a-form-model>
    </a-spin>
  </a-modal>
</template>

<script>
  import { httpAction,getAction } from '@/api/manage'
  import JDate from '@/components/jeecg/JDate'
  export default {
    name: "JeecgOrderMainModal",
    components: {
      JDate
    },
    data () {
      return {
        title:"操作",
        visible: false,
        orderMainModel: {
          jeecgOrderCustomerList: [{}],
          jeecgOrderTicketList: [{}]
        },
        labelCol: {
          xs: { span: 24 },
          sm: { span: 5 },
        },
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 16 },
        },
        confirmLoading: false,
        validatorRules:{
          orderCode: [
            { required: true,  message: '订单号不能为空', trigger: 'blur' }
          ]
        },
        url: {
          add: "/test/jeecgOrderMain/add",
          edit: "/test/jeecgOrderMain/edit",
          orderCustomerList: "/test/jeecgOrderMain/queryOrderCustomerListByMainId",
          orderTicketList: "/test/jeecgOrderMain/queryOrderTicketListByMainId",
        },
      }
    },
    created () {
    },
    methods: {
      add () {
        this.edit({});
      },
      edit (record) {
        this.orderMainModel = Object.assign({
          jeecgOrderCustomerList: [{}],
          jeecgOrderTicketList: [{}]
        }, record);
        //--------------------------------------------------------
        //初始化明细表数据
        console.log(this.orderMainModel.id)
        if(this.orderMainModel.id){
          let params = {id:this.orderMainModel.id}
          //初始化订单机票列表
          getAction(this.url.orderCustomerList,params).then((res)=>{
            if(res.success){
              this.orderMainModel.jeecgOrderCustomerList = res.result;
              this.$forceUpdate()
            }
          })
          //初始化订单客户列表
          getAction(this.url.orderTicketList,params).then((res)=>{
            if(res.success){
              this.orderMainModel.jeecgOrderTicketList = res.result;
              this.$forceUpdate()
            }
          })
        }
        this.visible = true;
      },
      close () {
        this.$emit('close');
        this.visible = false;
      },
      handleOk () {
        const that = this;
        // 触发表单验证
        this.$refs.form.validate(valid => {
          if (valid) {
            that.confirmLoading = true;
            let httpurl = '';
            let method = '';
            if(!this.orderMainModel.id){
              httpurl+=this.url.add;
              method = 'post';
            }else{
              httpurl+=this.url.edit;
              method = 'put';
            }
            httpAction(httpurl,this.orderMainModel,method).then((res)=>{
              if(res.success){
                that.$message.success(res.message);
                that.$emit('ok');
              }else{
                that.$message.warning(res.message);
              }
            }).finally(() => {
              that.confirmLoading = false;
              that.close();
            })

          }
        })
      },
      handleCancel () {
        this.close()
      },
      addRowCustom () {
        this.orderMainModel.jeecgOrderCustomerList.push({});
        this.$forceUpdate();
      },
      delRowCustom (index) {
        console.log(index)
        this.orderMainModel.jeecgOrderCustomerList.splice(index,1);
        this.$forceUpdate();
      },
      addRowTicket () {
        this.orderMainModel.jeecgOrderTicketList.push({});
        console.log(this.orderMainModel.jeecgOrderTicketList)
        this.$forceUpdate();
      },
      delRowTicket (index) {
        console.log(index)
        this.orderMainModel.jeecgOrderTicketList.splice(index,1);
        this.$forceUpdate();
      },


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
