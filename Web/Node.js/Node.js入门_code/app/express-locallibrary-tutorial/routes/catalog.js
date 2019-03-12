//NOTE 创建完整的URL路由
const express = require("express");
const router = express.Router();

//NOTE 导入Controller模块
const book_controller = require("../controllers/bookController");
const author_controller = require("../controllers/authorController");
const genre_controller = require("../controllers/genreController");
const book_instance_controller = require("../controllers/bookinstanceController");

//NOTE 藏书路由

//NOTE GET 获取藏书编目主页
router.get("/", book_controller.index);

//NOTE GET 请求添加新的藏书. 注意此项必须位于显示藏书的路由(id)之前
router.get("/book/create", book_controller.book_create_get);

//NOTE POST 请求添加新的藏书
router.post("/book/create", book_controller.book_create_post);

//NOTE GET请求删除藏书
router.get("/book/:id/delete", book_controller.book_delete_get);

//NOTE POST 请求删除藏书
router.post("/book/:id/delete", book_controller.book_delete_post);

//NOTE GET 请求更新藏书
router.get("/book/:id/update", book_controller.book_update_get);

//NOTE POST 请求更新藏书
router.post("/book/:id/update", book_controller.book_update_post);

//NOTE GET 请求藏书
router.get("/book/:id", book_controller.book_detail);

//NOTE GET 请求完整藏书列表
router.get("/books", book_controller.book_list);

//NOTE 作者路由

//NOTE GET 请求添加新的作者. 注意此项必须位于显示作者的路由(id)之前
router.get("/author/create", author_controller.author_create_get);

//NOTE POST 请求添加新的作者
router.post("/author/create", author_controller.author_create_post);

//NOTE GET请求删除作者
router.get("/author/:id/delete", author_controller.author_delete_get);

//NOTE POST 请求删除作者
router.post("/author/:id/delete", author_controller.author_delete_post);

//NOTE GET 请求更新作者
router.get("/author/:id/update", author_controller.author_update_get);

//NOTE POST 请求更新作者
router.post("/author/:id/update", author_controller.author_update_post);

//NOTE GET 请求作者
router.get("/author/:id", author_controller.author_detail);

//NOTE GET 请求完整作者列表
router.get("/authors", author_controller.author_list);

//NOTE 藏书副本路由

//NOTE GET 请求添加新的藏书副本. 注意此项必须位于显示藏书副本的路由(id)之前
router.get("/bookinstance/create", book_instance_controller.bookinstance_create_get);

//NOTE POST 请求添加新的藏书副本
router.post("/bookinstance/create", book_instance_controller.bookinstance_create_post);

//NOTE GET请求删除藏书副本
router.get("/bookinstance/:id/delete", book_instance_controller.bookinstance_delete_get);

//NOTE POST 请求删除藏书副本
router.post("/bookinstance/:id/delete", book_instance_controller.bookinstance_delete_post);

//NOTE GET 请求更新藏书副本
router.get("/bookinstance/:id/update", book_instance_controller.bookinstance_update_get);

//NOTE POST 请求更新藏书副本
router.post("/bookinstance/:id/update", book_instance_controller.bookinstance_update_post);

//NOTE GET 请求藏书副本
router.get("/bookinstance/:id", book_instance_controller.bookinstance_detail);

//NOTE GET 请求完整藏书副本列表
router.get("/bookinstances", book_instance_controller.bookinstance_list);

//NOTE 种类路由

//NOTE GET 请求添加新的种类. 注意此项必须位于显示种类的路由(id)之前
router.get("/genre/create", genre_controller.genre_create_get);

//NOTE POST 请求添加新的种类
router.post("/genre/create", genre_controller.genre_create_post);

//NOTE GET请求删除种类
router.get("/genre/:id/delete", genre_controller.genre_delete_get);

//NOTE POST 请求删除种类
router.post("/genre/:id/delete", genre_controller.genre_delete_post);

//NOTE GET 请求更新种类
router.get("/genre/:id/update", genre_controller.genre_update_get);

//NOTE POST 请求更新种类
router.post("/genre/:id/update", genre_controller.genre_update_post);

//NOTE GET 请求种类
router.get("/genre/:id", genre_controller.genre_detail);

//NOTE GET 请求完整种类列表
router.get("/genres", genre_controller.genre_list);

//导出 router
module.exports = router;