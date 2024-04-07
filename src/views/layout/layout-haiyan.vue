<template>
  <t-layout class="layout">
    <t-aside width="auto" v-if="!fullscreen">
      <div class="menu__logo" :style="{ width: collapsed ? '64px': '182px' }">
        <img :width="32" :src="iconUrl" alt="logo" />
        <span v-if="!collapsed">{{ systemName }}</span>
      </div>
      <aside-menu :menu="subMenu" :collapsed="collapsed" @one-level-menu="mainActiveChange"></aside-menu>
    </t-aside>

    <t-layout>
      <t-header height="96px" v-if="!fullscreen">
        <t-row>
          <t-col flex="none">
            <div class="menu__operations">
              <t-button variant="text" shape="square" @click.native="collapsed = !collapsed">
                <icon :name="iconName" />
              </t-button>
            </div>
          </t-col>
          <t-col flex="auto">
            <head-menu isMain :menu="mainMenu" :main-active="mainActive" @one-level-menu="mainActiveChange" />
          </t-col>
          <t-col flex="none">
            <system-setting />
          </t-col>
        </t-row>
        <book-mark />
      </t-header>

      <page-content />
    </t-layout>
  </t-layout>
</template>

<script>
import HeadMenu from './components/menu/head-menu'
import mixin from './mixin'

export default {
  components: { HeadMenu },
  mixins: [mixin]
}
</script>

<style lang="scss">
.layout-haiyan {
  // layout
  .layout {
    width: 100vw;
    height: 100vh;
    min-width: 1200px;
    min-height: 700px;
    overflow: hidden;
  }
  .t-layout__sider {
    display: flex;
    flex-direction: column;
  }
  .t-layout__sider + .t-layout {
    overflow: hidden;
  }
  .t-layout__header {
    display: flex;
    flex-direction: column;
    flex-shrink: 0;
    border-bottom: 1px solid var(--td-component-stroke);
  }
  .t-row {
    flex: 1;
  }
  .t-col:last-child {
    height: var(--td-comp-size-xxl);
    background: linear-gradient(
      to bottom,
      var(--td-brand-color-10),
      var(--td-brand-color-12)
    );
  }

  // head-menu
  .t-head-menu {
    background: linear-gradient(
      to bottom,
      var(--td-brand-color-10),
      var(--td-brand-color-12)
    );
  }
  .t-head-menu__inner {
    height: var(--td-comp-size-xxl);
  }
  .t-head-menu__inner li + li {
    margin-left: 0;
  }
  .t-head-menu__inner .t-menu:first-child {
    margin-left: 0;
  }
  .t-head-menu .t-menu__item {
    height: 100%;
    color: var(--td-font-white-1);
    font: var(--td-font-body-large);
  }
  .t-head-menu .t-menu__item.t-is-active {
    background-color: var(--td-brand-color-9);
    border-bottom: 2px solid var(--td-bg-color-container);
  }

  // default-menu
  .t-default-menu__inner .t-menu {
    padding: 0;
  }
  .t-default-menu {
    flex: 1;
    background: linear-gradient(
      to top,
      var(--td-brand-color-10),
      var(--td-brand-color-12)
    );
  }
  .t-default-menu__inner .t-menu > *:not(.t-menu-group):not(:first-child),
  .t-default-menu__inner .t-menu .t-menu-group > *:not(:first-child),
  .t-default-menu__inner .t-menu .t-menu__sub > *:not(:first-child),
  .t-default-menu__inner .t-menu .t-submenu > *:not(:first-child) {
    margin-top: 0;
  }
  .t-default-menu .t-menu__item {
    font: var(--td-font-link-large);
    color: var(--td-brand-color-1);
    height: 44px;
    line-height: 44px;
  }
  .t-default-menu .t-menu__item.t-is-opened,
  .t-default-menu .t-menu__item.t-is-opened .t-icon,
  .t-default-menu.t-is-collapsed .t-menu__item.t-is-active.t-is-opened .t-icon {
    color: var(--td-font-white-1);
  }
  .t-default-menu .t-menu__sub .t-menu__item {
    height: 44px;
    line-height: 44px;
  }
  .t-default-menu .t-menu__item.t-is-active:not(.t-is-opened),
  .t-default-menu.t-is-collapsed .t-menu__item.t-is-active.t-is-opened {
    color: var(--td-brand-color-2);
    background-color: var(--td-brand-color-9);
    border-left: 2px solid var(--td-bg-color-container);
  }
  .t-default-menu .t-menu__item.t-is-active:not(.t-is-opened) .t-icon {
    color: var(--td-brand-color-2);
  }
  .t-menu__sub {
    background-color: var(--td-brand-color-12);
  }
  .t-menu__item:hover:not(.t-is-active):not(.t-is-disabled) {
    background-color: color-mix(in srgb, var(--td-brand-color-9) 75%, black);
  }
  .menu__logo {
    display: flex;
    align-items: center;
    justify-content: space-around;
    height: var(--td-comp-size-xxl);
    font-size: var(--td-font-size-title-large);
    color: var(--td-font-white-1);
    font-weight: 700;
    white-space: nowrap;
    background: linear-gradient(
      to bottom,
      var(--td-brand-color-10),
      var(--td-brand-color-12)
    );
    transition: width 0.28s cubic-bezier(0.645, 0.045, 0.355, 1);
  }
  .menu__operations {
    width: 100%;
    position: relative;
    padding: var(--td-comp-paddingTB-s) var(--td-comp-paddingLR-xxs);
    box-sizing: border-box;
    background: linear-gradient(
      to bottom,
      var(--td-brand-color-10),
      var(--td-brand-color-12)
    );
  }
  .menu__operations .t-button,
  .menu__operations .t-button:hover {
    color: var(--td-font-white-1);
    border-color: transparent;
    background-color: transparent;
    --ripple-color: transparent;
  }

  // menu-popup
  .t-menu__popup {
    background: linear-gradient(
      to top,
      var(--td-brand-color-10),
      var(--td-brand-color-12)
    );
    border: solid 0.5px var(--td-brand-color-10);
  }
  .t-menu__popup .t-menu__item {
    color: var(--td-brand-color-2);
  }
  .t-menu__popup .t-menu__item.t-is-active {
    color: var(--td-brand-color-2);
    background-color: var(--td-brand-color-9);
  }
  .t-menu__popup .t-menu__item:hover:not(.t-is-active) {
    background-color: var(--td-brand-color-9);
  }
}
</style>
