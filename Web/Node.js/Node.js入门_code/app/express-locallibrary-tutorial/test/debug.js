//NOTE 设置author日志记录
var debug = require("debug")("author");

//NOTE Display Author update form on GET
exports.author_update_get = function(req, res, next){
    req.sanitize("id").escape().trim();
    Author.findById(req.params.id, function(err, author){
        if(err){
            //NOTE 
            debug("update error:" + err);
            return next(err);
        }
        //on success
        res.render("author_form", {title: "Update Author", author: author});
    })
}