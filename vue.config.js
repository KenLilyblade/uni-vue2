const TransformPages = require('uni-read-pages')
const { webpack } = new TransformPages()
module.exports = {
  filenameHashing: false,
  pluginOptions: {
    windicss: {}
  },
  devServer: {
    host: '0.0.0.0',
    port: 8000,
    https: false,
    open: true,
    proxy: {
      '/': {
        target: process.env.VUE_APP_WEB_URL,
        changOrigin: true,
        // ws:true,
        pathRewrite: {
          '^/': ''
        }
      }
    }
  },
  configureWebpack: {
    plugins: [
      new webpack.DefinePlugin({
        ROUTES: webpack.DefinePlugin.runtimeValue(() => {
          const tfPages = new TransformPages({
            includes: ['path', 'name', 'aliasPath', 'meta']
          })
          return JSON.stringify(tfPages.routes)
        }, true)
      })
    ]
  }
}
