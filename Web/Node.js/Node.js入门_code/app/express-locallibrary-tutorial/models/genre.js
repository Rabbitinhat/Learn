/*NOTE  
* 书籍类别模型(Genre)
* 存储书籍的类别
*/

const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const GenreSchema = new Schema({
    //NOTE 表示种类名称, 必填 3~100字符
    name: {type: String, required: true, min: 3, max: 100},
    //NOTE 数组(一个类别可以存储多个书籍对象) 通过 Object.Id 和 ref 指定对 Book 模型对象的引用
    book: [{type: Schema.Types.ObjectId, ref: "Book"}]
});

GenreSchema
    .virtual("url")
    .get(function(){
        return '/catalog/genre/' + this._id;
    });

//NOTE 导出 Genre 模型
module.exports = mongoose.model("Genre", GenreSchema);