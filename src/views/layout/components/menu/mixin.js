import MenuItem from './menu-item'

export default {

  components: { MenuItem },

  props: {
    menu: Array,
    isMain: Boolean,
    mainActive: String
  },

  data () {
    return {
      value: '',
      expanded: []
    }
  },

  computed: {
    menuTree () {
      return this.$store.state.app.menuTree
    },
    leafMenu () {
      return this.$store.state.app.leafMenu
    },
    redirectRoutes () {
      return this.$store.state.app.redirectRoutes
    }
  },

  watch: {
    $route: {
      handler (to, from) {
        const { isMain, redirectRoutes, $router, leafMenu } = this
        if (!isMain) {
          if (to.meta.id) {
            this.setActiveMenu(to.meta.id, to.meta.parents)
          } else if (to.query.menuId) {
            const { parents } = leafMenu.find(item => item.id === to.query.menuId)
            this.setActiveMenu(to.query.menuId, parents)
          } else {
            const menuId = redirectRoutes[decodeURIComponent(to.redirectedFrom)] || from.meta.id || from.query.menuId
            menuId && $router.replace({ ...to, query: { ...to.query, menuId } })
          }
        }
      },
      immediate: true
    },
    mainActive (value) {
      if (this.isMain && this.value !== value) {
        this.value = value
      }
    }
  },

  methods: {
    menuChange (value) {
      const { isMain, menuTree, leafMenu } = this
      const { defaultPath } = [...menuTree, ...leafMenu].find(item => item.id === value)
      this.$router.push(defaultPath)
      if (isMain) {
        this.$emit('one-level-menu', value)
      }
    },
    setActiveMenu (id, parents) {
      this.value = id
      this.expanded = parents.map(item => item.id)
      this.$emit('one-level-menu', parents[0].id)
    }
  }
}
