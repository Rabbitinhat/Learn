//NOTE 导入express-validator所需函数
const {body, validationResult} = require("express-validator/check");
const {sanitizeBody} = require("express-validator/filter");

//NOTE body 验证request body
//NOTE 验证"name"字段是否不为空"minlength=1", 如果为空,设置错误消息"Empty name"
body("name", "Empty name").isLength({min: 1}),
//NOTE 验证"age"字段是否为有效日期(ISO8601(日期格式)), 并使用"potional()"指定null和空字符串不会验证失败
body("age", "Invalid age").optional({checkFalsy: true}).isISO8601(),

//NOTE 还可以使用及花莲连接多个不同验证器, 并添加前面的验证其为真时显示的消息
body("name").isLength({min: 1}).trim().withMessage("Name empty.")
    .isAlpha().withMessage("Name must be alphabet letters."),

//NOTE sanitizeBody() escape()清理操作, 从名称变量中, 删除可能在JavaScript跨站掉脚本攻击中使用的字符
sanitizeBody("name").trim().escape(),
sanitizeBody("date").toDate(),

(req, res, next) => {
    //Extract the validation errors form a request
    const errors = validationResult(req);

    //NOTE 使用验证结果的`isEmpty()` 方法, 来检查是否存在错误(验证返回值), 并使用其`array()`方法, 来获取错误消息集合
    if(!errors.isEmpty()){
        //There are errors. Render form again with sannitized values/errors message.
        //Error messages can be returned in a array using "errors.array()".
        }
    else {
        //Data from is valid
    }
}