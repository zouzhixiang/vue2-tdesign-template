import {
  passwordEncrypt,
  encryptPublicKey,
  login,
  logout,
  getUserInfo,
  getConfigProp,
  getAsyncRoutes
} from '@/api'
import { resetRouter } from '@/router'
import { asyncRoutes } from '@/router/routes'
import { RSAEncrypt, isJSON } from '@/utils'
import _ from 'lodash'
import { MessagePlugin } from 'tdesign-vue'
import Layout from '@/views/layout'
import EmptyView from '@/views/app/empty'
import ErrorView from '@/views/app/error'

/**
 * 根据后端返回权限列表判断是否有该路由的权限
 * @param { Array } route
 * @param { Array } permissions
 */
const hasPermission = (route, permissions) => {
  if (route.meta && route.meta.code) {
    return permissions.includes(route.meta.code)
  } else if (route.meta && route.meta.access) {
    return route.meta.access
  } else {
    return route.children && route.children.length > 0
  }
}

/**
 * 根据后端返回的菜单列表生成菜单树
 * @param { Array } menu
 * @param { Object } root
 */
const generateMenuTree = (menu, root) => {
  let oneLevelMenu = null
  let permissions = [root.code]
  let parentMenu = []
  const leafMenu = []

  const handle = parent => {
    const items = menu.filter(item => item.pid === parent.id).sort((a, b) => a.sortValue - b.sortValue)
    permissions = permissions.concat(items.map(item => item.code))

    items.forEach((item, index) => {
      if (parent.id !== root.id) {
        const index = parentMenu.findIndex(item => item.id === parent.id)
        index < 0 ? parentMenu.push(parent) : (parentMenu = parentMenu.slice(0, index + 1))
      } else {
        parentMenu = []
        oneLevelMenu = item
      }

      const children = handle(item)
      item.children = children

      if (!children.length) {
        item.parents = parentMenu
        leafMenu.push(item)
        if (index === 0) {
          oneLevelMenu.defaultPathCode ??= item.code
        }
      }
    })
    return items
  }

  return { menuTree: handle(root), leafMenu, permissions }
}

/**
 * 根据后端返回的菜单权限结合前端路由生成最终的路由列表
 * @param { Array } routes
 * @param { Array } permissions
 * @param { Array } leafMenu
 */
const filterRoutes = (routes, permissions, leafMenu) => {
  const hasRouteMenu = []
  const redirectRoutes = {}

  const handle = (routes, paths) => {
    const arr = []
    routes.forEach(route => {
      if (hasPermission(route, permissions)) {
        const path = paths + (route.path.startsWith('/') ? route.path : '/' + route.path)
        if (route.children && route.children.length) {
          route.children = handle(route.children, path)
        } else {
          if (route.meta.code) {
            const menuItem = leafMenu.find(item => item.code === route.meta.code)
            if (menuItem) {
              // TODO redirect 逻辑临时处理方案
              if (route.redirect) {
                redirectRoutes[path] = menuItem.id
              }
              // 一级菜单默认跳转路径
              const oneLevelMenu = menuItem.parents.length ? menuItem.parents[0] : menuItem
              if (oneLevelMenu.defaultPathCode === route.meta.code) {
                oneLevelMenu.defaultPath ??= path
              }
              // 叶子节点菜单默认跳转路径
              menuItem.defaultPath ??= path
              // 当前路由对应的菜单信息
              route.meta.id = menuItem.id
              route.meta.parents = menuItem.parents
              route.meta.props = isJSON(menuItem.description) ? JSON.parse(menuItem.description) : {}
              // 已找到对应路由的菜单集合更新
              if (!hasRouteMenu.includes(menuItem.id)) {
                route.meta.title = menuItem.name
                hasRouteMenu.push(menuItem.id)
              }
            } else {
              console.error(`${route.path} 路由无法找到对应的叶子节点菜单`)
            }
          } else {
            console.warn(`${route.path} 路由无法找到对应的叶子节点菜单`)
          }
        }
        arr.push(route)
      }
    })
    return arr
  }

  const permissionRoutes = handle(routes, '').filter(item => item.children.length > 0)

  const emptyRouteMenu = leafMenu.filter(item => !hasRouteMenu.includes(item.id))
  if (emptyRouteMenu.length) {
    emptyRouteMenu.forEach(menuItem => {
      const defaultPath = '/empty/' + menuItem.id
      const oneLevelMenu = menuItem.parents.length ? menuItem.parents[0] : menuItem
      if (oneLevelMenu.defaultPathCode === menuItem.code) {
        oneLevelMenu.defaultPath ??= defaultPath
      }
      menuItem.defaultPath ??= defaultPath
    })
  }

  return { permissionRoutes, emptyRouteMenu, redirectRoutes }
}

const state = {
  menuTree: null,
  leafMenu: null,
  routeTree: null,
  redirectRoutes: null,
  permissionCodes: null,
  userInfo: null,
  platformConfig: null,
  layout: 'layout-classical',
  theme: 'darkGreen'
}

