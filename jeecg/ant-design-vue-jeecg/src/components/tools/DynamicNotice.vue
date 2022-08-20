<template>
  <component
    :is="comp"
    v-if="comp"
    ref="compModel"
    :formData="formData">
  </component>
</template>
<script>
  export default {
    name: 'DynamicNotice',
    data () {
      return {
        compName: this.path
      }
    },
    computed: {
      comp: function () {
        if(!this.path){
          return null;
        }
        return () => import(`@/views/${this.path}.vue`)
      }
    },
    props: ['path','formData'],
    methods: {
      detail () {
        setTimeout(() => {
          if(this.path){
            this.$refs.compModel.view(this.formData);
          }
        }, 200)
      },
    }
  }
</script>
