<template>
  <!-- 两步验证 -->
  <a-modal
    v-model="visible"
    :maskClosable="false"
    centered
    @cancel="handleCancel"
  >
    <div slot="title" :style="{ textAlign: 'center' }">两步验证</div>
    <template slot="footer">
      <div :style="{ textAlign: 'center' }">
        <a-button key="back" @click="handleCancel">返回</a-button>
        <a-button key="submit" :loading="stepLoading" type="primary" @click="handleStepOk">
          继续
        </a-button>
      </div>
    </template>

    <a-spin :spinning="stepLoading">
      <a-form :auto-form-create="(form)=>{this.form = form}" layout="vertical">
        <div class="step-form-wrapper">
          <p v-if="!stepLoading" style="text-align: center">请在手机中打开 Google Authenticator 或两步验证 APP<br />输入 6 位动态码</p>
          <p v-else style="text-align: center">正在验证..<br/>请稍后</p>
          <a-form-item
            :fieldDecoratorOptions="{rules: [{ required: true, message: '请输入 6 位动态码!', pattern: /^\d{6}$/, len: 6 }]}"
            :style="{ textAlign: 'center' }"
            fieldDecoratorId="stepCode"
            hasFeedback
          >
            <a-input :style="{ textAlign: 'center' }" placeholder="000000" @keyup.enter.native="handleStepOk" />
          </a-form-item>
          <p style="text-align: center">
            <a @click="onForgeStepCode">遗失手机?</a>
          </p>
        </div>
      </a-form>
    </a-spin>
  </a-modal>
</template>

<script>
export default {
  props: {
    visible: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      stepLoading: false,

      form: null
    };
  },
  methods: {
    handleStepOk() {
      const vm = this
      this.stepLoading = true
      this.form.validateFields((err, values) => {
        if (!err) {
          console.log('values', values)
          setTimeout( () => {
            vm.stepLoading = false
            vm.$emit('success', { values })
          }, 2000)
          return;
        }
        this.stepLoading = false
        this.$emit('error', { err })
      })
    },
    handleCancel () {
      this.visible = false
      this.$emit('cancel')
    },
    onForgeStepCode() {

    }
  }
};
</script>
<style lang="less" scoped>
  .step-form-wrapper {
    margin: 0 auto;
    width: 80%;
    max-width: 400px;
  }
</style>
