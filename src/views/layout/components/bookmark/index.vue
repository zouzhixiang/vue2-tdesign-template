<template>
  <div class="hc-bookmark">
    <t-tabs v-model="currentPath" @change="tabChange" @remove="closeSelectedTag">
      <t-tab-panel v-for="item in visitedViews" :key="item.path" :value="item.path" :label="item.title" :removable="visitedViews.length > 1"></t-tab-panel>
    </t-tabs>
    <t-dropdown :options="options" :maxHeight="500" :maxColumnWidth="140" @click="clickDropdown">
      <div class="t-tabs__btn--right t-tabs__btn t-size-m">
        <icon name="menu-application" />
      </div>
    </t-dropdown>
  </div>
</template>

<script>
import { Icon } from 'tdesign-icons-vue'

export default {

  components: { Icon },

  data () {
    return {
      currentPath: ''
    }
  },

  computed: {
    visitedViews () {
      return this.$store.state.bookmark.visitedViews
    },
    options () {
      const { currentPath, visitedViews } = this
      return [
        {
          content: '关闭当前标签页',
          value: 0,
          theme: 'error',
          disabled: visitedViews.length === 1
        },
        {
          content: '关闭其他标签页',
          value: 1,
          theme: 'error',
          disabled: visitedViews.length === 1,
          divider: true
        },
        ...visitedViews.map(item => {
          return {
            content: item.title,
            value: item.path,
            theme: item.path === currentPath ? 'success' : 'default',
            disabled: item.path === currentPath,
            prefixIcon: h => {
              return <Icon name="discount" />
            }
          }
        })
      ]
    }
  },

  watch: {
    $route () {
      this.addBookmark()
      this.moveToCurrentTag()
    }
  },

  mounted () {
    this.addBookmark()
    this.moveToCurrentTag()
  },

  methods: {
    tabChange (value) {
      const route = this.visitedViews.find(view => view.path === value)
      this.$router.push({ ...route })
    },
    addBookmark () {
      this.$store.dispatch('bookmark/addView', this.$route)
    },
    moveToCurrentTag () {
      this.currentPath = this.$route.path
    },
    closeSelectedTag ({ value }) {
      const view = this.visitedViews.find(item => item.path === value)
      const isActive = view.path === this.$route.path
      this.$store.dispatch('bookmark/delView', view).then(({ visitedViews }) => {
        if (isActive) {
          this.toLastView(visitedViews)
        }
      })
    },
    closeOthersTags () {
      const route = this.visitedViews.find(view => view.path === this.currentPath)
      this.$store.dispatch('bookmark/delOthersViews', route).then(() => {
        this.moveToCurrentTag()
      })
    },
    toLastView (visitedViews) {
      const latestView = visitedViews.slice(-1)[0]
      if (latestView) {
        this.$router.push({ ...latestView })
      }
    },
    clickDropdown (data) {
      switch (data.value) {
        case 0:
          this.closeSelectedTag({ value: this.currentPath })
          break
        case 1:
          this.closeOthersTags()
          break
        default:
          this.tabChange(data.value)
          this.moveToCurrentTag()
          break
      }
    }
  }
}
</script>

<style lang="scss">
.hc-bookmark {
  flex: 1;
  display: flex;
  align-items: flex-end;
  overflow: hidden;

  .t-tabs {
    flex: 1;
    color: var(--td-text-color-regular);
  }

  .t-tabs__nav-item {
    height: var(--td-comp-size-xl);
    font: var(--td-font-body-large);
    text-shadow: none;
    color: inherit;
    padding: 0 var(--td-comp-paddingLR-l);
    margin-left: var(--td-comp-margin-s);
    margin-right: var(--td-comp-margin-s);
    border-radius: var(--td-radius-large) var(--td-radius-large) 0 0;
    overflow: visible;
    --ripple-color: transparent;
  }

  .t-tabs__nav-item.t-is-active {
    color: var(--td-text-color-secondary);
    background-color: var(--td-bg-color-component-active);

    &::before {
      position: absolute;
      left: -7px;
      bottom: 0;
      content: "";
      width: 7px;
      height: 7px;
      background-color: inherit;
      clip-path: path(
        "M0 6.93811V7H7V0H6.93811C6.48686 3.61872 3.61872 6.48686 0 6.93811Z"
      );
    }

    &::after {
      position: absolute;
      right: -7px;
      bottom: 0;
      content: "";
      width: 7px;
      height: 7px;
      background-color: inherit;
      clip-path: path(
        "M7 6.93811V7H0V0H0.0618939C0.513142 3.61872 3.38128 6.48686 7 6.93811Z"
      );
    }
  }

  .t-tabs__nav-item-wrapper {
    margin-left: 0;
    margin-right: 0;
    padding: 0;
    height: 100%;
    position: relative;
    --ripple-color: transparent;
  }

  .t-tabs__nav-item:not(.t-is-disabled):not(.t-is-active):hover
    .t-tabs__nav-item-wrapper {
    background-color: transparent;
  }

  .t-tabs__nav-item > .remove-btn {
    margin-left: var(--td-comp-margin-xs);
    margin-bottom: -2px;
  }

  .t-tabs__bar {
    display: none;
  }

  .t-tabs__nav-container.t-is-top::after {
    display: none;
  }

  .t-tabs__btn {
    width: 32px;
    height: var(--td-comp-size-xl);
    line-height: var(--td-comp-size-xl);
    border-left: none;
    box-shadow: none;
    background-color: var(--td-bg-color-container);
  }

  .t-tabs__btn--left {
    margin-right: var(--td-comp-margin-s);
  }

  .t-tabs__operations--right .t-tabs__btn:first-child {
    border-left: 1px solid var(--td-component-stroke);
    margin-left: var(--td-comp-margin-s);
    box-shadow: none;
  }
}
</style>
