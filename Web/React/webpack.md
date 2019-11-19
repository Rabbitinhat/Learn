# Webpack

## 打包

从文件名加载文件代码
- 使用regexp找出require的文件路径
- readFile读取源码, new Function构造可执行函数传入参数, 将结果存入缓存中
- 使用函数调用并执行缓存中代码, 导入一个文件


## 功能

- 打包js文件
- 将除js以外的其他资源也作为可以require导入的资源
    + 通过将非js资源转换为等价的js文件(?)
        * 图片 `img src={export.url}` export url(推荐)/base64数据(图片较小时)
        * css `export <style>stylesheet</style>` 立即生效
    + 转换工具称为loader(将不同资源转换为可以被环境识别的形式)
        * babel-loader
    + plugin在webpack则是对整体的打包结果进行处理的一种插件机制
        *  压缩 混淆
        *  common-chunk-plugin 处理通用(vendor)模块的分离
            -  在项目中, 实际页面的源代码(indexpage)并不存在具体的html元素, 开发者也只是在compones中书写html template, 加载时通过webpack自动将内容插入相应位置, 在内容变化时也会进行响应
            - 文件名通过内容生成, 内容不发生变化, 文件名也不会发生变化
            - 静态内容, 动态内容分别打包
            - 通过文件名的变化处理打包结果?
        *  webpack_html_plugin 自动生成入门html页面
- code spliting 代码分割
    + 将一开始不需要的模块打包到另一个或多个文件中, 在需要的时候(代码执行到对应位置时, 再进行加载 (懒加载))
    + 入口文件 `webpack entrance.js`
- 摇树优化 tree shaking
    + 不需要用到的代码将不会进行打包, 减少打包体积
    + 依赖es6 module语法, 提供静态分析的可能性(不运行代码就进行分析, 无法分析需要动态处理的导入语句(需要获取变量状态时))
- 代码热替换


压缩
- minify
- 混淆
- gzip
- 一般针对文本信息做压缩
- 图片不压缩(图片格式已经是经过压缩后的情况)

css解析不会阻止浏览器对DOM解析

外部css, js 可以通过浏览器缓存

HTTP2
- http header 小写
- :headername 自定义头部
- 二进制协议
- 请求头压缩(字典压缩)
- 一个http2会话上发送多个请求
- 帧
- 强制TLS
- 服务器推送


CDN Server
- 返回静态资源

应用 Server
- 动态生成HTML


强缓存
文件名随内容变化而变化


git

git diff add/workspace
git status add/commit

rebuse