//定义文章模式(article)
const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ArticleSchema = new Schema(
    {
        title: {type: String, required: true},
        content: {type: String, required: true},
        genre: [{type: Schema.Types.ObjectId, ref: "Genre"}],
        createtime: {type: Date, required: true},
    }
);

ArticleSchema
    .virtual("url")
    .get(function(){
        return "/articles/" + this._id;
    });

module.exports = mongoose.model("Article", ArticleSchema);