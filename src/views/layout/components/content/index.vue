<template>
  <t-content>
    <t-breadcrumb v-if="!fullscreen && hasBreadcrumb">
      <t-breadcrumbItem v-for="(name, index) in breadcrumb" :key="index">{{ name }}</t-breadcrumbItem>
    </t-breadcrumb>
    <section :style="{ padding: fullscreen || noPadding ? 0 : '10px 12px' }">
      <transition name="out-in" mode="out-in">
        <router-view :key="key"></router-view>
      </transition>
    </section>
    <footer v-if="!fullscreen && hasCopyright">Copyright © xxxx-{{ currentYear }} xxx有限公司</footer>
  </t-content>
</template>

<script>
export default {

  data () {
    return {
      currentYear: new Date().getFullYear(),
      breadcrumb: []
    }
  },

  computed: {
    fullscreen () {
      return this.$route.meta.fullscreen
    },
    hasBreadcrumb () {
      return this.$route.meta.breadcrumb
    },
    hasCopyright () {
      return this.$route.meta.copyright
    },
    noPadding () {
      return this.$route.meta.noPadding
    },
    cachedViews () {
      return this.$store.state.bookmark.cachedViews
    },
    key () {
      return this.$route.path
    }
  },

  watch: {
    $route: {
      handler (route) {
        if (route.meta.parents) {
          this.breadcrumb = [...route.meta.parents.map(item => item.name), route.meta.title]
        }
      },
      immediate: true
    }
  }
}
</script>

<style lang="scss" scoped>
.t-layout__content {
  overflow: hidden;
  display: flex;
  flex-direction: column;

  > section {
    flex: 1;
    overflow: auto;
  }

  > footer {
    text-align: center;
  }
}
.t-breadcrumb {
  margin: 4px 16px;
}
.out-in-leave-active {
  animation: fade-out-left 0.6s;
}
.out-in-enter-active {
  animation: fade-in-left 0.6s;
}
@keyframes fade-out-left {
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
    transform: translateX(-30px);
  }
}
@keyframes fade-in-left {
  from {
    opacity: 0;
    transform: translateX(-30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
