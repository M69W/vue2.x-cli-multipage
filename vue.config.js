// glob 是 webpack 安装时依赖的一个第三方模块，该模块允许你使用 * 等符号,
// 例如 lib/*.js 就是获取 lib 文件夹下的所有 js 后缀名的文件
const glob = require('glob')

const path = require('path')

const chalk = require('chalk')// 对文案输出的一个彩色设置

//  首先需要引入filemanager-webpack-plugin插件
const FileManagerPlugin = require('filemanager-webpack-plugin')

// 获取多页面模块
function mulitipage (name) {
  const pages = {}
  // 取得相应的页面路径，因为之前的配置，所以是 src 文件夹下的 views 文件夹
  if (name) {
    glob.sync('./src/views/*/main.js').forEach(path => {
      const chunk = path.split('./src/views/')[1].split('/main.js')[0] // 设置模块名称
      if (chunk === name) {
        pages[chunk] = {
          entry: 'src/views/' + chunk + '/main.js', // page 的入口
          template: 'src/views/' + chunk + '/index.html', // 模板来源
          filename: 'index.html', // 在 dist/index.html 的输出
          // 当使用 title 选项时，template 中的 title 标签需要是 <title><%= htmlWebpackPlugin.options.title %></title>
          title: chunk,
          // 在这个页面中包含的块，默认情况下会包含,提取出来的通用 chunk 和 vendor chunk。
          chunks: ['chunk-vendors', 'chunk-common', chunk] // 打包时可以用index
        }
      }
    })
  } else {
    glob.sync('./src/views/*/main.js').forEach(path => {
      const chunk = path.split('./src/views/')[1].split('/main.js')[0] // 设置模块名称
      pages[chunk] = {
        entry: 'src/views/' + chunk + '/main.js', // page 的入口
        template: 'src/views/' + chunk + '/index.html', // 模板来源
        filename: chunk + '.html', // 本地多模块开发时，需要区分部分页面，不能相同
        // 当使用 title 选项时，template 中的 title 标签需要是 <title><%= htmlWebpackPlugin.options.title %></title>
        title: chunk,
        // 在这个页面中包含的块，默认情况下会包含,提取出来的通用 chunk 和 vendor chunk。
        chunks: ['chunk-vendors', 'chunk-common', chunk] // 本地开发时不能用相同后缀，与js前缀有关
      }
    })
    console.dir(pages)
  }
  return pages
}

let page = {}
let projectname = process.argv[3] // 获取执行哪个文件

if (process.env.NODE_ENV === 'development') {
  page = mulitipage()
} else {
  page[projectname] = mulitipage(projectname)
  console.log(chalk.red('~~>>>>>>正在打包：[ ' + chalk.green([projectname]) + ' ] 模块<<<<<<~~'))
}

function resolve (dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  publicPath: './', // 官方要求修改路径在这里做更改，默认是根目录下，可以自行配置
  outputDir: 'dist/' + projectname, // 标识是打包哪个文件,['dist'+projectname, //标识是打包哪个文件,打包会放在根目录下]
  // 默认情况下，生成的静态资源在它们的文件名中包含了 hash 以便更好的控制缓存。如果你无法使用 Vue CLI 生成的 index HTML，你可以通过将这个选项设为 false 来关闭文件名哈希。
  filenameHashing: false,
  pages: process.env.NODE_ENV === 'development' ? page : page[projectname], // 目前实现单一模块打包，因为下面的打包后操作还需要优化
  productionSourceMap: false, // 生产环境 sourceMap，设为false打包时不生成.map文件
  devServer: {
    open: true, // 项目构建成功之后，自动弹出页面
    host: 'localhost', // 主机名，也可以127.0.0.0 || 做真机测试时候0.0.0.0
    port: 8888, // 端口号，默认8080
    https: false, // 协议
    hotOnly: false, // 没啥效果，热模块，webpack已经做好了
    proxy: null // 设置跨域，即将本文件内任何没有匹配到的静态文件，都指向跨域地址
  },
  configureWebpack: (config) => {
    const plugins = [
      new FileManagerPlugin({ // 初始化 filemanager-webpack-plugin 插件实例
        onStart: {
          delete: [ // 首先需要删除项目根目录下对应页面的zip
            './dist/' + projectname + '.zip'
          ]
        },
        onEnd: {
          // 复制对应的数据文件 到打包模块的目录下
          copy: [
            { source: './src/views/' + projectname + '/datas.js', destination: './dist/' + projectname + '/' }
          ],
          archive: [ // 然后我们选择dist文件夹将之打包成对应页面的zip并放在根目录
            { source: './dist/' + projectname, destination: './dist/' + projectname + '.zip' }
          ]
        }
      }),
    ]
    if (process.env.NODE_ENV === 'production') {
      config.plugins = [...config.plugins, ...plugins]
    }
  }
}
