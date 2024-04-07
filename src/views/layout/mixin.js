import { Icon } from 'tdesign-icons-vue'

import AsideMenu from './components/menu/aside-menu'
import BookMark from './components/bookmark'
import SystemSetting from './components/setting'
import PageContent from './components/content'

export default {

  components: {
    Icon,
    AsideMenu,
    BookMark,
    SystemSetting,
    PageContent
  },

  data () {
    return {
      iconUrl: require('@/assets/images/logo.png'),
      systemName: process.env.VUE_APP_SYS_NAME,
      collapsed: false,
      mainActive: ''
    }
  },

  computed: {
    fullscreen () {
      return this.$route.meta.fullscreen
    },
    menuTree () {
      return (this.$store.state.app.menuTree || []).map(item => ({ ...item, showIcon: item.showIcon || 'control-platform' }))
    },
    mainMenu () {
      return this.menuTree.map(item => ({ ...item, children: [] }))
    },
    subMenu () {
      const menu = this.menuTree.find(item => item.id === this.mainActive)?.children || []
      return menu.map(item => ({ ...item, showIcon: item.showIcon || 'control-platform' }))
    },
    iconName () {
      return this.collapsed ? 'menu-fold' : 'menu-unfold'
    }
  },

  methods: {
    mainActiveChange (oneLevelMenu) {
      this.mainActive = oneLevelMenu
    }
  }
}
