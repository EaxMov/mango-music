const path = require("path") //引入路径模块
function resolve(dir) {
  return path.join(__dirname, dir)
}
module.exports = {
  productionSourceMap: false, //打包不生成map文件
  publicPath: process.env.NODE_ENV === "production" ? "./" : "/",
  chainWebpack: (config) => {
    config.resolve.alias
      .set("@", resolve("./src"))
      .set("components", resolve("src/components"))
      .set("views", resolve("src/views"))
      .set("assets", resolve("src/assets"))
      .set("network", resolve("src/network"))
      .set("common", resolve("src/common"))
    //set第一个参数：设置的别名，第二个参数：设置的路径
  },
  // presets: ["@vue/cli-plugin-babel/preset"], //生产环境不输出打印
  // env: {
  //   development: {
  //     plugins: ["dynamic-import-node"]
  //   },
  //   production: {
  //     plugins: ["transform-remove-console"]
  //   }
  // }
}
