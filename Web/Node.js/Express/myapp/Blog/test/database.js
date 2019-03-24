const mongoose = require("mongoose");

const mongoDB = "mongoDBURL";
//连接MongoDB数据库
mongoose.connect(mongoDB);

//NOTE 使用global Promise库
mongoose.Promise = global.Promise;

//NOTE 取得默认连接
const db = mongose.connection;

db.on("err", console.error.bind(console, "MongoDB 连接错误: "));

var Schema = mongoose.Schema;

//创建新的模式, 包含两个字段
var SomeModelSchema = new Schema({
    a_string: String;
    a_date: Date;
});

//创建模型(模型名, 使用的模式)
const SomeModel = mongoose.model("SomeModel", SomeModelSchema);

//创建schema时,使用验证器 
const breakfastSchema = new Schema({
    eggs: {
        type: Number,
        min: [6, "egg not enough"],
        max: 12
    },
    drink: {
        type: String,
        enum: ["coffee", "tea"];
    }
})

//创建一个SomeModel模型的实例
const awesome_instace = new SomeModel({name: "good"});

//保存记录
awesome_instance.save(function(err){
    if(err){
        return handleError(err);
    }
});

//定义模型时将其保存
SomeModel.create(
    {name: "good"},
    function(err, awesome_instance){
        if(err){
            return handleError(err);
        }
    }
)

//修改内容
console.log(awesome_instance.name);

awesome_instance.name = "cool good";
awesome_instance.save(function(err){
    if(err){
        return handleError(err);
    }
})

const Athlete = mongoose.model("Athlete", yourSchema);

//使用JSON文档进行查询, 结果保存在回调函数参数中
Athlete.find(
    {"sport": "Tennis"},
    "name age",
    function(err, athletes){
        if(err){
            return handleError(err);
        }

    }
)

const query = Athlete.find({"sport": "Tennis"});

//查找name, age两个字段
query.select("name age");

query.limit(5);

query.sort({age: -1});

//执行查询
query.exec(function(err, athletes){
    if(err){
        return handleError(err);
    }
})

//可以使用where()替换find()
Athlete.find().where("sport").equals("Tennis").
    where("age").gt(17).lt(50).
    limit(5).sort({age: -1}).select("name age").exec(callback);

//使用ObjectId引用其他模型中数据
const Schema = mongoose.Schema;

const authorSchema = Schema({
    name: String,
    stories: [{type: Schema.Types.ObjectId, ref: "Story"}]
});

const storySchema = Schema({
    author: {type: Schema.Types.ObjectId, ref: "Author"},
    title: String
});

const Story = mongoose.model("Story", storySchema);
const Author = mongoose.models("Author", authorSchema);

const wxm = new Author({name: "Tom"});

wxm.save(function(err){
    if(err){
        return handleError(err);
    }

    const story = new Story({
        title: "Tom is good author",
        //通过作者的id引用作者数据
        author: wxm._id
    });

    story.save(function(err){
        if(err){
            return handleError(err);
        }
    });
});

Story
    .findOne({title: "Tom is good author"})
    .populate("author") //使用作者id填充实际作者信息
    .exec(function(err, story){
        if(err){
            return handleError(err);
        }
    });