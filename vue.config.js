const path = require('path')

function resolve (dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  publicPath: '/zhsw',
  assetsDir: 'static',
  lintOnSave: true,
  productionSourceMap: false,
  configureWebpack: {
    externals: {},
    optimization: {
      splitChunks: {
        chunks: 'all',
        minSize: 300 * 1024,
        maxSize: 1024 * 1024
      }
    },
    devtool: 'source-map'
  },
  chainWebpack: config => {
    config.plugin('html').tap(args => {
      args[0].title = process.env.VUE_APP_SYS_NAME
      return args
    })
    config.module.rule('svg').exclude.add(resolve('src/icons')).end()
    config.module
      .rule('icons')
      .test(/\.svg$/)
      .include.add(resolve('src/icons'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      })
      .end()
  }
}
