<template>
  <div class="setting-drawer">
    <a-drawer
      :closable="false"
      :visible="visible"
      placement="right"
      style="height: 100%;overflow: auto;"
      width="300"
      @close="onClose"
    >
      <div class="setting-drawer-index-content">

        <div :style="{ marginBottom: '24px' }">
          <h3 class="setting-drawer-index-title">整体风格设置</h3>

          <div class="setting-drawer-index-blockChecbox">
            <a-tooltip>
              <template slot="title">
                暗色菜单风格
              </template>
              <div class="setting-drawer-index-item" @click="handleMenuTheme('dark')">
                <img alt="dark" src="https://gw.alipayobjects.com/zos/rmsportal/LCkqqYNmvBEbokSDscrm.svg">
                <div v-if="navTheme === 'dark'" class="setting-drawer-index-selectIcon">
                  <a-icon type="check"/>
                </div>
              </div>
            </a-tooltip>

            <a-tooltip>
              <template slot="title">
                亮色菜单风格
              </template>
              <div class="setting-drawer-index-item" @click="handleMenuTheme('light')">
                <img alt="light" src="https://gw.alipayobjects.com/zos/rmsportal/jpRkZQMyYRryryPNtyIC.svg">
                <div v-if="navTheme !== 'dark'" class="setting-drawer-index-selectIcon">
                  <a-icon type="check"/>
                </div>
              </div>
            </a-tooltip>
          </div>
        </div>

        <div :style="{ marginBottom: '24px' }">
          <h3 class="setting-drawer-index-title">主题色</h3>

          <div style="height: 20px">
            <a-tooltip v-for="(item, index) in colorList" :key="index" class="setting-drawer-theme-color-colorBlock">
              <template slot="title">
                {{ item.key }}
              </template>
              <a-tag :color="item.color" @click="changeColor(item.color)">
                <a-icon v-if="item.color === primaryColor" type="check"></a-icon>
              </a-tag>
            </a-tooltip>

          </div>
        </div>
        <a-divider />

        <div :style="{ marginBottom: '24px' }">
          <h3 class="setting-drawer-index-title">导航模式</h3>

          <div class="setting-drawer-index-blockChecbox">
            <a-tooltip>
              <template slot="title">
                侧边栏导航
              </template>
              <div class="setting-drawer-index-item" @click="handleLayout('sidemenu')">
                <img alt="sidemenu" src="https://gw.alipayobjects.com/zos/rmsportal/JopDzEhOqwOjeNTXkoje.svg">
                <div v-if="layoutMode === 'sidemenu'" class="setting-drawer-index-selectIcon">
                  <a-icon type="check"/>
                </div>
              </div>
            </a-tooltip>

            <a-tooltip>
              <template slot="title">
                顶部栏导航
              </template>
              <div class="setting-drawer-index-item" @click="handleLayout('topmenu')">
                <img alt="topmenu" src="https://gw.alipayobjects.com/zos/rmsportal/KDNDBbriJhLwuqMoxcAr.svg">
                <div v-if="layoutMode !== 'sidemenu'" class="setting-drawer-index-selectIcon">
                  <a-icon type="check"/>
                </div>
              </div>
            </a-tooltip>
          </div>
          <div :style="{ marginTop: '24px' }">
            <a-list :split="false">
              <a-list-item>
                <a-tooltip slot="actions">
                  <template slot="title">
                    该设定仅 [顶部栏导航] 时有效
                  </template>
                  <a-select :defaultValue="contentWidth" size="small" style="width: 80px;" @change="handleContentWidthChange">
                    <a-select-option value="Fixed">固定</a-select-option>
                    <a-select-option v-if="layoutMode !== 'sidemenu'" value="Fluid">流式</a-select-option>
                  </a-select>
                </a-tooltip>
                <a-list-item-meta>
                  <div slot="title">内容区域宽度</div>
                </a-list-item-meta>
              </a-list-item>
              <a-list-item>
                <a-switch slot="actions" :defaultChecked="fixedHeader" size="small" @change="handleFixedHeader" />
                <a-list-item-meta>
                  <div slot="title">固定 Header</div>
                </a-list-item-meta>
              </a-list-item>
              <a-list-item>
                <a-switch slot="actions" :defaultChecked="autoHideHeader" :disabled="!fixedHeader" size="small" @change="handleFixedHeaderHidden" />
                <a-list-item-meta>
                  <div slot="title" :style="{ textDecoration: !fixedHeader ? 'line-through' : 'unset' }">下滑时隐藏 Header</div>
                </a-list-item-meta>
              </a-list-item>
              <a-list-item>
                <a-switch slot="actions" :checked="dataFixSiderbar" :disabled="(layoutMode === 'topmenu')" size="small" @change="handleFixSiderbar" />
                <a-list-item-meta>
                  <div slot="title" :style="{ textDecoration: layoutMode === 'topmenu' ? 'line-through' : 'unset' }">固定侧边菜单</div>
                </a-list-item-meta>
              </a-list-item>
            </a-list>
          </div>
        </div>
        <a-divider />

        <div :style="{ marginBottom: '24px' }">
          <h3 class="setting-drawer-index-title">其他设置</h3>
          <div>
            <a-list :split="false">
              <a-list-item>
                <a-switch slot="actions" :defaultChecked="colorWeak" size="small" @change="onColorWeak" />
                <a-list-item-meta>
                  <div slot="title">色弱模式</div>
                </a-list-item-meta>
              </a-list-item>
              <a-list-item>
                <a-switch slot="actions" :defaultChecked="multipage" size="small" @change="onMultipageWeak" />
                <a-list-item-meta>
                  <div slot="title">多页签模式</div>
                </a-list-item-meta>
              </a-list-item>
            </a-list>
          </div>
        </div>
        <a-divider />
        <div :style="{ marginBottom: '24px' }">
          <a-alert type="warning">
            <span slot="message">
              配置栏只在开发环境用于预览，生产环境不会展现，请手动修改配置文件
              <a href="https://github.com/sendya/ant-design-pro-vue/blob/master/src/defaultSettings.js" target="_blank">src/defaultSettings.js</a>
            </span>
          </a-alert>
        </div>
      </div>
      <div v-if="visible" class="setting-drawer-index-handle" @click="toggle">
