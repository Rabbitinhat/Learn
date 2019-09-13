/**
 * 從一個入口文件開始(entry file app的主要文件), 通過反復查找文件中的依賴項來構建依賴樹, 
 *  使用依赖树来打包整个模块
 * */

//  使用的模块导入
//  文件操作
 const fs = require('fs')
// 路径解析?
const path = require('path')
// babel模块. 用于转换提取代码
const babylon = require('babylon')
const traverse = require('babel-traverse').default
const {transformFromAst} = require('babel-core')

let ID = 0

// 创建一个函数, 接收文件路径为参数, 提取文件的依赖项以及其他信息
// 返回包含相关信息的对象
function createAsset(filename){
  // 同步读取文件内容, filename 为文件路径
  const content = fs.readFileSync(filename, 'utf-8')
  // 提取文件中的依赖项
  // - 可以查看导入的字符串(regexp)
  // - 使用JavaScript parser

  // JavaScript parser(分析器) 用来阅读和理解JavaScript code
  // 生成一个AST(abstract syntax tree) 抽象语法树
  // 通过AST可以了解代码结构和内容
  // https://astexplorer.net/
  const ast = babylon.parse(content, {
    sourceType: "module",
  })

  // 保存文件中的依赖项的相对路径(relative path)
  const dependencies = []

  // 通过查看AST中import声明语句找出依赖项
  traverse(ast, {
    // esca modules 是静态的(static ? ,a意味着不会导入variable, 或有条件的(conditionally)
    // 导入其他模块(?))
    // 每次查看import语句, 都可以直接保存其值作为依赖
    ImportDeclaration: ({node}) => {
      // node.source.value 存储导入的依赖项值
      // import {} from depency(node.source.value)
      dependencies.push(node.source.value)
    } 
  })

  // 每次查看一个文件, 将ID递增(每个依赖项生成一个单独对应的id值), 将一个id值绑定给该文件
  const id = ID++

  // 使用babel来提高代码的浏览器兼容性
  // https://babeljs.io/docs/en/babel-preset-env

  // prevsets选项告诉babel如何转换代码, 此处使用`babel-preset-env`
  const {code} = transformFromAst(ast, null, {
    'presets': ['env'],
  })

  // 返回该文件信息
  // - id 文件对应的id
  // - filename 文件路径(path)
  // - dependencies 文件依赖项(引入模块的相对路径))))
  // - code 转换后符合浏览器兼容性的js代码
  return {
    id,
    filename,
    dependencies,
    code,
  }
  
}

// 提取单个文件(模块)中的依赖项
// 从入口文件开始(entry file)

// 然后提取每个依赖项中的依赖项, 从而形成dependency graph
function createGraph(entry){
  // 从entry file开始提取
  // 得到包含entry file信息的对象
  const mainAsset = createAsset(entry)

  // 创建一个包含所有依赖项信息的队列
  // 先创建一个数组, 只包含entry file
  const queue = [mainAsset]

  // 循环遍历整个queue
  // 根据queue中的每个asset中的信息生成新的asset
  // queue为empty时, 中止循环
  for(const asset of queue){
    // 提取asset中的依赖项的相对路径, 使用createAsset()转换他们
    
    asset.mapping = {}
    
    // 根据asset中filename属性保存的路径名
    // 获得文件所在dictionary名
    // http://nodejs.cn/api/path.html#path_path_dirname_path
    const dirname = path.dirname(asset.filename)

    // 遍历dependencies数组中保存的依赖项的相对路径(相对于生成asset的文件, 也就是filename属性中保存的路径)
    asset.dependencies.forEach(relativePath => {
      // 结合生成asset文件的dictionary名和依赖项的相对路径名生成依赖项的绝对路径名
      // 作为指向该依赖的新的filename
      // 用于提取该依赖项的asset
      const absolutePath = path.join(dirname, relativePath)

      // 解析该依赖项, 生成asset, 获得新的依赖
      const child = createAsset(absolutePath)

      // 使用mapping属性, 保存当前文件和其依赖项的关系(该文件有哪些依赖项)
      // 将每个依赖项的相对路径(导入时的信息)和其id进行关联, 存放在mapping属性中
      asset.mapping[relativePath] = child.id

      // 将新生成的asset存入queue中, 它们也会继续被迭代和解析
      // (?queue的长度动态增加了, 也是不使用for循环的原因)
      queue.push(child)
    })
  }

  // 生成的dependency graph为包含应用中每个依赖项的信息的asset组成的数组
  return queue
}

// 生成dependency graph后
// 定义一个函数, 调用dependency graph生成可以在浏览器中调用的bundle(字符串形式的可执行代码)
// 创建一个自调用函数(函数定义后, 马上调用)
// (function(){})()
// 该函数只接受一个参数: 包含dependency graph中所有模块(依赖项)信息的对象
function bundle(graph){
  let modules = ''
  console.log(graph)
  // 先构建函数的参数
  // 该参数是一个对象, 每个模块(依赖项)的信息作为key, value值进行保存
  graph.forEach(mod => {
    // 把模块(依赖项)的id作为key
    // value为一个数组, 其中包含两个值
    // 一个为模块(依赖项)的code, 被一个函数包裹(防止一个模块内定义的变量不会影响其他模块或全局作用域)
    // 包裹函数使用CommJS系统(require, moudle, export), 由于这些变量(require, moudle, export)在浏览器中不可用)
    // 我们会生成并传入它们

    // 第二个参数, 将是stringify后(需要将生成内容生成新文件, 所以整个参数为字符串格式)的mapping属性
    // {'./relative/path': 1}
    // 因为require函数需要传入依赖项的相对路径作为参数进行调用, 该函数调用时, 我们需要知道哪个相对路径
    // 对应的依赖项被调用(通过id找到相应参数, 也是该参数使用id作为key的原因)
    console.log(mod.code)
    modules += `${mod.id}: [
      function(require, moduld, exports){
        ${mod.code}
      },
      ${JSON.stringify(mod.mapping)}
    ],\r\n`
  })

  // 最后, 构建自调用函数
  // require函数, 传入id为参数, 匹配modules对象中的对应的参数(使用id, 而不是相对路径, 是为了区分不同模块, 可能两个相同相对路径的模块为不同模块?)
  // 查找modules中的id, 得到对应的值, 存入两个变量中(fn, 保存模块的可执行代码, mapping, require关系)
  // require内部创建一个loaclRequire用于模块fn变量保存的代码的运行, 通过代码内调用时传入的相对路径(name)作为参数, 匹配mapping变量中对应的id
  // 最后构建module.exports接口(commonJS), 和localRequire一起传入fn中运行
  const result = `
  (function(modules){
    function require(id){
      const[fn, mapping] = modules[id];

      function localRequire(name){
        return require(mapping[name])
      }

      const module = {exports: {}}
      fn(localRequire, module, module.exports)

      return module.exports
    }
  
    require(0)
  })({${modules}})
  `
  console.log(modules)
  return result
}

debugger
const graph = createGraph('./entry.js')
debugger
const result = bundle(graph)
debugger
fs.writeFileSync('bundle.js', result)