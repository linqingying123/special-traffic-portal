<template>
  <div>
    <div class="user-login-other">
      <span>其他登录方式</span>
      <a title="github" @click="onThirdLogin('github')"><a-icon class="item-icon" type="github"></a-icon></a>
      <a title="企业微信" @click="onThirdLogin('wechat_enterprise')"> <icon-font class="item-icon" type="icon-qiyeweixin3" /></a>
      <a title="钉钉" @click="onThirdLogin('dingtalk')"><a-icon class="item-icon" type="dingding"></a-icon></a>
      <a title="微信" @click="onThirdLogin('wechat_open')"><a-icon class="item-icon" type="wechat"></a-icon></a>
    </div>
    <!-- 第三方登录绑定账号密码输入弹框 -->
    <a-modal :visible="thirdPasswordShow" title="请输入密码" @cancel="thirdLoginNoPassword" @ok="thirdLoginCheckPassword">
      <a-input-password v-model="thirdLoginPassword" placeholder="请输入密码" />
    </a-modal>

    <!-- 第三方登录提示是否绑定账号弹框 -->
    <a-modal :class="'ant-modal-confirm'" :closable="false" :footer="null" :visible="thirdConfirmShow">
      <div class="ant-modal-confirm-body-wrapper">
        <div class="ant-modal-confirm-body">
          <a-icon style="color:#faad14" type="question-circle"/>
          <span class="ant-modal-confirm-title">提示</span>
          <div class="ant-modal-confirm-content">
            已有同名账号存在,请确认是否绑定该账号？
          </div>
        </div>
        <div class="ant-modal-confirm-btns">
          <a-button :loading="thirdCreateUserLoding" @click="thirdLoginUserCreate">创建新账号</a-button>
          <a-button type="primary" @click="thirdLoginUserBind">确认绑定</a-button>
        </div>
      </div>
    </a-modal>

    <!-- 第三方登录绑定手机号 -->
    <a-modal :class="'ant-modal-confirm'" :visible="bindingPhoneModal">
      <template slot="footer">
        <a-button key="submit" type="primary" @click="thirdHandleOk">
          确定
        </a-button>
      </template>
      <div class="ant-modal-confirm-body-wrapper">
        <a-form-model-item>
          <span>绑定手机号</span>
        </a-form-model-item>
        <a-form-model-item>
          <a-input
              v-model="thirdPhone"
              placeholder="手机号"
              size="large"
              type="text">
            <a-icon slot="prefix" :style="{ color: 'rgba(0,0,0,.25)' }" type="mobile"/>
          </a-input>
        </a-form-model-item>

        <a-row :gutter="16">
          <a-col :span="16" class="gutter-row">
            <a-form-model-item>
              <a-input
                  v-model="thirdCaptcha"
                  placeholder="请输入验证码"
                  size="large"
                  type="text">
                <a-icon slot="prefix" :style="{ color: 'rgba(0,0,0,.25)' }" type="mail"/>
              </a-input>
            </a-form-model-item>
          </a-col>
          <a-col :span="8" class="gutter-row">
            <a-button
                :disabled="thirdState.smsSendBtn"
                class="getCaptcha"
                tabindex="-1"
                v-text="!thirdState.smsSendBtn && '获取验证码' || (thirdState.time+' s')"
                @click.stop.prevent="getThirdCaptcha"></a-button>
          </a-col>
        </a-row>
      </div>
    </a-modal>
  </div>
</template>

<script>
import { JeecgThirdLoginMixin } from '@views/user/third/JeecgThirdLoginMixin'
import { Icon } from 'ant-design-vue';

const IconFont = Icon.createFromIconfontCN({
 // scriptUrl: '//at.alicdn.com/t/font_2316098_umqusozousr.js',
  scriptUrl: '/cdn/font-icon/font_2316098_umqusozousr.js',
});
export default {
  name: 'thirdLogin',
  mixins: [JeecgThirdLoginMixin],
  components: {
    IconFont,
  }
}
</script>

<style lang="less" scoped>
.user-login-other {
  text-align: left;
  margin-top: 24px;
  line-height: 22px;

.item-icon {
  font-size: 24px;
  color: rgba(0, 0, 0, .2);
  margin-left: 16px;
  vertical-align: middle;
  cursor: pointer;
  transition: color .3s;

&  :hover {
  color: #1890ff;
}
}
.register {
  float: right;
}
}
</style>
