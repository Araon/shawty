const router = require("express").Router();

router.use("/", require("./todo.route"));

module.exports = router;