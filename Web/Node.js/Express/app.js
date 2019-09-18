const url = require('url')
const fsp = require('fs').promise

server.use(async (req, res, next) => {
  var base = './static'
  var newPath = path.join(base, '/', req.url)
  try{
    var stat = await fsp.stat(newPath)
    if(stat.isFile){
      fsp.createWritableStream(newPath).pipe(res)
      next()
    }else{
      next()
    }
  }catch(e){
    next(e)
  }

})




server.use((req, res, next) => {
  var bodyString
  req.on('data', (data) => {
    bodyString += data.toString()
  })
  req.on('end', () => {
    if(req.headers['content-type'] == 'application/json; charset=utf-8'){
      req.body = parse(bodyString)
    }else if(req.is('urlencoded')){
      req.body = url.parse(bodyStr)
    }
  })
})


module.exports = function(dir){
  return server.use(async (req, res, next) => {
    var base = dir
    var newPath = path.join(base, '/', req.url)
    try{
      var stat = await fsp.stat(newPath)
      if(stat.isFile){
        fsp.createWritableStream(newPath).pipe(res)
        next()
      }else{
        next()
      }
    }catch(e){
      next(e)
    }
  
  })
}

var fns = [
next => {
  console.log(1)
  setTimeout(next, 1000)
}, 
next => {
  console.log(2)
  setTimeout(next, 1000)
},
next => {
  console.log(3)
  setTimeout(next, 1000)
},
next => {
  console.log(4)
  setTimeout(next, 1000)
}
]


var composed = fns.reduceRight((previousNext, f) => {
  return function next() {
    f(previousNext)
  }
}, () => {})


function compose(mws) {
  return mws.reduceRight((prev, mw) => {
    return function(req, res) {
      mw(req, res, function next(){
        prev(req, res)
      })
    }
  }, function next() {})
}

// 文件位置相对于工作目录, 而非文件所在path
app.use(express.static('./static'))