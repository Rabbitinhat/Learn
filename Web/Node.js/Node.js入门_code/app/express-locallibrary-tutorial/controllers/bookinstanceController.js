//NOTE BookInstance Controller

const BookInstance = require("../models/bookinstance");

//NOTE 导入验证模块
const { body, validationResult } = require("express-validator/check");
const { sanitizeBody } = require("express-validator/filter");

//NOTE 导入Book模型
const Book = require("../models/book");

//NOTE 显示完整的书籍副本列表
exports.bookinstance_list = (req, res, next) => {
    BookInstance.find()
        //NOTE 将bookId替换为具体book文档
        .populate("book")
        .exec(function (err, list_bookinstances) {
            if (err) { return next(err); }
            //成功, 渲染页面
            res.render("bookinstance_list", { title: "Book Instance List", bookinstance_list: list_bookinstances });
        });
};

//NOTE 为每部书籍副本显示详细信息的页面
exports.bookinstance_detail = (req, res, next) => {
    BookInstance.findById(req.params.id)
        //NOTE 用书籍详细内容替换对应的_id值
        .populate("book")
        .exec(function (err, bookinstance) {
            if (err) { return next(err); }
            //NOTE 无结果
            if (bookinstance == null) {
                var err = new Error("Book copy not found");
                err.status = 404;
                return next(err);
            }
            //NOTE 成功
            res.render("book_instance_detail", { title: "Book", bookinstance: bookinstance });
        })
};

//NOTE 由GET显示创建书籍副本的表单
exports.bookinstance_create_get = (req, res, next) => {
    Book.find({}, "title")
        .exec(function (err, books) {
            if (err) { return next(err); }
            //successful
            res.render("bookinstance_form", { title: "Create BookInstance", book_list: books });
        });
};

//NOTE 由POST处理书籍副本创建操作
exports.bookinstance_create_post = [
    //NOTE Validate fields
    body("book", "Book must be specified").isLength({ min: 1 }).trim(),
    body("imprint", "Imprint must be specified").isLength({ min: 1 }).trim(),
    body("due_back", "Invalid date").optional({ checkFalsy: true }).isISO8601(),

    //Sanitize fields.
    sanitizeBody("book").trim().escape(),
    sanitizeBody("imprint").trim().escape(),
    sanitizeBody("status").trim().escape(),
    sanitizeBody("due_back").toDate(),

    //Process request after validation and sanitization
    (req, res, next) => {
        //Extract the validation errors from a request.
        const errors = validationResult(req);

        //Create a BookInstance object with escaped and trimmed data.
        var bookinstance = new BookInstance({
            book: req.body.book,
            imprint: req.body.imprint,
            status: req.body.status,
            due_back: req.body.due_back
        });

        if (!errors.isEmpty()) {
            //There are errors. Render form again with sanitized values and error messages.
            Book.find({}, "title")
                .exec(function (err, books) {
                    if (err) { return next(err); }
                    //successful
                    res.render("bookinstance_form", { title: "Create BookInstance", book_list: books, selected_book: bookinstance.book._id, errors: errors.array(), bookinstance: bookinstace });
                });
            return;
        }
        else {
            //Date from form is valid.
            bookinstance.save(function (err) {
                if (err) { return next(err); }
                //Successful
                res.redirect(bookinstance.url);
            });
        }
    }
];

//NOTE 由GET显示删除书籍副本的表单
exports.bookinstance_delete_get = (req, res, next) => {
    BookInstance.findById(req.params.id)
        .populate("book")
        .exec(function (err, bookinstance) {
            if (err) { return next(err); }
            //NOTE Results is null
            if (bookinstance == null) {
                res.redirect("/catalog/bookinstances");
            }
            else {
                //NOTE Successful
                res.render("bookinstance_delete", { title: "Delete Book Instance", bookinstance: bookinstance });
            }

        });
};

//NOTE 由POST处理书籍副本删除操作
exports.bookinstance_delete_post = (req, res, next) => {
    BookInstance.findByIdAndRemove(req.body.id, function deleteBookinstance(err) {
        if (err) { return next(err); }
        //NOTE Successful redirect the book instance list
        res.redirect("/catalog/bookinstances");
    });
};

//NOTE 由GET显示更新书籍副本的表单
exports.bookinstance_update_get = (req, res, next) => {
    BookInstance.findById(req.params.id)
        .exec(function (err, bookinstance) {
            if (err) { return next(err) }
            if (bookinstance == null) {
                var error = new Error("BookInstance not found");
                err.status = 404;
                next(err);
            }
            else {
                res.render("bookinstance_form", { title: "Update BookInstance", bookinstance: bookinstance });
            }
        })
};

//NOTE 由POST处理书籍副本更新操作
exports.bookinstance_update_post = [
    //NOTE Validate fields
    body("book", "Book must be specified").isLength({ min: 1 }).trim(),
    body("imprint", "Imprint must be specified").isLength({ min: 1 }).trim(),
    body("due_back", "Invalid date").optional({ checkFalsy: true }).isISO8601(),

    //Sanitize fields.
    sanitizeBody("book").trim().escape(),
    sanitizeBody("imprint").trim().escape(),
    sanitizeBody("status").trim().escape(),
    sanitizeBody("due_back").toDate(),

    //Process request after validation and sanitization
    (req, res, next) => {
        //Extract the validation errors from a request.
        const errors = validationResult(req);

        //Create a BookInstance object with escaped and trimmed data.
        var bookinstance = new BookInstance({
            book: req.body.book,
            imprint: req.body.imprint,
            status: req.body.status,
            due_back: req.body.due_back,
            _id: req.params.id
        });

        if (!errors.isEmpty()) {
            //There are errors. Render form again with sanitized values and error messages.
            Book.find({}, "title")
                .exec(function (err, books) {
                    if (err) { return next(err); }
                    //successful
                    res.render("bookinstance_form", { title: "Create BookInstance", book_list: books, selected_book: bookinstance.book._id, errors: errors.array(), bookinstance: bookinstace });
                });
            return;
        }
        else {
            //Date from form is valid.
            BookInstance.findByIdAndUpdate(req.params.id, bookinstance, {}, function (err, thebookinstance) {
                if (err) { return next(err); }
                //Successful
                res.redirect(thebookinstance.url);
            });
        }
    }
];