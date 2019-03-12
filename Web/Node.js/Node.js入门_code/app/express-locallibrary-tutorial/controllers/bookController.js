//NOTE BookController
//NOTE 导入所有模型(主页设置),使用这些模型获取记录的技术
const Book = require("../models/book");
const Author = require("../models/author");
const BookInstance = require("../models/bookinstance");
const Genre = require("../models/genre");

//NOTE 导入异步模块 async
const async = require("async");

//NOTE 导入验证模块
const {body, validationResult} = require("express-validator/check");
const { sanitizeBody } = require("express-validator/filter");


exports.index = (req, res) => {
    async.parallel({
        //NOTE 传入回调函数组
        book_count: function(callback){
            //NOTE pass an empty object as match condition to find all documents of this collection
            Book.count({}, callback); 
        },
        book_instance_count: function(callback){
            BookInstance.count({}, callback);
        },
        book_instance_available_count: function(callback){
            BookInstance.count({"status": "可供借阅"}, callback);
        },
        genre_count: function(callback){
            Genre.count({}, callback);
        },
        author_count: function(callback){
            Author.count({}, callback);
        },
    }, function(err, results){
        res.render("index", {title: "Local Library Home", error: err, data: results});
    })
};

//NOTE 显示完整的书籍列表
exports.book_list = (req, res, next) => {
    Book.find({}, "title author")
        .populate("author")
        .exec(function (err, list_books){
            if(err) {return next(err);}
            //NOTE 读取成功, 渲染页面
            res.render("book_list", {title: "Book List", book_list: list_books});
        });
};

//NOTE 为每部书籍显示详细信息的页面
exports.book_detail = (req, res, next) => {
    async.parallel({
        book: function(callback){
            Book.findById(req.params.id)
                .populate("author")
                .populate("genre")
                .exec(callback);
        },
        book_instance: function(callback){
            BookInstance.find({"book": req.params.id})
            .exec(callback);
        },
    }, function(err, results){
        if(err) {return next(err);}
        //NOTE 没有结果
        if(results.book==null){
            let err = new Error("Book not Found");
            err.status = 404;
            return next(err);
        }
        //NOTE 成功
        res.render("book_detail", {title: "Title", book: results.book, book_instances: results.book_instance});
    }
    );
};

//NOTE 由GET显示创建书籍的表单
exports.book_create_get = (req, res, next) => {
    //Get all authors and genres, which we can use for adding to our book.
    async.parallel({
        authors: function(callback){
            Author.find(callback);
        },
        genres: function(callback){
            Genre.find(callback);
        },
    }, function(err, results){
        if(err) {return next(err);}
        res.render("book_form", {title: "Create Book", authors: results.authors, genres: results.genres});
    }
    )
};

//NOTE 由POST处理书籍创建操作
exports.book_create_post = [
    //NOTE Convert the genre to an array.
    (req, res, next) => {
        if(!(req.body.genre instanceof Array)){
            if(typeof req.body.genre === "undefined")
                req.body.genre=[];
            else
                //NOTE ?
                req.body.genre = new Array(req.body.genre);
        }
        next();
    },

    //NOTE Validate fields
    body("title", "Title must not be empty.").isLength({min: 1}).trim(),
    body("author", "Author must not be empty.").isLength({min: 1}).trim(),
    body("summary", "Summary must not be empty.").isLength({min: 1}).trim(),
    body("isbn", "ISBN must not be empty.").isLength({min: 1}).trim(),

    //NOTE Sanitize fields (using wildcard).
    sanitizeBody("*").trim().escape(),

    //NOTE Proces request after validation and sanitization.
    (req, res, next) => {
        //Extract the validation errors from a request.
        const errors = validationResult(req);

        //Create a Book object with escaped and trimmed data.
        var book = new Book({
            title: req.body.title,
            author: req.body.author,
            summary: req.body.summary,
            isbn: req.body.isbn,
            genre: req.body.genre
        });

        if(!errors.isEmpty()) {
            //NOTE There are errors. Render form again with sanitized values/error messages.

            // Get all authors and genres for form.
            async.parallel({
                authors: function(callback){
                    Author.find(callback);
                },
                genres: function(callback){
                    Genre.find(callback);
                },
            }, function(err, results){
                if(err) {return next(err);}

                //NOTE Mark our selected genres as checked.
                for(let i=0; i<results.genres.length; i++){
                    //NOTE ?
                    if(book.genre.indexOf(results.genres[i]._id) > -1){
                        results.genres[i].checked = "true";
                    }
                }
                res.render("book_form", {title: "Create Book", authors: results.authors, genres: results.genres, book: book, errors: errors.array()});
            });
            return;
        }
        else {
            //NOTE Date from form is valid. Save book.
            book.save(function(err){
                if(err) {return next(err);}
                //NOTE successful
                res.redirect(book.url);
            });
        }
    }
];

