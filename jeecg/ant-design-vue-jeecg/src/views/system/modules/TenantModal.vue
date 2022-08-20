<template>
  <j-modal
    :okButtonProps="{ class:{'jee-hidden': disableSubmit} }"
    :title="title"
    :visible="visible"
    :width="width"
    cancelText="关闭"
    switchFullscreen
    @cancel="handleCancel"
    @ok="handleOk">
    <tenant-form ref="realForm" :disabled="disableSubmit" normal @ok="submitCallback"></tenant-form>
  </j-modal>
</template>

<script>
  import TenantForm from './TenantForm'
  export default {
    name: "TenantModal",
    components: {
      TenantForm
    },
    data () {
      return {
        title:'',
        width:800,
        visible: false,
        disableSubmit: false
      }
    },
    methods: {
      add () {
        this.visible=true
        this.$nextTick(()=>{
          this.$refs.realForm.show();
        })
      },
      edit (record) {
        this.visible=true
        this.$nextTick(()=>{
          this.$refs.realForm.show(record);
        })
      },
      close () {
        this.$emit('close');
        this.visible = false;
      },
      handleOk () {
        this.$refs.realForm.submitForm();
      },
      submitCallback(){
        this.$emit('ok');
        this.visible = false;
      },
      handleCancel () {
        this.close()
      }
    }
  }
</script>
