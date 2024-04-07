import Mock from 'mockjs'

Mock.setup({
  timeout: 200
})

const responseBody = data => {
  return {
    code: '200',
    data,
    message: '成功',
    status: true
  }
}

Mock.mock('/mock/platform/security/login-functions/password-encrypt', 'get', () => {
  return responseBody(2)
})

Mock.mock('/mock/platform/login', 'post', () => {
  return responseBody(null)
})

Mock.mock('/mock/platform/security/logout', 'post', () => {
  return responseBody(null)
})

Mock.mock('/mock/getMenu', 'get', () => {
  const { menu, operateList } = Mock.mock({
    'menu|6-10': [
      {
        code: '@word',
        id: '@id',
        name: '@ctitle',
        pid: 0
      }
    ],
    'operateList|10': [
      /^[A-Z]{4,6}_[A-Z]{4,6}$/
    ]
  })
  const res = {
    menu: [
      {
        code: 'SCDD',
        id: 0,
        pid: null,
        name: 'xx系统'
      },
      ...menu
    ],
    operateList
  }
  console.log('menu', res)
  return responseBody(res)
})

Mock.mock('/mock/getUserInfo', 'get', () => {
  const res = Mock.mock({
    user: {
      avatar: Mock.Random.image('32*32', '#50B347'),
      username: '@string',
      userDescription: '@cname'
    }
  })
  console.log('getUserInfo', res)
  return responseBody(res)
})

Mock.mock('/mock/getConfigProp', 'get', () => {
  const res = Mock.mock({
    'alarmColor|3': [
      {
        color: Mock.Random.color(),
        label: '@title',
        level: '@title',
        'value|+1': 1
      }
    ]
  })
  console.log('getConfigProp', res)
  return responseBody(res)
})
