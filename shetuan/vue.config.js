const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  //基础路径
  // publicPath:process.env.NODE_ENV === 'production' ? '/dish/' : './',
  // publicPath:'./',
  // outputDir:'dist',
  // assetsDir: 'static',
  // indexPath: './index.html',
  transpileDependencies: true,
  devServer: {
    port: 8082,//设置端口号
    proxy:{
      '/shetuan/':{
        target: 'http://localhost:8080',
        changeOrigin: true,
        post: 'localhost',
        pathRewrite: {
          '^/shetuan/': '/shetuan/'
        }
      }
    }
  },
})
