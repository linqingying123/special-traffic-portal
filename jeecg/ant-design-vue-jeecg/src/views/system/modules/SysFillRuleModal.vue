<template>
  <a-modal
    :confirmLoading="confirmLoading"
    :maskClosable="false"
    :title="title"
    :visible="visible"
    :width="800"
    cancelText="关闭"
    @cancel="handleCancel"
    @ok="handleOk">

    <a-spin :spinning="confirmLoading">
      <a-form-model ref="form" :model="model" :rules="validatorRules">

        <a-form-model-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="规则名称" prop="ruleName">
          <a-input v-model="model.ruleName" placeholder="请输入规则名称"/>
        </a-form-model-item>
        <a-form-model-item :labelCol="labelCol"  :wrapperCol="wrapperCol" label="规则Code"  prop="ruleCode" >
          <a-input v-model="model.ruleCode" :disabled="disabledCode" placeholder="请输入规则Code"/>
        </a-form-model-item>
        <a-form-model-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="规则实现类" prop="ruleClass" >
          <a-input v-model="model.ruleClass" placeholder="请输入规则实现类"/>
        </a-form-model-item>
        <a-form-model-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="规则参数" prop="ruleParams">
          <a-textarea v-model="model.ruleParams" :rows="5" placeholder="请输入规则参数"/>
        </a-form-model-item>

      </a-form-model>
    </a-spin>
  </a-modal>
</template>

<script>
  import { httpAction } from '@/api/manage'
  import { validateDuplicateValue } from '@/utils/util'

  export default {
    name: 'SysFillRuleModal',
    components: {},
    data() {
      return {
        title: '操作',
        visible: false,
        model: {},
        labelCol: { xs: { span: 24 }, sm: { span: 5 } },
        wrapperCol: { xs: { span: 24 }, sm: { span: 16 } },

        confirmLoading: false,
        validatorRules: {
          ruleName: [{ required: true, message: '规则名称不能为空' }],
          ruleCode: [
            { required: true, message: '规则Code不能为空' },
            { validator: (rule, value, callback) => validateDuplicateValue('sys_fill_rule', 'rule_code', value, this.model.id, callback) }
          ],
          ruleClass: [{ required: true, message: '规则实现类不能为空' }],
          ruleParams: [{
            validator: (rule, value, callback) => {

              try {
                let json = JSON.parse(value)
                if (json instanceof Array) {
                  callback('只能传递JSON对象，不能传递JSON数组')
                } else if (json instanceof Object) {
                  callback()
                } else {
                  callback('请输入JSON字符串')
                }
              } catch {
                callback('请输入JSON字符串')
              }
            }
          }],
        },
        url: {
          add: '/sys/fillRule/add',
          edit: '/sys/fillRule/edit',
        },
      }
    },
    computed: {
      disabledCode() {
        return !!this.model.id
      }
    },
    created() {
    },
    methods: {
      add() {
        this.edit({})
      },
      edit(record) {
        this.visible = true
        this.$nextTick(() => {
          this.$refs.form.resetFields()
          this.model = Object.assign({}, record)
        })
      },
      close() {
        this.$emit('close')
        this.visible = false
      },
      handleOk() {
        const that = this
        // 触发表单验证
        this.$refs.form.validate((ok, err) => {
          if (ok) {
            that.confirmLoading = true
            let httpUrl = this.url.add, method = 'post'
            if (this.model.id) {
              httpUrl = this.url.edit
              method = 'put'
            }

            httpAction(httpUrl, this.model, method).then((res) => {
              if (res.success) {
                that.$message.success(res.message)
                that.$emit('ok')
                that.close()
              } else {
                that.$message.warning(res.message)
              }
            }).finally(() => {
              that.confirmLoading = false
            })
          }
        })
      },
      handleCancel() {
        this.close()
      }

    }
  }
</script>

<style lang="less" scoped>

</style>
