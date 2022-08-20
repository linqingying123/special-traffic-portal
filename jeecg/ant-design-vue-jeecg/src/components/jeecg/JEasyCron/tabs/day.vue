<template>
  <div class="config-list">
    <a-radio-group v-model="type">
      <div class="item">
        <a-radio :disabled="disableChoice" class="choice" value="TYPE_NOT_SET">不设置</a-radio>
        <span class="tip-info">日和周只能设置其中之一</span>
      </div>
      <div class="item">
        <a-radio :disabled="disableChoice" class="choice" value="TYPE_EVERY">每日</a-radio>
      </div>
      <div class="item">
        <a-radio :disabled="disableChoice" class="choice" value="TYPE_RANGE">区间</a-radio>
        从
        <a-input-number v-model="valueRange.start" :disabled="type!==TYPE_RANGE || disableChoice" :max="maxValue" :min="minValue" :precision="0" class="w60"/>
        日
        至
        <a-input-number v-model="valueRange.end" :disabled="type!==TYPE_RANGE || disableChoice" :max="maxValue" :min="minValue" :precision="0" class="w60"/>
        日
      </div>
      <div class="item">
        <a-radio :disabled="disableChoice" class="choice" value="TYPE_LOOP">循环</a-radio>
        从
        <a-input-number v-model="valueLoop.start" :disabled="type!==TYPE_LOOP || disableChoice" :max="maxValue" :min="minValue" :precision="0" class="w60"/>
        日开始，间隔
        <a-input-number v-model="valueLoop.interval" :disabled="type!==TYPE_LOOP || disableChoice" :max="maxValue" :min="minValue" :precision="0" class="w60"/>
        日
      </div>
      <div class="item">
        <a-radio :disabled="disableChoice" class="choice" value="TYPE_WORK">工作日</a-radio>
        本月
        <a-input-number v-model="valueWork" :disabled="type!==TYPE_WORK || disableChoice" :max="maxValue" :min="minValue" :precision="0" class="w60"/>
        日，最近的工作日
      </div>
      <div class="item">
        <a-radio :disabled="disableChoice" class="choice" value="TYPE_LAST">最后一日</a-radio>
      </div>
      <div class="item">
        <a-radio :disabled="disableChoice" class="choice" value="TYPE_SPECIFY">指定</a-radio>
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
  name: 'day',
  mixins: [mixin],
  props: {
    week: {
      type: String,
      default: '?'
    }
  },
  data() {
    return {}
  },
  computed: {
    disableChoice() {
      return (this.week && this.week !== '?') || this.disabled
    }
  },
  watch: {
    value_c(newVal, oldVal) {
      // 数值变化
      this.updateValue()
    },
    week(newVal, oldVal) {
      // console.info('new week: ' + newVal)
      this.updateValue()
    }
  },
  methods: {
    updateValue() {
      this.$emit('change', this.disableChoice ? '?' : this.value_c)
    }
  },
  created() {
    this.DEFAULT_VALUE = '*'
    this.minValue = 1
    this.maxValue = 31
    this.valueRange.start = 1
    this.valueRange.end = 31
    this.valueLoop.start = 1
    this.valueLoop.interval = 1
    this.parseProp(this.prop)
  }
}
</script>

<style lang="less" scoped>
  @import "mixin.less";
</style>