const mutations = {
  SET_MENU_TREE (state, menuTree) {
    state.menuTree = menuTree
  },
  SET_LEAF_MENU (state, leafMenu) {
    state.leafMenu = leafMenu
  },
  SET_ROUTE_TREE (state, routeTree) {
    state.routeTree = routeTree
  },
  SET_REDIRECT_ROUTES (state, redirectRoutes) {
    state.redirectRoutes = redirectRoutes
  },
  SET_PERMISSION_CODES (state, codes) {
    state.permissionCodes = codes
  },
  SET_USER_INFO (state, userInfo) {
    state.userInfo = userInfo
  },
  SET_PLATFORM_CONFIG (state, config) {
    state.platformConfig = config
  },
  SET_LAYOUT (state, layout) {
    state.layout = layout
  },
  SET_THEME (state, theme) {
    state.theme = theme
  }
}

const actions = {
  // 登录
  async login ({ dispatch }, params) {
    const { data } = await passwordEncrypt()
    if (data === 1) {
      const { data } = await encryptPublicKey()
      params.password = RSAEncrypt(params.password, data)
    }

    return new Promise((resolve, reject) => {
      login(params)
        .then(async () => {
          await dispatch('getMenu')
          resolve()
        })
        .catch(error => {
          reject(error)
        })
    })
  },
  // 获取用户权限菜单
  getMenu ({ commit, dispatch }) {
    return new Promise((resolve, reject) => {
      getAsyncRoutes()
        .then(response => {
          dispatch('getUserInfo')
          dispatch('getConfigProp')

          if (response?.data?.menu?.length) {
            const menuWithoutPanel = response.data.menu.filter(item => !((item.linkUrl && item.linkUrl.startsWith('PANEL_'))))
            const menu = _.cloneDeep(menuWithoutPanel)
            const root = menu.find(item => item.code === process.env.VUE_APP_MENU_ROOT_CODE)
            if (root) {
              const { menuTree, leafMenu, permissions } = generateMenuTree(menu, root)
              const { permissionRoutes, emptyRouteMenu, redirectRoutes } = filterRoutes(asyncRoutes, permissions, leafMenu)
              const routeTree = [
                {
                  path: '/',
                  redirect: menuTree[0].defaultPath
                },
                ...permissionRoutes,
                {
                  path: '/empty',
                  component: Layout,
                  children: emptyRouteMenu.map(item => {
                    return {
                      path: item.id,
                      name: item.id,
                      component: EmptyView,
                      meta: {
                        id: item.id,
                        title: item.name,
                        parents: item.parents,
                        breadcrumb: true,
                        copyright: true
                      }
                    }
                  })
                },
                {
                  path: '*',
                  component: ErrorView
                }
              ]

              console.log('menuTree', _.cloneDeep(menuTree))
              console.log('leafMenu', _.cloneDeep(leafMenu))
              console.log('routeTree', _.cloneDeep(routeTree))

              commit('SET_MENU_TREE', menuTree)
              commit('SET_LEAF_MENU', leafMenu)
              commit('SET_ROUTE_TREE', routeTree)
              commit('SET_REDIRECT_ROUTES', redirectRoutes)
              commit('SET_PERMISSION_CODES', response.data.operateList.map(item => item.code))

              resolve(routeTree)
            } else {
              console.error('未找到根节点菜单!')
            }
          } else {
            const message = '当前用户无任何菜单权限'
            MessagePlugin.warning(message)
            reject(new Error(message))
          }
        })
        .catch(error => {
          reject(error)
        })
    })
  },
  // 获取用户信息
  getUserInfo ({ commit }) {
    return new Promise((resolve, reject) => {
      getUserInfo()
        .then(res => {
          commit('SET_USER_INFO', res.data.user)
          resolve()
        })
        .catch(error => {
          reject(error)
        })
    })
  },
  // 获取平台配置信息
  getConfigProp ({ commit }) {
    return new Promise((resolve, reject) => {
      getConfigProp()
        .then(res => {
          commit('SET_PLATFORM_CONFIG', res.data)
          resolve()
        })
        .catch(error => {
          reject(error)
        })
    })
  },
  // 登出
  logout ({ dispatch }) {
    return new Promise((resolve, reject) => {
      logout()
        .then(() => {
          dispatch('clearToken')
          dispatch('bookmark/delAllViews', null, { root: true })
          resolve()
        })
        .catch(error => {
          reject(error)
        })
    })
  },
  // 编程式登出
  clearToken ({ commit }) {
    return new Promise(resolve => {
      commit('SET_MENU_TREE', null)
      commit('SET_LEAF_MENU', null)
      commit('SET_REDIRECT_ROUTES', null)
      commit('SET_PERMISSION_CODES', null)
      commit('SET_USER_INFO', null)
      commit('SET_PLATFORM_CONFIG', null)
      resetRouter()
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
