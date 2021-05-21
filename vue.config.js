// glob 是 webpack 安装时依赖的一个第三方模块，该模块允许你使用 * 等符号,
// 例如 lib/*.js 就是获取 lib 文件夹下的所有 js 后缀名的文件
const glob = require('glob')

const path = require('path')

// 对文案输出的一个彩色设置
const chalk = require('chalk')

// 引入postcss-pxtorem 来自https://www.jianshu.com/p/8f9aab666c4a
// const pxtorem = require('postcss-pxtorem')

// https://github.com/youzan/vant-demo/blob/master/viewport/vue.config.js
const autoprefixer = require('autoprefixer')
// https://github.com/evrone/postcss-px-to-viewport/blob/master/README_CN.md
const pxtoviewport = require('postcss-px-to-viewport')

//  首先需要引入filemanager-webpack-plugin插件
const FileManagerPlugin = require('filemanager-webpack-plugin')

// 获取多页面模块
function mulitipage (env, projectname) {
  const pages = {}

  // 判断是否存在模块 S
  let arrChunk = []
  if (projectname && projectname !== 'all') {
    glob.sync('./src/views/*/main.js').forEach(path => {
      const chunk = path.split('./src/views/')[1].split('/main.js')[0]
      arrChunk.push(chunk)
    })
    if (arrChunk.indexOf(projectname) === -1) {
      console.log(chalk.red('不存在[ ' + chalk.green([projectname]) + ' ] 模块，请检查模块名 \n\n'))
      console.log(arrChunk)
    }
  }
  // 判断是否存在模块 E

  if (env === 'development') {
    // 开发环境
    if (projectname === 'all') {
      // 开发环境：[所有]模块
      // 取得相应的页面路径，因为之前的配置，所以是 src 文件夹下的 views 文件夹
      glob.sync('./src/views/*/main.js').forEach(path => {
        const chunk = path.split('./src/views/')[1].split('/main.js')[0] // 设置模块名称
        pages[chunk] = {
          entry: 'src/views/' + chunk + '/main.js', // page 的入口
          template: 'src/views/' + chunk + '/index.html', // 模板来源
          filename: chunk + '.html', // 本地多模块开发时，需要区分模块xxx.html页面，不能相同aa.html,bb.html
          // 当使用 title 选项时，template 中的 title 标签需要是 <title><%= htmlWebpackPlugin.options.title %></title>
          title: chunk,
          // 在这个页面中包含的块，默认情况下会包含,提取出来的通用 chunk 和 vendor chunk。
          chunks: ['chunk-vendors', 'chunk-common', chunk] // >>>>>> 本地开发时不能用相同后缀，与js前缀有关
        }
      })
    } else {
      // 开发环境：[单]模块
      glob.sync('./src/views/*/main.js').forEach(path => {
        const chunk = path.split('./src/views/')[1].split('/main.js')[0]
        if (chunk === projectname) {
          pages[chunk] = {
            entry: 'src/views/' + chunk + '/main.js',
            template: 'src/views/' + chunk + '/index.html',
            filename: 'index.html', // 单模块可以固定 index.html
            title: chunk,
            chunks: ['chunk-vendors', 'chunk-common', chunk]
          }
        }
      })
    }
  } else {
    // 正式环境，打包
    if (projectname === 'all') {
      // 打包，正式环境：所有模块
      console.log(chalk.red('暂时不支持打包：【所有模块】'))
      return false
    } else {
      //  打包，正式环境：【单】模块
      glob.sync('./src/views/*/main.js').forEach(path => {
        const chunk = path.split('./src/views/')[1].split('/main.js')[0]
        if (chunk === projectname) {
          pages[chunk] = {
            entry: 'src/views/' + chunk + '/main.js',
            template: 'src/views/' + chunk + '/index.html',
            filename: 'index.html',
            title: chunk,
            chunks: ['chunk-vendors', 'chunk-common', chunk] // 打包时可以用 >>>>> index：dist/模块文件夹/index.html
          }
        }
      })
    }
  }

  return pages
}

let page = {}
// let projectname = process.argv[3] // build需要：获取执行哪个文件，统一改为下面的 process.env.npm_config_moudle
let projectname = process.env.npm_config_moudle

// 本地开发
// 启动单模块：npm run serve --moudle=index
// 启动所有模块：npm run serve

// 打包
// 打包单模块：npm run build --moudle=index
// xx打包单模块：npm run build 还没适配打包所有模块的配置

