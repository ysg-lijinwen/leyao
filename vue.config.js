const path = require('path')

module.exports = {
  publicPath: '/leyao',  // 可以设置成相对路径，这样所有的资源都会被链接为相对路径，打出来的包可以被部署在任意路径
  outputDir: "leyao",  //打包时生成的生产环境构建文件的目录
  assetsDir: 'static',  // 放置生成的静态资源 (js、css、img、fonts) 的 (相对于 outputDir 的) 目录
  productionSourceMap: false,
  css: {
    loaderOptions: {
      postcss: {
        plugins: [
          require('postcss-px-to-viewport')({
            unitToConvert: 'px',
            viewportWidth: 1920,
            viewportHeight: 1080,//视窗的高度，对应的是我们设计稿的高度
            unitPrecision: 5,
            propList: ['*'],
            viewportUnit: 'vw',
            fontViewportUnit: 'vw',
            selectorBlackList: [],
            minPixelValue: 1,
            mediaQuery: false,
            replace: true,
            exclude: /([/\\])(node_modules)([/\\])/
          })
        ]
      }
    }
  },
  configureWebpack: (config) => {
    //配置资源别名
    config['resolve'].alias = {
      "@": path.resolve(__dirname, "src")
    }
    // 判断为生产模式下，开发模式保存console
    if (process.env.NODE_ENV === 'production') {
      config.optimization.minimizer.map((arg) => {
        const option = arg.options.terserOptions.compress
        // 打开忽略console开关
        option.drop_console = true
        return arg
      })
    }
  },
  // chainWebpack: config => {
  //   //设置全局文件的引入
  //   const types = ['vue-modules', 'vue', 'normal-modules', 'normal']
  //   types.forEach(type => addStyleResource(config.module.rule('stylus').oneOf(type)))
  // }
}

// function resolve(dir) {
//   return path.join(__dirname, dir)
// }

// function addStyleResource(rule) {
//   rule.use('style-resource')
//     .loader('style-resources-loader')
//     .options({
//       patterns: [
//         resolve('src/assets/css/stylus/mixins.styl')
//       ],
//     })
// }
