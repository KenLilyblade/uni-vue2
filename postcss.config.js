const path = require('path')
module.exports = {
  parser: require('postcss-comment'),
  plugins: [
    require('postcss-import')({
      resolve(id, basedir, importOptions) {
        if (id.startsWith('~@/')) {
          return path.resolve(process.env.UNI_INPUT_DIR, id.substr(3))
        } else if (id.startsWith('@/')) {
          return path.resolve(process.env.UNI_INPUT_DIR, id.substr(2))
        } else if (id.startsWith('/') && !id.startsWith('//')) {
          return path.resolve(process.env.UNI_INPUT_DIR, id.substr(1))
        }
        return id
      }
    }),
    // require('autoprefixer')({
    //   remove: process.env.UNI_PLATFORM !== 'h5'
    // }),
    // require('postcss-class-rename')({
    //   '\\\.': '_' // 兼容小程序，将类名带 .和/ 替换成 _
    // }),
    ...(process.env.UNI_PLATFORM !== 'h5'
      ? [
          // 使用postcss-class-name 包将小程序不支持的类名写法转换为支持的类名，如："hover:xxx"
          require('postcss-class-rename')({
            '\\\\.': '_' // 兼容小程序，将类名带 .和/ 替换成 _
          })
        ]
      : [
          // require('autoprefixer')({
          //   remove: true
          // })
        ]),
    require('@dcloudio/vue-cli-plugin-uni/packages/postcss')
  ]
}
