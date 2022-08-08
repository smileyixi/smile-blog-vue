
const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,
  devServer: {
    proxy:{
      '/upload':{  //表示拦截以/api开头的请求路径
        target:'https://www.imgurl.org/api/v2/upload',
        changOrigin: true,  //是否开启跨域
        pathRewrite:{
          '^/upload':''
        }
      },
    },
    // proxy:{
    //   '/api':{  //表示拦截以/api开头的请求路径
    //     target:'http://127.0.0.1:8888',
    //     changOrigin: true,  //是否开启跨域
    //     // pathRewrite:{
    //     //   '^/pic':''
    //     // }
    //   },
    // }
  }
  
  // productionSourceMap: false // 禁止生产map js
})

