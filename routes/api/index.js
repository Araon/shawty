const router = require("express").Router();

router.use("/todo", require("./todo"));
router.use("/ping", require("./health"));



module.exports = router;