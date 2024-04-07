<template>
  <t-space :size="20" class="hc-setting" ref="hcSetting">
    <t-badge count="100">
      <icon name="notification-error" size="24px" :style="{ color }" />
    </t-badge>
    <t-popup :attach="popupAttach" placement="bottom-left" showArrow destroyOnClose trigger="click">
      <icon name="setting-1" size="24px" :style="{ color }" />
      <t-list slot="content" header="设置" size="small">
        <t-list-item>
          <t-list-item-meta title="主题">
            <icon slot="image" name="fill-color-1" size="28px" />
            <t-radio-group slot="description" variant="primary-filled" v-model="theme" size="small" @change="themeChange">
              <t-radio-button value="darkGreen">苍绿</t-radio-button>
              <t-radio-button value="indigoBlue">靛青</t-radio-button>
            </t-radio-group>
          </t-list-item-meta>
        </t-list-item>
        <t-list-item>
          <t-list-item-meta title="布局">
            <icon slot="image" name="component-layout" size="28px" />
            <t-radio-group slot="description" variant="primary-filled" v-model="layout" size="small" @change="layoutChange">
              <t-radio-button value="layout-classical">布局一</t-radio-button>
              <t-radio-button value="layout-haiyan">布局二</t-radio-button>
            </t-radio-group>
          </t-list-item-meta>
        </t-list-item>
        <t-list-item>
          <t-list-item-meta title="业务支撑平台">
            <icon slot="image" name="system-setting" size="28px" />
            <t-link slot="description" theme="primary" :suffixIcon="suffixIcon" href="#" target="_blank">跳转链接</t-link>
          </t-list-item-meta>
        </t-list-item>
      </t-list>
    </t-popup>
    <icon name="logout" size="24px" :style="{ color }" @click="handleLogout" />
    <div class="userinfo">
      <t-avatar v-if="avatar" :image="avatar"></t-avatar>
      <t-avatar v-else>{{ username }}</t-avatar>
      <span :style="{ color }">{{ username }}</span>
    </div>
  </t-space>
</template>

<script>
import { Icon, JumpIcon } from 'tdesign-icons-vue'

export default {

  components: { Icon },

  data () {
    return {
      popupAttach: () => this.$refs.hcSetting.$el,
      suffixIcon: () => <JumpIcon />,
      theme: this.$store.state.app.theme,
      layout: this.$store.state.app.layout
    }
  },

  computed: {
    avatar () {
      return this.$store.state.app.userInfo?.avatar
    },
    username () {
      return this.$store.state.app.userInfo?.userDescription
    },
    color () {
      return this.$store.state.app.layout !== 'layout-classical' ? 'var(--td-font-white-1)' : 'var(--td-text-color-regular)'
    }
  },

  methods: {
    handleLogout () {
      const dialog = this.$dialog.confirm({
        header: '提示',
        body: '确定退出登录么？',
        theme: 'info',
        onConfirm: () => {
          this.$store.dispatch('app/logout').then(() => {
            this.$router.replace({ name: 'login' })
          })
          dialog.destroy()
        }
      })
    },
    themeChange (theme) {
      this.$store.commit('app/SET_THEME', theme)
    },
    layoutChange (layout) {
      this.$store.commit('app/SET_LAYOUT', layout)
    }
  }
}
</script>

<style lang="scss">
.hc-setting {
  height: 100%;
  padding-left: 40px;
  position: relative;

  &::before {
    position: absolute;
    content: "";
    left: 0;
    top: 0;
    width: 40px;
    height: 100%;
    background-image: linear-gradient(
      to left,
      rgba(0, 0, 0, 0.03),
      rgba(0, 0, 0, 0.06)
    );
    clip-path: path("M0 48 Q14 46 18 23 T40 0 L40 48 Z");
  }

  &::after {
    position: absolute;
    content: "";
    left: 40px;
    right: 0;
    top: 0;
    height: 100%;
    background-image: linear-gradient(
      to left,
      transparent,
      rgba(0, 0, 0, 0.03)
    );
  }

  .t-space-item {
    display: flex;
    align-items: center;
    z-index: 1;
  }
  .t-space-item .t-icon {
    cursor: pointer;
  }
  .t-badge {
    height: 24px;
    cursor: pointer;
  }
  .userinfo {
    display: flex;
    align-items: center;
  }
  .t-avatar + span {
    padding: 0 20px 4px 10px;
    line-height: 1;
    font-size: var(--td-font-size-title-medium);
  }
  .t-list-item__meta-avatar {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .t-list-item__meta-content {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
  }
  .t-list-item__meta-title,
  .t-list-item__meta-description {
    margin: 0;
  }
}
</style>
