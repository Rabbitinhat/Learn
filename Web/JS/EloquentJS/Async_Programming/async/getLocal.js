const fs = require("fs");

function getLocal(path) {
  return new Promise((resolve, reject) => {
    fs.readFile(path, (err, data) => {
      if (err) reject(Error("read fail" + err));
      else resolve(data);
    });
  });
}

function getJSON(path) {
  return getLocal(path)
    .then(JSON.parse)
    .catch(err => {
      console.err(err);
    });
}

var storyAll;

getJSON("story.json")
  .then(function(story) {
    storyAll = story;
    addTexttoPage(story.heading);
  })
  .then(function() {
    console.log("done");
  })
  .catch(err => {
    console.error("Argh, broken", err.message);
  });

function addTexttoPage(message) {
  fs.writeFileSync("getStory.html", message);
}

storyAll = {
  heading: "<h1>A story about something</h1>",
  chapterUrls: [
    "chapter-1.json",
    "chapter-2.json",
    "chapter-3.json",
    "chapter-4.json",
    "chapter-5.json"
  ]
};

storyAll.chapterUrls.forEach(function(chapterUrl) {
  getJSON(chapterUrl).then(function(chapter) {
    console.log(chapter.html);
    fs.writeFileSync("getStory.html", chapter.html);
  });
});

var squence = Promise.resolve();

story.chapterUrls.forEach(function(chapterUrl) {});

function ResolvePromise(promise, x, resolve, reject) {
  if (x === promise) {
    reject(promise, new TypeError());
    return;
  }
  if (x instanceof MyPromise) {
    x.then(resolve, reject);
    return;
  }
  if(x && typeof x == 'object' || typeof x === 'function'){
    let then
    try {
      then = x.then
    } catch (error) {
      reject(error)
      return
    }

    if(typeof then === 'function'){
      try{
      then.call(x, function resolvePromise(y){
        resolvePromise(promise, y, resolve, reject)
      }, function rejectPromise(r){
        reject(r)
      })
    }catch(e){
      if(!called){
        reject(e)
      }
  }
  }
}
}

var storyPromise = getJSON(storyUrl)
var i = 0

for(var i=0; i<10; i++){
storyPromise = storyPromise.then(()=>{
  return new Promise(storyPromise.chapterUrls[i++])
}).then((chapter)=>{
  addHTMLtoPage(chapter)
})
}

// 先创建好每个章节的promise, 然后, 按照顺序逐一进行加载, 当前promise未结束时, 会等待, 结束时, 会立即向下执行
var chapterPromises = story.chapterUrls.map(getJSON)
Promise.resolve()
.then(() => {
  addHTMLtoPage(chapter1)
})

chapterPromises.reduce((seq, chapterPromise) => {
  seq.then(() => chapterPromise)
  .then((chapter) => {
    addHTMLtoPage(chapter)
  })
  return seq
}, Promise.resolve())