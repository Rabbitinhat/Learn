const epxress = require("express");
const router = express.Router();

router.get("/", (req, res) => {
    res.send("Wiki Main");
});

router.get("/about", (req, res)=>{
    res.send("About Wiki");
});

module.exports = router;