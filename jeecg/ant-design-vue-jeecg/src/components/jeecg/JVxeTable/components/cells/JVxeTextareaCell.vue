<template>
  <j-input-pop
    :height="210"
    :value="innerValue"
    :width="300"
    style="width: 100%;"
    v-bind="cellProps"
    @change="handleChangeCommon"
  />
</template>

<script>
  import JInputPop from '@/components/jeecg/minipop/JInputPop'
  import JVxeCellMixins, { dispatchEvent } from '@/components/jeecg/JVxeTable/mixins/JVxeCellMixins'

  export default {
    name: 'JVxeTextareaCell',
    mixins: [JVxeCellMixins],
    components: {JInputPop},
    // 【组件增强】注释详见：JVxeCellMixins.js
    enhanced: {
      installOptions: {
        autofocus: '.ant-input',
      },
      aopEvents: {
        editActived(event) {
          dispatchEvent.call(this, event, 'anticon-fullscreen')
        },
      },
    },
  }
</script>

<style scoped>

</style>
