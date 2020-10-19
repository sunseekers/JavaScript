const path=require('path')
const HappyPack = require('happypack')//把打包任务分解成多个子进程并发的去执行
module.exports={
  //entry表示入口，webpack执行构建的第一步将从Entry开始，可抽象成输入
  //类型可以是 string，object，array
  entry:'./app/entry',//只有一个入口，入口只有一个文件
  entry:['./app/entry1','./app/entry2'],//只有一个入口，入口有两个文件
  entry:{//与两个入口
    a:'./app/entry-a',
    b:['./app/entry-b1','./app/entry-b2']
  },
  //如何输出结果，在webpack经过一系类处理后，如何输出最终想要的代码
  output:{
    //输出文件放的目录，必须是string类型的绝对路径
    path:path.resolve(__dirname,'dist'),
    //输出文件的名称
    filename:'bundle.js',//完整的名称
    filename:'[name].js',//在配置了多个entry时，通过名称模板为不同的entry生成不同的文件名称
    filename:'[chunk].[hash].js',//根据文件内容的Hash值生成文件的名称，浏览器长时间缓存文件
    //发布到线上的所有资源的URL前缀，为string
    publicPath:'./assets/',//放到指定目录下
    publicPath:'',//放到根目录下
    publicPath:'https://cdn/example.com',//放到CDN上
    //到出库的名称，为string，不填他时，默认的输出格式是匿名的立即执行函数
    library:'MyLibrary',
    //导出库的类型，为枚举类型，默认是var
    //numd,num2,commonjs2,commonjs,amd,this,var,assign,window,global,jsonp,可以是这些类型
    libraryTarget:'umd',
    //是否包含有用的文件路径信息到生成代码里，为booleanleix
    pathinfo:true,
    //附加chunk的文件名称
    chunkFilename:'[id].js',
    chunkFilename:'[chunkhash].js',
    //JSON异步加载资源时回调函数名称，需要和服务端搭配
    jsonpFunction:'myWebpackJsonp',
    //生成Source Map文件的名称
    sourceMapFilename:'[file].map',
    //浏览器开发者工具里面显示的资源模块名称
    devtoolModuleFilenameTemplate:'webpack:///[resouce-path]',
    //异步加载跨域的资源时使用的方式
    crossOriginLoading:'use-credentials',
    crossOriginLoading:'aninymous',
    crossOriginLoading:'false',
  },
  optimization:{//提取公共代码
    splitChunks:{
      cacheGroups:{
        //不同页面之间的公共模块
        commons:{
          chunks:'initial',//最开始的模块
          minChunks:2,//最少有两个复用
        },
        //第三方模块
        vendor:{
          chunks:'initial',//最开始的模块
          test:/node_modules/,
          name:"vendor"
        }
      }  
    }
  }
  //配置模块相关
  module:{
    rules:[//配置Loader
      {
        test:/\.jsx?$/,//正则匹配命中要使用Loader的文件
        include:[//只会命中这里面的文件
          path.resolve(__dirname,'app')
        ],
        exclude:[//忽略这里面的文件
          path.resolve(__dirname,'app/demo-files')
        ],
        use:[//使用哪些Loader,有先后次序，从后往前
          'style-loader',//直接使用Loader的名称
          {
            loader:'css-loader',
            options:{
              //向html-loader传一些参数
              presets:[//映射
                ['env',{modules:false}]//不编译成ES5语法
              ]
            }
          }
        ]
      },
      {
        test:/\.css?$/,
        use:'happypack.loader?id=css',//使用多子进程编译
        include:path.resolve('./src'),
        exclude:/node_modules/
      }
    ],
    noParse:[//不用接喜欢和处理的模块
      /special-library\.js$///用正则匹配
    ],
    plugins:[
      new HappyPack({
        id:'css',
        loader:['style-loader','css-loader']
      }),
      new HappyPack({
        id:'balel',
        loader:['balel-loader']
      }),
      new WebpackParalleUglifyPlugin()//js文件的串行压缩变为开启多个子进程并行执行
    ],//配置插件
    //配置寻找模块的规则
    resolve:{
      modules:[//寻找模块的根目录，为array类型，默认以node_modules为根目录
        'node_modules',
        path.resolve(__dirname,'app')
      ],
      extensions:['.js','.json','.jsx','.css'],//模块的后缀名
      alias:{//模块别名配置，用于映射模块
        //将'module'映射成'new-module',同样'module/path/file'也会被映射成'new-module/path/file'
        'module':'new-module',
        //使用结尾符$后，将'only-module'映射成'new-module'，
        //但是不想上面说的'module/path/file'不也会被映射成'new-module/path/file'
        'only-module$':'new-module',
      },
      alias:[//alias还支持使用数组来更详细地进行配置
        {
          name:'module',//老模块
          alias:'new-module',//新模块
          //是否映射模块，如果是true，则只有'module'会被映射，如果是false,'module/inner/path'也会被映射
          onlyModule:true
        }
      ],
      symlinks:true,//是否跟随文件的软连接去搜索模块的路径
      descriptionFiles:['package.json'],//模块的描述文件
      mainFields:['main'],//模块的描述文件里面描述的入口文件的字段名
      enforeExtension:false,//是否强制导入语句写明后缀名
    },
    //输出文件的性能检查配置
    performance:{
      hints:'warning',//有性能问题时输出警告
      hints:'error',//有性能问题时输出错误
      hints:false,//关闭性能检查
      maxAssetSize:200000,//最大文件的大小(单位为bytes)
      maxEntrypointSize:400000,//最大入口文件的大小
      assetFilter:function(assetFilename){//过滤要检查的文件
        return assetFilename.endsWith('.css')||assetFilename.endsWith('.js')
      }
    },
    devtool:'source-map',//配置source-map类型
    context:__dirname,//Webpack使用的根目录，string类型必须是绝对路径
    target:'web',//浏览器默认
    target:'webworker',//WebWorker
    target:'node',//Node.js,使用'require'语句加载Chunk代码
    target:'async-node',//nw.js
    target:'electron-main',//electron，主线程
    target:'electron-renderer',//electron,渲染线程
    externals:{//使用来自JavaScript运行环境提供的全局变量
      jquery:'jQuery'
    },
    stats:{//控制台输出日志控制
      assets:true,
      colors:true,
      errors:true,
      errorDetails:true,
      hash:true
    },
    devServer:{//DevServer相关的配置
      proxy:{//代理到后端服务接口
        '/api':'http://loaclhost:3000'
      },
      //配置DevServer HTTP 服务器的文件根目录
      contentBase:path.join(__disname,'public'),
      compress:true,//是否启开Gzip压缩
      historyApiFallback:true,//是否开放HTML5 History API 网页
      hot:true,//启动模块热加载，需要引入webpack.HotModuleReplacementPlugin()插件
      https:false,//是否开启HTTPS模式
      inline:true,//在打包文件注入一个websocket客户端
      open:true,//打开浏览器
    },
    profile:true,//是否捕捉Webpack构建的性能信息，用于分析说明原因导致构建性能不佳
    cache:false,//是否启用缓存来提升速度
    watch:true,//表示是否监控源文件的变化，当源文件发生变化之后，重新打包
    wathOpyions:{//监听模式xuanx
      //不监听的文件或者文件夹，支持正则匹配，默认为空
      ignored:/node_modules/,
      //监听到变化后等300ms在执行动作，截流防止文件更新太快导致重新编译频率太快
      aggregateTimeout:300,
      //不停的询问系统指定的文件有没有发生变化，默认每秒询问1000次
      poll:1000
    }
  }
}

