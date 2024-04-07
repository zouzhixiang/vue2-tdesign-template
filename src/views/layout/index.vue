<template>
  <layout-classical v-if="layout === 'layout-classical'" />
  <layout-haiyan v-else-if="layout === 'layout-haiyan'" />
  <layout-default v-else-if="layout === 'layout-default'" />
</template>

<script>
import LayoutDefault from './layout-default'
import LayoutClassical from './layout-classical'
import LayoutHaiyan from './layout-haiyan'

export default {

  components: {
    LayoutDefault,
    LayoutClassical,
    LayoutHaiyan
  },

  computed: {
    layout () {
      return this.$store.state.app.layout
    }
  }

}
</script>
