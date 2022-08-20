<template>
  <j-modal
    :fullscreen.sync="fullscreen"
    :visible="visible"
    :width="1200"
    switch-fullscreen
    title="详细信息"
    @cancel="close"
    @ok="handleOk"
  >

    <transition name="fade">
      <div v-if="visible">
        <slot :column="column" :row="row" name="mainForm"/>
        <slot :column="column" :row="row" name="subForm"/>
      </div>
    </transition>

  </j-modal>
</template>
<script>

  import { cloneObject } from '@/utils/util'

  export default {
    name: 'JVxeDetailsModal',
    inject: ['superTrigger'],
    data() {
      return {
        visible: false,
        fullscreen: false,
        row: null,
        column: null,
      }
    },
    created() {
    },
    methods: {

      open(event) {
        let {row, column} = event
        this.row = cloneObject(row)
        this.column = column
        this.visible = true
      },

      close() {
        this.visible = false
      },

      handleOk() {
        this.superTrigger('detailsConfirm', {
          row: this.row,
          column: this.column,
          callback: (success) => {
            this.visible = !success
          },
        })
      },

    },
  }
</script>
<style lang="less">
  .fade-enter-active,
  .fade-leave-active {
    opacity: 1;
    transition: opacity 0.5s;
  }

  .fade-enter,
  .fade-leave-to {
    opacity: 0;
  }
</style>
