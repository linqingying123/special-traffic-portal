<template>
  <div class="config-list">
    <a-radio-group v-model="type">
      <div class="item">
        <a-radio :disabled="disabled" class="choice" value="TYPE_EVERY">每月</a-radio>
      </div>
      <div class="item">
        <a-radio :disabled="disabled" class="choice" value="TYPE_RANGE">区间</a-radio>
        从
        <a-input-number v-model="valueRange.start" :disabled="type!==TYPE_RANGE || disabled" :max="maxValue" :min="minValue" :precision="0" class="w60"/>
        月
        至
        <a-input-number v-model="valueRange.end" :disabled="type!==TYPE_RANGE || disabled" :max="maxValue" :min="minValue" :precision="0" class="w60"/>
        月
      </div>
      <div class="item">
        <a-radio :disabled="disabled" class="choice" value="TYPE_LOOP">循环</a-radio>
        从
        <a-input-number v-model="valueLoop.start" :disabled="type!==TYPE_LOOP || disabled" :max="maxValue" :min="minValue" :precision="0" class="w60"/>
        月开始，间隔
        <a-input-number v-model="valueLoop.interval" :disabled="type!==TYPE_LOOP || disabled" :max="maxValue" :min="minValue" :precision="0" class="w60"/>
        月
      </div>
      <div class="item">
        <a-radio :disabled="disabled" class="choice" value="TYPE_SPECIFY">指定</a-radio>
        <div class="list">
          <a-checkbox-group v-model="valueList">
            <template v-for="i of specifyRange">
              <a-checkbox :key="`key-${i}`" :disabled="type!==TYPE_SPECIFY || disabled" :value="i" class="list-check-item">{{i}}</a-checkbox>
            </template>
          </a-checkbox-group>
        </div>
      </div>
    </a-radio-group>
  </div>
</template>

<script>
import mixin from './mixin'

export default {
  name: 'month',
  mixins: [mixin],
  data() {
    return {}
  },
  watch: {
    value_c(newVal, oldVal) {
      this.$emit('change', newVal)
    }
  },
  created() {
    this.DEFAULT_VALUE = '*'
    this.minValue = 1
    this.maxValue = 12
    this.valueRange.start = 1
    this.valueRange.end = 12
    this.valueLoop.start = 1
    this.valueLoop.interval = 1
    this.parseProp(this.prop)
  }
}
</script>

<style lang="less" scoped>
  @import "mixin.less";
</style>
