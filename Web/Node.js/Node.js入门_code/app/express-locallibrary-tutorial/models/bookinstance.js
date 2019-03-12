/*NOTE 
* 藏书副本模型(BookInstance)
* 可供借阅的藏书的特定副本
* 副本是否可用, 还书期限, "出版批次"或版本详细信息
*/
const mongoose = require("mongoose");
//NOTE 引用moment格式化日期
var moment = require("moment");

const Schema = mongoose.Schema;

const BookInstanceSchema = new Schema({
    //NOTE  指向相关藏书的引用
    book: { type: Schema.Types.ObjectId, ref: "Book", required: true },
    //NOTE 出版项
    imprint: { type: String, required: true },
    //NOTE 还书期限
    due_back: { type: Date, default: Date.now },
    //NOTE 状态
    //enum: 字符串值, 本例指书籍的状态(使用枚举避免状态中出现错误拼写或不允许的值?)
    //default: 用默认值可以设定默认状态
    status: {
        type: String,
        required: true,
        enum: ["可供借阅", "馆藏维护", "已借出", "保留"],
        default: "馆藏维护"
    }

});

//NOTE 虚拟属性"url": 藏书副本 url
BookInstanceSchema
    .virtual("url")
    .get(function () {
        return '/catalog/bookinstance/' + this._id;
    });
//NOTE 添加格式化日期虚拟属性
BookInstanceSchema
    .virtual("due_back_formatted")
    .get(function(){
        //调用moment格式化due_back
        return moment(this.due_back).format("MMMM Do, YYYY");
    });

//NOTE 导出BookInstance模型
module.exports = mongoose.model("BookInstance", BookInstanceSchema)