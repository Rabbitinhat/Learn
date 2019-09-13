const   fs = require('fs')
const   fsp = fs.promises


/**
 * 接收一个文件夹路径，返回这个文件夹里面的所有文件名
 * 需要递归的得到所有的文件名 并放在一个一维数组里返回
 * 需要写三个版本：
 * 同步版
 * 回调版
 * Promise版本
 */
function isFile(path){
  
  return path.match(/^.*\.[\w]+$/) === null ? false : true
}

 function listAllFilesSync(dirPath) {
  let dirs = fs.readdirSync(dirPath)

  return dirs.reduce((result, item) => {
    if(isFile(item)){
      console.log(result)
      result.push(item)
      return result
    }else{
      let getback = listAllFilesSync(dirPath + '/' + item)
      console.log(getback)
      result = result.concat(getback)
      return result
    }
  }, [])

}

function getFolders(datas){
  var folders = []
  var files = []
  datas.reduce((item) => {
    if(!isFile(item)){
      folders.push(item)
    }else{
      files.push(item)
    }
  })
  return {
    folder: folders,
    file: files
  }
}
function listAllFilesCallback(dirPath, cb) {

  fs.readdir(dirPath, (err, datas) => {
    let foldersCount = 0
    let files = getFolders(datas).file
    let folders = getFolders(datas).folder
    totalFiles.concat(files)
    if(folders.length === 0){
      cb(null, files)
    }else{
      folders.forEach(folder => {
        listAllFilesCallback(folder, () => {
          foldersCount++
          if(foldersCount == folders.length){
            cb()
          }
        })
      }

      )
    }
  })
}

function listAllFilesPromise(dirPath) {
  return new Promise((resolve, reject) => {
    fs.readdir(dirPath, (err, datas) => {
      let results = []
      for(let i=0; i<datas.length; i++){
        if(isFile(datas[i])){
          results.push(datas[i])
        }else{
          listAllFilesPromise(dirPath + '/' + datas[i]).then((data) =>{
            results.concat(data)
          }, err => {
            console.error(err)
          })
        }
      }
      resolve(results)
    })
  })

}


var totalFiles
listAllFilesCallback('./', (err,files) => {
  return totalFiles
})

listAllFilesPromise('./').then(files => {
  console.log(files)
}, err => {
  console.error(err)
})


function listAllFilesSync(path){
  var result = []
  // 同步返回文件状态 fs.Stats object
  var stat = fs.statSync(path)
  // stat.isFile() 如果stat是合法文件则返回true
  if(stat.isFile()){
    return [path]
  }else{
    var names = fs.readdir(path)
    names.forEach(name => {
      var fullpath = path + '/' + name
      var stat = fs.statSync(path + '/' + name)
      if(stat.isFile()){
        result.push(fullpath)
      }else{
        var files = listAllFilesSync(fullpath)
        result.push(...files)
      }
    })
    return result
  }
}

function listAllFilesPromise(path){
  return new Promise((resolve, reject) => {
    var result = []
    fsp.stat(path).then(stat => {
      
    })
  })
}

function run(generatorFunction){
  return new Promise((resolve, reject) => {
var iter = generatorFunction()
var generated = iter.next()
step()
function step(){
  if(!generated.done){
    generated.value.then(val => {
      generated = iter.next(val)
      start()
    }, reason => {
      generated = iter.throw(reason)
      start()
    })
  }
}
})}


async function showStory(storyUrl){
  var story = await getJSON(storyUrl)
  var chapterPromises = story.chapterUrls.map(getJSON)
  for(var chapterPromise of chapterPromises){
    // 并行加载
    var chapter = await chapterPromise
    addContentToPage(chapter)
  }
}


var entryPromises = entries.map(entry => {
  var fullPath = path + '/' + entry.name
  return loadAll
})