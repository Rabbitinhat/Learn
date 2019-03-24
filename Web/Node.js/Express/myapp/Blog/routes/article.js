const express = require("express");
const router = express.Router();

const article_controller = require("../controllers/articleController");

router.get("/", article_controller.index);

router.get("/create", article_controller.article_create_get);

router.post("/create", article_controller.article_create_post);

router.get("/:id/delete", article_controller.article_delete_get);

router.post("/:id/delete", article_controller.article_delete_post);

router.get("/:id/update", article_controller.article_update_get);

router.post("/:id/update", article_controller.article_update_post);

router.get("/:id", article_controller.article_detail);

router.get("/list", article_controller.article_list);

module.exports = router;
