<template>
  <a-modal
    :confirmLoading="confirmLoading"
    :mask="false"
    :visible="visible"
    :width="800"
    cancelText="关闭"
    okText="查询"
    title="高级查询构造器"
    @cancel="handleCancel"
    @ok="handleOk">

    <a-spin :spinning="confirmLoading">
      <a-form>
        <div>
          <a-row v-for="(item, index) in queryParamsModel" :key="index" :gutter="16" style="margin-bottom:10px" type="flex">
            <a-col :span="6">
              <a-select  v-model="item.field" placeholder="选择查询字段">
                <a-select-option value="name">用户名</a-select-option>
                <a-select-option value="key_word">关键词</a-select-option>
                <a-select-option value="birthday">生日</a-select-option>
                <a-select-option value="age">年龄</a-select-option>
              </a-select>
            </a-col>
            <a-col :span="6">
              <a-select v-model="item.rule"  placeholder="选择匹配规则">
                <a-select-option value="=">等于</a-select-option>
                <a-select-option value="!=">不等于</a-select-option>
                <a-select-option value=">">大于</a-select-option>
                <a-select-option value=">=">大于等于</a-select-option>
                <a-select-option value="<">小于</a-select-option>
                <a-select-option value="<=">小于等于</a-select-option>
                <a-select-option value="LEFT_LIKE">以..开始</a-select-option>
                <a-select-option value="RIGHT_LIKE">以..结尾</a-select-option>
                <a-select-option value="LIKE">包含</a-select-option>
                <a-select-option value="IN">在...中</a-select-option>
              </a-select>
            </a-col>

            <a-col :span="6"><a-input v-model="item.val" placeholder="请输入值"/></a-col>
            <a-col :span="6">
              <a-button icon="plus"  @click="handleAdd"></a-button>&nbsp;
              <a-button icon="minus"  @click="handleDel( index )"></a-button>
            </a-col>
          </a-row>
        </div>

      </a-form>
    </a-spin>
  </a-modal>
</template>

<script>
  import { httpAction } from '@/api/manage'

  export default {
    name: "SuperQueryModal",
    data () {
      return {
        visible: false,
        queryParamsModel: [{},{}],
        confirmLoading: false
      }
    },
    created () {
    },
    methods: {
      show () {
        this.visible = true;
      },
      close () {
        this.$emit('close');
        this.visible = false;
      },
      handleOk () {
        console.log(this.queryParamsModel)
        // 子组件中触发父组件方法ee并传值cc12345
        this.$emit('handleSuperQuery', this.queryParamsModel)
      },
      handleCancel () {
        this.close()
      },
      handleAdd () {
        this.queryParamsModel.push({});
      },
      handleDel (index) {
        console.log(index)
        this.queryParamsModel.splice(index,1);
      }
    }
  }
</script>

<style scoped>
</style>
