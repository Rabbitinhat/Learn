/*NOTE 
*作者模型
*/
const mongoose = require("mongoose");
const moment = require("moment");

const Schema = mongoose.Schema;

/* 创建了AuthroSchema模式(姓氏(字符串,必填,最大100字符), 名字, 生卒日期) */
const AuthorSchema = new Schema({
    first_name: {type: String, required: true, max: 100},
    family_name: {type: String, required: true, max: 100},
    date_of_birth: {type: Date},
    date_of_death: {type: Date},
});

/* 虚拟属性"name",表示作者全名 */
AuthorSchema
    .virtual("name")
    .get(function(){
        return this.family_name + ", " + this.first_name;
    });

/* 虚拟属性"lifespan", 作者寿命 */
AuthorSchema
    .virtual("lifespan")
    .get(function(){
        if(this.date_of_birth!=null && this.date_of_death!=null){
        return (this.date_of_death.getYear() - this.date_of_birth.getYear()).toString();
        }else if(this.date_of_birth!=null && this.date_of_death==null){
            let now = new Date();
            return (now.getYear() - this.date_of_birth.getYear()).toString();
        }else{
            return "";
        }
    });

/* 虚拟属性 "url" 作者url */
AuthorSchema
    .virtual("url")
    .get(function(){
        return "/catalog/author/" + this._id;
    });

//NOTE 添加格式化出生日期虚拟属性
AuthorSchema
    .virtual("date_of_birth_formatted")
    .get(function(){
        return this.date_of_birth ? moment(this.date_of_birth).format("YYYY-MM-DD") : "";
    });

//NOTE 格式化死亡日期
AuthorSchema
    .virtual("date_of_death_formatted")
    .get(function(){
        return this.date_of_death ? moment(this.date_of_death).format("YYYY-MM-DD") : "";
    });
    /* 导出模型 */
module.exports = mongoose.model("Author", AuthorSchema);