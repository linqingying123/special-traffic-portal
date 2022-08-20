<template>
  <div>
    <a-form-model ref="form" :model="model" :rules="validatorRules" class="password-retrieval-form" @keyup.enter.native="nextStep">
      <a-form-model-item :labelCol="{span: 5}" :wrapperCol="{span: 19}" label="手机" prop="phone" required>
        <a-input v-model="model.phone" autocomplete="false" placeholder="请输入手机号" type="text">
          <a-icon slot="prefix" :style="{ color: 'rgba(0,0,0,.25)'}" type="phone"/>
        </a-input>
      </a-form-model-item>
      <a-form-model-item v-if="show" :labelCol="{span: 5}" :wrapperCol="{span: 19}" label="验证码" prop="captcha" required>
        <a-row :gutter="16">
          <a-col :span="12" class="gutter-row">
            <a-input v-model="model.captcha" placeholder="手机短信验证码" type="text" @change="captchaChange">
              <a-icon slot="prefix" :style="{ color: 'rgba(0,0,0,.25)'}" type="code"/>
            </a-input>
          </a-col>
          <a-col :span="8" class="gutter-row">
            <a-button
              :disabled="state.smsSendBtn"
              size="default"
              tabindex="-1"
              v-text="!state.smsSendBtn && '获取验证码' || (state.time+' s')"
              @click.stop.prevent="getCaptcha"></a-button>
          </a-col>
        </a-row>
      </a-form-model-item>
      <a-form-model-item :wrapperCol="{span: 19, offset: 5}">
        <router-link :to="{ name: 'login' }" style="float: left;line-height: 40px;">使用已有账户登录</router-link>
        <a-button style="margin-left: 20px" type="primary" @click="nextStep">下一步</a-button>
      </a-form-model-item>
    </a-form-model>
  </div>
</template>

<script>
  import {postAction} from '@/api/manage'

  export default {
    name: "Step2",
    props: ['userList'],
    data() {
      return {
        model: {},
        loading: false,
        // accountName: this.userList.username,
        dropList: "0",
        captcha: "",
        show: true,
        state: {
          time: 60,
          smsSendBtn: false,
        },
        formLogin: {
          captcha: "",
          mobile: "",
        },
        validatorRules: {
          phone: [
            { required: true, message: '请输入手机号码!' },
            { validator: this.validatePhone }
          ],
          captcha: [
            { required: true, message: '请输入短信验证码!' }
          ]
        },
      }
    },
    computed: {
    },
    methods: {
      nextStep() {
        let that = this
        that.loading = true
        this.$refs['form'].validate((success) => {
          if(success==true){
            let params = {
              phone: this.model.phone,
              smscode: this.model.captcha
            }
            postAction("/sys/user/phoneVerification", params).then((res) => {
              if (res.success) {
                console.log(res);
                let userList = {
                  username: res.result.username,
                  phone: params.phone,
                  smscode: res.result.smscode
                };
                setTimeout(function () {
                  that.$emit('nextStep', userList)
                }, 0)
              } else {
                this.cmsFailed(res.message);
              }
            });
          }

        })
      },
      getCaptcha(e) {
        e.preventDefault();
        const that = this
        that.$refs['form'].validateField('phone', err=>{
          if(!err){
            that.state.smsSendBtn = true;
            let interval = window.setInterval(() => {
              if (that.state.time-- <= 0) {
                that.state.time = 60;
                that.state.smsSendBtn = false;
                window.clearInterval(interval);
              }
            }, 1000);
            const hide = that.$message.loading('验证码发送中..', 0);
            let smsParams = {
              mobile: that.model.phone,
              smsmode: "2"
            };
            postAction("/sys/sms", smsParams).then(res => {
              if (!res.success) {
                setTimeout(hide, 1);
                that.cmsFailed(res.message);
              }
              setTimeout(hide, 500);
            })
          }else{
            that.cmsFailed(err);
          }
        })
      },
      cmsFailed(err) {
        this.$notification['error']({
          message: "验证错误",
          description: err,
          duration: 4,
        });
      },
      handleChangeSelect(value) {
        var that = this;
        console.log(value);
        if (value == 0) {
          that.dropList = "0";
          that.show = true;
        } else {
          that.dropList = "1";
          that.show = false;
        }
      },
      validatePhone(rule,value,callback){
          if(value){
            var myreg=/^[1][3,4,5,7,8][0-9]{9}$/;
            if(!myreg.test(value)){
              callback("请输入正确的手机号")
            }else{
              callback();
            }
          }else{
            callback()
          }
      },
      //手机号改变事件
      captchaChange(val){
        this.$refs['form'].validateField("captcha")
      }
    }

  }
</script>

<style lang="less" scoped>
  .stepFormText {
    margin-bottom: 24px;
  }

  .ant-form-item-label,
  .ant-form-item-control {
    line-height: 22px;
  }

  .getCaptcha {
    display: block;
    width: 100%;
    height: 40px;
  }
</style>
