<template>
  <t-submenu v-if="menuItem.children.length > 0" :title="menuItem.name" :value="menuItem.id">
    <template v-if="menuItem.showIcon" #icon>
      <icon :name="menuItem.showIcon" />
    </template>
    <menu-item v-for="(item, index) in menuItem.children" :key="index" :menuItem="item"></menu-item>
  </t-submenu>
  <t-menu-item v-else :value="menuItem.id">
    <template v-if="menuItem.showIcon" #icon>
      <icon :name="menuItem.showIcon" />
    </template>
    {{ menuItem.name }}
  </t-menu-item>
</template>

<script>
import { Icon } from 'tdesign-icons-vue'

export default {
  name: 'MenuItem',

  components: { Icon },

  props: {
    menuItem: {
      type: Object,
      default: () => ({})
    }
  }
}
</script>

<style lang="scss">
.t-menu__item {
  border-radius: 0;
  --ripple-color: transparent;
}
</style>
