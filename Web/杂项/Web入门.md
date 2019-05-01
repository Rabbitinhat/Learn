## 网站是如何工作的 
[MDN Web入门](https://developer.mozilla.org/zh-CN/docs/Learn/Getting_started_with_the_web)

* 安装基础软件
  * 计算机(Windows, Mac, Linux系统)
  * 文本编辑器/IDE(集成开发环境):编写代码 `Visual Studio Code`
  * 浏览器: 用于测试代码 `Firefox` `Chrome` `IE` `Microsoft Edge` `Opera` `Safari`
  * 图像编辑器: 编辑网页所需图像 `Photoshop`
  * 版本控制系统: 管理服务器文件, 团队协作开发, 共享代码和资源, 避免编辑冲突 `Git` `GitHub`(基于Git)
  * 自动化构建工具: 自动完成重复任务, 如压缩代码和测试 `Grunt` `Gulp`
  * 模板, 库, 框架: 加快编写常规功能
* 你的网站看起来是什么样的
  * 做出计划
    * 网页内容是什么样的
    * 主题中要展示什么信息
    * 网页是什么样子
    * > 复杂的项目需要详细的参考手册(包括颜色, 字体, 各项目的间距, 合适的编写规范); 参考手册也称设计指南或品牌指南
  * 画出页面的草稿(纸笔 在团队中通常是图形设计师和用户体验师的工作)
  * 选择内容
    * 文本(设计稿)
    * 颜色 
      * [the Color Picker](https://developer.mozilla.org/zh-CN/docs/Web/CSS/CSS_Colors/Color_picker_tool)
      * [HTML Color Picker](https://www.w3schools.com/colors/colors_picker.asp)
    * 图片 
      * [Google Images](https://www.google.com/imghp?gws_rd=ssl)
      * [Bing Images](https://cn.bing.com/images/trending?form=Z9LH)
    * 字体
      * [Google Fonts](https://fonts.google.com/)
* 文件处理: 包括文本, 样式表, JS代码, 媒体内容等文件
  * 存放位置: 能反映服务器上文件结构的单独文件夹
  * 文件名格式
    * 服务器一般对大小写敏感
    * 浏览器, 服务器和编程语言不能一致地处理空格; 最好使用横线来代替空格(`google`浏览器会把横线处理为词的分隔符, 而不能处理下划线)
* 网站结构
    * index.html: 主页内容
    * images folder: 存放图像资源
    * style folder: 存放样式表
    * scripts folder: 存放添加交互功能的JS代码
* 文件路径(path):
  * 同级目录: 直接使用文件名 images/my-image.jpg
  * 父级目录: ../my-image.png
* HTML基础
* CSS基础
* JS基础
* 发布网站
  * 获取主机服务和域名
    * 主机服务: 在主机服务提供商的`Web`服务器上租用文件空间(将网站文件上传到此处)
    * 域名: 可以让用户访问的独一无二的地址 `"http://www.mozilla.org"`; 可以从域名注册商租借地址
  * 文件传输协议程序(`FTP`程序): 将网站上传到服务器
  * 关于主机服务和域名的建议
    * 商业化主机公司和域名注册商
    * 免费服务
    * 在线工具(`GitHub Page` `Google App Engine`);
    * 在线的仿真网站开发环境
* 万维网是怎么工作的
  * 客户端和服务器: 链接到互联网的计算机被称作客户端和服务器
    * 客户端 Client: 典型的Web用户上网设备和设备上可联网的软件
    * 服务器 Server: 存储网页, 站点和应用计算机; 一个客户端设备想要获取一个网页时, 一份网页的拷贝将从服务器下载到客户端上供用户浏览
  * 其他部分
    * 网络连接: 允许你在互联网上发送和接收数据
    * TCP/IP: 传输控制协议和因特网互连协议是定义数据如何传输的通信协议(通常在客户端和服务器最初链接时使用)
    * DNS: 域名系统服务器, 浏览器通过查看URL中的域名来找到存放用户想要的网页的服务器, 才能将请求发送到正确的地方
    * HTTP: 超文本传输协议 定义客户端和服务器之间如何交流的协议(protocol)
    * 组成文件: 构成网页
      * 代码: HTML CSS JavaScript等
      * 资源: 图像, 音乐, 视频等
  * 输入网址后发生了什么
    * 浏览器在域名系统服务器上找出存放网页的服务器的实际地址(IP?)
    * 浏览器发送HTTP请求到服务器, 请求得到一份网页拷贝(包括请求在内, 所有传递的数据都是通过互联网使用TCP/IP协议传输的)
    * 服务器同意请求后, 会返回状态码为`200 OK`的响应, 表示同意访问, 然后会将网页文件以数据包的形式传输到浏览器
    * 浏览器将数据包还原为完整的网页后进行显示

## 基础

命令行
cmd & bash

path

cmder设置

快捷键 hotkey autohotkey vscode

IDE vscode & sublime text

### 软件 software

everything (link)[https://www.voidtools.com/zh-cn/]

鼠标手势 StrokeIt

FTP FileZilla

代码同步

git