//注册 server Workers
if(navigator.serviceWorker){
  window.addEventListener('DOMContentLoaded',function(){
    //调用serviceWorker.register注册，参数/sw.js 为脚本所在的URL路径
    navigator.serviceWorker.register('/sw.js')
  })
}
//缓存版本的唯一标识符，用当前事件代替
let cacheKey=new Date().toISOString();
//当前缓存的白名单，在新脚本的 install 事件里将使用白名单里面的 key
let cacheWhitelist=[cacheKey]
//需要被缓存的文件的 URL 列表
let cacheFileList=[
  'index.html',
  'app.js',
  'app.css'
];
//在Service Workers 安装成功之后会派发 install 事件
self.addEventListener('install',function(event){
  //等所有资源缓存完成时，才可以进行下一步
  event.waitUntil(
    caches.open(cacheKey).then(function(cache){
      //要缓存文件的 URL 列表
      return cache.addAll(cacheFileList);
    })
  )
});
//拦截网络请求
self.addEventListener('fetch',function(event){
  event.respondWith(
    //去缓存中查询对应的请求
    caches.match(event.request).then(function(response){
      if(response){
        return response
      }else{
        return fetch(event.request)
      }
    })
  )
});
//新的Service Workers 线程取得控制权后，将会触发 activate 事件
self.addEventListener('activate',function(event){
  event.waitUntil(
    caches.keys().then(function(cacheNames){
      return Promise.all(cacheNames.map(function(cacheName){
        //如果不在白名单中缓存全部清理掉
        if(cacheWhitelist.indexOf(cacheName)===-1){
          //删除缓存
          return caches.delete(cacheName)
        }
      }))
    })
  )
})

