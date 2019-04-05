//process.argv[2] regexp
//process.argv.slice(3) file
//process.argv[3] directory


//扩展 参数为目录时, 搜索该目录和子目录中所有文件
const fs = require("fs");
const {stat, readdir} = require("fs").promises;

async function searchFile(reg, path){
    let stats;
    try{
        stats = await stat(path);
    }catch(err){
        console.log("File not find");
    }
    if(stats.isDirectory()){
        //?
        let paths = await readdir(path);
        for(let i=0; i<paths.length; i++){
            searchFile(reg, paths[i]);
        }
    }else{
        //如果参数不是目录时
        if(reg.test(path)){
            console.log(path);
        }
    }
}

const reg = new RegExp(process.argv[2]);
let files = process.argv.slice(3);
for(let i=0; i<files.length; i++){
    searchFile(reg, files[i]);
}
