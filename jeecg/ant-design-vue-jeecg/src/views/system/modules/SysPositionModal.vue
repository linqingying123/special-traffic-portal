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

        <a-form-model-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="职务编码"
          prop="code"
          required>
          <a-input v-model="model.code" :read-only="readOnly" placeholder="请输入职务编码"/>
        </a-form-model-item>
        <a-form-model-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="职务名称"
          prop="name"
          required>
          <a-input v-model="model.name" placeholder="请输入职务名称"/>
        </a-form-model-item>
        <a-form-model-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="职级"
          prop="postRank"
          required
        >
          <j-dict-select-tag
            v-model="model.postRank"
            dictCode="position_rank"
            placeholder="请选择职级"
          />
        </a-form-model-item>

      </a-form-model>
    </a-spin>
  </a-modal>
</template>

<script>
  import pick from 'lodash.pick'
  import { httpAction } from '@/api/manage'
  import { duplicateCheck } from '@/api/api'
  import JDictSelectTag from '@/components/dict/JDictSelectTag'

  let validatorCodeTimer = null

  export default {
    name: 'SysPositionModal',
    components: { JDictSelectTag },
    data() {
      return {
        title: '操作',
        visible: false,
        model: {},
        labelCol: {
          xs: { span: 24 },
          sm: { span: 5 },
        },
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 16 },
        },
        confirmLoading: false,
        validatorRules: {
          code: [
              { required: true, message: '请输入职务编码' },
              {
                validator: (rule, value, callback) => {
                  // 函数消抖的简单实现，防止一段时间内发送多次请求
                  if (validatorCodeTimer) {
                    // 停止上次开启的定时器
                    clearTimeout(validatorCodeTimer)
                  }
                  validatorCodeTimer = setTimeout(() => {
                    duplicateCheck({
                      tableName: 'sys_position',
                      fieldName: 'code',
                      fieldVal: value,
                      dataId: this.model.id
                    }).then((res) => {
                      if (res.success) {
                        callback()
                      } else {
                        callback(res.message)
                      }
                    }).catch(console.error)
                  }, 300)
                }
              }
            ],
          name: [{ required: true, message: '请输入职务名称' }] ,
          postRank:  [{ required: true, message: '请选择职级' }] ,
        },
        url: {
          add: '/sys/position/add',
          edit: '/sys/position/edit',
        },
        readOnly:false
      }
    },
    created() {
    },
    methods: {
      add() {
        this.edit({})
      },
      edit(record) {
        this.model = Object.assign({}, record)
        this.visible = true
        if(record.id){
          this.readOnly=true
        }else{
          this.readOnly=false
        }
      },
      close() {
        this.$emit('close')
        this.visible = false
        this.$refs.form.resetFields();
      },
      handleOk() {
        const that = this
        // 触发表单验证
        this.$refs.form.validate(valid => {
          if (valid) {
            that.confirmLoading = true
            let httpurl = ''
            let method = ''
            if (!this.model.id) {
              httpurl += this.url.add
              method = 'post'
            } else {
              httpurl += this.url.edit
              method = 'put'
            }

            httpAction(httpurl, this.model, method).then((res) => {
              if (res.success) {
                that.$message.success(res.message)
                that.$emit('ok')
              } else {
                that.$message.warning(res.message)
              }
            }).finally(() => {
              that.confirmLoading = false
              that.close()
            })
          }else{
            return false;
          }
        })
      },
      handleCancel() {
        this.close()
      },


    }
  }
</script>

<style lang="less" scoped>

</style>
