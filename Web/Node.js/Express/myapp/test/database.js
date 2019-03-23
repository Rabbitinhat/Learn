//NOTE 调用数据库

const MongoClient = require("mongodb").MongoClient;

//NOTE 连接数据库
MongoClient.connect("mongodb://localhost:27017/animals", (err, client)=>{
    if(err){
        throw err;
    }

    //NOTE
    let db = client.db("动物");
    //NOTE 查找哺乳动物的内容
    db.collection("哺乳动物").find().toArray((err, result)=>{
        if(err) throw err;
        console.log(result);
        client.close();
    });
});