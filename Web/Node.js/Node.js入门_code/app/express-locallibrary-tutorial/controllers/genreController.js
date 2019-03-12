//NOTE Genre Controller
const Genre = require("../models/genre");

//NOTE  导入表单验证相关function
const { body, validationResult } = require("express-validator/check");
const { sanitizeBody } = require("express-validator/filter");

//NOTE 导入async Book 模组
const BooK = require("../models/book");
const async = require("async");

//NOTE 显示完整的种类列表
exports.genre_list = (req, res, next) => {
    Genre.find()
        .sort([["name", "ascending"]])
        .populate("book")
        .exec(function (err, list_genres) {
            if (err) { return next(err); }
            //succeed
            res.render("genre_list", { title: "Genre List", genre_list: list_genres });
        });
};

//NOTE 为每个种类显示详细信息的页面
//NOTE 使用async.parallel(), 并行查询类型名称及相关联的书本, 并在(如果)两个请求成功完成时, 回调呈现页面
exports.genre_detail = (req, res, next) => {
    async.parallel({
        genre: function (callback) {
            Genre.findById(req.params.id)
                .exec(callback);
        },

        genre_books: function (callback) {
            BooK.find({ "genre": req.params.id })
                .exec(callback);
        },
    }, function (err, results) {
        if (err) { return next(err); }
        //NOTE 查询无结果
        if (results.genre == null) {
            var err = new Error("Genre not found");
            err.status = 404;
            return next(err);
        }

        //NOTE 成功
        res.render("genre_detail", { title: "Genre Detail", genre: results.genre, genre_books: results.genre_books });
    }
    );
};

//NOTE 由GET显示创建种类的表单
exports.genre_create_get = (req, res, next) => {
    //NOTE 渲染页面`genre_form`
    res.render("genre_form", { title: "Create Genre" });
};

//NOTE 由POST处理种类创建操作
exports.genre_create_post = [
    //NOTE Validate that the name filed is not empty
    body("name", "Genre name required").isLength({ min: 1 }).trim(),

    //NOTE Sanitize (trim and escape) the name field.
    sanitizeBody("name").trim().escape(),

    //NOTE Process request after validation and sanitization.
    (req, res, next) => {
        //NOTE Extract the validation errors from a request.
        const errors = validationResult(req);

        //NOTE Create a genre object with escaped and trimmed data.
        //NOTE get the new Genre's name(saved in req.body.name)
        var genre = new Genre(
            { name: req.body.name }
        );

        if (!errors.isEmpty()) {
            //NOTE There are errors. Render the form again with sanitized values/error messages.
            res.render("genre_form", { title: "Create Genre", genre: genre, errors: errors.array() });
            return;
        }
        else {
            //NOTE Date from form is valid.
            //NOTE Check if Genre with same name already exists.
            Genre.findOne({ "name": req.body.name })
                .exec(function (err, found_genre) {
                    if (err) { return next(err); }

                    if (found_genre) {
                        //NOTE Genre already exists, redirect to its detail page.
                        res.redirect(found_genre.url);
                    } else {
                        //NOTE No repeat model
                        genre.save(function (err) {
                            if (err) { return next(err); }
                            //NOTE New Genre saved. Redirect to genre detail page.
                            res.redirect(genre.url);
                        });
                    }
                });
        }
    }
];

//NOTE 由GET显示删除种类的表单
exports.genre_delete_get = (req, res, next) => {
    async.parallel({
        genres: function (callback) {
            Genre.findById(req.params.id).exec(callback)
        },
        //NOTE get Book info by genre._id
        genre_books: function (callback) {
            BooK.find({ genre: req.params.id }).exec(callback)
        },
    }, function (err, results) {
        if (err) { return next(err); }
        //NOTE result.genre == null
        if (results.genres == null) {
            res.redirect("/catalog/genres");
        }
        else {
            res.render("genre_delete", { title: "Delete Genre", genre: results.genres, books: results.genre_books });
        }
    });
};

//NOTE 由POST处理种类删除操作
exports.genre_delete_post = (req, res, next) => {
    async.parallel({
        genre: function (callback) {
            Genre.findById(req.body.id).exec(callback)
        },
        genre_books: function (callback) {
            BooK.find({ "genre": req.body.id }).exec(callback)
        },
    }, function (err, results) {
        if (err) { return next(err); }

        if (results.genre_books.length > 0) {
            res.render("genre_delete", { title: "Delete Genre", genre: results.genre, books: results.genre_books });
        }
        else {
            Genre.findByIdAndRemove(req.body.id, function deletegenre(err) {
                if (err) { return next(err); }
                res.redirect("/catalog/genres");
            })
        }
    });
};

//NOTE 由GET显示更新种类的表单
exports.genre_update_get = (req, res, next) => {
    //NOTE Get a genre from form
    Genre.findById(req.params.id)
        .exec(function (err, results) {
            if (err) { return next(err); }
            //NOTE 未找到结果
            if (results == null) {
                var err = new Error("Genre not found");
                err.status = 404;
                next(err);
            }
            //NOTE Success
            else {
                res.render("genre_form", { title: "Update Genre", genre: results });
            }
        });
};

//NOTE 由POST处理种类更新操作
exports.genre_update_post = [
    //NOTE Validate that the name filed is not empty
    body("name", "Genre name required").isLength({ min: 1 }).trim(),

    //NOTE Sanitize (trim and escape) the name field.
    sanitizeBody("name").trim().escape(),

    //NOTE Process request after validation and sanitization.
    (req, res, next) => {
        //NOTE Extract the validation errors from a request.
        const errors = validationResult(req);

        //NOTE Create a genre object with escaped and trimmed data.
        //NOTE get the new Genre's name(saved in req.body.name)
        var genre = new Genre(
            { name: req.body.name,
                _id: req.params.id }
        );

        if (!errors.isEmpty()) {
            //NOTE There are errors. Render the form again with sanitized values/error messages.
            res.render("genre_form", { title: "Create Genre", genre: genre, errors: errors.array() });
            return;
        }
        else {
            //NOTE Date from form is valid.
            //NOTE Check if Genre with same name already exists.
            Genre.findOne({ "name": req.body.name })
                .exec(function (err, found_genre) {
                    if (err) { return next(err); }

                    if (found_genre) {
                        //NOTE Genre already exists, redirect to its detail page.
                        res.redirect(found_genre.url);
                    } else {
                        //NOTE No repeat model
                        Genre.findByIdAndUpdate(req.params.id, genre, {}, function(err, thegenre){
                            if(err) {return next(err);}
                            //NOTE successful
                            res.redirect(thegenre.url);
                        });      
                    }
                });
        }
    }
];