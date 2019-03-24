const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const GenreSchema = new Schema({
    name: {type: String, required: true},
    article: {type: Schema.Types.ObjectId, ref: "Article", required: true}
});

GenreSchema
    .virtual("url")
    .get(function(){
        return "/articles/genres/" + this._id;
    });

module.exports = mongoose.model("Genre", GenreSchema);