//优化webpack
// 1. 侧重优化开发体验的文件
const path = require('path')
const CommonsChunkPlugin = require('webpack/lib/optimize/CommonChunkPlugin')
const HappyPack = require('happypack')//一个任务分成多个子进程并行
//自动寻找 pages 目录下的所有目录，将每一个目录看做一个单页面应用
const autoWebPlugin = new autoWebPlugin('./src/pages',{
  //HTML 模板文件所在的文件路径
  template: './template.html',
  //提取所有页面的公共代码
  commonsChunk:{
    //提取公共代码 Chunk 的名称
    name: 'common'
  }
})
module.exports={
  //AutoWebPlugin 会为寻找到的所有单页面应用生成对应的入口配置
  //通过autoWebPlugin.entry方法可以获取生成入口的配置
  entry:autoWebPlgin.entry({
    //这里我们需要引入额外需要的 Chunk 入口
    base:'./src/base.js'
  }),
  output:{
    filename:'[name].js'
  },
  resolve:{
    //使用绝对路径指明第三方模块存放的位置，以减少搜索步骤
    //其中__dirname 表示当前工作目录，也就是项目的根目录
    modules:[path.resolve(__disname,'node_modules')],
    //针对Npm中的第三方模块，优先采用 jsnext:main 中指向的 ES6模块化语法的文件，使用 Tree Shaking 优化
    //只采用 main 字段作为入口文件描述字段，以减少搜索步骤
    mainFileds:['jsnext:main','main'],
  },
  module:{
    rules:[
      {//如果项目源码中只有 js 文件，就不要写成 /\.jsx?$/,以提升正则表达式的性能
      test:/\.js$/,
      //使用 HappyPack 加速构建
      use:['happypack/loader?id=babel'],
      //只对根目录底下的 src 目录文件采用 babel-loader
      include:path.resolve(__dirname,'src'),
      },
      {
        //增加对css文件的支持
        test:/\.css/,
        use:['happypack/loader?id=css']

      }
    ]
  },
  plugins:[
    autoWebPlugin,
    //使用 HappyPack 加速构建
    new HappyPack({
      id:'babel',
      //babel-loader 支持缓存转换出的结果，通过 cacheDirectory 选项开启
      loaders:['babel-loader?cacheDirectory']
    }),
    new HappyPack({
      //UI 组件加载拆分
      id:'ui-component',
      loaders:[{
        loader:'ui-component-loader',
        options:{
          lib:'antd',
          style:'style/index.css',
          camel2:'-'
        }
      }]
    }),
    new HappyPack({
      id:'css',
      //如何处理.css文件，用法和 Loader 配置中的一样
      loaders:['style-loader','css-loader']
    }),
    //提取公共代码
    new CommonsChunkPlugin({
      chunks:['common','base'],
      //将公共代码放到 base 中
      name:'base'
    })
  ],
  watchOptions:{
    //使用自动刷新，不监听的node_modules 目录下的文件
    ignored:/node_modules/
  }
}
//2.配置侧重优化输出质量的文件 
const path = require('path')
const DefinePlugin = require('webpack/lib/DefinePlugin')
const ModuleConcatenationPlugin=require('webpack/lib/optimize/CommonsChunkPlugin')
//自动寻找 pages 目录下的所有目录，将每一个目录看做一个单页面应用
const autoWebPlugin = new autoWebPlugin('./src/pages',{
  //HTML 模板文件所在的文件路径
  template:'./template.html',
//提取所有页面的公共代码
 commonsChunk:{
    //提取公共代码CHunk的名称
  name:'common',
 },
  //指定存放CSS 文件的CDN目录URL
  stylePublicPath:'//css.cdn.com/id/'
});
//自动寻找 pages 目录下的所有目录，将每一个目录看做一个单页面应用
const autoWebPlugin = new autoWebPlugin('./src/pages',{
  //HTML 模板文件所在的文件路径
  template: './template.html',
  //提取所有页面的公共代码
  commonsChunk:{
    //提取公共代码 Chunk 的名称
    name: 'common'
  }
})
module.exports={
  //AutoWebPlugin 会为寻找到的所有单页面应用生成对应的入口配置
  //通过autoWebPlugin.entry方法可以获取生成入口的配置
  entry:autoWebPlgin.entry({
    //这里我们需要引入额外需要的 Chunk 入口
    base:'./src/base.js'
  }),
  output:{
    //为输出的文件名加上 Hash 值
    filename:'[name]_[chunkhash:8].js',
    path:path.resolve(__dirname,'./dist'),
    //指定存放JavaScript文件的CDN目录URL
    publicPath:('//js.cdn.com/id/')
  },
  resolve:{
    //使用绝对路径指明第三方模块存放的位置，以减少搜索步骤
    //其中__dirname 表示当前工作目录，也就是项目的根目录。当node_modules找不到时，会继续找数组中的下一项（下一项存在的情况下）
   // modules:[path.resolve(__disname,'node_modules'),path.resolve(__disname,'bin')],
    modules:[path.resolve(__disname,'node_modules')],
    //针对Npm中的第三方模块，优先采用 jsnext:main 中指向的 ES6模块化语法的文件，使用 Tree Shaking 优化
    //只采用 main 字段作为入口文件描述字段，以减少搜索步骤,到对应的package.json里面去找，有没有那个字段
    mainFileds:['jsnext:main','main'],
    //别名配置,当模块加载react模块的时候,直接加载后面的绝对路径，快捷方式或者路径
    alias:{
      react:path.resolve('.xxxxx')
    }
  },
  module:{
    noParse:[],//不需要递归去加载或者解析此文件
    rules:[
      {//如果项目源码中只有 js 文件，就不要写成 /\.jsx?$/,以提升正则表达式的性能
      test:/\.js$/,
      //使用 HappyPack 加速构建
      use:['happypack/loader?id=babel'],
      //只对根目录底下的 src 目录文件采用 babel-loader
      include:path.resolve(__dirname,'src'),
      },
      {
        //增加对css文件的支持
        test:/\.css/,
        //提取Chunk中的css代码到单独的文件中
        use:ExtractTextPlugin.extract({
         use: ['happypack/loader?id=css'],
         //指定存放css中导入只有（例如图片）的CDN目录URL
         publicPath:'//img.cdb.com/id/'
        })
      }
    ]
  },
  plugins:[
    autoWebPlugin,
    //开启ScopeHoisting
    new ModuleConcatenationPlugin(),
    new HappyPack({
      id:'babel',
      //babel-loader 支持缓存转换出的结果，通过 cacheDirectory 选项开启
      loaders:['babel-loader?cacheDirectory']
    }),
    new HappyPack({
      //UI 组件加载拆分
      id:'ui-component',
      loaders:[{
        loader:'ui-component-loader',
        options:{
          lib:'antd',
          style:'style/index.css',
          camel2:'-'
        }
      }]
    }),
    new HappyPack({
      id:'css',
      //如何处理.css文件，用法和 Loader 配置中的一样
      //通过minnimize 选项压缩css代码
      loaders:['css-loader?minimize']
    }),
    new ExtractTextPlugin({
      filename:`[name]_[contenthash:8].css`
    }),
    //提取公共代码
    new CommonsChunkPlugin({
      //从 common 和base两个现成的chunk中提取公共代码部分
      chunks:['common','base'],
      //将公共代码放到 base 中
      name:'base'
    }),
    new DefinePlugin({
      //定义 NODE_ENV 环境变量为 production ,去除react 代码中开发时才需要的部分
      'process.env':{
        NODE_ENV:JSON.stringify('priduction')
      }
    }),
    //使用ParallelUglifyPlugin 并行压缩输出的JavaScript代码
    new ParallelUglifyPlugin({
      uglifyJS:{
        output:{
          //最紧凑的输出
          beautify:false,
          //删除所有注释
          comments:false,
        },
        compress:{
          //在 UglifyJS 删除没有用到的代码时不输出警告
          warnings:false,
          //删除所有console语句，可以兼容IE浏览器
          drop_console:true,
          //内嵌已定义但是只用到一次的变量
          collapse_vars:true,
          //提取出现多次但没有定义变量去引用的静态值
          reducr_vars:true
        }
      }
    })
  ]