//NOTE 由GET显示删除书籍的表单
exports.book_delete_get = (req, res, next) => {
    async.parallel({
        book: function(callback){
            Book.findById(req.params.id).exec(callback)
        },
        bookinstances: function(callback){
            BookInstance.find({"book": req.params.id}).exec(callback)
        },
    }, function(err, results){
        if(err){return next(err);}
        //NOTE Results == null
        if(results.book == null){
            res.redirect("/catalog/books");
        }
        else{
            res.render("book_delete", {title: "Delete Book", book: results.book, bookinstances: results.bookinstances});
        }
    }
    
    );
};

//NOTE 由POST处理书籍删除操作
exports.book_delete_post = (req, res, next) => {
    async.parallel({
        book: function(callback){
            Book.findById(req.body.bookid)
                .populate("author")
                .populate("genre")
                .exec(callback)
        },
        bookinstances: function(callback){
            BookInstance.find({"book": req.body.bookid}).exec(callback)
        },
    },
        function(err, results){
            if(err){return next(err);}
            //NOTE if book still has bookinstance, not delete
            if(results.bookinstances.length > 0){
                //NOTE render in the same way  as for GET
                res.render("book_delete", {title: "Delete Book", book: results.book, bookinstances: results.bookinstances});
                return;
            }
            else{
                Book.findByIdAndRemove(req.body.id, function deleteBook(err){
                    if(err) {return next(err);}
                    res.redirect("/catalog/books");
                });
            }
        });
};

//NOTE 由GET显示更新书籍的表单
exports.book_update_get = (req, res, next) => {
    //NOTE Get a book, authors and genres for form.
    async.parallel({
        book: function(callback){
            Book.findById(req.params.id).populate("author").populate("genre").exec(callback);
        },
        authors: function(callback){
            Author.find(callback);
        },
        genres: function(callback){
            Genre.find(callback);
        },
    }, function(err, results){
        if(err){return next(err);}
        if(results.book==null){
            //NOTE No result
            var err = new Error("Book not found");
            err.status = 404;
            return next(err);
        }
        //NOTE Success
        //NOTE Mark our selected genres as checked.
        for(var all_g_iter = 0; all_g_iter < results.genres.length; all_g_iter++){
            for(var book_g_iter = 0; book_g_iter < results.book.genre.length; book_g_iter++){
                if(results.genres[all_g_iter]._id.toString()==results.book.genre[book_g_iter]._id.toString()){
                    results.genres[all_g_iter].checked="true";
                }            }
        }
        res.render("book_form", {title: "Update Book", authors: results.authors, genres: results.genres, book: results.book});
    }
    
    );
};

//NOTE 由POST处理书籍更新操作
exports.book_update_post = [
    //NOTE Convert the genre to an array
    (req, res, next) => {
        if(!(req.body.genre instanceof Array)){
            if(typeof req.body.genre==="undefined")
            req.body.genre=[];
            else
            req.body.genre=new Array(req.body.genre);
        }
        next();
    },

    //Validate fields
    body("title", "Title must not be empty").isLength({min: 1}).trim(),
    body("author", "Author must not be empty.").isLength({min: 1}).trim(),
    body("summary", "Summary must not be empty.").isLength({min: 1}).trim(),
    body("isbn", "ISBN must not be empty").isLength({min: 1}).trim(),

    //NOTE Sanitize fields.
    sanitizeBody("title").trim().escape(),
    sanitizeBody("author").trim().escape(),
    sanitizeBody("summary").trim().escape(),
    sanitizeBody("isbn").trim().escape(),
    sanitizeBody("genre.*").trim().escape(),

    //Process request after validation and sanitization.
    (req, res, next) => {
        //NOTE Extract the validation errors form a request
        const errors = validationResult(req);

        //NOTE Create a Book object with escaped/trimmed data and old id.
        var book = new Book(
            {
                title: req.body.title,
                author: req.body.author,
                summary: req.body.summary,
                isbn: req.body.isbn,
                genre: (typeof req.body.genre==="undefined") ? [] : req.body.genre,
                _id: req.params.id //NOTE This is required, or a new ID will be assigned!
            });

        if(!errors.isEmpty()){
            //NOTE There are errors. Render form again with sanitized values/error messages.

            //NOTE Get all authors and genres for from.
            async.parallel({
                authors: function(callback){
                    Author.find(callback);
                },
                genres: function(callback){
                    Genre.find(callback);
                },
            }, function(err, results){
                if(err){return next(err);}

                //NOTE Mark our selected genres as checked
                for(let i=0; i<results.genres.length; i++){
                    if(book.genre.indexOf(results.genres[i]._id) > -1){
                        results.genres[i].checked="true";
                    }
                }
                res.render("book_form", {title: "Update Book", authors: results.authors, genres: results.genres, book: book, errors: errors.array()});
            });
            return;
        }
        else{
            //Date from form is valid. Update the record.
            Book.findByIdAndUpdate(req.params.id, book, {}, function(err, thebook){
                if(err) {return next(err);}
                //NOTE Successful
                res.redirect(thebook.url);
            });
        }
    }
];