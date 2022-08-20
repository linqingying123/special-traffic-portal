<template>
  <a-card :bordered="false">
    <a-row style="margin-top: 20px">
      <a-col :md="2" :sm="4">
        <a-select defaultValue="POST" size="large" style="width: 90px" @change="handleChange">
          <a-select-option value="POST">POST</a-select-option>
          <a-select-option value="GET">GET</a-select-option>
          <a-select-option value="PUT">PUT</a-select-option>
          <a-select-option value="DELETE">DELETE</a-select-option>
        </a-select>
      </a-col>
      <a-col :md="22" :sm="20">
        <a-input-search
          v-model="url"
          enterButton="Send"
          placeholder="input send url"
          size="large"
          @search="onSearch" />
      </a-col>
    </a-row>

    <a-tabs defaultActiveKey="2">
      <a-tab-pane key="2" tab="params">
        <textarea :rows="13" style="width:100%;font-size: 16px;font-weight:500" @blur="changeVal">
        </textarea>
      </a-tab-pane>
    </a-tabs>

    <a-tabs defaultActiveKey="1">
      <a-tab-pane key="1" tab="response">
        <textarea :rows="10" readOnly style="width:100%;font-size: 16px;font-weight:500" v-html="resultJson">
        </textarea>
      </a-tab-pane>
    </a-tabs>
  </a-card>
</template>
<script>
  import { axios } from '@/utils/request'
  import { ACCESS_TOKEN } from "@/store/mutation-types"
  import Vue from 'vue'
  export default {
    name: 'FlowTest',
    data(){
      return {
        url:"",
        paramJson:"",
        resultJson:{},
        requestMethod:"POST"
      }
    },
    methods: {
      onSearch (value) {
        let that = this
        if(!value){
          that.$message.error("请填写路径")
          return false
        }
        this.resultJson = {};
          axios({
            url: value,
            method: this.requestMethod,
            data: this.paramJson
          }).then((res) => {
            console.log(res)
            this.resultJson = res
          }).catch((err) => {
            that.$message.error("请求异常："+err)
          })
      },
      changeVal(e){
        try {
          let json = e.target.value;
          if(json.indexOf(",}")>0){
            json = json.replace(",}","}");
          }
          this.paramJson = JSON.parse(json);
        }catch (e) {
          console.log(e);
          this.$message.error("非法的JSON字符串")
        }
      },
      handleChange(value) {
        this.requestMethod = value;
      },
      created () {
        const token = Vue.ls.get(ACCESS_TOKEN);
        this.headers = {"X-Access-Token":token}

      }
    }
  }
</script>
