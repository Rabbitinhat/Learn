/**
 * 极简地sqlite console
 * 使用node的reql模块模拟sqlite3的行为
 */

// const sqlite = require('sqlite')
// const repl = require('repl')


// var dbFile = process.argv[2]

// async function main(){
//   var db = await sqlite.open(dbFile)

//   repl.start({
//     prompt: 'sqlite3>',
//     eval: function(sql, context, filename, callback){
//       sql = sql.trim()
//       if(!sql){
//         callback(null)
//         return
//       }

//       // if(sql.startsWith('.')){

//       // }

//       var result = await db.all(sql)
//       callback(null, result)
//     }
//   })
// }

// // VM module
// const vm = require('vm')

// var script = new vm.Script('console.log(1), console.log(1 + 2)')

const fs = require('fs');

const timeoutScheduled = Date.now();

setTimeout(() => {
  const delay = Date.now() ‐ timeoutScheduled;
  console.log(`${delay}ms have passed since I was scheduled`);
}, 100);


// do someAsyncOperation which takes 95 ms to complete

fs.readFile('a.txt', () => {
  const startCallback = Date.now();
  // do something that will take 10ms...
  while (Date.now() ‐ startCallback < 10){
  // do nothing
  }
});