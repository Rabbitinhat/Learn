const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const BloggerSchema = new Schema({
    username: {type: String, required: true, max: 30},
    password: {type: String, required: true, min: 8, max: 16},
    introduction: {type: String, required: true},
    age: {type: Number, required: true},
    email: {type: String, required: true, match: "^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$"}
});

module.exports = mongoose.model("Blogger", BloggerSchema);