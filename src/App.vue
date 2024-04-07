<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import * as themes from './style/theme'

export default {
  computed: {
    layout () {
      return this.$store.state.app.layout
    },
    theme () {
      return this.$store.state.app.theme
    }
  },
  watch: {
    layout: {
      handler (layout) {
        document.body.className = layout
      },
      immediate: true
    },
    theme: {
      handler (theme) {
        if (themes[theme]) {
          themes[theme].forEach((brandColor, index) => {
            document.documentElement.style.setProperty(`--td-brand-color-${index + 1}`, brandColor)
          })
        }
      },
      immediate: true
    }
  }
}
</script>
