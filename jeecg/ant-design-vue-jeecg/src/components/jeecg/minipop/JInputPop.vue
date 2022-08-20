<template>
  <a-popover v-model="visible" :placement="position" overlayClassName="j-input-pop" trigger="contextmenu">
    <!--"(node) => node.parentNode.parentNode"-->
    <div slot="title">
      <span>{{ title }}</span>
      <span style="float: right" title="关闭">
        <a-icon type="close" @click="visible=false"/>
      </span>
    </div>
    <a-input :disabled="disabled" :placeholder="placeholder" :value="inputContent" @change="handleInputChange">
      <a-icon slot="suffix" type="fullscreen" @click.stop="pop" />
    </a-input>
    <div slot="content">
      <a-textarea ref="textarea" :disabled="disabled" :style="{ height: height + 'px', width: width + 'px' }" :value="inputContent" @input="handleInputChange"/>
    </div>
  </a-popover>
</template>

<script>
  export default {
    name: 'JInputPop',
    props:{
      title:{
        type:String,
        default:'',
        required:false
      },
      position:{
        type:String,
        default:'right',
        required:false
      },
      height:{
        type:Number,
        default:200,
        required:false
      },
      width:{
        type:Number,
        default:150,
        required:false
      },
      value:{
        type:String,
        required:false
      },
      popContainer:{
        type:String,
        default:'',
        required:false
      },
      disabled: {
        type: Boolean,
        default: false,
      },
      placeholder:{
        type:String,
        required:false
      }

    },
    data(){
      return {
        visible:false,
        inputContent:''

      }
    },

    watch:{
      value:{
        immediate:true,
        handler:function(){
          if(this.value && this.value.length>0){
            this.inputContent = this.value;
          }
        }
      },
    },
    model: {
      prop: 'value',
      event: 'change'
    },
    methods:{
      handleInputChange(event){
        this.inputContent = event.target.value
        this.$emit('change',this.inputContent)
      },
      pop(){
        // disabled 不弹窗
        if (this.disabled) {
          return
        }
        this.visible=true
        this.$nextTick(() => {
          this.$refs.textarea.focus()
        })
      },
      getPopupContainer(node){
        if(!this.popContainer){
          return node.parentNode
        }else{
          return document.getElementById(this.popContainer)
        }

      }
    }
  }
</script>

<style scoped>

</style>
