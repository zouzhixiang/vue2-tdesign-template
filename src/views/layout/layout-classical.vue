<template>
  <t-layout class="layout">
    <t-aside width="auto" v-if="!fullscreen">
      <div class="menu__logo">
        <img :width="32" :src="iconUrl" alt="logo" />
        <span v-if="!collapsed">{{ systemName }}</span>
      </div>
      <aside-menu :menu="menuTree" :collapsed="collapsed"></aside-menu>
      <div class="menu__operations">
        <t-button variant="text" shape="square" @click.native="collapsed = !collapsed">
          <icon :name="iconName" />
        </t-button>
      </div>
    </t-aside>

    <t-layout>
      <t-header v-if="!fullscreen">
        <book-mark />
        <system-setting />
      </t-header>

      <page-content />
    </t-layout>
  </t-layout>
</template>

<script>
import mixin from './mixin'

export default {
  mixins: [mixin]
}
</script>

<style lang="scss">
.layout-classical {
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
    height: var(--td-comp-size-xxl);
    display: flex;
    flex-shrink: 0;
    border-bottom: 1px solid var(--td-component-stroke);
  }

  // default-menu
  .t-default-menu__inner .t-menu {
    padding: 0;
  }
  .t-default-menu {
    flex: 1;
    background: var(--td-brand-color-10);
    overflow: hidden;
  }
  .t-default-menu__inner .t-menu > *:not(.t-menu-group):not(:first-child),
  .t-default-menu__inner .t-menu .t-menu-group > *:not(:first-child),
  .t-default-menu__inner .t-menu .t-menu__sub > *:not(:first-child),
  .t-default-menu__inner .t-menu .t-submenu > *:not(:first-child) {
    margin-top: 0;
  }
  .t-default-menu .t-menu__item {
    font: var(--td-font-link-large);
    color: var(--td-brand-color-2);
    height: var(--td-comp-size-xxxl);
    line-height: var(--td-comp-size-xxxl);
  }
  .t-default-menu .t-menu__item.t-is-opened,
  .t-default-menu .t-menu__item.t-is-opened .t-icon,
  .t-default-menu.t-is-collapsed .t-menu__item.t-is-active.t-is-opened .t-icon {
    color: var(--td-font-white-1);
    font-weight: 700;
  }
  .t-default-menu .t-menu__sub .t-menu__item {
    font: var(--td-font-link-medium);
    height: var(--td-comp-size-xl);
    line-height: var(--td-comp-size-xl);
  }
  .t-default-menu .t-menu__sub .t-menu__item.t-is-opened {
    color: var(--td-brand-color);
    font-weight: normal;
  }
  .t-default-menu .t-menu__item.t-is-active:not(.t-is-opened),
  .t-default-menu.t-is-collapsed .t-menu__item.t-is-active.t-is-opened {
    color: var(--td-brand-color-2);
    background-color: var(--td-brand-color-9);
  }
  .t-default-menu .t-menu__item.t-is-active:not(.t-is-opened) .t-icon {
    color: var(--td-brand-color-2);
  }
  .t-menu__sub {
    background-color: var(--td-brand-color-11);
  }
  .t-menu__sub .t-menu__sub {
    background-color: var(--td-brand-color-12);
  }
  .t-menu__item:hover:not(.t-is-active):not(.t-is-disabled) {
    background-color: color-mix(in srgb, var(--td-brand-color-9) 75%, black);
  }
  .menu__logo {
    display: flex;
    flex-shrink: 0;
    align-items: center;
    justify-content: space-around;
    height: var(--td-comp-size-xxl);
    font-size: var(--td-font-size-title-large);
    font-weight: 700;
    white-space: nowrap;
    background-color: var(--td-bg-color-container);
  }
  .menu__operations {
    width: 100%;
    position: relative;
    padding: var(--td-comp-paddingTB-s) var(--td-comp-paddingLR-l);
    box-sizing: border-box;
    background: var(--td-brand-color-10);
  }
  .menu__operations .t-button,
  .menu__operations .t-button:hover {
    color: var(--td-brand-color-2);
    border-color: transparent;
    background-color: transparent;
    --ripple-color: transparent;
  }

  // menu-popup
  .t-menu__popup {
    background: var(--td-brand-color-10);
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
