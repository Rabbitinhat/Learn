/* 导入 mongoose 模块 */
const mongoose = require("mongoose");

/* 设置默认 mongoose 链接 ? */
const mongoDB = "mongodb://127.0.0.1/my_database";
mongoose.connect(mongoDB);

/* 让 mongoose 使用全局 Promise 库 */
mongoose.Promise = global.Promise;
/* 取得默认链接 */
const db = mongoose.connection;

/* 绑定错误事件(获得链接错误的提示) */
db.on("error", console.error.bind(console, "MongoDB 链接错误: "));

/* 定义一个模式 */
var Schema = mongoose.Schema;

/* 创建一个模式的实例, 包含两个字段 string date */
var SomeModelSchema = new Schema({
    a_string: String,
    a_date: Date
});

/* 使用模式实例"编译"模型 
* "SomeModel"为模型创建集合的别名(Mongoose将为SomeModel模型创建数据库集合)
* 第二个参数是创建模型时使用的模式
* 定义模型类后, 可以使用它们来创建, 更新和删除记录; 通过查询来获取所有记录或特定子集
*/
const SomeModel = mongoose.model("SomeModel", SomeModelSchema);

/* 
* eggs: 使用 min max 验证器
* drink: 使用 enum 验证器(指定当前字段允许值的集合)
*/
const breakfastSchema = new Schema({
    eggs: {
        type: Number,
        min: [6, '鸡蛋太少'],
        max: 12
    },
    drink: {
        type: String,
        enum: ["咖啡", "茶"]
    }
});

/* 创建一个 SomeModel 模型的实例 */
const awesome_instance = new SomeModel({name: "牛人"});

/* 传递回调以保存这个新建的模型实例 */
awesome_instance.save(function(err){
    /* 回调函数用于err时 */
    if(err){
        return handleError(err);
    }//已保存
});

/* 使用 create 定义模型实例时将其保存 */
SomeModel.create(
    {name: "也是牛人"},
    //回调函数(错误, 返回的模型实例)
    function(err, awesome_instance){
        if(err){
            return handleError(err);
        }//已保存
    }
)

/* "." 访问模型的字段值 */
//显示 `也是牛人`
console.log(awesome_instance.name);

//修改字段内容并保存记录
awesome_instance.name = "苦逼了的牛人";
awesome_instance.save(function(err){
    /* 回调函数处理err */
    if(err){
        return handleError(err);
    }
});

/* 搜索记录 模型.find()查询 */
/* 使用.model()通过yourSchema模式创建模型 */
const Athlete = mongoose.model("Athlete", yourSchema);

/* select name, age From Athlete where sport="Tennis" */
Athlete.find(
    {"sport": "Tennis"},
    "name age",
    function(err, athletes){
        if(err){
            return handleError(err);
        }//"athletes"中保存一个符合条件的运动员列表
    //查询立刻执行, 搜索完成后调用回调
    }
);

/* 未指定回调, .find()返回一个Query类型查询对象 */
const query = Athlete.find({'sport': 'Tennis'});

/* 
* 使用query构建查询
* 查找 name age 两个字段
*/
query.select("name age");

//只查找前5条
query.limit(5);

//年龄排序
query.sort({age: -1});

//某个时间段后运行查询
query.exec(function(err, athletes){
    if(err){
        return handleError(err);
    }//athletes 中保存网球运动员列表, 按年龄排序, 5条记录
};

/* 也可使用where()和链式操作(返回this) */
Athlete.find().
        where("sport").equals("Tennis").
        where("age").gt(17).lt(50). //附加WHREE查询(17<x<50?)
        limit(5).
        sort({age: -1}).
        select("name age").
        exec(callback); /* 调用回调函数 */


const mongoose = require("mongoose");
const Schema = mongoose.Schema;

/* 定义两个模式 authorSchema storySchema */
const authorSchema = Schema({
    name: String,
    //使用ObjectId, ref指定模型名
    stories: [{type: Schema.Types.ObjectId, ref: 'Story'}]
});

const storySchema = Schema({
    author: {type: Schema.Types.ObjectId, ref: 'Author'},
    title: String
})

const Story = mongoose.model('Story', storySchema);
const Author = mongoose.model('Author', authorSchema);

const wxm = new Author({name: "司马迁"});

wxm.save(function(err){
    if(err){
        return handleError(err);
    }

    /* 现在库中有了作者"司马迁", 我们来新建一条简介 */
    const story = new Story({
        title: "司马迁是历史学家",
        author: wxm._id //author 设置为作者"司马迁"的_id. ID是自动创建的
    });

    story.save(function(err){
        if(err){
            return handler(err);
        }//"司马迁"有了一条简介
    });

});

/* 通过作者文档的 id 引用作者, 使用populate()在简介中获取作者信息 */
Story
    .findOne({title: "司马迁是历史学家"})
    .populate("author") //使用实际作者信息填充作者中的id
    .exec(function(err, story){
        if(err){
            return handleError(err);
        }
        console.log("作者是 %s", story.author.name);
        /* 打印 "作者是'司马迁'" */
    });

    /* 文件: ./models/somemodel.js */

    /* Require Mongoose */
    const mongoose = require("mongoose");

    /* 定义一个模式 */
    const Schema = mongoose.Schema;

    const SomeModelSchema = new Schema({
        a_string: String,
        a_date: Date
    });

    /* 导出函数来创建"SomeModel"模型类 */
    module.exports = mongoose.model("SomeModel", SomeModelSchema);

    /* 其他文件 */
    /* 通过require模块来创建SomeModel模型 */
    const SomeModel = require("../models/somemodel");

    /* 使用 SomeModel 对象(模型)来查找所有的 SomeModel 记录 */
    SomeModel.find(callback_function);