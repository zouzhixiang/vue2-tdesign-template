import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { publicRoutes } from '@/router/routes'
import { getTitle } from '@/utils'

Vue.use(VueRouter)

const originalPush = VueRouter.prototype.push
const originalReplace = VueRouter.prototype.replace
// push
VueRouter.prototype.push = function push (location, onResolve, onReject) {
  if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject)
  return originalPush.call(this, location).catch(err => err)
}
// replace
VueRouter.prototype.replace = function push (location, onResolve, onReject) {
  if (onResolve || onReject) return originalReplace.call(this, location, onResolve, onReject)
  return originalReplace.call(this, location).catch(err => err)
}

const createRouter = () => new VueRouter({ routes: publicRoutes })
const router = createRouter()

const whiteList = ['login']

NProgress.configure({ showSpinner: false })

// 路由权限控制
router.beforeEach(async (to, from, next) => {
  console.log(router.getRoutes())
  NProgress.start()

  document.title = getTitle(to.meta.title)
  const menuTree = store.state.app.menuTree
  const routeTree = store.state.app.routeTree

  if (menuTree && routeTree) {
    if (!to.matched.length) {
      router.addRoutes(routeTree)
      next({ ...to, replace: true })
    }

    if (to.name === 'login') {
      next({ path: '/' })
    } else {
      next()
    }
  } else {
    if (whiteList.includes(to.name)) {
      next()
    } else {
      const accessRoutes = await store.dispatch('app/getMenu')
      router.addRoutes(accessRoutes)
      next({ ...to, replace: true })
    }
  }
})

router.afterEach(() => {
  NProgress.done()
})

export const resetRouter = () => {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher
}

export default router
