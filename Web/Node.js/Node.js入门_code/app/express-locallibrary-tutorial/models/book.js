/*NOTE 
* 藏书模型
*/
const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const BookSchema = new Schema({
    title: {type: String, required: true},
    /* 
    * author 对单一 Author 模型对象的引用(ref: 指定模型对象) required
    * genre 对Genre模型对象数组的引用
    */
    author: {type: Schema.Types.ObjectId, ref: 'Author', required: true},
    summary: {type: String, required: true},
    isbn: {type: String, required: true},
    genre: [{type: Schema.Types.ObjectId, ref: "Genre"}]
});

/* 虚拟属性'url': 藏书url */
BookSchema
    .virtual("url")
    .get(function(){
        return '/catalog/book/' + this._id;
    });

module.exports = mongoose.model('Book', BookSchema);