import JsEncrypt from 'jsencrypt'
import _ from 'lodash'

/**
 * @description 获取页面标题
 */
export const getTitle = title => {
  const pageTitle = process.env.VUE_APP_SYS_NAME

  return title ? `${pageTitle} - ${title}` : pageTitle
}

// RSA 加密
export const RSAEncrypt = (password, publicKey) => {
  const jse = new JsEncrypt()
  jse.setPublicKey(publicKey)
  const encrypted = jse.encrypt(password)
  return encrypted.toString()
}

export const isJSON = str => {
  if (typeof str === 'string') {
    try {
      var obj = JSON.parse(str)
      if (_.isObject(obj) && obj) {
        return true
      } else {
        return false
      }
    } catch (e) {
      return false
    }
  } else {
    return false
  }
}
