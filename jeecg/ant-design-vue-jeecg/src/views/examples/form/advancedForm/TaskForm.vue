<template>
  <a-form :form="form" class="form" @submit="handleSubmit">
    <a-row :gutter="16" class="form-row">
      <a-col :lg="6" :md="12" :sm="24">
        <a-form-item
          label="任务名">
          <a-input v-decorator="[ 'task.name', {rules: [{ required: true, message: '请输入任务名称', whitespace: true}]} ]" placeholder="请输入任务名称" />
        </a-form-item>
      </a-col>
      <a-col :lg="{span: 8}" :md="{span: 12}" :sm="24" :xl="{span: 7, offset: 1}">
        <a-form-item
          label="任务描述">
          <a-input v-decorator="[ 'task.description', {rules: [{ required: true, message: '请输入任务描述', whitespace: true}]} ]" placeholder="请输入任务描述" />
        </a-form-item>
      </a-col>
      <a-col :lg="{span: 10}" :md="{span: 24}" :sm="24" :xl="{span: 9, offset: 1}">
        <a-form-item
          label="执行人">
          <a-select
            v-decorator="[
              'task.executor',
              {rules: [{ required: true, message: '请选择执行人'}]}
            ]"
            placeholder="请选择执行人" >
            <a-select-option value="黄丽丽">黄丽丽</a-select-option>
            <a-select-option value="李大刀">李大刀</a-select-option>
          </a-select>
        </a-form-item>
      </a-col>
    </a-row>
    <a-row :gutter="16" class="form-row">
      <a-col :lg="6" :md="12" :sm="24">
        <a-form-item
          label="责任人">
          <a-select
            v-decorator="[
              'task.manager',
              {rules: [{ required: true, message: '请选择责任人'}]}
            ]"
            placeholder="请选择责任人" >
            <a-select-option value="王伟">王伟</a-select-option>
            <a-select-option value="李红军">李红军</a-select-option>
          </a-select>
        </a-form-item>
      </a-col>
      <a-col :lg="{span: 8}" :md="{span: 12}" :sm="24" :xl="{span: 7, offset: 1}">
        <a-form-item
          label="提醒时间">
          <a-time-picker
            v-decorator="[
              'task.time',
              {rules: [{ required: true, message: '请选择提醒时间'}]}
            ]"
            style="width: 100%" />
        </a-form-item>
      </a-col>
      <a-col :lg="{span: 10}" :md="{span: 24}" :sm="24" :xl="{span: 9, offset: 1}">
        <a-form-item
          label="任务类型">
          <a-select
            v-decorator="[ 'task.type', {rules: [{ required: true, message: '请选择任务类型'}]} ]"
            placeholder="请选择任务类型" >
            <a-select-option value="定时执行">定时执行</a-select-option>
            <a-select-option value="周期执行">周期执行</a-select-option>
          </a-select>
        </a-form-item>
      </a-col>
    </a-row>
    <a-form-item v-if="showSubmit">
      <a-button htmlType="submit" >Submit</a-button>
    </a-form-item>
  </a-form>
</template>

<script>
  export default {
    name: "TaskForm",
    props: {
      showSubmit: {
        type: Boolean,
        default: false
      }
    },
    data () {
      return {
        form: this.$form.createForm(this)
      }
    },
    methods: {
      handleSubmit (e) {
        e.preventDefault()
        this.form.validateFields((err, values) => {
          if (!err) {
            this.$notification['error']({
              message: 'Received values of form:',
              description: values
            })
          }
        })
      }
    }
  }
</script>

<style scoped>

</style>
