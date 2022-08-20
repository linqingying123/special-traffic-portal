<template>
  <v-chart :data="data" :forceFit="true" :height="height" :padding="[20, 20, 95, 20]" :scale="scale">
    <v-tooltip></v-tooltip>
    <v-axis :dataKey="axis1Opts.dataKey" :grid="axis1Opts.grid" :line="axis1Opts.line" :tickLine="axis1Opts.tickLine"/>
    <v-axis :dataKey="axis2Opts.dataKey" :grid="axis2Opts.grid" :line="axis2Opts.line" :tickLine="axis2Opts.tickLine"/>
    <v-legend :offset="30" dataKey="user" marker="circle"/>
    <v-coord radius="0.8" type="polar"/>
    <v-line :size="2" color="user" position="item*score"/>
    <v-point :size="4" color="user" position="item*score" shape="circle"/>
  </v-chart>
</template>

<script>
  const axis1Opts = {
    dataKey: 'item',
    line: null,
    tickLine: null,
    grid: {
      lineStyle: {
        lineDash: null
      },
      hideFirstLine: false
    }
  }
  const axis2Opts = {
    dataKey: 'score',
    line: null,
    tickLine: null,
    grid: {
      type: 'polygon',
      lineStyle: {
        lineDash: null
      }
    }
  }

  const scale = [
    {
      dataKey: 'score',
      min: 0,
      max: 100
    }, {
      dataKey: 'user',
      alias: '类型'
    }
  ]

  const sourceData = [
    { item: '示例一', score: 40 },
    { item: '示例二', score: 20 },
    { item: '示例三', score: 67 },
    { item: '示例四', score: 43 },
    { item: '示例五', score: 90 }
  ]

  export default {
    name: 'Radar',
    props: {
      height: {
        type: Number,
        default: 254
      },
      dataSource: {
        type: Array,
        default: () => []
      }
    },
    data() {
      return {
        axis1Opts,
        axis2Opts,
        scale,
        data: sourceData
      }
    },
    watch: {
      dataSource(newVal) {
        if (newVal.length === 0) {
          this.data = sourceData
        } else {
          this.data = newVal
        }
      }
    }
  }
</script>

<style scoped>

</style>
