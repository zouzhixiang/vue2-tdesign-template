// 框架通用接口
import request from '@/utils/request'

// 获取系统用户密码是否加密
export const passwordEncrypt = () => {
  return request({
    url: '/platform/security/login-functions/password-encrypt'
  })
}

// 获取密码加密公钥
export const encryptPublicKey = () => {
  return request({
    url: '/platform/security/login-functions/encrypt-public-key'
  })
}

export const login = ({ username, password }) => {
  return request({
    url: '/platform/login',
    method: 'post',
    data: {
      username,
      password
    }
  })
}

// session 登出
export const logout = () => {
  return request({
    url: '/platform/security/logout',
    method: 'post'
  })
}

/**
 * 获取用户信息
 */
export const getUserInfo = () => {
  return request({
    url: '/getUserInfo'
  })
}

/**
 * 获取平台配置信息
 */
export const getConfigProp = () => {
  return request({
    url: '/getConfigProp'
  })
}

/**
 * 获取用户菜单权限列表
 */
export const getAsyncRoutes = () => {
  return request({
    url: '/getMenu'
  })
}
