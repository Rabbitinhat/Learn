//日期格式化
//ordinal package 数字->字符串
//date-names 获取星期和月份的英文名称
const ordinal = require("ordinal");
const {days, months} = require("date-names");

//将接口函数 formatDate添加到exports, 使依赖的模块可以访问它
exports.formatDate = function(date, format){
    return format.replace(/YYYY|M(MMM)?|Do?|dddd/g, tag=>{
        if(tag == "YYYY") return date.getFullYear();
        if(tag == "M") return date.getMonth();
        if(tag == "MMMM") return months[date.getMonth()];
        if(tag == "D") return date.getDate();
        if(tag == "Do") return ordinal(date.getDate());
        if(tag == "dddd") return days[date.getDay()];
    });
};