<!--        <a-icon type="setting" v-if="!visible"/>-->
<!--        <a-icon type="close" v-else/>-->
        <a-icon type="close" />
      </div>
    </a-drawer>
  </div>
</template>

<script>
  import DetailList from '@/components/tools/DetailList'
  import SettingItem from '@/components/setting/SettingItem'
  import config from '@/defaultSettings'
  import { updateTheme, updateColorWeak, colorList } from '@/components/tools/setting'
  import { mixin, mixinDevice } from '@/utils/mixin.js'
  import { triggerWindowResizeEvent } from '@/utils/util'

  export default {
    components: {
      DetailList,
      SettingItem
    },
    mixins: [mixin, mixinDevice],
    data() {
      return {
        visible: false,
        colorList,
        dataFixSiderbar: false
    }
    },
    mounted () {
      // 当主题色不是默认色时，才进行主题编译
      if (this.primaryColor !== config.primaryColor) {
        updateTheme(this.primaryColor)
      }
      if (this.colorWeak !== config.colorWeak) {
        updateColorWeak(this.colorWeak)
      }
      if (this.multipage !== config.multipage) {
        this.$store.dispatch('ToggleMultipage', this.multipage)
      }
    },
    methods: {
      showDrawer() {
        this.visible = true
      },
      onClose() {
        this.visible = false
      },
      toggle() {
        this.visible = !this.visible
      },
      onColorWeak (checked) {
        this.$store.dispatch('ToggleWeak', checked)
        updateColorWeak(checked)
      },
      onMultipageWeak (checked) {
        this.$store.dispatch('ToggleMultipage', checked)
      },
      handleMenuTheme (theme) {
        this.$store.dispatch('ToggleTheme', theme)
      },
      handleLayout (mode) {
        this.$store.dispatch('ToggleLayoutMode', mode)
        // 因为顶部菜单不能固定左侧菜单栏，所以强制关闭
        this.handleFixSiderbar(false)
        // 触发窗口resize事件
        triggerWindowResizeEvent()
      },
      handleContentWidthChange (type) {
        this.$store.dispatch('ToggleContentWidth', type)
      },
      changeColor (color) {
        if (this.primaryColor !== color) {
          this.$store.dispatch('ToggleColor', color)
          updateTheme(color)
        }
      },
      handleFixedHeader (fixed) {
        this.$store.dispatch('ToggleFixedHeader', fixed)
      },
      handleFixedHeaderHidden (autoHidden) {
        this.$store.dispatch('ToggleFixedHeaderHidden', autoHidden)
      },
      handleFixSiderbar (fixed) {
        if (this.layoutMode === 'topmenu') {
          fixed = false
        }
        this.dataFixSiderbar = fixed
        this.$store.dispatch('ToggleFixSiderbar', fixed)
      }
    },
  }
</script>

<style lang="less" scoped>

  .setting-drawer-index-content {

    .setting-drawer-index-blockChecbox {
      display: flex;

      .setting-drawer-index-item {
        margin-right: 16px;
        position: relative;
        border-radius: 4px;
        cursor: pointer;

        img {
          width: 48px;
        }

        .setting-drawer-index-selectIcon {
          position: absolute;
          top: 0;
          right: 0;
          width: 100%;
          padding-top: 15px;
          padding-left: 24px;
          height: 100%;
          color: #1890ff;
          font-size: 14px;
          font-weight: 700;
        }
      }
    }
    .setting-drawer-theme-color-colorBlock {
      width: 20px;
      height: 20px;
      border-radius: 2px;
      float: left;
      cursor: pointer;
      margin-right: 8px;
      padding-left: 0px;
      padding-right: 0px;
      text-align: center;
      color: #fff;
      font-weight: 700;

      i {
        font-size: 14px;
      }
    }
  }

  .setting-drawer-index-handle {
    position: absolute;
    top: 240px;
    background: #1890ff;
    width: 48px;
    height: 48px;
    right: 300px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    pointer-events: auto;
    z-index: 1001;
    text-align: center;
    font-size: 16px;
    border-radius: 4px 0 0 4px;

    i {
      color: rgb(255, 255, 255);
      font-size: 20px;
    }
  }
</style>