if (process.env.NODE_ENV === 'development') {
  // 本地开发
  console.log(chalk.red('当前环境：[ ' + chalk.green('开发环境') + ' ]'))
  if (projectname) {
    console.log(chalk.red('开发环境，尝试启动[ ' + chalk.green('单模块：' + projectname) + ' ] \n\n'))
    page = mulitipage('development', projectname)
  } else {
    console.log(chalk.red('开发环境，尝试启动[ ' + chalk.green('所有') + ' ] 模块 \n\n'))
    page = mulitipage('development', 'all')
  }
} else {
  //  打包
  console.log(chalk.red('当前环境：[ ' + chalk.green('正式环境') + ' ]'))
  if (projectname) {
    // 打包[单模块]
    console.log(chalk.blue('正在尝试打包: [ ' + chalk.green('单模块 ' + projectname) + ' ] \n\n'))
    page[projectname] = mulitipage('production', projectname)
    page = page[projectname]
  } else {
    // 打包[所有]模块
    console.log(chalk.red('正式环境，尝试打包[ ' + chalk.green('所有') + ' ] 模块，暂时不支持 \n\n'))
    // page = mulitipage('production', 'all')
  }
}

function resolve (dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  publicPath: './', // 官方要求修改路径在这里做更改，默认是根目录下，可以自行配置
  outputDir: 'dist/' + projectname, // 标识是打包哪个文件,['dist'+projectname, //标识是打包哪个文件,打包会放在根目录下]
  // 默认情况下，生成的静态资源在它们的文件名中包含了 hash 以便更好的控制缓存。如果你无法使用 Vue CLI 生成的 index HTML，你可以通过将这个选项设为 false 来关闭文件名哈希。
  filenameHashing: false,
  pages: process.env.NODE_ENV === 'development' ? page : page, // 目前实现单一模块打包，因为下面的打包后操作还需要优化
  // pages: process.env.NODE_ENV === 'development' ? page : page[projectname], // 目前实现单一模块打包，因为下面的打包后操作还需要优化
  productionSourceMap: false, // 生产环境 sourceMap，设为false打包时不生成.map文件
  // use thread-loader for babel & TS in production build
  // enabled by default if the machine has more than 1 cores
  parallel: require('os').cpus().length > 1,
  devServer: {
    open: true, // 项目构建成功之后，自动弹出页面
    host: '0.0.0.0', // 主机名，也可以 127.0.0.0 ；真机测试时候设置0.0.0.0，macOS下 ifconfig，本机 ip + port
    port: 8888, // 端口号，默认8080
    https: false, // 协议
    hotOnly: false, // 没啥效果，热模块，webpack已经做好了
    proxy: null // 设置跨域，即将本文件内任何没有匹配到的静态文件，都指向跨域地址
  },
  chainWebpack: (config) => {
    config.resolve.alias
    // 别名引用，import HelloWorld from 'components/HelloWorld' <--> import HelloWorld from '../../components/HelloWorld'
      .set('@', resolve('src'))
      .set('assets', resolve('src/assets'))
      .set('style', resolve('src/assets/style'))
      .set('utils', resolve('src/utils'))
      .set('components', resolve('src/components'))
  },
  configureWebpack: (config) => {
    config.externals = {
      'datas': 'datas'
    }
    const plugins = [
      new FileManagerPlugin({ // 初始化 filemanager-webpack-plugin 插件实例
        events: {
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
        }
      })
    ]
    if (process.env.NODE_ENV === 'production') {
      config.plugins = [...config.plugins, ...plugins]
    }
  },
  css: {
    // 是否使用css分离插件 ExtractTextPlugin
    extract: true,
    // 开启 CSS source maps?
    sourceMap: false,
    // css预设器配置项
    loaderOptions: {
      postcss: {
        plugins: [
          autoprefixer(),
          pxtoviewport({
            // https://blog.segmentfault.net/a/1190000019812737
            viewportWidth: 375, // 设计稿的宽度
            unitPrecision: 5, // px转成vw、vh后小数点保留的位数
            minPixelValue: 1, // 不转化为vw的最小px值,默认为1px
            // 该项仅在使用 Circle 组件时需要
            // 原因参见 https://github.com/youzan/vant/issues/1948
            selectorBlackList: ['van-circle__layer']
          })
        ]
      },
      // pass options to sass-loader
      // 优化scss配置文件的引入,不需要每个页面都引入，直接引用  https://www.jianshu.com/p/3043d474fb86
      sass: {
        // 引入全局变量样式,@使用设置的别名,执行 style 目录
        data: `
        @import 'style/reset.scss';
        @import 'style/common.scss';
        @import 'style/mixin.scss';
        `
      }
    }
  }
}
